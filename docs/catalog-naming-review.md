# Skill naming review

Date: 2026-10-03. Scope: all 32 approved skill identifiers and their stated responsibilities.

**Conclusion:** retain the current identifiers. They consistently name reusable responsibilities
rather than a single customer, product or transport. The catalog covers the analyst's journey
with specialist engineering support; it is not 32 meeting steps. HCM and Connect belong in
activation descriptions and conditional references because some requests are outside HCM and
some HCM solutions will not need Connect.

This review checks scope/name fit and possible ambiguity, not automatic skill-selection behavior.
Skill identifiers were retained. The later npm namespace change is recorded below.

## Main entry points

| Identifier                         | Fit and distinction the analyst should see                                                                                                                                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collaborative-feature-definition` | Fits co-authoring a business definition through conversation. Use for the returned checklist and first meeting; includes the possibility that no delivery is justified.                                                                     |
| `feature-engineering`              | Fits coordination through analysis, planning and delivery. It is a technical umbrella and may sound implementation-only, so the guide explicitly includes analysis-only endpoints and routes initial definition to the collaborative skill. |
| `feature-context-analysis`         | Fits evidence from product documents, contracts, configuration or code. The name does not require repository access.                                                                                                                        |
| `feature-solution-analysis`        | Fits comparing complete options, including configuration, reuse and development; it does not accept the decision.                                                                                                                           |
| `feature-contract-definition`      | Fits technical API/data/operational obligations. Clarify that "contract" here is not the customer's commercial contract.                                                                                                                    |
| `feature-readiness-review`         | Fits checking intake, implementation readiness and completion evidence. State the transition to avoid reading every review as permission to implement.                                                                                      |

## Other feature responsibilities

| Identifier                          | Fit and boundary                                                                                                                            |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `feature-discovery`                 | Establish known facts, assumptions and unknowns; complements the collaborative conversation rather than owning the whole customer workshop. |
| `feature-requirement-clarification` | Resolve consequential gaps in requirements; does not repeat the full questionnaire.                                                         |
| `feature-scope-analysis`            | Establish included, excluded and deferred behavior.                                                                                         |
| `feature-architecture-analysis`     | Map impact and boundaries; distinct from choosing a complete solution.                                                                      |
| `feature-decision-analysis`         | Establish decision provenance, authority and outcome; distinct from option comparison and the ADR writing method.                           |
| `feature-feasibility-experiment`    | Run a bounded experiment for a decisive uncertainty; does not imply that every demand needs a PoC.                                          |
| `feature-decomposition`             | Split independently useful work only when warranted.                                                                                        |
| `feature-risk-analysis`             | Assess failure consequences, detection, controls and residual risk.                                                                         |
| `feature-implementation-plan`       | Prepare executable engineering work after sufficient analysis; not a first-meeting agenda.                                                  |
| `feature-execution`                 | Implement defined resources and verify them.                                                                                                |
| `feature-progress-tracking`         | Track implementation-resource status and evidence. Before resources exist, use phase/revision/questions in the analysis record.             |

## Supporting responsibilities

| Identifier                           | Fit and intended audience                                                                                                                          |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `requirements-and-acceptance`        | Directly useful to analysts for observable requirements and acceptance criteria.                                                                   |
| `architecture-trade-off-analysis`    | The comparison method used by solution analysis.                                                                                                   |
| `architecture-decision-making`       | ADR writing/lifecycle; distinguish from feature-specific decision ownership.                                                                       |
| `architecture-coupling-and-quanta`   | Accurate specialist terminology for release/runtime boundaries; explain the relevant boundary in business language when reporting to the customer. |
| `delivery-semantics`                 | Accurate technical name for acknowledgement, duplication, loss and externally visible effects.                                                     |
| `failure-models`                     | Accurate technical foundation for partial failure and unknown outcomes.                                                                            |
| `rpc-and-api-contracts`              | Accurate API interaction and compatibility specialization.                                                                                         |
| `schema-evolution-and-compatibility` | Accurate schema-change specialization.                                                                                                             |
| `layering-and-boundaries`            | Accurate implementation design specialization.                                                                                                     |
| `technical-debt-decisions`           | Accurate shortcut, carrying-cost and repayment decisions.                                                                                          |
| `clean-delivery-workflow`            | General change workflow, distinct from coordinating a feature definition and its lifecycle.                                                        |
| `coding-agent-discipline`            | Rules for the coding agent's scope and evidence claims; not an analyst interview method.                                                           |
| `code-review`                        | Review implemented changes; not business acceptance.                                                                                               |
| `debugging`                          | Diagnose observed faults; conditional on an existing failure.                                                                                      |
| `quality-gates`                      | Select automated verification; does not certify customer acceptance.                                                                               |

The overlapping words "discovery", "analysis", "definition" and "decision" express adjacent
stages. The guide's task-to-entry-point mapping is more useful than renaming all stages to HCM
or Connect. Reconsider a name if pilot evidence shows repeated wrong selection despite a clear
activation description; no such behavior has been demonstrated by this naming review.

## npm package namespace

The user selected `@senior-skills` for the project packages. The command-line package is
`@senior-skills/cli`; the executable remains `senior-skills`. The other packages are
`@senior-skills/core`, `@senior-skills/node`, `@senior-skills/registry`,
`@senior-skills/installer`, `@senior-skills/adapter-claude` and `@senior-skills/adapter-codex`.
Imports, workspace dependencies, release metadata, update detection and installation receipts
use those package names. This repository change does not register an npm organization or
publish any package.

## Initial version baseline

The user confirmed that the project has not been published to npm and explicitly selected a
reset to **1.0.0 for everything**. This establishes the initial local baseline for the 32 skills,
the root project and seven workspace packages, including the CLI-reported version. Internal
package dependencies, skill dependency ranges and generated indexes must resolve against it.
Third-party dependency versions, schema versions and historical evaluation snapshots retain
their original meanings. This one-time reset does not change the rule requiring version bumps
for subsequent packaged content changes and does not constitute publication or installation.
