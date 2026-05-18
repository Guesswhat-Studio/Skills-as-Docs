# Agent SkillDocs Project Plan

Status: market-updated, naming-updated, and pages-manager-updated on 2026-05-18

## 0. Current Decision

This project should be positioned as a paradigm and toolkit, not as a marketplace, hosted SaaS, or another prompt manager.

Core thesis:

> Turn a Git repository into the trusted source of truth for Agent Skill packages, with a built-in GitHub Pages manager as the default human UI and optional docs-platform adapters for teams that already have one.

中文一句话：

> Git 仓库是 Agent Skill package 的可信源，GitHub Pages 是默认管理界面；文档平台 adapter 是可选扩展，不是第一依赖。

The market already has:

- Agent Skills standards and client support.
- Public skill marketplaces.
- Prompt management platforms.
- AI-ready documentation platforms.
- Feishu/Yuque/Notion/Obsidian-style knowledge workflows.

The open gap is:

> Teams do not yet have a simple, open, docs-native way to govern their own private skill libraries across humans, Git, and multiple agent clients.

2026-05-18 product decision:

- P0 should be a built-in GitHub Pages Skill Manager, not a GitBook-first adapter.
- Adapters should become optional authoring/export templates for teams that prefer GitBook, VitePress, MkDocs, Obsidian, Feishu, or Yuque.
- A skill is a Git-tracked package with `SKILL.md` as the required entrypoint, not merely one Markdown page.
- Install and agent-directory placement should delegate to the existing `npx skills` ecosystem where possible. SkillDocs should be the review/manage/governance layer, not a competing universal installer.

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

> Agent SkillDocs is a Git-backed, Markdown-entrypoint workflow for turning team knowledge, SOPs, playbooks, and repeated AI instructions into installable Agent Skill packages.

The project promotes a new Human + LLM collaboration model:

- Humans write and review operational knowledge in the built-in Pages manager or familiar docs tools.
- Git preserves version history, review, CI, provenance, and release tags.
- Agent clients install or update the same skill packages as executable procedural memory.

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
Pages Manager / Docs UI -> branch + PR + CI -> skill package + skills.json -> Agent clients -> Feedback -> Pages Manager / Docs UI
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
- "Plain Markdown entrypoint, installable skill packages out."
- "Git is the trust and distribution layer."

## 5. Product Goal

Build an open-source, Git-native manager that helps any team govern Agent Skill packages as reviewable operational docs.

The default product surface is a static GitHub Pages Skill Manager backed by GitHub branches, pull requests, CI, and generated registries. Existing docs platforms remain useful as optional authoring or browsing adapters, but the first-party path should not depend on GitBook, VitePress, Feishu, Yuque, or any hosted docs vendor.

The first release should include:

- A canonical skill package file model.
- A GitHub Pages Skill Manager MVP.
- A CLI/generator.
- Linting and provenance checks.
- A registry manifest generator.
- Starter templates.
- Optional GitBook and VitePress adapter templates if scope allows.
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

- A skill is a package directory; `SKILL.md` remains the required installable entrypoint.
- Plain Markdown is preferred over platform-specific rich text.
- Git is the canonical trust and distribution layer.
- The GitHub Pages Skill Manager is the default human management layer.
- Documentation platforms are optional authoring and browsing layers.
- Generated files must be deterministic and safe to regenerate.
- Adapters should be thin and replaceable.
- Runtime package files must be separated from governance-only files such as tests, lint fixtures, and generated reports.
- The library must be installable by current local agents through `npx skills add`, with generated install commands for Claude Code, Codex, Antigravity, and other supported targets.
- SkillDocs must not maintain a competing full agent path registry unless the upstream `npx skills` registry is unavailable for a target.
- Private team workflows come before public discovery.
- Security and provenance are part of the MVP.

## 8. Canonical File Model

A SkillDocs library is a collection of Git-tracked skill packages. `SKILL.md` is the required entrypoint, but the package may include references, templates, examples, scripts, and assets.

Default directory structure:

