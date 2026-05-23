# Skills Charter Roadmap

This roadmap is promotion-first. The goal is not to win by shipping the most software first. The goal is to make a team maintenance paradigm feel obvious:

> Agent Skills should receive a team-approved charter before they enter runtime.

The GitHub Pages manager is the first proof surface. It shows the workflow, gives teams something concrete to try, and anchors the repository. The broader mission is to make Skill Charters the default governance object for skills created in GitHub, GitBook, VitePress, MkDocs, Obsidian, Feishu, Yuque, and internal knowledge bases.

Recent market signals make the thesis sharper, not weaker. The ecosystem is splitting into five lifecycle layers: Creation, Evaluation, Distribution, Governance, and Runtime. Verified catalogs, private enterprise registries, and runtime permission systems are emerging, but they mostly answer how skills move and what agents may do after install. Skills Charter should own the earlier trust question: how a skill becomes approved team memory before runtime.

## North Star

Make "Skill Charter" the recognizable approval object for team-owned Agent Skill libraries.

Success means:

- Teams understand why skills need owners, review, provenance, CI, and rollback.
- Teams can place Skills Charter clearly in the lifecycle: Creation -> Evaluation -> Distribution -> Governance -> Runtime.
- Developers can fork a starter repo and run a managed skill library in one day.
- Documentation teams can use familiar docs surfaces as human skill-management layers.
- Agent users install approved skills from a trusted repository instead of copying random snippets.
- Approved Skills Charter packages can flow into `npx skills`, private registries, verified catalogs, or runtime governance systems.
- The project becomes known for governance and workflow, not marketplace size.

## Product Philosophy

Software supports the paradigm; it is not the whole product.

- The docs, examples, templates, and case studies are the main adoption engine.
- The GitHub Pages manager is a reference implementation and demo shell.
- Adapters are teaching tools as much as technical integrations.
- The CLI should automate boring checks, not become a competing installer or hosted registry.
- Trust metadata should travel with the package so downstream registries and catalogs can consume it.
- Public marketplace integration should remain downstream until the private/team workflow is credible.

## Roadmap Overview

| Horizon | Theme | Primary Outcome |
| --- | --- | --- |
| 0. Now | Clarify the thesis | A sharp public story people can repeat |
| 1. First launch | Publish the pattern | README, Pages, tutorials, templates, and first essays |
| 2. Template expansion | Meet teams where they write | GitHub, GitBook, VitePress, Obsidian, Feishu, and Yuque paths |
| 3. Proof through examples | Make the loop believable | Real skill libraries and failure-to-patch case studies |
| 4. Community seeding | Turn users into maintainers | External repos, adapter requests, and public discussions |
| 5. Tool hardening | Make adoption safer | Lint, CI, registry, risk review, and PR workflow improvements |

## Current Implementation Slice

The first hardening slice is now centered on the candidate-to-approved loop:

1. **Approved-only registry path**: packages remain visible in `skills.json`, but install snippets are emitted only for approved packages without high-risk lint failures.
2. **Risk scanner v1**: CLI and Pages lint call out scripts, suspicious commands, dependency manifests, assets, external URLs, possible secrets, missing owners, unknown lifecycle values, and missing provenance/evidence.
3. **Policy-as-code v1**: `skills-charter.policy.json`, `skills-charter lint --policy strict`, `skills-charter generate registry --approved-only`, the Skills Charter GitHub Action, and the PR template now make the governance loop enforceable in CI.
4. **Pages review cockpit**: the inspector now shows lifecycle, provenance, evidence, review gate checks, and approval-gated install commands.
5. **Adoption artifacts**: the repo includes a team library template, minimal example library, flagship Anthropic public-import governance demo, case study, evidence note, practical GitHub guide, and launch blog draft.

## Horizon 0: Clarify The Thesis

Goal: make the positioning impossible to confuse with a marketplace, prompt manager, or Skill OS.

Deliverables:

