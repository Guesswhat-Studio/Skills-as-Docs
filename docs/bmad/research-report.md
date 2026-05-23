# Research Report: Skills Charter Market Positioning

- **Date:** 2026-05-20
- **Research Type:** BMAD market and positioning analysis
- **Status:** Draft for README, GitHub Pages, and pitch reuse

---

## Executive Summary

Skills Charter should be positioned as the **trusted governance layer for team-owned Agent Skill libraries**.

The market is validating the core premise quickly. OpenAI, Anthropic, GitHub Copilot, BMAD, SkillNet, SkillRouter, SkillClaw, and recent research all point in the same direction: `SKILL.md` packages are becoming a real operational layer for agents. The market can be mapped into five lifecycle layers: **Creation, Evaluation, Distribution, Governance, and Runtime**. Creation, evaluation, distribution, and runtime are all moving quickly. The underserved gap is **reviewable, Git-backed, team-controlled skill governance before skills enter an agent runtime**.

The strongest message is:

> Every agent skill needs a charter before runtime.

The strategic wedge is not "another skill creator" or "another marketplace." It is a repeatable operating model for private/team skills:

```text
Creation -> Evaluation -> Distribution -> Governance -> Runtime
candidate skill -> Skill Charter + evidence -> human review -> approved install -> feedback -> reviewed patch
```

---

## 1. Research Objectives

This report answers four questions:

1. What is Skills Charter actually selling?
2. Which market categories are adjacent competitors, and which are complementary?
3. How do new signals such as BMAD, Claude skill-creator, SkillClaw, and SkillEvolver affect positioning?
4. What should the roadmap emphasize to win by category clarity rather than feature breadth?

In scope:

- Agent Skills ecosystem and skill package workflows.
- Private/team skill library governance.
- Creation, evaluation, distribution, governance, and runtime competitors or complements.
- Security and quality risks that support a governance story.

Out of scope:

- Detailed TAM sizing.
- Paid SaaS pricing.
- Full implementation PRD.

---

## 2. Market Signals

### Signal 1: Skills Are Becoming A Cross-Platform Primitive

OpenAI describes skills as reusable workflows, usually centered on `SKILL.md`, with resources such as templates, examples, brand guidelines, schemas, or tool access. OpenAI also frames `SKILL.md` as Markdown-based, portable, shareable, versionable, and aligned with an open standard.

GitHub Copilot now documents agent skills as folders containing `SKILL.md`, scripts, and resources. Copilot supports project-level skill directories such as `.github/skills`, `.claude/skills`, and `.agents/skills`, plus personal directories such as `~/.copilot/skills` and `~/.agents/skills`.

BMAD v6 uses skills as IDE-invoked workflow units. Its installer generates one skill per agent, workflow, task, or tool; examples include PRD, architecture, epics, code review, and quick-dev workflows.

**Implication:** Skills Charter should not explain why skills exist from scratch. The market is already doing that. Skills Charter should explain why skills need ownership, review, provenance, CI, and rollback once teams rely on them.

### Signal 2: Creation And Evaluation Are Being Productized

Anthropic's skill-creator update adds evals, benchmarks, multi-agent evaluation, A/B comparisons, and trigger-description tuning. Their framing is important: skill authors are often domain experts, not engineers, and they need confidence that a skill works, triggers correctly, and still helps after model changes.

SkillNet positions itself as an npm-like platform for AI capabilities. It supports search, install, create-from-sources, evaluation across quality dimensions, and relationship analysis.

**Implication:** Skills Charter should not try to beat creator/eval tools immediately. It should ingest their outputs as evidence. A generated skill, eval report, benchmark result, or trigger-tuning suggestion should become review material inside a Git PR.

### Signal 3: Public Discovery And Execution Are Crowded

`npx skills` already covers cross-agent installation and supports many agent targets. SkillRouter and SkillsRouter focus on public skill discovery, validation, routing, cloud execution, auth, and observability. SkillNet focuses on community-scale search, creation, evaluation, and relationship graphs.

**Implication:** Marketplace and execution are bad first wedges. They require trust, moderation, payments, hosted compute, auth, and reliability. Skills Charter should delegate install mechanics to `npx skills` and stay upstream as the source-of-truth and governance layer.

### Signal 4: Automatic Skill Evolution Creates A New Governance Need

SkillClaw captures real session data through a local proxy, then uses an optional evolve server to create, deduplicate, refine, validate, and sync skills across users, devices, and agents.

SkillEvolver research shows that iterative skill refinement can outperform one-pass skill creation and human-curated baselines in some benchmark settings. It also documents failure modes: overfitting to the training domain, regression after refinement, missing coverage of passing traces, and skills that fail because the description does not trigger correctly.

