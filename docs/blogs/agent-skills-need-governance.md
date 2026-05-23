---
title: "Every Agent Skill Needs a Charter Before Runtime"
description: "Creation, evaluation, and distribution can move agent skills quickly. Teams still need a chartered trust gate before runtime."
date: "2026-05-20"
author: "Skills Charter"
tags:
  - Agent Skills
  - Skills Charter
  - Skill Governance
  - SKILL.md
  - Team Skill Libraries
---

# Every Agent Skill Needs a Charter Before Runtime

Agent skills are moving faster than most teams have noticed, and the missing object is no longer another prompt record or marketplace listing.

It is a charter.

A few months ago, a "skill" still sounded like a better prompt in a nicer folder. Now the shape is clearer: skills are becoming the procedural layer between human intent and agent execution. They teach agents how a team reviews code, drafts documents, handles incidents, uses design tools, queries internal systems, or turns repeated work into reliable workflows.

Claude is already moving in this direction. Anthropic now talks about organization-wide skill management, partner-built skill directories, and an open Agent Skills standard. Their skill-creator work adds evals, benchmarks, A/B comparisons, and trigger tuning. GitHub Copilot, OpenAI, BMAD, SkillClaw, SkillNet, SkillRouter, and research projects are all circling the same center: agent behavior will not be governed by prompts alone. It will be governed by reusable procedural artifacts.

That is the good news.

The uncomfortable part is this: most teams are still managing these artifacts like loose snippets.

They copy a skill from a public repo. They let an agent generate one from a chat. They tweak `SKILL.md` locally. They install a folder into `.claude/skills`, `.agents/skills`, or a personal runtime directory. Then the skill starts influencing tool use, file edits, scripts, external services, and team decisions.

At that point, it is no longer just a prompt.

It is operational memory.

> **Key Takeaways**
> - Agent skills are becoming a real infrastructure layer, not just reusable prompts.
> - The lifecycle is splitting into creation, evaluation, distribution, governance, and runtime.
> - Distribution is necessary, but distribution is not trust.
> - The missing object is a Skill Charter between distributed candidate packages and runtime execution.
> - Teams should treat public, generated, and evolved skills as candidates before they become shared runtime memory.

## The Five-Layer Skill Lifecycle

The market is easier to understand if we stop treating every adjacent product as "a skill platform." A skill moves through a lifecycle:

```text
Creation -> Evaluation -> Distribution -> Governance -> Runtime
```

Each layer answers a different question.

| Layer | What it answers | Examples | Skills Charter stance |
| --- | --- | --- | --- |
| Creation | Where do skills come from? | Hand-authored SOPs, `skill-creator`, Codex-generated packages, SkillClaw or SkillEvolver outputs | Candidate sources |
| Evaluation | Does the skill work and keep working? | Evals, benchmarks, trigger tests, regression reports, security scans | Evidence for review |
| Distribution | How are skills found, published, and installed? | Public directories, SkillNet, SkillRouter, `npx skills`, GitHub Actions/export adapters, verified catalogs, private registries | Upstream and downstream channels |
| Governance | Should this team trust it? | Provenance, ownership, policy checks, PR review, approval, rollback, audit trail | Skills Charter owns this layer |
| Runtime | How is the skill loaded and enforced? | Claude, OpenAI, Copilot, Cursor, allowlists, MCP permissions, GitHub `agent-governance` | Downstream execution and enforcement |

Evaluation asks whether a skill works.

Distribution asks how the skill moves.

Governance asks whether this team should trust it before runtime.

That distinction is the whole wedge.

## Skill Creation Is Getting Easier. Skill Governance Is Becoming The Bottleneck.

Anthropic's skill-creator update is a useful signal. It does not merely help people write skills. It helps them test whether a skill works, benchmark it across changes, compare skill versions, and tune descriptions so the skill triggers at the right time.

That matters because many skill authors are subject matter experts, not engineers. They understand the workflow. They may not know how to build tests, measure regressions, or reason about model drift.

This is exactly where the next bottleneck appears.

If domain experts can create skills, and agents can help refine skills, and tools like SkillClaw or SkillEvolver can generate skills from usage traces, then the scarce resource is no longer skill creation.

The scarce resource is trust.

Who decides whether the generated skill is good enough?

Who checks whether it includes unsafe instructions?

Who reviews scripts, external URLs, dependencies, and file access?

Who knows which version was installed when an agent made a bad decision?

Who can roll it back?

Creation without governance produces skill sprawl. Governance turns skills into team assets.

## Distribution Is Necessary. It Is Not Trust.

