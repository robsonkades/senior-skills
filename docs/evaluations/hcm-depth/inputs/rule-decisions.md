# Synthetic task: clarify conflicting eligibility rules

Prepare an English functional draft and only the material questions needed for the next discussion.
Use `collaborative-feature-definition` and `requirements-and-acceptance`. This is business discovery;
do not author an engineering contract or assert legal eligibility. All facts are fictional inputs.

Company V offers a learning allowance to each eligible employment relationship. A person may have
two relationships; HR has already confirmed that each is assessed separately. HR policy owner
provided two statements for policy R4, effective 2026-10-01:

1. Active relationships are eligible from their start date, inclusive, until end date, exclusive.
2. Employees on unpaid leave are not eligible during the leave interval.

The same owner says a recorded manager exception can permit eligibility for a specified interval,
but has not said whether this overrides unpaid leave. No default for missing leave status has
been accepted. Payroll closing date and receipt timestamp are not defined as policy-effective dates.

The provider's capabilities are unknown. One input is received on 2026-10-03 but describes a
relationship active on 2026-10-01. Another describes active employment and unpaid leave on the same
day, with a manager exception also in effect. A third has unknown leave status. The customer asks
to choose whatever precedence is easiest to implement so the meeting can finish.

Produce a compact decision table with unresolved outcomes distinguished from known ones, meaningful
boundary/overlap cases and a draft acceptance trace. Identify who resolves the ambiguity and what
technical investigation can proceed separately. Use the existing facts rather than restarting the
interview or turning uncertain input into an automatic eligibility denial.