**Implication:** Auto-evolution is not a threat to Skills Charter. It is a source of candidate changes. The right stance is: "Let tools generate and evolve skills, but review evolved skills before they become team memory."

### Signal 5: Quality And Security Risks Support The Governance Story

The agent-skills survey frames skills around a lifecycle: representation, acquisition, retrieval, and evolution. It names open challenges in quality control, interoperability, safe updating, and long-term capability management.

Security research collected 238,180 unique skills from marketplaces and GitHub and found that repository context materially changes classification results. It also identified real-world attack vectors such as abandoned repository hijacking.

SWE-Skills-Bench found that public software-engineering skills often provide limited marginal utility: 39 of 49 tested skills produced zero pass-rate improvement, average gain was only +1.2%, and some degraded performance due to version-mismatched guidance.

**Implication:** Skills Charter should be anti-volume and pro-fit. The pitch should not be "install more skills." It should be "approve fewer, better, context-compatible skills."

### Five-Layer Skill Lifecycle Model

This framing keeps adjacent products from collapsing into one vague "skill platform" category:

| Lifecycle layer | Core question | Examples and signals | Skills Charter stance |
| --- | --- | --- | --- |
| Creation | Where do skills come from? | Manual SOPs, domain-expert authoring, Claude `skill-creator`, Codex-generated packages, SkillClaw or SkillEvolver outputs | Candidate sources |
| Evaluation | Does the skill work and keep working? | Evals, benchmarks, trigger samples, regression reports, security scans, model-change comparisons | Evidence for review |
| Distribution | How are skills found, published, and installed? | Public directories, SkillNet, SkillRouter, `npx skills`, GitHub Actions/export adapters, verified catalogs, private registries | Upstream and downstream channels |
| Governance | Should this team trust it? | Provenance, owner, policy, PR review, approval, rollback, audit trail | Skills Charter owns this layer |
| Runtime | How is the skill loaded and enforced? | OpenAI, Claude, Copilot, Cursor, local runtime folders, allowlists, GitHub `agent-governance`, MCP permissions | Downstream execution and enforcement |

Evaluation asks whether a skill works. Governance asks whether this team should trust it. Skills Charter should remain the governance layer that converts public, generated, or evolved candidates into reviewed team memory before runtime.

---

## 3. Target Users And Jobs To Be Done

### Primary Segment: AI-Forward Engineering Teams

These teams use Codex, Claude Code, Copilot, Cursor, or similar agents for real work. They have repeated workflows such as code review, release notes, incident triage, docs updates, migration playbooks, and architecture review.

Job:

> When our team starts relying on agent skills, we want a trusted source of truth so agents follow approved procedures without everyone copying random Markdown into local runtime folders.

Pain:

- Skills live in local directories with weak visibility.
- People copy public skills without review.
- Team conventions drift across agents and machines.
- Generated or evolved skills have no approval path.
- No one knows which skill version produced a bad result.

### Secondary Segment: Docs, DevRel, Product Ops, And Research Teams

These teams own procedures but are not always engineers. They already maintain SOPs, playbooks, rubrics, templates, and examples.

Job:

> When I document a repeatable workflow, I want it to become agent-executable without losing human readability or review.

Pain:

- Existing docs are readable by humans but not packaged for agents.
- Existing prompts are executable-ish but not governed.
- Docs tools and agent runtime directories are disconnected.

### Tertiary Segment: Security And Platform Teams

These teams care about supply chain risk, provenance, policy, and incident response.

Job:

> When employees import or generate agent skills, I want a review trail, risk signal, and rollback path before those skills can guide tools or run scripts.

Pain:

- Skills can include scripts, external URLs, dependencies, and instructions that steer tool use.
- Public discovery marketplaces introduce provenance and hijacking risk.
- Auto-generated skills can preserve bad assumptions or unsafe behavior.

---

## 4. Competitive Landscape

| Category | Lifecycle layer | Examples | What They Solve | Gap Skills Charter Should Own |
| --- | --- | --- | --- | --- |
| Platform-native skills | Creation / Runtime | OpenAI Skills, Claude Skills, GitHub Copilot agent skills | Runtime support, creation, product-specific UX | Cross-platform team governance and Git source of truth |
| Structured workflow packs | Creation | BMAD | Product/engineering workflows packaged as skills | Managing and approving skill libraries, not just using one methodology |
| Install tooling | Distribution | `npx skills`, GitHub Actions/export adapters | Cross-agent installation and materialization | Review, registry, policy, and docs-native authoring before install |
| Public marketplaces and search | Distribution / Evaluation | SkillNet, SkillsRouter, SkillHub, skills.sh-style indexes | Discovery, community scale, evaluation, cloud execution | Private/team-owned libraries and trusted internal approval |
| Verified catalogs and registries | Distribution / Governance-adjacent | NVIDIA Verified Skills, JFrog Skills Registry | Scanned, signed, access-controlled skill distribution | Pre-registry review path and team-specific trust decisions |
| Skill routing and execution APIs | Runtime | SkillRouter | Runtime discovery, auth, execution, observability | Human approval and repository governance before runtime |
| Auto-evolution systems | Creation / Evaluation | SkillClaw, SkillEvolver | Generate/refine skills from traces and task attempts | Candidate-to-approved lifecycle, provenance, review, and rollback |
| Prompt/eval platforms | Evaluation | LangSmith, PromptLayer, Langfuse, Braintrust | App prompts, evals, observability | Filesystem skill packages, docs-native SOPs, agent-client installation |
| Docs platforms | Creation | GitBook, Mintlify, VitePress, MkDocs, Feishu, Yuque | Human docs, AI-readable docs, site publishing | Installable `SKILL.md` package governance and agent distribution |

