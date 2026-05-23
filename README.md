# Skills Charter

Agent Skill Governance for the handoff between distribution and runtime.

> Status: `0.1.0 preview`. This release is for workflow validation and early feedback. The manager is static and usable for browsing, editing, registry preview, and Git handoff, but authenticated GitHub PR creation and full file-level CRUD are not stable yet.

Every agent skill needs a charter before runtime. Skills Charter helps individuals and teams turn public, generated, or evolved skills into governed, reviewable, and installable team assets.

Agent Skills are becoming the procedural memory of AI agents. A skill can include `SKILL.md`, references, scripts, examples, assets, and evaluation notes. Once installed, it can shape how an agent reviews code, runs tools, or follows team workflows.

The gap: skill production and distribution are messy. Teams copy public skills, keep local `SKILL.md` files, or scatter instructions across chat history and personal agent configs. There are few trusted team sources, and most teams cannot easily answer: who owns this skill, where did it come from, what changed, was it reviewed, can we roll it back, and who should install it?

The solution: Skills Charter turns a GitHub repository into the governance layer for team skills. A skill enters as a candidate and receives a Skill Charter: source, owner, review evidence, policy checks, approval state, install target, and runtime constraints. Only approved charters produce installable runtime packages.

The short version:

```text
creation -> evaluation -> distribution -> governance -> runtime
candidate skill -> Skill Charter + evidence -> team approval -> approved install
GitHub repo + Pages Manager = source of truth and review surface
npx skills = installation and local agent directory placement
```

Skills Charter is not trying to be another marketplace or registry. It answers the earlier question:

> How does a skill become trusted enough for a team to publish and install?

## Quickstart

Use this repository as the starting point for a team skill library:

```bash
git clone https://github.com/Guesswhat-Studio/Skills-as-Docs.git team-skills
cd team-skills
npm install
npm run check
node packages/cli/dist/index.js init --root . --source org/team-skills
node packages/cli/dist/index.js new literature-review --root . --description "Use this skill when the user needs a structured literature review workflow." --category research --owner @team --review-status approved
node packages/cli/dist/index.js lint --root . --policy strict
node packages/cli/dist/index.js generate registry --root . --source org/team-skills --out skills.json
npx skills add . --list
```

Then test locally:

```bash
npx skills add . --skill literature-review -g -a codex
```

New packages normally start as `candidate`. The quickstart marks the demo package approved so the install command is available immediately; in a real team library, promote packages only after review evidence is added.

`npm run smoke:npx-list` runs a non-mutating compatibility check against the upstream `npx skills add <path> --list` flow.

See [docs/quickstart.md](./docs/quickstart.md) for the daily Git + PR workflow, and [docs/commit-conventions.md](./docs/commit-conventions.md) for commit rules that keep skill governance history searchable.
See [docs/product-design.md](./docs/product-design.md) for the product model behind the dashboard-first manager redesign.
See [Run a Team Agent Skill Library from GitHub](./docs/guides/run-team-agent-skill-library-from-github.md) for the copyable operating model.
See [ROADMAP.md](./ROADMAP.md) for the promotion-first roadmap.
See [the Chinese field-test pitch](./docs/pitch/field-test-pitch.zh.md) and [English field-test pitch](./docs/pitch/field-test-pitch.md) for a conversational version of the thesis.

## Flagship Demo

The strongest demo is **Public Skill Intake Review**:

> A research operations team wants to adopt Anthropic's public `skill-creator`, but shared installs are blocked until the package has provenance, evidence, review, CI, and a Git history.

This proves the core claim more clearly than a generic editor walkthrough. Skills Charter is the governance layer between public skill discovery and team-wide agent installation.

Demo artifacts:

- The embedded **Tutorial** panel in the Pages manager
- [Demo runbook](./docs/demo-scenario.md)
- [Practical GitHub guide](./docs/guides/run-team-agent-skill-library-from-github.md)
- [Case study](./case-studies/public-skill-to-approved.md)
- [Example review evidence](./examples/public-import-governance-demo/review-notes/skill-creator-intake.md)

The demo uses `anthropics/skills` as a live source. A local Skills Charter scan on 2026-05-20 found 17 packages in that repository, including multi-file packages such as `skill-creator`, `docx`, `pptx`, `xlsx`, and `canvas-design`. The important point is not that the upstream repo is bad; it is that real skill packages contain enough routing, scripts, assets, links, and supporting material to deserve a Git-backed review path before internal approval.

## What This Project Is

Skills Charter is being designed as a lightweight open-source toolkit with three layers:

- **Skill Charter format and policy checks**: lifecycle status, provenance, evidence, approval state, schema, linting, package health, and security review signals.
- **GitHub Pages Skill Manager**: a static web app for browsing, editing, reviewing, and opening PRs for candidate skill packages.
- **Optional docs adapters**: templates for GitBook, VitePress, MkDocs, Obsidian, Feishu, Yuque, and similar tools when teams already author there.

It is not trying to replace `npx skills`, become a public marketplace, or define a new universal skill standard.

## Research Signals

Recent agent-skill research frames skills as reusable procedural artifacts with lifecycles, not one-off prompts. That validates the core Skills Charter premise: teams need a human governance layer before skills are installed and executed by agents.

The market is also starting to validate the category. NVIDIA Verified Agent Skills and JFrog's Agent Skills Registry point toward enterprise trust catalogs: verified, scanned, signed, access-controlled skill distribution. SkillsVote and related research point toward evidence-gated lifecycle governance. Runtime governance work, including GitHub's `agent-governance` skill and allowlist-based permission systems, focuses on what agents may do after skills load.

