import assert from 'node:assert/strict';
import { test } from 'node:test';
import { BASE } from './documentation-index.mjs';
import {
  extractArticle,
  parseArguments,
  readArticle,
  readableUrl,
  selectLinks,
  selectLines,
} from './documentation-read.mjs';

const page =
  '<title>Férias &amp; cursos</title><nav>outer menu</nav><article class="help" id="content"><h1>Férias</h1><nav>inner menu</nav><p>Uma&nbsp; descrição <strong>completa</strong>.</p><ul><li>Verificar período.</li><li>Conferir cálculo.</li></ul><h2>Campos</h2><table><tr><th>Campo</th><th>Valor</th></tr><tr><td>Percentual</td><td>30 &percnt;</td></tr><tr><td>Regra</td><td>Início<br>Fim</td></tr></table><script>secretCode()</script><style>.hidden{}</style><p>Forma&ccedil;&atilde;o &#233; válida.</p></article><footer>site footer</footer>';

test('extracts article headings, list items and table cell boundaries without site chrome', () => {
  const result = extractArticle(page);
  assert.equal(result.title, 'Férias & cursos');
  assert.deepEqual(result.lines, [
    '# Férias',
    'Uma descrição completa.',
    '- Verificar período.',
    '- Conferir cálculo.',
    '## Campos',
    '| Campo | Valor |',
    '| Percentual | 30 % |',
    '| Regra | Início / Fim |',
    'Formação é válida.',
  ]);
  assert.doesNotMatch(result.lines.join('\n'), /menu|secretCode|hidden|site footer/);
});

test('rejects unavailable article content instead of treating error chrome as evidence', () => {
  assert.throws(
    () => extractArticle('<title>Erro 404 - Portal de Documentação</title>'),
    /Soft 404/,
  );
  assert.throws(
    () => extractArticle('<title>Help</title><main>Menu only</main>'),
    /Article content was not found/,
  );
});

test('exposes labeled safe article links with bounded navigation and explicit external scope', async () => {
  const html =
    '<title>Reader links</title><article id="content"><h1>Links</h1><a href="../referencia.htm#campo"><strong>Referência</strong> de cálculo</a><a href="https://documentacao.senior.com.br/seniorxplatform/manual/">Senior X</a><a href="https://example-user:example-password@example.invalid/">unsafe</a><a href="ftp:/example-user:example-password@example.invalid/file">unsafe relative</a><a href="javascript:void(0)">script</a><pre><code>&lt;div class=&quot;Code&quot;&gt;@Rule&lt;/div&gt;</code></pre></article>';
  let calls = 0;
  const article = await readArticle(BASE + 'rubi/screen/', {
    fetchImpl: async () => {
      calls++;
      return new Response(html, { headers: { 'content-type': 'text/html' } });
    },
  });
  assert.equal(calls, 1);
  assert.deepEqual(article.links, [
    {
      url: BASE + 'rubi/referencia/',
      label: 'Referência de cálculo',
      scope: 'hcm-6.10.4',
      kind: 'page',
    },
    {
      url: 'https://documentacao.senior.com.br/seniorxplatform/manual/',
      label: 'Senior X',
      scope: 'external-or-other-version',
      kind: 'page',
    },
  ]);
  assert.ok(article.lines.includes('<div class="Code">@Rule</div>'));
  const first = selectLinks(article, { lines: 1 });
  assert.equal(first.next, 2);
  assert.equal(selectLinks(article, { start: 2, lines: 1 }).selected[0].label, 'Senior X');
  assert.equal(
    selectLinks(article, { find: 'calculo' }).selected[0].label,
    'Referência de cálculo',
  );
  assert.throws(() => parseArguments([BASE + 'a/', '--links', '--lines', '21']), /link mode/);
  assert.equal(parseArguments([BASE + 'a/', '--links', '--find', 'calculo']).options.links, true);
});

test('bounds excerpts and permits precise continuation and accent-insensitive body search', () => {
  const article = {
    lines: Array.from({ length: 100 }, (_, i) => (i === 50 ? 'Cálculo de férias' : `Field ${i}`)),
  };
  const first = selectLines(article, { lines: 5 });
  assert.equal(first.next, 6);
  assert.deepEqual(
    selectLines(article, { start: 6, lines: 5 }).selected,
    article.lines.slice(5, 10),
  );
  const found = selectLines(article, { find: 'calculo', lines: 5 });
  assert.deepEqual(found.matches, [51]);
  assert.equal(found.first, 48);
  assert.deepEqual(selectLines(article, { find: 'missing' }).selected, []);
  assert.throws(() => selectLines(article, { lines: 1000 }), /--lines/);
  assert.throws(() => parseArguments([BASE + 'a/', '--start', '-1']), /--start/);
  assert.throws(() => parseArguments([BASE + 'a/', '--find']), /Use URL/);
});

test('rejects credential, external, cross-version, query and encoded pseudo-paths without echoing secrets', () => {
  for (const url of [
    'http://localhost/',
    'https://documentacao.senior.com.br.evil.invalid/gestao-de-pessoas-hcm/6.10.4/a/',
    'https://example-user:example-password@documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/a/',
    BASE + '../6.10.3/a/',
    BASE + 'a/?token=example-secret',
    BASE + 'ftp%253A/example-user:example-password@example.invalid/a',
    BASE + '%252e%252e/6.10.3/a',
    BASE + 'manual.pdf',
  ])
    assert.throws(
      () => readableUrl(url),
      (error) => !/example-password|example-secret/.test(error.message),
    );
  assert.equal(readableUrl(BASE + 'rubi/frcalfer.htm#campo'), BASE + 'rubi/frcalfer/');
});

test('redirects are validated before following and error/non-HTML responses fail closed', async () => {
  let calls = 0;
  const redirect = async () => {
    calls++;
    return new Response(null, { status: 302, headers: { location: 'https://example.invalid/' } });
  };
  await assert.rejects(readArticle(BASE + 'a/', { fetchImpl: redirect }), /Only HTTPS HCM/);
  assert.equal(calls, 1);
  await assert.rejects(
    readArticle(BASE + 'a/', { fetchImpl: async () => new Response('missing', { status: 403 }) }),
    /HTTP 403/,
  );
  await assert.rejects(
    readArticle(BASE + 'a/', {
      fetchImpl: async () =>
        new Response('binary', { headers: { 'content-type': 'application/pdf' } }),
    }),
    /Expected an HTML/,
  );
  await assert.rejects(
    readArticle(BASE + 'a/', {
      fetchImpl: async () =>
        new Response('too large', {
          headers: { 'content-type': 'text/html', 'content-length': '9999999' },
        }),
    }),
    /4 MiB/,
  );
});

test('live-read contract preserves verified source identity and bounded article evidence', async () => {
  const article = await readArticle(BASE + 'rubi/frcalfer/', {
    fetchImpl: async () =>
      new Response(page, { headers: { 'content-type': 'text/html; charset=utf-8' } }),
  });
  assert.equal(article.url, BASE + 'rubi/frcalfer/');
  assert.match(article.sha256, /^[a-f0-9]{64}$/);
  assert.ok(Number.isFinite(Date.parse(article.fetchedAt)));
  assert.equal(article.lines[0], '# Férias');
});
