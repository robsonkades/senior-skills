# Checklist and Connect evaluation

Date: 2026-10-03. Two fresh English behavioral runs exercised the initial **1.0.0** skill
baseline after the user-authorized version reset. Both produced the requested analytical
deliverable and met the examined expectations. These observations support the specific cases;
they do not establish live HCM/Connect compatibility, automatic selection or measured productivity.

## Method and preserved evidence

The [rubric](rubric.md) was fixed before execution. Each actor received one synthetic request
and the same snapshot of the 32-skill catalog. Skills were explicitly invoked. Actors received
no rubric, prior answer, change plan or intended recommendation. They inherited the coordinator's
model without override; its exact backend revision was not exposed.

The cases are known regression scenarios based on the intended workflow, not held-out examples.
There is no unmodified-skill or no-skill comparison and no claim of causal improvement. The
configuration scenario explicitly uses a fictional product; it does not establish a real Senior
module's capabilities. The meeting input is a transcription, so that run does not test XLSX parsing.

Filesystem separation was procedural: fresh contexts shared filesystem tools with instructions
restricting reads and writes. Access logs are self-reported, not an independently enforced or
audited sandbox. Both actors reported only permitted reads, no external systems and no contact
with other participants. The snapshot remained unchanged during the runs.

| Run           | Task and observed result                                                                                                    | Evidence                                                                                                                     |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Meeting       | Prepared a sales/document-integration briefing, agenda, preliminary map and focused questions from a form labeled HCM.      | [Case](case-meeting.md), [raw output](runs/meeting-output.txt), [access log](runs/meeting-access-log.txt).                   |
| Configuration | Recommended adding company B to the evidenced existing export through configuration; production execution remained pending. | [Case](case-configuration.md), [raw output](runs/configuration-output.txt), [access log](runs/configuration-access-log.txt). |

[Run metadata](runs.json) records exact input/output hashes, word counts, resource-file hashes,
package integrities and pre-reset versions. Archived `.txt` inputs and outputs preserve original
bytes, including Markdown. Maintained case files can be used for later runs; the archive identifies
the exact inputs of these runs.

## Expectations checked against the outputs

| Meeting expectation                                       | Observation                                                                                                                        |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Reuse answers and preserve provenance                     | Observed: cell references retained; O2-Q2 treated as insufficient, with row 3 analyzed separately.                                 |
| Identify actual domain                                    | Observed: sales/document signing identified; no employment or payroll rules added.                                                 |
| Produce preparation artifacts without inventing a meeting | Observed: proposed agenda, role responsibilities and initial map; attendance/authority remained unconfirmed.                       |
| Distinguish receipt, completion and recovery              | Observed: HTTP 200 separated from signing/storage; Q-03/Q-04 address revised documents and recovery after failed filing.           |
| Keep standard/custom conditional                          | Observed: U-01 requests applicable flow evidence and leaves coverage unverified.                                                   |
| Preserve technical and scheduling uncertainty             | Observed: Base64 distinguished from encryption; average load distinguished from peaks; U-03 keeps the missing year/milestone open. |
| Ask focused questions and locate missing artifacts        | Observed: Q-01/Q-02 form the initial outcome round; later walkthrough questions are conditional; AL3's answer is retained.         |
| Respect preparation scope                                 | Observed: no claimed approvals, implementation, readiness pass, messages or executed demonstrations.                               |

| Configuration expectation             | Observation                                                                                                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Accept document-only evidence         | Observed: BD-r3, PA-r8 and CE-r5 support the recommendation without repository access.                                                                             |
| Allow configuration to win            | Observed: the opening recommends the existing export; proposed Connect work remains an unverified alternative.                                                     |
| Preserve business semantics           | Observed: relationship identity, effective dates, the 06:00 deadline and rejection/correction remain in the comparison.                                            |
| Use evidence within its scope         | Observed: source revisions cited; the supplied rehearsal report distinguished from raw artifacts not separately read or rerun.                                     |
| Compare cost and reversal honestly    | Observed: configuration review/operation and new-flow costs discussed without invented estimates; reversal distinguished from retracting already exported records. |
| Avoid a manufactured PoC              | Observed: no new experiment required to choose the evidenced option.                                                                                               |
| Keep implementation pending           | Observed: Operations owns the next procedural step; production still selects only company A and post-change checks are planned.                                    |
| Track analysis without fake resources | Observed: recommendation/status recorded without manufactured RES items or implementation DONE claims.                                                             |

## Eight-pillar interpretation and limits

Scope, discovery and knowledge limits were visible in both runs. The meeting case demonstrated
domain routing, evidence gaps and first-round questions. The configuration case demonstrated
evidence-based choice without forcing custom work. Both addressed material mechanisms and
failures, produced actionable artifacts and separated proposed verification from observed results.

The meeting deliverable includes a short briefing followed by detailed tables; its usefulness
and length still need analyst/customer feedback. A content-rich output alone does not prove good
meeting usability. Neither run covers an entire real request through engineering acceptance,
all HCM modules, an actual Connect flow, a live provider interface or production recovery.
Ordinary repository-path and cross-session resumption behavior were not newly exercised here.

## Repository and packaging checks

- Build, architecture boundaries for seven packages and lint passed.
- The complete test suite passed: **396 tests, 71 suites, zero failures and zero skipped tests**.
- All **32 skills** passed native CLI strict validation in isolated temporary agent/home paths.
- The generated registry contains exactly the approved 32 skills at 1.0.0, with resolving
  dependency ranges and matching package integrity hashes. Skill names were unchanged.
- Root project and seven workspace packages, internal package dependencies, lockfile workspace
  entries and the CLI-reported version are 1.0.0. All 109 third-party lockfile entries were unchanged.
- The two supplied source files retained their SHA-256 fingerprints. Non-manifest skill content
  changed only in the six intended integration-analysis skills; all other skill edits are reset metadata.
- `npm run verify` stops at the pre-existing formatting issue in `docs/parallel-skill-reviews.md`.
  Registry checks and the full test suite were run separately after that stop. Changed maintained
  files were formatted without changing the unrelated document.
- `npm run check:versions` reports a skip because no committed registry is available. The
  preserved pre-edit registry and packages were compared explicitly; the decreases to 1.0.0
  implement the user's selected initial reset. Normal version-bump rules still apply afterward.

The system skill's Python quick validator was unavailable through the local Python stub; the
repository's native strict package validator supplied structural validation. No packages were
published or globally installed, and no real agent configuration was changed.
