# Skill Manager Semantics

This page defines what the current GitHub Pages Skill Manager prototype means, so the UI does not imply hidden behavior.

## Import

- Import is a workspace setup action, so it lives in Settings rather than inside the repository tree.
- **Load repo** loads a public GitHub repository through the unauthenticated GitHub API.
- The manager scans `skills/<name>/SKILL.md` and groups every file under the same `skills/<name>/` folder as one package.
- Text files are fetched lazily when opened. Binary assets are listed as package files but shown as placeholders.
- **Local folder** uses the browser file picker. Files stay local and are not uploaded.
- Private repositories require authenticated GitHub access and are a P1 feature.

## Package Tree

The left tree is the source of truth for package structure. Folders can be collapsed, expanded, filtered, and searched. A single skill package may include:

```text
skills/<name>/
  SKILL.md
  references/
  templates/
  examples/
  scripts/
  assets/
```

Clicking a package row expands or collapses the whole skill package, including its first-level folders. This keeps the tree package-oriented rather than making the user open every folder by hand.

Click any text file to edit it. `SKILL.md` controls routing metadata, while supporting files remain part of the installable package.

## Editor Settings

Editor settings are local workspace preferences stored in browser `localStorage`. They do not modify skill files or repository metadata.

The current settings control:

- editor font family
- editor font size
- editor line height
- soft wrapping for long lines

The same typography settings apply to edit, preview, and diff surfaces, so script files, fenced code blocks, and diff rows remain visually consistent.

## Metadata

The metadata panel is a form view of `SKILL.md` frontmatter, not a second data store.

Required MVP fields:

- `name`
- `description`

Optional MVP fields:

- `category`
- `version`
- `owner`
- `review_status`

Editing these fields rewrites the selected package's `SKILL.md` frontmatter. Editing `SKILL.md` directly updates the form on the next editor input render. Optional fields are removed from frontmatter when left blank.

`license` is not required for private MVP libraries. It can remain in imported frontmatter, but the main form does not promote it unless the team is preparing public distribution or marketplace publishing.

New packages start from this shape:

```yaml
---
name: new-skill
description: Use this skill when the user needs a clear, repeatable workflow for a specific task.
category: workflow
version: 0.1.0
owner:
review_status: draft
---
```

## Labels

Labels are generated review chips, not a separate tag database. They come from:

- `SKILL.md` frontmatter such as `review_status`.
- The selected file type, such as entrypoint, supporting file, script, or asset.
- Package scan results, such as whether scripts are present.
- The selected install target, such as Codex, Claude Code, or Antigravity.

Future versions can make selected labels editable by writing them back to frontmatter or a generated registry.

## Live Lint, Registry Preview, And Risk

Live lint is a browser-side implementation of the same v0 rule names used by `packages/core`. The current prototype checks:

- `SKILL.md` entrypoint exists.
- Required frontmatter fields exist.
- Description is long enough to explain when the skill should be used.
- Every package file stays inside `skills/<name>/`.
- Scripts require human review.

Editing a supporting file is shown as editor context, but it does not change package risk by itself.

Risk is derived from package lint issues:

- **high**: one or more failures.
- **medium**: no failures, one or more warnings.
- **low**: no failures or warnings.

The `Registry` tab renders a browser-side `skills.json` preview with the same schema id, package records, risk values, file lists, and `npx skills` install snippets as the CLI contract. CI remains the final source of truth for committed `skills.json`.

## Run Checks

`Run checks` recomputes the browser lint list for the currently selected package and file. It does not contact GitHub or run CI yet.

In the real P0 implementation, CI should run equivalent checks plus link validation, generated registry drift, script review gates, asset size and hash checks, and secret scanning.

## Prepare Draft PR

`Prepare draft PR` currently means the browser has enough staged edits and diff context to prepare a local Git handoff. It does not create a GitHub PR without authentication.

The prototype generates:

- changed file summary;
- branch name;
- lint, registry, check, add, commit, and push commands;
- a diff surface that explains what CI will regenerate.

The intended implementation path is:

1. Authenticate with GitHub.
2. Create or update a branch.
3. Commit all edited package files.
4. Open a draft PR.
5. Let CI validate the package before merge.

Until that authentication path exists, the UI must say "prepare" rather than "open" or "sync".

## Install Command

SkillDocs does not replace `npx skills`. The manager generates a non-mutating discovery command plus install commands for approved packages and delegates agent directory placement to the existing installer.

For local imports, the source becomes `.`. For GitHub repositories, the source is `owner/repo`.
