# Flagship Demo Scenario: Public Skill Intake Review

This runbook turns the Pages manager from a UI demo into a governance demo. The story is:

> A research operations team wants to adopt Anthropic's public `skill-creator`, but team-wide agent installs are blocked until the package has provenance, evidence, review, and a Git history.

Use this when presenting Skills Charter to new users, reviewers, or contributors.

## The Setup

Persona:

- **Maya**, research operations maintainer.
- She owns the team's shared agent skill library.
- Her users are analysts who use Codex, Claude Code, and Antigravity.

Business need:

- Analysts repeat the same research workflows every week.
- The team wants `skill-creator` to help turn those workflows into reusable internal skills.
- The team does not want public skills copied directly into `.claude/skills`, `.codex/skills`, or `.agents/skills`.

Governance rule:

> Public skills are allowed as inputs, but approved installs must come from the team's Git repository.

## The Live Source

Use the public Anthropic skill repository as the import source:

```text
anthropics/skills
```

The full repository is large enough to make the review problem visible. A local Skills Charter scan on 2026-05-20 found 17 skill packages, including large multi-file packages such as `canvas-design`, `docx`, `pptx`, `xlsx`, and `skill-creator`.

## Five-Minute Demo Script

1. **Open the manager**
   - Start from the GitHub Pages manager or local `docs/index.html`.
   - Say: "This is not the runtime. This is the Git-backed review surface."

2. **Import the public repo**
   - Open **Workspace settings**.
   - Set GitHub repo to `anthropics/skills`.
   - Click **Load repo**.
   - Say: "Public discovery is still fast. We are not replacing public skill repos."

3. **Select `skill-creator`**
   - Open `skills/skill-creator/SKILL.md`.
   - Show that the package is more than one Markdown file: it can include references, scripts, assets, agents, and eval tooling.
   - Say: "This is why skills need charters before they become runtime memory."

4. **Show the review gate**
   - Set or explain:
     - `review_status: candidate`
     - `source_type: public_import`
     - `owner: @research-ops`
     - `source_url: https://github.com/anthropics/skills/tree/main/skills/skill-creator`
   - Run checks.
   - Say: "Candidate packages are readable, but install is blocked until the team adds evidence and approval."

5. **Show risk as review work, not fear**
   - Point to scripts, external URLs, assets, dependency files, or token-like examples when present in the imported repository.
   - Say: "A warning is not a verdict. It creates a review item in Git."

6. **Add evidence**
   - Show an evidence note such as `examples/public-import-governance-demo/review-notes/skill-creator-intake.md`.
   - Say: "Approval is not a checkbox in a SaaS database. It is a file in the repo, reviewed in a PR."

7. **Prepare the Git handoff**
   - Open the diff view.
   - Click **Prepare draft PR**.
   - Say: "The browser prepares the change; GitHub and CI are the trust boundary."

8. **Show install after approval**
   - Explain that `skills.json` can expose install snippets only for approved packages.
   - Use:

```bash
npx skills add org/research-skills --skill skill-creator -g -a codex
npx skills add org/research-skills --skill skill-creator -g -a claude-code
npx skills add org/research-skills --skill skill-creator -g -a antigravity
```

Close with:

> Skills Charter lets teams learn from public skill ecosystems without making public install the governance model.

## What The Audience Should Understand

- `npx skills` remains the install layer.
- Skills Charter is the review and management layer.
- The team's Git repository becomes the source of truth.
- Public skills are imported as candidates, not blindly trusted.
- Approval requires provenance, owner, evidence, lint, CI, and PR review.
- Rollback is a Git revert or release tag.

## Companion Artifacts

- Case study: `case-studies/public-skill-to-approved.md`
- Evidence note: `examples/public-import-governance-demo/review-notes/skill-creator-intake.md`
- Day-one workflow: `docs/quickstart.md`
- UI semantics: `docs/manager-semantics.md`
