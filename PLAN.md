# Agent SkillDocs Project Plan

Status: market-updated and naming-updated on 2026-05-17

## 0. Current Decision

This project should be positioned as a paradigm and toolkit, not as a marketplace, hosted SaaS, or another prompt manager.

Core thesis:

> Turn the docs systems teams already use into visual management layers for Agent Skills, while Git remains the trusted distribution layer agents can install from.

中文一句话：

> 文档平台负责让人共创、审查和维护 skills，Git 负责让 agents 可信安装、更新和追溯同一份 `SKILL.md`。

The market already has:

- Agent Skills standards and client support.
- Public skill marketplaces.
- Prompt management platforms.
- AI-ready documentation platforms.
- Feishu/Yuque/Notion/Obsidian-style knowledge workflows.

The open gap is:

> Teams do not yet have a simple, open, docs-native way to govern their own private skill libraries across humans, Git, and multiple agent clients.

Public naming decision:

- Project name: **Agent SkillDocs**
- Short name: **SkillDocs**
- CLI name: `skilldocs`
- Paradigm name: **Skills-as-Docs**
- Core loop name: **The SkillDocs Loop**

Rationale:

- "Agent SkillDocs" makes the idea legible at first glance: these are docs for agent skills.
- "SkillDocs" is shorter and easier to remember than "Skills-as-Docs Kit".
- "Skills-as-Docs" remains the paradigm and essay title, not necessarily the product name.
- Avoid "SkillBook", "SkillFlow", "SkillOps", and "SkillPort" because those names are already crowded or too close to existing agent-skill projects.

## 1. One-Line Positioning

English:

> Manage skills like docs. Distribute them like code.

Chinese:

> 像管理文档一样管理 Agent Skills，像分发代码一样分发给 AI agents。

Expanded:

> Agent SkillDocs is a Markdown-first, Git-backed workflow for turning team knowledge, SOPs, playbooks, and repeated AI instructions into installable Agent Skills.

The project promotes a new Human + LLM collaboration model:

- Humans write and review operational knowledge in familiar docs tools.
- Git preserves version history, review, CI, provenance, and release tags.
- Agent clients install or update the same `SKILL.md` files as executable procedural memory.

## 2. Paradigm Thesis

`SKILL.md` is not just a prompt. It is procedural knowledge that can be governed like documentation and consumed like code.

The useful mental model:

```text
Human docs layer        Git trust layer              Agent runtime layer
----------------        ---------------              -------------------
GitBook                 GitHub/GitLab/CODING         Claude Code
VitePress               PR review                    Codex
MkDocs                  CI lint                      Cursor
Obsidian                release tags                 Gemini CLI
Feishu/Yuque            registry manifest            other skill clients
```

This creates a new category:

> Operational docs for agents.

Or in Chinese:

> 面向 AI agents 的可执行团队知识库。

The workflow loop:

```text
Docs UI -> Git sync + hooks -> SKILL.md + skills.json -> Agent clients -> Feedback -> Docs UI
```

This loop is the first thing the README and GitHub Pages site should communicate.

## 3. Market Analysis

### 3.1 Agent Skills standard and native clients

Examples:

- Agent Skills open standard.
- Claude Code Skills.
- OpenAI skills catalog for Codex.
- Cursor Rules and `AGENTS.md`.

What they validate:

- Skills are becoming a portable packaging format for agent capabilities.
- `SKILL.md` with metadata, instructions, optional scripts, references, and assets is a real substrate.
- Agent clients increasingly load procedural knowledge on demand rather than stuffing everything into a single system prompt.

Collision risk:

- Do not claim to invent `SKILL.md`.
- Do not position the project as the canonical standard.
- Do not over-optimize for only one client.

Differentiation:

- Agent SkillDocs sits above the client layer.
- It manages authoring, review, docs navigation, registry generation, and adapter output.
- It should export to multiple agent-client conventions instead of competing with any one of them.

### 3.2 Skill marketplaces and registries

Examples:

- Agensi.
- SkillHQ.
- skills.md.
- skill.broker and other emerging public registries.

What they solve:

- Discovery of public skills.
- Creator monetization.
- One-command installation.
- Hosted or remote execution for some skills.

Collision risk:

- A marketplace story would collide immediately.
- Public discovery is noisy, security-sensitive, and already crowded.
- Paid skills push the project into trust, payments, licenses, and moderation too early.

