# Investigate Senior Connect as an integration candidate

Use when Connect is mentioned in a customer checklist, proposed solution or existing flow.
Establish capabilities, conditions and unknowns for that demand. Connect can participate in
HCM or other domains; identify the actual business systems before applying domain rules.
This reference supports investigation, not deployment or a promise of standard product coverage.

## Scope the sources

The user-supplied `XPlatform Apostila-Connect.pdf` has 187 pages and 2024 copyright/creation
metadata. Page references below describe that edition; its date is not the customer's product
version. The PDF is supporting source material, not a required installed-skill dependency.
Obtain the applicable contract or current documentation when the original is unavailable.

Record the customer environment, cloud/on-premise deployment, tenant, product version/build
when identifiable, enabled components, available license/capacity evidence and operational owner.
Keep the evidence for Connect separate from evidence for HCM, the HCM integrators and each
counterpart. A Connect action can call an interface; it does not establish that the interface
exists, accepts the proposed payload or fulfills a business rule.

Current official starting points, accessed 2026-10-03:

- [Integration flows](https://documentacao.senior.com.br/seniorxplatform/manual-do-usuario/senior-connect/funcionalidades/fluxo-de-integracao.htm): the documentation editor can describe headers, parameters, input and output. Seek the actual flow's documented contract; the platform feature is not evidence that someone has completed it.
- [Integration keys](https://documentacao.senior.com.br/seniorxplatform/manual-do-usuario/senior-connect/funcionalidades/chaves-integracao.htm): describes temporary JWT access for REST flows and tenant/role conditions. Verify applicability and the actual authentication contract; do not assume every Connect endpoint uses one authorization scheme.

Public documentation establishes a documented capability, not customer enablement. Preserve
conflicts between the training edition, current documentation and deployed configuration until
the relevant version or a controlled check resolves them.

## Match the required interaction to a documented mechanism

| Mechanism in the training edition           | Relevant behavior                                                                             | Evidence still needed for this demand                                                                                    |
| ------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| API query, pp. 70-73                        | Exposes a configured database query through REST.                                             | Permitted data access, supported database/interface, query semantics, filtering and paging.                              |
| REST/SOAP data sending, pp. 75-76           | Scheduled database query and outbound service call, with configured follow-up queries.        | Change selection, destination contract, failure behavior and resumption; follow-up SQL is not a distributed transaction. |
| Integration flow, pp. 81-84                 | REST-triggered or scheduled actions can call services, transform data and compose processing. | Available actions, payload contracts, actual sequence, dependencies and operational limits.                              |
| Value mapping and parameters, pp. 80, 129   | Store mappings and reusable environment values.                                               | Approved business mapping, missing-key handling, scope, ownership and change impact.                                     |
| REST to SOAP, pp. 130-133                   | A configured REST surface forwards a templated SOAP request.                                  | Both sides' operations, authentication, payloads and error/confirmation semantics.                                       |
| Credentials and monitoring, pp. 74, 116-118 | Referenced credentials and execution records support operation.                               | Access roles, secret provisioning owner, useful correlation, log exposure, alert coverage and support response.          |

Investigate the narrowest mechanism that could meet the accepted outcome. An existing supported
flow or configuration may be enough; a newly composed low-code workflow may still be custom
development. Report which required behavior is already covered and which actions, mappings or
counterpart changes would have to be created. Selection belongs to solution/decision analysis.

## Inspect behavior that can change the solution

| Question                                                | Training evidence and practical consequence                                                                                                                                                                                                         |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Does a successful HTTP response mean completion?        | Pp. 111-112 distinguish synchronous completion from an asynchronous immediate HTTP 200 receipt. Define how the caller discovers the actual outcome and correlates later failures.                                                                   |
| What happens when a scheduled run is still active?      | Pp. 109-111 describe execution timeout and limits on simultaneous JOB runs. A prevented overlap does not prove that a missed trigger is queued or caught up; verify selection windows and recovery.                                                 |
| Can a flow continue after a conditional/error branch?   | Pp. 91-97 and 106-107 describe alternate execution levels and explicit continuation. Validate the actual success/error path; do not assume ordinary sequential Java control flow.                                                                   |
| What happens to an already completed remote effect?     | Pp. 112-114 describe stopping a running flow and its error status. That does not establish rollback of a remote write or safe retry.                                                                                                                |
| Can custom Java or a successful save prove feasibility? | Pp. 98-102 describe interpreted Java with limitations; p. 114 describes checks on save. Confirm runtime support and exercise representative behavior; saving a flow is not an integration test.                                                     |
| Can an exported flow move independently?                | Pp. 78-79 describe separate dependencies and replacement of existing records on import. Inventory required credentials, parameters, mappings and other artifacts; do not treat an export as a complete deployment or run an import during analysis. |

Choose the relevant questions; do not require a runtime experiment for every item in the table.
For an unknown remote outcome, investigate supported lookup, idempotency and reconciliation
before proposing retries. A log success for one flow is not proof that all downstream business
steps finished. Model each consequential boundary separately.

## Investigate data, capacity and operations

Use the customer's stated payload as a starting list, not an API schema. Locate contracts for
every participating surface and establish field paths, requiredness, domain, maximum size and
error responses. When documents are encoded in Base64, distinguish encoding from encryption;
it also expands the binary representation by roughly one third before envelope overhead.
Verify payload limits and memory/transport effects with representative sizes rather than
deriving capacity from monthly record counts alone.

Separate trigger frequency, peak arrival rate, processing time, concurrency and required
business completion time. Record published or observed limits with their scope; missing quotas
are unknown, not unlimited capacity. Establish who corrects a rejection, checks an unknown
result and resumes a failed flow without repeating a completed effect.

The training edition describes deployment/network responsibilities on pp. 149-150 and network
access on pp. 182-183. Verify the relevant connection direction, reachability, authentication,
certificate ownership and environment differences. A cloud/on-premise label alone does not
prove access. Request configuration evidence through the responsible role, never secret values
in the checklist, meeting notes or examples. Do not assume direct database writes are a
supported way to update an HCM product merely because Connect can execute database actions.

## Deliver bounded findings

```text
Request/revision, business domain and completion point:
Connect environment/version and counterpart surfaces:
Sources: edition/page or official URL/revision, access date and environment scope
Candidate mechanism and behavior already evidenced:
Required custom work versus possible configuration/reuse, still to verify:
Interactions: trigger -> processing -> acknowledgement -> business confirmation
Data/capacity/recovery conditions and responsible roles:
F-* supported facts; U-* unknowns; A-* provisional assumptions with falsifiers:
Next decisive check and consequence for the solution choice:
```

Validate each conclusion against the applicable source and distinguish document inspection,
configuration review and executed tests. Stop with supported findings or bounded unknowns;
no endpoint, license entitlement, retry guarantee or completed customer deployment may be
invented to finish the report.
