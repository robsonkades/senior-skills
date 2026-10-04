# AGENTS.md

## Project

`senior-skills` maintains a focused catalog of 32 skills: 17 feature skills and their 15 direct
supporting skills. The approved set is listed in `scripts/feature-catalog.test.mjs`.
All dependencies, optional dependencies and suggestions must stay within that set. Keep the
instructions usable without handoffs to removed catalogs. Expanding the catalog requires an
explicit scope decision; transitive links are not a reason to restore removed skill groups.

## Development

- Inspect the relevant implementation and tests before editing. Keep changes scoped and preserve
  unrelated user changes.
- Use `rg` for searches and `apply_patch` for hand edits.
- Run narrow checks while developing and `npm run verify` before claiming completion. Read the
  output and report skipped or unavailable checks. Never weaken tests to make them pass.
- Do not commit, publish, install globally or modify real agent configuration unless requested.
- Use Conventional Commits when a commit is requested.

```bash
npm run build              # compile all seven packages
npm run test:only          # tests; build first after cross-package changes
npm run lint
npm run format:check
npm run check:boundaries
npm run registry:build     # regenerate registry/skills.yaml
npm run verify             # all required checks
npm run senior-skills -- --help
```

Tests use `node:test` and Node's native TypeScript stripping. Relative imports use `.ts`.
`erasableSyntaxOnly` forbids enums, parameter properties and namespaces.

## Architecture

- `core` owns the domain, application services and ports; no Node built-ins or I/O.
- `node` implements I/O. `registry` and `installer` depend only on `core`.
- Agent-specific logic belongs in `adapter-claude` and `adapter-codex`; these may also use
  `node:path` for pure path operations.
- `cli` wires concrete classes in `packages/cli/src/container.ts`.
- Only `AtomicInstaller` writes into agent skill directories. Adapters return layout plans.
- Path safety has one implementation: `packages/core/src/domain/path-safety.ts`.
- Register new packages in `scripts/check-boundaries.mjs`.
- Reuse test doubles from `@senior-skills/core/testing`.

Throw `AgentSkillsError` with stable `ASK_*` codes, useful details and command hints. Preserve
exit codes: usage 2, validation 3, resolution 4, security 5 and no-agent 6. Validation collects
all discoverable issues. Security changes need hostile fixtures. Schema additions remain
optional unless a breaking change requires a new schema version.

## Isolated tests

Reuse the `cli()` helper in `packages/cli/test/cli.test.ts`. For manual runs, set
`SENIOR_SKILLS_HOME`, `CLAUDE_CONFIG_DIR`, `CODEX_HOME`, `HOME` and `USERPROFILE` in an isolated
child process to temporary directories, and clear `PATH` for agent detection. Never overwrite
PowerShell's `$HOME` variable or write to the user's actual agent directories.

Claude Code uses `$CLAUDE_CONFIG_DIR/skills` globally and `.claude/skills` in projects. Codex uses
`$CODEX_HOME/skills` globally and `.agents/skills` in projects. Agent root overrides name the
skills root itself. Commands and workflows are supported only by the Claude adapter.

## Skill changes

Write skill instructions, supporting references, working templates and maintained catalog
documentation in English. When using a skill, follow the user's requested deliverable language.

New and substantially updated skills must satisfy the eight quality pillars defined in
[docs/skill-quality-pillars.md](docs/skill-quality-pillars.md). Review observable decisions and
results against those pillars; eight headings alone do not establish compliance.

Bump a skill's version whenever any packaged content changes. Keep the manifest and `SKILL.md`
descriptions equal, preserve dependency ranges that resolve, and run `npm run registry:build`.
Never edit generated `registry/skills.yaml` by hand. `npm run check:versions` compares with the
committed index; without Git history, compare against a preserved baseline explicitly.
