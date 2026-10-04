# Data and interactions in an HCM integration

Use to specify an integration whose behavior and solution are already defined, or to prepare a
technical draft with explicit pending choices. Produce the contract and data mapping; do not
choose the architecture, change business rules or implement the flow at this stage.

## Start from identified contracts and rules

Read the functional definition, solution decision and applicable specifications on both sides.
Identify the revision, owner of each surface and required completion point. If a business rule
is disputed, route the decision to its owner and continue independent surfaces.

A local specification describes integration obligations. It does not create a guarantee missing
from a provider's contract. Do not copy an entire manual: record applicable operations and
versions, linking sources and the limits of what was confirmed in the environment.

If the starting point is a questionnaire, cite its sheet/cell or answer identifier and keep the
business field list separate from the verified schema. Locate any claimed mapping, reusable
artifact or provider specification. Existing partial mappings remain useful; only unsupported
elements stay pending. Record the counterpart's contract owner, even when an implementation
partner attends meetings on its behalf.

## Identity, meaning and time

Distinguish the person, employment relationship and destination record. Confirm which identifiers
are stable in each system, their company/tenant scope and the effects of transfers or rehiring
when those cases apply. CPF (Brazilian individual taxpayer identifier), employee registration
number, message ID and idempotency key are not interchangeable. Choose a key only when its
requirements and stability are established.

Record event date, business-effective date, source modification time and processing time
separately. Define timezone, precision and date-only usage where relevant. A later clock reading
does not by itself establish business-version ordering. Retroactive corrections and new effective
dates require accepted business behavior, not treating the last message received as authoritative.

## Map the minimum necessary

For each transmitted piece of information, record the fields below. Group equivalent fields
when that makes review easier; keep transformations that change meaning explicit.

| Mapping element        | Expected content                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------- |
| Rationale              | Rule/criterion requiring the data and its purpose at the destination.                 |
| Source and destination | Actual field/path and interface version; unknown names remain pending.                |
| Semantics and identity | Person, employment relationship, event or history; system of record.                  |
| Type and domain        | Format, precision, unit, allowed values and meaning of states.                        |
| Requiredness           | Distinction between absent, null, empty and default values, where supported.          |
| Transformation         | Code mapping, normalization or calculation with its rule, source, owner and revision. |
| Time                   | Effective date and replacement/correction rule applicable to the field or record.     |
| Failure                | Reject, leave pending or apply an explicitly accepted rule; effect on other records.  |
| Example and exposure   | Synthetic/sanitized example and restrictions on exposure in logs or screens.          |
| Verification           | Observable scenario and contract/evidence supporting the mapping.                     |

Do not invent missing required values to pass destination validation. If two domains cannot be
mapped, preserve the gap and required decision. Do not include salary, a complete identity
document or health information in an example unless needed for the case.

### Maintain the de/para as an owned contract

For a code mapping that can change, identify the source/destination dictionaries and revisions,
mapping owner/revision, applicable population and effective validity of each entry. State whether
the source code's meaning is stable across companies or versions. Select the entry according to
the accepted business date or version rule, not automatically the newest mapping at processing
time. Preserve the historical revision needed for corrections and replay.

Define who can propose and accept a mapping change, how affected records/criteria are found and
which evidence must be revisited. Overlapping validity periods, multiple target values or an
unmapped/deprecated code require an explicit rule or an open decision. A deprecated value may
remain valid for historical records; its current label alone does not establish rejection.
Choose rejection, pending review or an evidenced default only under an accepted rule, and expose
the next action. Never invent a fallback to satisfy destination requiredness.

Source profiling belongs to `feature-context-analysis`; consume its bounded findings instead
of claiming a complete population is clean from a reviewed schema or a few mapping examples.

### Filled synthetic mapping

This illustration assumes fictional rules `BR-DEMO/r2` and contracts `SRC-DEMO/r1` and
`DST-DEMO/r1`. Their invented analyst labels describe semantics, not Senior field paths or API
names. In a real map, replace them only with evidenced paths; leave unknown paths pending.
The example has one target enrollment per `(tenant, company, relationship)`; one person may
have two enrollments. Each row also requires a plan and a date-only effective start.

