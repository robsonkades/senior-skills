import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  BASE,
  isInScope,
  normalizeUrl,
  parseHtml,
  parseSitemap,
  parseSearchArgs,
  searchPage,
  searchRecords,
} from './documentation-index.mjs';

test('normalizes observed legacy aliases without losing external help-viewer fragments', () => {
  assert.equal(normalizeUrl(BASE + 'vetorh/fr010sit.htm#situacao'), BASE + 'vetorh/fr010sit/');
  assert.equal(normalizeUrl('/vetorh/fr010sit', BASE, true), BASE + 'vetorh/fr010sit/');
  assert.equal(
    normalizeUrl('https://documentacao.senior.com.br/tecnologia/5.10.3/#web-services/a.htm'),
    'https://documentacao.senior.com.br/tecnologia/5.10.3/#web-services/a.htm',
  );
});

test('rejects nonweb and credential URLs and scopes by exact origin and edition', () => {
  for (const value of [
    'javascript:alert(1)',
    'file:///etc/passwd',
    'mailto:user@example.com',
    'https://user:secret@example.com',
  ])
    assert.equal(normalizeUrl(value), null);
  assert.equal(
    isInScope('https://documentacao.senior.com.br.evil.test/gestao-de-pessoas-hcm/6.10.4/a'),
    false,
  );
  assert.equal(
    isInScope('https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.3/a'),
    false,
  );
  assert.equal(isInScope(normalizeUrl(BASE + '../6.10.3/a')), false);
});

test('detects HTTP-200 error content and extracts article document links without site chrome', () => {
  assert.equal(parseHtml('<title>Erro 404 - Portal de Documentação</title>', BASE).soft404, true);
  const result = parseHtml(
    '<title>Ausências &amp; ASO</title><a href="https://example.com/chrome">chrome</a><article id="content"><a href="manual.pdf">PDF</a><a href="/gestao-de-pessoas-hcm/6.10.4/vetorh/a.htm">help</a><a href="#anchor">anchor</a><a href="javascript:alert(1)">bad</a></article>',
    BASE,
  );
  assert.equal(result.title, 'Ausências & ASO');
  assert.deepEqual(
    result.links.map((x) => x.url),
    [BASE + 'manual.pdf', BASE + 'vetorh/a/'],
  );
});

test('sitemaps fail closed when the server sends a portal error page', () => {
  assert.throws(() => parseSitemap('<html>404</html>'), /Expected a sitemap/);
  assert.deepEqual(
    parseSitemap('<urlset><url><loc>https://example.com/a?x=1&amp;y=2</loc></url></urlset>'),
    ['https://example.com/a?x=1&y=2'],
  );
});

test('excludes migrated pseudo-links and embedded credential examples from document destinations', () => {
  for (const path of [
    'rubi/javascript:void(0);',
    'rubi/http:/example.invalid/test',
    'sm/ftp:/example-user:example-password@example.invalid/file',
    'sm/ftp%3A/example-user:example-password@example.invalid/file',
  ]) {
    assert.equal(normalizeUrl(BASE + path), null);
  }
});

test('search is accent insensitive and requires all query terms across title and hierarchy', () => {
  const records = [
    { url: BASE + 'a/', title: 'Histórico', navigation: [['Colaboradores', 'Ausências']] },
    { url: BASE + 'b/', title: 'Ausências' },
  ];
  assert.deepEqual(searchRecords(records, 'historico ausencias'), [records[0]]);
});

test('search ranks usable edition pages ahead of navigation-only matches and external examples', () => {
  const fetched = { validation: 'html-fetched-links-extracted' };
  const exact = { ...fetched, url: BASE + 'z-direct/', title: 'Férias' };
  const urlMatch = { ...fetched, url: BASE + 'ferias/', title: 'Cadastro' };
  const broad = {
    ...fetched,
    url: BASE + 'a-broad/',
    title: 'Pagamento',
    navigation: [['Férias']],
  };
  const unverified = { url: BASE + 'a-unverified/', title: 'Férias', validation: 'indexed-only' };
  const failed = { url: BASE + 'a-failed/', title: 'Férias', validation: 'fetch-failed' };
  const external = {
    url: 'https://example.com/ferias/',
    title: 'Férias',
    validation: 'indexed-only',
  };
  const records = [external, failed, unverified, broad, urlMatch, exact];
  const inputOrder = [...records];
  const expected = [exact, urlMatch, broad, unverified, failed, external];
  assert.deepEqual(searchRecords(records, 'ferias'), expected);
  assert.deepEqual(searchRecords([...records].reverse(), 'FÉRIAS'), expected);
  assert.deepEqual(records, inputOrder);
  assert.deepEqual(searchRecords(records, 'ferias', { scope: 'external' }), [external]);
  assert.deepEqual(searchRecords(records, 'ferias', { scope: 'current' }), expected.slice(0, -1));
});

