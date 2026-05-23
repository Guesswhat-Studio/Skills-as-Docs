# Run a Team Agent Skill Library from GitHub

This guide is the copyable operating model for Skills Charter: Git is the source of truth, pull requests are the governance gate, and agent installs only happen after approval.

The flagship scenario:

> A team wants to use Anthropic's public `skill-creator`, but it cannot be installed into shared Codex, Claude Code, or Antigravity environments until the team records provenance, evidence, review status, and CI proof.

## 1. Fork Or Clone The Library

Start from this repository or from `templates/team-skill-library/`.

```bash
git clone https://github.com/Guesswhat-Studio/Skills-as-Docs.git team-skills
cd team-skills
npm install
npm run build
```

Keep this repository outside agent install folders such as `.claude/skills` or `.agents/skills`. The Git repo is the reviewed source of truth; `npx skills` materializes approved packages into each agent.

## 2. Keep The Repository Shape Boring

```text
skills/
  skill-name/
    SKILL.md
    references/
    templates/
    examples/
    scripts/
    assets/
    review-notes/
skills.json
skills-charter.policy.json
.github/workflows/skills-charter.yml
.github/pull_request_template.md
```

Runtime package files live under `skills/<name>/`. Governance material can live in `review-notes/`, `evals/`, `reports/`, and `trigger-samples/` so reviewers can see why approval is justified.

## 3. Turn Policy Into Code

The default strict policy is intentionally small:

```json
{
  "mode": "strict",
  "failOnRisk": "high",
  "requireOwner": "all",
  "requireReviewStatus": true,
  "requireProvenanceFor": ["public_import", "generated", "evolved"],
  "requireEvidenceForApproved": ["public_import", "generated", "evolved"]
}
```

Run it locally before opening a PR:

```bash
node packages/cli/dist/index.js lint --root . --policy strict
node packages/cli/dist/index.js generate registry --root . --source org/team-skills --out skills.json
node packages/cli/dist/index.js generate registry --root . --source org/team-skills --out skills.json --check --policy strict
```

Use `--fail-on medium` only if your team wants warnings to block CI. The default strict mode blocks governance errors while still allowing reviewers to inspect script, asset, dependency, and URL warnings.

## 4. Import A Public Skill As Candidate

For a public import such as Anthropic `skill-creator`, do not mark it approved first. Start with reviewable metadata:

```yaml
---
name: skill-creator
description: Guide for creating effective skills. Use when users want to create or update a skill package.
owner: @research-ops
review_status: candidate
source_type: public_import
source_url: https://github.com/anthropics/skills/tree/main/skills/skill-creator
---
```

Then inspect the package tree:

- `SKILL.md`: trigger and operating instructions;
- `references/`, `templates/`, `examples/`: supporting knowledge;
- `scripts/`: executable helper code, highest review risk;
- `assets/`: binary or large files, provenance required;
- external URLs and dependency files: review before install.

## 5. Add Evidence Before Approval

Approved public, generated, or evolved skills need Git-tracked evidence. A simple evidence note is enough for the first pass:

```text
skills/skill-creator/review-notes/approval.md
```

Include:

- why the team wants the skill;
- source URL and commit if available;
- files reviewed;
- scripts/assets/dependencies reviewed or excluded;
- trigger samples tested;
- approval decision and reviewer.

The example in `examples/public-import-governance-demo/review-notes/skill-creator-intake.md` shows this pattern.

## 6. Let CI Block Drift

The Skills Charter workflow should run on every pull request:

```bash
npm ci
npm run build
node packages/cli/dist/index.js lint --root . --policy strict
node packages/cli/dist/index.js generate registry --root . --source "$GITHUB_REPOSITORY" --out skills.json --check --policy strict
node packages/cli/dist/index.js generate registry --root . --source "$GITHUB_REPOSITORY" --approved-only --out "$RUNNER_TEMP/skills.approved.json" --policy strict
```

This proves three things:

- package metadata and files pass policy;
- committed `skills.json` matches the repository;
- an approved-only registry can be generated for safe install surfaces.

## 7. Install Only After Merge

After the PR is approved and merged, install from the GitHub source:

```bash
npx skills add org/team-skills --skill skill-creator -g -a codex
npx skills add org/team-skills --skill skill-creator -g -a claude-code
npx skills add org/team-skills --skill skill-creator -g -a antigravity
```

That is the core Skills Charter loop: public discovery is allowed, but team installation is governed by Git.
