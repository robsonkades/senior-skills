# Data readiness from bounded integration evidence

Use when source-data quality could change an integration's feasibility, initial load or field
mapping. Produce findings from available evidence and identify who can correct the source or
clarify its meaning. Do not edit source records, choose new business rules or declare the
integration accepted. This method also applies outside HCM when the actual domain calls for it.

## Establish what the extract can prove

Reuse authorized, sanitized extracts, data dictionaries and existing profiling reports before
requesting new access. If only documentation is available, specify the material pending checks;
live environment access is not a prerequisite for a useful report. Inspect an unfamiliar helper's
reads, writes and network effects before using it, and preserve the supplied input.

Record the minimum scope needed to interpret a result:

- Source system/module/build and environment; extract/file revision and schema or layout revision.
- Population predicate: companies/tenants, relationships or other business objects, statuses,
  included history and exclusions. Identify the known population size or leave it unknown.
- Extraction time and timezone, source-change cutoff or snapshot consistency, and business-effective
  date/view. A current extract does not necessarily describe the population effective yesterday.
- Sampling method, row count, pagination/truncation limits and known omissions. A sample selected
  for errors, a recent time window or one company is not automatically representative.
- Applicable business-rule and dictionary revisions, expected record granularity and candidate
  key established by those sources. Do not deduplicate a history/event extract as if it were
  one current row per relationship.
- Sanitization effects: stable pseudonyms must preserve relationships and collisions needed for
  the check. Changed dates, removed fields or normalized codes can invalidate those checks.

If extraction crosses updates without a consistent snapshot or documented boundary, mark the
affected count/completeness conclusions unverified. Ask for the smallest discriminating evidence,
such as the extraction predicate or a sanitized affected group, rather than an entire database.

## Profile only consequential conditions

Compare against the applicable rule; an unknown requirement creates a question, not a defect.
Reuse a trusted report or local read-only extraction tool. Record the actual predicate, columns,
method and result so another analyst can reproduce it without exposing personal data.

| Check                      | Decision and evidence to preserve                                                                                                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Missing values             | Distinguish absent column, null, empty text and a supplied default. Test requiredness for the applicable condition; report the examined denominator.                                                               |
| Duplicate identity         | Group by the full scoped key and required granularity. Report duplicate groups and excess rows separately; repeated person IDs or relationship numbers across companies may be legitimate.                         |
| Codes and de/para coverage | Compare values against the identified dictionary and mapping revisions at their applicable effective date. Separate unknown, deprecated-but-permitted and prohibited values; do not silently map all to a default. |
| Dates                      | Check parse/precision/timezone and applicable effective-period rules. An apparent future date is not invalid merely because it is future; mixed formats or reversed intervals need the governing rule.             |
| Meaning and dependencies   | Check units, leading zeros, prerequisite records or combinations only when the contract/rule makes them material. A valid type can still express the wrong meaning.                                                |

Keep row-level findings distinct from totals: one record can fail several checks. Do not add
overlapping defect counts and call the result the number of affected records. Preserve a small
sanitized example and the rule/source for each consequential finding.

## Decide what follows from the finding

Distinguish a source defect, an extraction/sanitization artifact, a missing mapping and an
unresolved business rule. For a source defect, name the responsible source-data owner and the
affected population; for a missing mapping or rule, name its accountable owner. Record the
proposed correction, dependent work and evidence needed after correction. Profiling does not
authorize applying it, suppressing records or changing the accepted population.

If evidence supports a local problem, continue analysis of unaffected scope and identify the
dependency. If the problem changes the selected solution or a mandatory outcome, return that
decision to its owner. Do not infer that custom development is necessary solely because a
sample is dirty. A larger extract earns its cost when it could resolve a material uncertainty;
it is not an automatic gate for every questionnaire or first meeting.

For code mappings, carry the finding to `feature-contract-definition` and its HCM mapping
reference; that skill owns the transformation obligation and its maintenance. For end-to-end
agreement between systems, use its reconciliation method instead of treating a source profile
as destination conformance.

## Filled synthetic profile

Illustrative evidence `SAMPLE-r1` is a deliberately selected four-row extract from fictional
environment `T1-test`, covering companies `C1` and `C2`, effective 2026-10-01, extracted at
2026-10-02T09:00:00Z. Its full population size is unknown. Fictional rule `BR-01/r1` requires one
current row per `(tenant, company, relationship)` and a nonempty department code from dictionary
`DEPT-r2`; only `D1` and `D2` are allowed for this date. Column labels below are analyst notation,
not Senior fields or APIs. Sanitization preserves keys and nulls.

| Row | Tenant | Company | Relationship | Department |
| --- | ------ | ------- | ------------ | ---------- |
| 1   | T1     | C1      | R01          | D1         |
| 2   | T1     | C1      | R02          | null       |
| 3   | T1     | C1      | R02          | D2         |
| 4   | T1     | C2      | R01          | Z9         |

Observed within this fixture: four rows, three distinct composite keys, one duplicate group
with one excess row, one missing department and one unknown code. Three distinct rows are
affected: rows 2 and 3 by the duplicate, row 2 also by the missing value, and row 4 by the code.
`R01` across `C1` and `C2` is not a duplicate. The owner must resolve the conflicting `R02` rows;
neither first-row nor last-row selection is justified. `Z9` requires source or dictionary-owner
evidence, not an invented `D1` fallback. The example supplies no deprecated-code or date-error
case and cannot establish those checks passed. It also establishes no production defect rate.

## Return a bounded report

```text
Request/rule revisions and decision this profile informs:
Evidence: source/environment, extract revision, population, snapshot/cutoff/effective view
Method and coverage: sampling, rows, fields, omissions and sanitization effects
Findings: rule -> observed count/denominator -> sanitized example -> consequence
Disposition: source/extraction/mapping/rule issue -> owner -> next evidence
Status: examined findings / pending checks / dependent and independent work
```

Before delivery, reconcile row and distinct-key arithmetic, qualify every conclusion to the
examined scope and label planned checks as pending. Zero observed defects in a limited sample
does not prove population readiness. Corrected evidence needs its own revision and affected
checks rerun; do not erase the original finding or reuse stale counts.