- Tight README positioning: Git-backed review and management for Agent Skill packages.
- A short research-backed evidence section covering the procedural gap, lifecycle framing, and security risks.
- A public roadmap that states docs and promotion come before software completeness.
- A reusable diagram of the Skills Charter loop:

```text
Pages Manager -> Skill Charter -> PR + CI -> approved package + skills.json -> npx skills -> agents -> feedback patch
```

- A clear glossary: skill package, `SKILL.md`, references, scripts, registry, review status, install path.

Message to repeat:

> Skills are not hidden prompts. They are operational documents for agents.

## Horizon 1: First Public Launch

Goal: publish a complete enough story that interested teams can understand, fork, and discuss the pattern.

Narrative work:

- Launch essay: "Agent Skills Need Governance."
- Practical guide: "Run a Team Agent Skill Library from GitHub." (`docs/guides/run-team-agent-skill-library-from-github.md`)
- Short explainer: "The Procedural Gap: Why Tools Are Not Enough."
- Chinese launch essay: "别急着买 Skills Marketplace，先把团队自己的 Skills 管起来。"

Repository work:

- README that leads with the daily workflow, not implementation details.
- GitHub Pages manager shell that demonstrates browsing, editing, lint, registry preview, install snippets, and Git handoff.
- `docs/quickstart.md` as the day-one path.
- `docs/manager-semantics.md` for plain-language UI semantics.
- `docs/development.md` for the MVP implementation contract.
- `ROADMAP.md` for the promotion-first plan.

Template work:

- `templates/team-skill-library/`
- `templates/personal-skill-library/`
- `examples/minimal-team-library/`
- A sample `skills.json`
- A sample GitHub Actions workflow for lint, registry drift, and package risk.
- A sample PR template that asks for owner, provenance, evidence, and risk decision.
- A flagship public-import demo that shows how a real team reviews `anthropics/skills` before approving installs.

Promotion work:

- Publish on GitHub first.
- Share with small friendly circles before broad launch.
- Ask for feedback on the paradigm, not just the UI.
- Collect the first 3-5 real skill-maintenance pain stories.

## Horizon 2: Platform Templates

Goal: make Skills Charter portable across the documentation surfaces teams already use.

GitHub-first path:

- GitHub Pages manager as the default reference flow.
- GitHub PR workflow tutorial.
- GitHub Actions checks for package health and registry drift.

GitBook path:

- GitBook starter structure.
- Generated `SUMMARY.md` / navigation.
- Tutorial: "Using GitBook as a Team Agent Skills Manager."
- Position GitBook as an authoring surface, with Git as the source of truth.

VitePress path:

- VitePress skill portal template.
- Tutorial for open-source and China-friendly static deployment.
- CODING/Gitee mirror notes where useful.

Obsidian path:

- Local-first personal skill library template.
- Vault index and folder conventions.
- Git sync guidance.

Feishu/Yuque path:

- Export/normalize recipes before live sync.
- Authoring constraints for skill-safe Markdown.
- Chinese demos:
  - Feishu knowledge base -> Markdown -> Git -> agent install.
  - Yuque/Elog export -> normalized `skills/<name>/SKILL.md`.

## Horizon 3: Proof Through Examples

Goal: move from "interesting idea" to "I can see my team doing this."

Example libraries:

- Research lab skill library.
- Code review and release workflow library.
- Writing / content operations skill library.
- Security review skill library.
- Personal researcher Obsidian skill library.
- Chinese Feishu/Yuque team library.

Case studies:

- "A failed agent run became a skill patch."
- "A public skill was reviewed and internalized safely."
- "A non-engineer improved a team workflow without touching agent config folders."
- "One skill package installed across Claude Code, Codex, and Antigravity."

Evidence to collect:

- Before/after agent behavior.
- Diff of the skill patch.
- Review checklist used.
- Install command used.
- Rollback story if a change was bad.

## Horizon 4: Community Seeding

