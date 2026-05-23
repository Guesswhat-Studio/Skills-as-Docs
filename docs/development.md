# MVP Development Guide

Status: draft baseline for the GitHub Pages Skill Manager MVP.

This document turns the current prototype decisions into an implementation contract. It should answer: what are we building first, what data does it manipulate, what is browser-only, what needs GitHub authentication, and how do we know the MVP works?

## 1. Product Cutline

The MVP is a static GitHub Pages manager for reviewing and editing Agent Skill packages in a Git repository.

It should let a user:

1. Load an existing public GitHub skill repository or local folder.
2. Browse skill packages as `skills/<name>/` trees.
3. Edit any text file in the selected package.
4. Edit required `SKILL.md` metadata through a form.
5. Preview Markdown and code-like files.
6. Run browser-side checks.
7. Generate install commands through `npx skills` for approved packages.
8. Prepare, but not silently create, a draft PR payload.

The MVP should not:

- replace `npx skills`;
- become a hosted SaaS;
- create real GitHub PRs without explicit authentication;
- clone nested Git repos into agent skill directories;
- promote license, marketplace, payment, or public discovery as core flows.

## 2. Architecture

### Current Prototype

The current prototype is a static, dependency-light Pages surface:

```text
docs/
  index.html
  assets/
    site.css
    site.js
  manager-semantics.md
  development.md
```

This is useful for product validation, but it should not remain the long-term implementation shape.

### Target MVP Shape

The production MVP should move implementation into typed packages:

```text
packages/
  core/
    src/
      frontmatter.ts
      scan.ts
      lint.ts
      registry.ts
      install-snippets.ts
  manager/
    src/
      app/
      components/
      state/
      github/
      editor/
  cli/
    src/
      commands/
```

Recommended stack:

- Vite + React + TypeScript for the manager.
- CodeMirror 6 for editing.
- `markdown-it` or `marked` plus DOMPurify for preview.
- `gray-matter` plus `js-yaml` for frontmatter.
- `zod` or `ajv` for validation.
- Octokit for GitHub API operations.
- Plain CSS or a small component layer.

The durable backend is GitHub: repository files, branches, pull requests, Actions, and Pages.

The first CI workflow lives at `.github/workflows/skills-charter.yml`. It treats registry drift as a review signal: if `skills.json` does not match the current Git checkout, the PR fails until the generated registry is updated.

## 3. Data Model

Use these conceptual types in the core package and manager state.

```ts
type SkillFileKind = "entrypoint" | "supporting" | "script" | "asset" | "evidence";

interface SkillFile {
  path: string;
  kind: SkillFileKind;
  content?: string;
  rawUrl?: string;
  size?: number;
  changed: boolean;
}

interface SkillPackage {
  name: string;
  root: `skills/${string}`;
  entrypoint: `skills/${string}/SKILL.md`;
  files: SkillFile[];
}

interface SkillFrontmatter {
  name: string;
  description: string;
  category?: string;
  version?: string;
  owner?: string;
  review_status?: "candidate" | "in_review" | "approved" | "rejected" | "deprecated" | "retired";
  source_type?: "manual" | "public_import" | "generated" | "evolved" | "template";
  source_url?: string;
  source_commit?: string;
  imported_at?: string;
  imported_by?: string;
  generator?: string;
  upstream?: string;
  approved_by?: string;
  approved_at?: string;
  license?: string;
}

interface WorkspaceState {
  repoOwner: string;
  repoName: string;
  branch: string;
  packages: SkillPackage[];
  selectedPackageName: string;
  selectedPath: string;
  selectedAgent: "codex" | "claude-code" | "antigravity" | string;
  changedFiles: Record<string, string>;
}
```

## 4. Package Model

Every runtime package lives under:

```text
skills/<skill-name>/SKILL.md
```

Allowed package subdirectories:

```text
skills/<name>/
  SKILL.md
  references/
  templates/
  examples/
  scripts/
  assets/
  evals/
  reports/
  review-notes/
  trigger-samples/
```

Rules:

- `SKILL.md` is required and is the entrypoint.
- Supporting files remain part of the installable package.
- `scripts/` files are allowed but always increase review risk.
- Review evidence can live inside `skills/<name>/evals`, `reports`, `review-notes`, or `trigger-samples` so it travels with the package history.
- Repository-wide governance files belong outside `skills/<name>/`.
- The manager should preserve unknown files instead of deleting or rewriting them.