---

## 5. Positioning

### Category

Skills Charter is not a marketplace, prompt manager, or auto-evolver.

It is:

> A Git-backed governance workspace for team-owned Agent Skill packages.

In the five-layer lifecycle, Skills Charter owns **Governance**: the trust decision between Creation/Evaluation/Distribution inputs and Runtime execution.

Alternative category phrases:

- Skills Charter toolkit
- Agent skill supply-chain governance
- Team skill library manager
- Git-native control plane for agent skill governance

### One-Line Pitch

> Skills Charter turns a Git repository into the trusted source of truth for reviewable, installable team skills.

### Short Pitch

> Teams are starting to create, import, and auto-generate Agent Skills. But a skill can influence tool use, run scripts, encode policy, and quietly change agent behavior. Skills Charter gives teams a Git-backed manager for reviewing, validating, versioning, and distributing approved `SKILL.md` packages across agent clients.

### Tagline Options

1. Every agent skill needs a charter before runtime.
2. Review evolved skills before they become team memory.
3. The trusted path from `SKILL.md` to agent runtime.
4. A source of truth for team-owned Agent Skills.
5. Install only the skills your team trusts.

### Best Current Tagline

> Issue a charter. Review it like code. Install only what your team trusts.

---

## 6. Core Value Proposition

### Functional Value

- Browse and edit skill packages in a human-friendly Pages manager.
- Keep skill packages in Git with owners, history, PRs, tags, and rollback.
- Generate and preview `skills.json` registries and `npx skills` install commands.
- Lint metadata, package boundaries, links, scripts, assets, and registry drift.
- Track review status: candidate, approved, deprecated, retired.
- Store evidence: evals, trigger samples, failure traces, review notes, and risk reports.

### Strategic Value

- Converts team procedures into durable agent memory.
- Prevents local skill-folder drift across people and tools.
- Creates a safe intake path for public, generated, and evolved skills.
- Lets docs teams contribute without editing agent configs directly.
- Keeps the project platform-agnostic instead of depending on one agent client.

### Emotional Value

- Gives teams confidence that agents are following reviewed playbooks.
- Makes skill changes visible instead of hidden in chats or local directories.
- Makes "why did the agent do that?" answerable through Git history and review evidence.

---

## 7. Gap Analysis

### Gap 1: Candidate-To-Approved Workflow

Most tools assume a skill is either created or installed. Teams need an intermediate state:

```text
imported / generated / evolved -> candidate -> reviewed -> approved -> installed
```

This is the clearest product gap.

### Gap 2: Human-Readable Governance For Non-Engineers

Domain experts can write procedures, but Git PRs and agent runtime folders are intimidating. The Pages manager should make skill review feel like editing docs while preserving Git discipline.

### Gap 3: Evidence-Aware Skill Review

Claude, SkillNet, SkillClaw, and SkillEvolver all produce or imply evidence: evals, traces, benchmark results, trigger samples, validation scores, and failure analysis. Skills Charter can become the place where this evidence is attached to the skill package before approval.

### Gap 4: Private Library Over Public Marketplace

Public skill marketplaces optimize for discovery and volume. Teams need internal trust, local conventions, and context compatibility. This is a different problem and a better early wedge.

### Gap 5: Security And Supply Chain Context

Security scanners alone are not enough. Repository provenance, ownership, abandonment risk, script review, dependency review, and change history all matter. A Git-native workflow is naturally aligned with this need.

---

## 8. Roadmap Implications

### Must Have

- Skill lifecycle status: `candidate`, `approved`, `deprecated`, `retired`.
- Package owners and review checklist.
- Risk labels for scripts, binaries, external URLs, large assets, secrets, and dependencies.
- Registry preview and drift check.
- `npx skills` install snippets for approved packages only.
- Import flow from GitHub URL, local folder, existing agent skills directory, and generated/evolved candidate folder.
- PR-ready diff and review notes.

