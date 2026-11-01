# Absence history and employment stability

Documentation reviewed: **2026-10-31**, Gestão de Pessoas | HCM **6.10.4**.
These findings establish documented behavior, not availability or successful execution
in a customer's installation. Open the cited page again for the requested patch/version.

## First resolve the meaning of absence type

The question "Is there a native service for absence types in absence history?" can mean:

| Intended result                                | Relevant concept                              | Consequence                                                                             |
| ---------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------- |
| List configured absence codes and descriptions | Situações, screen FR010SIT, table R010SIT     | A configurable situation catalog is not an employee's history.                          |
| Classify a configured situation                | Tipo de Situação                              | Do not assume that a situation's configurable code equals its internal type.            |
| Retrieve an employee's dated occurrences       | Históricos de Afastamentos, FR038AFA, R038AFA | Identify employee, dates, situation and scope; do not substitute the current situation. |
| Retrieve an eSocial reason                     | Motivo de afastamento eSocial                 | Verify its mapping separately; do not equate it with either code above.                 |

[Situation process](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/manual-processos/situacoes.htm)
documents configurable situations and their internal classification. The catalog is shared
across companies. [History maintenance](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/manual-processos/manutencao-historicos/)
describes employee absence histories and their payroll/eSocial consequences.
[getSituacoes](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/customizacoes/funcoes/getsituacoes/)
identifies R010SIT; [absence persistence](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/webservices/com_senior_g5_rh_hr_persistencia/)
identifies R038AFA.

## Native read service: documented route and limits

The authenticated SOAP service **`com.senior.g5.rh.fp.integracoes`**, port
**`ConsultarTabelas`**, version 1, reads tables explicitly released at
**Recursos > Web Services > Cadastro Integrações > Consultar Tabelas**.

- Request: `consulta.tabela` is required; `consulta.id`, `consulta.campos`,
  `ordenacao` and repeated `filtro` entries are optional. Filters use
  `campo`, `condicao`, `valor`; supported operators include `=`, `<>`, comparisons
  and `IN`. Filters combine with AND; aggregate functions are not supported.
- Select only needed columns through comma-separated `consulta.campos`.
- Response: repeated `ocorrencia` contains `id`, `tabela`, `dataHora`,
  `mensagem` and `resultado.campo` name/value pairs; inspect `erroExecucao` too.
- Use the installed synchronous WSDL for a data-returning request. Documentation
  uses an illustrative host, not a public Senior production endpoint.

Source: [integracoes / ConsultarTabelas](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/webservices/com_senior_g5_rh_fp_integracoes/).

**Conditional application, not a dedicated endpoint claim:** investigate whether the
installation releases R010SIT for the catalog and R038AFA for history through this
native generic read service. Confirm permitted columns, type classification, the
history-to-situation relationship and row access in the installed data dictionary and
integration configuration before providing a runnable request. Public documentation
of the generic service does not prove that these tables are released in the tenant.
Do not invent `GetTiposAusencia`, a REST route, joins, pagination or a table allowlist.

