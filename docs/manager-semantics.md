# Skill Manager Semantics

This page defines what the current GitHub Pages Skill Manager prototype means, so the UI does not imply hidden behavior.

## Header Layout And Button Taxonomy

The header is split into five roles:

- **Product identity**: `Skills Charter` and the short product role, so users know this is a skill package manager rather than a generic code editor.
- **Workspace context**: repository, branch, registry preview, and the current browser workspace status. Status belongs here because it answers "what state is this workspace in?", not "what action can I take?"
- **Reference entries**: `Tutorial` toggles the embedded public-import walkthrough as a coachmark overlay, while `Manifesto` links to the concept and market argument. The tutorial is a guided product demo; the manifesto is reading material.
- **Workflow actions**: `Import skills`, `Run policy`, and package-specific handoff actions. These are ordered from setup to validation to install/PR handoff, matching the review loop.
- **Global utilities**: language, workspace settings, theme, and GitHub. These affect the page or destination, not the selected skill package.

The initial status label is **No local edits** / **无本地改动**. It used to read `Clean`, but that was too ambiguous: it could mean visual cleanliness, lint health, Git cleanliness, or sync state. The clearer label makes the status observable without pretending the static prototype is fully synced to GitHub.

The static manager does not show a user avatar, username, assignee, or account menu. Those controls belong only after authenticated GitHub write flow exists.

## Accessibility And Editing Comfort

The manager should optimize for long human review sessions, not just a polished demo screenshot.

Current color decisions:

- Normal text, form text, editor text, hints, status labels, and primary buttons should meet WCAG AA contrast for normal text.
- The light theme muted token is intentionally darker than a decorative gray because it appears in 10-12px labels and helper text.
- The dark theme primary action uses dark text on the bright accent color. White text on bright cyan looks familiar but fails contrast badly.
- Accent fills are reserved for current state, approved/positive status, and the primary workflow action, so users can scan review state without every control shouting.

Current editing comfort:

- The editor uses a 14px mono baseline with a generous line height and a local font-size control in Settings.
- Metadata fields mirror `SKILL.md` frontmatter so people can edit structured fields without hand-editing YAML every time.
- Preview, diff, registry preview, review gates, provenance, evidence, and install commands are visible in the same workspace because human review is the product wedge.

Known prototype limitation:

- The static Pages prototype uses a textarea plus highlighted preview overlay. That is acceptable for validating the workflow, but the durable MVP should use a real editor engine such as CodeMirror 6 for selection rendering, keyboard ergonomics, line numbers, accessibility APIs, and large-file performance.

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
  evals/
  reports/
  review-notes/
  trigger-samples/
```

Clicking a package row expands or collapses the whole skill package, including its first-level folders. This keeps the tree package-oriented rather than making the user open every folder by hand.

Click any text file to edit it. `SKILL.md` controls routing metadata, while supporting files remain part of the installable package.

## Editor Settings

Editor settings are local workspace preferences stored in browser `localStorage`. They do not modify skill files or repository metadata.

The current settings control:

- editor font size

The same typography settings apply to edit, preview, and diff surfaces, so script files, fenced code blocks, and diff rows remain visually consistent.

Install provider and local skill root belong to the `Registry` install target panel, not global Settings. Selecting Codex, Claude Code, or Antigravity updates the suggested local root (`~/.codex/skills`, `~/.claude/skills`, or `~/.agents/skills`) because that choice affects downstream installation rather than repository configuration.

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
- `source_type`
- `source_url`
- `generator`
- `approved_by`

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
review_status: candidate
source_type: manual
---
```

## Labels

Labels are generated review chips, not a separate tag database. They come from:

- `SKILL.md` frontmatter such as `review_status`.
- The selected file type, such as entrypoint, supporting file, script, or asset.
- Package scan results, such as whether scripts or evidence files are present.
- The selected install target, such as Codex, Claude Code, or Antigravity.

Future versions can make selected labels editable by writing them back to frontmatter or a generated registry.

## Live Lint, Registry Preview, And Risk

Live lint is a browser-side implementation of the same v0 rule names used by `packages/core`. The current prototype checks:

- `SKILL.md` entrypoint exists.
- Required frontmatter fields exist.
- Description is long enough to explain when the skill should be used.
- Every package file stays inside `skills/<name>/`.
- Review status and source type use known lifecycle values.
- Approved packages require an owner.
- Public, generated, or evolved packages should include provenance and review evidence.
- Scripts, suspicious commands, dependency manifests, assets, external URLs, and possible secrets require review.

Editing a supporting file is shown as editor context, but it does not change package risk by itself.

Risk is derived from package lint issues:

- **high**: one or more failures.
- **medium**: no failures, one or more warnings.
- **low**: no failures or warnings.

The dashboard shows only the top five live policy findings so it remains a health overview rather than a full issue tracker. Findings are sorted by severity first, then by review impact: high-risk/secret-like findings, script and ownership/evidence issues, dependency/link/asset review issues, and finally lower-risk package warnings. The Review workspace remains the place to browse and resolve the full queue.

The `Registry` tab renders a browser-side `skills.json` preview with the same schema id, package records, lifecycle values, provenance, evidence, risk values, file lists, and approved-only `npx skills` install snippets as the CLI contract. CI remains the final source of truth for committed `skills.json`.

## Run Policy

`Run policy` recomputes browser-side package findings and risk from the current package metadata and files. It checks entrypoints, owner, provenance, approved evidence, scripts, dependency manifests, assets, external URLs, and possible secrets. It does not contact GitHub or run CI; GitHub Actions remains the merge gate.

In the real P0 implementation, CI should run equivalent checks plus link validation, generated registry drift, script review gates, asset size and hash checks, and secret scanning.

## Git Handoff

The static manager prepares staged file context, review notes, registry preview, install snippets, and PR intent. It does not create a GitHub PR without authentication.

The `Pull Requests` workspace fetches open PRs from the configured public GitHub repository and shows branch context, changed files, affected skills, GitHub check-run status, policy hints, and Git handoff commands. It is a review cockpit, not an authenticated merge client.

The prototype generates:

- changed file summary;
- branch name;
- GitHub Actions check-run summary when public check data is available;
- lint, registry, check, add, commit, and push commands;
- a diff surface that explains what CI will regenerate.

The intended implementation path is:

1. Authenticate with GitHub.
2. Create or update a branch.
3. Commit all edited package files.
4. Open a draft PR.
5. Let CI validate the package before merge.

Until that authentication path exists, the UI must describe this as a Git handoff rather than a direct PR write.

## Install Command

Skills Charter does not replace `npx skills`. The manager generates a non-mutating discovery command plus install commands for approved packages and delegates agent directory placement to the existing installer.

For local imports, the source becomes `.`. For GitHub repositories, the source is `owner/repo`.

Packages that are `candidate`, `in_review`, `rejected`, `deprecated`, or `retired` remain readable and reviewable, but their install command is blocked by default. This keeps public imports and generated skills in the human review loop until a maintainer explicitly approves them.
