# Case Study: Public Anthropic Skill Intake For A Research Ops Team

This is the flagship demo story for Skills Charter. It is intentionally specific: the value is not "editing Markdown in a browser." The value is turning a useful public skill package into reviewed, versioned, installable team knowledge.

## Background

Vios Research is a 28-person AI research and product team. Analysts repeatedly ask agents to turn paper notes, release notes, experiment logs, and customer research into structured outputs. A senior analyst finds the public `anthropics/skills` repository and wants to use `skill-creator` to help the team turn these repeated workflows into internal skills.

Direct installation is tempting, but the team has a governance rule:

> Anything that changes agent behavior across the team needs an owner, provenance, review evidence, and a reversible Git history before it reaches shared agent directories.

That rule matters because skills are not passive docs. They can include routing instructions, long reference material, scripts, assets, templates, and evaluation tooling. Once installed, they become procedural memory for agents.

## What Makes The Demo Real

On 2026-05-20, a local Skills Charter scan of the current public `anthropics/skills` repository found 17 skill packages:

| Package | Files |
| --- | ---: |
| `algorithmic-art` | 4 |
| `brand-guidelines` | 2 |
| `canvas-design` | 83 |
| `claude-api` | 45 |
| `doc-coauthoring` | 1 |
| `docx` | 61 |
| `frontend-design` | 2 |
| `internal-comms` | 6 |
| `mcp-builder` | 10 |
| `pdf` | 12 |
| `pptx` | 59 |
| `skill-creator` | 18 |
| `slack-gif-creator` | 7 |
| `theme-factory` | 13 |
| `web-artifacts-builder` | 5 |
| `webapp-testing` | 6 |
| `xlsx` | 54 |

The conservative Skills Charter lint run marked the full import as `risk: high` because the repository includes executable scripts, many external URLs, and token-like example strings in API documentation. That is not a claim that the upstream repo is unsafe. It is the point of the demo: valuable public skill repositories can still contain content that a team should inspect before installing into shared agent runtimes.

## User Scenario

Maya, the research operations maintainer, wants to approve `skill-creator` for internal use. Her goal is narrow:

> Let analysts create and improve internal skills, but only after the public package is reviewed, pinned, and documented in Git.

She opens the Skills Charter manager and imports `anthropics/skills`. The tree shows the full public package library, including large package structures such as `canvas-design`, `docx`, `pptx`, and `xlsx`. She selects `skills/skill-creator/SKILL.md` and starts the intake.

## Governance Path

1. **Import as candidate**
   - `review_status: candidate`
   - `source_type: public_import`
   - `source_url: https://github.com/anthropics/skills/tree/main/skills/skill-creator`
   - `owner: @research-ops`

2. **Inspect package scope**
   - Confirm the package has a required `SKILL.md` entrypoint.
   - Review references, scripts, assets, agents, and eval viewer files.
   - Check that the trigger description is specific enough for internal use.

3. **Run checks**
   - Flag scripts for human review.
   - Flag external URLs for provenance review.
   - Require review evidence before approval.
   - Keep install commands blocked while the package remains a candidate.

4. **Add evidence**
   - `review-notes/skill-creator-intake.md`
   - `trigger-samples/create-internal-skill.md`
   - `evals/skill-creator-intake.md`

5. **Patch for team context**
   - Narrow the trigger to internal skill creation and skill improvement.
   - Add guidance for what analysts should put in `references/`, `templates/`, and `evals/`.
   - Record which scripts were reviewed and which are not part of the initial approved package.

6. **Promote through PR**
   - Open a branch.
   - Commit the imported package plus evidence.
   - Let CI regenerate `skills.json` and check registry drift.
   - Merge only after the reviewer approves.

7. **Install after approval**

```bash
npx skills add org/research-skills --skill skill-creator -g -a codex
npx skills add org/research-skills --skill skill-creator -g -a claude-code
npx skills add org/research-skills --skill skill-creator -g -a antigravity
```

## Before And After

| Without Skills Charter | With Skills Charter |
| --- | --- |
| A developer copies a public skill into a local agent directory. | A public skill enters Git as a candidate package. |
| The team cannot easily see source, review state, or install history. | Source URL, owner, review status, evidence, and install snippets are visible. |
| Scripts, assets, and links are easy to miss. | Package scope and risk checks make them review items. |
| Every agent install can drift. | `npx skills` installs approved packages from one trusted repository. |
| Rollback is manual and unclear. | Rollback is a Git revert or release tag. |

## Demo Line

> Skills Charter does not ask teams to stop learning from public skills. It gives them a Git-backed path to internalize what is useful without turning installation into blind trust.

## Claim Proven

The claim is not that Skills Charter is a better marketplace or installer. The claim is:

> Git is the right trust layer for team skill management because skills need review, provenance, evidence, version history, CI, install gating, and rollback.

This scenario shows that claim in a concrete workflow: public discovery stays fast, team adoption becomes governed, and agent installs remain compatible with the existing `npx skills` path.
