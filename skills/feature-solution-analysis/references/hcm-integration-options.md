# Compare solutions for an HCM integration

Use when an HR/personnel administration need may require configuration, reuse or development.
Deliver a reviewable comparison and recommendation. The decision and its acceptance remain with
the accountable owners; analysis does not authorize promises of product changes or counterpart work.

## Define the choice

Read the business definition, acceptance criteria and context report. Identify the population,
outcome, temporal rule and data ownership. Separate mandatory constraints from preferences:
lower cost cannot compensate for missing a contractual deadline.

When missing information changes the choice, seek available evidence or ask a bounded question.
"Send employees" does not establish whether the destination stores people or employment
relationships, receives history or a current snapshot, or how it confirms completion. Continue
independent comparisons, but do not silently choose those rules to complete an alternative.

## Assess product coverage

For each mandatory outcome, keep an entry containing the requirement, applicable evidence,
conditions of use, responsible party and one of these states:

- Supported as standard, under the recorded evidence and conditions.
- Supported through configuration, with known prerequisites and confirmed or pending enablement.
- Partially supported, with the functional gap identified.
- Unsupported by the capability examined, with evidence of the limit.
- Unverified, with the next evidence required.

One interface's limit does not establish the absence of all product alternatives. State "requires
development" only after examining relevant options, or as an explicitly conditional hypothesis.
A coverage gap is not automatically a project-accepted `GAP-*`.

Record two separate conclusions: **coverage** (standard/configuration/reuse/custom/unverified)
and **execution mechanism/platform** (the applicable interface and, if relevant, Connect).
A documented product action is not proof that a complete customer integration is standard.
Conversely, a checklist labeled "new integration" does not prove new code is needed.

For Connect, compare existing supported flows, configuration of a documented capability,
composition of a new flow and an external service only where relevant. Include custom mappings,
counterpart changes, enablement, monitoring, recovery and ongoing support in the work/cost.
Use the context report's evidence rather than treating the training manual as customer-specific
feasibility. Keep classification provisional while a decisive artifact is still missing.

## Form complete alternatives

Consider options relevant to the case, including the simplest one that satisfies the obligations:

| Possibility                             | Condition that may favor it                                                | Cost or limit to verify                                                                           |
| --------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Process adjustment                      | Available behavior can already produce the outcome.                        | Recurring user effort, error risk and capacity at expected volume.                                |
| Configuration of an existing capability | Product, version and configuration cover the required flow and exceptions. | Enablement, impact on other flows, maintenance and support.                                       |
| Reuse of an integration                 | Semantics, population and responsibilities are compatible.                 | Coexistence, duplication, customizations, transition and operational capacity.                    |
| Integration service                     | Supported interfaces can resolve a concrete gap.                           | Development, hosting, support, recovery and contract updates.                                     |
| Product or counterpart enhancement      | The required capability belongs to one of these parties.                   | Feasibility and priority require confirmation by the owner; do not assume a deadline or approval. |

These categories may coexist. Compare complete combinations for the same outcome; "API", "queue"
and "configuration" are not three equivalent solutions. Describe the flow, who does what, how the
result is confirmed and how a relevant failure is handled in each alternative.

## Compare mechanisms and consequences

For each feasible or conditional alternative, trace a normal case and a failure case from start
to destination confirmation. Assess only mechanisms actually available or explicitly proposed:

- Periodic queries depend on change filters, pagination and resumption rules. Querying only new
  hires does not establish capture of later corrections. A short interval does not guarantee
  completion time if queues, processing or limits remain unexamined.
- An event or webhook depends on documented availability, content, coverage, redelivery, ordering
  and recovery. Do not invent an HCM event to justify a preference for that mechanism.
- A file requires a layout version, cutoff, confirmation and batch/record handling. A delivered
  file may still contain unresolved rejections.
- A synchronous response needs a contractual meaning of success. A timeout can leave the effect
  unknown; retrying requires checking identity, deduplication or reconciliation.

Choose the dimensions that change the decision: rule correctness, required deadline, user effort,
visibility of outstanding items, maintenance, compatibility, adoption/operating costs and reversal.
Use estimates with a basis and owner. Do not turn ordinal ratings into a precise total or assign
zero cost to work whose effort is still unknown.

An interface representing only a person may not satisfy a destination requiring two independent
employment relationships. A future effective-date rule cannot disappear because an option makes
immediate transmission convenient. Record the incompatibility and investigate composition or an
authorized rule adjustment.

When estimate inputs or responses affect the comparison, use
[Integration estimation](integration-estimation.md). Carry the same population, mapping,
recovery and transition obligations into each request, and keep each party's forecast attributable.

## Resolve what could change the recommendation

Eliminate an option only because of a supported constraint. If a small feasibility check decides
between options, use `feature-feasibility-experiment` with the property, success criterion,
authorized environment and consequences of each result. A planned test does not confirm support.

If evidence cannot support a choice, deliver a conditional recommendation or leave the choice
open. For a rejected option, state which change would make it competitive. Stop investigating
when remaining uncertainty would not materially change the decision; do not invent a proof of
concept for a low-impact local preference.

## Deliver and check

```text
Choice and input revisions:
Outcome/population and mandatory constraints, with sources:
Product coverage: requirement -> evidence -> coverage/gap
Alternative: complete flow, responsible parties and feasibility conditions
Consequences: relevant correctness, usability, maintenance, cost and reversal
Representative failure and recovery:
Recommendation: supported / conditional / choice open
Decisive evidence and what would change the choice:
Next action: required check, decision or owner
```

Check that options preserve the same rule, population and completion milestone. Verify whether
the recommended option can operate with existing data and whether any required work lacks an
owner. Keep observations, estimates and pending checks identifiable. Comparison quality depends
on evidence and usefulness for the decision, not the number of alternatives.
