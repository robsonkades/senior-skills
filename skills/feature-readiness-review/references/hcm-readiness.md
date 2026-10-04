# HCM readiness and acceptance review

Use to review a functional definition, a specification handed to development, or acceptance-test
results for an HCM integration. State the transition examined and input revisions. This review
does not create missing rules, approve contracts on others' behalf, or authorize implementation,
deployment or external communication.

## Choose review depth

For a business definition, check the need, population, behavior, rules and acceptance criteria.
A technical unknown may accompany the handoff to engineering if it does not invalidate the
definition. For development readiness, also check decisions, contracts and prerequisites for the
scope to be implemented. For completion/acceptance, require executed evidence for mandatory criteria.

Reuse decisions and evidence that still apply. Identify available documents, samples, tests and
access before requesting information. Missing repository access does not block a functional review;
a missing contractual guarantee may block development that depends on it.

For checklist-led work, state whether the meeting is prepared, has occurred or has produced an
accepted definition. Do not turn a proposed agenda into minutes. A provider's attendance does
not establish acceptance or ownership of every interface. Claimed documentation/reuse needs
the identified artifact and revision; pending material can accompany a first meeting without
proving dependent implementation ready.

For Connect, examine applicable environment/contract evidence, the distinction between receipt
and final outcome, and ownership of monitoring and recovery. A saved flow, an HTTP 200 or a
monthly average alone does not prove correctness, completion or capacity under peak load.

For a rollout/replacement plan or support handoff, use the method in
`feature-implementation-plan` (`references/hcm-transition-and-support.md`) as an input structure,
then independently check the obligations below. If that suggested skill is unavailable, review the
existing plan against the accepted contract and these questions; do not invent missing decisions.

## Examine material consequences

| Area                     | Review question                                                                                | Relevant evidence                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Need and scope           | Does the delivery resolve the HR/personnel administration process and define its population?   | Definition/revision, normal flow and a relevant exception.                                       |
| Context                  | Do the product, module, version and environment support the selected interface?                | Context report and applicable source; enablement evidence when required for the scope.           |
| Authority                | Are responsibilities and decisions recorded for business, engineering and the counterpart?     | Existing decision or delegation record, without inferring acceptance from attendance or silence. |
| Identity                 | Does the key distinguish required employment relationships and preserve cross-system mappings? | Accepted rule, mapping and a case with potentially colliding identities.                         |
| Effective dates          | Are future dates, corrections and ordering defined when they affect the flow?                  | Temporal rule linked to criteria and contracts.                                                  |
| Confirmation             | What does completion mean, and how does the business identify outstanding items?               | States/observations and actions available to the operator.                                       |
| Recovery                 | Is there supported handling for retries, unknown outcomes and partial failures?                | Counterpart guarantees, local obligations and recovery criteria.                                 |
| Data and access          | Are the need and handling of each data item and access scope defined?                          | Mapping, role/company/tenant access and sanitized examples.                                      |
| Transition               | Do the initial load and ongoing synchronization preserve the required result?                  | Applicable cutoff, resumption, reconciliation and deployment dependencies.                       |
| Delivery and maintenance | Does the work have an owner, and can it be verified and maintained?                            | Increments, dependencies, criteria, support and limits of the selected solution.                 |

Use only relevant areas and explain material inapplicability. Do not require payroll, occupational
health and safety (SST), or eSocial analysis in an integration unrelated to those processes.
If a specific obligation is supplied, check its source and owner; do not invent a legal rule
to fill the document.

## Review transition and support without confusing stages

State whether the requested result concerns an analysis-only plan, readiness for rehearsal or
activation, or observed completion/support handoff. Match evidence to that stage and its accepted
scope. A plan can be complete with executable checks still planned; it cannot report those checks
as passed or make a required, unresolved feasibility premise true.

Check the current baseline directly rather than accepting the plan author's readiness label:

- **Scope and dependencies:** named product/module/build, environments, flow/configuration/mapping
  revisions, population and completion point agree with accepted inputs. Dependencies identify the
  stage they block. An old/new overlap names permitted writers and accounts for in-flight effects.
