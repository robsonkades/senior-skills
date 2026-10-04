# HCM depth extension: targeted evaluation

Date: 2026-10-04. All three exercised scenarios met their five predefined criteria. This is a
bounded regression observation with reused collaborators, not evidence of causal improvement,
automatic skill selection, product conformance or real-team productivity.

## Configuration and provenance

The [rubric](rubric.md) and three inputs were written and frozen before the actor runs. Actors
received only their designated input and ordinary skill resources from a preserved snapshot.
The snapshot contains all 32 catalog skills; nine are 1.1.0 and the other 23 remain 1.0.0. It is
byte-checked against the final skill packages. See [metadata](metadata.json) for file hashes,
package integrities, input/output hashes, versions, baseline comparison and check results.

| Case                      | Actor and exposure                                                                                               | Retained evidence                                                                                                                                               |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Data and reconciliation   | `/root/ba_rules_author`; previously authored business-rule methods, retained shared task context.                | [Input](inputs/data-and-reconciliation.md), [raw output](outputs/data-and-reconciliation.txt), [access trace](outputs/data-and-reconciliation-trace.txt).       |
| Resumption and estimation | `/root/catalog_engineering_gaps`; previously authored the transition/readiness methods used in part of this run. | [Input](inputs/resumption-and-estimation.md), [raw output](outputs/resumption-and-estimation.txt), [access trace](outputs/resumption-and-estimation-trace.txt). |
| Rule decisions            | `/root/catalog_ba_gaps`; previously authored data/contract methods, retained shared task context.                | [Input](inputs/rule-decisions.md), [raw output](outputs/rule-decisions.txt), [access trace](outputs/rule-decisions-trace.txt).                                  |

Actors used the inherited session model and available local tools on Windows. Their traces
record the actual reads, any truncated displays and rereads. File restrictions were procedural
on a shared filesystem: the rubric and other outputs were technically accessible, although the
actors report not reading them. Prior context was not erased. Consequently these are neither
fresh blind sessions nor independently isolated runs. No matched original-version/no-skill run
was performed. Explicitly loading the skills tests application, not automatic activation.

The coordinator assessed the raw responses against the frozen rubric; actor self-scores were
neither requested nor used. No rubric was revised after the runs and no failed output was replaced.
The `.txt` output and trace files are preserved as produced, without editorial reformatting.

## Observed criteria

| Case / criterion                     | Result | Observable basis in the raw response                                                                                                                                         |
| ------------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Data 1: scoped arithmetic            | Pass   | Five rows, four scoped keys, one duplicate group/excess row, one null, one invalid code and three affected rows. Separates person repetition and cross-company identity.     |
| Data 2: sample limits and correction | Pass   | Unknown population remains unknown; no arbitrary duplicate winner or code fallback. Null observation is distinguished from unproven requiredness.                            |
| Data 3: incompatible observations    | Pass   | J versus K and receipt-only status leave current completion unverified; equal totals cannot prove it.                                                                        |
| Data 4: changed decisive constraint  | Pass   | A comparable final K view changes the finding to one missing, one unexpected and one divergent enrollment alongside the exact match; the four-key union is fully enumerated. |
| Data 5: safe next steps              | Pass   | Rejects deletion/replay from insufficient evidence and requests source, mapping and provider evidence with distinct responsible roles.                                       |
| Resumption 1: local invalidation     | Pass   | Retains BR3; CT3 affects M2, cases, the conditional recommendation and owner estimates without inventing export support.                                                     |
| Resumption 2: estimate request       | Pass   | Gives scoped requests to integration/provider/test roles, exposes transition/support coverage and creates no premature delivery resources.                                   |
| Resumption 3: effort versus calendar | Pass   | Computes 9-16 person-hours for CT2 only; CT3 effort is unknown. Seven-day queue and Friday request do not establish a completion date.                                       |
| Resumption 4: transition failures    | Pass   | Identifies in-flight uncertainty, load/change continuity and unsupported old-flow restart; rehearsal and recovery observations remain planned.                               |
| Resumption 5: endpoint and readiness | Pass   | Delivers the analysis/plan, continues independent preparation and returns dependent implementation/activation to engineering.                                                |
| Rules 1: identity and time           | Pass   | Per-relationship eligibility, inclusive start/exclusive end and policy versus receipt time remain separate.                                                                  |
| Rules 2: unresolved policy           | Pass   | Leave/exception precedence returns to HR; unknown leave is not denial. The analysis's OPEN status is not an invented runtime hold.                                           |
| Rules 3: reviewable artifacts        | Pass   | Compact table, boundary/overlap/late-receipt cases and draft BAC trace; unresolved expectations cannot pass acceptance.                                                      |
| Rules 4: useful questions and roles  | Pass   | Three targeted questions concern precedence, unknown leave and interval endpoints; settled company/identity facts are reused. Engineering evidence can proceed separately.   |
| Rules 5: evidence limits             | Pass   | No legal determination, invented provider contract, actual policy approval or executed integration test.                                                                     |

The outputs are technically detailed. Their length does not establish that the customer-facing
view is easy for an analyst to use; the prepared pilot should test that view and the effort of
maintaining the linked technical appendix. Three cases do not establish consistency across runs,
coverage of other HCM processes or robustness against all ambiguous requests.

## Content and repository checks

The coordinator reviewed the nine changed skills against the
[eight-pillar matrix](../../hcm-depth-review.md). A separate collaborator also reviewed the new
worked benefits case, pilot, estimation method and decomposition route: no actionable content
defect was found. That review checked six rows -> three eligible relationships/two people,
effective boundaries, discrepancy classes and the separate 11-19 person-hour teaching calculation.
It was document review, not execution of the illustrated integration.

Observed repository results:

- Native strict CLI validation: all 32 skills passed using isolated temporary configuration roots.
- Baseline/integrity comparison: exactly nine changed skills at 1.1.0; 23 unchanged at 1.0.0.
  Descriptions and dependencies validate; registry entries match package content and all evaluation
  snapshot packages match final packaged content.
- Registry regenerated through `npm run registry:build`; `npm run registry:check` passed.
- Build, architecture boundaries and lint passed in `npm run verify`.
- `npm run verify` stopped at the preexisting formatting issue in `docs/parallel-skill-reviews.md`.
  The file is unchanged from the preserved baseline. Formatting of this task's changed files passes.
- `npm run test:only`, run separately after that stop: **396 tests, 71 suites, zero failures or skips**.
- `npm run check:versions` skipped its Git comparison because no committed index is available.
  The explicit pre-edit snapshot comparison above supplies the version check for this change.

No real customer workshop, deployed Senior/Connect capability check, provider operation, runtime
reconciliation or production activation was performed. The pilot protocol and synthetic examples
are complete deliverables; their real-world application remains the next evidence to obtain.
