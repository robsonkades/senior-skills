# Native service investigation

Use this reference when a user asks whether Senior provides an API, which native
operation to call, or how to retrieve particular fields. The task is to prove the
fit of a contract, not to produce a plausible endpoint name.

## Evidence ladder

| Evidence                                      | Establishes                                                | Does not establish                                          |
| --------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------- |
| Official versioned operation documentation    | Published intent, parameters and documented behavior       | Customer deployment, enabled module or successful execution |
| Official platform API specification           | Contract for that platform product and spec revision       | Compatibility with legacy HCM 6.10.4                        |
| Deployed WSDL / schema supplied by the user   | Operations and shapes exposed in that deployment           | Permissions, correct records or business completeness       |
| Authorized sanitized test and its response    | Observed result for those inputs, revision and permissions | All records, every tenant or all releases                   |
| A functional screen or table definition       | Business meaning and persistence context                   | A callable public read operation                            |
| Search result, URL title or local index entry | A discovery lead                                           | Existence of the required response field                    |

Record the source URL, product, documentation version, check date and applicable
operation near each finding. If the heading and embedded example disagree, retain
both observations and use the deployed WSDL to resolve the executable name.

## Match the question to a contract

1. Split the requested data into independent needs, such as candidate identity,
   candidature for a requisition, examination status, structured ASO and its PDF.
2. For each candidate operation, inspect its purpose and direction before its field
   names. An import can accept all required data without returning any existing
   records. Deletion may be encoded as an input flag on a write operation.
3. Record the exact service namespace and operation, SOAP/REST protocol and product.
   For a REST API, verify method, route and schema from its actual specification.
   For SOAP, use the documented WSDL pattern and the customer's actual WSDL; do not
   convert a documentation URL into a runtime endpoint.
4. Inspect required identifiers, optional filters, nested collections, return/error
   structures, maximum result sizes, pagination and documented date semantics.
   Distinguish a field's existence from guaranteed population and completeness.
5. Verify the authentication and execution modes documented for that operation.
   Do not copy Senior X token assumptions into G5 SOAP or treat an example host as
   a shared Senior endpoint. Never infer that every operation supports each mode.
6. Identify configuration dependencies: licensed module, integration registration,
   allowed tables/fields, user permissions and enabled service. A conditional
   mechanism remains conditional until those facts are established.

## Choose a result

| Finding                                     | Answer and next action                                                                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Dedicated native read satisfies the fields  | Name it and cite the response fields; verify the deployed contract if implementation is requested.                             |
| Native generic query can address the data   | Explain configuration, permitted fields and limits; verify the table/field mapping. Do not label it a dedicated API.           |
| Native API returns only part of the request | State the covered fields and the specific gap, such as a missing signed attachment.                                            |
| Only a write/import was located             | Identify its direction and continue looking for a read; do not recommend invoking it to retrieve records.                      |
| Only another product/version matches        | Present it as a separate conditional option and identify the product decision needed.                                          |
| No matching contract found                  | List the narrow sources and terms checked and the evidence needed next; do not convert a search miss into global nonexistence. |

Do not silently replace a native API request with direct database access or a
custom web service. If a custom extension becomes necessary, describe the gap,
maintenance cost and supported extension route separately from native capability.

## Useful evidence record

### Configured table reads in HCM 6.10.4

**FR320CON** supports system and user tables. Inspect its configured **Tabela(s)**,
**Campos exceção** (excluded fields) and **Qtd. Retorno** (record limit).
The documented integration service **does not respect user abrangência**; do not
assume authentication enforces the user's normal row scope. Without field
exceptions, all fields in the configured tables can be integrated. Select the
needed fields and restrictive filters, and verify authorized data boundaries.
A capped response is not proof of completeness or a documented pagination cursor.
High-volume responses can exhaust Java memory; the manual's environment-dependent
examples are not a universal safe maximum. Inspect configuration without changing
permissions or running an unrestricted medical-data query.
[Configuration contract](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/vetorh/fr320con/).

### Recording the result

For a complex question, keep a compact record containing the need, product/release,
service and operation, request identifiers, relevant response fields, restrictions,
official URL, checked date and verification state. Suggested states are
`documented`, `conditional`, `inferred`, `not located` and `runtime verified`.
An indexed or downloaded page is not automatically a documented answer.

During this skill's creation, the public Orbit discovery search returned no
matches for the three HCM integration topics. That is only a discovery gap in
Orbit; the domain references use Senior's own documentation as primary evidence.
No Postman workspace, collection or live customer system was needed or changed.