Differentiation:

- Focus on private/team-owned skills first.
- Treat public marketplace integration as optional downstream distribution.
- Make the core value governance and repeatability, not shopping for third-party skills.

### 3.3 Prompt management platforms

Examples:

- LangSmith prompt management.
- PromptLayer.
- Langfuse.
- Braintrust and related eval/prompt platforms.

What they solve:

- Prompt versioning.
- Staging/production labels.
- Evaluation datasets and regression testing.
- Observability for production LLM apps.
- Runtime prompt fetching through SDKs and APIs.

Collision risk:

- "Prompt management for teams" is already an established phrase.
- Production app prompts and agent skills overlap conceptually but differ operationally.

Differentiation:

- Do not call this a prompt manager.
- Skills are filesystem packages and docs assets, not only runtime prompt templates.
- Agent SkillDocs should emphasize SOPs, checklists, tool-use procedures, team conventions, and agent playbooks.
- Evaluation can come later, but the first wedge is authoring and distribution through existing docs and Git workflows.

### 3.4 AI-ready documentation platforms

Examples:

- GitBook Git Sync, `.md` pages, `llms.txt`, MCP server, and official `skill.md` guidance.
- Mintlify `skill.md` generation and agent-skill discovery endpoints.
- Context/documentation MCP tools such as Context7.

What they solve:

- Make product docs easier for LLMs to ingest.
- Expose docs through Markdown, `llms.txt`, MCP, or generated `skill.md`.
- Help agents understand product APIs and documentation sites.

Collision risk:

- Docs platforms may add native "skill library" features.
- GitBook and Mintlify already speak the language of agent-ready docs.

Differentiation:

- This project is platform-agnostic and skill-library-centric.
- It should show how GitBook, VitePress, MkDocs, Obsidian, Feishu, and Yuque can all become management surfaces for installable skills.
- The promise is not "make docs readable by AI"; it is "make team procedures installable by agents."

### 3.5 China-specific docs and knowledge workflows

Examples:

- Feishu Pages and related Feishu Markdown export/import tools.
- YuqueSync, Elog, and Yuque exporters.
- CODING/Gitee/GitLab as domestic Git hosting and static deployment layers.

What they solve:

- Let non-Git users write in Feishu or Yuque.
- Export knowledge base content into Markdown.
- Publish docs through static site pipelines.

Collision risk:

- Rich-text to Markdown conversion can lose fidelity.
- APIs and permissions change.
- Bidirectional sync is hard and may distract from the core paradigm.

Differentiation:

- Treat Feishu/Yuque as normalize/export workflows first, not perfect live sync.
- Provide clear authoring constraints for skill-safe Markdown.
- Use domestic Git/static hosting as a deployment and distribution option, not as the conceptual center.

### 3.6 Security and trust signals

Recent research on Agent Skills highlights real supply-chain and semantic risks:

- Public skill ecosystems are growing quickly and can become redundant, noisy, and unsafe.
- `SKILL.md` is operational text, not passive documentation.
- Natural-language descriptions can influence discovery, ranking, selection, and trust.
- The skill lifecycle has risks across creation, distribution, deployment, and execution.

Implication for this project:

- Trust must be part of the core spec, not a later enterprise add-on.
- The first CLI should include linting, provenance, generated manifests, and review-friendly outputs.
- Public marketplace support should remain downstream until the private/team workflow is credible.

## 4. Collision Avoidance

Avoid these messages:

- "A new SKILL.md standard."
- "A marketplace for agent skills."
- "Prompt management for teams."
- "AI documentation generator."
- "Universal Feishu/Yuque bidirectional sync."
- "Hosted registry for all skills."

Use these messages instead:

- "A docs-native management layer for team Agent Skills."
- "Bring governance, review, and publishing workflows to `SKILL.md`."
- "Use your existing documentation platform as the human UI for skills."
- "Private skill libraries before public marketplaces."
- "Plain Markdown in, installable skills out."
- "Git is the trust and distribution layer."

## 5. Product Goal

Build an open-source kit that helps any team convert an existing docs platform or Markdown knowledge base into an Agent Skills Manager.

The first release should include:

