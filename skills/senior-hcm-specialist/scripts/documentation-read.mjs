import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  BASE,
  decodeEntities,
  fold,
  isInScope,
  normalizeUrl,
  parseHtml,
  resourceKind,
} from './documentation-index.mjs';

const MAX_BYTES = 4 * 1024 * 1024;
const LINE_WIDTH = 220;
const MAX_LINES = 80;

export function readableUrl(raw) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error('Supply an absolute official HCM 6.10.4 documentation URL.');
  }
  if (
    url.protocol !== 'https:' ||
    !isInScope(url.href) ||
    url.username ||
    url.password ||
    url.search
  )
    throw new Error(
      'Only HTTPS HCM 6.10.4 documentation URLs without credentials or query strings are supported.',
    );
  // Reject escaped traversal or embedded pseudo-schemes before any request or diagnostic.
  let path = url.pathname;
  for (let i = 0; i < 4; i++) {
    let decoded;
    try {
      decoded = decodeURIComponent(path);
    } catch {
      throw new Error('Malformed URL encoding.');
    }
    if (
      /\/(?:https?|ftp|javascript):/i.test(decoded) ||
      decoded.includes('\\') ||
      /(?:^|\/)\.\.(?:\/|$)/.test(decoded)
    )
      throw new Error('Malformed documentation path.');
    if (decoded === path) break;
    path = decoded;
    if (i === 3) throw new Error('Excessively encoded documentation path.');
  }
  const normalized = normalizeUrl(url.href);
  if (!normalized || !isInScope(normalized) || resourceKind(normalized) !== 'page')
    throw new Error('Use a documentation HTML page; attachments need their own reader.');
  return normalized;
}

function decodeText(value) {
  const named = {
    ndash: '–',
    mdash: '—',
    hellip: '…',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    bull: '•',
    copy: '©',
    reg: '®',
    ordm: 'º',
    ordf: 'ª',
    percnt: '%',
    aacute: 'á',
    Aacute: 'Á',
    agrave: 'à',
    acirc: 'â',
    atilde: 'ã',
    Atilde: 'Ã',
    eacute: 'é',
    Eacute: 'É',
    ecirc: 'ê',
    iacute: 'í',
    oacute: 'ó',
    ocirc: 'ô',
    otilde: 'õ',
    uacute: 'ú',
    ccedil: 'ç',
    Ccedil: 'Ç',
  };
  return decodeEntities(value).replace(/&([A-Za-z]+);/g, (entity, name) => named[name] ?? entity);
}

export function extractArticle(html, from = BASE) {
  const title = decodeText(
    (html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '').replace(/<[^>]*>/g, ''),
  ).trim();
  if (/(?:erro\s*404|page\s+not\s+found)/i.test(title))
    throw new Error('Soft 404: vendor error page returned HTTP 200.');
  const article = html.match(
    /<article\b(?=[^>]*\bid\s*=\s*["']content["'])[^>]*>([\s\S]*?)<\/article>/i,
  )?.[1];
  if (!article) throw new Error('Article content was not found; inspect this page with a browser.');
  const clean = article
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|nav|footer)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
  const labels = new Map();
  for (const anchor of clean.matchAll(
    /<a\b[^>]*\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))[^>]*>([\s\S]*?)<\/a>/gi,
  )) {
    const url = normalizeUrl(anchor[1] ?? anchor[2] ?? anchor[3], from);
    if (url)
      labels.set(
        url,
        decodeText(anchor[4].replace(/<[^>]*>/g, ''))
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 160),
      );
  }
  const links = parseHtml(`<article id="content">${clean}</article>`, from).links.map(
    ({ url }) => ({
      url,
      label: labels.get(url) ?? '',
      scope: isInScope(url) ? 'hcm-6.10.4' : 'external-or-other-version',
      kind: resourceKind(url),
    }),
  );
  const blocks = [];
  let current = '',
    row = false,
    pre = false;
  function flush() {
    if (current.trim()) blocks.push(current.trim());
    current = '';
  }
  const boundary =
    /^(?:p|div|section|aside|blockquote|details|summary|ul|ol|dl|dt|dd|figure|figcaption|caption)$/;
  for (const token of clean.matchAll(/<[^>]*>|[^<]+/g)) {
    const value = token[0];
    if (!value.startsWith('<')) {
      current += pre ? decodeText(value) : decodeText(value).replace(/\s+/g, ' ');
      continue;
    }
    const tag = value.match(/^<\s*(\/?)\s*([a-z0-9]+)/i);
    if (!tag) continue;
    const closing = Boolean(tag[1]);
    const name = tag[2].toLowerCase();
    if (name === 'tr') {
      flush();
      row = !closing;
      if (row) current = '| ';
    } else if (row && /^(td|th)$/.test(name)) {
      if (closing) current = current.trimEnd() + ' | ';
    } else if (name === 'br') {
      if (row) current += ' / ';
      else flush();
    } else if (row) {
      if (closing && boundary.test(name)) current += ' ';
    } else if (/^h[1-6]$/.test(name)) {
      flush();
      if (!closing) current = '#'.repeat(Number(name[1])) + ' ';
    } else if (name === 'li') {
      flush();
      if (!closing) current = '- ';
    } else if (name === 'pre') {
      flush();
      pre = !closing;
    } else if (boundary.test(name)) flush();
  }
  flush();
  const lines = [];
  for (const block of blocks) {
    for (const logical of block
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)) {
      let rest = logical;
      while (rest.length > LINE_WIDTH) {
        const space = rest.lastIndexOf(' ', LINE_WIDTH);
        const end = space > LINE_WIDTH / 2 ? space : LINE_WIDTH;
        lines.push(rest.slice(0, end));
        rest = rest.slice(end).trimStart();
      }
      if (rest) lines.push(rest);
    }
  }
  if (!lines.length) throw new Error('The article contains no readable text.');
  return { title, lines, links };
}