```text
skills/
  literature-review/
    SKILL.md              # required: routing metadata and primary instructions
    references/           # long guides, policies, rubrics, docs
    templates/            # reusable prompt, report, or artifact templates
    examples/             # sample inputs, outputs, or expected formats
    scripts/              # executable helpers, highest review risk
    assets/               # binary or static files: PDFs, images, sheets, fixtures
  causal-dag-builder/
    SKILL.md
    references/
tests/
  skills/
    literature-review/    # evals and governance fixtures, not runtime package files
docs/
  index.html              # GitHub Pages marketing surface
  manager/                # built static Pages Skill Manager
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

Allowed package subdirectories:

- `references/`: Markdown or text references the agent can load on demand.
- `templates/`: reusable templates for generated docs, reports, prompts, or artifacts.
- `examples/`: sample inputs, sample outputs, screenshots, or golden files.
- `scripts/`: executable helpers; each script should have one job and must be reviewed more strictly.
- `assets/`: non-code assets such as PDFs, images, spreadsheets, schemas, fixtures, or brand files.

Package boundary rule:

> `skills/<name>/` is the runtime package an agent or installer may copy. `tests/`, generated reports, docs-site files, and adapter outputs are governance or presentation files and must not be required for runtime behavior.

### 8.1 User Installation And Deployment Flow

Keep the user story split into two products:

- SkillDocs manages, reviews, previews, and versions the canonical skill library.
- `npx skills` installs approved skill packages into Claude Code, Codex, Antigravity, Cursor, OpenCode, GitHub Copilot, and other agent-specific directories.

#### Flow A: Team publishes a managed skill library

Use when a team wants one governed source of truth.

1. Create or fork a SkillDocs repo.
2. Put runtime packages under `skills/<name>/`.
3. Enable GitHub Pages and the SkillDocs GitHub Actions workflow.
4. Use the Pages Manager to browse, edit, lint, and open PRs.
5. Merge approved PRs; CI regenerates `skills.json` and redeploys Pages.
6. The Pages Manager shows copy-ready install commands for each skill and target agent.

User-facing result:

```text
GitHub repo + Pages Manager = source of truth and review surface
npx skills = installation and local agent directory placement
```

#### Flow B: Developer installs approved skills globally

Use for reusable skills that apply across many projects.

```bash
npx skills add org/team-skills --list
npx skills add org/team-skills --skill literature-review -g -a claude-code
npx skills add org/team-skills --skill literature-review -g -a codex
npx skills add org/team-skills --skill literature-review -g -a antigravity
```

Install all approved skills to all supported agents:

```bash
npx skills add org/team-skills --skill '*' --agent '*' -g
```

This is the default consumption path. The user should not need to understand `.claude/skills`, `.agents/skills`, or Antigravity's current directory convention.

#### Flow C: Maintainer edits and tests locally

Use when someone is actively maintaining the skill library.

```bash
git clone https://github.com/org/team-skills.git ~/skilldocs/team-skills
cd ~/skilldocs/team-skills
npx skills add . --skill literature-review -g -a claude-code -a codex
```

The maintainer edits `skills/literature-review/SKILL.md`, tests it in local agents, then pushes a branch and opens a PR. The canonical Git repo stays outside any agent's skill directory.

#### Flow D: Product repo vendors a project-specific skill

Use only when the skill is truly part of one product repo's workflow and should be reviewed with that repo.

```bash
cd /path/to/product-repo
npx skills add org/team-skills --skill deployment-rules --copy -a claude-code -a codex
git add .claude/skills .agents/skills
```

This creates ordinary files in the product repo. It is intentionally a copy/materialization step, not a nested Git clone.

#### Flow E: Single-skill direct clone

Use only when a repository root is exactly one skill package with `SKILL.md` at the root.

```bash
git clone https://github.com/org/one-skill.git ~/.claude/skills/one-skill
```

Do not use this for a multi-skill SkillDocs library.

#### Rules Of Thumb

- Default for users: install with `npx skills add`.
- Default for maintainers: clone the SkillDocs repo outside agent directories, then install from the local path for testing.
- Default for teams: keep SkillDocs as the governed source of truth; use PRs for changes.
- Default for product repos: copy/materialize only project-specific skills.
- Never clone a full SkillDocs repo, including its `.git`, inside another repo's `.claude/skills`, `.agents/skills`, or similar agent directory.

SkillDocs manager implications:

- Each package page should show install commands generated from this flow.
- The manager should surface `npx skills` agent names such as `claude-code`, `codex`, `antigravity`, `cursor`, and `opencode`.
- `skilldocs doctor` may check whether `npx skills` is available and whether `npx skills add <repo> --list` can discover the expected packages.
- SkillDocs should not replace `npx skills list`, `remove`, `update`, symlink/copy behavior, or the upstream agent path registry.

Recommended frontmatter:

```yaml
---
name: literature-review
description: Use this skill when the user needs a structured literature review workflow, paper triage, evidence extraction, or synthesis across academic sources.
category: Reading & Analysis
version: 0.1.0
owner: Team Name
review_status: draft
---
```

MVP-required fields:

- `name`
- `description`

Recommended fields:

- `category`
- `version`
- `owner`
- `review_status`
- `source_url`
- `license` when publishing public packages or marketplace distributions

Important rule:

> Keep install-critical metadata compatible with the broadest Agent Skills clients. Put platform-specific metadata in generated registries, not inside the skill body unless needed.

Package review implications:

- Text references can usually be previewed and linted in the Pages manager.
- Binary assets should be listed, hashed, size-checked, and opened only through GitHub/raw URLs.
- Scripts require risk labels, owner review, and CI checks before a package can be marked approved.
- Install commands should preserve the entire package directory through `npx skills` symlinks or copies. Single-file clients should receive a degraded export with clear compatibility warnings.

## 9. Registry Manifest

Generate `skills.json` as the project-level inventory and package manifest:

```json
{
  "schema": "https://agent-skilldocs.dev/schemas/skills-registry.v0.json",
  "generated_at": "2026-05-18T00:00:00Z",
  "source": {
    "repo": "https://github.com/org/team-skills",
    "commit": "abc123"
  },
  "skills": [
    {
      "name": "literature-review",
      "entrypoint": "skills/literature-review/SKILL.md",
      "package_path": "skills/literature-review",
      "description": "Use this skill when...",
      "category": "Reading & Analysis",
      "version": "0.1.0",
      "source_url": "https://docs.example.com/literature-review",
      "review_status": "approved",
      "package_sha256": "...",
      "files": [
        {
          "path": "skills/literature-review/SKILL.md",
          "kind": "entrypoint",
          "media_type": "text/markdown",
          "bytes": 4200,
          "sha256": "..."
        },
        {
          "path": "skills/literature-review/references/rubric.md",
          "kind": "reference",
          "media_type": "text/markdown",
          "bytes": 18000,
          "sha256": "..."
        }
      ]
    }
  ]
}
```

Why it matters:

- Helps agents and installers inspect the library.
- Makes provenance explicit.
- Lets the Pages manager render package file trees without walking GitHub on every load.
- Supports future signing, CI checks, and marketplace publishing.
- Gives docs adapters a shared navigation source.

Recommended file kinds:

- `entrypoint`
- `reference`
- `template`
- `example`
- `script`
- `asset`
- `generated`

The registry should also support compatibility warnings, for example:

```json
{
  "compatibility": {
    "claude_code": "full-package",
    "codex": "full-package",
    "single_markdown_clients": "degraded"
  }
}
```

## 10. GitHub Pages Skill Manager Technical Review

### 10.1 Architecture choice

Recommended architecture:

```text
Git repo
  skills/<name>/...              # source of truth
  skills.json                    # generated package registry
  packages/core                  # scanner, parser, linter, registry generator
  packages/manager               # source for the Pages Skill Manager SPA
  packages/cli                   # CLI wrapper around the same core
  docs/                          # GitHub Pages output

