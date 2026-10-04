# Worked case: an HCM benefits integration

Use to connect discovery, decisions, specification and engineering handoff. This is a wholly
fictional training case. Policies, roles, contracts, identifiers, dates and capability evidence
below are illustrative inputs, not real approvals, Senior product guarantees or executed tests.
In a real engagement, replace them with the applicable product/module/version and owner evidence.

The requested endpoint is an analysis package for engineering review. Implementation, customer
communications and production activation are outside this example's request. It has Deep analysis
because it crosses an external integration boundary, with a dossier because several owners and
sessions participate. A dossier can be one maintained specification with linked evidence.

## 1. Reuse the questionnaire and identify the consequential gaps

The fictional questionnaire `RQ-r1` says: "Send active employees from company A to the benefits
provider every day. We already have an export. The provider will attend the meeting."

Known inputs: one outgoing flow, company A, a benefits purpose, an existing export and a provider
contact. "Active", the identity being enrolled, completion and export suitability remain ambiguous.
Do not ask again which company or direction applies. Two initial questions group related decisions:

- Which employment relationships qualify at which effective date, including future admissions and
  terminations? Can one person hold more than one independently eligible relationship?
- What must the provider have applied by the daily deadline, and what evidence describes the
  existing export and provider processing/recovery contract?

The analyst records business answers; the HCM specialist and provider bring interface evidence.
Engineering assesses feasibility separately. Participation in the meeting does not approve a policy
or make every participant responsible for every correction. Use the checklist workshop in
`collaborative-feature-definition` for the meeting method.

## 2. Turn the fictional answers into observable business rules

In the case, the business owner supplies `BR-r2`: at 06:00 each business day, the provider's managed
company A population must reflect eligibility at 00:00 that day in `America/Sao_Paulo`. This is a
fictional service objective, not a statutory deadline. Date-only effective values are evaluated in
that zone. The worked comparison is for **2026-11-02**, with cutoff `2026-11-02T00:00:00-03:00`.

| Rule  | Meaning in BR-r2                                                                                                                                            | Observable criterion                                                                                             |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| BR-01 | Eligibility belongs to `(company, employeeType, relationshipId)`, not to a person alone.                                                                    | BAC-01: two eligible relationships for one person are both represented independently.                            |
| BR-02 | Company A, type EMP, active status, start date on/before the cutoff date and no end date on/before it. End date is exclusive.                               | BAC-02: include qualifying relationships; exclude future starts, ended relationships and other companies.        |
| BR-03 | Each eligible relationship has the benefit code valid at the cutoff. Unknown mandatory mapping requires correction before a complete snapshot is submitted. | BAC-03: no eligible relationship disappears because its code cannot be mapped.                                   |
| BR-04 | Completion means matching final business state by the deadline; transport receipt alone is insufficient.                                                    | BAC-04: the full managed population matches keys and benefit values, with no unresolved mandatory discrepancies. |

These criteria are case inputs, not business rules the analyst may invent. If actual stakeholders
dispute exclusion on the end date, return that rule for a decision before dependent mapping and
acceptance. Use `requirements-and-acceptance` and its business-rule decision method for overlaps,
unknowns, precedence, effective intervals and representative cases.

## 3. Establish the contract evidence and inspect data

The fictional evidence ledger contains:

| Evidence | Supplied claim and owner                                                                                                                                                                | Limit                                                                                |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| SRC3     | HCM interface specialist: existing export supports a complete company/type snapshot, the composite relationship key, effective-date selection and configurable code mapping.            | A fixture capability; actual Senior module/build and configuration must be verified. |
| CP4      | Provider technical lead: a complete snapshot atomically replaces only this feed's managed company A population after whole-batch validation. An invalid record rejects the whole batch. | No claim about other feeds, systems or provider products.                            |
| CP4      | Submission receipt is not completion. Final status can be queried by batch ID; recovery must use the supported procedure after outcome investigation.                                   | No unconditional retry, cancellation or deduplication guarantee.                     |
| SRC2     | Corrected, closed training population of six rows at the stated cutoff; includes out-of-scope and future records for testing.                                                           | This tiny fixture says nothing about a customer's data quality or throughput.        |

The initial `SRC1` additionally contained a second, conflicting row for `A/EMP/102`. In the case,
the source data owner resolves the conflict from source history and supplies `SRC2`; selecting
the first or last row would have invented a policy. Initial mapping `M1` lacked BRONZE. The mapping
owner supplies `M2`, adding BRONZE -> B1 valid from 2026-11-01. That revision must not be backdated
for earlier comparisons without evidence.

| Company/type/relationship | Synthetic person | Status     | Start      | End        | Source benefit | Expected at cutoff under M2      |
| ------------------------- | ---------------- | ---------- | ---------- | ---------- | -------------- | -------------------------------- |
| A/EMP/101                 | P1               | active     | 2025-05-01 | absent     | GOLD           | G1                               |
| A/EMP/102                 | P1               | active     | 2026-10-01 | absent     | SILVER         | S1                               |
| A/EMP/103                 | P2               | active     | 2026-11-03 | absent     | GOLD           | Excluded: future start.          |
| A/EMP/104                 | P3               | terminated | 2025-05-01 | 2026-11-02 | GOLD           | Excluded: end date reached.      |
| A/EMP/105                 | P4               | active     | 2026-10-01 | absent     | BRONZE         | B1                               |
| B/EMP/106                 | P5               | active     | 2025-05-01 | absent     | GOLD           | Excluded: company outside scope. |

The six corrected source rows yield three eligible relationships, representing two people. With
M1, relationship 105 was eligible but blocked by an unknown mapping; it was never a legitimate
exclusion. Under CP4, sending the other two alone could remove its existing benefit. Hold that
snapshot, correct the mapping and revalidate the full population.

