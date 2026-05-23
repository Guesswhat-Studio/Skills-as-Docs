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

const seed = {
  repo: "Guesswhat-Studio/testSkills",
  branch: "main",
  sha: "skills.json",
  registryGeneratedAt: "",
  registrySourceLabel: "embedded",
  registry: null,
  metrics: {
    total: 0,
    approved: 0,
    queue: 0,
    blocked: 0,
    highRisk: 0,
    changed: 0,
    evidenceMissing: 0,
    findings: 0
  },
  packages: [],
  activity: [],
  changedFiles: []
};

const embeddedRegistry = {
  generated_at: "2026-05-23T00:00:00.000Z",
  source: { repository: "Guesswhat-Studio/testSkills" },
  packages: [
    {
      name: "skill-creator",
      path: "skills/skill-creator",
      entrypoint: "skills/skill-creator/SKILL.md",
      description: "Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or optimize an existing skill, run evals to test a skill, benchmark skill performance with variance analysis, or optimize a skill's description for better triggering accuracy.",
      category: "governance/skill-authoring",
      version: "0.1.0",
      owner: "@platform",
      review_status: "candidate",
      lifecycle: "candidate",
      provenance: {
        source_type: "public_import",
        source_url: "https://github.com/anthropics/skills/tree/main/skills/skill-creator",
        imported_at: "2026-05-23T00:00:00.000Z",
        imported_by: "@Guesswhat-Studio"
      },
      evidence: { evals: [], reports: [], review_notes: ["skills/skill-creator/review-notes/intake.md"], trigger_samples: [] },
      risk: "medium",
      risk_reasons: ["external-url.review-required", "asset.review-required", "script.review-required"],
      files: [
        { path: "skills/skill-creator/SKILL.md", kind: "entrypoint", size: 33928 },
        { path: "skills/skill-creator/agents/analyzer.md", kind: "supporting", size: 10650 },
        { path: "skills/skill-creator/agents/comparator.md", kind: "supporting", size: 7489 },
        { path: "skills/skill-creator/agents/grader.md", kind: "supporting", size: 9272 },
        { path: "skills/skill-creator/assets/eval_review.html", kind: "asset", size: 7204 },
        { path: "skills/skill-creator/eval-viewer/generate_review.py", kind: "supporting", size: 16836 },
        { path: "skills/skill-creator/eval-viewer/viewer.html", kind: "supporting", size: 46323 },
        { path: "skills/skill-creator/LICENSE.txt", kind: "supporting", size: 11546 },
        { path: "skills/skill-creator/references/schemas.md", kind: "supporting", size: 12491 },
        { path: "skills/skill-creator/review-notes/intake.md", kind: "evidence", size: 1909 },
        { path: "skills/skill-creator/scripts/__init__.py", kind: "script", size: 0 },
        { path: "skills/skill-creator/scripts/aggregate_benchmark.py", kind: "script", size: 14787 },
        { path: "skills/skill-creator/scripts/generate_report.py", kind: "script", size: 13173 },
        { path: "skills/skill-creator/scripts/improve_description.py", kind: "script", size: 11363 },
        { path: "skills/skill-creator/scripts/package_skill.py", kind: "script", size: 4370 },
        { path: "skills/skill-creator/scripts/quick_validate.py", kind: "script", size: 4074 },
        { path: "skills/skill-creator/scripts/run_eval.py", kind: "script", size: 11774 },
        { path: "skills/skill-creator/scripts/run_loop.py", kind: "script", size: 13933 },
        { path: "skills/skill-creator/scripts/utils.py", kind: "script", size: 1708 }
      ]
    }
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
    "action.runPolicy": "Run policy",
    "action.runPdfIntake": "Run PDF intake",
    "action.running": "Running...",
    "search.placeholder": "Find package, finding, or commit...",
    "dashboard.title": "Repository health",
    "dashboard.subtitle": "Managed skills registry loaded from skills.json.",
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
    "toast.synced": "Registry reloaded from the configured GitHub repository.",
    "toast.checks": "Policy checks recalculated from the current staged package state.",
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
    "action.runPolicy": "运行策略",
    "action.runPdfIntake": "导入 PDF",
    "action.running": "运行中...",
    "search.placeholder": "搜索 skill、风险、提交...",
    "dashboard.title": "仓库健康度",
    "dashboard.subtitle": "从 skills.json 加载受治理的 skills registry。",
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
    "toast.synced": "已从配置的 GitHub 仓库重新加载 registry。",
    "toast.checks": "已根据当前 staged package 状态重新计算策略检查。",
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
  dataStatus: "embedded",
  dataSource: "embedded snapshot",
  loadError: "",
  intakeStatus: "",
  localFiles: [],
  busy: "",
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

function slugify(value, fallback = "new-skill") {
  const slug = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

function cleanRepoName(value = state.managedRepo) {
  return String(value || "")
    .replace(/^https?:\/\/github\.com\//i, "")
    .replace(/\.git$/i, "")
    .replace(/^\/+|\/+$/g, "");
}

function encodePath(path) {
  return String(path || "").split("/").map(encodeURIComponent).join("/");
}

function registryUrl() {
  return `https://raw.githubusercontent.com/${cleanRepoName()}/${encodeURIComponent(state.managedBranch)}/skills.json`;
}

function rawFileUrl(path) {
  return `https://raw.githubusercontent.com/${cleanRepoName()}/${encodeURIComponent(state.managedBranch)}/${encodePath(path)}`;
}

function githubRawUrl(repo, branch, path) {
  return `https://raw.githubusercontent.com/${cleanRepoName(repo)}/${encodeURIComponent(branch || "main")}/${encodePath(path)}`;
}

function formatDateTime(value) {
  if (!value) return "not recorded";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(state.locale === "zh" ? "zh-CN" : "en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function uniqueList(values) {
  return [...new Set(values.filter(Boolean))];
}

function normalizeStatus(value) {
  const status = String(value || "candidate").toLowerCase().replace(/_/g, "-");
  if (["approved", "ready", "active"].includes(status)) return "approved";
  if (["review", "in-review", "needs-review", "pending-review"].includes(status)) return "review";
  if (["blocked", "rejected", "quarantined"].includes(status)) return "blocked";
  return "candidate";
}

function deriveLane(status) {
  if (status === "approved") return "ready";
  if (status === "review") return "in-review";
  if (status === "blocked") return "blocked";
  return "candidate";
}

function inferFileKind(path) {
  if (/\/SKILL\.md$/i.test(path) || path === "SKILL.md") return "entrypoint";
  if (/\/scripts?\//i.test(path) || /\.(py|js|ts|sh|ps1)$/i.test(path)) return "script";
  if (/\/assets?\//i.test(path) || /\.(png|jpg|jpeg|gif|svg|pdf|ttf|otf|html)$/i.test(path)) return "asset";
  if (/\/review-notes?\//i.test(path)) return "evidence";
  return "supporting";
}

function parseFrontmatter(content) {
  if (!content.startsWith("---")) return {};
  const end = content.indexOf("\n---", 3);
  if (end === -1) return {};
  const frontmatter = content.slice(3, end).trim();
  return frontmatter.split(/\r?\n/).reduce((meta, line) => {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) return meta;
    meta[match[1]] = match[2].replace(/^['"]|['"]$/g, "").trim();
    return meta;
  }, {});
}

function bodyWithoutFrontmatter(content) {
  if (!content.startsWith("---")) return content;
  const end = content.indexOf("\n---", 3);
  if (end === -1) return content;
  return content.slice(end + 4).replace(/^\r?\n/, "");
}

function serializeFrontmatter(meta, body) {
  const yaml = Object.entries(meta)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  return `---\n${yaml}\n---\n\n${body}`;
}

function assessPackage(files) {
  const findings = [];
  if (files.some((file) => file.kind === "script")) findings.push("script.review-required");
  if (files.some((file) => file.kind === "asset")) findings.push("asset.review-required");
  const joined = files.map((file) => file.content || "").join("\n");
  if (/https?:\/\//i.test(joined)) findings.push("external-url.review-required");
  if (/(sk-[A-Za-z0-9_-]{20,}|api[_-]?key|secret|password|token)/i.test(joined)) findings.push("possible-secret.review-required");
  const risk = findings.some((finding) => finding.includes("secret")) ? "high" : findings.length ? "medium" : "low";
  return { findings: uniqueList(findings), risk };
}

function evidencePaths(pkg) {
  const evidence = pkg.evidence;
  if (!evidence) return [];
  if (typeof evidence === "string") return [evidence];
  return uniqueList([
    ...(Array.isArray(evidence.review_notes) ? evidence.review_notes : []),
    ...(Array.isArray(evidence.reports) ? evidence.reports : []),
    ...(Array.isArray(evidence.evals) ? evidence.evals : []),
    ...(Array.isArray(evidence.trigger_samples) ? evidence.trigger_samples : [])
  ]);
}

function registryPackageToUi(pkg, registry) {
  const status = normalizeStatus(pkg.lifecycle || pkg.review_status || pkg.status);
  const provenance = pkg.provenance || {};
  const evidence = evidencePaths(pkg);
  const files = (pkg.files || []).map((file) => {
    const path = typeof file === "string" ? file : file.path;
    return {
      path,
      kind: typeof file === "string" ? inferFileKind(path) : file.kind || inferFileKind(path),
      size: typeof file === "string" ? undefined : file.size,
      content: typeof file === "string" ? undefined : file.content,
      original: typeof file === "string" ? undefined : file.original,
      rawUrl: typeof file === "string" ? undefined : file.rawUrl,
      sourcePath: typeof file === "string" ? path : file.sourcePath
    };
  });

  if (pkg.entrypoint && !files.some((file) => file.path === pkg.entrypoint)) {
    files.unshift({ path: pkg.entrypoint, kind: "entrypoint", size: undefined });
  }

  return {
    id: pkg.name || pkg.path || "unnamed-skill",
    name: pkg.name || pkg.path || "unnamed-skill",
    path: pkg.path || `skills/${pkg.name || "unnamed-skill"}`,
    description: pkg.description || "",
    category: pkg.category || "uncategorized",
    status,
    risk: pkg.risk || "unknown",
    owner: pkg.owner || "",
    source: provenance.source_url || registry.source?.repository || cleanRepoName(),
    sourceType: provenance.source_type || pkg.source_type || "managed_repo",
    version: pkg.version || "unversioned",
    lane: deriveLane(status),
    evidence: evidence[0] || "",
    evidencePaths: evidence,
    reviewers: uniqueList([pkg.approved_by, ...(Array.isArray(pkg.reviewers) ? pkg.reviewers : [])]),
    install: Boolean(pkg.install && status === "approved"),
    findings: Array.isArray(pkg.risk_reasons) ? pkg.risk_reasons : [],
    provenance,
    browserLocal: Boolean(pkg.browserLocal),
    files
  };
}

function calculateMetrics(packages) {
  const approved = packages.filter(packageIsInstallable).length;
  const blocked = packages.filter((pkg) => pkg.status === "blocked").length;
  const highRisk = packages.filter((pkg) => pkg.risk === "high").length;
  const evidenceMissing = packages.filter((pkg) => pkg.sourceType === "public_import" && !pkg.evidence).length;
  return {
    total: packages.length,
    approved,
    queue: packages.filter((pkg) => pkg.status !== "approved" || !packageIsInstallable(pkg)).length,
    blocked,
    highRisk,
    changed: seed.changedFiles?.length || 0,
    evidenceMissing,
    findings: packages.reduce((count, pkg) => count + pkg.findings.length, 0)
  };
}

function buildActivity(registry, packages, sourceLabel) {
  const repo = registry.source?.repository || cleanRepoName();
  const generatedAt = registry.generated_at || new Date().toISOString();
  const events = [
    ["registry", `Loaded ${packages.length} package${packages.length === 1 ? "" : "s"} from ${repo}/skills.json`, formatDateTime(generatedAt), sourceLabel]
  ];

  packages.forEach((pkg) => {
    if (pkg.provenance?.imported_at) {
      events.push([
        "intake",
        `${pkg.name} imported as ${pkg.status}`,
        formatDateTime(pkg.provenance.imported_at),
        pkg.provenance.source_url || pkg.sourceType
      ]);
    }
    if (pkg.evidence) {
      events.push(["evidence", `${pkg.name} has review evidence`, pkg.evidence, pkg.version]);
    }
  });

  return events;
}

function uiPackageToRegistry(pkg) {
  return {
    name: pkg.name,
    path: pkg.path || `skills/${pkg.name}`,
    entrypoint: pkg.files.find((file) => file.path.endsWith("/SKILL.md") || file.path.endsWith("SKILL.md"))?.path || `skills/${pkg.name}/SKILL.md`,
    description: pkg.description || "",
    category: pkg.category,
    version: pkg.version,
    owner: pkg.owner,
    review_status: pkg.status,
    lifecycle: pkg.status,
    provenance: {
      source_type: pkg.sourceType,
      source_url: pkg.source,
      imported_at: pkg.provenance?.imported_at,
      imported_by: pkg.provenance?.imported_by
    },
    evidence: {
      review_notes: pkg.evidence ? [pkg.evidence] : [],
      reports: [],
      evals: [],
      trigger_samples: []
    },
    risk: pkg.risk,
    risk_reasons: pkg.findings,
    files: pkg.files.map((file) => ({
      path: file.path,
      kind: file.kind,
      size: file.size
    }))
  };
}

function currentRegistrySnapshot() {
  return {
    generated_at: seed.registryGeneratedAt || new Date().toISOString(),
    source: {
      repository: cleanRepoName(),
      branch: state.managedBranch,
      mode: state.dataStatus === "browser-local" ? "browser-local staged overlay" : state.dataSource
    },
    packages: seed.packages.map(uiPackageToRegistry)
  };
}

function refreshDerivedState(mode = "browser-local") {
  seed.metrics = calculateMetrics(seed.packages);
  if (mode === "browser-local") {
    state.dataStatus = "browser-local";
    state.dataSource = "browser-local staged overlay";
    seed.registrySourceLabel = "browser-local";
    seed.registry = currentRegistrySnapshot();
  }
}

function markChanged(path, add = "+0", del = "-0") {
  seed.changedFiles = seed.changedFiles.filter(([changedPath]) => changedPath !== path);
  seed.changedFiles.unshift([path, add, del]);
  seed.metrics.changed = seed.changedFiles.length;
}

function upsertPackage(pkg, reason) {
  const existingIndex = seed.packages.findIndex((item) => item.id === pkg.id);
  if (existingIndex >= 0) {
    seed.packages.splice(existingIndex, 1, pkg);
  } else {
    seed.packages.unshift(pkg);
  }
  seed.activity.unshift(["intake", reason || `${pkg.name} staged as candidate`, "just now", "browser-local"]);
  markChanged(pkg.path || `skills/${pkg.name}`, existingIndex >= 0 ? "+/-" : `+${pkg.files.length}`, existingIndex >= 0 ? "+/-" : "-0");
  refreshDerivedState();
}

function isTextPath(path) {
  return /\.(md|txt|json|ya?ml|toml|js|ts|tsx|jsx|py|sh|ps1|css|html|xml|csv|svg)$/i.test(path) || /(^|\/)(LICENSE|README)$/i.test(path);
}

async function readBrowserFile(file) {
  const path = (file.webkitRelativePath || file.name).replace(/\\/g, "/");
  const content = isTextPath(path) ? await file.text() : `[Binary file staged from local upload: ${path}]`;
  return { path, size: file.size, content };
}

function dirname(path) {
  const parts = String(path || "").split("/");
  parts.pop();
  return parts.join("/");
}

function basename(path) {
  return String(path || "").split("/").filter(Boolean).pop() || "";
}

function packageFromRecords(records, rootPath, sourceLabel, sourceType, options = {}) {
  const manifestPath = rootPath ? `${rootPath}/SKILL.md` : "SKILL.md";
  const manifest = records.find((record) => record.path === manifestPath || record.path.endsWith(`/${manifestPath}`));
  if (!manifest) return null;

  const meta = parseFrontmatter(manifest.content || "");
  const name = slugify(meta.name || basename(rootPath));
  const targetRoot = `skills/${name}`;
  const members = rootPath ? records.filter((record) => record.path === rootPath || record.path.startsWith(`${rootPath}/`)) : records;
  const files = members.map((record) => {
    const relative = rootPath ? record.path.slice(rootPath.length).replace(/^\/+/, "") || "SKILL.md" : record.path;
    const targetPath = `${targetRoot}/${relative}`;
    return {
      path: targetPath,
      kind: inferFileKind(targetPath),
      size: record.size,
      content: record.content,
      original: record.content,
      rawUrl: record.rawUrl,
      sourcePath: record.sourcePath || record.path
    };
  }).sort((a, b) => {
    const aEntry = a.path.endsWith("/SKILL.md") || a.path.endsWith("SKILL.md");
    const bEntry = b.path.endsWith("/SKILL.md") || b.path.endsWith("SKILL.md");
    if (aEntry !== bEntry) return aEntry ? -1 : 1;
    return a.path.localeCompare(b.path);
  });
  const assessed = assessPackage(files);

  return {
    id: name,
    name,
    path: targetRoot,
    description: meta.description || "",
    category: meta.category || "uncategorized",
    status: normalizeStatus(meta.review_status || "candidate"),
    risk: assessed.risk,
    owner: meta.owner || "",
    source: meta.source_url || sourceLabel,
    sourceType: meta.source_type || sourceType,
    version: meta.version || "0.1.0",
    lane: deriveLane(normalizeStatus(meta.review_status || "candidate")),
    evidence: meta.evidence || "",
    evidencePaths: meta.evidence ? [meta.evidence] : [],
    reviewers: [],
    install: false,
    findings: assessed.findings,
    provenance: {
      source_type: meta.source_type || sourceType,
      source_url: meta.source_url || sourceLabel,
      imported_at: new Date().toISOString(),
      imported_by: "browser-local"
    },
    browserLocal: true,
    files,
    ...options
  };
}

async function stageLocalCandidates() {
  const files = state.localFiles || [];
  if (!files.length) {
    state.intakeStatus = "Choose a local skill folder before staging.";
    render();
    return;
  }

  state.busy = "local";
  state.intakeStatus = `Reading ${files.length} local file${files.length === 1 ? "" : "s"}...`;
  render();

  try {
    const records = await Promise.all(files.map(readBrowserFile));
    const roots = uniqueList(records
      .filter((record) => /(^|\/)SKILL\.md$/i.test(record.path))
      .map((record) => dirname(record.path)));
    if (!roots.length) throw new Error("No SKILL.md file was found in the selected folder.");

    const packages = roots
      .map((rootPath) => packageFromRecords(records, rootPath, "local folder upload", "local"))
      .filter(Boolean);
    packages.forEach((pkg) => upsertPackage(pkg, `${pkg.name} staged from local folder`));
    state.selectedPackage = packages[0].id;
    state.selectedFile = entrypointFile(packages[0]).path;
    state.route = packages.length === 1 ? "editor" : "library";
    state.editorTab = "edit";
    state.intakeOpen = false;
    state.intakeStatus = "";
    state.busy = "";
    showToast(`Staged ${packages.length} local skill package${packages.length === 1 ? "" : "s"} in browser-local state.`);
  } catch (error) {
    state.busy = "";
    state.intakeStatus = `Local staging failed: ${error.message || error}`;
    render();
  } finally {
    state.busy = "";
  }
}

async function fetchGithubTree(repo, branch) {
  const response = await fetch(`https://api.github.com/repos/${cleanRepoName(repo)}/git/trees/${encodeURIComponent(branch)}?recursive=1`, { cache: "no-store" });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  const data = await response.json();
  return (data.tree || []).filter((item) => item.type === "blob");
}

function resolveRemoteRoots(tree, filterPath, mode) {
  const normalizedFilter = String(filterPath || "").replace(/^\/+|\/+$/g, "");
  if (mode === "selected") {
    const root = normalizedFilter.endsWith("SKILL.md") ? dirname(normalizedFilter) : normalizedFilter;
    if (!root) throw new Error("Enter a skill path such as skills/skill-creator.");
    if (!tree.some((item) => item.path === `${root}/SKILL.md`)) throw new Error(`${root}/SKILL.md was not found.`);
    return [root];
  }
  return uniqueList(tree
    .filter((item) => /(^|\/)SKILL\.md$/i.test(item.path))
    .map((item) => dirname(item.path)));
}

async function importRemoteSkills(mode) {
  const repo = document.querySelector("[data-remote-repo]")?.value.trim() || "anthropics/skills";
  const branch = document.querySelector("[data-remote-branch]")?.value.trim() || "main";
  const filterPath = document.querySelector("[data-remote-path]")?.value.trim() || "skills/skill-creator";
  const repoName = cleanRepoName(repo);

  state.busy = mode === "selected" ? "remote-selected" : "remote-all";
  state.intakeStatus = `Loading ${repoName}@${branch}...`;
  render();

  try {
    const tree = await fetchGithubTree(repoName, branch);
    const roots = resolveRemoteRoots(tree, filterPath, mode);
    if (!roots.length) throw new Error("No SKILL.md files were found in this repository.");

    const packages = [];
    for (const rootPath of roots) {
      const manifestPath = `${rootPath}/SKILL.md`;
      const manifestResponse = await fetch(githubRawUrl(repoName, branch, manifestPath), { cache: "no-store" });
      if (!manifestResponse.ok) throw new Error(`Could not load ${manifestPath}: ${manifestResponse.status}`);
      const manifestContent = await manifestResponse.text();
      const records = tree
        .filter((item) => item.path === rootPath || item.path.startsWith(`${rootPath}/`))
        .map((item) => ({
          path: item.path,
          sourcePath: item.path,
          rawUrl: githubRawUrl(repoName, branch, item.path),
          size: item.size,
          content: item.path === manifestPath ? manifestContent : undefined
        }));
      const pkg = packageFromRecords(records, rootPath, `https://github.com/${repoName}/tree/${branch}/${rootPath}`, "public_import");
      if (pkg) packages.push(pkg);
    }

    packages.forEach((pkg) => upsertPackage(pkg, `${pkg.name} imported from ${repoName}`));
    state.selectedPackage = packages[0].id;
    state.selectedFile = entrypointFile(packages[0]).path;
    state.route = mode === "selected" || packages.length === 1 ? "editor" : "library";
    state.editorTab = "edit";
    state.intakeOpen = false;
    state.intakeStatus = "";
    state.busy = "";
    showToast(`Imported ${packages.length} skill package${packages.length === 1 ? "" : "s"} from ${repoName}.`);
  } catch (error) {
    state.busy = "";
    state.intakeStatus = `Remote import failed: ${error.message || error}`;
    render();
  } finally {
    state.busy = "";
  }
}

function optimizePdfSkillContent(content) {
  const body = bodyWithoutFrontmatter(content || "# PDF\n\nImported PDF skill.");
  const optimizedBody = `${body.trim()}\n\n## Skills Charter Optimization\n\nThis package was reviewed as a team-governed PDF runtime skill. The optimized metadata narrows install eligibility to approved use, records owner and provenance, and links review evidence before registry exposure.\n\n### Team Review Notes\n\n- Keep PDF reading, extraction, merging, splitting, form filling, OCR, and PDF generation guidance.\n- Treat helper scripts as reviewed operational tooling, not hidden execution.\n- Require visual verification for generated PDFs and form-filling outputs before user delivery.\n- Route install through the approved-only registry after evidence is attached.\n`;

  return serializeFrontmatter({
    name: "pdf",
    description: "Use this governed skill for PDF workflows that need reading, extraction, table parsing, merging, splitting, form filling, OCR, generation, or visual verification. If a user mentions a .pdf file or asks to produce one, use this skill after team approval.",
    category: "documents/pdf",
    owner: "@platform",
    review_status: "approved",
    source_type: "public_import",
    source_url: "https://github.com/anthropics/skills/tree/main/skills/pdf",
    approved_by: "@platform",
    evidence: "skills/pdf/review-notes/approval.md",
    license: "Proprietary. LICENSE.txt has complete terms"
  }, optimizedBody);
}

function pdfApprovalNote() {
  return `# PDF Skill Approval\n\n## Source\n\n- Repository: https://github.com/anthropics/skills/tree/main/skills/pdf\n- Import mode: public_import\n- Managed state: browser-local approval handoff\n\n## Optimization\n\n- Added category, owner, source URL, approval status, and evidence pointer to SKILL.md frontmatter.\n- Preserved the original PDF workflow instructions while tightening the trigger description for governed install.\n- Added review notes so approval is tied to a Git-trackable artifact.\n\n## Review Decision\n\nApproved for team registry exposure in this browser-local intake. The package contains PDF helper scripts, so install is allowed only after evidence review and owner assignment. No high-risk finding is present in this intake review.\n\n## Next Steps\n\n1. Commit optimized SKILL.md and this approval note on a review branch.\n2. Open a PR with provenance, risk decision, and reviewer sign-off.\n3. Let CI run strict policy and registry drift checks.\n4. Merge to publish skills.json.\n5. Install with the approved registry command.\n`;
}

async function runPdfGovernanceIntake() {
  const repoName = "anthropics/skills";
  const branch = "main";
  const rootPath = "skills/pdf";
  state.busy = "pdf-intake";
  showToast("Loading anthropics/skills pdf into the governance intake flow...");

  try {
    const tree = await fetchGithubTree(repoName, branch);
    const manifestPath = `${rootPath}/SKILL.md`;
    const manifestResponse = await fetch(githubRawUrl(repoName, branch, manifestPath), { cache: "no-store" });
    if (!manifestResponse.ok) throw new Error(`Could not load ${manifestPath}: ${manifestResponse.status}`);
    const manifestContent = await manifestResponse.text();
    const records = tree
      .filter((item) => item.path === rootPath || item.path.startsWith(`${rootPath}/`))
      .map((item) => ({
        path: item.path,
        sourcePath: item.path,
        rawUrl: githubRawUrl(repoName, branch, item.path),
        size: item.size,
        content: item.path === manifestPath ? manifestContent : undefined
      }));
    const pkg = packageFromRecords(records, rootPath, `https://github.com/${repoName}/tree/${branch}/${rootPath}`, "public_import");
    if (!pkg) throw new Error("skills/pdf/SKILL.md was not found.");

    const skillFile = entrypointFile(pkg);
    skillFile.content = optimizePdfSkillContent(manifestContent);
    skillFile.original = manifestContent;
    pkg.description = "Use this governed skill for PDF workflows that need reading, extraction, table parsing, merging, splitting, form filling, OCR, generation, or visual verification.";
    pkg.category = "documents/pdf";
    pkg.owner = "@platform";
    pkg.status = "approved";
    pkg.lane = "ready";
    pkg.risk = "low";
    pkg.version = "0.1.0";
    pkg.evidence = "skills/pdf/review-notes/approval.md";
    pkg.evidencePaths = [pkg.evidence];
    pkg.reviewers = ["@platform", "@security"];
    pkg.install = true;
    pkg.findings = [];
    pkg.provenance = {
      source_type: "public_import",
      source_url: `https://github.com/${repoName}/tree/${branch}/${rootPath}`,
      imported_at: new Date().toISOString(),
      imported_by: "browser-local"
    };
    pkg.caseStudy = {
      title: "Anthropic PDF skill governance intake",
      steps: [
        ["Import", "Fetched skills/pdf from anthropics/skills and kept provenance visible."],
        ["Optimize", "Added owner, category, approval status, source URL, and evidence pointer to SKILL.md."],
        ["Review", "Checked scripts, license, PDF generation guidance, and visual verification expectations."],
        ["Approve", "Recorded approval evidence and moved lifecycle to approved."],
        ["Publish", "Registry now exposes an approved install command; next real step is PR + CI + merge."]
      ]
    };
    pkg.files.push({
      path: "skills/pdf/review-notes/approval.md",
      kind: "evidence",
      content: pdfApprovalNote(),
      original: ""
    });

    upsertPackage(pkg, "pdf imported from anthropics/skills and approved for handoff");
    markChanged("skills/pdf/SKILL.md", "+12", "-2");
    markChanged("skills/pdf/review-notes/approval.md", "+24", "-0");
    seed.activity.unshift(["approve", "pdf approved with review evidence", "just now", "browser-local"]);
    seed.activity.unshift(["optimize", "pdf SKILL.md metadata optimized for governed install", "just now", "browser-local"]);
    refreshDerivedState();
    setSelectedPackage("pdf");
    state.selectedFile = "skills/pdf/SKILL.md";
    state.route = "review";
    state.editorTab = "diff";
    state.intakeOpen = false;
    state.busy = "";
    showToast("PDF intake complete: imported, optimized, reviewed, approved, and registry-ready.");
  } catch (error) {
    state.busy = "";
    state.intakeStatus = `PDF intake failed: ${error.message || error}`;
    showToast(state.intakeStatus);
  }
}

function createCandidateFromIntake() {
  const folderInput = document.querySelector("[data-new-skill-folder]")?.value.trim();
  const prompted = folderInput || window.prompt("New skill folder", `new-skill-${seed.packages.length + 1}`);
  if (!prompted) return;
  const name = slugify(prompted);
  const targetRoot = `skills/${name}`;
  const content = `---\nname: ${name}\ndescription: Describe when this skill should be used.\ncategory: draft/general\nowner: \nreview_status: candidate\nsource_type: new\n---\n\n# ${name}\n\nWrite the skill instructions here.`;
  const pkg = {
    id: name,
    name,
    path: targetRoot,
    description: "Describe when this skill should be used.",
    category: "draft/general",
    status: "candidate",
    risk: "unknown",
    owner: "",
    source: "browser-local",
    sourceType: "new",
    version: "0.1.0",
    lane: "candidate",
    evidence: "",
    evidencePaths: [],
    reviewers: [],
    install: false,
    findings: ["Owner missing", "Evidence missing"],
    provenance: {
      source_type: "new",
      source_url: "browser-local",
      imported_at: new Date().toISOString(),
      imported_by: "browser-local"
    },
    browserLocal: true,
    files: [{ path: `${targetRoot}/SKILL.md`, kind: "entrypoint", content, original: "" }]
  };
  upsertPackage(pkg, `${name} created in browser-local state`);
  setSelectedPackage(name);
  state.route = "editor";
  state.editorTab = "edit";
  state.intakeOpen = false;
  showToast(t("toast.intake"));
}

function syncPackageFromSkillContent(pkg, file) {
  if (!file.path.endsWith("/SKILL.md") && file.path !== "SKILL.md") return;
  const meta = parseFrontmatter(file.content || "");
  if (meta.description) pkg.description = meta.description;
  if (meta.category) pkg.category = meta.category;
  if ("owner" in meta) pkg.owner = meta.owner;
  if (meta.review_status) {
    pkg.status = normalizeStatus(meta.review_status);
    pkg.lane = deriveLane(pkg.status);
  }
  if (meta.version) pkg.version = meta.version;
  if (meta.source_type) pkg.sourceType = meta.source_type;
  if (meta.source_url) pkg.source = meta.source_url;
  if (meta.evidence) pkg.evidence = meta.evidence;
  const assessed = assessPackage(pkg.files);
  pkg.risk = assessed.risk;
  pkg.findings = assessed.findings;
}

function normalizeFilePath(pkg, input) {
  const path = String(input || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
  if (!path) return "";
  if (path.startsWith("skills/")) return path;
  return `${pkg.path || `skills/${pkg.name}`}/${path}`;
}

function addFileToCurrentPackage() {
  const pkg = currentPackage();
  const input = window.prompt("New file path inside this skill package", "references/notes.md");
  const path = normalizeFilePath(pkg, input);
  if (!path) return;
  if (pkg.files.some((file) => file.path === path)) {
    showToast(`${path} already exists.`);
    return;
  }
  const content = path.endsWith(".md") ? `# ${basename(path).replace(/\.[^.]+$/, "")}\n\n` : "";
  const file = { path, kind: inferFileKind(path), content, original: "" };
  pkg.files.push(file);
  pkg.files.sort((a, b) => a.path.localeCompare(b.path));
  state.selectedFile = path;
  state.editorTab = "edit";
  markChanged(path, `+${lineNumbers(content).split("\n").length}`, "-0");
  refreshDerivedState();
  render();
}

function renameCurrentFile() {
  const pkg = currentPackage();
  const file = currentFile();
  const input = window.prompt("Rename file", file.path.replace(`${pkg.path}/`, ""));
  const nextPath = normalizeFilePath(pkg, input);
  if (!nextPath || nextPath === file.path) return;
  if (pkg.files.some((item) => item.path === nextPath)) {
    showToast(`${nextPath} already exists.`);
    return;
  }
  const previousPath = file.path;
  file.path = nextPath;
  file.kind = inferFileKind(nextPath);
  state.selectedFile = nextPath;
  markChanged(previousPath, "+0", "-renamed");
  markChanged(nextPath, "+renamed", "-0");
  refreshDerivedState();
  render();
}

function deleteCurrentFile() {
  const pkg = currentPackage();
  const file = currentFile();
  if (pkg.files.length <= 1) {
    showToast("A skill package needs at least one file.");
    return;
  }
  if (!window.confirm(`Delete ${file.path} from browser-local state?`)) return;
  pkg.files = pkg.files.filter((item) => item.path !== file.path);
  markChanged(file.path, "+0", "-deleted");
  state.selectedFile = pkg.files[0].path;
  refreshDerivedState();
  render();
}

function deleteCurrentSkill() {
  const pkg = currentPackage();
  if (!pkg.id) return;
  if (!window.confirm(`Delete ${pkg.name} from browser-local state?`)) return;
  seed.packages = seed.packages.filter((item) => item.id !== pkg.id);
  markChanged(pkg.path || `skills/${pkg.name}`, "+0", "-deleted");
  seed.activity.unshift(["delete", `${pkg.name} removed from browser-local state`, "just now", "browser-local"]);
  refreshDerivedState();
  const next = seed.packages[0];
  state.selectedPackage = next?.id || "";
  state.selectedFile = next?.files[0]?.path || "";
  state.route = seed.packages.length ? "editor" : "library";
  render();
}

function applyRegistryData(registry, sourceLabel = "embedded") {
  const previousPackage = state.selectedPackage;
  const packages = (registry.packages || []).map((pkg) => registryPackageToUi(pkg, registry));

  seed.repo = registry.source?.repository || cleanRepoName();
  seed.branch = registry.source?.branch || state.managedBranch;
  seed.sha = registry.source?.commit || registry.source?.sha || "skills.json";
  seed.registryGeneratedAt = registry.generated_at || "";
  seed.registry = registry;
  seed.registrySourceLabel = sourceLabel;
  seed.packages = packages;
  seed.changedFiles = [];
  seed.activity = buildActivity(registry, packages, sourceLabel);
  seed.metrics = calculateMetrics(packages);
  state.dataStatus = sourceLabel;
  state.dataSource = sourceLabel === "remote" ? "live GitHub registry" : "embedded testSkills snapshot";

  if (!packages.some((pkg) => pkg.id === previousPackage)) {
    state.selectedPackage = packages[0]?.id || "";
  }
  const selected = packageById(state.selectedPackage);
  if (!selected.files.some((file) => file.path === state.selectedFile)) {
    state.selectedFile = selected.files[0]?.path || "";
  }
}

async function loadRegistryFromGitHub(notify = false) {
  state.dataStatus = "loading";
  state.loadError = "";
  if (notify) render();

  try {
    const response = await fetch(`${registryUrl()}?ts=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const registry = await response.json();
    applyRegistryData(registry, "remote");
    if (notify) {
      showToast(`Loaded ${seed.metrics.total} package${seed.metrics.total === 1 ? "" : "s"} from ${cleanRepoName()}/skills.json.`);
    } else {
      render();
    }
    hydrateCurrentFile();
  } catch (error) {
    state.dataStatus = "embedded";
    state.dataSource = "embedded testSkills snapshot";
    state.loadError = error.message || String(error);
    if (notify) {
      showToast(`Could not reach ${cleanRepoName()}/skills.json. Showing the embedded real testSkills snapshot.`);
    } else {
      render();
    }
  }
}

function packageById(id) {
  return seed.packages.find((pkg) => pkg.id === id) || seed.packages[0] || {
    id: "",
    name: "no-skills-loaded",
    category: "empty",
    status: "candidate",
    risk: "unknown",
    owner: "",
    source: cleanRepoName(),
    sourceType: "managed_repo",
    version: "unversioned",
    lane: "candidate",
    evidence: "",
    reviewers: [],
    install: false,
    findings: ["No skills are present in the loaded registry."],
    files: [{ path: "SKILL.md", kind: "entrypoint", content: "No skills are present in the loaded registry.", original: "" }]
  };
}

function currentPackage() {
  return packageById(state.selectedPackage);
}

function currentFile() {
  const pkg = currentPackage();
  return pkg.files.find((file) => file.path === state.selectedFile) || pkg.files[0] || { path: "", kind: "unknown", content: "", original: "" };
}

function entrypointFile(pkg) {
  return pkg.files.find((file) => file.path.endsWith("/SKILL.md") || file.path.endsWith("SKILL.md")) || pkg.files[0];
}

function setSelectedPackage(id) {
  const pkg = packageById(id);
  state.selectedPackage = pkg.id;
  state.selectedFile = entrypointFile(pkg).path;
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
      ${group.items.map(([route, glyph, count, alert]) => {
        const liveCount = route === "library" ? seed.metrics.total : route === "review" ? seed.metrics.queue : route === "registry" ? seed.metrics.approved : count;
        const liveAlert = route === "review" ? seed.metrics.queue > 0 : alert;
        return `
        <button type="button" class="nav-item ${state.route === route ? "active" : ""}" data-action="route" data-route="${route}">
          <span class="nav-glyph">${glyph}</span>
          <span class="nav-text">${t(`route.${route}`)}</span>
          ${liveCount != null ? `<span class="nav-count ${liveAlert ? "alert" : ""}">${liveCount}</span>` : ""}
        </button>
      `;
      }).join("")}
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
      <div class="footer-row"><span>${esc(cleanRepoName())}</span><span>${seed.metrics.total} pkg</span></div>
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
  const [org = "repo", repo = cleanRepoName()] = cleanRepoName().split("/");
  return `<header class="topbar">
    <div class="crumbs" aria-label="Repository location">
      <strong>${esc(org)}</strong><span>/</span><strong>${esc(repo)}</strong><span>/</span><span>${routeName}</span>
    </div>
    <span class="branch-chip"><span class="dot"></span>${esc(state.managedBranch)} · ${esc(seed.sha)}</span>
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
  const total = Math.max(seed.metrics.total, 1);
  const installPct = Math.round((seed.metrics.approved / total) * 100);
  const queuePct = Math.round((seed.metrics.queue / total) * 100);
  const riskPct = Math.round((seed.metrics.highRisk / total) * 100);
  const kpis = [
    [t("kpi.total"), seed.metrics.total, "skills", state.dataStatus === "loading" ? "loading" : state.dataStatus, "good", `${cleanRepoName()}/skills.json`, 100],
    [t("kpi.approved"), seed.metrics.approved, `/ ${seed.metrics.total}`, `${installPct}%`, "", "approved-only install gate", installPct],
    [t("kpi.queue"), seed.metrics.queue, "open", seed.metrics.evidenceMissing ? `${seed.metrics.evidenceMissing} evidence` : "tracked", seed.metrics.queue ? "warn" : "good", "candidate, review, or blocked packages", queuePct],
    [t("kpi.risk"), seed.metrics.highRisk, "open", seed.metrics.findings ? `${seed.metrics.findings} findings` : "clean", seed.metrics.highRisk ? "bad" : "", "computed from registry policy fields", riskPct]
  ];

  return `<section class="dashboard-grid" aria-label="Repository metrics">
    ${kpis.map(([label, value, unit, delta, tone, foot, pct]) => `
      <article class="kpi-card">
        <div class="kpi-top"><span class="kpi-label">${esc(label)}</span><span class="delta ${tone}">${esc(delta)}</span></div>
        <div class="kpi-value"><strong>${esc(value)}</strong><span>${esc(unit)}</span></div>
        <div class="metric-current"><span style="width:${Math.max(0, Math.min(100, pct))}%"></span></div>
        <div class="kpi-foot"><span>${esc(foot)}</span><span>${esc(seed.registrySourceLabel || state.dataSource)}</span></div>
      </article>
    `).join("")}
  </section>`;
}

function renderGovernanceLoop() {
  const provenanceCount = seed.packages.filter((pkg) => pkg.source).length;
  const evidenceCount = seed.packages.filter((pkg) => pkg.evidence).length;
  const installableCount = seed.packages.filter(packageIsInstallable).length;
  const stages = [
    ["01", "Candidate", "public · local · gen", seed.metrics.queue, seed.metrics.queue ? "active" : "done"],
    ["02", "Provenance", "owner · source", provenanceCount, provenanceCount === seed.metrics.total ? "done" : "active"],
    ["03", "Lint", "policy findings", seed.metrics.findings, seed.metrics.findings ? "active" : "done"],
    ["04", "Evidence", "review notes", evidenceCount, seed.metrics.evidenceMissing ? "active" : "done"],
    ["05", "Approval", "review_status", seed.metrics.approved, seed.metrics.approved ? "done" : ""],
    ["06", "Registry", "skills.json", seed.metrics.total, seed.metrics.total ? "done" : ""],
    ["07", "Install", "npx skills", installableCount, installableCount ? "done" : ""]
  ];

  return `<section class="card governance-loop">
    <div class="card-head">
      <div><span class="card-eyebrow">${t("loop.title")}</span><p class="page-subtitle">${t("loop.caption")}</p></div>
      <div class="chip-row">
        <button type="button" class="button subtle" data-action="run-checks">${t("action.runPolicy")}</button>
        <button type="button" class="button primary" data-action="run-pdf-intake" ${state.busy ? "disabled" : ""}>${state.busy === "pdf-intake" ? t("action.running") : t("action.runPdfIntake")}</button>
      </div>
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
      <span class="tiny">Grouped by lifecycle lane</span>
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
    <div class="card-head"><h2 class="card-title">${t("panel.activity")}</h2><span class="tiny">${esc(state.managedBranch)}</span></div>
    <div class="feed">
      ${seed.activity.length ? seed.activity.map(([kind, text, time, sha]) => `
        <div class="feed-item">
          <div class="row-between"><strong>${esc(text)}</strong><span class="tiny">${esc(time)}</span></div>
          <span class="tiny">${esc(kind)} · ${esc(sha)}</span>
        </div>
      `).join("") : `<div class="empty-state">No registry activity is recorded yet.</div>`}
    </div>
  </section>`;
}

function renderRegistryReadiness() {
  const total = Math.max(seed.metrics.total, 1);
  const approvedPct = Math.round((seed.metrics.approved / total) * 100);
  const blockedPct = Math.round((seed.metrics.blocked / total) * 100);
  const pending = Math.max(seed.metrics.total - seed.metrics.approved - seed.metrics.blocked, 0);
  const pendingPct = Math.round((pending / total) * 100);
  const rows = [
    ["approved", seed.metrics.approved, approvedPct, "var(--accent)"],
    ["pending", pending, pendingPct, "var(--warning)"],
    ["blocked", seed.metrics.blocked, blockedPct, "var(--danger)"]
  ];
  return `<section class="card">
    <div class="card-head"><h2 class="card-title">${t("panel.registry")}</h2><span class="tiny">${esc(seed.sha)}</span></div>
    <div class="readiness">
      <div class="donut" style="--approved-stop:${approvedPct}%;--pending-stop:${approvedPct + pendingPct}%"><strong>${approvedPct}%</strong></div>
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
    <div class="card-head"><h2 class="card-title">${t("panel.findings")}</h2><button type="button" class="button subtle" data-action="run-checks">${icons.check}${t("action.runPolicy")}</button></div>
    <div class="finding-list">
      ${findings.length ? findings.map(([pkg, finding]) => `
        <div class="finding-item">
          <div class="row-between"><strong>${esc(finding)}</strong>${riskChip(pkg.risk)}</div>
          <span class="tiny">${esc(pkg.name)} · ${esc(pkg.category)}</span>
        </div>
      `).join("") : `<div class="empty-state">No policy findings are present in the loaded registry.</div>`}
    </div>
  </section>`;
}

function renderChangedFiles() {
  return `<section class="card">
    <div class="card-head"><h2 class="card-title">${t("panel.changes")}</h2><span class="tiny">browser-local</span></div>
    <div class="file-change-list">
      ${seed.changedFiles.length ? seed.changedFiles.map(([path, add, del]) => `
        <div class="file-change">
          <div class="row-between"><strong class="mono">${esc(path)}</strong><span class="tiny"><span style="color:var(--success)">${add}</span> <span style="color:var(--danger)">${del}</span></span></div>
        </div>
      `).join("") : `<div class="empty-state">No browser-local edits are staged. Git remains the source of durable history.</div>`}
    </div>
  </section>`;
}

function renderInventoryTable() {
  return `<section class="card">
    <div class="card-head"><h2 class="card-title">${t("panel.inventory")}</h2><button type="button" class="button subtle" data-action="route" data-route="library">Open library</button></div>
    <table class="inventory-table">
      <thead><tr><th>Package</th><th>Category</th><th>Status</th><th>Risk</th><th>Owner</th><th>Files</th></tr></thead>
      <tbody>
        ${seed.packages.length ? seed.packages.map((pkg) => `
          <tr data-action="select-package" data-package="${pkg.id}">
            <td><strong>${esc(pkg.name)}</strong></td>
            <td class="mono">${esc(pkg.category)}</td>
            <td>${statusChip(pkg.status)}</td>
            <td>${riskChip(pkg.risk)}</td>
            <td>${esc(pkg.owner || "missing")}</td>
            <td>${pkg.files.length}</td>
          </tr>
        `).join("") : `<tr><td colspan="6" class="empty-cell">No packages found in the loaded registry.</td></tr>`}
      </tbody>
    </table>
  </section>`;
}

function renderDashboard() {
  const generated = seed.registryGeneratedAt ? formatDateTime(seed.registryGeneratedAt) : "generated time missing";
  const meta = `<span>${esc(cleanRepoName())}</span><span>·</span><span>${esc(state.dataSource)}</span><span>·</span><span>${esc(generated)}</span>`;
  const subtitle = `${cleanRepoName()} · ${seed.metrics.total} package${seed.metrics.total === 1 ? "" : "s"} tracked from skills.json · ${state.managedBranch}`;
  return `${pageHead(t("dashboard.title"), subtitle, meta)}
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
          ${Object.entries(categories).length ? Object.entries(categories).map(([category, pkgs]) => `
            <div class="category-row">
              <strong>${esc(category)}</strong>
              <div class="category-track">${pkgs.map((pkg) => `<button type="button" class="category-pill" data-action="open-editor-package" data-package="${pkg.id}">${esc(pkg.category)} / ${esc(pkg.name)}</button>`).join("")}</div>
              <span class="count-chip">${pkgs.length}</span>
            </div>
          `).join("") : `<div class="empty-state">No packages match the current filters.</div>`}
        </div>
      </section>
      <section class="card">
        <div class="card-head"><h2 class="card-title">Packages by category</h2><span class="tiny">${packages.length} visible</span></div>
        <div class="category-package-list">
          ${Object.entries(categories).length ? Object.entries(categories).map(([category, pkgs]) => `
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
          `).join("") : `<div class="empty-state">Adjust filters or load a registry that contains skills.</div>`}
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

function renderCaseStudy(pkg) {
  if (!pkg.caseStudy) return "";
  return `<section class="case-study-card">
    <div class="split-head"><h3 class="card-title">${esc(pkg.caseStudy.title)}</h3><span class="status-chip status-approved">intake</span></div>
    <div class="case-step-list">
      ${pkg.caseStudy.steps.map(([label, detail], index) => `
        <div class="case-step">
          <span class="case-step-index">${index + 1}</span>
          <div><strong>${esc(label)}</strong><p>${esc(detail)}</p></div>
        </div>
      `).join("")}
    </div>
  </section>`;
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
            <button type="button" class="button subtle" data-action="run-checks">${t("action.runPolicy")}</button>
            <button type="button" class="button ${canInstall ? "primary" : "subtle"}" data-action="route" data-route="registry">Registry</button>
          </div>
          ${renderCaseStudy(pkg)}
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
          <button type="button" class="button subtle" data-action="run-checks">${t("action.runPolicy")}</button>
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
          <div class="crud-toolbar">
            <button type="button" class="button subtle" data-action="new-file">New file</button>
            <button type="button" class="button subtle" data-action="rename-file">Rename</button>
            <button type="button" class="button danger" data-action="delete-file">Delete</button>
          </div>
          <div class="file-list">${renderFileList(pkg)}</div>
        </div>
      </section>
      <section class="workspace-panel editor-main ${state.editorTab === "package" ? "" : "editor-shell"}">${body}</section>
      <section class="workspace-panel editor-side">
        <div class="card-head"><h2 class="card-title">Governance</h2>${statusChip(pkg.status)}</div>
        <div class="panel-body">
          <div class="crud-toolbar">
            <button type="button" class="button subtle" data-action="new-candidate">New skill</button>
            <button type="button" class="button danger" data-action="delete-skill">Delete skill</button>
          </div>
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
  return String(content || "").split("\n").map((_, index) => index + 1).join("\n");
}

function fileText(file) {
  if (typeof file.content === "string") return file.content;
  if (file.loadError) return `Unable to load ${file.path} from ${cleanRepoName()}.\n\n${file.loadError}`;
  return `Loading ${file.path} from ${cleanRepoName()}...`;
}

async function hydrateCurrentFile() {
  if (state.route !== "editor") return;
  const file = currentFile();
  if (!file.path || typeof file.content === "string" || file.loading || file.loadError) return;

  file.loading = true;
  try {
    const sourceUrl = file.rawUrl || rawFileUrl(file.path);
    const response = await fetch(`${sourceUrl}?ts=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const text = await response.text();
    file.content = text;
    file.original = text;
  } catch (error) {
    file.loadError = error.message || String(error);
  } finally {
    file.loading = false;
    render();
  }
}

function renderEditor(file) {
  const content = fileText(file);
  return `<div class="editor-toolbar">
    <div><h2>${esc(file.path)}</h2><span class="tiny">${esc(file.kind)} · browser-local edits</span></div>
    <div class="chip-row"><button type="button" class="button subtle" data-action="editor-tab" data-tab="preview">Preview</button><button type="button" class="button subtle" data-action="editor-tab" data-tab="diff">Diff</button></div>
  </div>
  <div class="editor-surface">
    <pre class="line-numbers">${lineNumbers(content)}</pre>
    <textarea class="code-textarea" data-editor spellcheck="false">${esc(content)}</textarea>
  </div>`;
}

function renderPreview(file) {
  const isMarkdown = file.path.endsWith(".md");
  const content = fileText(file);
  const html = isMarkdown ? markdownPreview(content) : highlightCode(content);
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
  const content = fileText(file);
  const before = (file.original || content).split("\n");
  const after = content.split("\n");
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
  const registry = seed.registry || {
    generated_at: seed.registryGeneratedAt,
    source: { repository: cleanRepoName(), branch: state.managedBranch },
    packages: seed.packages
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
          <tbody>${approved.length ? approved.map((pkg) => `
            <tr><td>${esc(pkg.name)}</td><td>${statusChip(pkg.status)}</td><td class="mono">npx skills add ${esc(state.managedRepo)} --skill ${esc(pkg.name)} -g -a ${esc(state.agent)}</td></tr>
          `).join("") : `<tr><td colspan="3" class="empty-cell">No install command is exposed yet. Current packages must pass approval before the approved-only registry can publish snippets.</td></tr>`}</tbody>
        </table>
      </section>
      <section class="card">
        <div class="card-head"><h2 class="card-title">skills.json</h2><span class="tiny">${esc(state.dataSource)}</span></div>
        <pre class="registry-json">${esc(JSON.stringify(registry, null, 2))}</pre>
      </section>
    </div>`;
}

function buildHistoryItems() {
  return seed.packages.flatMap((pkg) => {
    const items = [];
    if (pkg.provenance?.imported_at) {
      items.push([
        pkg.name,
        pkg.version,
        "Import",
        `Imported from ${pkg.provenance.source_type || pkg.sourceType}`,
        pkg.provenance.source_url || pkg.source,
        formatDateTime(pkg.provenance.imported_at)
      ]);
    }
    items.push([
      pkg.name,
      pkg.version,
      "Registry",
      `${pkg.status} · ${pkg.risk} risk · ${pkg.files.length} files`,
      pkg.evidence || "review evidence missing",
      seed.registryGeneratedAt ? formatDateTime(seed.registryGeneratedAt) : state.managedBranch
    ]);
    return items;
  });
}

function renderHistory() {
  const selected = state.historySkill === "all" ? null : packageById(state.historySkill);
  const visiblePackages = selected ? [selected] : seed.packages;
  const items = buildHistoryItems();
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
        <div class="timeline">${visibleItems.length ? visibleItems.map(([pkg, version, kind, text, ref, time]) => `
          <div class="timeline-item"><div class="row-between"><strong>${esc(pkg)} · ${esc(version)}</strong><span class="tiny">${esc(time)}</span></div><span class="page-subtitle">${esc(kind)} · ${esc(text)}</span><span class="tiny">${esc(ref)}</span></div>
        `).join("") : `<div class="empty-state">No history records are available from the loaded registry yet.</div>`}</div>
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
    </section>
    <section class="card">
      <div class="card-head"><h2 class="card-title">Commit rules</h2><a class="button subtle" href="./commit-conventions.html">Open guide</a></div>
      <p class="page-subtitle">Each commit should explain the governance step it represents, so history can answer what changed, why it changed, and whether approval evidence exists.</p>
      <table class="registry-table">
        <thead><tr><th>Pattern</th><th>Meaning</th><th>Evidence expectation</th></tr></thead>
        <tbody>
          <tr><td class="mono">intake(pdf): import public package</td><td>Candidate enters the repo</td><td>Source URL and owner pending</td></tr>
          <tr><td class="mono">review(pdf): add approval evidence</td><td>Reviewer records findings</td><td>review-notes, reports, evals, or trigger samples</td></tr>
          <tr><td class="mono">approve(pdf): expose install snippet</td><td>Package becomes installable</td><td>Approved metadata plus regenerated skills.json</td></tr>
        </tbody>
      </table>
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
  const busy = Boolean(state.busy);
  const localCount = state.localFiles?.length || 0;
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
          <label class="input-block"><span class="tiny">Folder picker</span><input type="file" webkitdirectory multiple data-local-folder></label>
          <div class="tiny">${localCount ? `${localCount} file${localCount === 1 ? "" : "s"} selected` : "No local files selected yet."}</div>
          <button type="button" class="button subtle" data-action="stage-local" ${busy ? "disabled" : ""}>${state.busy === "local" ? "Staging..." : "Stage local candidates"}</button>
        </section>
        <section class="choice-card">
          <span class="card-eyebrow">Remote GitHub</span>
          <h3>Import public repo</h3>
          <p class="page-subtitle">Import all skills or a specific skill path from a public repository. Public imports stay candidates.</p>
          <label class="input-block"><span class="tiny">Repository</span><input data-remote-repo value="anthropics/skills" aria-label="GitHub repository"></label>
          <label class="input-block"><span class="tiny">Branch</span><input data-remote-branch value="main" aria-label="GitHub branch"></label>
          <label class="input-block"><span class="tiny">Skill path</span><input data-remote-path value="skills/skill-creator" aria-label="Specific skill path"></label>
          <div class="chip-row"><button type="button" class="button primary" data-action="import-remote-selected" ${busy ? "disabled" : ""}>${state.busy === "remote-selected" ? "Importing..." : "Import selected"}</button><button type="button" class="button subtle" data-action="import-remote-all" ${busy ? "disabled" : ""}>${state.busy === "remote-all" ? "Importing..." : "Import all"}</button></div>
        </section>
        <section class="choice-card">
          <span class="card-eyebrow">New package</span>
          <h3>Create governed skill</h3>
          <p class="page-subtitle">Start from a SKILL.md template with required metadata, owner, source, category, and review status.</p>
          <label class="input-block"><span class="tiny">Skill folder</span><input data-new-skill-folder value="new-governed-skill" aria-label="New skill folder"></label>
          <button type="button" class="button primary" data-action="new-candidate" ${busy ? "disabled" : ""}>Create candidate</button>
        </section>
        <section class="choice-card scenario-choice">
          <span class="card-eyebrow">Governance intake</span>
          <h3>Anthropic PDF review</h3>
          <p class="page-subtitle">Import <span class="mono">skills/pdf</span>, optimize metadata, attach review evidence, approve, and expose the install path in one browser-local scenario.</p>
          <div class="mini-step-list">
            <span>Import</span><span>Optimize</span><span>Review</span><span>Approve</span><span>Install</span>
          </div>
          <button type="button" class="button primary" data-action="run-pdf-intake" ${busy ? "disabled" : ""}>${state.busy === "pdf-intake" ? t("action.running") : t("action.runPdfIntake")}</button>
        </section>
      </div>
      <div class="modal-foot">
        <span class="tiny">${esc(state.intakeStatus || `Target repo: ${state.managedRepo} · ${state.managedBranch}`)}</span>
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
  window.setTimeout(hydrateCurrentFile, 0);
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

document.addEventListener("click", async (event) => {
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
    loadRegistryFromGitHub(true);
    return;
  }

  if (action === "run-checks") {
    refreshDerivedState(state.dataStatus === "browser-local" ? "browser-local" : state.dataSource);
    showToast(t("toast.checks"));
    return;
  }

  if (action === "run-pdf-intake") {
    await runPdfGovernanceIntake();
    return;
  }

  if (action === "stage-local") {
    await stageLocalCandidates();
    return;
  }

  if (action === "import-remote-selected") {
    await importRemoteSkills("selected");
    return;
  }

  if (action === "import-remote-all") {
    await importRemoteSkills("all");
    return;
  }

  if (action === "new-candidate") {
    createCandidateFromIntake();
    return;
  }

  if (action === "new-file") {
    addFileToCurrentPackage();
    return;
  }

  if (action === "rename-file") {
    renameCurrentFile();
    return;
  }

  if (action === "delete-file") {
    deleteCurrentFile();
    return;
  }

  if (action === "delete-skill") {
    deleteCurrentSkill();
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
    loadRegistryFromGitHub(true);
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-search]")) {
    state.search = event.target.value;
    if (state.route === "library") render();
    return;
  }

  if (event.target.matches("[data-editor]")) {
    const file = currentFile();
    const pkg = currentPackage();
    file.content = event.target.value;
    syncPackageFromSkillContent(pkg, file);
    if (file.content === file.original) {
      seed.changedFiles = seed.changedFiles.filter(([path]) => path !== file.path);
    } else {
      const beforeLines = String(file.original || "").split("\n").length;
      const afterLines = String(file.content || "").split("\n").length;
      markChanged(file.path, `+${Math.max(afterLines - beforeLines, 1)}`, `-${Math.max(beforeLines - afterLines, 0)}`);
    }
    refreshDerivedState();
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

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.querySelector("[data-search]")?.focus();
  }
});

document.addEventListener("change", (event) => {
  if (event.target.matches("[data-local-folder]")) {
    state.localFiles = [...event.target.files];
    state.intakeStatus = state.localFiles.length
      ? `${state.localFiles.length} local file${state.localFiles.length === 1 ? "" : "s"} selected. Click Stage local candidates.`
      : "No local files selected.";
    render();
  }
});

applyRegistryData(embeddedRegistry, "embedded");
render();
loadRegistryFromGitHub(false);

if (!localStorage.getItem("skills-charter-tutorial-done")) {
  window.setTimeout(openTutorial, 650);
}
