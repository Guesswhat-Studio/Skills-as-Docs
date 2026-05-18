# Agent SkillDocs

Git-backed review and management for Agent Skill packages.

> Status: `0.1.0 preview`. This release is for workflow validation and early feedback. The manager is static and usable for browsing, editing, registry preview, and Git handoff, but authenticated GitHub PR creation and full file-level CRUD are not stable yet.

Agent SkillDocs turns a GitHub repository into a governed workspace for team skills. People edit, review, validate, and version skill packages in Git. Agent clients install approved packages with the existing `npx skills` ecosystem.

The short version:

```text
GitHub repo + Pages Manager = source of truth and review surface
npx skills = installation and local agent directory placement
```

## Quickstart

Use this repository as the starting point for a team skill library:

```bash
git clone https://github.com/Guesswhat-Studio/Skills-as-Docs.git team-skills
cd team-skills
npm install
npm run check
node packages/cli/dist/index.js init --root . --source org/team-skills
node packages/cli/dist/index.js new literature-review --root . --description "Use this skill when the user needs a structured literature review workflow." --category research --owner @team
node packages/cli/dist/index.js lint --root .
node packages/cli/dist/index.js generate registry --root . --source org/team-skills --out skills.json
npx skills add . --list
```

Then test locally:

```bash
npx skills add . --skill literature-review -g -a codex
```

`npm run smoke:npx-list` runs a non-mutating compatibility check against the upstream `npx skills add <path> --list` flow.

See [docs/quickstart.md](./docs/quickstart.md) for the daily Git + PR workflow.

## What This Project Is

Agent SkillDocs is being designed as a lightweight open-source toolkit with three layers:

- **GitHub Pages Skill Manager**: a static web app for browsing, editing, reviewing, and opening PRs for skill packages.
- **Core package model and checks**: schema, linting, registry generation, provenance, package health, and security review signals.
- **Optional docs adapters**: templates for GitBook, VitePress, MkDocs, Obsidian, Feishu, Yuque, and similar tools when teams already author there.

It is not trying to replace `npx skills`, become a public marketplace, or define a new universal skill standard.

## Product Direction

P0 is no longer a GitBook-first adapter. P0 is the GitHub Pages Skill Manager.

The GitHub Pages site should become the product surface:

- Home: a static prototype of the manager workspace.
- Import: start from an existing GitHub repository, a local skill folder, an existing agent skills directory, or a new package template.
- Library: repository tree view for `skills/<name>/` packages and their files.
- Editor: click any package file, edit it, preview Markdown, inspect generated diffs, and use focused Zen mode.
- Inspector: `SKILL.md` frontmatter fields, core-aligned browser lint, package scope, install target, and install commands.
- Registry: browser-side `skills.json` preview with package risk, file list, and `npx skills` snippets.
- Review: Git handoff commands now, GitHub branch/PR/CI status later.

The manifesto can live in docs later. The front page should show the system people will use.

## Skill Package Model

A skill is a package directory with `SKILL.md` as the required entrypoint.

```text
skills/
  literature-review/
    SKILL.md              # required entrypoint
    references/           # supporting docs loaded on demand
    templates/            # reusable output or prompt templates
    examples/             # sample inputs and outputs
    scripts/              # executable helpers, highest review risk
    assets/               # PDFs, images, schemas, fixtures
skills.json               # generated registry
```

Runtime package files stay inside `skills/<name>/`. Governance files such as tests, reports, docs-site output, and CI fixtures stay outside the package.

## User Flow

For a team maintaining a shared library:

1. Create or fork a SkillDocs repository.
2. Add packages under `skills/<name>/`.
3. Enable GitHub Pages and the SkillDocs workflow.
4. Use the Pages Manager to edit, lint, preview, and open pull requests.
5. Merge approved PRs.
6. CI regenerates `skills.json` and redeploys Pages.

For a developer installing approved skills:

