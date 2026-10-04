# HCM/Connect transition and support

Use when assembling an agreed integration into a rehearsal, activation, replacement or support
handoff plan. This method orders accepted decisions; it does not select interfaces, execute a
rollout or establish Senior/provider guarantees. Omit phases outside the requested scope, while
preserving dependencies on them. A document-only assignment ends with a reviewable plan.

## Establish the transition baseline

Reuse the accepted business scope, solution, contracts, mapping and recovery rules. Identify the
product/module/build, environment, old/new flow or configuration revisions, population, effective
date view, source of truth and completion point. Record what may continue to change during the
transition and who controls each source, sender and destination. A flow export may omit required
credentials, parameters or mappings; list the actual artifacts and their provisioning owners
without recording secrets. Environment access and executed checks remain within existing authority.

Use the reconciliation contract from `feature-contract-definition`, including its
`references/integration-reconciliation.md` method when available. Link its revision, population,
comparison basis, discrepancy rules and closure criteria; do not define a competing rule here.
If those semantics are unresolved, identify the owner and dependent step. Independent planning can
continue; a missing method or contract does not justify inventing product behavior.

## Turn the agreed design into observable steps

For each material step record prerequisite, responsible role, action, expected observation,
stop condition, recovery action and evidence to retain. Distinguish implementation dependencies
from prerequisites for a rehearsal or actual activation. Planned observations are not results.

| Step when applicable           | What the plan must make executable                                                                                                                                                                                                     |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prepare                        | Configuration/mapping revisions, counterpart availability, permitted access, capacity constraints and test data must match the intended scope. Name the check and owner for each material difference between rehearsal and production. |
| Establish the old/new boundary | State which flow can write each population and during which interval. Define treatment of queued, running and unconfirmed work. Disabling a trigger does not establish that its in-flight effects stopped.                             |
| Load and bridge changes        | Carry the accepted snapshot/cutoff, paging, history and change-capture rules through to a durable resumption point. Name how changes during loading reach the destination without unintended repeated effects.                         |
| Rehearse                       | Exercise the supported sequence and a consequential interruption with representative synthetic/sanitized data. Include changes during loading or unknown remote outcomes when relevant. Name what the rehearsal cannot establish.      |
| Activate and observe           | Progress only on the accepted observations for the exact stage/population. Verify final business effects and outstanding items, not merely Connect receipt or a successful job log.                                                    |
| Reconcile and hand over        | Apply the contract's business comparison after activation and for the agreed observation window. Retain discrepancies, corrections and rechecks; transfer support only under the agreed exit conditions.                               |

Do not prescribe a freeze, parallel execution or a full reload by default. Carry the chosen
approach and its evidence: a supported change stream can bridge a live load; an accepted pause
needs its own operational window and recovery. If neither preserves required continuity, return
that conflict to the solution/contract owner. Read-only comparison alongside an old writer differs
from letting both flows produce effects; document the supported overlap rather than assuming it.

Define stop/go observations from accepted criteria, not arbitrary counts or durations. A stop
limits new exposure; preserve the identity and status of already submitted work. Before resuming,
establish what completed, what failed and what remains unknown using supported observations.
The old flow may no longer understand new mappings, revised data or already completed effects.
Recovery must therefore specify resulting source/destination state, correction authority, safe
resumption point and post-recovery reconciliation. Simply turning the old flow on is not a recovery
proof. An unsupported lookup/retry guarantee returns to the contract owner.

## Make support a sequence of responsibilities

Name accountable roles across the customer, Senior team and provider; the allocation depends on
the actual agreement. Record each role's acknowledged responsibility or the unresolved handoff,
not an assignment inferred from meeting attendance. A generic "support team" is insufficient when
no one can perform the next action.

| Responsibility | Observable handoff                                                                                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Intake         | Who sees missing/rejected/unknown work, where it is recorded and which business deadline or severity triggers escalation.                                                   |
| Diagnosis      | Who correlates the business item with each boundary's observation and separates data, mapping, connectivity and provider failures.                                          |
| Correction     | Who may correct source data, mappings or destination effects, under which existing authority, and who can perform a safe replay.                                            |
| Confirmation   | Who verifies the final business result and closes the discrepancy using the accepted reconciliation rule. Transport success alone cannot close it.                          |
| Escalation     | Contact role/channel, required sanitized evidence, response expectation and next route if the responsible party is unavailable. Unknown service commitments remain unknown. |

Retain the minimum evidence needed to diagnose and reconcile: scope/revisions, operation identities,
observations, correction history and comparison outcome. Specify location, access, redaction,
retention/deletion rule and owner from applicable policy/agreements; do not invent a universal
retention period or keep live payloads by default. If evidence or provider lookup expires before
the expected recovery window, expose the gap before relying on that recovery path.

Bound initial support by an agreed start, observation coverage and exit conditions. A calendar end
alone does not establish stable operation. Identify who accepts routine support, unresolved items
and their owners, access/runbook readiness and escalation after handover. Reuse an existing support
agreement where sufficient; this plan neither creates a new service promise nor requires a new
approval for already authorized work.