- A canonical skill library file model.
- A CLI/generator.
- Linting and provenance checks.
- GitBook and VitePress adapters.
- A registry manifest generator.
- Starter templates.
- A flagship case study based on Vios Research Skills.
- English and Chinese launch essays.

It should not start as:

- Hosted SaaS.
- Proprietary registry.
- Public marketplace.
- Full rich-text sync engine.
- Universal installer for every client.

## 6. Target Users

Primary:

- AI research labs.
- Developer teams using Claude Code, Codex, Cursor, Gemini CLI, or similar agents.
- Internal platform teams responsible for AI coding workflows.
- Technical writers and DevRel teams who already maintain Markdown docs.

Secondary:

- Chinese teams using Feishu, Yuque, CODING, Gitee, or GitLab.
- Personal Obsidian and Markdown workflow users.
- Open-source maintainers who want to publish reusable project skills.

Most urgent user pain:

- "We keep rewriting the same agent instructions."
- "Our skills live in random repos, chats, docs, and personal folders."
- "Non-engineers can improve the workflow, but they cannot safely edit the agent package."
- "We need review, versioning, and installable output without buying a new platform."

## 7. Core Principles

- `SKILL.md` remains the installable agent entrypoint.
- Plain Markdown is preferred over platform-specific rich text.
- Git is the canonical trust and distribution layer.
- Documentation platforms are human management layers.
- Generated files must be deterministic and safe to regenerate.
- Adapters should be thin and replaceable.
- Private team workflows come before public discovery.
- Security and provenance are part of the MVP.

## 8. Canonical File Model

Default directory structure:

```text
skills/
  SUMMARY.md
  literature-review/
    SKILL.md
    references/
    scripts/
    assets/
  causal-dag-builder/
    SKILL.md
    references/
scripts/
  lint_skills.py
  generate_index.py
adapters/
  gitbook/
  vitepress/
  mkdocs/
  obsidian/
  feishu/
  yuque/
```

Every skill must live at:

```text
skills/<skill-name>/SKILL.md
```

Recommended frontmatter:

```yaml
---
name: literature-review
description: Use this skill when the user needs a structured literature review workflow, paper triage, evidence extraction, or synthesis across academic sources.
category: Reading & Analysis
version: 0.1.0
author: Team Name
license: MIT
---
```

MVP-required fields:

- `name`
- `description`

Recommended fields:

- `category`
- `version`
- `author`
- `license`
- `source_url`
- `owner`
- `review_status`

Important rule:

> Keep install-critical metadata compatible with the broadest Agent Skills clients. Put platform-specific metadata in generated registries, not inside the skill body unless needed.

## 9. Registry Manifest

Generate `skills.json` as the project-level inventory:

```json
{
  "schema": "https://agent-skilldocs.dev/schemas/skills-registry.v0.json",
  "generated_at": "2026-05-17T00:00:00Z",
  "source": {
    "repo": "https://github.com/org/team-skills",
    "commit": "abc123"
  },
  "skills": [
    {
      "name": "literature-review",
      "path": "skills/literature-review/SKILL.md",
      "description": "Use this skill when...",
      "category": "Reading & Analysis",
      "version": "0.1.0",
      "sha256": "...",
      "source_url": "https://docs.example.com/literature-review",
      "review_status": "approved"
    }
  ]
}
```

Why it matters:

- Helps agents and installers inspect the library.
- Makes provenance explicit.
- Supports future signing, CI checks, and marketplace publishing.
- Gives docs adapters a shared navigation source.

## 10. CLI MVP

Working CLI name candidates:

- `skilldocs`
- `agent-skilldocs`
- `skills-as-docs`
- `sadocs`

Recommended default:

> `skilldocs`

MVP commands:

```bash
skilldocs init
skilldocs lint
skilldocs generate registry
skilldocs generate gitbook
skilldocs generate vitepress
skilldocs doctor
```

Post-MVP commands:

```bash
skilldocs generate mkdocs
skilldocs generate obsidian
skilldocs normalize feishu
skilldocs normalize yuque
skilldocs export claude
skilldocs export codex
skilldocs export cursor
```

`skilldocs lint` should check:

- Required frontmatter.
- Valid skill folder naming.
- Missing or weak descriptions.
- Plain Markdown compatibility.
- Broken local links.
- Generated files out of date.
- Suspicious shell snippets or broad tool-use instructions.
- Overly long `SKILL.md` files that should move content into references.

