---
name: requirements-and-acceptance
description: >
  Turning a request into something buildable and checkable before writing code: separating the
  requirement from the implementation someone already chose, finding the ambiguities that change
  the work, naming assumptions where they can be contradicted, writing acceptance criteria that a
  test can be derived from, and surfacing contradictions instead of resolving them silently. Use
  before implementing a ticket whose edge cases are unstated, when a request names a solution
  rather than a need, when "fast", "secure" or "reliable" appears without a number, when two
  requirements cannot both hold, when business rules overlap or change by effective date,
  when a change is rejected in review for doing the wrong thing, or
  when deciding whether to ask or to proceed on a stated assumption. Does not cover how long it
  will take, how to deliver the message, the test level, or the order of work
  (clean-delivery-workflow).
---

# Requirements and Acceptance

## Purpose

Prevent rework caused by implementing an unexamined interpretation of a request. Make the
important interpretation visible while changes are still cheap.

The cheap moment to find that gap is before the first line. This skill is the set of questions
that finds it, and the artefacts — assumptions and acceptance criteria — that make the answer
durable enough that the next person can check it.

## Context and scope

Read the request, prior user decisions, applicable project instructions, existing contracts
and relevant code/tests before asking. An explicit implementation choice may be a real
constraint; separate its purpose without discarding it or reopening existing authorization.
This skill is language-neutral. For Java tasks, preserve the evidenced compiler/runtime,
framework and compatibility constraints; requirements analysis does not authorize upgrades.

Distinguish explicit requirements and applicable documented standards from consistent
conventions, isolated implementation choices and assumptions. Code and tests show existing
behavior within their coverage; check whether it expresses an intended contract before
promoting it to a requirement.
A discrepancy can be a defect or an authorized change, so do not silently rewrite either side.
Write questions and artifacts in the user's requested language; preserve source terms when
translation would change their meaning.

When requirements are settled and the remaining question is test placement, use the criteria,
changed risks, project constraints and available evidence to choose a test level with the
repository's established strategy. Name the needed verification and uncovered boundary
without reopening agreed requirements.

## Workflow

1. **Separate the four things.** A request usually mixes them:
   - **Requirement** — what must become true, in the domain's terms.
   - **Implementation** — a solution someone already picked. Often reasonable; still not the
     requirement; determine whether it is a binding constraint or an optional proposal.
   - **Assumption** — something you filled in. Legitimate, provided it is written down.
   - **Acceptance criterion** — how anyone will know it is done.
2. **Separate the desired outcome from the selected mechanism.** "Add a Redis cache" may
   target latency, downstream load or a mandated architecture. Use existing evidence to
   identify the purpose; do not invent a latency target. Preserve an explicitly fixed
   mechanism and explain trade-offs if an alternative is relevant.
3. **Run the relevant ambiguity checks** (`references/ambiguity-checklist.md`). Focus on
   readings that change behavior, contracts or consequential implementation choices.
   For interacting business rules, exceptions or effective dates, read
   [Business-rule decisions](references/business-rule-decisions.md). Build a decision table
   only when combinations change the outcome; a single clear rule can stay in prose.
4. **Sort unresolved gaps**: ask only when the answer materially changes scope, correctness,
   cost or authority and cannot be inferred safely. Use stated, reversible assumptions for
   routine choices. Pending answers block only dependent work; continue independent
   authorized work.
5. **Write acceptance criteria** at the behaviour level, one per rule, each derivable into a
   test (`references/acceptance-criteria.md`). Check the set against the intended workflow as
   well as each criterion's testability: could every check pass while the user's need fails?
6. **Record material scope boundaries** without inventing exclusions to requested work. Scope is defined as much by the exclusions as by
   the inclusions, and unstated exclusions are where "but obviously it should also…" lives.
7. **Close clarification for the next increment** when its intended behavior, constraints and
   acceptance checks are clear, and remaining assumptions are safe and reversible. Continue
   authorized implementation; if only analysis was requested, deliver the criteria. Keep
   unresolved decisions and their dependent work explicit instead of interviewing indefinitely.

## Rules

- Never invent a requirement silently. If you filled a gap, the assumption goes in the ticket,
  the pull request description or the commit message — somewhere the person who knows can
  contradict it. An assumption that lives only in the code is indistinguishable from a defect.
- A missing business rule is an unknown, not an inferred default. Label analyst options as
  proposals, retain the accountable owner's decision and source, and keep unresolved rule
  combinations open. Business-rule analysis does not authorize engineering contracts or
  substitute for the current stage's acceptance.
- Different code alone does not require a question: routine implementation choices may
  already be delegated. Assess consequence, reversibility, available evidence and authority.
  Conversely, identical code can implement materially different contractual promises.
- Adjectives are not requirements. Fast, scalable, secure, robust, user-friendly and real-time
  each need a number, a scenario, or a named standard before they can be built or verified.
- Surface actual contradictions after checking scope and existing decisions. Auditing and
  erasure can coexist depending on retained fields and policy; do not invent a conflict or
  a legal exception. Apply an already authorized resolution; ask the appropriate owner only
  when the incompatible obligation remains unresolved.
- The failure behaviour is part of the requirement. What happens when the dependency is down,
  the input is malformed, the operation is retried, or two users act at once — an unstated
  answer here becomes an incident, not a feature request.
- Quantitative requirements need workload, population, measurement boundary and window.
  Qualitative requirements need an observable rule or review method; avoid inventing numbers
  merely to replace adjectives. See the acceptance reference for conditional examples.
- Prefer observable outcomes. Record implementation constraints separately when explicitly
  required by a user, contract or project policy; a mandated mechanism is also checkable.
- Apply the existing definition of done and checks proportionate to the changed risks.
  Do not turn an example checklist into new mandatory approvals, migrations or telemetry.
- Report criteria as met, unmet or unverified with supporting evidence. A passing test proves
  only the cases and environment exercised; missing measurements are unknown, not success.
- When an authorized requirement changes, update the affected criteria and assess whether
  existing evidence still applies. Keep the reason and source of a material change visible;
  do not lower a target solely because the implementation failed it.

## Output

For a small task, provide a short restatement with material assumptions, observable criteria,
and unresolved questions only if needed. Trace consequential criteria to the request or
existing contract; label proposed targets as proposals. At completion, map criteria to
actual validation and disclose what remains unverified.
For interacting rules, include the compact decision table, material gaps/conflicts, owner
decisions and representative cases in that same artifact; identify the revision reviewed.

## References

- **Business-rule decisions** — `references/business-rule-decisions.md`. Read when
  population, dates, precedence or exceptions interact, or accounts of policy disagree.
  Produces a reviewable table with sources and owners, a fictional HCM example and
  checks for missing or overlapping outcomes; it does not establish product capabilities.
- **The ambiguity checklist** — `references/ambiguity-checklist.md`. Categories of unstated
  requirement — quantity, boundary, concurrency, failure, authority, lifecycle, scope — each
  with the question that exposes it, plus a worked example identifying nine inspection
  questions and three candidate defaults. Read before implementing anything whose
  edges are unstated.
- **Writing acceptance criteria** — `references/acceptance-criteria.md`. Criteria at the right
  level of abstraction, the Given/When/Then form and where it misleads, deriving tests from
  criteria, checking coverage of the intended need, consumer-specific export contracts,
  non-functional scenarios, and a definition of done that is a checklist rather than a
  sentiment. Read when writing or reviewing criteria or assessing changed requirements.
