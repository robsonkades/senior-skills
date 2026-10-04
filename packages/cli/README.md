# senior-skills

Install and manage feature engineering skills and their dependencies for Claude Code and Codex.

Package: `@senior-skills/cli`. Executable: `senior-skills`. Requires Node.js 22.18 or newer.

```bash
senior-skills --help
senior-skills install feature-engineering --agent all --project --dry-run
senior-skills install feature-engineering --agent all --project
senior-skills info collaborative-feature-definition
senior-skills list
```

Dependencies install automatically. `--with-suggests` adds direct suggestions of the requested
skills. Use `--global` for user-wide installation or `--project` for the current project.

Configuration lives in `~/.senior-skills`, or the directory set by `SENIOR_SKILLS_HOME`.
Use `--no-update-check` or `SENIOR_SKILLS_NO_UPDATE_NOTIFIER=1` to disable update notices.

Source and development instructions: [senior-skills](https://github.com/robsonkades/senior-skills).
