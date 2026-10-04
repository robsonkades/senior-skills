# Customer checklist and Connect source intake

Date: 2026-10-03. Purpose: incorporate the team's actual discovery inputs into the existing
32-skill catalog. Skills, references and templates remain in English; working deliverables
follow the user's requested language.

## Sources examined

| Source                                   | Observed properties                                                                                                                     | What the source supports                                                                                                            |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `Check List - Integrações HCM(1-2).xlsx` | One sheet, `Sheet1`; 38 headers in A-AL and two populated responses in rows 2-3. Range metadata reports A1 despite the populated cells. | The customer's questionnaire structure and the answers actually supplied; not verified API contracts or accepted scope.             |
| `XPlatform Apostila-Connect.pdf`         | 187 pages, 2024 copyright and creation metadata.                                                                                        | Training descriptions of Connect mechanisms, their configuration and behavior in that edition; not the customer's deployed version. |

The inputs were read without editing. SHA-256 fingerprints:

```text
Checklist: 47578dee7397b90932da67a85a6dd8dbb0826c60fba72f59b96fc44d3fd8f79c
Connect:   6d9bf1d4c7d4d7b1dc97f397477cbd763519fd12c4a3ffa6bb281d1b511d4eb5
```

The packaged references summarize the applicable reasoning and identify sources. They do not
require distributing the filled customer workbook or the full training PDF with every skill.

## Consequences for the first meeting

One response contains apparent test/placeholder text. The other describes a sales-document flow
through an integration platform, electronic signing and document storage. That is evidence for
checking answer quality and the actual domain before selecting HCM-specific questions. The
workbook's title alone cannot establish an HR/personnel process.

The detailed response supplies useful business data and a partially defined mapping while
referring to documentation and reusable artifacts that are not contained in those answers.
Its proposed interaction and success criteria still need the applicable contracts. The skills
now reuse that starting information, preserve missing evidence and assign targeted questions
to the party responsible for each answer. No real names or filled customer payloads are copied
into reusable examples or behavioral cases.

| Before the meeting                                                                                      | During the meeting                                                                                                                          | After the meeting                                                                                                                       |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Read answers and attachments, identify flows and domain, prepare known/open items and a focused agenda. | Confirm outcome, current/desired process, material rules, initial mapping and interface ownership with the customer and relevant providers. | Update the living definition, record actual decisions, attach the provisional map and identify evidence/owners for solution refinement. |

An analyst can prepare the first meeting while technical details remain open. First-meeting
completion, business-definition acceptance, engineering readiness and acceptance testing remain
distinct states. A proposed agenda must never be presented as a meeting that occurred.

## Where the material belongs

- [Checklist workshop](../skills/collaborative-feature-definition/references/integration-checklist-workshop.md) translates supplied answers into a briefing, questions, participant responsibilities and initial field map.
- [Senior Connect context](../skills/feature-context-analysis/references/senior-connect-context.md) maps relevant training sections to capability checks, execution semantics, capacity and operating responsibilities.
- [Solution analysis](../skills/feature-solution-analysis/SKILL.md) separates standard/configuration/reuse/custom coverage from the platform chosen to execute it.
- [Contract definition](../skills/feature-contract-definition/SKILL.md) carries the questionnaire's data items into evidenced field and interaction obligations under engineering ownership.
- [Readiness review](../skills/feature-readiness-review/SKILL.md) checks the transition requested and the evidence actually available.
- [HCM analysis route](../skills/feature-engineering/references/hcm-analysis-route.md) keeps stages resumable and uses implementation-resource tracking only after delivery resources exist.

Current official Connect documentation was also consulted for
[flow documentation](https://documentacao.senior.com.br/seniorxplatform/manual-do-usuario/senior-connect/funcionalidades/fluxo-de-integracao.htm)
and [integration keys](https://documentacao.senior.com.br/seniorxplatform/manual-do-usuario/senior-connect/funcionalidades/chaves-integracao.htm).
The latter describes an authentication capability with tenant and role conditions; current
documentation and the training edition must be checked against the target environment.

## Evidence against the eight pillars

| Pillar            | Observable contribution                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| Precise scope     | First-meeting preparation has a bounded output; actual domain determines whether HCM questions apply.                 |
| Discovery         | Existing answers are reused; placeholders, contradictions and missing referenced artifacts produce focused questions. |
| Technical depth   | Connect receipt/completion, JOB overlap, timeout/remote effects, payload contracts and encoding are distinguished.    |
| Decision criteria | Coverage and platform are separate choices; configuration/reuse can win when evidence supports them.                  |
| Solution quality  | Customer-readable summary, proportionate agenda, minimum mapping and maintainable ownership.                          |
| Execution         | Briefing, agenda, living definition, mapping and next evidence have concrete formats.                                 |
| Validation        | Conclusions trace to cells, document pages or applicable contracts; planned and executed checks remain distinct.      |
| Knowledge limits  | Training, public documentation, customer statements, configuration and runtime tests establish different claims.      |

This is a content review, not evidence of a live customer pilot. Behavioral checks and their
limits are recorded separately under [evaluations](evaluations/checklist-connect/results.md).
