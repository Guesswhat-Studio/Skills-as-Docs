const app = document.querySelector("#app");
const root = document.documentElement;

const icons = {
  dashboard: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-4H4v4Z"></path></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"></path></svg>',
  sync: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 0 0-15.3-6.4L3 8m0-5v5h5M3 12a9 9 0 0 0 15.3 6.4L21 16m0 5v-5h-5"></path></svg>',
  sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4V2m0 20v-2m8-8h2M2 12h2m14.4-6.4 1.4-1.4M4.2 19.8l1.4-1.4m0-12.8L4.2 4.2m15.6 15.6-1.4-1.4M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path></svg>',
  moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.7A8.5 8.5 0 1 1 11.3 3a6.7 6.7 0 0 0 9.7 9.7Z"></path></svg>',
  github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.4a9.6 9.6 0 0 0-3 18.7c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.1-3.4-1.1-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.5 2.3 1 2.9.8.1-.6.4-1 .7-1.3-2.2-.2-4.6-1.1-4.6-4.7 0-1 .4-1.9 1-2.6-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.2 9.2 0 0 1 4.8 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.5 1 2.6 0 3.6-2.3 4.5-4.6 4.7.4.3.7.9.7 1.9v2.4c0 .3.2.6.7.5A9.6 9.6 0 0 0 12 2.4Z"></path></svg>',
  filter: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z"></path></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m20 6-11 11-5-5"></path></svg>',
  warn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 9v4m0 4h.01M10.3 4.7 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.7a2 2 0 0 0-3.4 0Z"></path></svg>'
};

const skillCreatorMd = `---
name: skill-creator
description: Guide for creating effective skills. Use when users want to create a new skill or update an existing skill that extends Claude, Codex, or Antigravity with specialized knowledge, workflows, or tool integrations.
category: governance/skill-authoring
topics: creation, review, package-structure
owner: @platform
review_status: approved
source_type: public_import
source_url: https://github.com/anthropics/skills/tree/main/skills/skill-creator
approved_by: @platform
evidence: review-notes/approval.md
---

# Skill Creator

This skill helps design, validate, and improve skill packages.

## Package Structure

A skill is a directory with a required SKILL.md entrypoint. It may include references, scripts, assets, agents, eval tooling, and review notes.

## Review Priorities

1. The description should clearly state when the skill should be used.
2. Supporting files should have clear roles.
3. Scripts require extra review because they can execute code.
4. The package should remain readable to humans and installable by agents.`;

const seed = {
  repo: "anthropics/skills",
  branch: "main",
  sha: "a1f9d20",
  metrics: {
    total: 47,
    approved: 38,
    queue: 12,
    highRisk: 5,
    changed: 3,
    evidenceMissing: 3
  },
  packages: [
    {
      id: "skill-creator",
      name: "skill-creator",
      category: "governance/skill-authoring",
      status: "approved",
      risk: "low",
      owner: "@platform",
      source: "github.com/anthropics/skills",
      sourceType: "public_import",
      version: "v0.4.0",
      lane: "ready",
      evidence: "review-notes/approval.md",
      reviewers: ["@platform", "@docs"],
      install: true,
      findings: [],
      files: [
        { path: "skills/skill-creator/SKILL.md", kind: "entrypoint", content: skillCreatorMd, original: skillCreatorMd.replace("evidence: review-notes/approval.md\n", "") },
        { path: "skills/skill-creator/references/schemas.md", kind: "reference", content: "# Schemas\n\nReference material for validating skill metadata, eval specs, and generated reports." },
        { path: "skills/skill-creator/scripts/package_skill.py", kind: "script", content: "from pathlib import Path\n\n\ndef package_skill(root: Path) -> None:\n    print(f'Packaging {root}')\n" },
        { path: "skills/skill-creator/scripts/quick_validate.py", kind: "script", content: "def quick_validate(skill_path):\n    return skill_path.exists()\n" },
        { path: "skills/skill-creator/assets/eval_review.html", kind: "asset", content: "<!doctype html><html><body>Eval review viewer asset.</body></html>" },
        { path: "skills/skill-creator/agents/analyzer.md", kind: "agent", content: "# Analyzer Agent\n\nChecks package structure and review notes before approval." },
        { path: "skills/skill-creator/eval-viewer/viewer.html", kind: "asset", content: "<!doctype html><html><body>Skill evaluation viewer.</body></html>" },
        { path: "skills/skill-creator/review-notes/approval.md", kind: "evidence", content: "# Approval Notes\n\nReviewed trigger clarity, package scope, scripts, and eval viewer assets before approval." }
      ]
    },
    {
      id: "frontend-design",
      name: "frontend-design",
      category: "design/ui",
      status: "review",
      risk: "low",
      owner: "@design",
      source: "github.com/anthropics/skills",
      sourceType: "public_import",
      version: "v0.2.0",
      lane: "in-review",
      evidence: "",
      reviewers: ["@design"],
      install: false,
      findings: ["Evidence note missing before registry exposure."],
      files: [
        { path: "skills/frontend-design/SKILL.md", kind: "entrypoint", content: "---\nname: frontend-design\ndescription: Create distinctive, production-grade frontend interfaces.\ncategory: design/ui\nowner: @design\nreview_status: candidate\nsource_type: public_import\nsource_url: https://github.com/anthropics/skills/tree/main/skills/frontend-design\n---\n\n# Frontend Design\n\nReview visual quality, accessibility, and product fit before implementation." },
        { path: "skills/frontend-design/LICENSE.txt", kind: "supporting", content: "Complete license terms for the frontend-design skill." }
      ]
    },
    {
      id: "pdf",
      name: "pdf",
      category: "documents/pdf",
      status: "candidate",
      risk: "medium",
      owner: "",
      source: "local .codex/skills",
      sourceType: "local",
      version: "v0.1.0",
      lane: "candidate",
      evidence: "",
      reviewers: [],
      install: false,
      findings: ["Owner missing", "Rendering scripts require review"],
      files: [
        { path: "skills/pdf/SKILL.md", kind: "entrypoint", content: "---\nname: pdf\ndescription: Work with PDF files where rendering, extraction, layout, or visual verification matters.\ncategory: documents/pdf\nreview_status: candidate\nsource_type: manual\n---\n\n# PDF\n\nUse this skill for PDF reading, generation, review, rendering, and layout checks." }
      ]
    },
    {
      id: "web-fetch-archive",
      name: "web-fetch-archive",
      category: "web/research",
      status: "blocked",
      risk: "high",
      owner: "",
      source: "github.com/unknown/scrape",
      sourceType: "public_import",
      version: "v0.3.0",
      lane: "blocked",
      evidence: "",
      reviewers: [],
      install: false,
      findings: ["No provenance recorded", "No evidence attached", "Network fetch scripts are unreviewed"],
      files: [
        { path: "skills/web-fetch-archive/SKILL.md", kind: "entrypoint", content: "---\nname: web-fetch-archive\ndescription: Archive web pages for research.\ncategory: web/research\nreview_status: candidate\nsource_type: public_import\n---\n\n# Web Fetch Archive\n\nFetch and archive web content." },
        { path: "skills/web-fetch-archive/scripts/archive.sh", kind: "script", content: "curl \"$1\" | tee archive.html\n" }
      ]
    },
    {
      id: "brand-guidelines",
      name: "brand-guidelines",
      category: "design/brand",
      status: "approved",
      risk: "low",
      owner: "@brand",
      source: "local .claude/skills",
      sourceType: "local",
      version: "v1.1.0",
      lane: "ready",
      evidence: "review-notes/brand.md",
      reviewers: ["@brand"],
      install: true,
      findings: [],
      files: [
        { path: "skills/brand-guidelines/SKILL.md", kind: "entrypoint", content: "---\nname: brand-guidelines\ndescription: Apply approved brand language, tone, and visual constraints.\ncategory: design/brand\nowner: @brand\nreview_status: approved\n---\n\n# Brand Guidelines\n\nUse approved brand rules in customer-facing artifacts." },
        { path: "skills/brand-guidelines/references/tone.md", kind: "reference", content: "# Tone\n\nConcise, exact, and practical." }
      ]
    },
    {
      id: "canvas-design",
      name: "canvas-design",
      category: "design/canvas",
      status: "review",
      risk: "medium",
      owner: "@design",
      source: "github.com/anthropics/skills",
      sourceType: "public_import",
      version: "v0.8.0",
      lane: "in-review",
      evidence: "review-notes/canvas.md",
      reviewers: ["@design", "@platform"],
      install: false,
      findings: ["Large binary font assets need review"],
      files: [
        { path: "skills/canvas-design/SKILL.md", kind: "entrypoint", content: "---\nname: canvas-design\ndescription: Create canvas-based visual assets with layout constraints.\ncategory: design/canvas\nowner: @design\nreview_status: candidate\nsource_type: public_import\n---\n\n# Canvas Design\n\nCreate visual assets using reusable design constraints." },
        { path: "skills/canvas-design/canvas-fonts/ArsenalSC-Regular.ttf", kind: "asset", content: "Binary font asset placeholder." }
      ]
    }
  ],
  activity: [
    ["merge", "skill-creator promoted to approved registry", "6m", "a1f9d20"],
    ["risk", "web-fetch-archive blocked by provenance policy", "14m", "8c20e1b"],
    ["intake", "frontend-design imported from anthropics/skills", "28m", "74b3aa9"],
    ["review", "canvas-design requested asset review", "42m", "d2f9087"],
    ["commit", "approval notes added for skill-creator", "1h", "5fc8a31"]
  ],
  changedFiles: [
    ["skills/skill-creator/SKILL.md", "+6", "-0"],
    ["skills/skill-creator/review-notes/approval.md", "+9", "-0"],
    ["skills/frontend-design/SKILL.md", "+3", "-1"]
  ]
};

