# Business-rule decisions

Read when several conditions, exceptions or dates change a business outcome, or policy accounts
disagree. Use one rule in prose when it is unambiguous; use a decision table when comparing
combinations makes gaps or conflicts visible. This is business analysis, not an executable rule
engine, legal interpretation or evidence of a Senior HCM capability.

## Turn accounts of policy into decisions

1. **Name one decision and its unit.** State the outcome, population and event/date being
   evaluated. A person, employment relationship and benefit enrollment are not interchangeable.
   Separate decisions such as eligibility, transmission and activation when they can differ.
2. **Recover evidence before asking.** Reuse supplied policy, examples and recorded decisions;
   retain source, revision, applicability and authority. A common practice or current program
   establishes observed behavior within its coverage, not automatically an approved rule.
3. **List material conditions and outcomes.** Define terms and boundary values. Distinguish
   `No`, `Unknown` and `Not applicable`; a blank or missing field is not evidence of `No`.
   Use `Any` only when that condition truly cannot affect this row's outcome.
4. **Expose gaps and overlaps.** List which rows match representative combinations. No row
   means a missing rule unless an authorized default covers it. Multiple rows with different
   outcomes need an explicit resolution. Even equal outcomes may differ in duties, dates or
   side effects; check those before treating the overlap as harmless.
5. **Propose a resolution with consequences.** Compare the feasible choices: make conditions
   exclusive, apply a named priority, or permit combined outcomes when the business requires
   them. Explain the affected population and what evidence would change the recommendation.
   Table order, the newest document and "the stricter rule" are not implicit authority.
6. **Record the accountable decision.** The analyst proposes; the evidenced business owner
   accepts, rejects or leaves the rule open. Reuse decisions already made for this scope and
   revision. Record absent authority and ask only the question that changes the decision;
   continue independent analysis while the affected combination remains unresolved.

A compact row needs: `BR-ID | conditions | outcome | effective interval | precedence |
source/revision | accountable owner | proposed/accepted/open`. Shared fields may appear once
above the table. Attach `U-*`/`Q-*` items to missing policies and data; do not create a blanket
"otherwise reject" row to make an incomplete table look complete. `OPEN` is an analysis status,
not authorization to add a runtime rejection, hold or manual-review workflow.

## Dates, exceptions and responsibility

State which date selects the policy version, with inclusive/exclusive boundaries and relevant
business calendar/timezone. Distinguish policy validity, the event's effective date, when someone
recorded it and when a system received it. A later arrival does not by itself authorize applying
today's policy or reversing an earlier result. Ask whether a correction re-evaluates history,
changes only future outcomes or needs another business decision; leave that unresolved if there
is no applicable authority.

For an exception, name the rule it overrides, qualifying evidence, affected relationships,
approving role and validity/expiry. Check whether it can override other exceptions or exclusions.
Avoid "most specific wins" unless the owner has defined specificity and tie handling. If an
exception expires, check its last valid date and the next date under the ordinary rule.

The business owner defines eligibility and intended outcomes. Source-data owners establish or
correct facts. Engineering establishes interface feasibility and technical contracts in its
authorized stage with its identified author. A policy table cannot prove an API supports a
future-dated activation or historical correction. Preserve these questions in the handoff rather
than choosing an endpoint, protocol or retry behavior during the initial business interview.

## Filled fictional HCM example

All organizations, policies, decisions and dates below are invented teaching data. They assert
no Senior feature, provider behavior, employment entitlement or legal obligation.

Fictional request: "Register people for the learning allowance when HR creates their record."
The analyst separates record creation from the decision: **is this employment relationship
eligible on business date D?** The business owner must separately define when transmission
and activation are intended; engineering later verifies interface support. A successful send
would not establish eligibility or activation.

In this example only, fictional policy `LP-v1` and its replacement `LP-v2`, with decision
record `DR-7`, establish the following. Owner for every accepted row: **Learning Policy Owner**;
HR Operations owns the input facts. `D` is a calendar date in the employer's business calendar,
not the receipt date. `LP-v1` applies on `[2030-01-01, 2030-07-01)` and `LP-v2` from `2030-07-01`
inclusive. Both versions evaluate each relationship separately. Group names `Regular` and
`Temporary` are the fictional policy's classifications, not inferred legal categories.

An exception counts as `Yes` only when HR has evidence of this owner's approval for this
relationship and D lies in its validity interval. `No` means confirmed absent or expired;
missing evidence is `Unknown`. Cancellation overrides every eligibility allowance; a future
start prevents current eligibility even with an exception. These priorities were decided in
fictional `DR-7`; they are not defaults to copy into a real brief.

