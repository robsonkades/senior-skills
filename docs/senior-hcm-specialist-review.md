# Senior HCM specialist: scope and validation

## Deliverable

The catalog package is [senior-hcm-specialist](../skills/senior-hcm-specialist/SKILL.md),
current version **1.1.1**, following the initial **1.0.0** package and general
research revision **1.1.0**. It researches
arbitrary functional and technical questions across the documented HCM product,
using the 6.10.4 baseline and explicit boundaries for Senior X products. The first
three user questions are examples, not the supported-topic boundary.
Instructions and maintained references are English; answers follow the user's
language. Portuguese official labels remain source metadata and exact identifiers.

The package lives under `skills/senior-hcm-specialist/` as an independent domain
skill in the approved catalog: 17 feature skills, 15 supporting skills and this
HCM specialist, for 33 skills in total. The approved set is defined in
`scripts/feature-catalog.test.mjs`. Catalog registration does not itself install
the package into a real agent's configuration.

An agent can use it immediately by being instructed to read the package's `SKILL.md`
and apply it to the question. Automatic discovery by an agent would require a
separate installation. The package has its own manifest and no external skill
dependencies. Catalog integration makes it discoverable and installable by name
through the CLI's configured repository registry, as well as by local directory.

## Catalog integration (1.1.1)

The user explicitly authorized expanding the catalog and adding this skill to it.
This supersedes the earlier decision to keep the package outside the approved
32-skill set. The package moves into the normal `skills/` tree, and packaged usage
paths are updated; the version increments to 1.1.1 for those content changes.

The specialist is a separate catalog entry, not a new dependency of the existing
feature-engineering workflow. Its inclusion must preserve exact catalog membership,
dependency range checks and suggestion validation. The feature workflow's existing
32-skill dependency closure therefore remains a separate invariant.

The registry was regenerated with 33 entries. Focused tests passed for exact catalog
membership and independent search, info and installation by name into both temporary
Claude Code and Codex project layouts. Installed documentation-index and reader-script
hashes match the source package. The feature workflow still installs its original
32-skill dependency/suggestion closure. The helper tests and lint checks now run in
the standard repository commands. `npm run verify` passed after integration:
build, architecture boundaries, lint, formatting, the 33-skill generated registry,
version comparisons for the 32 previously committed packages, and **415 tests in
72 suites**, with no skipped or failed tests. The new package is version **1.1.1**
and its generated registry path is `skills/senior-hcm-specialist`. No publication
or installation into real agent directories is part of this integration task.

## General research revision (1.1.0)

The entrypoint now leads with a general question-to-source workflow. Topic notes
are optional previously researched cases. The navigation guide covers all 15
screen-navigation entries plus eSocial and cross-cutting technical sources; 26
official hub links were checked for reachable documentation.

Search now ranks current-edition, successfully fetched articles and direct matches
before broad navigation-only/external results, with scope filtering and stable
pagination. This addresses a concrete failure in broad vacation searches, where
external example hosts could previously occupy the first result page.

The new live reader fetches one requested official article, emits bounded numbered
text with source metadata and supports body search/continuation. It rejects
out-of-scope redirects, malformed/credential URLs, attachments and error pages.
The workflow routes attachments and complex diagrams/tables to appropriate readers
and requires actual content evidence for every consequential answer claim.

Live reader smoke checks covered Gestão de Férias, Gestão de Turmas and bank-hours
closing, independently of the initial absence/recruitment/stability notes. This
shows that the mechanism reads other documented topics; it does not establish
correct answers to all possible HCM questions.

During the 1.1.0 revision, the separate package had no committed registry baseline.
Before editing, its 1.0.0
manifest/file list and integrity were preserved in a temporary baseline file:
`sha256-UElbd926F4/nq8mvh+o+CxFtdrA6tBc3yFx1rPF2bwU=`. The revised manifest increments
to 1.1.0; the then-approved 32-skill registry was separately checked against Git.

