# Single-skill review prompt

Review and improve only the `<SKILL>` skill in this repository.

Our goal is to build a catalog of specialist Java skills with technical depth,
reliable instructions, and demonstrable quality.

Improve the skill's ability to guide correct decisions and produce verifiable
results. Length, file count, topic coverage, and terminology density are not
quality indicators.

Use `skill-engineering` as your review reference. Read the applicable
`AGENTS.md` instructions and follow repository conventions.

Read the actual repository before making assumptions about its structure,
metadata, validation commands, or skill format.

## Scope and Autonomy

- Analyze the selected skill's `SKILL.md`, `skill.yaml`, and all supporting
  resources that exist.
- Consult neighboring skills only when necessary to verify boundaries,
  dependencies, or repository conventions. Do not modify them.
- Implement improvements supported by your analysis. Do not stop at
  recommendations.
- Modify only the selected skill and generated registry artifacts necessarily
  affected by its changes.
- Inspect the working tree before editing. Preserve existing user changes and
  distinguish pre-existing modifications from your own.
- Do not commit, publish, install globally, or modify real agent configuration.
- Do not upgrade Java, frameworks, dependencies, or build tools merely to make
  an example or recommendation work.
- Keep skill content in English and follow repository terminology.
- Do not create missing files merely to satisfy assumptions in this prompt.
- If `skill-engineering` cannot be found, report the limitation and do not
  claim to have followed it. Continue with work that can be justified using
  the available instructions and evidence.

Before editing, provide a brief summary of the main findings, including their
locations, consequences, and proposed fixes.

This summary is a progress update, not an approval gate. Proceed with
implementation unless a material ambiguity or access limitation prevents
a correct, in-scope change.

Resolve routine implementation choices autonomously. Ask focused questions
only when missing information materially changes the correct outcome and
cannot be obtained from repository evidence.

## 1. Understand the Skill's Promise

Identify:

- The problem it solves.
- The concrete situations in which it should activate.
- Similar situations that fall outside its scope.
- The specialist decisions it teaches.
- The evidence, tools, and information those decisions require.
- The verifiable result the agent should deliver.
- Any necessary handoff to another skill.

Compare this promise with the actual content.

Determine whether the skill helps an agent make consequential decisions or
merely describes a topic.

Do not expand the scope to cover the entire domain. Preserve specialist
content that already works.

## 2. Establish the Java Compatibility Contract

Identify the skill's intended Java baseline and any relevant framework,
library, JVM implementation, or build-tool constraints.

Use the baseline declared by the repository or selected skill. If neither
declares one, identify the ambiguity rather than silently choosing a version.

Distinguish:

- The baseline used to author and validate the skill.
- The target environment of a project where the skill will be applied.

Require the agent applying the skill to inspect available project evidence
before making version-sensitive recommendations.

Relevant evidence may include:

- Maven or Gradle configuration.
- Compiler release settings and toolchains.
- Dependency management and resolved dependency versions.
- CI configuration and runtime images.
- JVM flags and deployment constraints.
- Existing architectural and compatibility requirements.

Do not assume that adopting the skill authorizes upgrading Java, changing
frameworks, enabling preview features, or adding dependencies.

For version-sensitive guidance:

- State the relevant compatibility conditions.
- Distinguish standard, preview, incubating, deprecated, and
  implementation-specific features when relevant.
- Document required compiler and runtime flags for executable examples.
- Distinguish language and API guarantees from JVM implementation details
  and framework-specific behavior.
- Avoid referring to "modern Java" or "the latest version" when correctness
  depends on a specific release.

Do not turn the skill into a version-history catalog. Include only
compatibility information that affects its decisions or examples.

## 3. Review Technical and Structural Quality

Look for:

- Contradictions between the description, workflow, rules, examples,
  references, and manifest.
- Absolute statements that need conditions or exceptions.
- Ambiguous rules that allow implementations with materially different
  behavior.
- Recommendations without sufficient evidence or a validation method.
- Incorrect or outdated examples.
- Examples presented as usable without stating their prerequisites.
- Generic content that does not change the agent's behavior.
- Repetition and unnecessary context consumption.
- References without clear reading conditions.
- Conditional details loaded on every activation.
- Overlapping responsibilities and unjustified dependencies.
- Failure paths that are omitted despite affecting correctness.
- Unstated assumptions about versions, ownership, workload, or environment.

Verify uncertain or version-dependent technical claims against primary
sources.

Use sources appropriate to the claim, such as:

- Java Language Specification and Java Virtual Machine Specification.
- Official Java API documentation.
- OpenJDK JEPs and implementation documentation.
- Official framework, library, database, and build-tool documentation.
- Relevant source code when implementation behavior matters.

Check that the source applies to the version and environment being discussed.
Do not treat a feature proposal as proof of behavior in every Java release.