GitHub Pages static SPA
  read-only mode                 # browse public registry and raw files
  authenticated edit mode        # create branch, commit package changes, open PR

GitHub Actions
  lint packages
  verify npx skills installability
  regenerate registry
  check registry drift
  scan scripts/assets/secrets
  deploy Pages
```

The manager should be a static SPA deployed by GitHub Pages. GitHub Pages publishes static files from the repository or from a GitHub Actions artifact, so the manager must not depend on a server-side runtime in P0. All durable writes go through GitHub branches and pull requests.

Recommended stack:

- TypeScript.
- Vite + React for the manager SPA.
- CodeMirror 6 for Markdown/source editing.
- `gray-matter` or equivalent for YAML frontmatter parsing.
- `zod` for schema validation.
- `marked` or `markdown-it` plus DOM sanitization for preview.
- `@octokit/rest` for GitHub API calls.
- Shared `packages/core` for package scanning, linting, registry generation, and compatibility checks.

### 10.2 Read modes

Read-only public mode:

- Load `skills.json` from the Pages deployment or raw GitHub URL.
- Render the skill list, package metadata, file tree, and compatibility status.
- Fetch text file contents from raw GitHub URLs or the GitHub Contents API.
- Show binary assets as metadata with links rather than trying to inline everything.

Private repo mode:

- Require authentication before fetching repository contents.
- Use GitHub API reads instead of unauthenticated raw URLs.
- Store only short-lived UI state locally; do not persist secrets.

### 10.3 Write modes

P0 should support two write paths:

1. Safe fallback: generate a patch or deep-link to GitHub's native file editor.
2. Authenticated PR path: write changes through GitHub API into a new branch and open a pull request.

Authenticated PR flow:

```text
1. Resolve default branch and latest commit SHA.
2. Create branch skilldocs/<skill-name>-<timestamp>.
3. Save edits to that branch.
4. Regenerate skills.json client-side or ask CI to regenerate it.
5. Open a draft PR with a generated review checklist.
6. Let CI become the approval gate for lint, package health, and registry drift.
```

For single-file edits, the GitHub Contents API is enough. For multi-file package updates, especially adding references, scripts, templates, or assets, use the Git Data APIs: create blobs, create a tree, create a commit, and update the branch reference. This keeps package edits atomic and avoids one-commit-per-file noise.

Direct commits to the default branch should not be a P0 behavior. The product promise is reviewable skill governance, so branch + PR is the happy path.

### 10.4 Authentication and permissions

P0:

- Bring-your-own fine-grained personal access token.
- Required repository permissions: metadata read, contents write, pull requests write.
- Store the token in memory or `sessionStorage`; never localStorage, URL params, committed config, or analytics.
- Provide a read-only experience without a token.

P1:

- Optional GitHub App for organization/team use.
- A GitHub App is cleaner than asking every team member to paste tokens, but it needs a secure token exchange path that GitHub Pages alone cannot provide.
- If added, use a small external token broker such as a Cloudflare Worker, Vercel function, or self-hosted endpoint. Keep it optional so the default project remains static.

### 10.5 Manager UI surfaces

MVP screens:

- First-run import: load an existing GitHub repo, select a local skill folder, import from an existing agent skill directory, or create a new package from template.
- Library dashboard: skills, owners, review status, risk level, compatibility.
- Repository tree view: `skills/<name>/` packages, `SKILL.md`, references, templates, examples, scripts, assets, and arbitrary supporting files.
- Skill package view: current package scope, entrypoint, file tree, file metadata, install/export hints.
- Editor: click any package file to edit it; `SKILL.md` exposes parsed frontmatter fields; supporting files use raw source editing.
- Inspector: frontmatter fields, browser-side lint, package scope, script risk, install target, and generated `npx skills` command.
- Zen editor mode: hide library, inspector, and preview so maintainers can focus on long `SKILL.md` edits.
- Package health panel: required fields, broken links, long entrypoint warnings, script risk, asset size, registry drift.
- PR composer: branch name, commit message, PR title/body, reviewers checklist.

P1 screens:

- Asset upload and binary file replacement.
- Script review panel with risk labels.
- Compatibility matrix by target agent.
- Release/tag view for approved skill library versions.

### 10.6 Security review

The manager introduces a real security boundary because it edits executable procedural memory.

Required controls:

- Sanitize rendered Markdown to prevent XSS in the Pages app.
- Treat `scripts/` as high risk; flag network calls, shell execution, broad file-system operations, and credential access.
- Secret-scan all package files in CI.
- Enforce max file sizes for preview and registry generation.
- Require human review before `review_status: approved` can be set on packages with scripts or binary assets.
- Avoid loading arbitrary remote images/scripts in previews unless explicitly allowed.
- Make every generated registry entry hash the package and individual files.

### 10.7 Open decisions

- Whether `skills.json` is committed by the manager or only generated by CI.
- Whether the first editor supports binary upload or only text-file edits.
- Whether the manager source builds into `docs/manager/` while the current marketing site remains `docs/index.html`, or whether the whole Pages site becomes one SPA.
- Whether GitHub App auth is worth adding before external team pilots.

Recommended P0 answers:

- CI is the source of truth for final `skills.json`; the browser may preview a generated diff.
- Text-file editing first; binary upload later.
- Keep the current marketing site and mount the manager at `/manager/`.
- Use fine-grained PAT in P0, GitHub App only after the workflow is validated.

### 10.8 Stack decision and open-source reuse

MVP stack:

```text
Static app:       Vite + React + TypeScript
Editor:           CodeMirror 6
Markdown preview: markdown-it or marked + DOMPurify
Frontmatter:      gray-matter + js-yaml
Validation:       zod or ajv
GitHub API:       @octokit/rest
Diff preview:     react-diff-view or diff2html
Styling:          plain CSS modules or a very small component layer
CI/runtime:       GitHub Actions + Node.js
Install layer:    npx skills
```

Do not build a full-stack app in P0. The only durable backends should be GitHub and GitHub Actions. A small token broker can be added later only if GitHub App auth becomes necessary.

Why not Next.js first:

- The manager does not need SSR, server actions, databases, accounts, or application routing beyond a small SPA.
- GitHub Pages deployment is simpler with Vite static output.
- A Next.js app would imply a hosting/runtime decision that distracts from the Git-native product story.

Why React is still reasonable:

- CodeMirror, Octokit, diff viewers, and form libraries have mature React usage.
- Most contributors can understand and extend a small React SPA quickly.
- If bundle size becomes a problem, the implementation can migrate selected surfaces to Preact without changing the product architecture.

Existing open-source projects to borrow from, not build on top of:

- Decap CMS: borrow the editorial workflow pattern: save draft, create branch, open PR, update PR, merge through GitHub. Do not adopt the whole CMS unless SkillDocs becomes a generic content management product.
- TinaCMS / TinaDocs: borrow the idea of Git-backed Markdown editing and field schemas. Avoid the full visual-editing and GraphQL stack for MVP.
- Vercel `npx skills`: delegate installation, symlink/copy behavior, agent names, and agent path routing. SkillDocs should generate install snippets and validate repository compatibility, not reimplement the installer.
- GitHub web editor / github.dev: use as a fallback deep link when a user does not want to authenticate inside the Pages Manager.

The SkillDocs-specific value is not the Markdown editor itself. It is the package-aware review surface: frontmatter validation, package file tree, script/asset risk labels, provenance, generated `skills.json`, install snippets, and PR workflow.

## 11. CLI MVP

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
skilldocs generate install-snippets
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
- Repository structure is compatible with `npx skills add`.
- Missing or weak descriptions.
- Plain Markdown compatibility.
- Broken local links.
- Generated files out of date.
- Suspicious shell snippets or broad tool-use instructions.
- Overly long `SKILL.md` files that should move content into references.

`skilldocs doctor` should explain:

- Which skills are installable.
- Whether `npx skills` is available locally.
- Which `npx skills add` commands to run for Claude Code, Codex, Antigravity, and other common targets.
- Which adapters can run.
- Which generated files are stale.
- Which client export targets are configured.
- Which risks need human review.

## 12. Adapter Roadmap

Adapters are extension paths, not the product center. The built-in GitHub Pages Skill Manager is the P0 management surface; adapters help teams keep using existing authoring and documentation systems.

### P1: GitBook Authoring Adapter

Why:

- It proves the optional docs-platform pattern: visual docs UI plus Git-backed distribution.
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

### P1: VitePress Portal Adapter

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

### P2: MkDocs Adapter

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

### P2: Obsidian Adapter

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

## 13. China-Specific Strategy

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

## 14. GitHub Public Surface

The GitHub repo must communicate the product before it asks people to install anything. The homepage should feel like the future Skill Manager, not like a whitepaper. The paradigm thesis can live in docs later.

Required public surfaces:

- `README.md`: developer-facing product overview, architecture, user flows, repo structure, and current status.
- `docs/`: a GitHub Pages product surface that prototypes the manager workspace: library, editor, checks, review, and install snippets.
- `docs/quickstart.md`: day-one user workflow for cloning or forking the repo into a daily team skill library.
- `docs/manager-semantics.md`: plain-language definitions for import, labels, live lint, risk, Run checks, draft PR preparation, and install command behavior.
- `docs/development.md`: MVP implementation contract for architecture, data model, UI behavior, GitHub boundaries, lint rules, testing, and milestones.
- `docs/manager/`: the static GitHub Pages Skill Manager for browsing, previewing, linting, and proposing skill package edits.
- `.github/workflows/pages.yml`: a static Pages deployment workflow.
- `.github/workflows/skilldocs.yml`: build/test, package lint, registry drift, package health, and later security checks.
- `PLAN.md`: the deeper product, market, and implementation plan.
- `schemas/`: the future home for `skills.json` and `SKILL.md` compatibility notes.
- `examples/`: concrete team, research, personal, and China-specific skill libraries.
- `templates/`: forkable starter libraries for teams and individuals.
- `case-studies/`: real stories showing agent failures turning into skill improvements.

README first-screen message:

> Git-backed review and management for Agent Skill packages.

GitHub Pages first-screen message:

> A GitHub Pages manager for Agent Skills.

The homepage should show the product workflow immediately:

```text
GitHub repo -> Pages Manager -> branch + PR + CI -> skills.json -> npx skills -> agent directories
```

Future docs can keep the original thesis:

> Skills are not hidden prompts. They are operational documents for agents.

## 15. Initial Repo Structure

Suggested new project structure:

```text
agent-skilldocs/
  README.md
  LICENSE
  PLAN.md
  docs/
    index.html
    manager/
    assets/
  schemas/
    skills-registry.v0.json
    skill-package.v0.json
  packages/
    core/
      src/
      tests/
    manager/
      src/
      tests/
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

