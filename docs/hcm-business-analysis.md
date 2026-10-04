# Using the HCM business analysis track

The track supports the analyst from the first customer conversation through preparation for
development and acceptance review. The catalog still contains 32 skills; six have HCM-specific
references, English templates and explicit activation conditions. Compose the other specialists
as needed, without making the analyst run every stage for every inquiry.

For the team's returned workbook and Connect training material, see
[checklist and Connect intake](checklist-and-connect-intake.md). It explains the first meeting,
provider participation, preliminary mapping and the evidence needed to classify the solution.
The [naming review](catalog-naming-review.md) explains how the 32 responsibilities fit together.

## Choose an entry point

| Situation                                                         | Entry point                                                                             | Specialized material                                                                                                   |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Prepare a meeting, clarify a need or describe a process           | [collaborative-feature-definition](../skills/collaborative-feature-definition/SKILL.md) | [Interview and functional definition](../skills/collaborative-feature-definition/references/hcm-business-discovery.md) |
| Confirm environment, product or interface, including without code | [feature-context-analysis](../skills/feature-context-analysis/SKILL.md)                 | [Context record and official sources](../skills/feature-context-analysis/references/senior-hcm-context.md)             |
| Compare configuration, reuse and development                      | [feature-solution-analysis](../skills/feature-solution-analysis/SKILL.md)               | [Product coverage and alternatives](../skills/feature-solution-analysis/references/hcm-integration-options.md)         |
| Specify data and integration obligations                          | [feature-contract-definition](../skills/feature-contract-definition/SKILL.md)           | [Mapping, effective dates and recovery](../skills/feature-contract-definition/references/hcm-data-and-interactions.md) |
| Review a specification or acceptance results                      | [feature-readiness-review](../skills/feature-readiness-review/SKILL.md)                 | [Review criteria and assessment](../skills/feature-readiness-review/references/hcm-readiness.md)                       |
| Coordinate several stages after the initial definition            | [feature-engineering](../skills/feature-engineering/SKILL.md)                           | [Journey, deliverables and resumption](../skills/feature-engineering/references/hcm-analysis-route.md)                 |

For a returned questionnaire, start with
[Checklist workshop](../skills/collaborative-feature-definition/references/integration-checklist-workshop.md).
When Connect is mentioned, inspect
[Senior Connect context](../skills/feature-context-analysis/references/senior-connect-context.md),
including for non-HCM flows. The actual business domain determines the additional references.

Example requests once the skills are available to the agent:

```text
Use $collaborative-feature-definition to prepare discovery for this HCM integration.
Read my notes, produce a functional draft and ask about gaps that change the solution.

Use $feature-context-analysis to verify which HCM capabilities support this request.
We have the attached documents, but no access to source code or the customer's environment.

Use $feature-engineering to turn this HCM definition into a specification ready for
refinement with engineering. The requested work ends with analysis and a plan.

Use $feature-readiness-review to assess this HCM specification before development.
Show what is supported, the open items and which work may continue.
```

Provide known products/modules and versions, the counterpart, the HR/personnel administration
problem, available evidence and the requested endpoint. Unknown information may remain open;
the skills help investigate without filling gaps with plausible claims. Skill sources and
templates are written in English; deliverables can follow the language requested by the user.

## Work with a continuous specification

Reuse the team's format and location. The definition records the need, process, rules and business
criteria. Technical analysis adds context, alternatives, contracts, risks and a plan, with
identified authorship. Templates support artifact creation; they do not require irrelevant
sections or one document per skill.

The customer and analyst clarify behavior and outcomes. The product specialist verifies the
applicable context. Engineering owns technical analysis and confirms contracts under its
responsibility. The counterpart is responsible for its own guarantees. Meeting participation
does not constitute approval, and the agent does not replace an accountable owner's decision.

The track emphasizes distinctions that change the solution: person and employment relationship,
effective date and processing time, receipt and completion, confirmed failure and unknown outcome.
Product knowledge has its source maintained in the context reference; other stages consume the
request's report and evidence, avoiding divergent copies of API catalogs.

## Use the deeper methods when the decision needs them

The following additions extend existing skills; they are not new catalog entries or mandatory
documents. Read the applicable method and incorporate its result into the continuous specification.