- **Continuity and recovery:** cutoff/loading, ongoing changes and resumption preserve the accepted
  behavior. Stop/go observations and the recovery owner are explicit. Recovery establishes the
  resulting business state; disabling or restarting a flow alone does not prove it.
- **Reconciliation:** locate the accepted contract and comparison evidence or planned procedure.
  Use `feature-contract-definition` and its `references/integration-reconciliation.md` method for
  missing semantics. Check population/cutoff/effective-date alignment, identity/field differences,
  legitimate exclusions and correction/recheck closure; equal totals or no transport errors are
  insufficient. A rule gap goes to its owner, not a new threshold chosen during review.
- **Support:** intake, diagnosis, correction, final confirmation and escalation have accountable
  customer/Senior/provider roles as applicable. Verify access and evidence-retention conditions
  needed for recovery, the initial-support bounds and routine-support exit criteria. Attendance
  does not establish an accepted handoff or a provider response commitment.

For a planning review, inspect the artifacts, assumptions and executable procedures; report
runtime EV-* as planned. For actual activation or completion, inspect executed evidence required
for that stage, including environment differences, reconciliation and support conditions. Evidence
from a fictional example or simulator cannot establish deployed HCM/provider behavior. An accepted
risk does not pass a failed or unexecuted mandatory criterion. Limit any PASS to the reviewed scope
and continue independently ready work when a later-stage condition remains open.

## Distinguish plans from executed evidence

Before development, verifiable criteria and validation plans can support readiness. Do not request
proof of an implementation that does not yet exist. However, when a feasibility experiment is
needed to select a solution, merely including it in a plan does not confirm the premise.

For acceptance testing, each result must identify its criterion, contract and implementation
revisions, environment, stimulus, observation and outcome. A green build does not establish HCM
or counterpart behavior. An acceptance test supports the cases exercised, not a universal
production guarantee. Reassess only evidence affected by a rule, contract or implementation change.

Prepare relevant scenarios with synthetic or sanitized data. Example questions a test may answer:
do two employment relationships remain distinct? Is a future effective date respected? Is a
partial rejection visible? After a lost response, does resumption avoid an unintended effect?
Does loading capture a change that occurs while it runs? Does a forbidden response avoid exposing
another company's record?

These scenarios are neither executed results nor new requirements. Derive expected observations
from accepted criteria; when a rule is missing, record the gap instead of choosing an arbitrary
outcome.

## Decide the next action

A finding may be satisfied, unsatisfied, unverified or not applicable with a reason. Link the
unresolved issue to its consequence and affected work. Compare continuing independent scope,
splitting delivery or returning to the owner; do not treat every gap as a complete work stoppage.

Use the outcomes from `SKILL.md`: `PASS`, `PASS WITH ACCEPTED GAPS`, `RETURN TO PRODUCT`,
`RETURN TO ENGINEERING` or `DECOMPOSE BEFORE PROCEEDING`. For a review limited to the functional
definition, state that scope explicitly; do not assign technical readiness to unreviewed work.
An unresolved item without valid acceptance cannot become an accepted `GAP-*`.

Failure of a mandatory completion criterion remains a failure. Risk acceptance does not make
the criterion pass. A scope change requires an authorized baseline revision and impact analysis.
When all relevant evidence is sufficient, close the review without inventing new approvals.

## Reviewable report

```text
Subject, revisions and transition examined:
Outcome and scope: functional definition / technical readiness / completion
Evidence examined and coverage limits:
Findings: criterion -> evidence -> status -> consequence
Open items: owner, next action and dependent work
Independent work that may continue, where applicable:
Reviews and validations to revisit after correction:
Implementation/acceptance conclusion: only when assessed, with evidence
```

Check that the report lets the analyst and team locate what to correct, why it matters and who
must respond. Prefer a few actionable findings to an inventory of generic risks. A findings-only
review ends with the report; execute corrections when already authorized, and verify the new
state before reporting it.