Once we use the five-layer model, marketplaces and registries belong in the distribution layer.

That changes the argument.

The point is not that governance comes before distribution. A team may discover a skill through a marketplace, pull it from a public repo, receive it from a partner catalog, install it through a CLI, or publish it into a private registry. Distribution is how skills move through the ecosystem.

The point is that distribution does not answer the trust question.

A distributed skill may be popular but stale.

It may be verified in a general catalog but still wrong for your stack.

It may include scripts, external URLs, dependencies, assets, or instructions that deserve team review.

It may come with eval evidence, but that evidence may not cover your environment, model, tools, or risk tolerance.

Even when a skill is not malicious, it can still be wrong for your context.

SWE-Skills-Bench-style findings point in the same direction: more skills do not automatically mean better agent performance. A skill that is stale, vague, over-broad, or mismatched to the task can produce no benefit or even degrade results.

So the pattern should not be:

```text
discover -> install -> hope
```

It should be:

```text
create or discover -> evaluate -> distribute as a candidate -> govern -> runtime install -> observe -> patch
```

That governance gate is the difference between a distribution channel and an operating model for team knowledge.

## Every Skill Needs a Charter Before Runtime

The simplest mental model is this:

> A skill is an operational capability. A Skill Charter is the contract that decides whether it can enter runtime.

Skills are not just instructions. They are how a team says, "This is how we work here."

A code review skill might encode security checks, tone expectations, test strategy, and escalation rules.

A release skill might encode changelog format, versioning policy, rollback steps, and stakeholder updates.

A legal review skill might encode criteria, red flags, and required human approval.

A content skill might encode brand voice, citation rules, schema expectations, and publishing workflow.

These artifacts remain human-readable, but they are not passive documents. They are executable procedural memory.

That means every team-approved skill needs a charter with:

- ownership
- review
- version history
- approval status
- change discussion
- evidence
- tests
- rollback
- distribution context
- runtime constraints

This is why Git is such a natural substrate. Not because everyone loves Git, but because Git already knows how to handle trusted change.

## The New Supply Chain: Public, Generated, Evolved

The next wave of skills will come from three sources.

First, public skills. These come from open repositories, partner directories, marketplaces, examples, and community packs.

Second, generated skills. Claude skill-creator, Codex, internal agents, and workflow tools will help teams turn SOPs into `SKILL.md` packages.

Third, evolved skills. Systems like SkillClaw and research like SkillEvolver point toward a future where agents learn from prior sessions, failures, and repeated corrections.

All three are useful. All three are risky if they bypass review.

A public skill can be useful but untrusted.

A generated skill can be plausible but incomplete.

An evolved skill can capture experience but overfit to one failure.

The right abstraction is not "skill." It is "candidate skill."

A candidate skill should not become team memory until it passes through a trusted path.

```text
Candidate skill
  -> source and distribution channel captured
  -> eval evidence attached
  -> provenance check
  -> lint and risk scan
  -> human review
  -> approved runtime install
```

This is the heart of Skills Charter: a candidate skill does not become team memory until its charter is approved.

## What A Trusted Skill Path Looks Like

A team skill library should feel boring in the best possible way.

A new skill enters the repo under `skills/<name>/`. Its `SKILL.md` explains when to use it and what it does. Supporting files live nearby: references, templates, examples, scripts, assets, evals, and reports.

The team reviews it like a document and like code.

The reviewer checks whether the trigger description is precise. Too broad and the agent will use it at the wrong time. Too narrow and it will never fire. The reviewer checks whether the first action is obvious. The reviewer checks scripts, external links, and dependencies. If the skill came from a public source, the reviewer checks provenance. If the skill was generated or evolved, the reviewer checks the evidence.

CI validates the package. The approved library view updates only when the package passes. Installation snippets point to approved skills, not arbitrary folders.

Then agents install from the trusted repo.

If the skill later causes a bad result, the team has a trail: what changed, who approved it, what evidence existed, and how to roll it back.

That is the governance layer.

## Why This Is Not A Prompt Manager

Prompt managers are important, but skills are a different object.

A prompt is usually a text artifact. A skill is a package. It can include instructions, frontmatter, references, scripts, examples, assets, schemas, and evaluation results. It lives on disk. It is installed into agent runtimes. It may guide tool calls and file edits.

That makes it closer to a lightweight software package than a saved prompt.

But it also remains human-readable. That is the opportunity.

Skills sit between documentation and code:

```text
readable enough for humans to review
structured enough for agents to execute
versioned enough for teams to trust
```

