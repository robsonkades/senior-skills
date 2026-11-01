# Recruitment, candidate data and admission ASOs

Checked: 2026-10-31. Evidence is public documentation review, not execution against a
customer installation. HCM 6.10.4 and Senior X references below describe different
products and contracts.

## Select the actual data and product

Clarify only the distinctions that change the answer: classic Recrutamento e Seleção
(RS) or Senior X/ATS; candidates attached to a requisition or complete candidate
profiles; medical-stage status, structured ASO data or the issued/signed document;
internal or external candidate and internal or external medical attendance. Preserve
the user's read-only intent. Do not execute a registration service to retrieve data.

## Classic RS: candidates in a requisition

The native SOAP service `com.senior.g5.rh.rs.dadosRequisicao`, operation `Candidatos`
(documented version 1), retrieves candidates for required integer `codRqu`.
Authentication is required; the envelope uses `user`, `password` and `encryption`.
Its synchronous result contains `gridCandidatos` and `erroExecucao`. Relevant grid
fields include `numCan`, `seqCan`, `oriCan`, `sitCan`, `numEmp`, `tipCol`, `numCad`,
selection origin, justification, elimination reasons and points. `oriCan` distinguishes
internal (1) and external (2) candidates.

This establishes requisition membership/status retrieval, not a complete profile or
an ASO download. An ASO-related elimination reason is not an ASO document. The
documentation lists the synchronous WSDL path
`/g5-senior-services/rs_Synccom_senior_g5_rh_rs_dadosRequisicao?wsdl`; its
`example.com` host is illustrative. Obtain the actual installation WSDL and confirm
the operation, authentication mode and returned fields before generating a request.

Source: [RS requisition service](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/webservices/com_senior_g5_rh_rs_dadosrequisicao/).

The similar name `com.senior.g5.rh.rs.dadosCurriculo` is misleading for a read request:
`DadosCurriculo_3` registers external candidate data. Its documentation describes
registration and related maintenance operations; it does not establish a complete
candidate-profile query. Do not infer read support from its extensive input fields.
The heading and example operation names also differ, so use the installed WSDL for
executable contracts.

Source: [RS curriculum service](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/webservices/com_senior_g5_rh_rs_dadoscurriculo/).

## Classic HCM: configured table queries

`com.senior.g5.rh.rs.integracoes` exposes authenticated `ConsultarTabelas` (version
1). A table must first be enabled in **Recursos > Web Services > Cadastro
Integrações > Consultar Tabelas**. Inputs include `consulta.tabela`, explicit
`consulta.campos` and simple field/operator/literal filters. The response contains
occurrence messages, field name/value results and `erroExecucao`.

This is a native configurable query mechanism, not a dedicated candidate/ASO API.
If candidate or medical tables are configured and enabled in the installation, it may
serve a structured-data requirement. This applicability is conditional: verify the
table dictionary, keys, field permissions and configuration before promising a
particular query. Do not imply that naming a table grants access or returns an ASO
PDF. The published RS WSDL example uses a `rubi_` prefix; verify the deployed WSDL
instead of replacing it with a guessed prefix.

Source: [RS integration service](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/webservices/com_senior_g5_rh_rs_integracoes/).

