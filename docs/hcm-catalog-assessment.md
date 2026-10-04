# Catalog assessment for Senior HCM business analysis

Date: 2026-10-04. Scope: the approved 32-skill catalog, including the English-language correction,
customer checklist/Connect intake, initial version reset and depth extensions to nine existing
skills. Those nine are now 1.1.0; the remaining skills and software packages retain 1.0.0.

**Conclusion:** the catalog provides a useful foundation for taking a customer need through
business definition, product investigation, solution comparison, integration contracts and
development preparation. Its strongest coverage is disciplined analysis and engineering handoff.
It is ready for a supervised pilot as an analysis aid; usefulness across real HCM projects has
not yet been demonstrated. It does not replace product-specific evidence or accountable owners.

Use the six entry points in the [HCM guide](hcm-business-analysis.md) and compose supporting
skills when their questions arise. The 32 skills are a catalog of responsibilities, not 32
mandatory steps for an analyst.

## Review basis

This assessment inspected all 32 entry-point descriptions and workflow responsibilities, the
relevant feature-stage rules, the six HCM references plus checklist/Connect material, depth/persistence and dossier conventions,
the catalog tests, and the existing evaluation records. Supporting skills were reviewed for
their role in this journey; this is not an exhaustive line-by-line audit of every supporting
reference or an eight-pillar certification of every possible behavior.

The [historical evaluation](evaluations/hcm-skills/results.md) contains six runs on three
synthetic cases. It supports specific observations about earlier Portuguese revisions. No live
customer workflow, Senior environment or automatic skill selection was exercised. The later
[checklist/Connect evaluation](evaluations/checklist-connect/results.md) records fresh English
runs and their limits separately. The [depth extension review](hcm-depth-review.md) adds a
per-skill pillar review and targeted exercises of the revised content, with its own limitations.
Coverage findings are document review; expected usability and productivity effects remain hypotheses.

## Findings and improvements, in priority order

### 1. Adoption evidence is narrower than the intended business workflow

The historical cases exercise a vague physical-access request, a benefits specification with
serious recovery gaps, and mismatched documentary context. They do not demonstrate a complete
real request progressing to engineering acceptance, nor a successful decision to solve the need
through existing configuration. The historical English cases are translations, explicitly unexecuted.
See the [case inventory and limits](evaluations/hcm-skills/results.md). The later
[two English runs](evaluations/checklist-connect/results.md) now demonstrate checklist-based
meeting preparation and a supported configuration recommendation in synthetic scenarios.
They still do not establish a real customer handoff or production behavior.

**Consequence:** the catalog's written coverage is stronger than the evidence for analyst
adoption. Avoid claiming measured time savings, less rework or comprehensive HCM coverage.

**Next improvement:** take an authorized real pilot through handoff, building on the synthetic
configuration/reuse and English meeting-preparation cases.
Record the exact versions, analyst corrections, unanswered handoff questions and reasons for
rework. Compare effort only across sufficiently comparable requests and artifact quality.
This is the highest-priority evidence gap, not a reason to stop useful drafting.

### 2. Repository-only context labels have been corrected

