# Verifiable context for a Senior HCM integration

Use to investigate capabilities and constraints relevant to an HCM request. Produce a context
report, not an architecture choice or a change to the customer's environment. This path works
with documentation, accounts, contracts and sanitized samples without source code.

When Connect participates, also use [Senior Connect context](senior-connect-context.md) for
platform mechanisms and conditions. Keep Connect, HCM Integrator, Integrator X and the actual
HCM business surfaces distinct; one component's capability does not establish another's.

## Identify the environment

Reuse information already supplied and fill only gaps that change the analysis:

- Product, generation, module and version/build where applicable; "Senior" or "HCM" is not enough
  to select an interface.
- Deployment model, available environments, companies/units and tenant where applicable.
- Source and destination systems; owners of each piece of information and each interface.
- Existing integrators, load flows, customizations and rules relevant to the request.
- Available access: document, configuration export, contract, sample, environment or code.

Environment identifiers may be pseudonyms. Record the authentication method and its enablement
owner when relevant; do not request credentials in meeting notes or a specification. Document
investigation does not require calling a customer's API. Use environment access only within the
authorized scope and identify possible effects before running any command.

## Qualify the evidence

| Evidence                          | What it can establish                                                             | What it does not yet establish                                              |
| --------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Official product/version document | Declared capability and conditions for that context.                              | Enablement at the customer, commercial terms or another version's behavior. |
| Counterpart contract              | Operations and guarantees declared by the counterpart in the identified revision. | Execution results, data quality or HCM capabilities.                        |
| Exported configuration            | Configured value in the recorded environment and at the recorded time.            | Successful execution or an approved business rule.                          |
| Observed sample/test              | Behavior of the cases and environment actually exercised.                         | A general guarantee or equivalence to production.                           |
| Participant account               | What was reported, by whom and about which situation.                             | Technical confirmation of an unverified capability.                         |

For each conclusion, record source/section, revision or access date, product/environment,
observation and limit. Separate assumptions from observed facts. Preserve conflicting sources:
documentation may describe support while the supplied configuration does not show enablement.
This does not justify declaring the document false or the environment ready; identify the check
that would distinguish the possibilities.

When a source-data issue could affect loading or mapping, follow
[Integration data readiness](integration-data-readiness.md). A supported interface and a valid
schema do not establish that the supplied records satisfy the business rules.

## Investigate a candidate interface

Establish the operation actually required and the full cycle: acquiring the change, transmission,
processing, confirmation and handling outstanding items. A method for querying new hires does not
establish coverage of changes, leaves of absence or employment terminations.

Check the following as applicable to the contract:

| Aspect              | Question that prevents an unsupported conclusion                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Surface and version | Is it an API, web service, file or documented flow? Which operation and revision cover the need?                                |
| Access              | Which configuration, permissions, module and enablement conditions are required? Is there customer-specific evidence?           |
| Semantics           | Does the response represent a person, employment relationship, history or event? Which keys and dates does it distinguish?      |
| Coverage            | How does it filter companies, population and period? Does it involve pagination, deletions, inactive records or history limits? |
| Changes             | Is it a current snapshot or does it capture changes? How are late corrections and deletions detected when required?             |
| Confirmation        | Does the response confirm receipt or a completed effect? How can failure or an unknown outcome be identified?                   |
| Evolution           | Which versions and customizations must coexist? Does the document apply to the module in use?                                   |

Do not invent endpoint names, fields, events, quotas, licenses or authentication methods. An
operation known in another module is a lead to investigate. When a contract does not state a
guarantee, keep it unverified and describe the evidence that could establish it.

## Choose the next investigation

Start with the most direct source that answers the question: the applicable contract for semantics,
configuration for enablement, a controlled sample for observed behavior. Compare the cost of the
next check with the consequences of uncertainty. Avoid requesting access to the entire environment
when a sanitized export answers the question.

If only another version's information is available, treat it as a hypothesis and locate the
corresponding documentation. If evidence supports eliminating an interface under a mandatory
constraint, record the constraint and its source. Missing evidence does not make an interface
infeasible. An unsuccessful search should state its coverage and the next source, not conclude
that development is required.

## Official starting points

Accessed on 2026-10-03. Open only sources relevant to the request and recheck their applicability;
these links do not establish the deployed version or replace the customer's contract.

- [Personnel Department Management integrations](https://documentacao.senior.com.br/seniorxplatform/manual-do-usuario/hcm/integracoes/gestao-de-departamento-pessoal/): product relationships and prerequisites; useful when checking an existing capability.
- [HCM Integrator](https://documentacao.senior.com.br/seniorxplatform/manual-do-usuario/hcm/implantacao/integrador/): loading and synchronization; useful when an existing flow may affect the proposal.
- [Integrator X](https://documentacao.senior.com.br/seniorxplatform/manual-do-usuario/hcm/cadastros-gerais/integrador-x/integrador-x/): component described for HCM XT and Management Dashboard modules; confirm the installed component without assuming equivalence from its name.
- [Recruitment and Selection web services, HCM 6.10.4](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/webservices/rs.htm): versioned query examples, including queries by company, employee type and registration number. Does not define a universal key for other products or modules.
- [SST Integrator API v2](https://documentacao.senior.com.br/seniorxplatform/manual-do-usuario/hcm/integrador-sst/desenvolvedores/desenvolvendo-api/): a provider integration contract; useful for identifying which party implements each side.

## Reusable report

```text
Request/revision and questions investigated:
Products, modules, versions and environments:
Systems of record and contacts by role:
Sources and investigation coverage:
Candidate interfaces/flows: operation, source -> destination, conditions
F-* facts: observation, source and scope
U-* unknowns: consequence, next evidence and owner
A-* provisional assumptions: basis and falsifier
Source conflicts and how to distinguish them:
Reuse opportunities and their gaps:
Resolved questions and remaining decision inputs:
```

Before delivery, check that each conclusion matches the product/version examined. Every closed
question needs evidence covering its claim. Stop when material questions have a supported answer
or a bounded gap with a next step. The report can be useful without proving complete feasibility.
Choosing between configuration, reuse and development remains part of solution analysis; this
report does not create an implementation commitment.
