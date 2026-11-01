import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const BASE = 'https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/';
const ROOT = new URL(BASE);
const directory = resolve(dirname(fileURLToPath(import.meta.url)), '../references');
const indexPath = resolve(directory, 'documentation-index.jsonl');
const coveragePath = resolve(directory, 'coverage.json');
const sources = [BASE + 'adata/maintoc.json', BASE + 'sitemap-index.xml'];

export function decodeEntities(value) {
  return value.replace(/&(?:amp|quot|apos|lt|gt|nbsp|#\d+|#x[\da-f]+);/gi, (entity) => {
    const named = {
      '&amp;': '&',
      '&quot;': '"',
      '&apos;': "'",
      '&lt;': '<',
      '&gt;': '>',
      '&nbsp;': ' ',
    };
    if (entity.startsWith('&#')) {
      const hex = entity.toLowerCase().startsWith('&#x');
      const n = parseInt(entity.slice(hex ? 3 : 2, -1), hex ? 16 : 10);
      return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : entity;
    }
    return named[entity.toLowerCase()] ?? entity;
  });
}

export function normalizeUrl(raw, from = BASE, toc = false) {
  if (typeof raw !== 'string' || !raw.trim()) return null;
  let value = decodeEntities(raw.trim());
  // TOC root-relative paths are relative to the product, as in the site's TOC client.
  if (toc && value.startsWith('/') && !value.startsWith('//') && !value.startsWith(ROOT.pathname)) {
    value = BASE + value.slice(1);
  }
  let url;
  try {
    url = new URL(value, from);
  } catch {
    return null;
  }
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return null;
  // Some migrated pages contain broken relative links with an embedded scheme, including
  // script pseudo-links and FTP login examples. These are not documentation destinations.
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(url.pathname);
  } catch {
    return null;
  }
  if (/\/(?:https?|ftp|javascript):/i.test(decodedPath)) return null;
  // Hashes are meaningful in legacy external help viewers; retain them outside this edition.
  if (url.origin === ROOT.origin && url.pathname.startsWith(ROOT.pathname)) {
    url.hash = '';
    url.search = '';
    url.pathname = url.pathname.replace(/\/index\.html?$/i, '/').replace(/\.html?$/i, '');
    if (!/\.[a-z0-9]+$/i.test(url.pathname) && !url.pathname.endsWith('/')) url.pathname += '/';
  }
  return url.href;
}

export function isInScope(value) {
  const url = new URL(value);
  return url.origin === ROOT.origin && url.pathname.startsWith(ROOT.pathname);
}

export function resourceKind(value) {
  const path = new URL(value).pathname;
  if (/\.(pdf|docx?|xlsx?|pptx?|zip|rar|csv|txt|xml|json|wsdl)$/i.test(path)) return 'document';
  if (/\.(png|jpe?g|gif|svg|webp|ico|css|js|woff2?|ttf|mp4|mp3)$/i.test(path)) return 'asset';
  return 'page';
}

export function parseHtml(html, from) {
  const title = decodeEntities(
    (html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '').replace(/<[^>]*>/g, '').trim(),
  );
  const soft404 = /(?:erro\s*404|page\s+not\s+found)/i.test(title);
  const article =
    html.match(/<article\b[^>]*id=["']content["'][^>]*>([\s\S]*?)<\/article>/i)?.[1] ?? html;
  const links = new Map();
  for (const match of article.matchAll(
    /<(?:a|iframe|object)\b[^>]*\b(?:href|src|data)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))[^>]*>/gi,
  )) {
    const raw = match[1] ?? match[2] ?? match[3];
    if (raw.startsWith('#')) continue;
    const url = normalizeUrl(raw, from);
    if (url && resourceKind(url) !== 'asset') links.set(url, raw);
  }
  return { title, soft404, links: [...links].map(([url, raw]) => ({ url, raw })) };
}

