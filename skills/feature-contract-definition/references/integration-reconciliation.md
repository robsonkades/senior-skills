# Define reconciliation before interpreting agreement

Use when the integration must compare source and destination state, prove an initial load or
synchronization complete, or resolve an uncertain effect. Produce a contract for comparison,
discrepancy disposition and evidence. Reuse existing controls that meet the accepted outcome;
do not impose record-level comparison on a contract that only requires aggregates. Source-data
profiling belongs to `feature-context-analysis`; this method owns cross-system obligations.

## Establish a comparable view

Read the accepted business rules, mapping and both parties' applicable contracts. Record:

- **Population and purpose:** companies/tenants, eligible relationships or business objects,
  statuses, history, exclusions, and the outcome this comparison must establish.
- **Identity and cardinality:** the scoped matching key, mapping revision and expected relation
  between records. One-to-one, one-to-many and aggregation need different assertions. Multiple
  relationships for one person are not duplicates unless the applicable contract says so.
- **Time boundary:** a common source-change cutoff or evidenced consistent view, the business-
  effective date and timezone, and each side's capture time. State how changes during capture,
  late corrections, history and pages are included or deferred without loss. A capture timestamp
  is not automatically a complete watermark. Keep processing time distinct from effective time.
- **Permitted lag and pending states:** which records may legitimately be absent, prepared but
  inactive or awaiting a prerequisite; the accepted deadline/condition, observation and owner.
  Do not invent a grace period to explain discrepancies. An expired pending allowance is a
  failure/open discrepancy under the criterion, not a permanent exclusion.
- **Compared meaning:** fields, normalized representations, units, rounding/tolerance and
  temporal selection supported by the rule. Normalization cannot erase a material difference.
- **Evidence coverage:** export/query/report revisions, pagination and filters, permissions,
  retention and sanitization. Missing visibility is an unknown, not proof of absent records.

Prefer supplied authorized reports or sanitized extracts to unnecessary live access. If the
two views cannot be aligned, name the missing boundary/evidence and the affected claims. A
provisional comparison can expose candidates for investigation but cannot prove convergence.
If the provider cannot expose required evidence, return the guarantee gap to its owner or
solution analysis; a local contract cannot create query or snapshot capabilities.

## Classify discrepancies by meaning

Derive the expected target population and representation from the accepted rules and mapping,
then compare observed evidence to that expectation. Record both raw row counts and distinct
identities where applicable. Validate target uniqueness before joining; a join that multiplies
rows can conceal duplicate effects. Check appropriate group/member coverage for one-to-many
or aggregated contracts instead of forcing one row per source record.

| Class                          | What to establish before proposing a correction                                                                                                                                                      |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Missing expected record/effect | It belongs in this view, its deadline/condition has been reached, and target evidence is complete enough to distinguish absence from invisibility or pending work.                                   |
| Unexpected record/effect       | It is outside the expected population or belongs to an unsupported revision; inspect retained history and permitted future/prepared records before calling it erroneous.                             |
| Duplicate identity/effect      | The accepted cardinality is exceeded; preserve physical record/operation references and business identity separately. A duplicate row in an export is not automatically a duplicate business effect. |
| Field discrepancy              | The matched identity has different required meaning after agreed normalization and effective-version selection. Record expected/observed values safely and the mapping/rule revision.                |
| Legitimate difference          | A sourced rule permits the future, pending, historical or lagging state; name its applicable condition, deadline and next observation. It does not count as completed work.                          |
| Unknown outcome or coverage    | Available evidence cannot establish whether the effect happened or the view is complete. Retain the uncertainty and supported lookup/escalation path.                                                |

Classes can overlap for one identity. Report distinct affected identities as well as discrepancy
counts; do not add them as if disjoint. Equal totals can hide one missing identity, one unexpected
identity and wrong field values. A checksum or aggregate can be supporting evidence only within
its defined coverage; it cannot prove individual-record fidelity by itself.

## Define success and safe disposition

Specify comparison frequency/trigger, accountable reviewer, retained evidence and acceptance
criteria from the actual outcome. Criteria may require all due identities present, correct
cardinality and required fields, plus explicit handling of authorized pending work. Aggregate
contracts instead name the grouping, members/selection coverage and accepted totals or tolerance
that matter. Do not invent universal zero-defect thresholds, tolerances or release gates.