## 16. MVP Timeline

### Week 1: Foundation

- Create repo.
- Write README with paradigm positioning.
- Define canonical skill package schema.
- Implement `skilldocs lint`.
- Implement `skilldocs generate registry`.
- Implement `skilldocs generate install-snippets` using `npx skills add` commands.
- Add basic `skilldocs doctor`.
- Port Vios Research Skills as flagship example.
- Build read-only manager prototype: list skills, render `SKILL.md`, show package file tree from `skills.json`.

### Week 2: GitHub Pages Manager

- Implement frontmatter form, Markdown editor, preview, and package health panel.
- Add authenticated PR flow using GitHub API with fine-grained personal access tokens.
- Add branch creation, package edit commit, and draft PR creation.
- Add CI checks for lint, registry drift, scripts, assets, and secrets.
- Add `npx skills add` examples for Claude Code, Codex, Antigravity, and all-agent installs.
- Add generated screenshots or terminal examples.

### Week 3: Launch Package

- Add GitBook and VitePress adapters if scope allows.
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

## 17. Content Strategy

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

## 18. Success Metrics

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

## 19. Non-Goals

Do not start with:

- Hosted SaaS.
- Public marketplace.
- Proprietary registry.
- Backend-heavy multi-tenant web app.
- Universal rich-text converter.
- Replacing existing skill installers.
- Owning the Agent Skills standard.