`skilldocs doctor` should explain:

- Which skills are installable.
- Which adapters can run.
- Which generated files are stale.
- Which client export targets are configured.
- Which risks need human review.

## 11. Adapter Roadmap

### P0: GitBook Adapter

Why first:

- It proves the flagship pattern: visual docs UI plus Git-backed distribution.
- GitBook already has Git Sync, change requests, Markdown output, and AI-ready docs features.
- This makes it a strong demo partner and also a likely future native competitor.

Outputs:

```text
.gitbook.yaml
skills/README.md
skills/SUMMARY.md
```

Goals:

- Support `root: ./skills/`.
- Use each `SKILL.md` as a page.
- Generate a category-based sidebar.
- Keep generated navigation deterministic.
- Write tutorial: "Using GitBook as a Team Agent Skills Manager."

### P1: VitePress Adapter

Why:

- Best for open-source and Chinese developer adoption.
- Easy deployment to GitHub Pages, Cloudflare Pages, Vercel, or CODING static sites.
- Avoids over-dependence on GitBook.

Outputs:

```text
docs/
  index.md
  skills/
.vitepress/config.ts
```

Goals:

- Generate a static skill portal.
- Show a domestic-friendly alternative to GitBook.
- Pair with CODING deployment in the Chinese tutorial.

### P1: MkDocs Adapter

Why:

- Strong fit for Python, research, and open-source communities.

Outputs:

```text
mkdocs.yml
docs/
```

Goals:

- Support Material for MkDocs.
- Support Read the Docs and GitHub Pages.
- Target labs and Python-heavy teams.

### P1: Obsidian Adapter

Why:

- Fits personal researchers and local-first users.

Outputs:

```text
Skills Index.md
skills/<name>/SKILL.md
```

Goals:

- Render a browsable vault index.
- Support Obsidian Git workflows.
- Make it easy to curate personal skill libraries.

### P2: Feishu Adapter

Treat Feishu as an authoring/export workflow first.

Two practical routes:

1. Feishu knowledge base as human writing UI, exported to Markdown, normalized into `skills/<name>/SKILL.md`.
2. Git Markdown imported into Feishu for browsing and collaboration, with Git remaining canonical.

Reusable tools to evaluate:

- `feishu-pages`
- `feishu-docx`
- `feishu-wiki-md`
- `feishu-cli`

Goals:

- Demo: "How a Chinese team manages Agent Skills with Feishu + Git."
- Define authoring constraints to keep exported Markdown skill-safe.
- Avoid promising perfect bidirectional sync.

### P2: Yuque Adapter

Treat Yuque as a writer-friendly export source.

Reusable tools to evaluate:

- YuqueSync.
- Elog.
- yuque-exporter.

Goals:

- Export Yuque docs to Markdown.
- Normalize exported pages into skill folders.
- Document formatting loss and unsupported blocks.

### P3: Mintlify / ReadMe / Fern / Redocly

Why:

- Developer-docs teams are close to the target user.
- Mintlify already exposes `skill.md`, so this adapter must be positioned carefully.

Goal:

- Integrate with mature docs stacks when teams want their product docs and agent skills to live side by side.

### P3: CODING / Gitee / GitCode

These are better treated as Git hosting and static deployment layers, not visual editing layers.

CODING:

- Good domestic GitHub Pages alternative.
- Pair with VitePress for Chinese demos.

Gitee:

- Useful Git mirror and distribution layer.
- Do not rely on Pages as primary display.

GitCode:

- Possible mirror platform.
- Not first-batch adapter.

## 12. China-Specific Strategy

Do not copy the GitHub/GitBook story directly.

Chinese positioning:

> 用飞书/语雀做团队共创，用 Git/CODING 做可信分发，让 AI 编程助手自动获得最新团队工作流。

Recommended Chinese demos:

### Feishu Skills Manager

- Write in Feishu knowledge base.
- Export to Markdown.
- Normalize into `skills/<name>/SKILL.md`.
- Push to GitHub, GitLab, or CODING.
- Agents update from Git.

### Yuque Skills Manager

- Write in Yuque.
- Export through Elog or YuqueSync.
- Run `skilldocs normalize yuque`.
- Generate installable skill repo.

### CODING + VitePress Skills Portal

