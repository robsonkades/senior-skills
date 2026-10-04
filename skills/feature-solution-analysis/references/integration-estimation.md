# Prepare and review an integration estimate

Use when comparing the cost of integration options or preparing a scoped request for the teams
that estimate them. Produce an estimate request and a review of the responses actually supplied.
This method does not invent effort, staffing, commercial terms, delivery dates or acceptance.
An analyst can organize the inputs; accountable estimators provide or validate their forecasts.

## Establish what is being estimated

Reuse the accepted requirement/scope revision and each candidate's evidenced coverage. Separate
configuration, reusable behavior and new work. A "standard" label does not make enablement,
mapping, data correction, counterpart work, verification or operation free. Conversely, do not
price a new service when the selected scope only changes an existing configuration.

Capture only decision-relevant inputs; keep unknowns visible rather than inventing precision:

| Input                  | What the estimator needs                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Scope and outcome      | Revision, population, flows, required completion point, exclusions and acceptance criteria.                        |
| Surfaces and evidence  | Products/modules/versions, operations/layouts, supplied contracts, enablement and unverified prerequisites.        |
| Data                   | Mappings, code tables, initial population/history, changes, data-quality findings and correction ownership.        |
| Workload               | Average and peak arrival, payload size, frequency, completion window, representative measurement or its absence.   |
| Failure and transition | Partial failure, uncertain outcome, supported recovery, initial load, coexistence and reconciliation obligations.  |
| Work by party          | Senior integration work, product/counterpart changes, customer enablement, verification and operational work.      |
| Scheduling constraints | External delivery dependencies, access lead time, review/change windows, actual availability and stated deadlines. |
| Cost basis             | One-time effort, recurring operations/license costs when applicable, units, currency and source/owner.             |

A missing contract can prevent a defensible estimate for its dependent work while allowing a
bounded configuration estimate elsewhere. If feasible alternatives remain open, request separate
scenario estimates with their assumptions. Do not convert a requested deadline into the effort
or capacity that would be needed to satisfy it.

## Request comparable responses

For each party or work package, request: scope/revision, included and excluded work, estimate
or range, unit, basis, owner, assumptions, dependencies, availability, uncertainty and conditions
for re-estimation. Ask whether testing, correction cycles, deployment and support are included.
Use a shared definition of person-hours/person-days and elapsed time; do not silently assume
hours per day, team size or utilization.

During definition, functional outcomes and known external dependencies can be enough to request
a preliminary estimate. Do not manufacture implementation resources to obtain a quote. During
delivery preparation, reuse the accepted breakdown and its resource identifiers. One resource
may involve several parties, and one estimate may cover several resources; preserve that mapping
so shared work is not counted twice.

## Review the response before comparing totals

1. Match the response to the requested revision and verify that mandatory work is covered.
2. Separate a supported range from an unsupported point estimate or a stated budget limit.
3. Identify omitted counterpart/operation costs, overlaps and shared prerequisites.
4. Keep effort distinct from elapsed time. Parallel work needs actual capacity and dependency
   evidence; an external wait is not labor, and a labor sum is not a completion date.
5. Check units and scenario assumptions before adding quantities. Label a sum of supplied ranges
   as an arithmetic envelope, not a statistical confidence interval or a delivery commitment.
6. Record accepted ownership, estimates still awaiting an owner and the uncertainty that could
   change the option ranking. A cheap but unsupported option remains conditional.

Compare the same business scope and recovery obligations. When one offer excludes reconciliation
or provider corrections, expose that difference and request a comparable scope. Do not average
conflicting estimates without investigating their different assumptions.

## Filled example: effort is not a calendar promise

Fictional training input: request `Estimate-r2` covers a known mapping change, provider fixture
adjustment and a rehearsal for an existing benefits interface. The named roles supplied the
following ranges; these numbers are examples, not recommended rates or estimates for Senior work.

| Work package                          | Supplied range    | Basis and owner                                                | Scheduling condition                                                             |
| ------------------------------------- | ----------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Mapping and reconciliation adjustment | 6-10 person-hours | Integration engineer; comparable change and accepted field map | May start after mapping revision M2 is accepted.                                 |
| Provider fixture adjustment           | 3-5 person-hours  | Provider technical lead; same interface version                | Provider reports a five-business-day queue; available start date is unconfirmed. |
| Joint rehearsal and evidence review   | 2-4 person-hours  | Test lead; agreed scenarios                                    | Needs both preceding outputs and a shared environment window.                    |

If each range includes all contributors' effort for that package and packages do not overlap,
the arithmetic envelope is **11-19 person-hours**. It excludes any work not covered by these
inputs. It is neither five days plus 19 hours of elapsed time nor a guaranteed completion date.
The calendar forecast remains open until availability, dependencies and the shared window are
established. A requested Friday release cannot be confirmed from these figures.

If the provider later introduces a new mandatory field, identify the affected scope, mapping,
criteria and estimates before requesting a revision. Do not silently expand the old estimate or
restart estimates for unaffected work. If a documented configuration eliminates the fixture
change, return that evidence to the responsible estimator instead of inventing the saving.

## Reviewable output and stopping point

```text
Estimate request/revision and purpose: option comparison / delivery preparation
Scope, completion criteria and candidate solution:
Evidence and unresolved feasibility inputs:
Work packages -> party -> included/excluded work -> dependencies:
Owner-supplied estimates: units, basis, range, availability and conditions
Coverage gaps, overlap and source disagreements:
Effort summary, with calculation conditions:
Elapsed-time forecast: supported / conditional / unavailable, and why
Cost comparison and what could change the recommendation:
Next evidence/owner; revisions requiring re-estimation:
```

Validate coverage against scope and acceptance, recompute any arithmetic, and trace every number
to a supplied source or explicit calculation. Stop with the request or reviewed comparison when
that is the authorized endpoint. An unreturned quote is pending evidence; it does not prevent
finishing a useful request and does not become a zero-cost estimate.
