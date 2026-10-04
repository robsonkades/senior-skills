# From a customer checklist to the first integration meeting

Use when the customer has returned an integration questionnaire, including an Excel workbook,
and the analyst needs to prepare or conduct the first meeting. Produce a source-linked briefing,
focused agenda and living definition. This stage can start a field map and identify solution
candidates; it does not approve a technical contract, classify an undocumented capability as
standard, or commit another team's delivery.

## Read the answers before asking again

Inspect the supplied file without modifying it. Identify sheets, headers, actual populated
rows and attachments. Spreadsheet range metadata may be stale; check actual cells before
concluding that a sheet is empty. Reuse available extraction tools; if a file cannot be read,
record that limit and request the smallest useful export instead of inventing its contents.

Keep each response and integration distinguishable. A row may contain several flows, and
several rows may concern one demand. Record file/revision, sheet and cell or row references
for consequential answers. Match questions by meaning, since later forms may reorder columns.
Contact details identify respondents; they are not integration payload requirements.

Classify answers as supplied claims, supported facts, open gaps or contradictions. Empty cells,
unexplained abbreviations and apparent test text do not mean "no requirement". Ask about a
placeholder only when it affects a decision. A "yes" to available documentation or mapping
means the artifact should be located, not that its content has been reviewed. Preserve the
original evidence privately; use synthetic examples in reusable material.

Determine the business domain from the described outcome and systems. A form titled "HCM"
may contain a sales, document-signing or other request. Apply the HCM reference only to actual
HR/personnel scope; use this checklist path and the general catalog for other domains. Do not
introduce employment relationships or payroll rules into an unrelated document workflow.

## Turn the form into decision inputs

The supplied checklist's columns provide this starting map. These locations are provenance
for that form, not a fixed parser schema or a new mandatory questionnaire.

| Input area                    | Columns in the supplied form | Analysis and missing evidence                                                                                             |
| ----------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Respondent and demand         | A-L                          | Identify request, business owner and contacts; confirm authority separately from attendance.                              |
| Request and outcome           | M-Q                          | Separate new/change request, context, problem, expected result and observable success.                                    |
| Existing integration          | R-T                          | Identify current flow, interruption and provider change; consider coexistence and recovery where relevant.                |
| Direction and timing          | U-V, AB, AF                  | Map sender, receiver, intermediaries, trigger, frequency and completion deadline.                                         |
| Data and rules                | W-Z                          | Seed the field map, mapping status, eligibility filters and business rules.                                               |
| Failures and capacity         | AA, AC-AD                    | Identify error ownership, average versus peak load, payload sizes and known constraints.                                  |
| Current work and dependencies | AE, AG-AI                    | Understand the current process, locate counterpart documentation and reusable artifacts, and clarify operational windows. |
| Other details and mechanisms  | AJ-AK                        | Investigate material details; distinguish a technology suggestion from a verified constraint.                             |
| Additional questionnaires     | AL                           | Respect the answer; separate flows in the current record before proposing more forms.                                     |

Keep four classifications separate: request type (new/change), direction (who sends what),
trigger/mechanism (event, schedule, file or another supported interaction), and solution coverage
(standard capability, configuration, reuse, custom development or unverified). Connect is a
possible execution platform. Its presence does not establish standard coverage or eliminate
custom work. Use `feature-context-analysis` to verify claimed capabilities.

Normalize vague wording only as a proposal. "Real time" needs an observable deadline; monthly
volume does not establish peak throughput; "16/10" needs a year and the intended milestone;
"PDF in Base64" specifies an encoding, not encryption or a secure transport. Do not convert
these answers into invented limits, dates or guarantees.

## Prepare one useful meeting

Write a short briefing from the answers: desired outcome, current/desired flow, what is already
known, contradictions, decisions the meeting can resolve and the most consequential gaps.
Locate supplied attachments first. Propose a proportionate agenda around those decisions:

1. Confirm the business outcome, scope and what "completed" means.
2. Walk one real process occurrence and one material exception across the participating systems.
3. Resolve the highest-impact rules, data meanings and interface questions with the right party.
4. Review standard/configuration/reuse candidates and the evidence still needed before choosing.
5. Record conclusions, unresolved items, responsible roles and the next reviewable artifact.

Size question rounds by consequence. Do not reread every answered form question to the customer,
or demand every technical detail before a first meeting. If several flows compete for time,
identify their boundaries and prioritize with the business owner instead of merging them.

Prepare participation by decision, without sending invitations automatically:

| Role, when relevant                   | Contribution and ownership to establish                                           |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| Customer process owner                | Need, eligibility, exceptions and business acceptance.                            |
| Customer IT or operations             | Environment, access enablement, operational windows and support responsibilities. |
| Senior product/integration specialist | Applicable product capability, supported interfaces and existing artifacts.       |
| Senior Connect specialist             | Platform configuration, execution behavior, capacity and operational evidence.    |
| Provider or implementation partner    | Contract and behavior for the interface or component they own.                    |
| Engineering and test representatives  | Feasibility, technical obligations and verification for later refinement.         |

A service provider may operate a system without owning its API or accepting business scope.
Record who owns each answer and who can decide it. Resolve disagreements using the applicable
contract, configuration or business authority; participation alone does not establish approval.

## Start the field map without inventing a schema

For each business data item, capture purpose, originating system, meaning, destination need,
known transformation, sensitivity and evidence. Add source/destination field paths, types,
requiredness and failure rules only when the relevant contract establishes them. "Mapping
partially defined" means the known portion is reusable and the rest remains open.

Use a compact table: `business item | purpose/rule | source -> destination | supplied mapping |
contract evidence | gap/owner`. Keep document identity, person identity, transaction identity
and correlation/idempotency identity distinct where applicable. A field list cannot prove
which fields an API requires. Continue precise contract work with `feature-contract-definition`
under identified engineering ownership.

## Record a result the participants can review

Maintain the existing definition and ledger rather than requiring another document set:

```text
Request/revision, domain and flows covered:
Source file/sheet/rows and attachments actually read:
Business summary: problem -> intended outcome -> completion observation
Known answers and their evidence limits:
Current -> proposed flow, participants and decision owners:
Meeting agenda and focused questions: consequence -> respondent -> evidence needed
Initial data map and rules:
Coverage candidates: evidence / unverified conditions / next check
Decisions actually made, by whom, and open questions:
Next artifact, responsible role and agreed date, if any:
Status: meeting prepared / definition draft / other evidenced stage
```

Keep the customer summary understandable without technical implementation details; put field
and contract detail in a linked section of the same record when useful. Before delivery,
trace consequential conclusions back to the answers, distinguish receipt from business
completion, and check that unresolved ownership is visible. A prepared agenda or answered
checklist is not an accepted definition, a ready implementation or executed acceptance testing.

If a meeting has not occurred, label decisions and questions as proposed. Stop at the requested
artifact; no participant commitments, messages, invitations or approvals arise from drafting.