The [main phase graph](../skills/feature-engineering/SKILL.md#phase-graph), responsibility table
and [depth table](../skills/feature-engineering/references/depth-and-phases.md#which-phases-each-depth-runs)
now describe applicable repository, product/integration or combined evidence. This resolves
the textual inconsistency with the document-only HCM path. The code-investigation path remains
available; the correction does not establish runtime product behavior.

The new configuration case exercises orchestration from product documents. An ordinary
repository-based behavioral regression was not added in this follow-up.

### 3. Analysis state and implementation tracking now have an explicit boundary

The [HCM route](../skills/feature-engineering/references/hcm-analysis-route.md#connect-stage-outputs)
now records phase, definition revision, decisions and open questions in the analysis record
before delivery resources exist. It invokes resource progress tracking after those resources
are defined. This resolves the timing ambiguity without changing the tracker's meaning of
`DONE`: implemented and validated.

The document-only configuration case checks that analysis does not manufacture implementation
resources. Resumption across real meetings and implementation sessions still needs pilot evidence.

### 4. Applied depth has increased; actual process evidence is still needed

The original references address employment identity, effective dates, initial loading, confirmation,
recovery, product/version applicability and data minimization. The additions now provide filled
decision tables, bounded source-data profiling, maintained mappings, comparable reconciliation,
estimate requests and transition/support plans. The
[context reference](../skills/feature-context-analysis/references/senior-hcm-context.md) provides
official starting points, not a verified interface matrix for every module. The catalog contains
no dedicated, maintained process guide for payroll closing, time and attendance, benefits
eligibility or occupational health and safety business rules.

**Consequence:** analysts receive strong investigation questions, but still need an HCM specialist
and applicable documentation to establish actual product behavior. One benefits or access case
cannot establish coverage of those other processes.

The [benefits worked case](../skills/feature-engineering/references/hcm-benefits-worked-case.md)
now connects the full analysis journey using explicitly fictional policies and contracts.

**Next evidence:** add a worked, sourced request for the team's first real process,
covering product/module/build, business rules, data mapping, exceptions, ownership and acceptance.
Keep product evidence in context and contract references and load process detail conditionally.
Extend the existing skills before considering catalog expansion; new identifiers still require
an explicit scope decision.

### 5. A worked journey and pilot method are available; user feedback is pending

The [definition entry point](../skills/collaborative-feature-definition/SKILL.md) exposes lifecycle
identifiers, depth classes and separate authorship. New external integrations take `Deep/Dossier`
under the [depth rules](../skills/feature-engineering/references/depth-and-phases.md). These rules
protect consequential work; the [dossier convention](../skills/feature-engineering/references/dossier-layout.md)
already permits combined records and existing team formats.

**Consequence:** the analyst could see more engineering vocabulary than a first customer meeting
needs. This is a usability hypothesis, not a measured failure. Reducing visible ceremony must
preserve rules, open questions, authority and evidence.

The worked case connects questionnaire answers, rules, mapping, alternatives and engineering
handoff. The [pilot method](../skills/feature-engineering/references/hcm-pilot-and-handoff.md)
keeps a short customer-facing view and technical appendix on the same baseline, then resumes by
changed evidence instead of repeating discovery.

**Next evidence:** apply these views in the team's existing specification. Test whether the analyst
can identify the objective, next questions and handoff owner without learning the entire
identifier namespace. Keep applicable depth and acceptance obligations intact.

## Coverage across the journey

| Business situation                 | Existing support                                               | Assessment                                                                                                                                |
| ---------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| First customer conversation        | Collaborative definition, discovery and adaptive clarification | Good written support for concrete examples, existing notes, short rounds and material questions.                                          |
| Current and desired process        | HCM discovery reference and business acceptance                | Covers actors, triggers, data, outcomes and exceptions; a BPMN tool or formal notation is optional.                                       |
| Senior product fit                 | Product-context path and HCM solution options                  | Supports evidence-qualified standard/configuration/reuse/development decisions; actual enablement remains a customer-specific check.      |
| Business rules and scope           | Requirements, scope and decision ownership                     | Preserves person/relationship distinctions, effective dates, exclusions and observable acceptance.                                        |
| Feasibility and solution design    | Solution, architecture impact and bounded experiments          | Strong engineering support; the analyst contributes business constraints while technical owners establish feasibility.                    |
| Functional/technical specification | Contract definition and HCM data reference                     | Covers source/destination mapping, semantics, failure, recovery and compatibility with traceability.                                      |
| Backlog and engineering handoff    | Decomposition, implementation planning and readiness           | Supports valuable increments and dependencies; a completed business brief can still have engineering analysis pending.                    |
| Acceptance and operational handoff | Readiness, risk, contracts and execution evidence              | Separates a plan from a result and receipt from completion; real acceptance execution is not yet demonstrated by this catalog assessment. |

## Role of all 32 skills

The first table contains the 17 feature skills; the second contains their 15 approved supporting
skills. Roles describe where each helps in this context, not permissions to act or a mandatory
invocation sequence.

| Feature skill                                                                             | Role in the HCM journey                                                                                    | Who primarily uses the result                                               |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [collaborative-feature-definition](../skills/collaborative-feature-definition/SKILL.md)   | First conversations, iterative business definition and the separate engineering-analysis handoff.          | Analyst and business owner; engineering at its own stage.                   |
| [feature-architecture-analysis](../skills/feature-architecture-analysis/SKILL.md)         | Map affected systems, interfaces, stored data, consumers and implementation paths where available.         | Engineering, with analyst input on business impacts.                        |
| [feature-context-analysis](../skills/feature-context-analysis/SKILL.md)                   | Verify product/module/version, existing interfaces and evidence coverage, including without code.          | Analyst, HCM specialist and engineering.                                    |
| [feature-contract-definition](../skills/feature-contract-definition/SKILL.md)             | Define data mappings, identities, effective dates, confirmation, recovery and compatibility.               | Engineering and counterpart owners; analyst checks business meaning.        |
| [feature-decision-analysis](../skills/feature-decision-analysis/SKILL.md)                 | Record who chose what, from which evidence, under which authority and with which status.                   | Analyst and engineering.                                                    |
| [feature-decomposition](../skills/feature-decomposition/SKILL.md)                         | Separate valuable child outcomes during definition and implementation resources during delivery planning.  | Analyst for outcome slices; engineering for resources.                      |
| [feature-discovery](../skills/feature-discovery/SKILL.md)                                 | Separate sourced facts, provisional assumptions, unknowns and decisions.                                   | Analyst and every later owner consuming the evidence.                       |
| [feature-engineering](../skills/feature-engineering/SKILL.md)                             | Coordinate stages after intake, preserve revisions and stop at the requested endpoint.                     | Analyst with engineering during multi-stage analysis and delivery.          |
| [feature-execution](../skills/feature-execution/SKILL.md)                                 | Implement an authorized plan and validate coherent resources.                                              | Development team after readiness; outside an interview-only request.        |
| [feature-feasibility-experiment](../skills/feature-feasibility-experiment/SKILL.md)       | Resolve a specific capability uncertainty with a bounded, falsifiable experiment.                          | Engineering and product/interface specialists.                              |
| [feature-implementation-plan](../skills/feature-implementation-plan/SKILL.md)             | Assemble accepted decisions, resources, dependencies, verification and transition into an executable plan. | Engineering; not a substitute for its missing decisions or estimates.       |
| [feature-progress-tracking](../skills/feature-progress-tracking/SKILL.md)                 | Preserve resource status, evidence and blockers across delivery handoffs.                                  | Delivery owners once resources exist; early-analysis ambiguity noted above. |
| [feature-readiness-review](../skills/feature-readiness-review/SKILL.md)                   | Review a defined transition: business intake, development readiness or evidenced completion.               | Analyst, engineering and QA according to the reviewed stage.                |
| [feature-requirement-clarification](../skills/feature-requirement-clarification/SKILL.md) | Ask questions whose answers change work and block only dependent decisions.                                | Analyst and business owner; technical owners for their questions.           |
| [feature-risk-analysis](../skills/feature-risk-analysis/SKILL.md)                         | Turn concrete failure consequences into detection, mitigation, fallback and owned work.                    | Analyst for business impact; engineering/operations for controls.           |
| [feature-scope-analysis](../skills/feature-scope-analysis/SKILL.md)                       | Distinguish required, selected, optional, excluded and future work without silently changing commitments.  | Analyst, business owner and engineering.                                    |
| [feature-solution-analysis](../skills/feature-solution-analysis/SKILL.md)                 | Compare complete configuration, reuse and development alternatives on the same outcome.                    | Analyst and engineering; accountable owners accept the decision.            |

| Supporting skill                                                                            | Conditional contribution                                                              | Boundary in this context                                                            |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [architecture-coupling-and-quanta](../skills/architecture-coupling-and-quanta/SKILL.md)     | Identify release/runtime coupling and dependencies across parties.                    | Engineering analysis when independent deployment or shared data matters.            |
| [architecture-decision-making](../skills/architecture-decision-making/SKILL.md)             | Preserve consequential rationale, alternatives and supersession in a decision record. | Not a mandatory ADR for every business answer.                                      |
| [architecture-trade-off-analysis](../skills/architecture-trade-off-analysis/SKILL.md)       | Compare mechanisms, quality trade-offs and uncertainty on equivalent options.         | Supports solution analysis when a material architectural choice exists.             |
| [clean-delivery-workflow](../skills/clean-delivery-workflow/SKILL.md)                       | Sequence a concrete change with proportionate checks.                                 | Useful for engineering work; HCM discovery enters through collaborative definition. |
| [code-review](../skills/code-review/SKILL.md)                                               | Find actionable defects in an implemented change.                                     | Does not establish business acceptance or standard HCM product capability.          |
| [coding-agent-discipline](../skills/coding-agent-discipline/SKILL.md)                       | Keep changes scoped and completion claims tied to observed checks.                    | Delivery discipline, not a customer-interview method.                               |
| [debugging](../skills/debugging/SKILL.md)                                                   | Investigate reproducible faults and distinguish recovery from a demonstrated cause.   | Relevant when a trial or existing integration fails, not every new request.         |
| [delivery-semantics](../skills/delivery-semantics/SKILL.md)                                 | Explain acknowledgement, duplicate/loss windows and external side effects.            | Helps engineering establish actual completion and recovery semantics.               |
| [failure-models](../skills/failure-models/SKILL.md)                                         | Model partial failure, timing and unknown outcomes.                                   | Supports concrete integration risks; does not supply provider guarantees.           |
| [layering-and-boundaries](../skills/layering-and-boundaries/SKILL.md)                       | Place and enforce application boundaries.                                             | Conditional on implementation design; not an HR process model.                      |
| [quality-gates](../skills/quality-gates/SKILL.md)                                           | Choose risk-appropriate automated checks and interpret failures.                      | Passing CI is not evidence of customer acceptance by itself.                        |
| [requirements-and-acceptance](../skills/requirements-and-acceptance/SKILL.md)               | Convert business needs and exceptions into observable acceptance criteria.            | Directly useful to the analyst; avoids inventing targets or technical mechanisms.   |
| [rpc-and-api-contracts](../skills/rpc-and-api-contracts/SKILL.md)                           | Refine API interactions, error contracts, compatibility and transitions.              | Requires the applicable actual API; does not identify Senior endpoints from memory. |
| [schema-evolution-and-compatibility](../skills/schema-evolution-and-compatibility/SKILL.md) | Verify reader/writer compatibility and retained-data transitions.                     | Use only when relevant formats and independently changing versions are present.     |
| [technical-debt-decisions](../skills/technical-debt-decisions/SKILL.md)                     | Assess bounded shortcuts, carrying cost and repayment conditions.                     | Does not waive mandatory correctness, recovery or acceptance requirements.          |

## Assessment against the eight pillars

| Pillar            | Written support relevant to this journey                                                                   | Remaining evidence or refinement                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Precise scope     | Distinct stages, entry points and requested endpoints; analyst and engineering authorship remain separate. | Pilot the corrected document-context and analysis/resource boundaries.                                  |
| Discovery         | Facts/assumptions/unknowns, consequence-driven questions and document-only HCM investigation.              | Exercise a real interview and resumption with the team's notes and vocabulary.                          |
| Technical depth   | Identity, effective dates, confirmations, partial failures, recovery, contracts and compatibility.         | Establish module-specific behavior from applicable sources and representative tests.                    |
| Decision criteria | Mandatory constraints before preference; complete alternatives, costs, uncertainty and reversibility.      | Review the synthetic configuration case, then verify a real reuse outcome.                              |
| Solution quality  | Simple feasible options, data minimization, coherent artifacts and operator actions.                       | Measure customer-summary clarity and analyst effort; avoid equating document length with quality.       |
| Execution         | Concrete definitions, mappings, decision records, plans and reviewable handoffs.                           | Demonstrate one full request through engineering refinement; analysis alone does not implement it.      |
| Validation        | Planned/executed evidence separation, acceptance traceability and readiness/completion distinctions.       | Extend the new English cases with a real pilot; tooling tests do not establish analyst usefulness.      |
| Knowledge limits  | Sources, product/version scope and unverified guarantees remain explicit.                                  | Maintain official-source applicability and avoid turning one successful case into general HCM coverage. |

## Boundaries the team should retain

Effort estimates, delivery dates, commercial proposals and licensing confirmation are not supplied
by the catalog. Decomposition and implementation planning explicitly avoid inventing estimates;
responsible teams must provide them. Likewise, the catalog helps expose legal/privacy questions
but supplies no comprehensive HCM legal rulebook or compliance certification.

A functional definition may be complete while technical feasibility remains pending. A specification
may be ready for development while acceptance testing remains unexecuted. Accountable HCM,
engineering, counterpart and business roles remain necessary for their decisions.

## Recommended next increment

Keep the 32-skill scope. The checklist workshop, Connect context and applied methods now support
the team's supplied material through engineering preparation and operational planning. The
[naming review](catalog-naming-review.md) retains the identifiers and explains adjacent roles.
The nine extended skill names still match their responsibilities; no rename or new entry is needed.
Use the prepared pilot on an authorized real demand to validate the handoff and prioritize process-specific references
from the resulting evidence. A complete real HCM example, observed analyst feedback and customer
environment validation remain the most useful next evidence.