The project should first be:

- Method.
- Spec.
- GitHub Pages manager.
- CLI.
- Adapters.
- Templates.
- Case studies.

## 20. Risks

### Product risks

- Too many adapters dilute the story.
- Docs platforms may add native skill management.
- Users may confuse the project with prompt management.
- GitHub-only messaging may feel too narrow for non-GitHub teams.

Mitigation:

- Keep P0 to GitHub Pages manager plus package governance.
- Lead with the paradigm and Git-native review path, not one docs vendor.
- Explicitly compare against prompt managers and marketplaces.
- Show both global and China-specific examples.

### Technical risks

- Agent skill directory conventions differ across Claude Code, Codex, Antigravity, and future clients.
- `npx skills` may change its supported agent table, source parsing, or install behavior.
- Nested Git repositories can appear if users clone a SkillDocs repo directly into a project-local agent skills directory.
- Platform Markdown extensions may pollute `SKILL.md`.
- Rich-text exports may lose important structure.
- Generated navigation may diverge from source.
- Client-specific skill conventions may differ.
- GitHub Pages is static and cannot securely hold GitHub App secrets.
- Browser-based edits can conflict with concurrent repository changes.
- Multi-file package edits are more complex than single `SKILL.md` edits.
- Markdown preview can introduce XSS if rendered unsafely.
- Binary assets and scripts can make packages harder to inspect.

