---
name: feature-context-analysis
description: >
  Establish evidence for one feature from its repository or product and integration context.
  Use before proposing reuse or technology, when existing capabilities are asserted without
  evidence, or when Senior HCM or Connect needs module, version, configuration, interface or
  sample-data readiness verification without source-code access. Report supported findings, reuse candidates,
  source conflicts and bounded unknowns. Does not select a solution or authorize technology
  (feature-decision-analysis), own the impact map (feature-architecture-analysis), or audit
  an entire codebase for defects.
---

# Feature Context Analysis

## Purpose

Two things go wrong when this phase is skipped.

The agent asks the user questions the code answers, spending the user's attention on facts and
then having none left for the decisions only the user can make. Or the agent builds in a style
the codebase does not use — a second HTTP client, a third validation approach, an abstraction
that already exists two packages away — and the review is about the shape of the code rather
than about whether the feature is right.

The output is a **context report**: findings cite evidence and distinguish observation, inference
and unresolved questions. "Not found in this sweep" is bounded search evidence, not proof of
absence throughout the system.

## Choose the evidence path

For repository questions, use [the investigation checklist](references/investigation-checklist.md).
For Senior HCM products or integrations, read
[Senior HCM context](references/senior-hcm-context.md), using documentation, supplied configuration,
contracts and sanitized examples. Combine the paths only when both can answer material questions.
When Connect is a candidate or an existing participant, read
[Senior Connect context](references/senior-connect-context.md). This path also applies outside HCM;
check the platform and each business interface separately. A training manual or generic action
does not establish a deployed contract or standard integration coverage.
Missing source access does not block product-context analysis; it limits implementation claims.
Preserve product/module/version and environment scope rather than treating an HCM product family
name or a published API as proof of the customer's enabled capability.

When supplied data quality could change integration feasibility, initial loading or a mapping,
read [Integration data readiness](references/integration-data-readiness.md). Profile only authorized,
sanitized evidence against identified rules; report its population and time limits. This path
does not correct source records or establish end-to-end reconciliation, whose obligations belong
to `feature-contract-definition`.

## Workflow

1. **Scope the sweep to the feature.** Identify the product or repository area, input revision
   and material questions. For code, inspect relevant paths and their immediate collaborators;
   for product context, identify the exact modules, environments and interfaces involved.
   If the feature is too ambiguous to select evidence, ask the smallest scope question;
   investigation does not require delaying a question only the user can answer.
2. **Work the applicable evidence path above**, not both checklists automatically.
   Relevant concerns get a finding, bounded "not found", "not examined" or "unavailable".
3. **Cite findings to their sources.** Use `path:line` or a command with captured output and
   its target module/profile/configuration, or a document section with product/version,
   access date and environment coverage. Dependency coordinates and versions identify an
   artifact; also cite what establishes its declared or resolved status. A material claim not
   established by evidence remains unknown; label it an assumption only when provisionally
   adopted, with its basis and falsifier.
4. **Close the unknowns it can close.** Walk the discovery ledger and mark each unknown this
   sweep answered, with the evidence. This is the phase's main product.
5. **List reusable components or interfaces** by name and location, with what each would need.
   Trace a representative caller or documented interaction: target module/configuration availability,
   lifecycle, input/output and failure contracts can rule out a superficially similar component.
   Distinguish a plausible candidate from verified compatibility; choosing it remains a decision.
6. **List the conflicts** — anything in the request that verified implementation or product
   constraints make awkward, expensive or impossible, and the evidence supporting that conclusion.
7. **Separate observed technologies from required constraints.** A technology mandate needs
   an applicable policy, contract or accepted decision with source and authority; presence in
   the implementation does not supply that authority.
8. **Preserve traceability.** Assign or reuse `F-*` for evidenced facts with linked sources, and
   resolve `U-*` by appending the fact/source. Preserve each identifier's meaning; name the input
   feature revision so later baseline changes can invalidate findings.
   Reuse the existing ledger when present; otherwise concise inline IDs/unknowns are enough.
   Record inspected source revisions and environment coverage as well as the feature input;
   include repository revision and relevant working-tree changes when code was inspected.