const copy = {
  en: {
    "nav.workspace": "Workspace",
    "nav.package": "Package",
    "nav.release": "Release",
    "route.dashboard": "Dashboard",
    "route.intake": "Intake",
    "route.library": "Library",
    "route.editor": "Editor",
    "route.review": "Review",
    "route.registry": "Registry",
    "route.history": "History",
    "action.sync": "sync",
    "action.intake": "Intake",
    "action.settings": "Settings",
    "settings.note": "Configure repository, local skill root, and default install provider.",
    "action.tutorial": "Tutorial",
    "action.manifesto": "Manifesto",
    "search.placeholder": "Find package, finding, or commit...",
    "dashboard.title": "Repository health",
    "dashboard.subtitle": "team-skills · 47 packages tracked · gate enforced on main",
    "dashboard.updated": "updated just now",
    "dashboard.policy": "policy v3 active",
    "dashboard.ci": "CI passing",
    "kpi.total": "Total packages",
    "kpi.approved": "Installable",
    "kpi.queue": "Review queue",
    "kpi.risk": "High-risk findings",
    "loop.title": "Governance loop",
    "loop.caption": "candidate -> provenance -> lint -> evidence -> approval -> registry -> install",
    "board.title": "Review queue",
    "board.caption": "A public skill is not installable until the Git review gate passes.",
    "panel.activity": "Activity",
    "panel.registry": "Registry readiness",
    "panel.findings": "Live policy findings",
    "panel.changes": "Changed files",
    "panel.inventory": "Library snapshot",
    "intake.title": "Bring skills into a governed repo",
    "intake.subtitle": "Public, local, generated, and new skills start as candidates with provenance.",
    "library.title": "Skill inventory",
    "library.subtitle": "Inspect the corpus by package, category, lifecycle, risk, owner, and install readiness.",
    "review.title": "Review before install",
    "review.subtitle": "Policy checks become review work. Approval stays durable in Git.",
    "editor.title": "Skill editor",
    "editor.subtitle": "Choose a governed package, inspect its structure, edit files, preview, diff, and switch into Zen without leaving the editor.",
    "package.title": "Package workspace",
    "package.subtitle": "A skill is a governed package, not only a markdown file.",
    "edit.title": "Editor",
    "preview.title": "Preview",
    "diff.title": "Diff",
    "registry.title": "Approved install registry",
    "registry.subtitle": "Only approved packages expose npx skills install snippets.",
    "history.title": "Git audit trail",
    "history.subtitle": "Commits, PRs, tags, Actions, and registry drift checks are the database for P0.",
    "zen.title": "Zen editor",
    "zen.subtitle": "Focused editing with the same preview and diff font scale.",
    "tutorial.eyebrow": "Guided demo",
    "tutorial.title": "Public skill intake review",
    "tutorial.body": "Turn an Anthropic public skill into a team-approved runtime asset with provenance, evidence, lint, approval, registry output, and install handoff.",
    "tutorial.step1": "Import",
    "tutorial.step1Body": "Public skills enter as candidates.",
    "tutorial.step2": "Review",
    "tutorial.step2Body": "Policy checks explain blockers before install.",
    "tutorial.step3": "Approve",
    "tutorial.step3Body": "Git history and registry generation preserve the decision.",
    "tutorial.openReview": "Open review",
    "tutorial.finish": "Finish",
    "tutorial.replay": "You can replay this from the Tutorial button in the top bar.",
    "toast.synced": "Local demo state refreshed. Durable sync belongs to Git and CI.",
    "toast.checks": "Policy checks ran in-browser. CI should enforce the same rules on PRs.",
    "toast.intake": "New candidate package created in browser-local state.",
    "toast.settings": "Workspace settings saved in browser-local state."
  },
  zh: {
    "nav.workspace": "工作区",
    "nav.package": "包管理",
    "nav.release": "发布",
    "route.dashboard": "总览",
    "route.intake": "导入",
    "route.library": "库",
    "route.editor": "编辑器",
    "route.review": "审查",
    "route.registry": "注册表",
    "route.history": "历史",
    "action.sync": "同步",
    "action.intake": "导入",
    "action.settings": "设置",
    "settings.note": "配置技能仓库、本地 skill 目录和默认安装目标。",
    "action.tutorial": "教程",
    "action.manifesto": "宣言",
    "search.placeholder": "搜索 skill、风险、提交...",
    "dashboard.title": "仓库健康度",
    "dashboard.subtitle": "team-skills · 47 个包 · main 分支启用治理闸门",
    "dashboard.updated": "刚刚更新",
    "dashboard.policy": "policy v3 生效",
    "dashboard.ci": "CI 通过",
    "kpi.total": "全部包",
    "kpi.approved": "可安装",
    "kpi.queue": "待审查",
    "kpi.risk": "高风险",
    "loop.title": "治理链路",
    "loop.caption": "候选 -> 来源 -> lint -> 证据 -> 审批 -> registry -> install",
    "board.title": "审查队列",
    "board.caption": "公开 skill 只有通过 Git 审查闸门后才可安装。",
    "panel.activity": "活动",
    "panel.registry": "Registry 状态",
    "panel.findings": "实时策略发现",
    "panel.changes": "变更文件",
    "panel.inventory": "库快照",
    "intake.title": "把 Skills 纳入治理仓库",
    "intake.subtitle": "公开、本地、生成或新建的 skill 都先成为带来源信息的候选项。",
    "library.title": "Skill 资产库",
    "library.subtitle": "按包、分类、生命周期、风险、owner 和可安装状态查看。",
    "review.title": "先审查，后安装",
    "review.subtitle": "策略检查会变成审查任务，审批结论保留在 Git 中。",
    "editor.title": "Skill 编辑器",
    "editor.subtitle": "选择受治理的 package，查看结构、编辑文件、预览、diff，并在同一个编辑器里进入专注模式。",
    "package.title": "Package 工作台",
    "package.subtitle": "Skill 是一个受治理的 package，不只是一个 markdown 文件。",
    "edit.title": "编辑器",
    "preview.title": "预览",
    "diff.title": "差异",
    "registry.title": "Approved install registry",
    "registry.subtitle": "只有 approved 包会暴露 npx skills 安装命令。",
    "history.title": "Git 审计路径",
    "history.subtitle": "提交、PR、tag、Actions 和 registry drift check 是 P0 的数据库。",
    "zen.title": "专注编辑",
    "zen.subtitle": "编辑、预览和 diff 使用同一字号。",
    "tutorial.eyebrow": "引导教程",
    "tutorial.title": "公开 Skill 导入审查",
    "tutorial.body": "把 Anthropic 的公开 skill 变成团队 approved runtime asset，并保留来源、证据、lint、审批、registry 和安装交接。",
    "tutorial.step1": "导入",
    "tutorial.step1Body": "公开 skills 先进入 candidate。",
    "tutorial.step2": "审查",
    "tutorial.step2Body": "策略检查解释为什么还不能安装。",
    "tutorial.step3": "批准",
    "tutorial.step3Body": "Git 历史和 registry 生成保存决策。",
    "tutorial.openReview": "打开审查",
    "tutorial.finish": "完成",
    "tutorial.replay": "之后可以从顶部 Tutorial 按钮重新查看。",
    "toast.synced": "本地 demo 状态已刷新。真正持久同步交给 Git 和 CI。",
    "toast.checks": "浏览器内策略检查已运行。CI 应在 PR 中执行同样规则。",
    "toast.intake": "已在浏览器本地状态中新建 candidate package。",
    "toast.settings": "工作区设置已保存到浏览器本地状态。"
  }
};

