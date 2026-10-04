# HCM track evaluation

These criteria belong to the evaluator, not the agent's inputs. Cases in `cases/` are synthetic
and do not describe real counterpart products. This is the English translation of the original
rubric. The [archived rubric](archive/rubric.txt) and [archived inputs](archive/README.md) preserve
the materials used in the historical runs; the English case translations have not been executed.

## Comparable runs

Compare a preserved previous version with the adapted version using the same case, model, tools,
output limit and access instructions. Use fresh contexts and separate catalog snapshots. Each
agent receives only its case and snapshot, and may write only its temporary result. This separation
is procedural: tools share filesystem access, without an inter-agent sandbox. Check reported
read paths and disclose deviations or audit limitations.

Explicitly invoke `collaborative-feature-definition` for discovery and `feature-engineering`
for solution/readiness. This tests explicit usage, not automatic selection. Do not give the agent
the plan, this rubric, prior outputs or suspected defects.

## Discovery

| Criterion         | Expected response evidence                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| Precise scope     | Produces an initial definition and up to three questions; neither implements nor treats the draft as accepted.        |
| Discovery         | Reuses supplied rules and prioritizes unknowns that change the flow; missing code does not stop discovery.            |
| Technical depth   | Distinguishes person/relationships, identity and effective dates without inventing a technical solution.              |
| Decision criteria | Explains what changes with deadline, confirmation, population or interface capability.                                |
| Solution quality  | Understandable to analyst/customer, without repeating answered questions or imposing unnecessary ceremony.            |
| Execution         | Delivers a draft with rules, open items and a next action within the word limit.                                      |
| Validation        | Provides observable criteria or a proposal to define them; does not claim acceptance testing or measured improvement. |
| Knowledge limits  | Does not turn "API for everything" into a technical fact or CPF into an approved key.                                 |

## Solution and readiness

| Criterion         | Expected response evidence                                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Precise scope     | Delivers comparison, contract gaps and readiness findings; preserves BD-r3 and separate authorship.                                 |
| Discovery         | Uses RT-r2/VF-r4 and identifies missing module, interface and guarantees; does not request renewed approval of accepted rules.      |
| Technical depth   | Identifies relationship identity, effective dates, unknown outcome, partial failure and initial/incremental transition.             |
| Decision criteria | Nightly processing cannot meet 30 minutes; queries/events remain conditional; query frequency does not prove final completion time. |
| Solution quality  | Defines viable refinement work without imposing technology or duplicating resolved obligations.                                     |
| Execution         | Assigns actions and owners, including independent work; neither stops everything nor begins dependent implementation.               |
| Validation        | A green build and partial trial do not prove acceptance; proposes relevant checks and keeps planned evidence pending.               |
| Knowledge limits  | Does not invent deduplication, lookup by key, provider deadlines, HCM APIs or events; does not claim full readiness.                |

Record satisfied, partial or unsatisfied with response location and limitations. Do not aggregate
scores in a way that hides a material defect. One run per case/version does not measure variability
or establish general causal improvement. Cases merely written or reviewed remain unexecuted.

## Context without code

This additional case explicitly invokes `feature-context-analysis`; its criteria were defined
before execution. Check documentary scope, proportionate investigation and report usefulness.
Distinguish reported and observed versions; do not transfer Recruitment and Selection 6.10.4
capabilities to Personnel Administration 6.10.3, turn a new-hire query into change capture or extend
an internal integrator to any destination. A sample without context does not confirm customer
capability. Expect checks prioritized by consequence, without unnecessary access requests,
invented interfaces or claims of universal absence. This run assesses the adapted version only,
not a comparison with the previous version.