Use `feature-context-analysis` for authorized data profiling and extraction limits. Use
`feature-contract-definition` for the mapping and reconciliation methods; the fixture does not
permit unrestricted data access or contain real personal identifiers.

## 4. Compare solutions against the same outcome

| Option                                             | Evidence and consequence                                                                                                          | Decision in this case                                                                             |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Configure the existing export and map              | SRC3 covers the selection/key requirements; CP4 and operator procedures still need joint verification.                            | Preferred candidate within the fictional evidence: least new behavior to maintain.                |
| Reuse an already supported integration             | No applicable reusable implementation was supplied.                                                                               | Investigate if an owner can provide evidence; do not count an unknown option as free or feasible. |
| Develop a Connect flow or another custom component | Could address a verified gap, but introduces implementation and operational work; no such missing capability is established here. | No reason yet to select custom development. Reopen if real SRC3 evidence fails.                   |

This is not a universal preference for configuration. If the deployed exporter cannot select the
required effective state or preserve relationship identity, the decision changes: verify the gap,
compare supported alternatives, and use a bounded feasibility experiment when necessary. Connect
or platform authentication alone does not prove access to the required business operation.

`feature-solution-analysis` owns the comparison and estimate request. Describe configuration,
mapping corrections, provider verification, reconciliation and rehearsal as scoped work. Ask the
responsible teams for forecasts; neither a daily deadline nor this example supplies effort or a
delivery date. Use its integration-estimation reference when responses arrive.

## 5. Prepare the engineering contract and acceptance trace

The separate engineering analysis translates the fictional accepted rules into draft obligations:

| Obligation            | Draft contract / mapping                                                                                                 | Verification to plan                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Relationship identity | CT-01: preserve company, employee type and relationship ID as separate values; person ID is not the enrollment key.      | TC-01: both P1 relationships survive, with no collision across companies.                                  |
| Effective benefit     | CT-02: map GOLD -> G1, SILVER -> S1, BRONZE -> B1 using M2 at the stated cutoff; record mapping revision with the batch. | TC-02: test M1's missing code, M2, its validity boundary, future start and termination boundary.           |
| Complete replacement  | CT-03: validate the entire managed scope before CP4 submission; correlate batch ID, source revision and cutoff.          | TC-03: unknown code rejects preparation; simulate whole-batch rejection and preserve prior accepted state. |
| Business completion   | CT-04: query final outcome, obtain a comparable target view, then reconcile key and benefit state.                       | TC-04: receipt, pending, failed and unknown outcomes cannot report business completion.                    |

Field names above are conceptual contract fields, not real Senior API properties. Payload formats,
limits, credentials, versioned operations and recovery guarantees must come from applicable
contracts. Keep access secrets out of the specification.

Trace example: `BR-01 -> BAC-01 -> CT-01 -> TC-01`. Before delivery preparation, no `RES-*` is
needed. After engineering accepts the analysis and defines delivery resources, one resource can
cover a complete company A snapshot with rejection, confirmation and reconciliation; a second can
cover transition rehearsal and operator handoff. Do not split away required recovery just to make
the first resource smaller. Planned test evidence is not `EV-*` proving implementation complete.

## 6. Detect an apparently successful but incorrect result

The following **simulated** target view `T1` is declared final for the same batch, managed scope,
cutoff and contract revisions. It contains `101/G1`, `102/G1`, `999/G1`, all in A/EMP. Its total
matches the three expected records. A key-and-value comparison reveals:

| Relationship | Expected | Target T1 | Disposition                                                                   |
| ------------ | -------- | --------- | ----------------------------------------------------------------------------- |
| A/EMP/101    | G1       | G1        | Exact match.                                                                  |
| A/EMP/102    | S1       | G1        | Divergent benefit; investigate mapping/application revision.                  |
| A/EMP/105    | B1       | Missing   | Missing eligible relationship; investigate extraction/submission/application. |
| A/EMP/999    | Absent   | G1        | Unexpected managed record; establish ownership and correction authority.      |

There are four distinct keys across both sets: one exact, one divergent, one missing and one
unexpected. BAC-04 fails in this fixture even though both totals equal three. Do not delete 999
or blindly resubmit because a discrepancy exists. Preserve comparable evidence, determine causes
and use an authorized, contract-supported correction followed by a new comparison.

If the target view were pending or from another cutoff, this comparison would not prove final
convergence or those final discrepancies. Record the missing observation instead of forcing an
answer. Use the reconciliation method's distinction between pending, mismatch and unknown.

## 7. Hand off the plan with truthful readiness

The engineering handoff includes the requested revision, rules and mapping, SRC3/CP4 evidence,
decision conditions, dependencies, acceptance cases and outstanding corrections. A transition
plan must also resolve old/new writer overlap, changes during the initial load, uncertain in-flight
effects, support ownership and when evidence expires. Use the transition/support reference in
`feature-implementation-plan`; do not infer these mechanisms from the atomic fixture alone.

| Review scope                          | Result in this example                                                                                         |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Analysis package for discussion       | Available for engineering review, with illustrative decisions and explicit real-world evidence still required. |
| Simulated T1 acceptance               | Failed BAC-04; causes and correction evidence remain open.                                                     |
| Real development/activation readiness | Not assessed: no deployed contracts, accepted engineering plan or runtime evidence supplied.                   |
| Production integration                | Not implemented or validated by this teaching case.                                                            |

At the next meeting, carry BR-r2, SRC2, M2 and the three discrepancies forward. A provider change
to a mandatory field reopens its mapping, contract, tests and estimate; it does not discard the
already settled company and business objective. Capture who supplied the change, what evidence
became stale and the next owner/action. See [HCM pilot and handoff](hcm-pilot-and-handoff.md) for
using this continuity method with actual observations.