export function parseSitemap(xml) {
  if (!/<(?:urlset|sitemapindex)\b/i.test(xml)) throw new Error('Expected a sitemap XML document');
  return [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((m) => decodeEntities(m[1].trim()));
}

export function fold(value) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

function usageError(message) {
  const error = new Error(message);
  error.exitCode = 2;
  return error;
}

export function searchRecords(records, query, { scope = 'all' } = {}) {
  if (!['all', 'current', 'external'].includes(scope))
    throw usageError('scope must be current, external or all');
  const terms = fold(query).split(/\s+/).filter(Boolean);
  const phrase = terms.join(' ');
  const ranked = [];
  for (const record of records) {
    const current = isInScope(record.url);
    if ((scope === 'current' && !current) || (scope === 'external' && current)) continue;
    const title = fold(record.title ?? '');
    const titleWords = new Set(title.split(/[^\p{Letter}\p{Number}]+/u));
    const url = fold(record.url);
    const direct = `${title} ${url}`;
    const text = `${direct} ${fold((record.navigation ?? []).flat().join(' '))}`;
    if (!terms.every((term) => text.includes(term))) continue;
    // Prefer usable sources for this edition before using navigation-only matches or examples
    // on external hosts. The URL tie-break keeps pagination stable across input order/locales.
    const score = [
      current ? 0 : 1,
      record.validation === 'html-fetched-links-extracted'
        ? 0
        : record.validation === 'fetch-failed'
          ? 2
          : 1,
      terms.every((term) => direct.includes(term)) ? 0 : 1,
      title.trim() === phrase ? 0 : 1,
      -terms.filter((term) => titleWords.has(term)).length,
      -terms.filter((term) => title.includes(term)).length,
      -terms.filter((term) => url.includes(term)).length,
    ];
    ranked.push({ record, score });
  }
  ranked.sort((a, b) => {
    for (let i = 0; i < a.score.length; i++) {
      const difference = a.score[i] - b.score[i];
      if (difference) return difference;
    }
    return a.record.url < b.record.url ? -1 : a.record.url > b.record.url ? 1 : 0;
  });
  return ranked.map(({ record }) => record);
}

export function searchPage(records, query, { offset = 0, limit = 30, scope = 'all' } = {}) {
  if (!Number.isSafeInteger(offset) || offset < 0)
    throw usageError('offset must be a non-negative safe integer');
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100)
    throw usageError('limit must be an integer from 1 to 100');
  const matches = searchRecords(records, query, { scope });
  const results = matches.slice(offset, offset + limit);
  const nextOffset = offset + results.length < matches.length ? offset + results.length : null;
  return { total: matches.length, offset, limit, scope, nextOffset, results };
}

export function parseSearchArgs(args) {
  const options = { offset: 0, limit: 30, scope: 'all' };
  const terms = [];
  const seen = new Set();
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--') {
      terms.push(...args.slice(i + 1));
      break;
    }
    if (arg === '--help' || arg === '-h') return { help: true };
    if (!arg.startsWith('-')) {
      terms.push(arg);
      continue;
    }
    const [flag, ...inline] = arg.split('=');
    if (!['--offset', '--limit', '--scope'].includes(flag))
      throw usageError(`Unknown search option: ${flag}`);
    if (seen.has(flag)) throw usageError(`Duplicate search option: ${flag}`);
    seen.add(flag);
    const value = inline.length ? inline.join('=') : args[++i];
    if (value === undefined || value.startsWith('--'))
      throw usageError(`Missing value for ${flag}`);
    const key = flag.slice(2);
    if (key === 'scope') options.scope = value;
    else {
      if (!/^\d+$/.test(value)) throw usageError(`${key} requires a whole number`);
      options[key] = Number(value);
    }
  }
  const query = terms.join(' ').trim();
  if (!query) throw usageError('search requires at least one search term');
  // Reuse the public paging contract without reading the index or making a network request.
  searchPage([], query, options);
  return { query, ...options };
}

async function fetchScoped(url) {
  let current = url;
  for (let i = 0; i < 6; i++) {
    if (!isInScope(current)) throw new Error(`Redirect outside edition: ${current}`);
    const response = await fetch(current, {
      redirect: 'manual',
      signal: AbortSignal.timeout(20000),
      headers: {
        'User-Agent': 'senior-hcm-documentation-index/1.0 (documentation research; metadata only)',
      },
    });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get('location');
      await response.body?.cancel();
      if (!location) throw new Error(`Redirect without location: ${current}`);
      current = new URL(location, current).href;
      continue;
    }
    if (!response.ok) {
      await response.body?.cancel();
      throw new Error(`HTTP ${response.status}`);
    }
    const body = await response.text();
    return {
      body,
      url: current,
      status: response.status,
      contentType: response.headers.get('content-type') ?? '',
    };
  }
  throw new Error('Too many redirects');
}