For FR320CON configuration, return limits and its documented lack of user
abrangência enforcement, read
[configured table reads](native-service-investigation.md#configured-table-reads-in-hcm-6104).

The narrower **`com.senior.g5.rh.fp.consultarColaborador` / `ConsultarColaborador`**
requires `numEmp`, `tipCol`, `numCad` and returns `tMCSColaboradores` with
`sitAfa`, `desSit`, `datAfa`, `horAfa` among its employee fields. This contract does
not establish a complete absence history or situation catalog.
[Contract](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/webservices/com_senior_g5_rh_fp_consultarcolaborador/).

## Avoid false read-service matches

- `com.senior.g5.rh.fp.historicos` / `Afastamento_4` and `Afastamento_5` register
  absences; their existence is not evidence of a lookup endpoint.
  [Contract](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/webservices/com_senior_g5_rh_fp_historicos/).
- `com.senior.g5.rh.hr.persistencia` / `Afastamentos` inserts, updates or deletes
  R038AFA records. `operacao` accepts `I`, `A`, `E`, `IA`; it is not a query.
  [Contract](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/webservices/com_senior_g5_rh_hr_persistencia/).
- The catalog marks the old unversioned `historicos.Afastamento` discontinued
  and points to `persistencia.Afastamentos`. Do not generalize that notice to
  every versioned absence port. The same catalog excludes this web-service
  resource from HCM GO UP.
  [Service catalog](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/webservices/gestao_pessoas/).
- `getSituacoes()` and `getHistoricosAfastamento()` are internal rule functions,
  not public HTTP contracts. The latter excludes type 15 (Faltas), so it cannot
  silently replace an all-absence query.
  [Function contract](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/customizacoes/funcoes/gethistoricosafastamento/).

If the generic read route is unavailable, report that precise gap and request the
installed WSDL/table configuration. A restricted search does not prove that no
native service exists. A custom integration is a separately scoped alternative.

## How stability control works

Stability is maintained as **dated employee history**, not merely a Boolean flag.
**Colaboradores > Históricos > Estabilidade (FR038HEB)** records start/end,
type, origin and observations. CIPA integration can generate records, with
different candidature and mandate periods; elected substitutes require checking
the Segurança e Medicina setting or manual control when not integrated.
Never assume all CIPA roles receive the same mandate treatment.
[History screen](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/vetorh/fr038heb/).

For absence-derived stability, inspect **FR010SIT / Gerar Estabilidade**:

| Setting  | Documented calculation basis                                                                         |
| -------- | ---------------------------------------------------------------------------------------------------- |
| `N`      | No generated stability history.                                                                      |
| `I`      | Begins at absence start, with configured duration.                                                   |
| `F`      | Begins the day after absence end, with configured duration.                                          |
| `A`      | Begins after absence end, using absence duration, subject to the maximum.                            |
| `D`      | Begins at absence start, using twice its duration, subject to the maximum.                           |
| `M`, `R` | Month-based start/end calculation respectively; inspect the exact field help before computing dates. |

Also check the stability type and day/month settings. For work-accident absences,
generation requires justified days to be fewer than the absence duration.
Vacation-related stability can be rescheduled by subsequent vacation histories.
[Situation configuration](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/vetorh/fr010sit/).

Union-specific configuration can differentiate stability for one situation by
union and overrides the situation's own configuration. Inspect the employee's effective union history and the relevant agreement
before explaining a particular result.
[Union process](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/manual-processos/sindicatos/).

### Termination checks and calculation are separate

**FR042CAU / Checar estabilidade** determines whether termination under that cause
checks stability. [Termination causes](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/vetorh/fr042cau/).
The employee screen documents an alert during termination inside a stability
period; do not describe all workflows as an unconditional prohibition.
[Employee record](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/vetorh/fr034fun/).

**FRCALRCS / Estabilidade** handles indemnified days and their vacation/13th-salary
effects; corresponding payroll events must exist. Its displayed **Data Projetada**
does not itself include stability, even though other checks can consider it.
[Termination calculation](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/rubi/frcalrcs/).
The termination SOAP contract exposes **`permiteDemitirEmEstabilidade`**, default `N`;
an integration must inspect that port and its other controls. This is not permission
to set the flag or execute a termination.
[Termination service](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/webservices/com_senior_g5_rh_fp_rescisao.htm).

Custom rules 172/173/174 run from FR038HEB, not every generator of stability
history. [Process rule index](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/customizacoes/regras/indice-regras-por-processo/).

## Evidence needed for a specific installation

For an explanatory answer, use the documented paths and conditions above. For a
disputed result, collect the patch, module, employee key (redacted), relevant dates,
stability type/origin, situation settings, effective union, termination cause and
applicable integration parameters. Compare expected dates with the actual history
and a permitted simulation; record whether validation was documentary or executed.
Do not change payroll, histories, integration permissions or termination settings
merely to investigate. Product configuration describes system behavior; a conclusion
about current legal entitlement needs the applicable current authority/agreement.