const navGroups = [
  {
    label: "nav.workspace",
    items: [
      ["dashboard", "D", null],
      ["library", "L", 47],
      ["editor", "E", null],
      ["review", "R", 12, true]
    ]
  },
  {
    label: "nav.release",
    items: [
      ["registry", "S", null],
      ["history", "H", null]
    ]
  }
];

const agentOptions = [
  ["codex", "Codex"],
  ["claude-code", "Claude Code"],
  ["antigravity", "Antigravity"]
];

const state = {
  route: "dashboard",
  theme: localStorage.getItem("skills-charter-theme") || "dark",
  locale: localStorage.getItem("skills-charter-locale") || "en",
  selectedPackage: "skill-creator",
  selectedFile: "skills/skill-creator/SKILL.md",
  editorTab: "edit",
  zen: false,
  search: "",
  filtersOpen: false,
  filters: { approved: true, review: true, candidate: true, blocked: true },
  agent: localStorage.getItem("skills-charter-agent") || "codex",
  historySkill: "all",
  intakeOpen: false,
  settingsOpen: false,
  managedRepo: localStorage.getItem("skills-charter-managed-repo") || "Guesswhat-Studio/testSkills",
  managedBranch: localStorage.getItem("skills-charter-managed-branch") || "main",
  localSkillRoot: localStorage.getItem("skills-charter-local-root") || "~/.codex/skills",
  fontSize: Number(localStorage.getItem("skills-charter-font-size") || 13),
  toast: ""
};

function t(key) {
  return copy[state.locale][key] || copy.en[key] || key;
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function packageById(id) {
  return seed.packages.find((pkg) => pkg.id === id) || seed.packages[0];
}

function currentPackage() {
  return packageById(state.selectedPackage);
}

function currentFile() {
  const pkg = currentPackage();
  return pkg.files.find((file) => file.path === state.selectedFile) || pkg.files[0];
}

function setSelectedPackage(id) {
  const pkg = packageById(id);
  state.selectedPackage = pkg.id;
  state.selectedFile = pkg.files[0].path;
}

function statusClass(status) {
  return `status-${status}`;
}

function riskClass(risk) {
  return `risk-${risk || "unknown"}`;
}

function statusChip(status) {
  return `<span class="status-chip ${statusClass(status)}">${esc(status)}</span>`;
}

function riskChip(risk) {
  return `<span class="risk-chip ${riskClass(risk)}">${esc(risk || "unknown")}</span>`;
}

function policyChecks(pkg) {
  const hasSkill = pkg.files.some((file) => file.path.endsWith("/SKILL.md") || file.path.endsWith("SKILL.md"));
  const hasOwner = Boolean(pkg.owner);
  const hasEvidence = pkg.sourceType !== "public_import" || Boolean(pkg.evidence);
  const noHighRisk = pkg.risk !== "high";
  const scriptFiles = pkg.files.filter((file) => file.kind === "script");
  const scriptsReviewed = scriptFiles.length === 0 || pkg.status === "approved" || pkg.reviewers.length > 1;

  return [
    ["SKILL.md entrypoint", hasSkill, "Required manifest and instructions exist."],
    ["Owner recorded", hasOwner, "Every runtime asset needs an accountable owner."],
    ["Provenance captured", Boolean(pkg.source), "Public and local sources must remain visible."],
    ["Evidence attached", hasEvidence, "External packages need review notes before install."],
    ["No high-risk findings", noHighRisk, "High-risk findings block registry exposure."],
    ["Scripts reviewed", scriptsReviewed, scriptFiles.length ? `${scriptFiles.length} executable file(s) found.` : "No executable scripts found."]
  ];
}

function packageIsInstallable(pkg) {
  return pkg.status === "approved" && policyChecks(pkg).every(([, ok]) => ok);
}

function sparkline(values) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * 100;
    const y = 34 - ((value - min) / Math.max(max - min, 1)) * 28;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return `<svg class="spark" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true">
    <polygon points="0,36 ${points.join(" ")} 100,36"></polygon>
    <path d="M${points.join(" L")}"></path>
  </svg>`;
}

function renderSidebar() {
  const groups = navGroups.map((group) => `
    <div class="nav-section">${t(group.label)}</div>
    <nav class="nav-list" aria-label="${esc(t(group.label))}">
      ${group.items.map(([route, glyph, count, alert]) => `
        <button type="button" class="nav-item ${state.route === route ? "active" : ""}" data-action="route" data-route="${route}">
          <span class="nav-glyph">${glyph}</span>
          <span class="nav-text">${t(`route.${route}`)}</span>
          ${count != null ? `<span class="nav-count ${alert ? "alert" : ""}">${count}</span>` : ""}
        </button>
      `).join("")}
    </nav>
  `).join("");

  return `<aside class="sidebar">
    <a class="brand" href="#" data-action="route" data-route="dashboard" aria-label="Skills Charter dashboard">
      <span class="brand-mark">SC</span>
      <span class="brand-title">Skills Charter</span>
      <span class="version-chip">v0.1</span>
    </a>
    <div class="sidebar-scroll">${groups}</div>
    <footer class="sidebar-footer">
      <div class="footer-row"><span>managed repo</span><span class="kbd">${esc(state.managedBranch)}</span></div>
      <div class="footer-row"><span>${esc(state.managedRepo)}</span><span>${seed.metrics.changed} Δ</span></div>
      <div class="footer-row"><span>install target</span><span>${esc(state.agent)}</span></div>
      <p class="sidebar-settings-note">${t("settings.note")}</p>
      <button type="button" class="sidebar-settings" data-action="open-settings">
        <span>S</span><strong>${t("action.settings")}</strong>
      </button>
    </footer>
  </aside>`;
}

function renderTopbar() {
  const routeName = t(`route.${state.route}`);
  return `<header class="topbar">
    <div class="crumbs" aria-label="Repository location">
      <strong>org</strong><span>/</span><strong>team-skills</strong><span>/</span><span>${routeName}</span>
    </div>
    <span class="branch-chip"><span class="dot"></span> main · ${seed.sha}</span>
    <label class="global-search">
      ${icons.search}
      <input type="search" data-search value="${esc(state.search)}" placeholder="${esc(t("search.placeholder"))}" aria-label="${esc(t("search.placeholder"))}">
      <span class="kbd">Ctrl K</span>
    </label>
    <div class="top-actions">
      <button type="button" class="button subtle" data-action="sync">${icons.sync}${t("action.sync")}</button>
      <button type="button" class="button subtle" data-action="tutorial">${t("action.tutorial")}</button>
      <a class="button subtle" href="./blogs/agent-skills-need-governance.html">${t("action.manifesto")}</a>
      <button type="button" class="icon-button" data-action="locale" aria-label="Switch language">${state.locale === "en" ? "中" : "En"}</button>
      <button type="button" class="icon-button" data-action="theme" aria-label="Toggle theme">${state.theme === "dark" ? icons.sun : icons.moon}</button>
      <a class="icon-button" href="https://github.com/Guesswhat-Studio/Skills-as-Docs" aria-label="GitHub">${icons.github}</a>
      <span class="user-chip"><span class="avatar">RA</span><span>r.amir</span></span>
      <button type="button" class="button primary" data-action="open-intake">${icons.plus}${t("action.intake")}</button>
    </div>
  </header>`;
}

