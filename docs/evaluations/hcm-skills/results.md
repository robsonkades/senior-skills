# HCM track evaluation results

Evaluation date: 2026-10-03. Six runs used three synthetic cases. Observed responses satisfied
the examined functional criteria; the first adapted discovery run also exposed a document
identifier error, corrected in the reference and rechecked in a fresh context. Previous versions
also satisfied the central criteria. These results do not establish general superiority of the
adaptation or replace a pilot with analysts and real requests.

**Version boundary:** these behavioral runs preceded the English-language correction. Original
inputs and outputs are preserved in Portuguese as historical evidence. The current English
instructions, templates and case translations were reviewed and structurally checked; the six
earlier runs are not behavioral validation of the translated package versions.

## Procedure and evidence

The first two cases ran against previous and adapted versions in fresh contexts, with identical
inputs, word limits, tools and access instructions. The [original rubric](archive/rubric.txt)
was defined before those runs. The additional context case had criteria defined before its run
and no previous-version comparison. The [English rubric](rubric.md) and cases are maintained
translations for future use.

Initial skills were explicitly invoked. Agents did not receive the rubric, change plan or earlier
responses. They inherited the coordinator's model without override; the exact backend revision
was not exposed. Read restrictions were procedural: agents shared filesystem tools without
inter-agent sandboxes. Read logs are self-reported, not an independent audit of every tool call.
They reported no access outside permitted inputs and no network use.

[Snapshots and inputs](snapshots.json) record evaluated versions and catalog/case hashes.
[Run metadata](runs.json) records raw answer hashes, whitespace word counts and read logs with
the temporary root normalized. The `.txt` answers preserve original bytes, including generated
Markdown. Case hashes refer to [archived inputs](archive/README.md), not their later translations.

| Run | Case and version                       | Words / limit | Preserved response                                     |
| --- | -------------------------------------- | ------------- | ------------------------------------------------------ |
| D0  | Discovery, previous                    | 585 / 600     | [baseline-discovery](results/baseline-discovery.txt)   |
| D1  | Discovery, first adaptation            | 556 / 600     | [revised-discovery](results/revised-discovery.txt)     |
| S0  | Solution/readiness, previous           | 851 / 900     | [baseline-solution](results/baseline-solution.txt)     |
| S1  | Solution/readiness, adaptation         | 847 / 900     | [revised-solution](results/revised-solution.txt)       |
| D2  | Discovery, after identifier correction | 571 / 600     | [rechecked-discovery](results/rechecked-discovery.txt) |
| C1  | Context, adaptation before translation | 465 / 500     | [revised-context](results/revised-context.txt)         |

## Discovery

Case: [initial HCM and physical-access conversation](archive/cases/discovery.txt).
All three responses deliver a draft and three questions. The table assesses predefined criteria;
D1's additional finding is recorded separately rather than hidden in an aggregate score.

| Pillar            | Result and evidence location                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Precise scope     | Satisfied in D0/D1/D2: opening and next steps delimit an unaccepted draft without implementation.                                                                  |
| Discovery         | Satisfied in D0/D1/D2: final questions prioritize outcome, scope or authorization; no response requires code to continue discovery.                                |
| Technical depth   | Satisfied in D0/D1/D2: BR-01/BAC-01 preserve the remaining relationship; BR-02 and criteria distinguish preparation from activation on the effective date.         |
| Decision criteria | Satisfied in D0/D1/D2: questions and open items explain how confirmation, time, population or capabilities change acceptance and flow.                             |
| Solution quality  | Satisfied for the case: rules, criteria and open items are identifiable; questions do not repeat the two supplied rules. Real-user comprehension was not measured. |
| Execution         | Rubric requirements satisfied: drafts meet the word limit, with open items and next actions. D1 contains the document-identifier incompatibility below.            |
| Validation        | Satisfied in D0/D1/D2: criteria and next steps separate planned scenarios from unexecuted demonstrations; no improvement is described as measured.                 |
| Knowledge limits  | Satisfied in D0/D1/D2: U-03 treats "API for everything" and CPF as unsupported claims, without selecting an interface.                                             |

D1 read the new HCM reference but identified the main document as `PF-01/r0`. The catalog
reserves `PF-*` and `TF-*` for child features. Additional response review found this conflict,
beyond the frozen case criteria. The reference was clarified and used `BD-r0` as a revision
example. D2 received the same case without the previous response or finding and used `BD-r0`,
preserving the other observed behaviors. One successful recheck does not prove the error
cannot recur.

## Solution and readiness

