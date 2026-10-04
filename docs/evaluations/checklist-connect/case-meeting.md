# Case: prepare the first integration meeting

Use `collaborative-feature-definition` to prepare the first customer meeting from the supplied
questionnaire extract. The form is titled "HCM Integration Checklist". The customer process
owner, a sales-system provider and a Senior integration specialist are expected to participate.
Produce a concise English briefing, proposed agenda, initial mapping and focused questions.
The meeting has not occurred. This task ends with preparation; no messages or invitations.

The source below is a synthetic transcription for evaluation, not a real customer's response.
Treat locations as references to the supplied extract, not proof that you opened an XLSX file.

| Location       | Question                 | Supplied answer                                                                                                                      |
| -------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Sheet1 O2-Q2   | Problem, result, success | asdf; asdf; test                                                                                                                     |
| Sheet1 M3      | Request type             | New integration                                                                                                                      |
| Sheet1 O3      | Problem                  | Sales staff print service-agreement PDFs for signing, then scan and file them.                                                       |
| Sheet1 P3      | Expected result          | Send eligible completed-sale documents for electronic signature and store the signed document. Checkout must not wait for signature. |
| Sheet1 Q3      | Success criteria         | The integration returns HTTP 200.                                                                                                    |
| Sheet1 U3, AF3 | Direction and systems    | Sales system -> Connect -> signing application -> document repository.                                                               |
| Sheet1 V3, AB3 | Timing/frequency         | Trigger after the completed sale generates its PDF; on demand for each eligible sale.                                                |
| Sheet1 W3      | Data                     | Agreement identifier, signer name and email, document filename and PDF in Base64.                                                    |
| Sheet1 X3      | Mapping status           | Partially defined; final API fields to be supplied by Senior and the signing provider.                                               |
| Sheet1 Y3-Z3   | Selection/rules          | Only service agreements; avoid duplicate signature requests after resubmission.                                                      |
| Sheet1 AA3     | Errors                   | Log failures and allow resubmission; the sale must continue.                                                                         |
| Sheet1 AC3     | Volume                   | 2,400 documents per month on average.                                                                                                |
| Sheet1 AG3     | Provider documentation   | Yes, provider specification exists. No attachment was included.                                                                      |
| Sheet1 AH3     | Deadline                 | Ready for use by 16/10.                                                                                                              |
| Sheet1 AI3     | Reuse                    | The provider says Connect makes this a standard integration. No existing flow was supplied.                                          |
| Sheet1 AK3     | Technologies             | Encryption; PDF in Base64.                                                                                                           |
| Sheet1 AL3     | Another questionnaire    | No.                                                                                                                                  |

The available platform note says asynchronous Connect calls can return HTTP 200 upon receipt;
it contains no contract for either downstream application. There is no source repository or
customer environment access. Participant attendance has not yet been confirmed.
