# Business discovery for HCM integrations

Use for HR/personnel administration conversations, meeting-note reviews or the initial definition
of a Senior HCM integration. Produce a reviewable business definition. Interface contracts,
architecture and feasibility conclusions belong to engineering analysis; an analyst's draft does
not establish those decisions. Follow the stage and convergence criteria in `SKILL.md`; source
code is not required to begin.

## Prepare the conversation

Read the request, earlier answers, the described process and available documents. Record what
each source establishes and for which population/environment. Separate the problem, suggested
solution, hypothesis and decisions already made. "The customer requested an integration" does
not prove that the product provides a particular API or that an eligibility rule was approved.

Identify the business-rule owner, affected users and integration counterpart. Record unknown
roles without blocking the draft. Reuse established authority; attendance and silence do not
constitute approval.

Start with the concrete example that best exposes the need: what action occurs, who performs it,
which record changes, where the result appears and what currently requires intervention. Document
the expected outcome and evidence of the problem. Missing measurements do not justify inventing
a reduction in rework or an update deadline.

If a returned questionnaire is available, use [Checklist workshop](integration-checklist-workshop.md)
first to reuse the answers, identify their sources and prepare the customer/provider agenda.
Apply the HR/personnel questions below only to the flows whose business domain is actually HCM.

## Run useful question rounds

Choose one question when its answer determines the rest, or two to three questions on the same
topic. Briefly explain which decision changes. Do not walk through every topic below mechanically.

| Material information missing | Possible question                                                                                       | Consequence to investigate                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Process outcome              | What must HR/personnel administration be able to do when the integration finishes?                      | Receiving a file may not mean processing is complete at the destination.                           |
| Population                   | Which employment relationships, companies or units belong in the first delivery?                        | One person may have records requiring different treatment.                                         |
| Trigger                      | Which confirmed fact starts transmission: request, approval or effective change?                        | Sending a request as an established fact may trigger an action prematurely.                        |
| Effective date               | When should the change take effect? Are there future-dated or retroactive records?                      | Entry date and effective date may imply different behavior.                                        |
| Rule interaction             | If this relationship meets both the usual rule and an exception, which outcome applies and who decides? | Overlapping rules need an explicit resolution; missing data does not mean the exception is absent. |
| Data ownership               | Where is the information maintained, and who corrects a discrepancy?                                    | Two systems editing the same field require an explicit rule.                                       |
| Exception                    | What does the team do if only some records are accepted?                                                | The workflow must expose outstanding items and allow the work to finish.                           |
| Deadline                     | When must the result be available, and what happens if it is late?                                      | "Real time" does not define a verifiable acceptance criterion.                                     |

After each answer, update the affected section and open questions. Preserve contradictions
between accounts and documents until evidence resolves them. Do not reopen an accepted choice
without new information or a request to reconsider. Continue independent analysis when a
localized issue remains unresolved.

## Model the process and challenge the first solution

Describe the current and desired processes, including their start, owners, activities, decisions,
data, completion and relevant exceptions. Use the customer's terminology and a short glossary
for ambiguous terms such as "active employee", "employee registration number", "completed hire"
and "integrated".

When these terms hide interacting conditions, use `requirements-and-acceptance` and its
`references/business-rule-decisions.md`; that reference owns the table method, date semantics,
precedence and representative-case checks. Record `BR-*` rules, policy sources and accountable
decisions in the current draft. Offer reasoned alternatives where policy is incomplete, with
their consequences; do not turn an analyst's preferred default into an agreed business rule.

Choose a flowchart or prose according to what makes review easier. Use BPMN when the team
already uses it or interactions between participants justify that precision; the format is not
a success criterion in itself.

Investigate whether the outcome requires a product change, configuration, integration or process
adjustment. This supports solution hypotheses, not an unsupported claim of standard product coverage.
When an HCM capability changes scope, use `feature-context-analysis` with a bounded question
and the known products/modules; incorporate its findings and limits into the definition.

Before closing the definition, challenge the most important premise: could the current process
already meet the need with different usage? What is the smallest delivery that preserves the
benefit? Could every criterion pass while HR still lacks the required outcome? Do not turn these
questions into a mandatory round.

## Reasoning example

Illustrative request: "Send employees to the benefits provider as soon as they are registered."
The statement does not yet define population, employment relationship, eligibility or what
"registered" means.

If the destination manages benefits per employment relationship, merging records by person may
erase a valid relationship. If benefits should start only on the agreed effective date, early
transmission may be allowed to prepare the record while early activation may violate the rule.
These are business questions and contracts to verify, not Senior product guarantees or a
provider's default behavior.

A useful first round asks which employment relationships qualify and which fact/date allows
activation. After the answer, `requirements-and-acceptance` helps express an observable outcome.
Engineering will verify whether interfaces allow it to be prepared, confirmed and corrected.

## Functional definition template

Adapt the existing Product Feature template. Keep a continuous specification; fields without
evidence remain open, and the template does not require additional files.

Reuse the request identifier and a revision such as `BD-r0`. Preserve lifecycle prefix meanings:
`PF-*` and `TF-*` identify child features, not the main document revision. Do not decompose the
work merely to name the draft.

```text
Request and revision:
Requested endpoint: business definition / analysis / another stated endpoint
Business owner and source of authority:
Problem, audience and available evidence:
Expected outcome and how to observe it:
Current process -> desired process:
Population, known products and participating systems:
BR-* rules, sources, effective dates and sanitized examples:
Decision table when rules interact: outcomes, precedence, owner and decision status
SC-* scope: included / excluded by decision / future
BAC-* criteria: condition, action, outcome and verification method
A-* assumptions: basis and what would refute them
U-*/Q-* questions: consequence, owner and next evidence
Definition status and recorded decision:
Engineering analysis: required? distinct owner? status?
Next step and sections affected by changes:
```

## Check the result

Review a normal occurrence and a material exception against the rules and criteria. Check that
population, start, completion and ownership are understandable; record the document review
performed and its gaps. Proposed acceptance remains proposed until the responsible owner decides.
For interacting rules, use the shared reference's coverage checks and trace cases to the
reviewed table revision; unresolved combinations block only the decisions that depend on them.
Do not claim integration testing or measured benefits when only analysis took place.

Deliver the draft and next question round when material answers are missing. Close the definition
when stage criteria are met, or record an evidenced decision not to proceed. Localized technical
questions accompany the handoff to engineering; do not invent contracts, delivery commitments or
endpoints to make the definition appear complete.