Distinguish verified facts, inferences, and hypotheses.

If a source cannot be consulted, record the limitation. Do not invent
citations, claim validation that did not occur, or preserve unsupported
certainty.

Use references to support consequential claims, not to decorate generic
advice.

## 4. Review Specialist Decision Quality

For each consequential recommendation, assess whether the skill provides
enough guidance to determine:

- When the recommendation applies.
- Which evidence is needed before choosing it.
- Which viable alternatives matter in this context.
- What trade-offs and failure modes affect the choice.
- When the recommendation should be rejected or reconsidered.
- How to verify the intended result.

Use these questions as review criteria, not as a mandatory repeated template.

Prefer a small number of well-supported decision paths over broad topic
coverage.

Do not add alternatives that do not materially affect the task.

Replace slogans with actionable guidance where needed. Principles such as
"prefer composition", "avoid premature optimization", or "use immutability"
should explain the conditions that affect the decision when those conditions
are central to the skill.

Make behavior under missing evidence explicit:

- What the agent can safely conclude.
- What it must inspect or measure.
- When it should ask a focused question.
- Which recommendations must remain conditional.

For diagnostic tasks, distinguish observations from hypotheses and explain
what evidence would confirm or refute a proposed explanation.

## 5. Apply Relevant Java Correctness Lenses

Select only the lenses that materially affect the skill's promise.

Do not expand the skill to cover every item below. Do not add a section
merely because a topic appears in this list.

### API and Language Contracts

Where relevant, inspect guidance concerning:

- Nullability and absence.
- Equality, hashing, and ordering.
- Generics and type safety.
- Exception contracts and propagation.
- Mutability and defensive copying.
- Visibility and encapsulation.
- Public API evolution.

### Concurrency

Where relevant, inspect guidance concerning:

- Safe publication and happens-before relationships.
- Atomicity and compound operations.
- Shared mutable state and ownership.
- Interruption and cooperative cancellation.
- Task lifetime and failure propagation.
- Executor ownership and shutdown.
- Blocking, contention, and bounded concurrency.

Do not accept "thread-safe" as a sufficient explanation without identifying
the relevant guarantees and usage constraints.

### Resource Lifecycle

Where relevant, inspect guidance concerning:

- Acquisition and ownership.
- Closing and cleanup on failure.
- Resource lifetime across asynchronous boundaries.
- Bounded use of threads, connections, buffers, queues, and other resources.
- Backpressure and overload behavior.

### Persistence and Transactions

Where relevant, inspect guidance concerning:

- Transaction boundaries and isolation.
- Consistency requirements.
- Retries and idempotency.
- Locking and concurrent updates.
- ORM behavior and query execution.
- Database-specific guarantees.

### Runtime and Performance

Where relevant, inspect guidance concerning:

- Workload assumptions.
- Allocation and retention.
- Warm-up and JIT behavior.
- Garbage collection.
- Contention and queueing.
- Measurement limitations.

### Compatibility

Where relevant, distinguish:

- Source compatibility.
- Binary compatibility.
- Behavioral compatibility.
- Serialization or protocol compatibility.

### Security

Where relevant, inspect:

- Trust boundaries.
- External input handling.
- Unsafe parsing or deserialization.
- Resource exhaustion.
- Exposure of sensitive information.

Across all applicable lenses, distinguish contractual guarantees from
implementation details and observations from a particular environment.

Do not sacrifice correctness for an unverified performance benefit.

## 6. Make Proportionate Improvements

Prioritize:

1. Technical correctness and internal consistency.
2. Minimum evidence requirements and behavior when information is missing.
3. Verifiable decisions and outputs.
4. Clear activation criteria and scope boundaries.
5. Organization and efficient use of context.

The description should help select the skill based on concrete situations.

The body should contain essential guidance and route conditional details to
supporting references with clear reading conditions.

Keep critical constraints visible before the decisions or actions they govern.

Define a minimum deliverable appropriate to the task. For reviews, this might
include evidence, consequence, proposed adjustment, and validation.

Avoid imposing lengthy reports on simple tasks.

Do not create sections, scripts, directories, examples, or reference files
merely to fill a template.

Preserve useful technical depth. Do not simplify away prerequisites,
exceptions, or failure modes that materially affect correctness.

Remove or consolidate content only when doing so preserves the skill's
decision-making value.

## 7. Validate Java Examples Proportionately

Classify examples as executable code, partial snippets, or pseudocode.

Make prerequisites explicit where necessary to interpret or run them.

Compile executable examples that are added or materially changed when the
required toolchain is available. Use the declared Java baseline and relevant
dependencies.

For behavior-sensitive examples, use targeted checks that can expose the
specific defect or contract at issue.

Compilation alone does not validate:

