# Research Brief: Why Skills Need Human Governance

This page collects the short evidence base behind Skills Charter. It is intentionally concise so the same points can be reused in the README, GitHub Pages copy, launch posts, or future docs.

## What The Public Evidence Shows

1. **Skills are no longer a tiny niche.** SkillsBench analyzed the public ecosystem and retained 47,150 unique skills from 6,323 repositories after deduplication.

2. **Real workflows are fragmented.** Official docs and community tools show users creating, copying, installing, editing, updating, and syncing `SKILL.md` files across personal folders, project folders, GitHub repos, and multiple agent clients.

3. **Security risk is real.** Snyk's ToxicSkills study found that 13.4% of 3,984 scanned skills had at least one critical-level security issue. SC Media also reported 341 malicious ClawHub skills spreading stealers, keyloggers, and backdoors.

4. **`SKILL.md` is operational text.** Recent research argues that `SKILL.md` is not passive documentation: its natural-language metadata and instructions influence which capabilities agents discover, select, trust, and execute.

5. **Scanners help, but governance still matters.** Cisco has released skill-scanning tools for IDE and CI workflows, but its own scanner describes itself as best-effort detection. Human review, provenance, and version control remain necessary.

## Skill Lifecycle Layers

The clearest market map is a five-layer skill lifecycle:

| Layer | Core question | Examples | Skills Charter stance |
| --- | --- | --- | --- |
| Creation | Where do skills come from? | Manual SOPs, `skill-creator`, Codex-generated packages, SkillClaw or SkillEvolver outputs | Candidate sources |
| Evaluation | Does the skill work and keep working? | Evals, benchmarks, trigger samples, regression reports, security scans | Evidence for review |
| Distribution | How are skills found, published, and installed? | Public directories, SkillNet, SkillRouter, `npx skills`, GitHub Actions/export adapters, verified catalogs, private registries | Upstream and downstream channels |
| Governance | Should this team trust it? | Provenance, owner, policy, PR review, approval, rollback, audit trail | Skills Charter owns this layer |
| Runtime | How is the skill loaded and enforced? | Claude, OpenAI, Copilot, Cursor, local agent folders, allowlists, MCP permissions | Downstream execution and enforcement |

Evaluation asks whether a skill works. Governance asks whether this team should trust it. That distinction keeps Skills Charter from becoming another creator, marketplace, registry, or runtime gateway.

## Positioning Copy

English:

> Agent Skills should receive a team-approved charter before runtime, not be downloaded like random prompt snippets. Skills Charter is the governance layer between skill creation/distribution and agent runtime: every skill becomes visible, reviewable, versioned, owned, and bounded before an agent can execute it.

Chinese:

> Agent Skills 不应该像随机 prompt 片段一样被随手下载，而应该在进入 runtime 前获得团队批准的 charter。Skills Charter 是 skill 的创建/分发与 agent runtime 之间的治理层：让每一项 skill 在被 agent 执行之前，都能被看见、审查、版本化、有明确责任人，并有运行边界。

## Sources

- [SkillsBench: Benchmarking How Well Agent Skills Work Across Diverse Tasks](https://www.skillsbench.ai/skillsbench.pdf)
- [Snyk ToxicSkills study](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/)
- [SC Media: OpenClaw agents targeted with 341 malicious ClawHub skills](https://www.scworld.com/news/openclaw-agents-targeted-with-341-malicious-clawhub-skills)
- [Anthropic Claude Agent Skills documentation](https://docs.claude.com/en/docs/agents-and-tools/agent-skills)
- [Cisco AI Agent Security Scanner for IDEs](https://blogs.cisco.com/ai/introducing-the-ai-agent-security-scanner-for-ides-verify-your-agents)
- [Cisco Skill Scanner repository](https://github.com/cisco-ai-defense/skill-scanner)
- [Under the Hood of SKILL.md: Semantic Supply-chain Attacks on AI Agent Skill Registry](https://arxiv.org/abs/2605.11418)