export async function readArticle(raw, { fetchImpl = fetch } = {}) {
  let current = readableUrl(raw);
  for (let redirects = 0; redirects <= 5; redirects++) {
    const response = await fetchImpl(current, {
      redirect: 'manual',
      signal: AbortSignal.timeout(20000),
      headers: { 'User-Agent': 'senior-hcm-documentation-reader/1.0' },
    });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get('location');
      await response.body?.cancel();
      if (!location) throw new Error('Redirect without a destination.');
      if (redirects === 5) throw new Error('Too many documentation redirects.');
      current = readableUrl(new URL(location, current).href);
      continue;
    }
    if (!response.ok) {
      await response.body?.cancel();
      throw new Error(`Documentation request failed: HTTP ${response.status}.`);
    }
    const contentType = response.headers.get('content-type') ?? '';
    if (!/^(?:text\/html|application\/xhtml\+xml)(?:;|$)/i.test(contentType)) {
      await response.body?.cancel();
      throw new Error(
        'Expected an HTML article; use a suitable reader for other document formats.',
      );
    }
    if (Number(response.headers.get('content-length') ?? 0) > MAX_BYTES) {
      await response.body?.cancel();
      throw new Error('Article exceeds the 4 MiB read limit; use a browser.');
    }
    const reader = response.body?.getReader();
    if (!reader) throw new Error('Empty documentation response.');
    const chunks = [];
    let size = 0;
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        throw new Error('Article exceeds the 4 MiB read limit; use a browser.');
      }
      chunks.push(chunk.value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const charset = contentType.match(/charset=["']?([\w-]+)/i)?.[1] ?? 'utf-8';
    const article = extractArticle(new TextDecoder(charset).decode(bytes), current);
    return {
      url: current,
      fetchedAt: new Date().toISOString(),
      sha256: createHash('sha256').update(bytes).digest('hex'),
      ...article,
    };
  }
  throw new Error('Too many documentation redirects.');
}

export function selectLines(article, { find = '', start, lines = 32 } = {}) {
  if (!Number.isInteger(lines) || lines < 1 || lines > MAX_LINES)
    throw new Error(`--lines must be an integer from 1 to ${MAX_LINES}.`);
  if (start !== undefined && (!Number.isInteger(start) || start < 1))
    throw new Error('--start must be a positive line number.');
  const needle = fold(find);
  const matches = needle
    ? article.lines.flatMap((line, index) => (fold(line).includes(needle) ? [index + 1] : []))
    : [];
  const first = start ?? (needle ? Math.max(1, (matches[0] ?? 1) - 3) : 1);
  const selected =
    needle && !matches.length && start === undefined
      ? []
      : article.lines.slice(first - 1, first - 1 + lines);
  const last = first - 1 + selected.length;
  return {
    first,
    last,
    total: article.lines.length,
    matchCount: matches.length,
    matches: matches.slice(0, 20),
    selected,
    next: selected.length && last < article.lines.length ? last + 1 : null,
  };
}

export function parseArguments(args) {
  if (!args.length || args[0] === '--help') return null;
  const [url, ...rest] = args;
  const options = {};
  for (let i = 0; i < rest.length; i++) {
    const flag = rest[i],
      value = rest[i + 1];
    if (flag === '--links') {
      if (options.links) throw new Error('Repeated option: --links.');
      options.links = true;
      continue;
    }
    if (
      !['--find', '--start', '--lines'].includes(flag) ||
      value === undefined ||
      value.startsWith('--')
    )
      throw new Error('Use URL [--links] [--find "text"] [--start N] [--lines N].');
    const key = flag.slice(2);
    if (Object.hasOwn(options, key)) throw new Error(`Repeated option: ${flag}.`);
    options[key] = flag === '--find' ? value : Number(value);
    i++;
  }
  if (options.links) selectLinks({ links: [] }, options);
  else selectLines({ lines: [] }, options);
  return { url: readableUrl(url), options };
}

export function selectLinks(article, { find = '', start = 1, lines = 20 } = {}) {
  if (!Number.isInteger(lines) || lines < 1 || lines > 20)
    throw new Error('--lines in link mode must be an integer from 1 to 20.');
  if (!Number.isInteger(start) || start < 1)
    throw new Error('--start must be a positive link number.');
  const matches = article.links.filter((link) =>
    fold(`${link.label} ${link.url}`).includes(fold(find)),
  );
  return {
    total: article.links.length,
    matches: matches.length,
    first: start,
    selected: matches.slice(start - 1, start - 1 + lines),
    next: start - 1 + lines < matches.length ? start + lines : null,
  };
}

async function main(args) {
  const parsed = parseArguments(args);
  if (!parsed) {
    console.log(
      'Usage: node scripts/documentation-read.mjs URL [--links] [--find "text"] [--start N] [--lines N]',
    );
    console.log(`Reads live HTML within ${BASE}; default 32 lines, maximum ${MAX_LINES}.`);
    console.log(
      'Find is accent-insensitive text search within this article. Use --start for subsequent excerpts. Nothing is saved.',
    );
    console.log(
      '--links lists article destinations instead of text (default/max 20 links); --start and --find paginate/filter that list.',
    );
    return;
  }
  const article = await readArticle(parsed.url);
  if (parsed.options.links) {
    const page = selectLinks(article, parsed.options);
    console.log(
      JSON.stringify(
        {
          url: article.url,
          title: article.title,
          fetchedAt: article.fetchedAt,
          sha256: article.sha256,
          totalLinks: page.total,
          matchingLinks: page.matches,
          first: page.first,
          links: page.selected,
          nextStart: page.next,
        },
        null,
        2,
      ),
    );
    console.log(
      'Links use the inventory URL normalization; external/other-version targets were not fetched. Verify product and version before using them.',
    );
    if (page.next) console.log(`Continue with --links --start ${page.next}.`);
    return;
  }
  const excerpt = selectLines(article, parsed.options);
  console.log(
    JSON.stringify(
      {
        url: article.url,
        title: article.title,
        fetchedAt: article.fetchedAt,
        sha256: article.sha256,
        totalLines: excerpt.total,
        ...(parsed.options.find
          ? {
              find: parsed.options.find,
              matchingLines: excerpt.matches,
              matchCount: excerpt.matchCount,
            }
          : {}),
      },
      null,
      2,
    ),
  );
  if (!excerpt.selected.length)
    console.log(
      'No lines selected. A text search miss is not evidence that the product lacks a capability.',
    );
  for (let i = 0; i < excerpt.selected.length; i++)
    console.log(`${excerpt.first + i}: ${excerpt.selected[i]}`);
  console.log(
    excerpt.next
      ? `Continue with --start ${excerpt.next}. Line positions may change if the source hash changes.`
      : 'End of selected article or no matching excerpt.',
  );
  console.log(
    'HTML text extraction is source evidence, not API execution. Inspect the original page for diagrams or complex table layouts.',
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
