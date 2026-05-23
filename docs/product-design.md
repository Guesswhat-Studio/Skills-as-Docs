# Skills Charter Product Design

Skills Charter is Git-backed governance for agent skills. It helps individuals and teams refine, review, approve, version, and install skills without moving the source of truth out of Git.

This document is the product baseline for the Pages manager redesign. The manager should feel like a governance workspace first and an editor second.

## Product Thesis

Agent skills are runtime assets, not loose notes. A team should know:

- where a skill came from
- who owns it
- what files are included
- what risks were found
- what evidence supports approval
- what changed since the last version
- whether it is allowed to be installed
- how to roll it back

Skills Charter answers those questions with Git, pull requests, CI, generated registries, and static review surfaces.

```text
candidate skill
  -> provenance
  -> live lint and policy checks
  -> review evidence
  -> approval in Git
  -> approved registry
  -> install through npx skills
```

The product claim is not "edit markdown in a browser." The product claim is "govern before install."

## Information Architecture

The Pages manager has six product layers.

### 1. Input / Intake

Users can bring skills in from:

- a public GitHub skill repository
- a local `.claude/skills`, `.codex/skills`, or `.agents/skills` folder
- a new Skills Charter package template
- a generated or evolved skill output

Intake must preserve source type and provenance. Public, generated, and evolved skills should start as candidates.

### 2. Overview / Dashboard

The first screen should show the health of the skill library:

- total packages
- installable packages
- review queue
- high-risk findings
- missing owners
- missing evidence
- changed files
- registry readiness

This is where a maintainer understands the repo in 30 seconds.

### 3. Library / Inventory

Users need multiple ways to inspect the corpus:

- repository tree
- package tree
- category hierarchy
- risk/status filter
- owner filter
- changed-only view

The library is an inventory of governed runtime assets, not just a file explorer.

### 4. Package Workspace

Each package workspace supports:

- package structure
- markdown editing
- script editing
- preview
- diff
- metadata form
- provenance
- evidence
- live lint
- package graph

`SKILL.md` remains the required entrypoint, but supporting files are first-class package material.

### 5. Review / Approval

Approval is gated by policy:

- lifecycle is approved
- owner is present
- no high-risk findings
- governed external sources have provenance
- governed external sources have review evidence

The UI can explain and prepare review work, but the durable approval lives in Git history and PR review.

### 6. Pull Requests / Branch Review

Git is the durable workflow, so the manager needs a PR cockpit before it needs a database. The P0 static surface should fetch open GitHub pull requests for the configured repository and show:

- source and target branches
- changed skills and changed files
- evidence, script, registry, and manifest impact
- GitHub Actions check-run status for the PR head SHA
- checkout, policy, fix, push, and merge handoff commands
- a direct link back to GitHub for review, checks, and merge

The static Pages app should not pretend to be an authenticated GitHub client. Until OAuth or a GitHub App exists, branch writes and merges remain GitHub CLI or GitHub UI actions.

### 7. Registry / Install

Only approved packages should expose install commands. The generated registry is the install source.

```bash
npx skills add org/team-skills --list
npx skills add org/team-skills --skill skill-creator -g -a codex
```

Runtime install remains delegated to `npx skills`; Skills Charter owns review, policy, and registry generation.

## Static Architecture

The P0 product does not need a database.

```text
Git repo              source of truth
GitHub Pages          static governance manager
GitHub Actions        policy enforcement and registry generation
Pull requests         review and approval workflow
skills.json           approved install registry
commits/tags          version history and rollback
npx skills            downstream installer
```

Avoid adding a database until the product needs hosted multi-repo aggregation, custom accounts, cross-org analytics, or SaaS collaboration. For now, a database would weaken the core Git-backed governance story.

## UI Requirements

The manager should support:

- light and dark themes
- English and Chinese UI copy
- a visible manifesto entry
- a guided demo entry
- dashboard-first default view
- package workspace tabs
- accessible contrast and keyboard focus
- long-session editing comfort

The default visual hierarchy should be:

1. repository governance status
2. packages requiring review
3. selected package gate and blockers
4. edit/preview/diff details

## Design Direction

The interface should feel like a quiet operational console:

- dense but readable
- explicit about state and blockers
- minimal decoration
- clear Git vocabulary
- restrained accent usage
- no marketing hero layout inside the manager

The product home is not a landing page. It is the working surface for a team skill library.

## Current Pages Redesign

The `charter` branch implementation follows the latest `redesign/` dashboard direction and treats the manager as an operational console:

- **Dashboard first**: repository health, review queue, live findings, changed files, and registry readiness are the first screen.
- **Package as unit**: `SKILL.md`, references, scripts, assets, agents, eval viewers, and review notes are all displayed as package material.
- **Governance before editing**: the editor is present, but it sits inside the intake-review-approval-registry flow.
- **Static by design**: browser-local edits are clearly temporary; Git, CI, and generated registry output remain the durable backend.
- **Copyable workflow**: the demo uses Anthropic-style public skill intake to show why public discovery and internal approval are separate steps.

## MVP Navigation

The current static manager should expose:

- **Dashboard**: repository health, governance loop, review queue, registry readiness
- **Intake modal**: local folder upload, public GitHub repo import, specific skill import, and new candidate creation
- **Library**: package inventory by category, owner, review status, risk, and install readiness
- **Editor**: selected package structure, searchable and collapsible package/file rail, edit, preview, diff, live lint, metadata, toolbar Zen mode, and configurable editor font
- **Review**: selected-package policy gate, provenance, evidence, blockers, and approval decision
- **Pull Requests**: open GitHub PR inbox, branch context, changed skills/files, GitHub check-run status, review impact, and Git handoff commands
- **Registry**: generated `skills.json`, install target dropdown, local skill root, and approved install snippets for Codex, Claude Code, or Antigravity
- **History**: Git audit model, skill/version filtering, local changed files, and database boundary
- **Settings**: managed skills repository, default branch, and editor preferences

## Non-Goals For P0

- hosted user accounts
- database-backed workflow state
- replacing `npx skills`
- becoming a public marketplace
- full GitHub PR creation without authentication
- binary asset management beyond review signals

## Success Criteria

A new user should be able to open the Pages manager and understand:

- this is a skill governance system
- Git is the durable backend
- public skills become candidates first
- approval requires evidence
- only approved packages produce install snippets
- previous versions are preserved by Git

That understanding should happen before they open the editor.