async function readIndex() {
  return (await readFile(indexPath, 'utf8'))
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

async function refresh() {
  const records = new Map();
  function add(raw, provenance, navigation, toc = false) {
    const url = normalizeUrl(raw, BASE, toc);
    if (!url) return;
    const existing = records.get(url) ?? {
      url,
      scope: isInScope(url) ? 'hcm-6.10.4' : 'external-or-other-version',
      kind: resourceKind(url),
      sources: [],
      validation: 'indexed-only',
    };
    if (!existing.sources.includes(provenance)) existing.sources.push(provenance);
    if (navigation) {
      existing.title ??= navigation.at(-1);
      existing.navigation ??= [];
      if (!existing.navigation.some((path) => JSON.stringify(path) === JSON.stringify(navigation)))
        existing.navigation.push(navigation);
    }
    records.set(url, existing);
  }
  const sourceEvidence = [];
  async function source(url) {
    const result = await fetchScoped(url);
    sourceEvidence.push({
      url,
      fetchedAt: new Date().toISOString(),
      sha256: createHash('sha256').update(result.body).digest('hex'),
    });
    return result.body;
  }
  const toc = JSON.parse(await source(sources[0]));
  let navigationNodes = 0,
    navigationLinks = 0;
  function walk(items, parent = []) {
    for (const item of items) {
      navigationNodes++;
      const path = [...parent, item.titulo ?? '(untitled)'];
      if (item.url) {
        navigationLinks++;
        add(item.url, sources[0], path, true);
      }
      if (Array.isArray(item.itens)) walk(item.itens, path);
    }
  }
  walk(toc);
  const sitemapFiles = parseSitemap(await source(sources[1]));
  let sitemapEntries = 0;
  for (const sitemap of sitemapFiles) {
    for (const url of parseSitemap(await source(sitemap))) {
      sitemapEntries++;
      add(url, sitemap);
    }
  }
  add(BASE, 'requested-entrypoint');
  const coverage = {
    schemaVersion: 1,
    product: 'Gestao de Pessoas | HCM',
    edition: '6.10.4',
    generatedAt: new Date().toISOString(),
    sources: sourceEvidence,
    navigationNodes,
    navigationLinks,
    sitemapEntries,
    interpretation:
      'Complete enumeration of the retrieved navigation and sitemaps; not proof of all existing vendor documents or semantic review of every page. External resources are indexed, not crawled. HTML fetching verifies availability and extracts links, not functional correctness. Binary documents are indexed, not read.',
    crawl: { state: 'not-started', attempted: 0, htmlFetched: 0, failed: 0 },
  };
  await persist(records, coverage);
  console.log(
    JSON.stringify({
      navigationNodes,
      navigationLinks,
      sitemapEntries,
      uniqueResources: records.size,
    }),
  );
}

async function persist(records, coverage) {
  await mkdir(directory, { recursive: true });
  const values = [...records.values()].sort((a, b) => a.url.localeCompare(b.url));
  coverage.resources = values.length;
  coverage.inVersionResources = values.filter((r) => r.scope === 'hcm-6.10.4').length;
  coverage.externalResources = values.length - coverage.inVersionResources;
  coverage.documents = values.filter((r) => r.kind === 'document').length;
  coverage.unvisitedInVersionPages = values.filter(
    (r) => r.scope === 'hcm-6.10.4' && r.kind === 'page' && r.validation === 'indexed-only',
  ).length;
  await writeFile(indexPath, values.map((r) => JSON.stringify(r)).join('\n') + '\n');
  await writeFile(coveragePath, JSON.stringify(coverage, null, 2) + '\n');
}

async function crawl(limit) {
  const records = new Map((await readIndex()).map((r) => [r.url, r]));
  const coverage = JSON.parse(await readFile(coveragePath, 'utf8'));
  const queue = [...records.values()].filter(
    (r) => r.scope === 'hcm-6.10.4' && r.kind === 'page' && r.validation === 'indexed-only',
  );
  let cursor = 0,
    completed = 0,
    rateLimited = false;
  coverage.crawl.state = 'running';
  coverage.crawl.startedAt ??= new Date().toISOString();
  coverage.crawl.concurrency = 4;
  coverage.crawl.delayPerWorkerMs = 100;
  await persist(records, coverage);
  async function worker() {
    while (!rateLimited && cursor < queue.length && cursor < limit) {
      const record = queue[cursor++];
      record.checkedAt = new Date().toISOString();
      coverage.crawl.attempted++;
      try {
        const result = await fetchScoped(record.url);
        const parsed = parseHtml(result.body, result.url);
        record.httpStatus = result.status;
        record.finalUrl = result.url;
        record.sha256 = createHash('sha256').update(result.body).digest('hex');
        if (parsed.soft404) throw new Error('Soft 404: vendor error page returned HTTP 200');
        if (!/html/i.test(result.contentType))
          throw new Error(`Unexpected content type: ${result.contentType}`);
        record.title = parsed.title || record.title;
        record.validation = 'html-fetched-links-extracted';
        record.outgoingLinks = parsed.links.map((link) => link.url);
        coverage.crawl.htmlFetched++;
        for (const { url, raw } of parsed.links) {
          let target = records.get(url);
          if (!target) {
            target = {
              url,
              scope: isInScope(url) ? 'hcm-6.10.4' : 'external-or-other-version',
              kind: resourceKind(url),
              sources: [record.url],
              validation: 'indexed-only',
            };
            records.set(url, target);
            if (target.scope === 'hcm-6.10.4' && target.kind === 'page') queue.push(target);
          }
          // Keep one discovery edge; all link edges remain on their source page.
          target.discoveredFrom ??= record.url;
          if (/\.html?(?:[#?]|$)/i.test(raw)) target.legacyAliasObserved ??= raw;
        }
      } catch (error) {
        record.validation = 'fetch-failed';
        record.error = error.message;
        coverage.crawl.failed++;
        if (error.message === 'HTTP 429') {
          rateLimited = true;
          coverage.crawl.pauseReason =
            'Vendor returned HTTP 429; resume only after its limit clears.';
        }
      }
      completed++;
      if (completed % 100 === 0) {
        console.log(
          JSON.stringify({ completed, queued: queue.length, failed: coverage.crawl.failed }),
        );
        // One worker writes snapshots; the event loop keeps record mutation synchronous.
      }
      await new Promise((done) => setTimeout(done, 100));
    }
  }
  const timer = setInterval(() => {
    checkpointRequested = true;
  }, 30000);
  let checkpointRequested = false;
  const work = Promise.all(Array.from({ length: 4 }, worker));
  let running = true;
  work.finally(() => {
    running = false;
  });
  while (running) {
    await new Promise((done) => setTimeout(done, 1000));
    if (checkpointRequested) {
      checkpointRequested = false;
      await persist(records, coverage);
    }
  }
  clearInterval(timer);
  await work;
  coverage.crawl.state = rateLimited
    ? 'paused-rate-limit'
    : cursor >= queue.length
      ? 'complete-with-reported-failures'
      : 'limited';
  coverage.crawl.finishedAt = new Date().toISOString();
  await persist(records, coverage);
  console.log(JSON.stringify(coverage.crawl));
}

async function main(args) {
  const [command, ...rest] = args;
  if (command === 'refresh') return refresh();
  if (command === 'crawl') {
    const limit = rest[0] === 'all' ? Infinity : Number(rest[0] ?? 100);
    if (!(limit > 0)) throw new Error('crawl requires a positive page limit or all');
    return crawl(limit);
  }
  if (command === 'search') {
    const options = parseSearchArgs(rest);
    if (options.help) return printHelp();
    const { results, ...summary } = searchPage(await readIndex(), options.query, options);
    console.log(JSON.stringify(summary));
    console.log('Search covers URLs, titles and navigation, not page body.');
    for (const record of results)
      console.log(
        `${record.title ?? '(title not fetched)'}\n${record.url}\n${record.scope}; ${record.validation}\n`,
      );
    return;
  }
  if (command === 'stats') {
    console.log(await readFile(coveragePath, 'utf8'));
    return;
  }
  if (command && !['help', '--help', '-h'].includes(command))
    throw usageError(`Unknown command: ${command}`);
  printHelp();
}

function printHelp() {
  console.log('Usage: node documentation-index.mjs refresh | crawl [all|limit] | stats');
  console.log(
    '       node documentation-index.mjs search <terms> [--scope current|external|all] [--offset N] [--limit 1..100]',
  );
  console.log(
    'Search defaults: scope all, offset 0, limit 30. Results include total and nextOffset.',
  );
  console.log(
    'refresh replaces the snapshot; crawl resumes indexed-only in-version pages. No external or binary documents are fetched.',
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error.message);
    process.exitCode = error.exitCode ?? 1;
    if (error.exitCode === 2) printHelp();
  });
}