function pageHead(title, subtitle, meta = "") {
  return `<div class="page-head">
    <div>
      <h1 class="page-title">${esc(title)}</h1>
      <p class="page-subtitle">${esc(subtitle)}</p>
    </div>
    <div class="page-meta">${meta}</div>
  </div>`;
}

function renderKpis() {
  const kpis = [
    [t("kpi.total"), seed.metrics.total, "skills", "+6", "good", "38 installable · 9 candidate", [22, 24, 25, 28, 30, 33, 35, 39, 41, 44, 47]],
    [t("kpi.approved"), seed.metrics.approved, "/ 47", "81%", "", "approved-only registry", [28, 30, 31, 33, 34, 35, 36, 37, 38, 38, 38]],
    [t("kpi.queue"), seed.metrics.queue, "open", "+4", "warn", "3 blocked · 5 ready", [4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 12]],
    [t("kpi.risk"), seed.metrics.highRisk, "open", "-2", "bad", "computed from live policy findings", [9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 5]]
  ];

  return `<section class="dashboard-grid" aria-label="Repository metrics">
    ${kpis.map(([label, value, unit, delta, tone, foot, spark]) => `
      <article class="kpi-card">
        <div class="kpi-top"><span class="kpi-label">${esc(label)}</span><span class="delta ${tone}">${esc(delta)}</span></div>
        <div class="kpi-value"><strong>${esc(value)}</strong><span>${esc(unit)}</span></div>
        ${sparkline(spark)}
        <div class="kpi-foot"><span>${esc(foot)}</span><span>past 7d</span></div>
      </article>
    `).join("")}
  </section>`;
}

function renderGovernanceLoop() {
  const stages = [
    ["01", "Candidate", "public · local · gen", "14", "done"],
    ["02", "Provenance", "owner · source", "11", "done"],
    ["03", "Lint", "policy checks", "9", "done"],
    ["04", "Evidence", "review notes", "12", "active"],
    ["05", "Approval", "PR merged", "5", ""],
    ["06", "Registry", "skills.json", "38", ""],
    ["07", "Install", "npx skills", "38", ""]
  ];

  return `<section class="card governance-loop">
    <div class="card-head">
      <div><span class="card-eyebrow">${t("loop.title")}</span><p class="page-subtitle">${t("loop.caption")}</p></div>
      <button type="button" class="button subtle" data-action="run-checks">Run policy</button>
    </div>
    <div class="loop-stage-list">
      ${stages.map(([num, name, sub, count, status]) => `
        <div class="loop-stage ${status}">
          <div class="loop-node">${num}</div>
          <div class="loop-name">${esc(name)}</div>
          <div class="loop-sub">${esc(sub)}</div>
          <div class="loop-count">${esc(count)}</div>
        </div>
      `).join("")}
    </div>
  </section>`;
}

function lanePackages(lane) {
  return seed.packages.filter((pkg) => pkg.lane === lane);
}

function renderReviewBoard() {
  const lanes = [
    ["candidate", "Candidate", "var(--muted)"],
    ["in-review", "In review", "var(--info)"],
    ["blocked", "Blocked", "var(--danger)"],
    ["ready", "Ready to merge", "var(--success)"]
  ];

  return `<section class="card review-board">
    <div class="card-head">
      <div><span class="card-eyebrow">${t("board.title")}</span><p class="page-subtitle">${t("board.caption")}</p></div>
      <div class="chip-row"><span class="chip">All</span><span class="chip">Assigned to me</span><span class="chip">External</span><span class="chip">Risk >= med</span></div>
    </div>
    <div class="lane-grid">
      ${lanes.map(([lane, label, color]) => `
        <div class="lane">
          <div class="lane-head"><span><i class="lane-dot" style="background:${color}"></i>${label}</span><span>${lanePackages(lane).length.toString().padStart(2, "0")}</span></div>
          ${lanePackages(lane).map((pkg) => renderTicket(pkg)).join("") || `<div class="tiny">No packages.</div>`}
        </div>
      `).join("")}
    </div>
  </section>`;
}

function renderTicket(pkg) {
  const owner = pkg.owner || "owner missing";
  return `<button type="button" class="ticket ${state.selectedPackage === pkg.id ? "selected" : ""}" data-action="select-package" data-package="${pkg.id}">
    <div class="row-between"><span class="ticket-id">SKL-${pkg.id.slice(0, 3).toUpperCase()}</span>${riskChip(pkg.risk)}</div>
    <div class="ticket-name">${esc(pkg.name)}</div>
    <div class="ticket-meta"><span>${esc(pkg.version)}</span><span>${esc(owner)}</span><span>${pkg.reviewers.length} reviewers</span></div>
    <div class="chip-row">
      <span class="chip">${esc(pkg.sourceType)}</span>
      <span class="chip">${pkg.files.length} files</span>
      ${pkg.evidence ? `<span class="chip">evidence</span>` : `<span class="chip">missing evidence</span>`}
    </div>
  </button>`;
}

function renderActivity() {
  return `<section class="card">
    <div class="card-head"><h2 class="card-title">${t("panel.activity")}</h2><span class="tiny">main</span></div>
    <div class="feed">
      ${seed.activity.map(([kind, text, time, sha]) => `
        <div class="feed-item">
          <div class="row-between"><strong>${esc(text)}</strong><span class="tiny">${esc(time)}</span></div>
          <span class="tiny">${esc(kind)} · ${esc(sha)}</span>
        </div>
      `).join("")}
    </div>
  </section>`;
}

function renderRegistryReadiness() {
  const rows = [
    ["approved", seed.metrics.approved, 81, "var(--accent)"],
    ["pending", 6, 13, "var(--warning)"],
    ["blocked", 3, 6, "var(--danger)"]
  ];
  return `<section class="card">
    <div class="card-head"><h2 class="card-title">${t("panel.registry")}</h2><span class="tiny">${seed.sha}</span></div>
    <div class="readiness">
      <div class="donut"><strong>81%</strong></div>
      <div class="registry-bars">
        ${rows.map(([label, count, pct, color]) => `
          <div class="bar-row"><span>${esc(label)}</span><div class="bar"><span style="width:${pct}%;background:${color}"></span></div><strong>${count}</strong></div>
        `).join("")}
      </div>
    </div>
  </section>`;
}

function renderFindings() {
  const findings = seed.packages.flatMap((pkg) => pkg.findings.map((finding) => [pkg, finding]));
  return `<section class="card">
    <div class="card-head"><h2 class="card-title">${t("panel.findings")}</h2><button type="button" class="button subtle" data-action="run-checks">${icons.check}Run checks</button></div>
    <div class="finding-list">
      ${findings.map(([pkg, finding]) => `
        <div class="finding-item">
          <div class="row-between"><strong>${esc(finding)}</strong>${riskChip(pkg.risk)}</div>
          <span class="tiny">${esc(pkg.name)} · ${esc(pkg.category)}</span>
        </div>
      `).join("")}
    </div>
  </section>`;
}

function renderChangedFiles() {
  return `<section class="card">
    <div class="card-head"><h2 class="card-title">${t("panel.changes")}</h2><span class="tiny">browser-local</span></div>
    <div class="file-change-list">
      ${seed.changedFiles.map(([path, add, del]) => `
        <div class="file-change">
          <div class="row-between"><strong class="mono">${esc(path)}</strong><span class="tiny"><span style="color:var(--success)">${add}</span> <span style="color:var(--danger)">${del}</span></span></div>
        </div>
      `).join("")}
    </div>
  </section>`;
}