- Concurrency guarantees.
- Transactional behavior.
- Security properties.
- Performance claims.
- Resource cleanup under failure.

Choose validation appropriate to the claim. A passing test demonstrates only
the behavior and conditions it actually exercises.

Use existing infrastructure or isolated temporary validation where practical.
Do not introduce a build system solely to validate an illustrative snippet.

Do not add tests that merely mirror the implementation or assert incidental
formatting.

If validation cannot run, report exactly what remains unverified.

Do not describe an example as tested merely because it was reviewed.

## 8. Review Performance Claims

Apply this section only when the skill makes performance claims or guides
performance-related decisions.

Treat recommendations as conditional on workload and execution environment.

For comparative claims, require enough context to understand:

- The measured operation and metric.
- The baseline being compared.
- The workload and input characteristics.
- Relevant versions and runtime configuration.
- The measurement method.
- Important limitations and sources of uncertainty.

For microbenchmarks, inspect relevant risks such as warm-up, dead-code
elimination, constant folding, state sharing, and insufficient isolation.

Do not infer application-level improvement from a microbenchmark alone.

Do not generalize a result across JDK versions, hardware, collectors,
database engines, or deployment environments without supporting evidence.

Do not claim that an approach is universally faster, more scalable, or more
memory-efficient based solely on intuition or API choice.

If a claim cannot be supported, remove the unsupported certainty or replace
it with a testable hypothesis and an appropriate validation method.

Do not run benchmarks merely to make the review appear thorough. Run them
only when needed to resolve a material claim within scope.

## 9. Evaluate the Skill's Behavior

Create or refine a small set of evaluation cases proportionate to the risk,
following existing repository conventions.

If no evaluation infrastructure exists, document reproducible cases without
building a new framework.

Each case must include:

- The request and context provided to the agent.
- Expected behavior.
- Required characteristics of the response or change.
- Explicit failure conditions.

Define expected behaviors and failure conditions before behavioral runs.

Choose cases that expose consequential decisions, such as:

- A representative task.
- A scope boundary or handoff.
- Missing evidence.
- Ambiguous input.
- Pressure to accept an inappropriate solution.

For Java-focused skills, select relevant cases involving:

- A target Java version that cannot support the proposed API.
- Missing evidence that prevents a reliable diagnosis.
- An attractive optimization that violates a correctness requirement.
- A local improvement that breaks a public contract or resource lifecycle.
- A request that belongs to a neighboring skill.

Use only cases relevant to the selected skill. Do not add a case for every
category merely for completeness.

Distinguish:

- Structural validation of the skill.
- Tests of example or generated code.
- Behavioral evaluation of an agent using the skill.

Passing one does not establish the others.

When a valid comparison can be executed, run the same cases with and without
the skill while keeping the model, tools, task context, and execution
conditions comparable.

When feasible, also compare the original and revised skill to assess the
effect of the edits directly.

Evaluate observable decisions, evidence use, and correctness rather than
exact wording.

When feasible, include a held-out case not used to guide the edits.

Do not present written cases, mental simulations, or self-assessments as
evidence of measured improvement.

Clearly state what was executed and what remains pending.

## 10. Validate Repository Integration

- Use `apply_patch` for manual edits.
- Keep descriptions and other duplicated metadata in `SKILL.md` and the
  manifest consistent according to repository conventions.
- Update the version according to repository rules.
- Verify that internal links and referenced resources resolve.
- Regenerate the index with `npm run registry:build` when that is the
  repository's declared command. Do not edit generated indexes manually.
- Run useful targeted checks and `npm run verify`, or the documented
  equivalents if the repository uses different commands.
- Inspect command output and the resulting diff.

After registry generation, inspect for unrelated changes.

Do not include unrelated generated churn or overwrite user changes.

If a repository-wide check fails, determine whether the failure is caused by
this change, is pre-existing, or cannot be attributed with available evidence.

Do not modify neighboring skills to make a global check pass.

Do not weaken tests, suppress relevant failures, or change validation rules
to obtain a successful result.

If a command, dependency, toolchain, or external source is unavailable, report
the specific limitation and complete the remaining useful checks.

Stop additional testing when the identified risks are sufficiently covered
and required repository checks have been addressed.

## 11. Deliver the Result

In the final response, report:

- The main problems corrected and why they mattered.
- The files changed.
- The validation performed and its results.
- Remaining limitations, including behavioral evaluations not executed.

Keep the report proportionate to the work.

Clearly distinguish:

- Implemented improvements.
- Verified outcomes.
- Expected benefits that have not been measured.
- Pending checks or unresolved limitations.

Do not assign arbitrary scores, claim a percentage of correctness, or claim
superiority over other catalogs without empirical comparison.

The task is complete when the supported, in-scope improvements have been
implemented, the resulting changes have been inspected, and validation
results and limitations have been reported honestly.