| Business item and purpose                            | Source example -> destination example                          | Transformation and evidence                                                                                                                                         | Failure and owner                                                                                                                   |
| ---------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Scoped relationship, preserving separate enrollments | `(T1,C1,R01)` -> `(T1,C1,R01)`; `(T1,C1,R02)` -> `(T1,C1,R02)` | Preserve the tuple under the two fictional contracts; both may refer to person `P01`.                                                                               | Missing tuple member remains pending; source-data owner resolves identity. Do not merge by person.                                  |
| Plan, selecting the agreed enrollment                | `B1` -> `PLAN-A`; `B2` -> `PLAN-B`                             | `MAP-DEMO/r2`, from dictionaries `PLAN-S/r4` and `PLAN-D/r3`, owned by the benefits-data steward; entries valid for effective starts in `[2026-10-01, 2027-01-01)`. | Unknown `B9` remains pending under `BR-DEMO/r2`; the steward resolves the mapping with the destination owner. No implicit `PLAN-A`. |
| Effective start, preventing premature activation     | `2026-10-05` -> `2026-10-05`                                   | Preserve the calendar date under `BR-DEMO/r2`; transmission/processing time cannot replace it. Activation cannot precede that date.                                 | Missing or invalid date remains pending with the source-data owner; do not use today's date.                                        |

A correction effective `2026-09-30` falls outside `MAP-DEMO/r2`; its historical mapping is
pending until the applicable revision is supplied. The two known entries do not prove coverage
of all source codes. Planned criteria check both tuples remain distinct, `B1` and `B2` retain
their meanings, `B9` is visible as pending, and an October 5 record is not activated on October 1.
These are filled specification examples, not executed interface tests.

## Specify interaction and recovery

For the selected surface, describe change acquisition, transmission, confirmation and the business
outcome. Use accepted mechanisms with demonstrated support. Compare alternatives for a contract
detail only within that choice; if the guarantee requires another solution, return to
`feature-solution-analysis` with the conflict.

| Situation                           | Obligation to make explicit                                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Initial load and subsequent changes | Population, history, cutoff and resumption without loss between loading and ongoing synchronization; page consistency where required. |
| Repeated occurrence                 | Operation identity and scope, expected effect, deduplication horizon and handling of the same key with different content.             |
| Timeout after transmission          | How to distinguish confirmed failure from unknown outcome; supported lookup/reconciliation before a potentially harmful retry.        |
| Partial failure                     | Unit of acceptance and confirmation; which records can resume without repeating other records' effects.                               |
| Late or out-of-order message        | Version/effective-date rule and conflict detection; never assume arrival order expresses the business rule.                           |
| Correction and reprocessing         | Who corrects the source or mapping, which revision will be applied and how regression to old data is prevented.                       |
| Missing prerequisite record         | Required order or condition, visibility of the pending item and resolution owner.                                                     |
| Contract change                     | Producer/consumer compatibility, retained data, transition and reversal limits.                                                       |

When these obligations require cross-system comparison, use
[Integration reconciliation](integration-reconciliation.md) for the comparison boundary,
discrepancy classes, success criteria and safe correction responsibilities. Do not infer
completion from matching batch totals.

A possible tracking vocabulary is "pending", "received", "confirmed", "rejected" and "outcome
unknown". These are proposed local states, not state names guaranteed by HCM. Link each state to
an observation and the person who must act. Reuse accepted terminology when it communicates these
distinctions. Users need the next action, not internal details that do not help them.

Define authentication, authorization and company/tenant separation according to the applicable
contract. Record required configuration and roles without storing secrets. Limits, retention,
update deadlines and retry policies need a source or explicit proposal; do not adopt generic
numbers as guarantees. Authenticated access does not establish permission for every employment
relationship.

For document-bearing flows, distinguish the document/transaction identity from the signer's
identity and from a transport correlation key. Base64 is encoding, not encryption; establish
required transport/storage protection and payload limits from the actual contracts. Separate
receipt by Connect, each downstream operation and the final business result. A successful
submission does not establish signing or storage, and a later failure does not undo a prior
effect. Specify the supported observation and recovery responsibility for each relevant state.

## Template and validation

```text
CT-* contract and revision; BR-*/BAC-* rules covered:
Parties, owners and status: draft / in review / accepted / blocked
Source/destination specifications and conditions of use:
Identities, population and temporal semantics:
Data mapping and transformations:
Applicable dictionary/mapping revisions, owners and effective validity:
Interaction, confirmation and meaning of each state:
Reconciliation contract and criteria, when required:
Failures, recovery, operations and responsibilities:
Evolution/compatibility and transition:
TC-* criteria and EV-* evidence: planned / executed / unavailable
Pending decisions, consequences and dependent work:
```

Cross-check the complete flow: valid fields may still represent the wrong employment relationship
or activate an effect on the wrong date. Check the business rule alongside the technical contract.
Define precondition, stimulus, observation and failure condition for relevant scenarios: two
employment relationships for one person; a future effective date and retroactive correction;
a lost response; a retry with different content; a partially rejected batch; a change during
loading; access outside the permitted scope.

Run existing specification validators when applicable artifacts and tools are available. Record
exactly what was checked. Mapping review does not prove runtime conformance; a technically
successful response does not prove business completion. Deliver criteria and pending checks
without declaring the integration acceptance-tested. An unresolved issue blocks only its
dependent work.
