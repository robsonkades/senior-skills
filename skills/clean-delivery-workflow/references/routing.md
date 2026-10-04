# Routing

Use the skill that owns the current question and carry the established outcome, constraints
and evidence into that step. This map uses the focused feature catalog. It does not require
installing a separate language, runtime or operations catalog.

| Situation                                                    | Skill                           |
| ------------------------------------------------------------ | ------------------------------- |
| The requirement or acceptance criteria are unclear           | requirements-and-acceptance     |
| Comparing options with conflicting goals                     | architecture-trade-off-analysis |
| Recording or superseding a consequential decision            | architecture-decision-making    |
| Reasoning about layers and boundary crossings                | layering-and-boundaries         |
| A fault has an unknown cause                                 | debugging                       |
| Deciding whether a shortcut is acceptable                    | technical-debt-decisions        |
| Choosing the automated checks required for the change        | quality-gates                   |
| Reviewing correctness, design and regression risk            | code-review                     |
| Verifying that progress and completion claims match evidence | coding-agent-discipline         |

For language-specific implementation, inspect the target repository's code, toolchain,
tests and version-matched documentation. Use its established test strategy and operational
procedures. Choose checks that exercise the changed behavior and failure boundaries;
a generic workflow cannot supply unverified runtime or framework guarantees.

If a required technical decision lacks evidence, state the missing evidence and continue
independent authorized work. The absence of a separate specialist skill is not itself a
blocker or authorization to install more skills.

## When guidance appears to conflict

Check the scope, risk and evidence behind each instruction. Apply user decisions and
repository requirements before general guidance.

- Introduce abstraction for a current substitution or ownership boundary.
- Separate refactoring from behavior when each step is independently valid and testable.
- Choose test levels that expose the actual failure risk; use existing adequate coverage.
- Keep performance claims tied to representative measurements.
- Preserve required checks and report unrelated improvement opportunities separately.

If a material conflict remains, state the incompatible requirements and seek the missing
decision while continuing work that does not depend on it.
