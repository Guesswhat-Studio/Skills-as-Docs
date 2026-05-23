# Team Skill Library Template

Use this folder as the starting point for a governed team skill repository. The goal is simple: keep agent skills readable by humans, executable by agents, and reviewable through Git.

## Operating Model

1. New or imported skills start as `review_status: candidate`.
2. Maintainers add provenance, ownership, and review evidence.
3. CI runs `skills-charter lint --policy skills-charter.policy.json` and checks registry drift.
4. Reviewers approve the pull request and mark the skill `approved`.
5. CI publishes `skills.json`.
6. Team members install only approved packages with `npx skills`.

## Copy This Template

1. Copy this folder into a new repository.
2. Commit the included `.github/workflows/skills-charter.yml`, `.github/pull_request_template.md`, `skills-charter.policy.json`, `skills/`, and `skills.json`.
3. Enable GitHub Actions.
4. Open every skill change as a pull request.

The workflow currently checks out `Guesswhat-Studio/Skills-as-Docs` as the preview tooling source and runs the CLI against your repository. Pin the workflow to a tag when your team adopts a released version.

## Recommended Structure

```text
skills/
  code-review/
    SKILL.md
    references/
    templates/
    scripts/
    assets/
    review-notes/
skills.json
skills-charter.policy.json
.github/workflows/skills-charter.yml
.github/pull_request_template.md
```

Runtime files stay inside each skill package. Repository-level docs, launch posts, and platform adapter notes can live outside `skills/`.

## Review Checklist

- The skill has an owner.
- The trigger is narrow enough that agents know when to load it.
- Public or generated imports include source provenance.
- Scripts, assets, dependencies, links, and network calls are reviewed.
- Evidence exists for approved public, generated, or evolved skills.
- Install snippets are generated only after the package is approved.

## Policy

`skills-charter.policy.json` is the team's governance contract. The template starts strict:

- every package needs `owner`;
- every package needs `review_status`;
- public, generated, and evolved packages need provenance;
- approved public, generated, and evolved packages need Git-tracked evidence;
- high-risk packages fail CI.

Adjust the policy deliberately in code review rather than relying on UI convention.

## Install

After a package is approved and `skills.json` is current, install from the governed registry:

```bash
npx skills add <org>/<team-skill-repo> --list
npx skills add <org>/<team-skill-repo> --skill code-review -g -a codex
```

Runtime installation stays delegated to `npx skills`; Skills Charter owns the review trail, policy gate, and registry output.