Mitigation:

- Delegate install path mapping to `npx skills` where possible.
- Keep SkillDocs focused on package validity, review, provenance, and generated install snippets.
- Add a compatibility check that verifies `npx skills add <repo> --list` can discover the expected packages.
- Document global-first installs and per-project materialization; warn against nested `.git` in `.claude/skills` or `.agents/skills`.
- Keep `SKILL.md` plain Markdown.
- Put adapter-specific metadata in generated files.
- Generate deterministic outputs.
- Add lint rules and compatibility profiles.
- Use branch + PR writes, not direct default-branch commits.
- Use fine-grained personal access tokens in P0; add GitHub App auth only with a secure external token broker.
- Use Git Data APIs for atomic multi-file commits.
- Sanitize Markdown previews.
- Hash and size-check every package file.

### Security risks

- Malicious or sloppy skills can grant unsafe procedural behavior.
- Natural-language descriptions can manipulate discovery.
- Teams may install public skills without review.

Mitigation:

- Add lint, provenance, and review status to MVP.
- Encourage private-first skill libraries.
- Document review checklists.
- Keep marketplace publishing out of v0.1.

## 21. Suggested First Public Release

Release name:

> Agent SkillDocs v0.1

Includes:

- README.
- GitHub Pages site.
- GitHub Pages Skill Manager MVP.
- Canonical skill package schema.
- CLI lint.
- CLI registry generator.
- Generated `npx skills add` install snippets for Claude Code, Codex, Antigravity, and all-agent installs.
- CLI doctor.
- Package-aware `skills.json`.
- Optional GitBook adapter.
- Optional VitePress adapter.
- Vios Research Skills case study.
- One English blog.
- One Chinese blog.

