# Documentation inventory and coverage

The authoritative snapshot counters and retrieval timestamps are in [coverage.json](coverage.json).
The searchable URL records and directed page links are in
[documentation-index.jsonl](documentation-index.jsonl). Each line is one JSON object. Do not load
the entire index into an agent context; search it and open the matching official sources.

## What the snapshot establishes

- The complete retrieved `adata/maintoc.json` hierarchy is enumerated, including nodes below the
  browser menu's rendering depth. Original Portuguese titles and navigation paths are retained
  as source metadata.
- Every URL in the edition's retrieved sitemap index and child sitemaps is enumerated.
- The crawler follows document hyperlinks in fetched article content within the HCM 6.10.4
  edition. Links outside that edition and links to binary documents are inventoried but are
  **not fetched or read**. Assets such as images, fonts and scripts are excluded.
- Malformed migrated links embedding `http:`, `ftp:` or `javascript:` inside an HTTP path are
  excluded as non-document destinations. The initial snapshot records the aggregate historical
  requests removed by this filter in `crawl.excludedMalformedRequests`; their URLs and embedded
  login examples are not distributed. Retained-page counters exclude those requests.
- Fetched pages record their title, retrieval time, final URL, HTTP status, SHA-256 and outgoing
  page/document links. `html-fetched-links-extracted` means automated structural inspection,
  **not semantic review, API testing or validation of a customer's configuration**.
- `indexed-only` records have not been fetched. `fetch-failed` records retain the error,
  including soft 404 pages that return HTTP 200. A failure does not prove the documented
  product capability is absent.

The crawl is exhaustive only for the retrieved navigation, sitemaps and the static article
links reachable under this boundary. Orphan pages absent from those sources, authenticated
documents, runtime-generated links, binary document contents and other editions are outside
that guarantee. The snapshot does not reproduce or replace the vendor manuals.

## Canonical and legacy URLs

The live site redirects observed `.htm` links to extensionless paths and then trailing-slash
pages. The index combines these in-version aliases and `index.html` entry points. In-version
fragments and query strings are collapsed to the document URL, so counts are documents rather
than section anchors. `legacyAliasObserved` preserves an example where encountered.

External URLs retain their fragment because older Senior help viewers can encode the target
document after `#`. Those URLs are labeled `external-or-other-version` and must be checked
against the requested product and version before using their content as evidence.

## Reproduce and search

Requires Node.js 22.18 or later, already required by this repository. No npm packages, login,
customer data or API credentials are needed. Run from the repository root:

```powershell
node skills/senior-hcm-specialist/scripts/documentation-index.mjs search afastamento
node skills/senior-hcm-specialist/scripts/documentation-index.mjs search dadoscurriculo
node skills/senior-hcm-specialist/scripts/documentation-index.mjs search estabilidade
node skills/senior-hcm-specialist/scripts/documentation-index.mjs stats
```

Search ignores accents and requires all supplied terms. It searches URLs, page titles and
navigation paths, **not full article text**. It prints at most 30 matches; narrow the terms
when needed. Search separate synonyms individually when the desired wording is unknown.
Use the index as a locator, then read the live source and inspect the exact operation/section.

For a fresh inventory, `refresh` replaces the local snapshot with the current navigation and
sitemaps. `crawl all` then fetches all unvisited in-version HTML documents and follows their
article links. A numeric limit runs a smaller batch. A subsequent crawl resumes entries still
marked `indexed-only`; existing failures remain visible and are not silently retried.

```powershell
node skills/senior-hcm-specialist/scripts/documentation-index.mjs refresh
node skills/senior-hcm-specialist/scripts/documentation-index.mjs crawl all
node --test skills/senior-hcm-specialist/scripts/documentation-index.test.mjs
```

The crawler uses four workers with a 100 ms delay per worker, a 20-second request timeout and
periodic checkpoints. It never follows a redirect outside the edition. HTTP 429 stops new
requests after the current in-flight requests finish; preserve the checkpoint and resume only
after the vendor's limit clears. A completed
crawl can contain reported failures: inspect their records before asserting coverage. Do not
run two refresh/crawl processes against the same snapshot at once. Preserve the old snapshot
separately when comparing revisions, because refresh deliberately replaces it.

Manually review a failed URL through the vendor portal or an authorized browser. If a later
run is required, refresh and recrawl, preserving prior evidence as needed. Do not remove an
error merely to claim complete coverage. After refresh, review affected curated references,
bump the skill version for changed packaged content and re-run package/repository checks.