function renderInventoryTable() {
  return `<section class="card">
    <div class="card-head"><h2 class="card-title">${t("panel.inventory")}</h2><button type="button" class="button subtle" data-action="route" data-route="library">Open library</button></div>
    <table class="inventory-table">
      <thead><tr><th>Package</th><th>Category</th><th>Status</th><th>Risk</th><th>Owner</th><th>Files</th></tr></thead>
      <tbody>
        ${seed.packages.map((pkg) => `
          <tr data-action="select-package" data-package="${pkg.id}">
            <td><strong>${esc(pkg.name)}</strong></td>
            <td class="mono">${esc(pkg.category)}</td>
            <td>${statusChip(pkg.status)}</td>
            <td>${riskChip(pkg.risk)}</td>
            <td>${esc(pkg.owner || "missing")}</td>
            <td>${pkg.files.length}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  </section>`;
}

function renderDashboard() {
  const meta = `<span>${t("dashboard.updated")}</span><span>·</span><span>${t("dashboard.policy")}</span><span>·</span><span style="color:var(--success)">${t("dashboard.ci")}</span>`;
  return `${pageHead(t("dashboard.title"), t("dashboard.subtitle"), meta)}
    ${renderKpis()}
    ${renderGovernanceLoop()}
    ${renderReviewBoard()}
    <div class="insight-grid">${renderActivity()}${renderRegistryReadiness()}</div>
    <div class="insight-grid">${renderFindings()}${renderChangedFiles()}</div>
    ${renderInventoryTable()}`;
}

function filteredPackages() {
  const query = state.search.trim().toLowerCase();
  return seed.packages.filter((pkg) => {
    const filterOk = state.filters[pkg.status];
    const queryOk = !query || [pkg.name, pkg.category, pkg.owner, pkg.source, pkg.risk, pkg.status].join(" ").toLowerCase().includes(query);
    return filterOk && queryOk;
  });
}

function renderLibrary() {
  const packages = filteredPackages();
  const categories = Object.groupBy ? Object.groupBy(packages, (pkg) => pkg.category.split("/")[0]) : packages.reduce((acc, pkg) => {
    const key = pkg.category.split("/")[0];
    acc[key] = acc[key] || [];
    acc[key].push(pkg);
    return acc;
  }, {});

  return `${pageHead(t("library.title"), t("library.subtitle"))}
    <div class="view-layout library-layout">
      <section class="card library-filter-card">
        <div class="card-head">
          <h2 class="card-title">Category hierarchy</h2>
          <button type="button" class="icon-button" data-action="toggle-filters" aria-label="Filter">${icons.filter}</button>
        </div>
        ${state.filtersOpen ? renderFilters() : ""}
        <div class="category-map">
          ${Object.entries(categories).map(([category, pkgs]) => `
            <div class="category-row">
              <strong>${esc(category)}</strong>
              <div class="category-track">${pkgs.map((pkg) => `<button type="button" class="category-pill" data-action="open-editor-package" data-package="${pkg.id}">${esc(pkg.category)} / ${esc(pkg.name)}</button>`).join("")}</div>
              <span class="count-chip">${pkgs.length}</span>
            </div>
          `).join("")}
        </div>
      </section>
      <section class="card">
        <div class="card-head"><h2 class="card-title">Packages by category</h2><span class="tiny">${packages.length} visible</span></div>
        <div class="category-package-list">
          ${Object.entries(categories).map(([category, pkgs]) => `
            <section class="category-package-group">
              <div class="category-package-head"><strong>${esc(category)}</strong><span class="count-chip">${pkgs.length}</span></div>
              <div class="package-list">
                ${pkgs.map((pkg) => `
                  <button type="button" class="package-row ${state.selectedPackage === pkg.id ? "selected" : ""}" data-action="open-editor-package" data-package="${pkg.id}">
                    <span><strong>${esc(pkg.name)}</strong><span class="package-path">${esc(pkg.category)} · ${esc(pkg.source)}</span></span>
                    <span class="chip-row">${statusChip(pkg.status)}${riskChip(pkg.risk)}<span class="chip">${pkg.files.length} files</span></span>
                  </button>
                `).join("")}
              </div>
            </section>
          `).join("")}
        </div>
      </section>
    </div>`;
}

function renderFilters() {
  return `<div class="filter-popover">
    ${Object.keys(state.filters).map((key) => `
      <button type="button" class="filter-row ${state.filters[key] ? "on" : ""}" data-action="toggle-filter" data-filter="${key}">
        <span>${esc(key)}</span><span class="toggle"><span></span></span>
      </button>
    `).join("")}
  </div>`;
}

function renderChecks(pkg) {
  return `<div class="check-list">
    ${policyChecks(pkg).map(([label, ok, detail]) => `
      <div class="check-item">
        <div class="row-between"><strong>${ok ? icons.check : icons.warn}${esc(label)}</strong><span class="status-chip ${ok ? "status-approved" : "status-blocked"}">${ok ? "pass" : "block"}</span></div>
        <span class="tiny">${esc(detail)}</span>
      </div>
    `).join("")}
  </div>`;
}

function renderReview() {
  const pkg = currentPackage();
  const canInstall = packageIsInstallable(pkg);
  return `${pageHead(t("review.title"), t("review.subtitle"))}
    <div class="view-layout three-column">
      <section class="card">
        <div class="card-head"><h2 class="card-title">Queue</h2><span class="tiny">${seed.metrics.queue} open</span></div>
        <div class="package-list">${seed.packages.map((item) => `
          <button type="button" class="package-row ${pkg.id === item.id ? "selected" : ""}" data-action="select-package" data-package="${item.id}">
            <span><strong>${esc(item.name)}</strong><span class="package-path">${esc(item.source)}</span></span>${riskChip(item.risk)}
          </button>
        `).join("")}</div>
      </section>
      <section class="card">
        <div class="card-head"><div><h2 class="card-title">${esc(pkg.name)}</h2><span class="tiny">${esc(pkg.category)} · ${esc(pkg.version)}</span></div>${statusChip(pkg.status)}</div>
        <div class="panel-body">
          <div class="meta-grid">
            <div class="meta-row"><span class="meta-key">Owner</span><span class="meta-value">${esc(pkg.owner || "missing")}</span></div>
            <div class="meta-row"><span class="meta-key">Source</span><span class="meta-value">${esc(pkg.source)}</span></div>
            <div class="meta-row"><span class="meta-key">Evidence</span><span class="meta-value">${esc(pkg.evidence || "missing")}</span></div>
            <div class="meta-row"><span class="meta-key">Install</span><span class="meta-value">${canInstall ? "available" : "blocked until policy passes"}</span></div>
          </div>
          ${renderChecks(pkg)}
        </div>
      </section>
      <section class="card">
        <div class="card-head"><h2 class="card-title">Decision</h2>${canInstall ? statusChip("approved") : statusChip("blocked")}</div>
        <div class="panel-body">
          <p class="page-subtitle">${canInstall ? "This package can be written to the approved registry and installed downstream." : "Approval is blocked. Resolve policy findings, owner, provenance, or evidence before exposing install snippets."}</p>
          <div class="chip-row">
            <button type="button" class="button subtle" data-action="route" data-route="editor">Open editor</button>
            <button type="button" class="button subtle" data-action="run-checks">Run checks</button>
            <button type="button" class="button ${canInstall ? "primary" : "subtle"}" data-action="route" data-route="registry">Registry</button>
          </div>
        </div>
      </section>
    </div>`;
}

function renderFileList(pkg) {
  return pkg.files.map((file) => `
    <button type="button" class="file-row ${state.selectedFile === file.path ? "selected" : ""}" data-action="select-file" data-file="${esc(file.path)}">
      <span class="file-path">${esc(file.path.replace(`skills/${pkg.name}/`, ""))}</span>
      <span class="chip">${esc(file.kind)}</span>
    </button>
  `).join("");
}

function renderMeta(pkg) {
  return `<div class="meta-grid">
    <div class="meta-row"><span class="meta-key">Name</span><span class="meta-value">${esc(pkg.name)}</span></div>
    <div class="meta-row"><span class="meta-key">Category</span><span class="meta-value">${esc(pkg.category)}</span></div>
    <div class="meta-row"><span class="meta-key">Status</span><span class="meta-value">${esc(pkg.status)}</span></div>
    <div class="meta-row"><span class="meta-key">Owner</span><span class="meta-value">${esc(pkg.owner || "missing")}</span></div>
    <div class="meta-row"><span class="meta-key">Source</span><span class="meta-value">${esc(pkg.source)}</span></div>
    <div class="meta-row"><span class="meta-key">Evidence</span><span class="meta-value">${esc(pkg.evidence || "missing")}</span></div>
  </div>`;
}

function renderEditorWorkspace() {
  const pkg = currentPackage();
  const file = currentFile();
  const body = state.editorTab === "package" ? renderEditorPackage(pkg) : state.editorTab === "preview" ? renderPreview(file) : state.editorTab === "diff" ? renderDiff(file) : renderEditor(file);
  const tabs = [
    ["package", "Package"],
    ["edit", "Edit"],
    ["preview", "Preview"],
    ["diff", "Diff"]
  ];

  return `${pageHead(t("editor.title"), t("editor.subtitle"), `<span>${esc(pkg.name)}</span><span>·</span><span>${esc(file.path)}</span>`)}
    <section class="editor-control-card card">
      <div class="card-head">
        <div class="editor-tabs" role="tablist" aria-label="Editor views">
          ${tabs.map(([tab, label]) => `<button type="button" class="${state.editorTab === tab ? "active" : ""}" data-action="editor-tab" data-tab="${tab}">${label}</button>`).join("")}
        </div>
        <div class="chip-row">
          <button type="button" class="button subtle ${state.zen ? "active" : ""}" data-action="toggle-zen">Zen</button>
          <button type="button" class="button subtle" data-action="run-checks">Run checks</button>
          <button type="button" class="button primary" data-action="route" data-route="review">Review</button>
        </div>
      </div>
    </section>
    <div class="editor-workspace ${state.zen ? "zen-active" : ""}">
      <section class="workspace-panel editor-side">
        <div class="card-head"><h2 class="card-title">Skill package</h2><span class="count-chip">${seed.packages.length}</span></div>
        <div class="panel-body">
          <div class="package-picker">
            ${seed.packages.map((item) => `
              <button type="button" class="package-row compact ${pkg.id === item.id ? "selected" : ""}" data-action="select-package" data-package="${item.id}">
                <span><strong>${esc(item.name)}</strong><span class="package-path">${esc(item.category)}</span></span>
                ${riskChip(item.risk)}
              </button>
            `).join("")}
          </div>
          <div class="split-head"><h3 class="card-title">Files</h3><span class="count-chip">${pkg.files.length}</span></div>
          <div class="file-list">${renderFileList(pkg)}</div>
        </div>
      </section>
      <section class="workspace-panel editor-main ${state.editorTab === "package" ? "" : "editor-shell"}">${body}</section>
      <section class="workspace-panel editor-side">
        <div class="card-head"><h2 class="card-title">Governance</h2>${statusChip(pkg.status)}</div>
        <div class="panel-body">
          ${renderMeta(pkg)}
          ${renderChecks(pkg)}
          <div class="settings-grid inline-settings">
            <div class="split-head"><h3 class="card-title">Editor scale</h3><span class="kbd">${state.fontSize}px</span></div>
            <label class="range-row"><span>Font size</span><input type="range" min="12" max="20" value="${state.fontSize}" data-font-size><span class="kbd">${state.fontSize}px</span></label>
          </div>
        </div>
      </section>
    </div>`;
}

function renderEditorPackage(pkg) {
  return `<div class="panel-body editor-package-tab">
    <div class="editor-package-grid">
      <section>
        <div class="split-head"><h2 class="card-title">Package graph</h2><span class="count-chip">${pkg.files.length}</span></div>
        <div class="graph">
          <div class="graph-node"><span class="node-mark">PKG</span><strong>${esc(pkg.name)}</strong>${statusChip(pkg.status)}</div>
          <div class="graph-node"><span class="node-mark">CAT</span><span>${esc(pkg.category)}</span>${riskChip(pkg.risk)}</div>
          ${pkg.files.map((file) => `<div class="graph-node"><span class="node-mark">${file.kind.slice(0, 3).toUpperCase()}</span><span class="file-path">${esc(file.path)}</span><span class="chip">${esc(file.kind)}</span></div>`).join("")}
        </div>
      </section>
      <section>
        <div class="split-head"><h2 class="card-title">Package metadata</h2><span class="tiny">SKILL.md frontmatter</span></div>
        ${renderMeta(pkg)}
        <div class="chip-row"><button type="button" class="button subtle" data-action="editor-tab" data-tab="edit">Edit SKILL.md</button><button type="button" class="button subtle" data-action="editor-tab" data-tab="diff">View diff</button></div>
      </section>
    </div>
  </div>`;
}

function lineNumbers(content) {
  return content.split("\n").map((_, index) => index + 1).join("\n");
}

function renderEditor(file) {
  return `<div class="editor-toolbar">
    <div><h2>${esc(file.path)}</h2><span class="tiny">${esc(file.kind)} · browser-local edits</span></div>
    <div class="chip-row"><button type="button" class="button subtle" data-action="editor-tab" data-tab="preview">Preview</button><button type="button" class="button subtle" data-action="editor-tab" data-tab="diff">Diff</button></div>
  </div>
  <div class="editor-surface">
    <pre class="line-numbers">${lineNumbers(file.content)}</pre>
    <textarea class="code-textarea" data-editor spellcheck="false">${esc(file.content)}</textarea>
  </div>`;
}

function renderPreview(file) {
  const isMarkdown = file.path.endsWith(".md");
  const html = isMarkdown ? markdownPreview(file.content) : highlightCode(file.content);
  return `<div class="editor-toolbar">
    <div><h2>${esc(file.path)}</h2><span class="tiny">syntax-aware preview</span></div>
    <div class="chip-row"><button type="button" class="button subtle" data-action="editor-tab" data-tab="edit">Edit</button><button type="button" class="button subtle" data-action="editor-tab" data-tab="diff">Diff</button></div>
  </div>
  <div class="${isMarkdown ? "preview-doc" : "code-preview"}">${html}</div>`;
}

function markdownPreview(markdown) {
  return markdown.split("\n").map((line) => {
    if (line.startsWith("# ")) return `<h1>${esc(line.slice(2))}</h1>`;
    if (line.startsWith("## ")) return `<h2>${esc(line.slice(3))}</h2>`;
    if (/^\d+\.\s/.test(line)) return `<p><strong>${esc(line)}</strong></p>`;
    if (line.startsWith("- ")) return `<p>• ${esc(line.slice(2))}</p>`;
    if (!line.trim()) return "<br>";
    return `<p>${esc(line).replace(/`([^`]+)`/g, "<code>$1</code>")}</p>`;
  }).join("");
}

