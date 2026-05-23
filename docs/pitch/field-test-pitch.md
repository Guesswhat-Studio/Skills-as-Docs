# Skills Charter Field-Test Pitch

Purpose: use this to test whether the idea lands with friends, teammates, founders, infra engineers, AI-tool users, and docs/platform people. This is not a polished sales deck. The goal is to learn which parts feel obvious, confusing, exciting, or unnecessary.

## 15-Second Version

We are building Skills Charter: a Git-based workflow that helps individuals and teams turn Agent Skills into managed, reviewable, and iterated assets.

Today skill creation and distribution are messy. People copy skills from public repos, generate them with agents, or keep hand-edited `SKILL.md` files in local agent folders, but there are few trusted team sources. The real pain is not just editing a skill. It is who manages it, how it gets updated, how it gets reviewed, and when it becomes safe enough for the team to install.

In short:

> Every agent skill needs a charter before runtime.

## 60-Second Version

**Introduction:** Agent Skills are becoming the procedural memory of AI agents. A skill can include `SKILL.md`, references, scripts, examples, assets, and evaluation notes. Once installed, it can shape how an agent reviews code, runs tools, or follows team workflows.

**Gap:** The market still lacks a good tool for team skill authoring and maintenance. Skill production and distribution are fragmented across public repos, local directories, chat history, and personal agent configs. Teams have very few trusted sources, and they struggle to answer basic questions: who owns this skill, where did it come from, what changed, was it reviewed, can we roll it back, and who should install it?

**Solution:** Skills Charter turns a Git repository into the governance layer for team skills. A skill enters as a candidate and receives a Skill Charter: source, owner, evidence, install target, policy checks, approval status, and runtime constraints. Only approved charters produce installable runtime packages.

We are not trying to build another marketplace or registry. Skills Charter answers the earlier question:

> How does a skill become trusted enough for a team to publish and install?

## 3-Minute Version

**Introduction:** There is a new object forming in the AI workflow stack: the Agent Skill.

It sits somewhere between documentation, prompt, and software package. It is human-readable like docs, but it is executable in the sense that agents can load it and follow it during real work. That makes it powerful, but also risky, because it can gradually carry a team's SOPs, coding standards, research process, review criteria, and tool-use conventions.

**Gap:** The problem is not that people cannot write one skill. The problem is that skills are hard to organize into long-lived team assets.

For individuals, manually editing a local skill folder may be fine. For a team, it becomes messy fast:

- skills live in random chats, repos, docs, and agent directories
- public skills get installed without review
- generated skills sound plausible but may be incomplete
- scripts, external URLs, dependencies, and assets may hide risk
- nobody knows which version was installed when an agent made a bad decision
- non-engineers may understand the workflow but cannot safely change the package

The market is splitting into five layers: creation, evaluation, distribution, governance, and runtime. Creation tools, eval systems, marketplaces, registries, installers, runtime governance, and auto-evolution systems are all moving. What is still missing is a simple team workflow for turning a public, generated, or local skill into something owned, reviewed, versioned, approved, and installable.

The thesis is that skills need a team-approved charter before they become runtime memory.

**Solution:** Skills Charter gives teams a concrete loop:

```text
discover or generate
-> candidate skill
-> Skill Charter: owner, source, evidence, policy, and target agent
-> human review
-> lint and policy checks
-> approved registry
-> install into agent clients
-> observe and patch
```

The first product surface is a GitHub Pages manager plus CLI checks. It lets teams browse skill packages, edit `SKILL.md`, inspect risk, preview registry output, and generate install snippets only for approved packages.

The broader idea is bigger than the software: individuals and teams need to turn scattered instructions into assets, with owner, review, provenance, evidence, version history, install target, and rollback.

## The Wedge

The market is already moving, which is good. The clearest map is a five-layer lifecycle:

```text
Creation -> Evaluation -> Distribution -> Governance -> Runtime
```

Most adjacent products focus on creation, evaluation, distribution, or runtime. They do not yet solve how a team writes, reviews, updates, connects to owners and runtimes, and maintains skills together.

Skills Charter should not compete with all of them.

| Layer | Question | Examples | Our stance |
| --- | --- | --- | --- |
| Creation | Where do skills come from? | hand-authored SOPs, generated skills, evolved skills | candidate sources |
| Evaluation | Does the skill work? | evals, benchmarks, trigger tests, scanner reports | evidence for review |
| Distribution | How do skills move? | marketplaces, registries, `npx skills`, GitHub adapters | upstream/downstream channels |
| Governance | Should our team trust it? | provenance, ownership, CI, approval, rollback | Skills Charter owns this layer |
| Runtime | How does the agent use it? | Claude, Codex, Copilot, Cursor, allowlists | downstream execution |