### Should Have

- `evals/` and `reports/` conventions.
- Trigger sample lint: false-positive and false-negative examples.
- Primary-action lint: ensure the first action is obvious when the skill is loaded.
- Provenance metadata: source URL, source commit, generator/evolver, imported by, approved by.
- Docs-platform templates: GitBook, VitePress, MkDocs, Obsidian, Feishu, Yuque.

### Could Have

- Native eval runner.
- SkillNet/SkillClaw import adapters.
- Marketplace submission/export.
- Skill relationship graph.
- Hosted optional dashboard.

### Won't Have For Now

- Public marketplace.
- Hosted skill execution.
- Proxy-based session capture.
- A competing universal installer.
- Fully automatic publish of evolved skills.

---

## 9. Recommended Market Narrative

### The Problem

Agent skills are moving from novelty to infrastructure. They can encode workflows, call scripts, reference files, and steer agent behavior. But most teams still manage them like loose prompts: copied into local folders, imported from public repos, or generated from chats without review.

### The Insight

Skills are operational documents for agents. Operational documents need owners, review, provenance, tests, and rollback.

### The Product

Skills Charter gives teams a Git-backed workspace for turning `SKILL.md` packages into reviewed, installable, traceable team assets.

### The Differentiation

- Unlike skill creators, Skills Charter manages the team library after creation.
- Unlike evaluation tools, Skills Charter decides whether evidence is sufficient for team trust.
- Unlike marketplaces, Skills Charter focuses on private trust and governance.
- Unlike registries and installers, Skills Charter owns the approval path before distribution or installation.
- Unlike routers/execution APIs, Skills Charter acts before runtime.
- Unlike auto-evolvers, Skills Charter reviews candidate changes before they become shared memory.
- Unlike prompt managers, Skills Charter works with filesystem skill packages, resources, scripts, registries, and agent install paths.

### The Proof

The ecosystem itself is moving in this direction: platform vendors now support skills, creation tools are adding evals, marketplaces are scaling discovery, registries are formalizing distribution, auto-evolution systems are producing candidate skills, and research is surfacing quality/security risks. The missing layer is governance.

---

## 10. Strategic Recommendation

Primary recommendation:

> Make Skills Charter the default open pattern for private/team skill governance, not a marketplace or auto-evolution tool.

Immediate actions:

1. Update README and Pages copy around "trusted governance layer for team-owned Agent Skills."
2. Add lifecycle vocabulary: creation, evaluation, distribution, governance, runtime; candidate, reviewed, approved, deprecated, retired.
3. Add "review evolved skills before they become team memory" to the pitch.
4. Add a simple `reports/` or `evals/` convention to show where Claude skill-creator, SkillNet, SkillClaw, or manual evidence can land.
5. Create one case study: "A public or generated skill enters as a candidate, gets reviewed, patched, approved, and installed."

Actions to avoid:

- Do not compete with `npx skills`.
- Do not lead with public marketplace discovery.
- Do not build proxy-based auto-learning first.
- Do not promise that more skills always improve agents.
- Do not position as a generic prompt manager.

---

## 11. Source Notes

- OpenAI Academy, "Using skills" and OpenAI Help Center, "Skills in ChatGPT": skills as reusable workflows, `SKILL.md`, portability, open standard, Codex/API support.
- GitHub Docs, "Adding agent skills for GitHub Copilot": Copilot skill structure, project/personal directories, `SKILL.md` metadata.
- Anthropic, "Improving skill-creator: Test, measure, and refine Agent Skills" (2026-03-03): evals, benchmarks, multi-agent evaluation, A/B comparisons, trigger tuning.
- BMAD Method docs and `xmm/codex-bmad-skills`: skills as IDE-invoked workflow units and Codex-adapted BMAD intents.
- Vercel Labs `skills`: `npx skills` as cross-agent install layer.
- SkillNet and SkillRouter docs: public discovery, evaluation, routing, execution, and skill graph direction.
- AMAP-ML SkillClaw README: proxy plus evolve-server pattern for collective skill evolution.
- arXiv:2605.10500v1, "SkillEvolver: Skill Learning as a Meta-Skill": iterative skill refinement and documented failure modes.
- arXiv:2605.07358v1, "A Comprehensive Survey on Agent Skills": lifecycle framing and governance challenges.
- arXiv:2603.16572, "Malicious Or Not": repository-context security analysis and abandoned repository hijacking risk.
- arXiv:2603.15401, "SWE-Skills-Bench": evidence that skill utility depends strongly on domain fit and context compatibility.

---

## Next BMAD Intent

Recommended next intent: `bmad:prioritize`.

Reason: the positioning is now clear enough to translate into roadmap scope and README/Page copy changes.
