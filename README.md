# senior-skills

Feature engineering and Senior HCM documentation skills, with a CLI for Claude Code and Codex.

The catalog contains 33 skills: 17 feature skills, 15 supporting skills and the independent
`senior-hcm-specialist`. Dependencies and suggestions stay within this set; installing a feature
does not pull in the documentation specialist or a separate Java, performance or operations
catalog.

Start with `collaborative-feature-definition` to define a feature, or `feature-engineering` to
prepare, execute and review an agreed feature. The remaining feature skills cover discovery,
context, requirements, scope, architecture, solutions, experiments, decisions, contracts,
decomposition, risks, planning, execution, progress and readiness.

For business analysts working with Senior HCM integrations, see the
[HCM business analysis guide](docs/hcm-business-analysis.md). It maps customer discovery, product
context, solution choices, contracts and readiness to the existing catalog, with English working
models. New and substantially updated skills follow the [eight quality pillars](docs/skill-quality-pillars.md).

For functional and technical HCM questions, use
[senior-hcm-specialist](skills/senior-hcm-specialist/SKILL.md). It researches the official
documentation across HCM modules, reads the relevant sources and cites the evidence for its answers.

## Run from source

Requires Node.js 22.18 or newer.

```bash
npm ci
npm run build
npm run senior-skills -- --help

# Use the catalog in this checkout.
npm run senior-skills -- registry add local . --kind local --first
npm run senior-skills -- install feature-engineering --registry local --agent all --project --dry-run
npm run senior-skills -- install feature-engineering --registry local --agent all --project
```

The CLI package is `@senior-skills/cli` and its executable is `senior-skills`.
Commands include `install`, `uninstall`, `update`, `list`, `search`, `info`, `validate`, `create`,
`publish`, `doctor`, `agents` and `registry`. Use `senior-skills <command> --help` for options.

Configuration and caches live in `~/.senior-skills`; `SENIOR_SKILLS_HOME` overrides that location.
Disable update notices with `--no-update-check` or `SENIOR_SKILLS_NO_UPDATE_NOTIFIER=1`.

## Maintain the catalog

Skills live in `skills/<name>/`, with `SKILL.md`, `skill.yaml` and supporting resources.
Keep each skill's description consistent between its entrypoint and manifest. Bump its version
whenever its contents change, then regenerate the index:

```bash
npm run registry:build
npm run verify
```

The seven packages under `packages/` provide the CLI, domain, infrastructure, registries,
installer and agent adapters. See [AGENTS.md](AGENTS.md) for development rules.

Licensed under [Apache-2.0](LICENSE).
