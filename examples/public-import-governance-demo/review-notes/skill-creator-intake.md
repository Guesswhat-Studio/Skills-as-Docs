# Review Note: Anthropic `skill-creator` Public Import

Status: example evidence note
Owner: `@research-ops`
Source type: `public_import`
Source URL: `https://github.com/anthropics/skills/tree/main/skills/skill-creator`
Intended package status: `candidate -> in_review -> approved`

## Intake Question

Should the research operations team approve a public `skill-creator` package so analysts can create and improve internal skills for repeated research workflows?

## Why The Team Wants It

- Analysts need a repeatable way to turn paper reviews, release notes, experiment summaries, and customer research workflows into internal skills.
- The public package already teaches skill structure, trigger design, supporting files, and evaluation loops.
- A reviewed import is faster than asking every analyst to invent a package pattern from scratch.

## Review Scope

- Read `SKILL.md` entrypoint and confirm trigger specificity.
- Inspect supporting references, scripts, assets, agents, and eval viewer files.
- Confirm that scripts are understood before approving them for team use.
- Confirm that external URLs are expected and attributable.
- Confirm that generated install snippets are blocked until approval.
- Confirm that the package can be removed or reverted through Git if it causes bad agent behavior.

## Initial Decision

Approve for internal pilot only after:

1. `review_status` is set to `in_review`.
2. `owner` is set to `@research-ops`.
3. `source_url` and source commit are recorded.
4. Scripts and assets are either reviewed or excluded from the initial approved package.
5. At least three analyst workflows are tested as trigger samples.
6. CI regenerates `skills.json` and confirms registry drift is resolved.

## Demo Talking Point

This evidence note is the product claim in miniature: the team did not merely copy a public skill. It turned public discovery into an auditable Git change.