function highlightCode(code) {
  return `<pre>${code.split("\n").map((line) => {
    const escaped = esc(line);
    if (line.startsWith("#")) return `<span class="syntax-heading">${escaped}</span>`;
    if (/^\s*(from|import|def|class|return)\b/.test(line)) return `<span class="syntax-key">${escaped}</span>`;
    if (/^\w[\w-]*:/.test(line)) return escaped.replace(/^([^:]+)(:)(.*)$/, '<span class="syntax-key">$1</span>$2<span class="syntax-string">$3</span>');
    return escaped;
  }).join("\n")}</pre>`;
}

function renderDiff(file) {
  const before = (file.original || file.content).split("\n");
  const after = file.content.split("\n");
  const max = Math.max(before.length, after.length);
  const lines = [];
  for (let index = 0; index < max; index += 1) {
    if (before[index] === after[index]) {
      lines.push(["keep", " ", after[index] || ""]);
    } else {
      if (before[index]) lines.push(["remove", "-", before[index]]);
      if (after[index]) lines.push(["add", "+", after[index]]);
    }
  }
  return `<div class="editor-toolbar">
    <div><h2>${esc(file.path)}</h2><span class="tiny">browser-local diff against imported package</span></div>
    <div class="chip-row"><button type="button" class="button subtle" data-action="editor-tab" data-tab="edit">Edit</button><button type="button" class="button subtle" data-action="editor-tab" data-tab="preview">Preview</button></div>
  </div>
  <div class="diff-view">${lines.map(([type, mark, text]) => `<div class="diff-line ${type}"><span>${mark}</span><span>${esc(text)}</span></div>`).join("")}</div>`;
}