Case: [capability and recovery gaps](archive/cases/solution-readiness.txt). Both responses
concluded `RETURN TO ENGINEERING` before development while preserving independent document
work and the business rules already accepted in BD-r3.

| Pillar            | Result and evidence location                                                                                                                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Precise scope     | Satisfied in S0/S1: the opening delivers recommendation, pending contracts and assessment; preserves BD-r3 and distinguishes Lia from Rui.                                                                      |
| Discovery         | Satisfied in S0/S1: uses RT-r2/VF-r4 and identifies missing module/build, capture and guarantees; does not reopen business acceptance without a change.                                                         |
| Technical depth   | Satisfied in S0/S1: PL-r1 analysis covers relationship identity, effective dates, lost response, partial batch and load-to-incremental transition.                                                              |
| Decision criteria | Satisfied in S0/S1: tables reject the examined nightly configuration and keep queries/events conditional; temporal analysis explains why five-minute polling does not prove confirmation within thirty minutes. |
| Solution quality  | Satisfied for the case: alternatives include tracking and recovery; refinement neither imposes infrastructure nor ignores existing configuration. Actual cost and usability were not measured.                  |
| Execution         | Satisfied in S0/S1: contract actions and final paragraphs assign work to Rui, the analyst and counterpart, separating independent and blocked activities.                                                       |
| Validation        | Satisfied in S0/S1: limits the partial trial and build evidence; proposes capture, recovery or deadline checks without claiming execution.                                                                      |
| Knowledge limits  | Satisfied in S0/S1: keeps deduplication, lookup by key and provider deadline unknown; invents no event or endpoint.                                                                                             |

S1 read the four new references for coordination, alternatives, contracts and readiness. This
shows they were reached in this explicit case. It does not establish automatic selection from
descriptions or coverage of every behavior in each skill.

## Context without code

Case: [documents and environment with different coverage](archive/cases/context.txt).
C1 read the context entry point and HCM reference and satisfied the additional observed criteria.

| Criterion                              | Result and evidence location                                                                                                                                                                       |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Separate reported and observed context | Satisfied: F-01 keeps product/module/version as reported; U-02 requests sanitized environment evidence.                                                                                            |
| Respect each document's scope          | Satisfied: F-02 does not transfer Recruitment and Selection 6.10.4 to Personnel Administration 6.10.3 or new-hire queries to change capture; F-03 does not assume universal external destinations. |
| Handle insufficient evidence           | Satisfied: F-04 and the candidate/conflict section limit the demonstration and claim; the conclusion does not infer capability absence.                                                            |
| Investigate proportionately            | Satisfied: U-01 to U-04 prioritize semantics, environment, destination/deadline and a trial with owners; neither require code nor select an interface.                                             |

## Repository verification

The original implementation passed build, seven-package boundaries, lint, all 396 tests in
71 suites, and strict native CLI validation of all six skills. The index was regenerated and
checked; the catalog retained 32 skills, with six version increments and 26 unchanged packages.

The checkout has no committed Git index, so `npm run check:versions` skipped its historical
comparison. An explicit comparison against the preserved original registry and content hashes
checked membership, versions and final index integrity. The skill creator's `quick_validate.py`
could not run because Python was unavailable; native CLI, package and reference checks ran.

`npm run verify` stopped at a pre-existing formatting issue in
[parallel-skill-reviews.md](../../parallel-skill-reviews.md), outside this change. Registry,
versions and tests were therefore checked separately; the global check was not green.

The English correction increments the same six package versions again and regenerates the
index. Its verification does not retroactively change the versions or hashes recorded above.

For the English revision, build, package boundaries and lint passed again, as did all 396 tests
in 71 suites with no skips. All 32 packages loaded in strict mode; the six changed skills also
passed isolated native CLI validation with zero issues. Registry checking passed. Comparison
against the preserved pre-translation index confirmed six patch increments and 26 unchanged
packages. The Git-based version check remained skipped, and `verify` stopped at the same
unrelated formatting issue. Python remained unavailable; no Python validator result is claimed.
No new behavioral agent run was performed for this language correction.

## Limits and next use

These are synthetic scenarios without network or running HCM systems. Counterpart names and
contracts are fictional. There is one run per case/version plus a targeted discovery recheck;
variability, time saved and causal improvement were not measured. The evaluator knew the
versions. Evidence records textual behavior, not integration acceptance.

The next operational step is a real request, recording analyst effort, resolved questions,
handoff rework and artifact clarity. That pilot remains pending and should guide content and
language adjustments.
