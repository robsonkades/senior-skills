# HCM documentation navigation

Use this map for questions across the documented HCM product. The initial absence,
recruitment/ASO and stability notes are optional examples of previous research;
they do not define the skill's supported topics. A new question starts a new
evidence search using [research-workflow.md](research-workflow.md).

The baseline is [Gestão de Pessoas | HCM 6.10.4](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/index.html).
The local index combines the complete retrieved navigation and sitemaps with
links extracted from in-version articles. It locates sources; a URL's presence or
title does not establish the answer to a business or technical question.

## Search the broad index

Run from this skill's directory with Node.js 22.18 or newer:

```sh
node scripts/documentation-index.mjs search "programacao ferias"
node scripts/documentation-index.mjs search "banco horas"
node scripts/documentation-index.mjs search "S-1210"
node scripts/documentation-index.mjs search "orcamento posto"
node scripts/documentation-index.mjs search "treinamento"
node scripts/documentation-index.mjs stats
```

Search covers URLs, titles and navigation labels, ignoring case and accents. All
supplied terms must match; separate searches provide alternatives, not a longer
AND query. Results prefer current-edition, successfully fetched articles and direct
title/URL matches. The default page contains 30 records; its first JSON line gives
the full match count and `nextOffset`. For example:

```sh
node scripts/documentation-index.mjs search ferias --scope current --limit 10
node scripts/documentation-index.mjs search ferias --scope current --limit 10 --offset 10
```

Use `--scope all` (the default) or `--scope external` when related resources are
needed, checking their actual product/version. `--limit` accepts 1 through 100.
Follow `nextOffset` for another page, or narrow using the module, screen identifier,
service namespace or a more distinctive term. External placeholder hosts are not
runtime evidence, even if an official article links to them.

The index is **not full-text search** of article contents. A field, rule, service
operation or exception can be inside an article whose title does not contain it.
When metadata does not locate the answer:

1. Reduce the question to its business object, action and distinctive identifier.
   Search Portuguese terms separately from English API or technical identifiers.
2. Try the documented vocabulary and nearby synonyms. For example, search `recibo`,
   `ficha financeira` and `demonstrativo` separately; verify which one actually
   describes the user's object. Do not assume these are interchangeable outputs.
3. Open the module/process hub below and follow the relevant menu branch. The index
   records `navigation` breadcrumb paths, and fetched articles record
   `outgoingLinks`; these provide alternatives to keyword matching.
4. Open the candidate article and search its body using the reader or browser
   described in [research-workflow.md](research-workflow.md). Follow its field,
   process, rule, related-screen and integration references as needed.
5. If still unresolved, use the portal's search or an official-domain web search,
   including the exact release path and a distinctive phrase. A search snippet is
   a lead; read the page before treating it as evidence. Report a bounded gap when
   the necessary evidence remains unavailable.

For metadata inspection, use `rg` on
[documentation-index.jsonl](documentation-index.jsonl), narrowing to a technical
identifier or path. Do not load the entire index into model context. A zero-result
keyword search does not prove that the feature or documentation is absent.
For example, `período aquisitivo` had no metadata matches in the initial snapshot;
broaden to `férias` and inspect the relevant article body instead of answering that
the product has no such concept.

## Module and process map

Use [Manual por Processos](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/manual-processos/gestao-de-pessoas/)
for end-to-end business flows and
[Ajuda por telas](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/ajuda-telas/)
for screen/field behavior. The entries below come from the vendor's navigation;
their hub pages were checked for actual article content. Suggested search terms
are discovery aids, not claims that every feature is enabled in every deployment.