| Rule  | Policy interval          | Conditions at D                                            | Outcome          | Priority   | Source         | Status              |
| ----- | ------------------------ | ---------------------------------------------------------- | ---------------- | ---------- | -------------- | ------------------- |
| BR-01 | From 2030-01-01          | Cancellation confirmed; other conditions Any               | Not eligible     | 1, highest | LP-v1/v2, DR-7 | Accepted in example |
| BR-02 | From 2030-01-01          | No cancellation; start date > D; group/exception Any       | Not yet eligible | 2          | LP-v1/v2, DR-7 | Accepted in example |
| BR-03 | From 2030-01-01          | No cancellation; start date <= D; Regular; exception Any   | Eligible         | 3          | LP-v1/v2       | Accepted in example |
| BR-04 | From 2030-01-01          | No cancellation; start date <= D; Temporary; exception Yes | Eligible         | 3          | LP-v1/v2, DR-7 | Accepted in example |
| BR-05 | [2030-01-01, 2030-07-01) | No cancellation; start date <= D; Temporary; exception No  | Not eligible     | 3          | LP-v1          | Accepted in example |
| BR-06 | From 2030-07-01          | No cancellation; start date <= D; Temporary; exception Any | Eligible         | 3          | LP-v2          | Accepted in example |

BR-04 and BR-06 intentionally overlap after July 1 for a valid exception; both yield `Eligible`
with no different duty in this fictional decision. Their shared priority is therefore harmless
here. Record both matching rule IDs. An additional notification or different start date would
require another decision. Other group values for started, uncancelled relationships and all
dates before 2030-01-01 are uncovered, not automatically ineligible. Unknown input prevents a conclusion only when it could change the
outcome: unknown exception status for Temporary in June is material; for Regular in June it is
irrelevant under BR-03. Do not demand irrelevant evidence merely to fill every cell.

**Why this table changed the draft.** The initial statements "Regular relationships qualify"
and "cancelled relationships do not qualify" overlapped. The analyst proposed either giving
cancellation priority or honoring eligibility already established before cancellation, and
explained that the second option needed a rule for its duration. Fictional DR-7 selected the
first; BR-03 now says `No cancellation`. A request to retain prior coverage would reopen that
decision, not be silently dismissed by the table.

**Counterexample.** A Temporary relationship started on June 1, with no exception, is evaluated
for June 30; the correction arrives on July 2. Applying the latest policy would wrongly return
`Eligible`: DR-7 selects policy by D, so BR-05 yields `Not eligible`. The fictional policy has
not yet decided what to do if a provider already activated it. Record that correction question
as open; do not infer a reversal endpoint or recovery policy. Likewise, replacing an unknown
exception with `No` in June would turn missing evidence into an unsupported denial.

## Validate combinations and preserve the result

Walk through representative inputs with the responsible owner, reusing applicable recorded
review. For the example, the expected reasoning is:

| Case                       | Inputs differing from a started, uncancelled relationship                    | Expected result and rule                            |
| -------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------- |
| Normal                     | Regular, D = June 30, 2030                                                   | Eligible, BR-03                                     |
| Policy boundary before     | Temporary, exception No, D = June 30, 2030                                   | Not eligible, BR-05                                 |
| Policy boundary after      | Same inputs, D = July 1, 2030                                                | Eligible, BR-06                                     |
| Overlap                    | Temporary, exception Yes, D = July 1, 2030                                   | Eligible, BR-04 and BR-06 agree                     |
| Exclusion versus exception | Cancellation confirmed, Temporary, exception Yes, D = June 30, 2030          | Not eligible, BR-01                                 |
| Future start               | Regular, start July 1, D = June 30, 2030                                     | Not yet eligible, BR-02                             |
| Exception expiry           | Temporary, exception valid [June 1, June 30), D = June 29 then June 30, 2030 | Eligible BR-04, then not eligible BR-05             |
| Missing relevant fact      | Temporary, exception Unknown, D = June 30, 2030                              | OPEN: evidence needed; cannot choose BR-04 or BR-05 |
| Uncovered group            | Group Other, D = June 30, 2030                                               | OPEN: policy owner must decide                      |

Also vary one person's two relationships: Regular and Temporary without an exception on June 30
must retain their separate outcomes. Replay the late-arrival counterexample with the same D.
For real tables, cover each distinct outcome, material rule overlap, missing rule, unknown input,
date boundary and overriding exception. Exclude impossible combinations only with a recorded
domain reason. Sample combinations according to interacting conditions and consequence; do not
call a few happy paths exhaustive coverage or enumerate irrelevant Cartesian products.

Trace decided `BR-*` rows to observable `BAC-*` criteria and these cases. For example:
`BAC-01: For the Temporary relationship with no exception on June 30, 2030, the eligibility
result is Not eligible under LP-v1 even if received on July 2. Verify: owner review of this
case now; engineering-selected contract/integration checks later.` Initial document review
does not count as an executed integration test.

Deliver the table revision, cases reviewed and results, unresolved combinations with owners
and next evidence, and the recorded decisions or proposals. A change to policy, precedence or
effective dates makes affected criteria and evidence stale; retain the old revision and review
only the consequences that changed. The workshop's existing stage gates still decide whether
the business definition can close; this reference creates no separate approval ceremony.

The distinction between mutually exclusive rules and explicit treatment of multiple matches
is also formalized in [OMG DMN 1.5, section 8.2.11](https://www.omg.org/spec/DMN/1.5/PDF).
This informal discovery table does not require DMN syntax, tooling or a rules-engine implementation.