```bash
npx skills add org/team-skills --list
npx skills add org/team-skills --skill literature-review -g -a claude-code
npx skills add org/team-skills --skill literature-review -g -a codex
npx skills add org/team-skills --skill literature-review -g -a antigravity
```

For a maintainer testing local edits:

```bash
git clone https://github.com/org/team-skills.git ~/skilldocs/team-skills
cd ~/skilldocs/team-skills
npx skills add . --skill literature-review -g -a claude-code -a codex
```

Do not clone a full multi-skill SkillDocs repository into another repository's `.claude/skills`, `.agents/skills`, or equivalent agent directory. Use `npx skills` to install or materialize packages.

## Technical Stack

The manager should stay static and lightweight.

```text
Static app:       Vite + React + TypeScript
Editor:           CodeMirror 6
Markdown preview: markdown-it or marked + DOMPurify
Frontmatter:      gray-matter + js-yaml
Validation:       zod or ajv
GitHub API:       @octokit/rest
Diff preview:     react-diff-view or diff2html
Styling:          plain CSS or a very small component layer
CI/runtime:       GitHub Actions + Node.js
Install layer:    npx skills
```

No full-stack app is needed for P0. GitHub and GitHub Actions are the durable backend. A small token broker can be added later only if GitHub App authentication becomes necessary.

## Planned Repository Shape

```text
agent-skilldocs/
  README.md
  PLAN.md
  docs/
    index.html             # product site
    manager/               # built static Skill Manager, future
    assets/
  schemas/
    skills-registry.v0.json
    skill-package.v0.json
  packages/
    core/                  # scanner, parser, linter, registry generator
    manager/               # Vite + React source
    cli/                   # skilldocs CLI
  adapters/
    gitbook/
    vitepress/
    mkdocs/
    obsidian/
    feishu/
    yuque/
  examples/
  templates/
  case-studies/
```

## MVP Scope

The first useful release should include:

- package-aware `skills.json`
- `skilldocs lint`
- `skilldocs generate registry`
- `skilldocs generate install-snippets`
- `skilldocs doctor`
- GitHub Pages manager read-only mode
- text editing and PR flow
- CI checks for metadata, links, registry drift, scripts, assets, and secrets

Adapters are useful, but they are not the center of the project.

## Development

The first implementation slice is the Git-native core: scan a checked-out skill repository, parse `SKILL.md`, lint package health, generate registry data, and produce `npx skills` install snippets.

```bash
npm install
npm run check
npm run build
node packages/cli/dist/index.js scan --root /path/to/skill-repo
node packages/cli/dist/index.js lint --root /path/to/skill-repo
node packages/cli/dist/index.js generate registry --root /path/to/skill-repo --source owner/repo
node packages/cli/dist/index.js generate registry --root /path/to/skill-repo --source owner/repo --out skills.json --check
```

The CLI should work against a normal Git checkout. That is the core claim of this project: Git is the management layer.

## Current Status

This repository is in early public-surface and core implementation development. The static Pages prototype can load public GitHub skill repos, import local folders, edit files, run core-aligned browser lint, preview `skills.json`, and generate Git handoff plus `npx skills` commands. `packages/core` plus `packages/cli` provide the first scanner, frontmatter parser, lint rules, registry generator, install snippets, onboarding smoke, `npx skills --list` compatibility smoke, and doctor command. The registry schema and SkillDocs CI workflow are in place. The React manager rewrite, authenticated GitHub write flow, and richer CI policy checks are still upcoming.

The detailed product and technical plan lives in [PLAN.md](./PLAN.md).
The current manager UI semantics are documented in [docs/manager-semantics.md](./docs/manager-semantics.md).
The MVP development contract lives in [docs/development.md](./docs/development.md).
The day-one user workflow lives in [docs/quickstart.md](./docs/quickstart.md).

## Core Thesis

Skills are not hidden prompts. They are operational documents for agents.

Agent SkillDocs exists to make those documents visible, reviewable, installable, and reversible.
