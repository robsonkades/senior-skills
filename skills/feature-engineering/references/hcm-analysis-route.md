# HCM integration analysis journey

Use when a business analyst's request spans several stages of defining a Senior HCM integration.
Coordinate existing responsibilities up to the requested endpoint. A single interface question
may end with context findings; a comparison may end with a recommendation. Do not turn every
inquiry into a complete project.

## Start or resume

Read the request, current definition revision and recorded decisions. Identify the requested
outcome: discovery, specification, plan, implementation or delivery assessment. If the input is
still an idea, use `collaborative-feature-definition` to build the definition; do not require
a completed definition before analysis can begin.

Keep business and engineering authors distinct, as required by the lifecycle contract. The analyst
can prepare questions, alternatives and drafts for discussion. Engineering owns feasibility
analysis and contracts. Clarify unknown roles only where they change a decision; no skill itself
constitutes human approval.

A new external integration has the catalog's `Deep` driver; document length does not reduce
that risk. Use the persistence required for work across sessions/owners. Reuse the team's
location and format, keeping a continuous specification with attachments only when useful.

If the input includes a customer checklist, use the checklist workshop in
`collaborative-feature-definition` before routing unanswered items. Identify the actual domain,
separate distinct flows, reuse supplied answers and record counterpart participation/ownership.
A form title does not make a non-HCM flow an HCM project. For such flows, retain the general
lifecycle and applicable Connect context without introducing HR-specific rules.

## Connect stage outputs

Give each stage the bounded question, revisions, relevant evidence and expected output. Check
the response before using it in the next decision; naming a stage does not prove it ran.

| Situation                                                     | Skill                                                        | Result to incorporate                                                        |
| ------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Idea, interview or undefined process                          | `collaborative-feature-definition`                           | Business definition and acceptance status; separate technical analysis.      |
| Accounts mix facts, assumptions and questions                 | `feature-discovery`                                          | Evidence ledger and material questions.                                      |
| Unverified HCM capability or environment                      | `feature-context-analysis`                                   | Product/module/version, interfaces and evidence coverage, even without code. |
| A missing answer changes behavior                             | `feature-requirement-clarification`                          | Short question round and updated definition.                                 |
| Rules and scope need observable criteria                      | `requirements-and-acceptance`, `feature-scope-analysis`      | Rules, business acceptance and explicit scope.                               |
| A choice between configuration, reuse and development         | `feature-solution-analysis`, `feature-architecture-analysis` | Comparable alternatives and impact on systems.                               |
| Technical uncertainty determines the alternative              | `feature-feasibility-experiment`                             | Bounded evidence or an inconclusive result with consequences.                |
| A choice needs recording                                      | `feature-decision-analysis`                                  | Decision, owner, source and conditions for reconsideration.                  |
| The selected solution needs precise obligations               | `feature-contract-definition`                                | Data mapping, confirmation, failures, recovery and technical criteria.       |
| Consequences threaten the HR/personnel administration outcome | `feature-risk-analysis`                                      | Risk, detection, mitigation, owner and recovery alternative.                 |
| Delivery needs organizing                                     | `feature-decomposition`, `feature-implementation-plan`       | Useful increments, dependencies and a technical plan with engineering.       |
| A transition or completion needs verification                 | `feature-readiness-review`                                   | Bounded review and next action.                                              |

Before delivery resources exist, record the analysis phase, definition revision, decisions and
open questions in the current specification. Do not manufacture `RES-*` items or report an
interview as implemented. Once delivery resources are defined, use `feature-progress-tracking`
for their status and evidence; its `DONE` still means implemented and validated. Use
`feature-execution` only when implementation is requested and its dependencies are ready.
Tool availability does not authorize access or changes to the customer's environment.

For interacting business rules, use the decision-table method in `requirements-and-acceptance`.
For source-data findings, use data readiness in `feature-context-analysis`; for maintained code
maps and comparable business-state checks, use `feature-contract-definition`. Estimate requests
and response comparison belong to `feature-solution-analysis`. Transition rehearsal and support
planning belong to `feature-implementation-plan`, followed by an independent readiness pass.
These are conditional extensions of the existing responsibilities, not extra mandatory phases.

See [the benefits worked case](hcm-benefits-worked-case.md) for a filled, fictional journey and
[pilot and handoff](hcm-pilot-and-handoff.md) for applying it to actual observations across meetings.

## Preserve a coherent specification

The document set should make the following easy to find:

1. Need, outcome, current/desired process and population.
2. Rules, business criteria and agreed scope.
3. HCM and counterpart context, sources and reuse opportunities.
4. Alternatives, decisions and technical-analysis authorship.
5. Contracts, data mapping, states and recovery.
6. Technical criteria, acceptance scenarios, dependencies and plan.
7. Open items, revisions, owners and observed evidence.

These are contents, not seven mandatory files. Preserve the existing namespace:
`OBJ/BR -> BAC -> SC -> IMP -> ED/EXP/CT -> TC -> RES -> EV`, using only relevant types.
A product gap does not receive `GAP-*` before its consequences have valid acceptance.
Do not silently overwrite an accepted revision when behavior changes.

When product and code access are unavailable, functional and document analysis can continue.
Keep claims about configuration, feasibility or execution unknown until supported. Do not
fabricate a technical contract to complete the analyst's documents.

## Turn the solution into reviewable work

Decompose by outcomes observed by HR/personnel administration. Depending on the case, an increment
may complete enrollment of one population and handle its outstanding items; the next may cover
changes or another population. These are examples, not automatic exclusions. Do not deliver only
"create API", "create table" and "create screen" without showing which behavior they support.

Each implementation resource needs a purpose, work owner, inputs, dependencies, criterion and
planned verification. Identify what belongs to the Senior integrations team, the product team
and the counterpart. Estimates and delivery commitments remain with their accountable owners.

Compare a smaller complete scope with a larger delivery only when both preserve the agreed
outcome or the reduction is proposed for a decision. Confirmation, recovery and mandatory data
do not become optional because they make the first delivery harder. Preserve the operator's
experience: which pending item they see, what they can correct and how they know it is complete.

## Revisit only what changed

A changed eligibility rule returns to business and invalidates dependent criteria and mappings.
An interface limitation returns to solution analysis and may affect contracts, risks and plans.
An unexpected acceptance-test result requires distinguishing a defect, a refuted assumption and
an ambiguous rule before changing the specification. Unaffected items retain their evidence.

Review readiness for the scope before dependent implementation. At completion, compare the
request with executed evidence, including acceptance testing when mandatory for that scope.
Do not require deployment or production measurements outside the request, or claim those
outcomes were achieved.

```text
Requested endpoint and request revision:
Phase, depth and persistence, with rationale:
Produced result and where to review it:
Supported decisions and owners:
Open items and dependent work; independent work available:
Executed evidence and checks still planned:
Next step and revisions to revisit:
```

A ready specification may complete an analysis request while leaving the integration undeveloped.
State both statuses precisely, without requesting authorization again for work already requested.