This is why the missing object is a charter, not another prompt record or marketplace listing.

The goal is not to hide team knowledge inside a dashboard.

The goal is to make team knowledge readable, reviewable, installable, and reversible.

## The Competitive Boundary Is Getting Clearer

The market is not empty anymore. That is a good thing.

NVIDIA Verified Agent Skills and JFrog's Agent Skills Registry show that enterprise teams will want verified catalogs, private registries, signing, scanning, access control, and audit trails. Runtime governance projects, such as GitHub's `agent-governance` skill and allowlist-based permission systems, show that teams also need controls over what agents can do after skills are available.

Those are adjacent layers. Skills Charter should not try to be all of them.

The sharper boundary is lifecycle-based:

| Lifecycle layer | Products around it | What Skills Charter should do |
| --- | --- | --- |
| Creation | Skill creators, docs tools, auto-evolution systems | Import their outputs as candidates |
| Evaluation | Evals, benchmark reports, trigger tests, scanners | Attach their results as review evidence |
| Distribution | Marketplaces, directories, installers, registries | Feed or consume channels without becoming the channel |
| Governance | Team ownership, provenance, policy, PR review, approval, rollback | Own this layer |
| Runtime | Agent clients, permission gateways, allowlists, MCP controls | Prepare approved packages for execution |

This is the product wedge:

> Creation makes candidates. Evaluation makes evidence. Distribution moves packages. Skills Charter decides what becomes trusted enough for runtime.

## What We Should Build First

The first product does not need to be a full platform.

It needs to make the right workflow obvious.

A GitHub Pages manager is enough to prove the pattern:

- browse team skills
- edit `SKILL.md`
- inspect package files
- preview registry output
- show install commands
- label risk
- attach review notes
- open a PR
- install approved skills through existing tooling

The CLI should automate boring checks, not replace the installer ecosystem. `npx skills` can remain the installation path. Skills Charter should own the review and governance path between distribution and runtime.

The first roadmap should prioritize:

- candidate / approved / deprecated lifecycle
- owner and review checklist
- risk labels for scripts, binaries, external URLs, and dependencies
- registry drift checks
- eval and report conventions
- import from public repo, local folder, existing agent directory, or generated candidate
- docs-platform templates for teams that already write in GitBook, VitePress, Obsidian, Feishu, Yuque, or internal knowledge bases

Do not confuse distribution with trust.

Do not build hosted execution first.

Do not build proxy-based auto-learning first.

Let others generate, evaluate, and distribute more skills. Help teams decide which ones become trusted enough to run.

## The Thesis

Agent skills are going to multiply.

Some will be written by experts. Some will be generated by agents. Some will be evolved from failures. Some will come from public directories and partner ecosystems. The winning teams will not be the ones that install the most skills. They will be the ones that maintain the right skills with the least ambiguity.

That requires a new operating model:

> Issue a charter. Review it like code. Install only what your team trusts.

The future of agent work is not just better models. It is better memory, better procedures, and better governance around the artifacts that teach agents how a team works.

After skills are distributed, but before they become runtime memory, teams need a governance gate.

That is what Skills Charter is for.

## Sources And Signals

- Anthropic: [Skills for organizations, partners, the ecosystem](https://claude.com/blog/organization-skills-and-directory)
- Anthropic: [A complete guide to building skills for Claude](https://claude.com/blog/complete-guide-to-building-skills-for-claude)
- Anthropic: [Improving skill-creator](https://claude.com/blog/improving-skill-creator-test-measure-and-refine-agent-skills)
- AgriciDaniel: [claude-blog skill suite](https://github.com/AgriciDaniel/claude-blog)
- AMAP-ML: [SkillClaw](https://github.com/AMAP-ML/SkillClaw)
- arXiv: [SkillEvolver](https://arxiv.org/html/2605.10500v1)
- NVIDIA: [Verified Agent Skills provide capability governance for AI agents](https://developer.nvidia.com/blog/nvidia-verified-agent-skills-provide-capability-governance-for-ai-agents/)
- arXiv: [SkillsVote](https://arxiv.org/abs/2605.18401)
- GitHub: [`agent-governance` skill in awesome-copilot](https://github.com/github/awesome-copilot/blob/main/skills/agent-governance/SKILL.md)
- AIQuinta: [AI agent governance: skill permissions and allowlist tools](https://aiquinta.ai/blog/ai-agent-governance-skill-permissions-allowlist-tools/)
- JFrog: [AI Catalog Skills Registry](https://jfrog.com/ai-catalog/skills-registry/)
