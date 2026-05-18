# Research Brief: Why Skills Need Human Governance

This page collects the short evidence base behind Agent SkillDocs. It is intentionally concise so the same points can be reused in the README, GitHub Pages copy, launch posts, or future docs.

## What The Public Evidence Shows

1. **Skills are no longer a tiny niche.** SkillsBench analyzed the public ecosystem and retained 47,150 unique skills from 6,323 repositories after deduplication.

2. **Real workflows are fragmented.** Official docs and community tools show users creating, copying, installing, editing, updating, and syncing `SKILL.md` files across personal folders, project folders, GitHub repos, and multiple agent clients.

3. **Security risk is real.** Snyk's ToxicSkills study found that 13.4% of 3,984 scanned skills had at least one critical-level security issue. SC Media also reported 341 malicious ClawHub skills spreading stealers, keyloggers, and backdoors.

4. **`SKILL.md` is operational text.** Recent research argues that `SKILL.md` is not passive documentation: its natural-language metadata and instructions influence which capabilities agents discover, select, trust, and execute.

5. **Scanners help, but governance still matters.** Cisco has released skill-scanning tools for IDE and CI workflows, but its own scanner describes itself as best-effort detection. Human review, provenance, and version control remain necessary.

## Positioning Copy

English:

> Agent Skills should be managed like operational security assets, not downloaded like random prompt snippets. SkillDocs makes every skill visible, reviewable, versioned, and owned before an agent can execute it.

Chinese:

> Agent Skills 不应该像随机 prompt 片段一样被随手下载，而应该像运行文档和安全资产一样被管理。SkillDocs 让每一项 skill 在被 agent 执行之前，都能被看见、审查、版本化，并有明确责任人。

## Sources

- [SkillsBench: Benchmarking How Well Agent Skills Work Across Diverse Tasks](https://www.skillsbench.ai/skillsbench.pdf)
- [Snyk ToxicSkills study](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/)
- [SC Media: OpenClaw agents targeted with 341 malicious ClawHub skills](https://www.scworld.com/news/openclaw-agents-targeted-with-341-malicious-clawhub-skills)
- [Anthropic Claude Agent Skills documentation](https://docs.claude.com/en/docs/agents-and-tools/agent-skills)
- [Cisco AI Agent Security Scanner for IDEs](https://blogs.cisco.com/ai/introducing-the-ai-agent-security-scanner-for-ides-verify-your-agents)
- [Cisco Skill Scanner repository](https://github.com/cisco-ai-defense/skill-scanner)
- [Under the Hood of SKILL.md: Semantic Supply-chain Attacks on AI Agent Skill Registry](https://arxiv.org/abs/2605.11418)