Goal: make the pattern travel through people and examples, not just through a package install.

Channels:

- GitHub README and issues.
- Hacker News.
- Reddit communities for Claude Code, Claude AI, LocalLLaMA, AI agents, and coding agents.
- V2EX, Juejin, Zhihu, Jike, Shaoshupai.
- GitBook / Mintlify / docs-platform communities.
- Agent Skills and MCP communities.

Community asks:

- "Show us how your team currently manages skills."
- "What docs platform should get a template next?"
- "Submit a failure-to-skill-patch story."
- "Share a private-skill-library folder layout."

Signals to watch:

- External repos adopting `skills/<name>/SKILL.md`.
- Issues asking for adapters.
- Teams asking how to review scripts and assets.
- Docs platform maintainers mentioning skill libraries.
- Chinese teams asking for Feishu/Yuque workflows.

## Horizon 5: Tool Hardening

Goal: make the workflow safer and less manual once the paradigm has traction.

CLI:

- `skills-charter lint`
- `skills-charter generate registry`
- `skills-charter generate install-snippets`
- `skills-charter doctor`
- `skills-charter generate gitbook`
- `skills-charter generate vitepress`
- Later: `skills-charter normalize feishu`, `skills-charter normalize yuque`, `skills-charter generate obsidian`

Manager:

- Move from static shell to real package-aware workspace.
- Improve multi-file editing and diff review.
- Add authenticated branch and draft PR flow.
- Show script, asset, binary, external URL, and secret-risk labels.
- Show install compatibility with `npx skills add <repo> --list`.

CI:

- Metadata validation.
- Registry drift check.
- Link check.
- Package boundary check.
- Script and asset risk report.
- Secret scanning hooks where possible.
- Generated install snippet verification.

Security:

- Treat public skills as imports that require human review.
- Mark scripts and network calls as higher risk.
- Require owner and review status before "approved."
- Keep provenance visible in registry output.

## Content Backlog

English:

- "Agent Skills Need Governance"
- "The Procedural Gap: Why Tools Are Not Enough"
- "Skills Charter: A Git Workflow for Team Skills"
- "Using GitBook as a Team Agent Skills Manager"
- "Build a VitePress Skill Portal for Your Team"
- "From Failed Agent Run to Skill Patch"

Chinese:

- "别急着买 Skills Marketplace，先把团队自己的 Skills 管起来"
- "像管理文档一样管理 AI Agent Skills"
- "飞书如何变成团队 AI Skills 管理器"
- "语雀如何变成团队 AI Skills 管理器"
- "用 CODING + VitePress 搭建国内可访问的 Skills Portal"
- "一次失败的 Agent 执行，如何变成一条团队 Skill"

## What Not To Prioritize Yet

- Hosted SaaS.
- Paid marketplace.
- Skill monetization.
- Universal rich-text bidirectional sync.
- Competing with `npx skills`.
- Owning the Agent Skills standard.
- Large adapter count without real examples.
- Runtime orchestration, Skill OS, or hosted routing.

## Operating Cadence

Weekly:

- Publish or improve one piece of explanatory documentation.
- Add one concrete template, example, or case-study artifact.
- Improve one small piece of the manager or CLI that reduces adoption friction.
- Talk to at least one real user or community member about how they currently maintain skills.

Monthly:

- Ship one public release note.
- Promote one complete workflow story.
- Add or improve one platform path.
- Review positioning against adjacent projects.
- Update the roadmap with what the market actually responds to.

## Near-Term Next Steps

1. Validate the approved-only workflow with one real imported public skill.
2. Turn the blog draft into the first published launch essay.
3. Add a Chinese version of the launch essay.
4. Prepare GitBook and VitePress templates as the first adapter demos.
5. Collect early feedback from teams already using Claude Code, Codex, Cursor, or Antigravity.
6. Replace the static Pages prototype with the typed React manager once the workflow language stabilizes.