## 5. Metadata Rules

The metadata panel is a form view of `SKILL.md` frontmatter.

MVP required fields:

- `name`
- `description`

MVP optional fields:

- `category`
- `version`
- `owner`
- `review_status`
- `source_url`
- `source_type`
- `source_commit`
- `generator`
- `upstream`
- `approved_by`
- `approved_at`
- `license`

UI policy:

- Show `name` and `description` as required.
- Show `category`, `version`, `owner`, `review_status`, `source_type`, `source_url`, `generator`, and `approved_by` as optional default fields.
- Do not promote `license` in the main form unless the team is preparing public distribution.
- Edits in the form rewrite frontmatter.
- Edits in `SKILL.md` update the form.
- Optional blank fields should be removed from frontmatter, except when preserving imported unknown fields.

New package template:

```md
---
name: new-skill
description: Use this skill when the user needs a clear, repeatable workflow for a specific task.
category: workflow
version: 0.1.0
owner:
review_status: candidate
source_type: manual
---

# new-skill

Use this skill when the user needs help with...

## Workflow

1. Clarify the user's goal and constraints.
2. Gather the minimum required context.
3. Execute the workflow in small, reviewable steps.
4. Verify the output before responding.

## Notes

Add references, templates, examples, scripts, or assets as separate files when the skill grows beyond this entrypoint.

## Evidence

Add review notes, evals, reports, or trigger samples before promoting this package to approved.
```

## 6. Manager UI Contract

### Top Bar

Top bar controls:

- repo context;
- sync state;
- Import skills;
- Theme;
- GitHub;
- prepare Git handoff context for a draft PR.

### Settings

Settings owns workspace setup and local reading preferences.

Workspace setup:

- public GitHub repo input;
- default branch input.

Reading preferences:

- text size;

Reading preferences are stored in browser `localStorage` and apply to edit, preview, and diff surfaces.

### Package Tree

The left tree is the repository/package navigator.

Rules:

- It should not contain onboarding cards.
- Search and filters operate on file paths and file kind.
- Clicking `skills/<name>/` expands or collapses the whole package.
- `Expand current` expands the current package.
- File rows select files.
- Active package and active file must be visually distinct without large blocky cards.

### Editor

Editor tabs:

- Edit
- Preview
- Diff
- Zen

Rules:

- Markdown preview strips frontmatter.
- Code-like files show highlighted code preview.
- Diff preview is local/staged until authenticated GitHub write support exists.
- The package/file rail can collapse independently.
- Zen mode is full-screen and hides chrome, package rail, and inspector.

### Inspector

Inspector sections:

- Metadata
- Generated labels
- Live lint
- Install command
- Package scope

Inspector should explain derived state clearly. It should not show non-clickable statistics that look like controls.

## 7. Import And GitHub Behavior

### Public Read Path

For public GitHub repositories:

1. Parse `owner/repo` or GitHub URL.
2. Fetch repo metadata.
3. Fetch the recursive Git tree for the default branch.
4. Group files under `skills/<name>/`.
5. Keep only packages with `SKILL.md`.
6. Lazily fetch text file contents through raw URLs.
7. Represent binary files as package entries with size placeholders.

### Private Repos

Private repositories require authentication and are post-prototype.

P0 authenticated write path may use a fine-grained personal access token. A GitHub App or token broker can be added later if needed.

### Git Handoff

Before authentication exists, the manager prepares local diff context, registry previews, and PR intent.

Authenticated PR flow:

1. Create or update a branch.
2. Commit all changed package files.
3. Open a draft PR.
4. Let CI run lint, registry drift, script review, asset checks, and secret scanning.
5. Merge through GitHub, not through the browser.

## 8. Lint Contract

Browser-side lint is a fast implementation of the same v0 rule names used by `packages/core`. CI remains the final gate.

MVP browser checks:

- `SKILL.md` exists.
- `name` exists.
- `description` exists and is long enough to be useful.
- Every package file stays under `skills/<name>/`.
- Review status and source type are known lifecycle values.
- Approved packages have an owner.
- Public, generated, or evolved packages should include provenance.
- Approved public, generated, or evolved packages should include evidence.
- Scripts, suspicious commands, assets, dependency manifests, external URLs, and possible secrets raise review signals.
- Editing a supporting file shows contextual guidance, but package risk comes from the whole package scan.

Risk mapping:

- high: one or more failures.
- medium: zero failures and one or more warnings.
- low: zero failures and zero warnings.