| User's area                                                            | Official hub                                                                                                                                                                                                               | Starting terms and distinctions                                                                                                                                            |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Payroll, vacation, termination, annual processing and tax calculations | [Administração de Pessoal](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/rubi/administracao-de-pessoal/)                                                                                                 | `folha`, `cálculo`, `férias`, `período aquisitivo`, `abono`, `rescisão`, `13º`, `impostos`. Check the relevant calculation type, date basis and event configuration.       |
| Time collection, meals and legacy timekeeping                          | [Controle de Ponto e Refeitório](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/ronda/controle-de-ponto-e-refeitorio/)                                                                                    | `coletores`, `marcações`, `apuração`, `escalas`, `refeitório`, `professores`. Distinguish time collection, calculation and payroll integration.                            |
| Time balances, approvals and time sheets                               | [Gestão do Ponto](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/gestao-ponto/produto/) and [new interface](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/gestao-ponto/nova-interface/) | `banco de horas`, `incidentes`, `espelho`, `horários`, `programações`. Confirm product/interface; these hubs contain lifecycle or applicability notices.                   |
| Benefits and task-based compensation                                   | [Benefícios e Tarefeiros](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/bs/beneficios-tarefeiros/)                                                                                                       | `benefícios`, `subsídios`, `tarefeiros`, `produção`. Follow the branch matching the requested benefit or task calculation.                                                 |
| Job structures and salary management                                   | [Cargos e Salários](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/cs/cargos-e-salarios/)                                                                                                                 | `cargos`, `salários`, `habilidades`, `avaliações`, `propostas`. A job definition, employee history and salary proposal are different objects.                              |
| Staffing limits, allocation and workforce budgets                      | [Quadro de Vagas e Orçamento](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/ql/quadro-de-vagas-e-orcamento/)                                                                                             | `lotação`, `posto`, `local`, `centro de custo`, `orçamento`, `chefias`. Distinguish workforce planning from a recruitment requisition.                                     |
| Classic recruiting and selection                                       | [Recrutamento e Seleção](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/rs/recrutamento-e-selecao/)                                                                                                       | `candidatos`, `seleção`, `requisição`, `currículo`. Establish classic RS versus Senior X/ATS before choosing a contract.                                                   |
| Learning, development, surveys and related budgets                     | [Treinamento e Pesquisa](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/tr/treinamento-e-pesquisa/)                                                                                                       | `treinamento`, `turma`, `desenvolvimento`, `pesquisa`, `orçamento`, `auxílio`. Inspect applicability and lifecycle notices for the actual module.                          |
| Occupational safety and medicine                                       | [Segurança e Medicina](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/sm/seguranca-e-medicina/)                                                                                                           | `segurança`, `medicina`, `EPI`, `riscos`, `exames`, `atestados`, `CIPA`. Follow the owning safety/medical process and its eSocial links.                                   |
| Legal case management                                                  | [Jurídico](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/jr/juridico/)                                                                                                                                   | `ações`, `processos`, `jurídico`. Explain the documented system behavior separately from a current legal opinion.                                                          |
| Profit/result sharing                                                  | [Participação nos Lucros e Resultados](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/plr/plr/)                                                                                                           | `participação`, `PLR`, `Tecnólogo`. Inspect the relevant participation/calculation configuration before explaining an amount.                                              |
| Government-event generation, submission and correction                 | [eSocial process manual](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/manual-processos/esocial/esocial/)                                                                                                | Search the event identifier, such as `S-1210`, plus `retificação`, `exclusão`, `pendências` or `fechamento` as relevant. Event/layout versions and effective dates matter. |
| Employee/company master data, shared tables, histories and resources   | [Telas em comum](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/vetorh/menu-telas-em-comum/)                                                                                                              | `pessoas`, `colaboradores`, `empresas`, `tabelas`, `cálculos`, `recursos`, `relatórios`. The same screen can have module-specific fields and conditions.                   |
| Timezone adjustments                                                   | [Ajuste de Fusos Horários](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/ronda/frajfuho/)                                                                                                                | `fuso`, `horário`, `FRAJFUHO`. Inspect the screen's module applicability before transferring its behavior to another product.                                              |
| HR alerts and compliance monitoring                                    | [Compliance Hub](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/vetorh/frxtalertcenter/)                                                                                                                  | `alertas`, `ocorrências`, `Compliance Hub`, `FRXTALERTCENTER`. Check activation/configuration and distinguish an alert from its underlying rule.                           |

## Cross-cutting technical sources

| Need                                                                | Official source and investigation route                                                                                                                                                                                           |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Native SOAP capabilities                                            | [Web-service catalog](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/webservices/gestao_pessoas/): choose the owning module and inspect the exact operation, inputs, outputs and direction.                      |
| Execution modes and return behavior                                 | [Execution types](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/webservices/tipos_execucao/tipos_execucao/): verify the operation's supported mode instead of assuming every mode returns data synchronously.   |
| Internal rules, functions, variables, contexts and extension points | [Customizations](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/customizacoes/customizacoes/): search the exact identifier and read its call conditions. An internal function is not a public HTTP operation.    |
| Cross-system integrations                                           | Search the navigation branch `Integrações com outros sistemas` and paths under `integracoes/`. Follow the named destination, direction and prerequisites; the branch includes ERP, TMS, Workflow and other distinct integrations. |
| Deployment, technical requirements and supplementary guidance       | [Additional information](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/informacoes-adicionais/): locate the relevant technical child page instead of treating the hub as a detailed specification.              |
| XTended activation                                                  | [Ativação do HCM XTended](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/extended/ativacao-hcmxt/): check prerequisites and follow the specific XTended component.                                               |
| Product guidance about personal data                                | [LGPD](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/lgpd/): inspect the relevant product controls; a feature alone does not establish legal compliance.                                                        |
| Vendor treatment of legislative changes                             | [Legislation](https://documentacao.senior.com.br/gestao-de-pessoas-hcm/6.10.4/legislacao/): check publication/effective dates; current legal questions also require current authoritative legal sources.                          |

## Keep product, release and evidence boundaries visible

The map is navigational, not a license matrix. Inspect the selected article's
restriction notices, module icons, interface names and effective dates. Do not
silently substitute Senior X, ATS, another HCM release, GO UP or a technology-platform
manual for the requested product. Follow an external reference when it is needed,
then label its product/version and establish its relevance.

Some navigation entries are stale: the index records soft 404s for the GO UP and
XTended top-level hubs. Prefer reachable component pages and explicit applicability
notices in the service/module article. A navigation failure is not evidence that a
product feature does not exist.

Read [coverage.md](coverage.md) for inventory states, source boundaries, exclusions
and maintenance commands; [coverage.json](coverage.json) contains snapshot counters.
The map and cached notes do not remove the need to read substantive sources for
each new question. Binary attachments need an appropriate reader when their contents
matter. Refreshing metadata does not automatically validate cached conclusions.
