# Parallel skill reviews

The project configures Codex with up to twenty concurrent reviewers plus the primary
coordinator. Each `skill-reviewer` owns one skill at a time and follows the complete
[review prompt](skill-review-prompt.md). Model, reasoning effort and permissions inherit
from the parent session; this project does not override them.

## Start a review

Open a new Codex session in this repository so it loads `.codex/config.toml` and
`.codex/agents/skill-reviewer.toml`. Project configuration must be trusted by Codex.
The standalone agent format and thread settings follow the
[official subagent documentation](https://developers.openai.com/codex/multi-agent/).
Use a Codex release that supports these settings; configuration parsing was checked
with Codex CLI 0.153.4 and the twenty-thread override with 0.155.1. The setting counts
open subagent threads, excluding the coordinator. Runtime limits can reduce available
parallelism; accepted configuration does not prove that twenty agents can run. Open a
new session to load a changed limit; do not claim the current session expanded without
observing its actual capacity.

Example request:

```text
Revise e melhore em paralelo as skills java-performance, gc-log-analysis e
thread-sizing-and-virtual-threads. Use um agente skill-reviewer por skill,
siga docs/parallel-skill-reviews.md e implemente as melhorias.
```

For the whole catalog, explicitly request all skills. The coordinator enumerates
`skills/*/skill.yaml`, selects packages with `SKILL.md`, and processes them in name
order with a bounded queue. A request without skill names or an explicit catalog-wide
scope needs clarification before any review is dispatched.

## Coordinator procedure

1. Read applicable `AGENTS.md` instructions and inspect `git status --short` and existing
   diffs, including untracked files. Record pre-existing changes so they are not mistaken
   for reviewer edits. Never reset or stash user work automatically.
2. Validate and deduplicate the requested skill names against actual directories.
   Maintain a task table in the conversation: skill, owner, status and validation result.
   Use pending, running, implemented, validated or blocked; a worker finishing does not
   mean the skill passed global validation.
3. Spawn one `skill-reviewer` per skill, up to twenty at once and within runtime limits.
   Pass the exact skill name, exclusive ownership of `skills/<name>/**`, relevant
   pre-existing changes, and the instruction to read `docs/skill-review-prompt.md`.
   If custom roles are unavailable but delegation works, use a worker with the full
   instructions from `.codex/agents/skill-reviewer.toml`; disclose the fallback.
   If delegation is unavailable, report that limitation rather than claim parallel work.
4. Reviewers send findings before editing and then implement autonomously. The coordinator
   relays substantive findings to the user. Do not edit a skill while its reviewer owns it.
   Keep `skills/skill-engineering` unchanged while other reviewers use it as their reference;
   if selected for review, process it alone after the other selected skills.
5. Collect each result and inspect its diff against the recorded starting state. Release
   finished threads before dispatching queued work. Before retrying or reassigning a failed
   task, confirm the previous owner has stopped and inspect partial edits. Cross-skill fixes
   remain findings unless already in the requested scope; schedule any authorized fix with
   the owning reviewer. Do not silently expand the scope to neighboring skills.
6. Once every reviewer has stopped writing, check description consistency, version bumps
   against the committed index, ownership and relevant local check results. Format only
   changed files if needed. Run `npm run registry:build`, then `npm run verify`, sequentially.
   The coordinator owns the generated index. Preserve unrelated index edits: inspect them
   first, and if regeneration would discard independent work, report the conflict instead
   of overwriting it. Resolve failures introduced by the review within the authorized scope,
   then regenerate and verify again after fixes. Report unrelated failures separately.
7. Deliver one consolidated result listing each skill's corrections, files, version changes,
   executed checks and unresolved issues. Distinguish documented behavioral cases from
   executed evaluations and measured comparisons. Never mark the batch validated if a
   required check failed or was not run.

Reviewers do not run repository-wide builds, formatters, index generation or verification:
these write shared artifacts or observe partially edited packages. The coordinator fulfills
those requirements from section 5 of the original prompt once the working tree is stable.
Reviewers may run isolated skill-local checks and must include pending global checks in
their handoff. File ownership is an instruction, not filesystem isolation.

## Reproducible workflow checks

These are manual acceptance cases, not evidence of measured skill improvement. Execute
them in a disposable checkout; do not use real agent configuration or install skills globally.

| Request and context                                                                   | Expected behavior and required result                                                                                                               | Failure conditions                                                                                                            |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Review three distinct existing skills in parallel.                                    | Three unique owners; findings precede edits; coordinator generates the index and verifies after writers finish.                                     | Duplicate ownership, worker writes outside its skill, concurrent index/build writes, or unexecuted checks reported as passed. |
| Review twenty-two skills, with a user edit and an untracked reference in one.         | At most twenty reviewers run at once, or the lower runtime limit; all twenty-two receive results; existing content is preserved and identified.     | Lost user work, excess concurrency, or a queued skill silently omitted.                                                       |
| Review one skill whose uncertain technical claim cannot be verified online.           | Reviewer records the unavailable source and limitation; avoids inventing facts or measured evaluation results.                                      | Unsupported claim presented as verified or written cases reported as executed.                                                |
| Review a skill and `skill-engineering`; the first reviewer fails after partial edits. | Reference skill waits; stopped writer is confirmed before reassignment; partial changes are inspected; final status reports any unresolved failure. | Live writers share ownership, reference changes during use, or failed checks hidden.                                          |

Live review execution and these manual cases remain pending until a review batch is run.