function renderRegistry() {
  const approved = seed.packages.filter(packageIsInstallable);
  const agentLabel = agentOptions.find(([id]) => id === state.agent)?.[1] || state.agent;
  const registry = {
    name: "team-skills",
    generatedFrom: seed.sha,
    installPolicy: "approved-only",
    defaultAgent: state.agent,
    skills: approved.map((pkg) => ({
      name: pkg.name,
      category: pkg.category,
      version: pkg.version,
      path: `skills/${pkg.name}`,
      install: `npx skills add ${state.managedRepo} --skill ${pkg.name} -g -a ${state.agent}`
    }))
  };

  return `${pageHead(t("registry.title"), t("registry.subtitle"))}
    <div class="view-layout registry-layout">
      <section class="card">
        <div class="card-head"><h2 class="card-title">Install target</h2><span class="status-chip status-approved">${esc(agentLabel)}</span></div>
        <div class="agent-option-grid">
          ${agentOptions.map(([id, label]) => `
            <button type="button" class="agent-option ${state.agent === id ? "selected" : ""}" data-action="set-agent" data-agent="${id}">
              <strong>${esc(label)}</strong>
              <span class="tiny">-a ${esc(id)}</span>
            </button>
          `).join("")}
        </div>
        <div class="meta-grid">
          <div class="meta-row"><span class="meta-key">Managed repo</span><span class="meta-value">${esc(state.managedRepo)}</span></div>
          <div class="meta-row"><span class="meta-key">Registry mode</span><span class="meta-value">approved-only</span></div>
        </div>
      </section>
      <section class="card">
        <div class="card-head"><h2 class="card-title">Install snippets</h2><span class="count-chip">${approved.length}</span></div>
        <table class="registry-table">
          <thead><tr><th>Skill</th><th>Status</th><th>Command</th></tr></thead>
          <tbody>${approved.map((pkg) => `
            <tr><td>${esc(pkg.name)}</td><td>${statusChip(pkg.status)}</td><td class="mono">npx skills add ${esc(state.managedRepo)} --skill ${esc(pkg.name)} -g -a ${esc(state.agent)}</td></tr>
          `).join("")}</tbody>
        </table>
      </section>
      <section class="card">
        <div class="card-head"><h2 class="card-title">skills.json</h2><span class="tiny">generated</span></div>
        <pre class="registry-json">${esc(JSON.stringify(registry, null, 2))}</pre>
      </section>
    </div>`;
}

function renderHistory() {
  const selected = state.historySkill === "all" ? null : packageById(state.historySkill);
  const visiblePackages = selected ? [selected] : seed.packages;
  const items = [
    ["skill-creator", "v0.4.0", "PR #284", "Approve after evidence review", "a1f9d20"],
    ["frontend-design", "v0.2.0", "PR #281", "Imported from anthropics/skills for design review", "74b3aa9"],
    ["canvas-design", "v0.8.0", "Action", "Asset review requested for font bundle", "d2f9087"],
    ["web-fetch-archive", "v0.3.0", "Action", "Blocked by provenance policy", "8c20e1b"],
    ["brand-guidelines", "v1.1.0", "Tag", "Approved internal brand package", "019cbf2"]
  ];
  const visibleItems = items.filter(([pkg]) => !selected || pkg === selected.name);

  return `${pageHead(t("history.title"), t("history.subtitle"))}
    <section class="card history-filter-card">
      <div class="card-head"><h2 class="card-title">Skill filter</h2><span class="tiny">version-aware audit</span></div>
      <div class="history-filter-row">
        <button type="button" class="chip ${state.historySkill === "all" ? "selected" : ""}" data-action="history-filter" data-package="all">All skills</button>
        ${seed.packages.map((pkg) => `<button type="button" class="chip ${state.historySkill === pkg.id ? "selected" : ""}" data-action="history-filter" data-package="${pkg.id}">${esc(pkg.name)}</button>`).join("")}
      </div>
    </section>
    <div class="view-layout two-column">
      <section class="card">
        <div class="card-head"><h2 class="card-title">Audit timeline</h2><span class="tiny">Git-backed</span></div>
        <div class="timeline">${visibleItems.map(([pkg, version, kind, text, ref]) => `
          <div class="timeline-item"><div class="row-between"><strong>${esc(pkg)} · ${esc(version)}</strong><span class="tiny">${esc(ref)}</span></div><span class="page-subtitle">${esc(kind)} · ${esc(text)}</span></div>
        `).join("")}</div>
      </section>
      <section class="card">
        <div class="card-head"><h2 class="card-title">Versions</h2><span class="tiny">${visiblePackages.length} packages</span></div>
        <table class="registry-table">
          <thead><tr><th>Skill</th><th>Current</th><th>Status</th><th>Rollback point</th></tr></thead>
          <tbody>${visiblePackages.map((pkg) => `
            <tr><td>${esc(pkg.name)}</td><td class="mono">${esc(pkg.version)}</td><td>${statusChip(pkg.status)}</td><td class="mono">${esc(pkg.name)}@${esc(pkg.version)}</td></tr>
          `).join("")}</tbody>
        </table>
      </section>
    </div>
    <section class="card">
      <div class="card-head"><h2 class="card-title">Database boundary</h2><span class="tiny">P0</span></div>
      <p class="page-subtitle">Skills Charter can stay static while Git remains the durable backend. Add a database only for hosted multi-repo aggregation, accounts, analytics, or SaaS collaboration.</p>
      <div class="meta-grid">
        <div class="meta-row"><span class="meta-key">State</span><span class="meta-value">Git repo, PRs, Actions, tags</span></div>
        <div class="meta-row"><span class="meta-key">UI</span><span class="meta-value">GitHub Pages static manager</span></div>
        <div class="meta-row"><span class="meta-key">Install</span><span class="meta-value">npx skills consumes approved registry</span></div>
      </div>
    </section>`;
}

function renderRoute() {
  if (state.route === "dashboard") return renderDashboard();
  if (state.route === "library") return renderLibrary();
  if (state.route === "editor") return renderEditorWorkspace();
  if (state.route === "review") return renderReview();
  if (state.route === "registry") return renderRegistry();
  if (state.route === "history") return renderHistory();
  return renderDashboard();
}

function renderIntakeModal() {
  if (!state.intakeOpen) return "";
  return `<section class="modal-shell" role="dialog" aria-modal="true" aria-label="Intake skills">
    <button type="button" class="modal-backdrop" data-action="close-modal" aria-label="Close intake"></button>
    <article class="modal-panel wide-modal">
      <div class="modal-head">
        <div><span class="eyebrow">${t("action.intake")}</span><h2>Import or create skills</h2><p class="page-subtitle">Bring local folders or public GitHub skills into the managed repo as candidates. Configure the managed repo in Settings.</p></div>
        <button type="button" class="icon-button" data-action="close-modal" aria-label="Close intake">x</button>
      </div>
      <div class="modal-grid">
        <section class="choice-card">
          <span class="card-eyebrow">Local folder</span>
          <h3>Select existing skills</h3>
          <p class="page-subtitle">Upload a local .claude/skills, .codex/skills, or .agents/skills folder for browser-side review.</p>
          <label class="input-block"><span class="tiny">Folder picker</span><input type="file" webkitdirectory multiple></label>
          <button type="button" class="button subtle" data-action="run-checks">Stage local candidates</button>
        </section>
        <section class="choice-card">
          <span class="card-eyebrow">Remote GitHub</span>
          <h3>Import public repo</h3>
          <p class="page-subtitle">Import all skills or a specific skill path from a public repository. Public imports stay candidates.</p>
          <label class="input-block"><span class="tiny">Repository</span><input value="anthropics/skills" aria-label="GitHub repository"></label>
          <label class="input-block"><span class="tiny">Skill filter</span><input value="skills/skill-creator" aria-label="Specific skill path"></label>
          <div class="chip-row"><button type="button" class="button primary" data-action="run-checks">Import selected</button><button type="button" class="button subtle" data-action="run-checks">Import all</button></div>
        </section>
        <section class="choice-card">
          <span class="card-eyebrow">New package</span>
          <h3>Create governed skill</h3>
          <p class="page-subtitle">Start from a SKILL.md template with required metadata, owner, source, category, and review status.</p>
          <label class="input-block"><span class="tiny">Skill folder</span><input value="new-governed-skill" aria-label="New skill folder"></label>
          <button type="button" class="button primary" data-action="new-candidate">Create candidate</button>
        </section>
      </div>
      <div class="modal-foot">
        <span class="tiny">Target repo: ${esc(state.managedRepo)} · ${esc(state.managedBranch)}</span>
        <button type="button" class="button subtle" data-action="open-settings">Open settings</button>
      </div>
    </article>
  </section>`;
}