| Pillar            | Evidence for revision 1.1.0                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Precise scope     | The description/entrypoint accepts arbitrary documented HCM topics; the former topics are optional case notes.                                         |
| Discovery         | All module routes, synonyms, metadata pagination and article-body reading are available; a metadata miss triggers broader investigation.               |
| Technical depth   | The workflow differentiates functional calculations/configuration, contracts and diagnoses; actual source content is required for each claim.          |
| Decision criteria | Source type follows question intent, with explicit product/version applicability and bounded gaps when evidence does not establish an answer.          |
| Solution quality  | Ranked metadata narrows discovery; a bounded live reader reads selected articles without shipping a copied manual corpus.                              |
| Execution         | New reader and search behavior ran against actual vacation, training and time-bank documentation.                                                      |
| Validation        | Eighteen helper tests cover search/pagination, extraction and hostile input; strict packaging and source-link checks supplement behavioral evaluation. |
| Knowledge limits  | URL/title/snippet evidence is explicitly insufficient; diagrams, attachments, failed pages and tenant-specific behavior retain their limitations.      |

The 1.1.0 package has 14 packaged files, matching manifest/entrypoint descriptions
and 16 resolved local Markdown links. Its changed integrity and incremented version
were checked against the preserved 1.0.0 baseline. The documentation inventory itself
was reused without a new crawl or changes to its coverage counters.

### Independent evaluation beyond the original examples

A fresh evaluator received the revised skill and three new questions, with no
answer key. It used the module map, ranked metadata search, live article reader and
official-source browsing. It did not open any absence, ASO or stability case note,
modify files or access customer APIs.

| New question                                                       | Observed result and evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Does automatic bank-hours closing run without entries?             | The evaluator read configuration and process sources, but could not establish that precise condition universally. It distinguished one missing-overflow-entry condition from execution of the entire process and reported the remaining configuration evidence needed. [Configuration](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/gestao-ponto/nova-interface/banco-de-horas/cadastro/), [closing](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/gestao-ponto/banco-horas/processos/fechamento/). |
| How are participant attendance records maintained and calculated?  | It read the complete FRREGFRE article and returned the actual registration/apuração sequence, while preserving GO UP and modular-course restrictions and declining to invent a percentage formula. [FRREGFRE](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/tr/frregfre/).                                                                                                                                                                                                                                             |
| What must be checked when correcting S-1200 with a related S-1210? | It followed HCM correction/reopening sources and identified a material date/layout difference between older vendor guidance and current official rules. It did not recommend unconditional payment-event deletion or claim an unverified HCM patch implements a government-rule exception. [HCM correction source](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/rubi/frexcpen/).                                                                                                                                      |

This is evidence of general research behavior on those cases, including an honest
unresolved condition; it is not proof of universal HCM expertise. The evaluator's
navigation friction led to bounded article-link metadata in the reader. A separate
escaped-markup observation was checked against the original page and another web
reader: the vendor source itself contains the malformed presentation inside its
code sample. The helper preserves that content rather than silently rewriting it.

## Eight-pillar review of the initial package

| Pillar            | Observable implementation                                                                                              | Evidence and limit                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Precise scope     | Routes HCM functional/API questions, preserves release and separates Senior X contracts.                               | Forward test distinguished classic RS from X and candidate membership from profiles.                              |
| Discovery         | Searches a broad metadata index, opens relevant sources and identifies consequential ambiguities.                      | Searches found the exact candidate/ASO service pages; broad `integracoes` required a more specific term.          |
| Technical depth   | Exact service/port and field evidence; situation/history distinction; stability configuration and termination effects. | Official pages and the X Swagger were inspected; no customer's deployed contract was available.                   |
| Decision criteria | Chooses dedicated reads, conditional generic queries, partial coverage or an explicitly bounded search miss.           | Forward test did not substitute ASO maintenance for retrieval or medical-stage status for a document.             |
| Solution quality  | Short entrypoint, topic references and a searchable URL inventory instead of copied manuals.                           | Strict package validation passed; manifest and frontmatter descriptions agree.                                    |
| Execution         | Ships the skill, sources, refresh/search script and reviewable coverage records.                                       | Search and crawler were run; runtime HCM operations were not performed.                                           |
| Validation        | Separates indexing, HTTP checks, semantic review and executed API tests.                                               | Script fixtures, package validation, repository checks and a fresh-agent forward test exercised different claims. |
| Knowledge limits  | Identifies broken URLs, other products, unverified tenant access and ASO version/example discrepancies.                | Forward test preserved unknowns instead of fabricating an endpoint, WSDL host or completeness claim.              |