- Store skills in a Git repo.
- Generate VitePress site.
- Deploy through CODING static hosting.
- Target Chinese teams, universities, and enterprise intranets.

## 13. GitHub Public Surface

The GitHub repo must communicate the paradigm before it asks people to install anything.

Required public surfaces:

- `README.md`: the manifesto, the loop, the repo structure, and the current adoption path.
- `docs/`: a GitHub Pages site that repeats the core idea visually and makes the project easy to share.
- `.github/workflows/pages.yml`: a static Pages deployment workflow.
- `PLAN.md`: the deeper product, market, and implementation plan.
- `schemas/`: the future home for `skills.json` and `SKILL.md` compatibility notes.
- `examples/`: concrete team, research, personal, and China-specific skill libraries.
- `templates/`: forkable starter libraries for teams and individuals.
- `case-studies/`: real stories showing agent failures turning into skill improvements.

README first-screen message:

> Agent SkillDocs helps teams manage Agent Skills like docs and distribute them through Git.

GitHub Pages first-screen message:

> Human-readable, agent-executable workflow docs.

The site should show the SkillDocs Loop immediately:

```text
Docs UI -> Git sync + hooks -> SKILL.md registry -> Agents -> Feedback -> Docs UI
```

## 14. Initial Repo Structure

Suggested new project structure:

```text
agent-skilldocs/
  README.md
  LICENSE
  PLAN.md
  docs/
    index.html
    assets/
  schemas/
    skills-registry.v0.json
  packages/
    cli/
      src/
      tests/
  adapters/
    gitbook/
    vitepress/
    mkdocs/
    obsidian/
    feishu/
    yuque/
  examples/
    gitbook-research-skills/
    vitepress-team-skills/
    obsidian-personal-skills/
    feishu-lab-skills/
  templates/
    team-skill-library/
    personal-skill-library/
  case-studies/
    vios-research-skills.md
  scripts/
    lint-fixtures/
```

## 15. MVP Timeline

### Week 1: Foundation

- Create repo.
- Write README with paradigm positioning.
- Define canonical skill schema.
- Implement `skilldocs lint`.
- Implement `skilldocs generate registry`.
- Add basic `skilldocs doctor`.
- Port Vios Research Skills as flagship example.

### Week 2: GitBook + VitePress

- Implement GitBook adapter.
- Implement VitePress adapter.
- Write tutorial: "GitBook as a Team Agent Skills Manager."
- Write tutorial: "VitePress/CODING as a domestic-friendly Skills Portal."
- Add generated screenshots or terminal examples.

### Week 3: Launch Package

- Add Obsidian adapter if scope allows.
- Polish README and examples.
- Publish English blog.
- Publish Chinese blog.
- Post to GitBook Discussions, Hacker News, Reddit, V2EX, 掘金, 知乎, 即刻, 少数派.

### Week 4-6: China Adapters

- Prototype Feishu export workflow.
- Prototype Yuque/Elog normalize workflow.
- Add `skilldocs normalize feishu`.
- Add `skilldocs normalize yuque`.
- Write Chinese tutorial series.

## 16. Content Strategy

### English

- "Your Docs Platform Is Already an Agent Skills Manager"
- "Agent SkillDocs: Human-Readable, Agent-Executable Workflow Docs"
- "Skills-as-Docs: Manage Skills Like Docs, Distribute Them Like Code"
- "Build a GitBook-backed Agent Skills Library"
- "Build a VitePress Skill Portal for Your Team"
- "Why Agent Skills Need Governance Before Marketplaces"

### Chinese

- 《我们把 GitBook 用成了 Agent Skills Manager》
- 《像管理文档一样管理 AI Agent Skills》
- 《飞书/语雀如何变成团队 AI Skills 管理器》
- 《用 CODING + VitePress 搭建国内可访问的 Skills Portal》
- 《别急着买 Skills Marketplace，先把团队自己的 Skills 管起来》

### Community Targets

- GitBook Discussions.
- Agent Skills community.
- Hacker News.
- Reddit r/ClaudeAI, r/ClaudeCode, r/LocalLLaMA, r/AI_Agents.
- V2EX.
- 掘金.
- 知乎.
- 即刻.
- 少数派.
- GitHub Awesome lists.

## 17. Success Metrics

Early signals:

- GitHub stars and forks.
- External repos adopting the file model.
- Issues asking for adapters.
- Docs platform maintainers replying or linking.
- Chinese community reposts.
- Teams creating private demo repos.

