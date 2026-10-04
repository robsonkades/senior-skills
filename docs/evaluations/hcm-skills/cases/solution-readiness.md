# Synthetic case: HCM integration solution and readiness

I maintain the specification for HCM -> external provider ValeFlex. I need a refinement
recommendation, missing contract items and a development-readiness assessment. Use at most
900 words in English. These are all the exercise inputs; do not consult systems or external
sources. Do not implement, send messages or change configuration.

Business definition BD-r3, accepted by HR owner Lia:

- First delivery: employment relationships in unit U1, including creation, changes and closure.
  Dependents and payroll entries are excluded by Lia's recorded decision.
- The unit must observe final confirmation in ValeFlex within 30 minutes of an eligible change.
  Receipt does not mean completion.
- One person may have two employment relationships. The customer agreed with ValeFlex that each
  must remain independent. A future revision must take effect only on its effective date.
- Retroactive corrections matter. Repetition must not create a second unintended effect.
- The initial load must coexist with subsequent changes without losing changes made while it
  runs. The operator must track outstanding items and resume failed work.

Technical report RT-r2, authored by Rui, the responsible engineer, distinct from BD-r3's author:

- The source is HCM XT; the customer's module and build still need confirmation.
- Applicable document exportador-r1 describes the existing exporter's nightly file containing a
  snapshot of employment relationships. Supplied configuration confirms that environment's nightly window.
- Querying changes every five minutes is proposed. Availability in the customer's module interface,
  filters, pagination and handling of retroactive changes have not been verified.
- A team member suggested native HCM events. No event contract was found in the supplied inputs.

Counterpart contract VF-r4, supplied for analysis:

- Accepts batches with items identified by customer and employment relationship, returns a receipt
  token and supports later batch lookup with individual results.
- An authorized acceptance-environment trial sent two items: one was confirmed, and the other
  rejected for an unknown unit code. This is the only reported execution.
- The contract states no maximum processing time, receipt-token lookup lifetime or deduplication
  guarantee. Available documents offer no lookup by submission key when the response containing
  the receipt token is lost.
- The provider is willing to discuss these gaps, but no contract supplement has been agreed.

PL-r1 draft for discussion, not yet approved by Rui:

- Query the source every five minutes; use customer+CPF as the unique key.
- On timeout, resend the whole batch until a response arrives. Treat the receipt token as success.
- Use message arrival order to replace the destination record.
- Start the initial load, then enable incremental queries; no cutoff is defined.
- Declare the integration acceptance-tested because an adapter's build is green.

Produce the requested analysis from these revisions, including independent work that may proceed
while open items are resolved. The business decisions above are already accepted.