## Behavioral evaluation

A fresh subagent received the skill path and the user's three questions, with no
answer key. It read the skill/relevant references, consulted official contracts and
produced a Portuguese answer. It identified the generic absence-query route,
requisition candidates, the direction of ASO operations and stability's dated
history/configuration/termination behavior. It separated Senior X from HCM 6.10.4
and did not call a customer API.

The evaluator found a useful gap: the references did not explain how to inspect
generic-query configuration or return limits. A separate source check of **FR320CON**
then established `Tabela(s)`, `Campos exceção`, `Qtd. Retorno` and the documented
absence of user abrangência enforcement. These findings were added to the shared
native-service reference and linked from both topic references. This was an
evidence-driven correction; no before/after quality score was inferred.

A topic author also exercised the three-question workflow and independently located
FR320CON through the index. That run is supporting review, not a blind evaluation.
The observations do not establish performance on every HCM topic or release.

A live HTTP check of 37 curated external links found 36 available sources and one
soft 404 for the historical FRAJUEST adjustment routine. The optional claim and
link were removed after confirming there was no valid replacement in the index;
an old search-engine excerpt was not treated as current documentation. The GO UP
navigation hub also returned a soft 404, so the navigation guide points to the
available service catalog's applicability restrictions instead.

## Validation recorded before catalog integration

The following results describe the earlier separate package and 32-skill registry.
They are historical evidence, not results for the 1.1.1 catalog integration. The
script command below uses the package's current location for reproduction.

- Strict local-package validation in a temporary child environment: passed, no
  issues. Agent homes and executable detection paths were isolated.
- The skill-creator Python quick validator was unavailable because the `python`
  command did not resolve to an interpreter. The repository's strict package validator was
  executed instead; all 11 local Markdown file links also resolved.
- `node --test skills/senior-hcm-specialist/scripts/documentation-index.test.mjs`:
  passed. Fixtures cover legacy aliases, external viewer fragments, hostile URL
  schemes/origins, soft 404s, sitemap rejection and accent-insensitive search.
- ESLint on the custom scripts with explicit Node globals: passed. The repository's
  default lint command covers `packages` and root `scripts`, so this was separate.
- `npm run registry:build`: generated the same approved 32-skill registry.
- `npm run verify`: passed, including build, architecture boundaries, lint, format,
  registry freshness, 32 published-version comparisons and **396 tests**; no skipped
  tests. The then-separate package was validated independently as described above.

For the current inventory counts, checked times and remaining errors, read
[coverage.json](../skills/senior-hcm-specialist/references/coverage.json).
The initial crawl completed at **2026-11-01 00:02:21 UTC** (October 31 in the user's
timezone): **10,068 resources**, **8,207 fetched HTML pages**, **139 failed HTML
requests** and **zero unvisited in-version HTML pages**. Retained failures comprise
138 vendor soft 404s and one HTTP 403 response. Five malformed vendor URLs were
excluded, with their historical requests counted separately. All fields in the
distributed index were checked for unsafe malformed URLs, and a synthetic hostile
fixture now checks this filter. The inventory
also contains 1,721 external/other-version resources and 14 document links; those
external resources and binary contents were not crawled or substantively read.
All 8,108 sitemap entries resolve to index records, and all 45,622 outgoing link
targets exist in the index. Source sitemap hashes remained unchanged during the
consistency check. The index is 11,303,388 bytes, below the archive's 16 MiB entry
limit; the package also remains below its 64 MiB total limit.

Its source hashes and per-resource records make indexing reviewable without claiming
that every article, attachment or external document was substantively read.
Customer authentication, runtime responses, medical-document retrieval and business
configuration remain untested; this work required no customer credentials.