Each discrepancy needs an owner, next evidence/action and affected scope. Distinguish correcting
the source, changing a mapping, repairing destination state and rerunning a comparison. A source
owner, mapping owner and target operator may be different parties. Preserve their accepted
authority and contract limits; this analysis authorizes no writes, deletions or replay.

Before recommending a state-changing repair, establish the supported operation, affected
identity/version, possible existing effects, permission and verification. For unknown outcomes,
use the contract's status lookup, idempotency or escalation path before a potentially harmful
retry. A missing observation is not proof a write failed. Deleting an unexpected record may erase
valid history; replaying after a mapping change may overwrite a newer effective state. Where
safe repair cannot be established, keep it pending and continue unaffected comparisons.

After an authorized repair, require fresh evidence at the stated view and link it to the original
finding. Closing a support ticket, receiving HTTP 200 or matching counts does not prove the
required business state. Planned reconciliation criteria support specification readiness;
completion requires executed evidence for the applicable criteria and scope.

## Filled synthetic comparison

This illustration continues the fictional mapping in
[HCM data and interactions](hcm-data-and-interactions.md#filled-synthetic-mapping), not a Senior
interface. Assume complete extracts `EXPECTED-r1` and `OBSERVED-r1` for tenant `T1`, company `C1`,
with a common source-change cutoff `2026-10-01T12:00:00Z` and business-effective view `2026-10-01`.
Both were captured after the fictional agreed completion deadline `13:00:00Z`, with no later
changes included. Rules `BR-DEMO/r2` require one active enrollment per due relationship and the
mapped plan; future records need not be active yet. These conditions are supplied assumptions
for the illustration, not production guarantees or default deadlines.

| Relationship | Expected plan | Effective start | Expected in active view          |
| ------------ | ------------- | --------------- | -------------------------------- |
| R01          | PLAN-A        | 2026-10-01      | Yes                              |
| R02          | PLAN-B        | 2026-10-01      | Yes                              |
| R03          | PLAN-A        | 2026-10-01      | Yes                              |
| R04          | PLAN-A        | 2026-10-05      | No; future under the stated rule |

`R01` and `R02` may belong to the same fictional person `P01`; neither is merged. Identity in
the comparison remains the full `(T1,C1,relationship)` tuple.

| Observed record reference | Relationship | Active plan |
| ------------------------- | ------------ | ----------- |
| D01                       | R01          | PLAN-A      |
| D02                       | R02          | PLAN-A      |
| D03                       | R99          | PLAN-A      |

Expected due rows = 3 and observed rows = 3, but the comparison fails the fictional criterion:
`R03` is missing, `R99` is unexpected and `R02` has the wrong plan. There are three distinct
affected identities and no duplicate observed key. Missing `R04` is a legitimate future
difference; it is not yet due and is not marked complete. Its October 5 criterion remains pending.

For a second fixture, replace observed `D03/R99` with `D03/R01/PLAN-A`. Counts still match at 3,
but only two distinct target identities remain: `R01` has one excess row, `R03` is missing and
`R02` still has the wrong plan. Confirm whether `D01` and `D03` represent separate target effects
or duplicate export rows before choosing a repair. Do not create `R03` or delete `D03` from this
table alone; the operator must establish current state and the supported correction path.

These are specification walkthroughs with internally checkable arithmetic. They are neither
executed customer reconciliation nor proof that an actual interface supports the assumed view.

## Reviewable contract record

```text
CT-* / rules / mapping revisions and requested outcome:
Population, key/cardinality, cutoff/effective view and evidence sources:
Required fields or aggregates; permitted differences and their expiry:
Success/failure criteria and planned or executed evidence:
Findings: identity -> expected/observed -> class -> evidence/coverage -> owner
Disposition: supported next check or correction proposal -> authority -> recheck
Result: met / unmet / unverified for the stated criterion and comparison scope
```

Before handoff, walk a valid case and a material false-agreement case against the criteria.
Check identity/count arithmetic, future/pending treatment, evidence completeness and who acts
on each unresolved difference. Reuse existing artifact formats; a second reconciliation ledger
is unnecessary when the current contract/report already preserves these facts.