For FR320CON configuration, return limits and its documented lack of user
abrangência enforcement, read
[configured table reads](native-service-investigation.md#configured-table-reads-in-hcm-6104).

## ASO: native maintenance is not retrieval

`com.senior.g5.rh.sm.asoexterno`, documented operation `ASOExterno_4` (version 4),
supports creation, alteration and deletion of external ASOs in SM. Required keys
are `numEmp`, `codAte`, `numAte`; `tipOpe` accepts I/A/E. `codFic` identifies the
medical file, `datAte` the issue date and `tipAso=1` an admission ASO. `envEso` has
conditions related to employee medical files. The response documents execution
errors, not retrieved ASO content. Authentication is required.

The page's heading says `ASOExterno_4`, while its sample envelopes use
`ASOExterno_2`. Report this discrepancy and inspect the installed WSDL; do not copy
the sample into a purportedly tested integration. The documented synchronous path is
`/g5-senior-services/sm_Synccom_senior_g5_rh_sm_asoexterno?wsdl` under the customer's
host. No dedicated ASO read operation was established in this reviewed service;
this does not prove that no other supported retrieval mechanism exists.

Source: [External ASO service](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/webservices/com_senior_g5_rh_sm_asoexterno/).

Other nearby services also do not establish retrieval: `com.senior.g5.rh.sm.Exames`
maintains the exam catalog, and `com.senior.g5.rh.sm.FichaMedica` maintains medical
files. Both document I/A/E operations. A medical file can identify a candidate with
`numCan`, but that does not make `FichaMedica` a candidate or ASO query.

Sources: [Exam service](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/webservices/com_senior_g5_rh_sm_exames/),
[Medical-file service](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/webservices/com_senior_g5_rh_sm_fichamedica/).

For functional verification, **Medicina > Consultas > Atestados** (`FRHISATE`)
allows consultation by issue period, origin and opinion, including external ASOs
and internal attendance. It can open the selected record. This screen is functional
evidence, not an API contract; the documentation excludes HCM GO UP.

Source: [Certificate/ASO consultation](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/sm/frhisate.htm).

## Senior X/ATS: a separate native REST contract

For an actual Senior X recruitment deployment, the public `hcm/vacancymanagement`
contract documents `GET /entities/candidate` with `offset`/`size`, and
`GET /entities/candidate/{id}`. Its base is
`https://api.senior.com.br/hcm/vacancymanagement`; it declares `Authorization` and
required `client_id` headers. These IDs are platform IDs, not classic `numCan`.

The `recruitmentProcess` entity includes `medicalExamStatus` and
`medicalExamMessage`. A medical-stage status does not establish access to the
issued ASO, its PDF or its signature. Validate product entitlement, tenant,
permissions and the current published schema before use. Do not substitute a
private BFF or `careersresume` operation merely because its documentation is public.

The live linked schema reported version **7.118.0** on the checked date; the rendered
portal excerpt showed **7.103.0**. Preserve that distinction and re-read the linked
schema for contract work. Neither is a versioned HCM 6.10.4 SOAP contract.

Sources: [Public vacancy-management API](https://dev.senior.com.br/api_publica/hcm_vacancymanagement/),
[Official linked Swagger](https://s3.amazonaws.com/br-com-senior-ecossistema-public-api/swagger/hcm_vacancymanagement.public.swagger.yaml),
[Private candidate/curriculum service boundary](https://dev.senior.com.br/api_privada/hcm_careersresume/).

Senior X's tenant integration guide identifies candidate `R122CEX`, medical file
`R110FIC` and external ASO `R110MAM` data in its HCM integration. The ASO integration
row applies when the selected attendant is external. Internal candidates use the
function/job-change ASO type in the described medical workflow. These mappings are
leads for checking the installed dictionary and integration configuration, not proof
that every table is exposed by `ConsultarTabelas` or that all ASOs share one table.

Source: [Recruitment tenant integration configuration](https://documentacao.senior.com.br/seniorxplatform/manual-do-usuario/hcm/ats-senior/gestao-recrutamento-selecao/configuracoes-tenant-recrutamento-selecao/).

## Complete a retrieval answer

State the qualified native option, exact product/service/operation and fields that
are actually established. For broader candidate data or an issued ASO, identify the
remaining evidence: expected fields or artifact, source module, installed WSDL or
public schema, eligible table configuration and a sanitized sample response. A
documented generic query is an alternative to evaluate; it is not a verified result
until those conditions are checked. Keep medical content and personal identifiers
out of examples unless the authorized task requires them.

Validation performed here: official pages and the linked public Swagger were read;
no tenant API, authentication, table query, document download or write was executed.
