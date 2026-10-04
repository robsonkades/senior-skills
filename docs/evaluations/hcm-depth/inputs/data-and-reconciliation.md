# Synthetic task: review a small integration extract

Prepare an English analysis note. Use `feature-context-analysis` and
`feature-contract-definition` where applicable. No live environment access or changes are requested.
All identifiers, contracts and roles below are fictional case inputs.

An analyst has a deliberately selected five-row sample, not the full population. Sanitization
preserves keys, codes and nulls. `BR7` requires one current record per `(company, relationship)`;
one person may have several employment relationships. Current benefit codes are A and B. The
sample is effective 2026-10-01, extracted from a consistent snapshot on 2026-10-02. Population
size is unknown. `MAP2` defines A -> X and B -> Y. Column names are conceptual, not Senior fields.

| Row | Company | Relationship | Person | Benefit |
| --- | ------- | ------------ | ------ | ------- |
| 1   | C       | 10           | P1     | A       |
| 2   | C       | 11           | P1     | null    |
| 3   | C       | 11           | P1     | B       |
| 4   | D       | 10           | P2     | Z       |
| 5   | C       | 12           | P3     | A       |

In a separate exercise, a corrected complete fixture has these expected enrollments at cutoff K:
`C/10:X`, `C/11:Y`, `C/12:X`. The target read is from the previous day's cutoff J and contains
`C/10:X`, `C/11:X`, `C/98:X`. Its transport response says accepted, with no final application status.
The analyst asks whether the matching total of three proves completion and suggests deleting 98
and replaying the batch. No provider lookup or retry guarantees have been supplied. Source data
owner: customer HR operations; target contract owner: provider interface lead.

Report scoped source findings, how to interpret the target evidence, the next actions and which
claims remain unsupported. Also explain how your conclusion would change if the provider supplied
a final target read for cutoff K containing those same three target records.
