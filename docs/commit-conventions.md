# Skills Charter Commit Conventions

Skills Charter treats Git history as the durable governance record. Commits should be readable as an audit trail, not only as implementation snapshots.

## Commit Format

Use a small conventional prefix:

```text
type(scope): short imperative summary
```

Recommended types:

| Type | Use for |
| --- | --- |
| `intake` | importing a public, local, generated, or evolved skill as a candidate |
| `review` | adding evidence, risk notes, evaluations, reports, or reviewer decisions |
| `approve` | promoting a skill to approved and exposing install snippets |
| `edit` | changing package instructions, templates, scripts, assets, or metadata |
| `policy` | changing lint rules, lifecycle rules, approval gates, or policy files |
| `registry` | regenerating `skills.json` or approved-only registry output |
| `ui` | changing the static manager interface |
| `docs` | changing guides, case studies, roadmap, or pitch material |
| `ci` | changing GitHub Actions, PR templates, or smoke checks |
| `chore` | dependency, formatting, or repository maintenance |

Examples:

```text
intake(pdf): import anthropic public package
review(pdf): add approval evidence and script notes
approve(pdf): expose codex install snippet
policy(strict): require evidence for public imports
registry: regenerate approved install registry
ui(editor): add package file handoff actions
```

## Governance Trailers

For package-affecting commits, add trailers in the commit body when they help reviewers reconstruct the decision:

```text
Skill: pdf
Lifecycle: candidate -> approved
Risk: medium
Evidence: skills/pdf/review-notes/approval.md
Registry: skills.json regenerated
Install: npx skills add Guesswhat-Studio/testSkills --skill pdf -g -a codex
```

Use `Refs:` for GitHub issues, upstream commits, public source URLs, or design notes.

## Rules

- Keep one governance decision per commit when possible.
- Do not mix unrelated skill approvals in a single commit.
- Commit evidence before or with approval metadata.
- Regenerate `skills.json` in the same commit when package metadata or files change.
- Never approve a public, generated, or evolved skill without owner, provenance, evidence, and policy results.
- Use PRs for promotion to `approved`; direct commits to `main` should be reserved for repository maintenance.
- Avoid "wip", "fix stuff", or "update" commits in review branches unless they are squashed before merge.

## Merge Strategy

For team libraries, prefer squash merge for small single-skill changes and regular merge for multi-commit governance stories where the commit sequence is useful evidence. The PR title should still summarize the final governance decision.