## Filled fictional rehearsal and operation plan

**Illustration only — all artifacts, roles, capabilities and figures below are fictional. Every
check is planned; no HCM/Connect/provider execution or production guarantee is claimed.** This is a
standalone example, not evidence about a deployed Senior interface.

**Baseline:** `BEN-r4` covers benefits enrollment for company Cedar-A only. In the illustrative
scenario, `CT-r2` and `MAP-r3` are the accepted design inputs: identity is company plus employment
relationship; confirmed enrollment is the completion point. The synthetic population contains 12
relationships, including two for one person: 11 effective now and one relationship whose effective
date is after the exercise window, held pending. `REC-r2` compares those 11 current relationships by identity, eligibility and benefit
code; a pending future relationship is checked separately, not counted as a current enrollment.

**Mechanism premises:** old sender `OLD-r1` and proposed Connect flow `NEW-r2` use the same fictional
provider. The scenario's contract defines snapshot cutoff `C40`, subsequent change tokens and
provider lookup by operation identity. The real project's applicable interfaces must establish
equivalent required behavior or the dependent plan must change. These tokens are example values,
not Senior field names. The exercise uses an isolated provider simulator; later activation uses
customer-environment evidence and remains outside this planning assignment.

| Order and owner                               | Planned action                                                                                                                                                                             | Go observation / stop and response                                                                                                                                                                  | Planned evidence                                                                               |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 1. Senior integration lead                    | Check `NEW-r2`, `MAP-r3`, environment parameters and access with the provider interface owner; keep NEW transmission disabled.                                                             | Go when scope and required artifacts match; stop dependent execution for any unprovisioned or incompatible item.                                                                                    | Configuration inventory and environment differences, `EV-01`.                                  |
| 2. Customer operations + Senior operator      | Stop OLD scheduling for Cedar-A; inventory its submitted/running work. The simulator injects one lost response for relationship R03.                                                       | Do not enable NEW writes until supported lookup establishes R03's result and OLD has no unaccounted effects. If lookup remains inconclusive, hold this activation; do not resend blindly.           | Sender inventory, operation lookup and result, `EV-02`.                                        |
| 3. Senior operator                            | Load C40 into NEW's staging area. Inject a benefit-code correction for eligible R07 at C41 while the load runs; bridge subsequent changes to an identified checkpoint before transmission. | Go when R07 reflects the accepted latest effective rule and every change through that checkpoint is accounted for. Stop for a missing page/token or unresolved relationship mapping.                | Cutoff/checkpoint ledger and per-relationship comparison, `EV-03`.                             |
| 4. Senior operator + provider interface owner | In the simulator, activate NEW as the only Cedar-A writer using CT-r2 operation identities, preserving already confirmed R03.                                                              | Confirm the intended effects once; leave the future-effective item pending. For a partial rejection, stop affected sends, retain confirmed effects and route the rejection to its correction owner. | Submission/final-outcome observations and pending-item register, `EV-04`.                      |
| 5. Customer benefits owner                    | Apply REC-r2 to destination observations after activation and after each of the first two scheduled cycles in this fictional plan.                                                         | Expected: 11 correctly identified current enrollments, no unexplained extra/missing/wrong benefit, and the future item still pending. Equal totals with exchanged identities fail.                  | Key/field comparison, legitimate-difference rationale and correction/recheck records, `EV-05`. |
| 6. Customer support lead                      | Receive the runbook, access check, open-item list and ownership record after those cycles.                                                                                                 | Handover only if required comparisons pass and routine support can perform intake/escalation. Otherwise retain initial-support ownership and record the blocked exit condition.                     | Handover record and outstanding-item owners, `EV-06`.                                          |

**Recovery exercise:** after a simulated partial rejection, stop new transmissions and preserve
confirmed provider operations. The benefits owner corrects eligibility at its authoritative source;
the Senior operator applies the agreed revision and resumes only rejected/unsent work under CT-r2.
The provider owner resolves unknown outcomes before a repeated effect is attempted. Re-run REC-r2.
Restarting OLD is a separate option requiring a compatible mapping and a proven resumption point;
this example does not assume that option is safe.

**Support allocation proposed for this exercise:** customer service desk receives the missing-benefit
report; Senior integration support diagnoses correlation/mapping/flow failures; the customer benefits
owner corrects business data; the provider interface owner investigates unconfirmed remote effects.
The benefits owner confirms closure with REC-r2. Escalate an unknown effect or failed comparison
before the next transmission to the Senior integration lead and provider interface owner; service
response times still require the applicable agreement. No message is sent by drafting this plan.

**Evidence and exit:** synthetic EV-01 through EV-06 belong in the exercise record with restricted
team access and no live personal data. Production retention/access rules remain a prerequisite for
activation and must cover the agreed recovery window. The two-cycle initial-support proposal needs
the actual team's scope and acceptance; it is not a recommended default. Document review checks
sequence, owners and executable criteria now. Rehearsal results, actual enablement, applicable
retention/response agreements and production observations remain pending; this plan cannot pass
their mandatory acceptance criteria or declare the integration operational.
