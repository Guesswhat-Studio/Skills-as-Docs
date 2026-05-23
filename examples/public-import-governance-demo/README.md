# Public Import Governance Demo

This example supports the flagship Skills Charter demo:

> A research operations team imports Anthropic's public `skill-creator`, reviews it in Git, and approves it only after provenance and evidence are recorded.

This directory is not a vendored copy of Anthropic's skill. The live demo should import `anthropics/skills` directly through the Pages manager or through the CLI. This example stores the local governance evidence that a team would add around that public import.

## Demo Flow

1. Load `anthropics/skills`.
2. Select `skills/skill-creator/SKILL.md`.
3. Mark it as `candidate` and `public_import`.
4. Add owner and source URL.
5. Review package files, scripts, assets, links, and eval helpers.
6. Add evidence notes from this directory.
7. Promote through a pull request.
8. Run `skills-charter lint --policy strict` and regenerate `skills.json`.
9. Install with `npx skills` only after approval.

## Why The Evidence Is Separate

Runtime package files stay under `skills/<name>/`. Human review material can live in `review-notes/`, `evals/`, `reports/`, or a separate governance folder depending on team policy.

The important invariant is that the evidence is Git-tracked and reviewable with the skill change.

For the complete copyable workflow, see `docs/guides/run-team-agent-skill-library-from-github.md`.