| Need                                    | Skill and conditional reference                                                                                | Reviewable result                                                                                                     |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Resolve interacting business rules      | [Requirements: decision tables](../skills/requirements-and-acceptance/references/business-rule-decisions.md)   | Rules with ownership, precedence, effective intervals, unresolved cases and acceptance examples.                      |
| Establish source-data readiness         | [Context: bounded profiling](../skills/feature-context-analysis/references/integration-data-readiness.md)      | Scoped findings, denominators, sample limits, correction owners and dependent work.                                   |
| Maintain code transformations           | [Contract: mapping lifecycle](../skills/feature-contract-definition/references/hcm-data-and-interactions.md)   | Versioned de/para, validity, source/target meaning and treatment of unknown codes.                                    |
| Verify business-state agreement         | [Contract: reconciliation](../skills/feature-contract-definition/references/integration-reconciliation.md)     | Comparable views, identity/value discrepancies, disposition and safe recheck.                                         |
| Request and compare estimates           | [Solution: integration estimation](../skills/feature-solution-analysis/references/integration-estimation.md)   | Scoped owner requests, coverage comparison, supported calculations and calendar uncertainty.                          |
| Prepare activation and support          | [Plan: transition and support](../skills/feature-implementation-plan/references/hcm-transition-and-support.md) | Rehearsal, continuity, stop/recovery observations and support handoff; independently reviewed for the relevant stage. |
| See the analysis journey connected      | [Coordination: benefits worked case](../skills/feature-engineering/references/hcm-benefits-worked-case.md)     | A complete fictional example, from questionnaire gaps to engineering handoff and failed reconciliation.               |
| Resume meetings or prepare a real pilot | [Coordination: pilot and handoff](../skills/feature-engineering/references/hcm-pilot-and-handoff.md)           | Baseline plus changes, customer/technical views and observations to collect.                                          |

For example: "Use `$feature-solution-analysis` to prepare an estimate request from this mapping
revision and compare the responses supplied by Senior and the provider. Separate effort from
waiting and do not infer an agreed delivery date."

The [depth extension review](hcm-depth-review.md) records the nine changed skills, their eight-pillar
coverage and validation limits. The catalog still contains 32 skills; their names and boundaries
remain appropriate for responsibilities reusable beyond HCM.

## Review the eight pillars

Catalog criteria are defined in [Eight pillars of skill quality](skill-quality-pillars.md).
The matrix below shows how each pair appears in the original six adaptations. It maps content for review;
it does not claim that all behaviors have been demonstrated in production.

| Skill                    | Precise scope / Discovery                                                               | Technical depth / Decision criteria                                                                                    | Solution quality / Execution                                                                 | Validation / Knowledge limits                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Collaborative definition | Interview and functional definition; notes and questions prioritized by consequence.    | Person/relationship, trigger and effective date; challenge the mechanism and smallest useful delivery.                 | Customer language and a continuous document; template with rules, acceptance and next round. | Review a normal path and exception; distinguish draft, acceptance and unverified capability.          |
| Context                  | Evidence for one request; choose product or repository paths according to the question. | Surface, coverage and confirmation; choose the next source by verification value and cost.                             | Proportionate report without copying manuals; environment record and resolved questions.     | Check product/version and coverage; separate documentation, configuration, account and observed test. |
| Solution                 | Choose an alternative; use rules and context before comparison.                         | Complete flows and mechanism failures; constraints, costs and reconsideration conditions.                              | Meet the need with justified complexity; produce an actionable recommendation.               | Check option equivalence; keep unknown feasibility conditional.                                       |
| Contract                 | Obligations after selection; read applicable contracts and rules.                       | Identity, effective dates, loading, duplication and recovery; decide details within the solution and return conflicts. | Minimum data and useful operator states; reviewable mapping and contract.                    | Interaction and compatibility criteria; local obligations do not create provider guarantees.          |
| Review                   | Explicit transition; gather existing evidence and revisions.                            | Assess consequences of identity, time, confirmation and recovery; continue, split or return according to dependencies. | Actionable, proportionate findings; report with owner and required correction.               | Separate readiness and acceptance testing; keep missing proof visible and retain mandatory criteria.  |
| Coordination             | Requested endpoint; resume known definitions and decisions.                             | Coordinate contracts, criteria and risks; choose depth, scope and return paths by consequence.                         | One coherent specification; useful deliveries, dependencies and owners.                      | Evidence-based gates and review; completed analysis does not imply an implemented integration.        |

The [evaluation cases and criteria](evaluations/hcm-skills/rubric.md) exercise discovery without
code, documentary context and a specification with conflicts between rules and contracts.
The [evaluation report](evaluations/hcm-skills/results.md) separates structural checks, content
review and simulated execution, with evidence and limitations. A real team request is still
needed to observe usefulness and maintenance in the working context. The later
[checklist and Connect runs](evaluations/checklist-connect/results.md) exercise first-meeting
preparation and a configuration recommendation using the 1.0.0 initial baseline.

See the [catalog assessment](hcm-catalog-assessment.md) for the role of all 32 skills, coverage
limitations and prioritized improvements, and the
[implementation plan](senior-hcm-business-analysis-plan.md) for the adoption sequence.