Skills Charter is upstream of those layers. It is the Git-native approval path where public, generated, or evolved skill packages become team-owned assets with provenance, evidence, policy checks, review history, and approved install output.

The useful phrase is the "procedural gap": tools expose what an agent can call, but not when to call it, how to coordinate steps, how to handle failure, or how to validate outputs. Skill packages close that gap only if teams can maintain them with owners, review, provenance, CI, and rollback.

The useful lifecycle model is:

| Lifecycle layer | Core question | Examples and signals | Skills Charter position |
| --- | --- | --- | --- |
| Creation | Where do skills come from? | Hand-authored SOPs, `skill-creator`, generated or evolved skills | Candidate sources |
| Evaluation | Does the skill work and keep working? | Evals, benchmarks, trigger tests, regression reports, SkillEvolver-style evidence | Evidence for review |
| Distribution | How are skills found, published, and installed? | Public directories, SkillNet, SkillRouter, `npx skills`, GitHub Actions/export adapters, verified catalogs, private registries | Upstream and downstream channels |
| Governance | Should this team trust it? | Provenance, ownership, policy checks, CI, approval, rollback, audit trail | Skills Charter owns this layer |
| Runtime | How is the skill loaded and enforced? | OpenAI, Claude, Copilot, Cursor, allowlists, GitHub `agent-governance`, MCP permissions | Downstream execution and enforcement |

Evaluation asks whether a skill works. Governance asks whether this team should trust it. Skills Charter sits between creation/distribution and runtime as the Git-native trust path.

## Product Direction

P0 is no longer a GitBook-first adapter. P0 is the GitHub Pages Skill Manager.

The GitHub Pages site should become the product surface:

- Home: a static prototype of the manager workspace.
- Import: start from an existing GitHub repository, a local skill folder, an existing agent skills directory, or a new package template.
- Library: repository tree view for `skills/<name>/` packages and their files.
- Editor: click any package file, edit it, preview Markdown, inspect generated diffs, and use focused Zen mode.
- Inspector: `SKILL.md` frontmatter fields, lifecycle, provenance, evidence, core-aligned browser lint, package scope, install target, and approval-gated install commands.
- Registry: browser-side `skills.json` preview with package lifecycle, provenance, evidence, risk, file list, and `npx skills` snippets for approved packages.
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
    evals/                # approval evidence
    reports/              # review or evaluation reports
    review-notes/         # human approval notes
    trigger-samples/      # examples of when to load the skill
    scripts/              # executable helpers, highest review risk
    assets/               # PDFs, images, schemas, fixtures
skills.json               # generated registry
```

Runtime package files stay inside `skills/<name>/`. Governance files such as tests, reports, docs-site output, and CI fixtures stay outside the package.

## User Flow

For a team maintaining a shared library:

1. Create or fork a Skills Charter repository.
2. Add packages under `skills/<name>/`.
3. Enable GitHub Pages and the Skills Charter workflow.
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
git clone https://github.com/org/team-skills.git ~/skills-charter/team-skills
cd ~/skills-charter/team-skills
npx skills add . --skill literature-review -g -a claude-code -a codex
```

Do not clone a full multi-skill Skills Charter repository into another repository's `.claude/skills`, `.agents/skills`, or equivalent agent directory. Use `npx skills` to install or materialize packages.

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
skills-charter/
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
    cli/                   # skills-charter CLI
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
- `skills-charter lint`
- `skills-charter lint --policy strict`
- `skills-charter generate registry`
- `skills-charter generate registry --approved-only`
- `skills-charter generate install-snippets`
- `skills-charter doctor`
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
node packages/cli/dist/index.js lint --root /path/to/skill-repo --policy strict
node packages/cli/dist/index.js generate registry --root /path/to/skill-repo --source owner/repo
node packages/cli/dist/index.js generate registry --root /path/to/skill-repo --source owner/repo --approved-only
node packages/cli/dist/index.js generate registry --root /path/to/skill-repo --source owner/repo --out skills.json --check
```

The CLI should work against a normal Git checkout. That is the core claim of this project: Git is the management layer.

## Current Status

This repository is in early public-surface and core implementation development. The static Pages prototype can load public GitHub skill repos, import local folders, edit files, run core-aligned browser lint, preview `skills.json`, and generate Git handoff plus approval-gated `npx skills` commands. `packages/core` plus `packages/cli` provide the first scanner, frontmatter parser, lifecycle and provenance model, risk lint rules, strict policy mode, approved-only registry generation, install snippets, onboarding smoke, `npx skills --list` compatibility smoke, and doctor command. The registry schema, Skills Charter CI workflow, launch blog draft, team template, minimal example, first case-study artifact, PR template, and GitHub practical guide are in place. The React manager rewrite, authenticated GitHub write flow, and richer file-level policy checks are still upcoming.

The detailed product and technical plan lives in [PLAN.md](./PLAN.md).
The current manager UI semantics are documented in [docs/manager-semantics.md](./docs/manager-semantics.md).
The MVP development contract lives in [docs/development.md](./docs/development.md).
The day-one user workflow lives in [docs/quickstart.md](./docs/quickstart.md). Commit naming and governance trailers live in [docs/commit-conventions.md](./docs/commit-conventions.md). The current manager button/action audit lives in [docs/ui-action-audit.md](./docs/ui-action-audit.md).
The GitHub team-library guide lives in [docs/guides/run-team-agent-skill-library-from-github.md](./docs/guides/run-team-agent-skill-library-from-github.md).

## Core Thesis

Skills are not hidden prompts. They are operational capabilities that need a charter before runtime.

Skills Charter exists to make every skill's provenance, evidence, approval, install path, and rollback story visible before teams execute it.