test('ranked pagination reaches every match exactly once with stable URL ties and accurate totals', () => {
  const records = ['e', 'c', 'a', 'd', 'b'].map((id) => ({
    url: BASE + id + '/',
    title: 'Férias',
    validation: 'html-fetched-links-extracted',
  }));
  const first = searchPage(records, 'ferias', { limit: 2 });
  const second = searchPage(records, 'ferias', { offset: first.nextOffset, limit: 2 });
  const last = searchPage(records, 'ferias', { offset: second.nextOffset, limit: 2 });
  assert.equal(first.total, 5);
  assert.equal(first.nextOffset, 2);
  assert.equal(second.nextOffset, 4);
  assert.equal(last.total, 5);
  assert.equal(last.nextOffset, null);
  assert.deepEqual(
    [...first.results, ...second.results, ...last.results].map((r) => r.url),
    ['a', 'b', 'c', 'd', 'e'].map((id) => BASE + id + '/'),
  );
  const beyond = searchPage(records, 'ferias', { offset: 99 });
  assert.equal(beyond.total, 5);
  assert.deepEqual(beyond.results, []);
  assert.equal(beyond.nextOffset, null);
  assert.equal(searchPage(records, 'nonexistent').total, 0);
});

test('a broad topic prefers whole title words over incidental identifier substrings', () => {
  const functional = {
    url: BASE + 'rubi/rotinas/',
    title: 'Rotinas de férias',
    validation: 'html-fetched-links-extracted',
  };
  const identifier = {
    url: BASE + 'customizacoes/calculaferias/',
    title: 'CalculaFerias',
    validation: 'html-fetched-links-extracted',
  };
  assert.deepEqual(searchRecords([identifier, functional], 'ferias'), [functional, identifier]);
  assert.deepEqual(searchRecords([functional, identifier], 'calculaferias'), [identifier]);
});

test('search options validate bounded pagination and scopes before any index access', () => {
  assert.deepEqual(
    parseSearchArgs(['--scope=current', 'férias', '--offset', '30', 'coletivas', '--limit=10']),
    { query: 'férias coletivas', scope: 'current', offset: 30, limit: 10 },
  );
  assert.deepEqual(parseSearchArgs(['--help']), { help: true });
  assert.equal(parseSearchArgs(['--', '--help']).query, '--help');
  for (const args of [
    [],
    ['ferias', '--limit', '0'],
    ['ferias', '--limit', '101'],
    ['ferias', '--offset', '-1'],
    ['ferias', '--offset', '1.5'],
    ['ferias', '--offset', '9007199254740992'],
    ['ferias', '--scope', 'unknown'],
    ['ferias', '--limit'],
    ['ferias', '--missing'],
    ['ferias', '--limit=10', '--limit=20'],
  ]) {
    assert.throws(
      () => parseSearchArgs(args),
      (error) => error.exitCode === 2,
    );
  }
  assert.throws(
    () => searchPage([], 'ferias', { limit: Infinity }),
    (e) => e.exitCode === 2,
  );
});

test('CLI help succeeds and invalid search options return usage status with guidance', () => {
  const script = fileURLToPath(new URL('./documentation-index.mjs', import.meta.url));
  const help = spawnSync(process.execPath, [script, 'search', '--help'], { encoding: 'utf8' });
  assert.equal(help.status, 0);
  assert.ok(help.stdout.includes('--offset'));
  const invalid = spawnSync(process.execPath, [script, 'search', 'ferias', '--limit', '0'], {
    encoding: 'utf8',
  });
  assert.equal(invalid.status, 2);
  assert.ok(invalid.stderr.length > 0);
  assert.ok(invalid.stdout.includes('Usage:'));
});