One useful line:

> Evaluation asks whether a skill works. Governance asks whether our team should trust it.

## What To Ask People

Use these questions after the pitch. The answers matter more than whether they say "cool."

1. Do you or your team already use skills, prompts, rules, `AGENTS.md`, Claude skills, Copilot instructions, Cursor rules, or similar agent procedures?
2. Where do those artifacts live today?
3. Who owns them?
4. Have you ever copied or generated one and then edited it manually?
5. Would your team review a public or generated skill before installing it for everyone?
6. What would make a skill feel trustworthy enough to use at work?
7. Would GitHub PR review be natural for this, or would your team prefer GitBook, Notion, Feishu, Yuque, Obsidian, or another docs surface?
8. What sounds more valuable: authoring skills, reviewing imported skills, installing approved skills, or tracking evidence and rollback?
9. What part of this feels unnecessary or too heavy?
10. If this existed as an open-source starter repo, would you try it? Why or why not?

## Reactions To Listen For

Strong positive signals:

- "We already have this mess."
- "Our prompts/rules are scattered everywhere."
- "I would want this before installing public skills."
- "Non-engineers need to edit these, but we need review."
- "This should be a GitHub Action / PR template / repo template."
- "This is more like policy and docs than a marketplace."

Weak or confused signals:

- "Is this just a prompt manager?"
- "Why not just use a private registry?"
- "Why would I need this before I have many skills?"
- "This sounds too engineering-heavy."
- "I do not use skills yet."

If they are confused, do not argue. Ask which object they currently use instead: system prompts, project rules, workflow docs, coding-agent instructions, runbooks, or local scripts.

## Common Objections

### "Is this just prompt management?"

Not exactly. A prompt is usually text. A skill is a package: instructions, metadata, references, scripts, examples, assets, evidence, and install behavior. It needs package governance, not only prompt versioning.

### "Won't registries solve this?"

Registries help store and distribute trusted skills. They do not necessarily solve how a team reviews a public, generated, or evolved skill before it becomes trusted. Skills Charter is the pre-registry approval workflow.

### "This feels too heavy for small teams."

For one person, maybe. For a team, the moment skills affect code, files, tools, credentials, security review, or customer-facing work, review and rollback become useful quickly. The workflow can start lightweight: owner, source, review status, risk label, install command.

### "Can agents just improve skills automatically?"

They can help propose improvements. That makes governance more important, not less. Generated or evolved skills should enter as candidates with evidence, then humans decide what becomes team memory.

### "Why Git?"

Because Git already gives teams history, diffs, branches, PRs, CI, review, tags, and rollback. Skills Charter uses Git as the trust layer and leaves installation to existing skill tooling where possible.

## Short Demo Story

A research team wants to use Anthropic's public `skill-creator`.

Instead of installing it directly into everyone's agent environment, they import it into Skills Charter as a candidate. The manager shows the package files, owner, source, scripts, assets, links, risk labels, review notes, and evidence. CI checks the package. A reviewer approves it in Git. Only then does Skills Charter generate install snippets for the approved package.

This turns "copy a public skill and hope" into:

```text
public skill -> candidate -> review -> approved -> install
```

## One-Line Variants To Test

Try different lines with different people and see which one lands.

- "GitHub for team Agent Skills."
- "A review workflow for skills before agents use them."
- "Every Agent Skill needs a charter before runtime."
- "A trust gate between public/generated skills and team-wide installs."
- "Policy, provenance, and review for `SKILL.md` packages."
- "Do not install random agent memory. Review it first."

## What We Are Testing

We are not only testing whether people like the product. We are testing the category language.

Key unknowns:

- Do people understand "Agent Skill" yet?
- Does "skills as operational memory" land?
- Does "distribution is not trust" land, or is "governance between distribution and runtime" clearer?
- Is GitHub the right first surface?
- Do users want this as a repo template, CLI, GitHub Action, Pages manager, docs-platform template, or all of the above?
- Which persona feels the pain first: AI infra, platform engineering, security, DevRel/docs, research ops, or power users?

## Closing Ask

End with something concrete:

> Does this feel like a real problem in your workflow, or does it sound like infrastructure for a future that has not arrived yet?

Then ask:

> If it is real, what would be the first painful situation where you would want this?
