# Quickstart: Run Skills Charter As Your Team Skill Library

This guide is the day-one path for a team that wants Git to become the management layer for Agent Skills.

The intended loop:

```text
fork or clone repo -> add skills under skills/<name>/ -> lint + generate registry -> PR review -> merge -> npx skills install
```

## 1. Create Your Library Repo

Use this repository as a starting point:

```bash
git clone https://github.com/Guesswhat-Studio/Skills-as-Docs.git team-skills
cd team-skills
npm install
npm run check
```

Then create a GitHub repository for your team, for example `org/team-skills`, and push this checkout there.

## 2. Initialize The Skill Library Shape

If the repo does not already have a `skills/` directory, initialize it:

```bash
node packages/cli/dist/index.js init --root . --source org/team-skills
```

This creates the Git-managed package root:

```text
skills/
skills.json
```

`skills.json` is generated metadata. Git tracks it so PRs can show registry drift clearly.

## 3. Create Your First Skill

```bash
node packages/cli/dist/index.js new literature-review \
  --root . \
  --description "Use this skill when the user needs a structured literature review workflow, paper triage, evidence extraction, or synthesis across academic sources." \
  --category research \
  --owner @research
```

Edit the generated file:

```text
skills/literature-review/SKILL.md
```

Add supporting files only when they help the package stay readable:

```text
skills/literature-review/references/
skills/literature-review/templates/
skills/literature-review/examples/
skills/literature-review/scripts/
skills/literature-review/assets/
```

## 4. Check The Repo Before Review

```bash
npm run check
node packages/cli/dist/index.js lint --root . --policy strict
node packages/cli/dist/index.js generate registry --root . --source org/team-skills --out skills.json
node packages/cli/dist/index.js generate registry --root . --source org/team-skills --out skills.json --check --policy strict
```

The important idea: the PR should prove that `skills/` and `skills.json` agree.

## 5. Test Locally In Your Agents

First verify that the upstream installer can discover your package:

```bash
npx skills add . --list
```

Then install from the local Git checkout while iterating:

```bash
npx skills add . --skill literature-review -g -a codex
npx skills add . --skill literature-review -g -a claude-code
npx skills add . --skill literature-review -g -a antigravity
```

Do not clone the whole Skills Charter repository into `.claude/skills`, `.agents/skills`, or another agent directory. Keep the Git repo as the source of truth, then let `npx skills` materialize packages into each agent.

For a non-mutating compatibility smoke test:

```bash
npm run smoke:npx-list
```

## 6. Daily Team Workflow

For a normal skill change:

```bash
git checkout -b skill/literature-review-rubric
$EDITOR skills/literature-review/SKILL.md
node packages/cli/dist/index.js lint --root . --policy strict
node packages/cli/dist/index.js generate registry --root . --source org/team-skills --out skills.json
npm run check
git add skills skills.json
git commit -m "edit(literature-review): refine review rubric"
git push
```

Open a PR. CI should check build/test, package lint, and registry drift. Use [commit conventions](./commit-conventions.md) so the Git history stays readable as a governance record.

After merge, developers install the approved package from GitHub:

```bash
npx skills add org/team-skills --skill literature-review -g -a codex
```

## 7. Import Existing Skills

If you already have skills in agent-specific directories, copy each package into `skills/<name>/`:

```text
skills/
  existing-skill/
    SKILL.md
```

Then run:

```bash
node packages/cli/dist/index.js scan --root .
node packages/cli/dist/index.js lint --root . --policy strict
node packages/cli/dist/index.js generate registry --root . --source org/team-skills --out skills.json
```

The migration goal is not to preserve every local install detail. The goal is to make the Git repo the reviewed, reversible source of truth.

For the fuller GitHub operating model, see [Run a Team Agent Skill Library from GitHub](./guides/run-team-agent-skill-library-from-github.md).