function renderSettingsModal() {
  if (!state.settingsOpen) return "";
  return `<section class="modal-shell" role="dialog" aria-modal="true" aria-label="Settings">
    <button type="button" class="modal-backdrop" data-action="close-modal" aria-label="Close settings"></button>
    <article class="modal-panel">
      <div class="modal-head">
        <div><span class="eyebrow">${t("action.settings")}</span><h2>Workspace settings</h2><p class="page-subtitle">Configure the Git-backed skill library this static manager is reviewing.</p></div>
        <button type="button" class="icon-button" data-action="close-modal" aria-label="Close settings">x</button>
      </div>
      <div class="settings-form">
        <label class="input-block"><span class="tiny">Managed skills repo</span><input data-setting="managedRepo" value="${esc(state.managedRepo)}"></label>
        <label class="input-block"><span class="tiny">Default branch</span><input data-setting="managedBranch" value="${esc(state.managedBranch)}"></label>
        <label class="input-block"><span class="tiny">Local skill root</span><input data-setting="localSkillRoot" value="${esc(state.localSkillRoot)}"></label>
        <div>
          <span class="tiny">Default install provider</span>
          <div class="agent-option-grid">
            ${agentOptions.map(([id, label]) => `
              <button type="button" class="agent-option ${state.agent === id ? "selected" : ""}" data-action="set-agent" data-agent="${id}">
                <strong>${esc(label)}</strong><span class="tiny">-a ${esc(id)}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </div>
      <div class="modal-foot">
        <span class="tiny">Saved locally for this GitHub Pages demo.</span>
        <button type="button" class="button primary" data-action="save-settings">Save settings</button>
      </div>
    </article>
  </section>`;
}

function render() {
  root.dataset.theme = state.theme;
  root.dataset.locale = state.locale;
  root.style.setProperty("--editor-font-size", `${state.fontSize}px`);
  app.innerHTML = `<div class="app">${renderSidebar()}${renderTopbar()}<main class="main">${renderRoute()}</main></div>${renderIntakeModal()}${renderSettingsModal()}${state.toast ? `<div class="toast">${esc(state.toast)}</div>` : ""}`;
  translateTutorial();
}

function translateTutorial() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
}

function showToast(message) {
  state.toast = message;
  render();
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    state.toast = "";
    render();
  }, 2400);
}

function openTutorial() {
  translateTutorial();
  document.querySelector("[data-tutorial]").classList.remove("hidden");
}

function finishTutorial() {
  localStorage.setItem("skills-charter-tutorial-done", "true");
  document.querySelector("[data-tutorial]").classList.add("hidden");
}

document.addEventListener("click", (event) => {
  const actionEl = event.target.closest("[data-action]");
  if (!actionEl) return;
  const action = actionEl.dataset.action;

  if (action === "route") {
    event.preventDefault();
    state.route = actionEl.dataset.route || "dashboard";
    state.zen = false;
    if (actionEl.dataset.closeTutorial) finishTutorial();
    render();
    return;
  }

  if (action === "theme") {
    state.theme = state.theme === "dark" ? "light" : "dark";
    localStorage.setItem("skills-charter-theme", state.theme);
    render();
    return;
  }

  if (action === "locale") {
    state.locale = state.locale === "en" ? "zh" : "en";
    localStorage.setItem("skills-charter-locale", state.locale);
    render();
    return;
  }

  if (action === "tutorial") {
    openTutorial();
    return;
  }

  if (action === "finish-tutorial") {
    finishTutorial();
    return;
  }

  if (action === "open-intake") {
    state.intakeOpen = true;
    state.settingsOpen = false;
    render();
    return;
  }

  if (action === "open-settings") {
    state.settingsOpen = true;
    state.intakeOpen = false;
    render();
    return;
  }

  if (action === "close-modal") {
    state.intakeOpen = false;
    state.settingsOpen = false;
    render();
    return;
  }

  if (action === "select-package") {
    const id = actionEl.dataset.package;
    if (id) setSelectedPackage(id);
    render();
    return;
  }

  if (action === "open-editor-package") {
    const id = actionEl.dataset.package;
    if (id) setSelectedPackage(id);
    state.route = "editor";
    state.editorTab = "edit";
    state.zen = false;
    render();
    return;
  }

  if (action === "select-file") {
    state.selectedFile = actionEl.dataset.file;
    render();
    return;
  }

  if (action === "editor-tab") {
    state.editorTab = actionEl.dataset.tab || "edit";
    render();
    return;
  }

  if (action === "toggle-zen") {
    state.zen = !state.zen;
    render();
    return;
  }

  if (action === "set-agent") {
    state.agent = actionEl.dataset.agent || "codex";
    localStorage.setItem("skills-charter-agent", state.agent);
    render();
    return;
  }

  if (action === "history-filter") {
    state.historySkill = actionEl.dataset.package || "all";
    render();
    return;
  }

  if (action === "toggle-filters") {
    state.filtersOpen = !state.filtersOpen;
    render();
    return;
  }

  if (action === "toggle-filter") {
    const filter = actionEl.dataset.filter;
    state.filters[filter] = !state.filters[filter];
    render();
    return;
  }

  if (action === "sync") {
    showToast(t("toast.synced"));
    return;
  }

  if (action === "run-checks") {
    showToast(t("toast.checks"));
    return;
  }

  if (action === "new-candidate") {
    const id = `new-skill-${seed.packages.length + 1}`;
    seed.packages.unshift({
      id,
      name: id,
      category: "draft/general",
      status: "candidate",
      risk: "unknown",
      owner: "",
      source: "browser-local",
      sourceType: "new",
      version: "v0.0.1",
      lane: "candidate",
      evidence: "",
      reviewers: [],
      install: false,
      findings: ["Owner missing", "Evidence missing"],
      files: [{ path: `skills/${id}/SKILL.md`, kind: "entrypoint", content: `---\nname: ${id}\ndescription: Describe when this skill should be used.\ncategory: draft/general\nreview_status: candidate\nsource_type: new\n---\n\n# ${id}\n\nWrite the skill instructions here.` }]
    });
    setSelectedPackage(id);
    state.route = "editor";
    state.editorTab = "edit";
    state.intakeOpen = false;
    showToast(t("toast.intake"));
    return;
  }

  if (action === "save-settings") {
    const managedRepo = document.querySelector('[data-setting="managedRepo"]')?.value.trim();
    const managedBranch = document.querySelector('[data-setting="managedBranch"]')?.value.trim();
    const localSkillRoot = document.querySelector('[data-setting="localSkillRoot"]')?.value.trim();
    if (managedRepo) state.managedRepo = managedRepo;
    if (managedBranch) state.managedBranch = managedBranch;
    if (localSkillRoot) state.localSkillRoot = localSkillRoot;
    localStorage.setItem("skills-charter-managed-repo", state.managedRepo);
    localStorage.setItem("skills-charter-managed-branch", state.managedBranch);
    localStorage.setItem("skills-charter-local-root", state.localSkillRoot);
    state.settingsOpen = false;
    showToast(t("toast.settings"));
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-search]")) {
    state.search = event.target.value;
    if (state.route === "library") render();
    return;
  }

  if (event.target.matches("[data-editor]")) {
    currentFile().content = event.target.value;
    const numbers = event.target.closest(".editor-surface")?.querySelector(".line-numbers");
    if (numbers) numbers.textContent = lineNumbers(event.target.value);
    return;
  }

  if (event.target.matches("[data-font-size]")) {
    state.fontSize = Number(event.target.value);
    localStorage.setItem("skills-charter-font-size", String(state.fontSize));
    render();
  }
});

render();

if (!localStorage.getItem("skills-charter-tutorial-done")) {
  window.setTimeout(openTutorial, 650);
}