Medium-term:

- `skilldocs` used by external skills repos.
- Community-contributed adapters.
- GitBook, Mintlify, Feishu, or Yuque users asking for official integration.
- Talks, blog invitations, or standards discussions around skill governance.

Avoid vanity metrics:

- Raw public skill count.
- Paid marketplace GMV.
- Number of adapters without real examples.

## 18. Non-Goals

Do not start with:

- Hosted SaaS.
- Public marketplace.
- Proprietary registry.
- Complex web UI.
- Universal rich-text converter.
- Replacing existing skill installers.
- Owning the Agent Skills standard.

The project should first be:

- Method.
- Spec.
- CLI.
- Adapters.
- Templates.
- Case studies.

## 19. Risks

### Product risks

- Too many adapters dilute the story.
- Docs platforms may add native skill management.
- Users may confuse the project with prompt management.
- GitBook-first messaging may feel too narrow.

Mitigation:

- Keep P0 to GitBook plus VitePress.
- Lead with the paradigm, not one platform.
- Explicitly compare against prompt managers and marketplaces.
- Show both global and China-specific examples.

### Technical risks

- Platform Markdown extensions may pollute `SKILL.md`.
- Rich-text exports may lose important structure.
- Generated navigation may diverge from source.
- Client-specific skill conventions may differ.

Mitigation:

- Keep `SKILL.md` plain Markdown.
- Put adapter-specific metadata in generated files.
- Generate deterministic outputs.
- Add lint rules and compatibility profiles.

### Security risks

- Malicious or sloppy skills can grant unsafe procedural behavior.
- Natural-language descriptions can manipulate discovery.
- Teams may install public skills without review.

Mitigation:

- Add lint, provenance, and review status to MVP.
- Encourage private-first skill libraries.
- Document review checklists.
- Keep marketplace publishing out of v0.1.

## 20. Suggested First Public Release

Release name:

> Agent SkillDocs v0.1

Includes:

- README.
- GitHub Pages site.
- Canonical skill schema.
- CLI lint.
- CLI registry generator.
- CLI doctor.
- GitBook adapter.
- VitePress adapter.
- Vios Research Skills case study.
- One English blog.
- One Chinese blog.

Launch message:

> We discovered that docs platforms can become management layers for Agent Skills. This kit helps teams manage skills visually and distribute them through Git.

中文：

> 我们发现文档平台可以变成 AI Agent Skills 的管理层。这个工具包帮助团队可视化管理 skills，并通过 Git 分发给 AI agents。

## 21. Source Notes For Market Analysis

Useful external references checked on 2026-05-17:

- Agent Skills overview: https://agentskills.io/
- Claude Code skills docs: https://code.claude.com/docs/en/skills
- OpenAI skills catalog: https://github.com/openai/skills
- OpenAI Academy on Codex plugins and skills: https://openai.com/academy/codex-plugins-and-skills/
- Cursor Rules docs: https://cursor.com/docs/rules.md
- GitBook GitHub Sync: https://gitbook.com/docs/getting-started/git-sync/enabling-github-sync
- GitBook skill.md guidance: https://gitbook.com/docs/creating-content/ai-coding-assistants-and-skillmd
- GitBook LLM-ready docs: https://gitbook.com/docs/publishing-documentation/llm-ready-docs
- Mintlify skill.md docs: https://www.mintlify.com/docs/ai/skillmd
- LangSmith prompt management: https://docs.langchain.com/langsmith/manage-prompts
- PromptLayer docs: https://docs.promptlayer.com/
- Langfuse prompt version control: https://langfuse.com/docs/prompt-management/features/prompt-version-control
- Braintrust prompt management article: https://www.braintrust.dev/articles/what-is-prompt-management
- Agensi skill marketplace: https://www.agensi.io/
- SkillHQ marketplace: https://skillhq.dev/
- skills.md remote skill platform: https://skills.md/docs
- Feishu Pages: https://github.com/longbridge/feishu-pages
- Agent Skills ecosystem analysis: https://arxiv.org/abs/2602.08004
- Secure Agent Skills analysis: https://arxiv.org/abs/2604.02837
- Semantic supply-chain attacks on SKILL.md registries: https://arxiv.org/abs/2605.11418