## Decision rules

```text
IF a pattern appears repeatedly
THEN report instances, independent contexts, counter-examples and declared/enforced policy.
     Repetition alone does not establish authority or decide this feature's design.

IF a pattern appears once
THEN it is evidence of that instance, possibly the closest relevant precedent;
     explain its scope without generalising it to the whole project.

IF a technology is declared but no direct source use was found
THEN distinguish declared, resolved for the target configuration and observed active use.
     Check configuration, auto-configuration, generated code and reflective loading when relevant;
     absence of imports does not prove it unused or available on the target runtime.

IF no implementation was found in the inspected scope
THEN state paths, search terms and limits; deployment/platform behavior may live elsewhere.
     Check whether relevant hidden/ignored or generated paths were outside the search population;
     an empty default search is not evidence that those paths contain no implementation.
     Report "not found here", not "the project does not need it".

IF documentation, configuration, tests or implementation disagree
THEN retain the competing claims with their revisions and target environments. Establish what
     each source proves; desired policy and observed behavior can both be real and inconsistent.
     Do not resolve the unknown by selecting the newest file or the first example. Name the
     discriminating check, or pass the conflict to clarification/decision with its consequence.

IF the feature needs a capability and something close already exists
THEN name it, say precisely what it lacks, and let the decision phase choose between
     extending it and adding a second one.

IF version-specific source-code API behaviour matters
THEN inspect compiler release/toolchain and resolved dependency evidence for the relevant
     module/profile/configuration, including parents/BOMs/constraints and runtime image.
     If resolution is unavailable, label the declared version and leave behavior conditional.
     Preserve target versions rather than upgrading them to fit an API.
```

## Constraints

- **Observation is not authorisation.** "The project uses Kafka" is a fact about the project.
  "This feature will use Kafka" is a decision, and it is not this phase's to make.
- **Do not infer a standard from a majority.** Consistency across a codebase can mean a
  standard, a template, or one person who wrote most of it. The report says how many places and
  whether there is a counter-example; it does not conclude.
- **Do not report what you did not read.** "The codebase appears to use X" without a path is
  the failure mode this phase exists to prevent.
- **Inspect collection commands before running unfamiliar build logic.** A dependency-report
  task can evaluate project/plugin configuration and resolve artifacts; its name does not make
  it a passive file read. Prefer applicable existing reports, then understood commands within
  the task's authorized effects. Do not edit build files or lockfiles just to obtain a finding;
  report unavailable resolution and continue independent static inspection instead.
- **Do not fix anything.** Defects found during the sweep are reported, not repaired — they are
  either in scope, in which case the scope phase adds them, or they are someone else's change.

## Output

```text
Existing architecture      <shape, with the paths that show it>
Input revisions            <Product/Engineering or Tech Feature revision IDs>
Evidence path              <repository | product/integration | both; coverage and access limits>
Product context            <when applicable: products/modules/versions, environments, interfaces>
Relevant modules           <path -> what it owns>
Relevant components        <name, path, what it does>
Existing patterns          <pattern, count within inspected scope, counter-examples>
Existing technologies      <name, version, where used, observed>
Reusable components        <name -> what it would need>
Potential conflicts        <request item vs what the code makes hard, with evidence>
Source disagreements       <competing claims, revision/target, consequence and next check>
Constraints from the code  <enforced/documented requirement vs change cost, with evidence>
Questions answered         <U-* -> F-*, evidence>
Still unknown              <U-nn, search limits/access gaps, smallest next evidence or question>
```

Scale the report to the feature: omit irrelevant rows and reuse existing artifacts. For product
context, use the applicable HCM or Connect report template instead of filling code-only rows.
Before handing off, verify cited sources match the applicable revision and each resolved unknown
is actually supported.
Do not mark a product decision answered merely because one implementation was found.
End the sweep when material questions in scope have supported answers or bounded evidence/access
gaps with the next check or accountable role identified. Expand only when further inspection could
change the feature decision or resolve a material gap; unrelated unread modules do not prevent handoff.