Future CI checks:

- broken local links;
- registry drift;
- generated install snippets;
- script review policy;
- asset size and hash;
- suspicious shell commands;
- secret scanning;
- `npx skills add <repo> --list` compatibility.

## 9. Install Contract

Skills Charter delegates installation to `npx skills`.

Generated commands should follow this shape:

```bash
npx skills add owner/repo --skill skill-name -g -a codex
npx skills add owner/repo --skill skill-name -g -a claude-code
npx skills add owner/repo --skill skill-name -g -a antigravity
```

Install snippets are generated only when a package is `approved` and has no high-risk lint failures. Candidate, rejected, deprecated, or retired packages remain visible in the registry, but are not installable by default.

For local imported or cloned repos:

```bash
npx skills add . --skill skill-name -g -a codex
```

Do not tell users to clone a full multi-skill repository into `.claude/skills`, `.agents/skills`, or equivalent agent directories.

## 10. Testing And QA

Current checks:

```bash
npm run build
npm run test
npm run check
npm run smoke:npx-list
node --check docs/assets/site.js
git diff --check -- docs/index.html docs/assets/site.css docs/assets/site.js docs/manager-semantics.md docs/development.md README.md PLAN.md package.json tsconfig.base.json packages
npx playwright screenshot --viewport-size=1440,960 http://127.0.0.1:4173/ %TEMP%/skills-charter-desktop.png
npx playwright screenshot --viewport-size=390,1200 http://127.0.0.1:4173/ %TEMP%/skills-charter-mobile.png
```

Real-repo smoke target:

```bash
git clone --depth 1 https://github.com/anthropics/skills.git /tmp/anthropic-skills
node packages/cli/dist/index.js scan --root /tmp/anthropic-skills
node packages/cli/dist/index.js generate registry --root /tmp/anthropic-skills --source anthropics/skills
```

Production MVP should add:

- unit tests for scan, frontmatter, lint, and registry generation;
- Playwright e2e for import, tree expansion, metadata sync, editor settings, preview, and draft PR preparation;
- CI workflow for lint and registry drift;
- screenshot checks for desktop and mobile viewports.
- optional installer compatibility smoke through `npx skills add <path> --list` before running mutating installs.
- browser smoke for public GitHub import, registry preview, metadata quoting, Git handoff, and mobile overflow.

## 11. Implementation Milestones

### Milestone 1: Core Extraction

- Extract scanner from prototype logic. Done in `packages/core/src/scan.ts`.
- Extract frontmatter read/write. Done in `packages/core/src/frontmatter.ts`.
- Extract lint rules. Done in `packages/core/src/lint.ts`.
- Add tests. Initial tests live in `packages/core/test/core.test.ts`.

### Milestone 2: Manager Rewrite

- Create Vite + React + TypeScript manager.
- Port package tree, editor, metadata, lint, registry preview, install command, Git handoff, and settings.
- Replace hand-rolled editor with CodeMirror.
- Replace hand-rolled Markdown preview with sanitized renderer.

### Milestone 3: Registry And CLI

- Initialize a skill library. Initial `skills-charter init` command exists.
- Create a new skill package. Initial `skills-charter new <name>` command exists.
- Generate `skills.json`. Initial generator exists in `packages/core/src/registry.ts`.
- Fix the v0 registry contract. Initial schema lives in `schemas/skills-registry.v0.json`.
- Check registry drift in CI. Initial workflow lives in `.github/workflows/skills-charter.yml`.
- Generate install snippets. Initial generator exists in `packages/core/src/install-snippets.ts`.
- Add `skills-charter lint`. Initial CLI command exists.
- Add `skills-charter doctor`. Initial CLI command exists.

### Milestone 4: GitHub Write Flow

- Add authentication.
- Create branch.
- Commit changed files.
- Open draft PR.
- Surface CI status.

### Milestone 5: Examples And Templates

- Add team skill library template.
- Add personal skill library template.
- Add real example packages.
- Add adapter templates only after the core manager loop is credible.

## 12. Open Decisions

Resolve before production MVP:

- Fine-grained PAT vs GitHub App for authenticated writes.
- Whether manager source lives in `packages/manager` only, or is built into `docs/manager`.
- Exact `skills.json` schema version.
- How much unknown frontmatter should be editable vs preserved only.
- Whether script review policy is warning-only or blocking in CI.
- Which agent names are guaranteed by the current `npx skills` implementation.