Launch message:

> Agent SkillDocs turns a GitHub repo into a reviewable management layer for team Agent Skill packages, with optional docs adapters when your team already writes somewhere else.

中文：

> Agent SkillDocs 把 GitHub 仓库变成团队 Agent Skill package 的可审查管理层；如果你的团队已经在别的文档平台写作，也可以通过 adapter 接入。

## 22. Source Notes For Market Analysis

Useful external references checked on 2026-05-17 and 2026-05-18:

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
- GitHub Pages site creation and static publishing: https://docs.github.com/pages/getting-started-with-github-pages/creating-a-github-pages-site
- GitHub Pages custom workflows: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- GitHub REST Contents API: https://docs.github.com/en/rest/repos/contents
- GitHub REST Git Trees API: https://docs.github.com/en/rest/git/trees
- GitHub REST Git References API: https://docs.github.com/en/rest/git/refs
- GitHub REST Pull Requests API: https://docs.github.com/en/rest/pulls/pulls
- GitHub App installation access tokens: https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app
- OpenAI Codex skills docs: https://developers.openai.com/codex/skills
- Google Antigravity skills docs: https://antigravity.google/docs/skills
- Vercel Labs `npx skills` CLI: https://github.com/vercel-labs/skills
- Vercel skills launch note: https://vercel.com/changelog/introducing-skills-the-open-agent-skills-ecosystem
- Decap CMS GitHub backend: https://decapcms.org/docs/github-backend/
- Decap CMS editorial workflow: https://decapcms.org/docs/editorial-workflows/
- TinaCMS docs: https://tina.io/docs/
- CodeMirror docs: https://codemirror.net/docs/
- Octokit REST.js: https://github.com/octokit/rest.js
- markdown-it: https://github.com/markdown-it/markdown-it
- marked: https://github.com/markedjs/marked
- DOMPurify: https://github.com/cure53/DOMPurify
- gray-matter: https://github.com/jonschlinkert/gray-matter
- Zod: https://github.com/colinhacks/zod
- Ajv: https://github.com/ajv-validator/ajv
- diff2html: https://github.com/rtfpessoa/diff2html
- react-diff-view: https://github.com/otakustay/react-diff-view
