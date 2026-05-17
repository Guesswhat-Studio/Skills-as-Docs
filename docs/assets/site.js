/* ============================================================
   Agent SkillDocs · v0.2
   i18n + theme + accent + density + tweaks + scrollspy
   ============================================================ */

const translations = {
  en: {
    title: "Agent SkillDocs · An Operating Model for Agent Skills",
    description: "Manage Agent Skills like docs. Distribute them through Git.",

    /* meta strip */
    metaDoc:    "Operating model",
    metaStatus: "Working draft",

    /* rail */
    brand:      "Agent SkillDocs",
    subbrand:   "specification & pattern",
    tocLabel:   "Contents",
    tocHero:    "Abstract",
    tocProp:    "Proposition",
    tocEvidence:"Evidence",
    tocProto:   "Protocol",
    tocArt:     "Artifacts",
    tocAdopt:   "Adoption",
    tocNon:     "Non-goals",
    railAuthors:"Authors",
    railLicence:"Licence",

    /* hero */
    kicker:     "An operating model for agent skills",
    h1A:        "Skills, managed",
    h1B:        "as docs.",
    subtitle:   "Human-readable. Agent-executable. Distributed through Git.",
    abstract:   "The procedural memory of an agent — how it writes a code review, how it cites literature, how it formats a release — should not live inside a hidden config folder. It should live where the people who own the workflow can read it, review it, version it, and improve it. SkillDocs is a small, deliberately boring pattern for doing exactly that.",
    ctaRead:    "Read the proposition",
    ctaSource:  "View source",
    factFormat: "Format",
    factPrimitive: "Primitive",
    factStatus: "Status",
    factStatusV: "v0.1 · working draft",
    factScope:  "Scope",
    factScopeV: "team-private skills",

    /* figure 1 */
    figLabel:   "FIG 01",
    figTitle:   "The SkillDocs loop",
    figClosed:  "closed-loop",
    nodeDocs:   "Docs UI",
    nodeDocsDesc: "humans write",
    nodeGit:    "Git sync + hooks",
    nodeGitDesc: "hooks · ci · provenance",
    nodeAgents: "Agents",
    nodeAgentsDesc: "execute & report",
    nodeRegistryDesc: "Registry",
    loopImprove: "Improve the docs",

    /* §01 proposition */
    tagProp:    "PROPOSITION",
    propTitleA: "Skills are ",
    propTitleB: "operational documents",
    propTitleC: " for agents.",
    propLede:   "should not disappear into a hidden config folder. It should be readable, reviewable, versioned, and improved by the same people who own the workflow.",
    propHumanT: "Human-readable",
    propHumanB: "Teams can browse, edit, discuss, and improve skills inside the documentation tools they already trust — Notion, GitBook, VitePress, Obsidian, 飞书, 语雀.",
    propAgentT: "Agent-executable",
    propAgentB: "The same Markdown becomes procedural memory an agent installs and uses at runtime. No separate prompt store; the document is the skill.",
    propGitT:   "Git-backed",
    propGitB:   "Review, CI, provenance, releases, and rollback bring decades of software-engineering safety into the management of agent behaviour.",

    /* §02 evidence */
    tagEvidenceSec: "EVIDENCE",
    evidenceTitleA: "The ecosystem already shows ",
    evidenceTitleB: "a management gap",
    evidenceTitleC: ".",
    evidenceLede: "Public skills are growing quickly, real users are already juggling local folders and installers, and security researchers have found malicious skills in the wild. The answer is not fear; it is visible ownership, review, provenance, and rollback.",
    evidenceGrowthT: "Rapid growth",
    evidenceGrowthB: "SkillsBench found tens of thousands of unique public skills across thousands of repositories.",
    evidenceWorkflowT: "Fragmented workflows",
    evidenceWorkflowB: "Users create, copy, install, edit, update, and sync skills across personal folders, project folders, GitHub repos, and multiple agent clients.",
    evidenceSecurityT: "Real security risk",
    evidenceSecurityB: "Snyk found critical issues in 13.4% of scanned skills, and SC Media reported 341 malicious ClawHub skills.",
    evidenceGovernanceT: "Governance required",
    evidenceGovernanceB: "Official guidance warns that malicious skills can cause data exfiltration or unauthorized access. Scanners help, but review and provenance still matter.",
    evidenceSourceSkillsBench: "SkillsBench",
    evidenceSourceCli: "Skills CLI",
    evidenceSourceSnyk: "Snyk",
    evidenceSourceSC: "SC Media",
    evidenceSourceClaude: "Claude docs",
    evidenceSourceCisco: "Cisco scanner",
    evidenceTagEco: "Ecosystem",
    evidenceTagOps: "Operations",
    evidenceTagRisk: "Risk",
    evidenceTagGov: "Governance",

    /* §03 protocol */
    tagProto:    "PROTOCOL",
    protoTitleA: "A closed loop between ",
    protoTitleB: "people",
    protoTitleC: " and ",
    protoTitleD: "agents",
    protoLede:   "Every useful correction should become part of the skill library — not another lost chat message. The protocol turns repeated agent coaching into durable team knowledge.",
    sTag1: "Author",    sText1: "Write or revise a skill inside a familiar docs surface.",
    sTag2: "Review",    sText2: "Sync the Markdown to Git and review the change as a pull request.",
    sTag3: "Verify",    sText3: "Run hooks to lint metadata, links, and the generated registry.",
    sTag4: "Distribute",sText4: "Agents pull updated skills from the trusted repository.",
    sTag5: "Improve",   sText5: "Failures and corrections become the next skill patch.",

    /* §03 artifacts */
    tagArt:     "ARTIFACTS",
    artTitleA:  "What ships ",
    artTitleB:  "in the repository",
    artLede:    "A deliberately small surface area. Every item below is either a document people read, or a generator that reads documents.",
    repoManT:   "Manifesto",
    repoManB:   "A clear explanation of why skills should be managed as shared operational docs — this document.",
    repoSchT:   "Schema",
    repoSchBA:  "A minimal file model for",
    repoSchBB:  "and the generated",
    repoCliB:   "and adapter generators that emit per-tool indexes.",
    repoAdaT:   "Adapters",
    repoAdaB:   "GitBook and VitePress first, then MkDocs, Obsidian, 飞书, 语雀 — any docs surface that can host plain Markdown.",
    repoTmpT:   "Templates",
    repoTmpB:   "Ready-to-fork team and personal skill libraries — opinionated about layout, neutral about content.",
    repoCasT:   "Case studies",
    repoCasB:   "Real examples showing how repeated agent failures get distilled into a single skill patch.",
    tagText:    "Prose",
    tagSpec:    "Spec",
    tagTool:    "Tool",
    tagInteg:   "Integration",
    tagStarter: "Starter",
    tagEvidence:"Evidence",

    /* §04 adoption */
    tagAdopt:   "ADOPTION",
    adoptTitleA:"Adopt the pattern ",
    adoptTitleB:"before the tooling is complete",
    adoptLede:  "Create a folder. Write clean Markdown. Review changes through Git. Let your agent clients install from the repository. The first CLI milestone will automate the rest.",

    /* §05 non-goals */
    tagNon:     "NON-GOALS",
    ngTitleA:   "Three things SkillDocs is ",
    ngTitleB:   "deliberately not",
    ngLede:     "Each negation is load-bearing: it keeps the project useful by keeping it small.",
    ngX:        "not",
    ngMktT:     "a marketplace",
    ngMktB:     "Public discovery can come later. The first job is helping teams govern their own private skills with confidence.",
    ngPromT:    "a prompt manager",
    ngPromB:    "Skills are filesystem packages and workflow documents, not only runtime prompt templates retrieved by string match.",
    ngDocT:     "an AI docs generator",
    ngDocB:     "The goal is not to make existing docs readable by AI. The goal is to make team procedures installable by agents.",

    /* status bar */
    sbDraft:    "draft",
    sbLang:     "EN",

    /* meta */
    languageToggle: "中文",
    languageLabel:  "Switch language",
    themeDark:      "Dark",
    themeLight:     "Light",
    themeLabel:     "Switch theme"
  },

  zh: {
    title: "Agent SkillDocs · Agent Skill 的运行模型",
    description: "像管理文档一样管理 Agent Skills，通过 Git 分发给 AI agents。",

    metaDoc:    "运行模型",
    metaStatus: "工作草案",

    brand:      "Agent SkillDocs",
    subbrand:   "规范 与 模式",
    tocLabel:   "目录",
    tocHero:    "摘要",
    tocProp:    "命题",
    tocEvidence:"调研信号",
    tocProto:   "协议",
    tocArt:     "构成",
    tocAdopt:   "采用",
    tocNon:     "非目标",
    railAuthors:"作者",
    railLicence:"许可",

    kicker:     "面向 Agent Skill 的运行模型",
    h1A:        "把 skill",
    h1B:        "当文档来管。",
    subtitle:   "人可读。Agent 可执行。通过 Git 分发。",
    abstract:   "Agent 的程序化记忆——它怎么写代码评审、怎么引用文献、怎么写 release notes——不应该躲在一个隐藏的配置目录里。它应该住在那些真正拥有这个工作流的人能够阅读、审查、版本化、并持续改进的地方。SkillDocs 是为此提出的一个刻意朴素的模式。",
    ctaRead:    "阅读命题",
    ctaSource:  "查看源码",
    factFormat: "格式",
    factPrimitive: "基本单位",
    factStatus: "状态",
    factStatusV: "v0.1 · 工作草案",
    factScope:  "范围",
    factScopeV: "团队私有 skills",

    figLabel:   "图 01",
    figTitle:   "SkillDocs 闭环",
    figClosed:  "闭环",
    nodeDocs:   "文档界面",
    nodeDocsDesc: "人在这里写",
    nodeGit:    "Git 同步 + hooks",
    nodeGitDesc: "hooks · ci · 来源",
    nodeAgents: "Agents",
    nodeAgentsDesc: "执行并回报",
    nodeRegistryDesc: "注册表",
    loopImprove: "改进文档",

    tagProp:    "命题",
    propTitleA: "Skills 是面向 agents 的",
    propTitleB: "运行文档",
    propTitleC: "。",
    propLede:   "不应该藏进一个隐藏的配置目录。它应该能被阅读、审查、版本管理，并由真正拥有这个工作流的人持续改进。",
    propHumanT: "人可读",
    propHumanB: "团队可以在自己熟悉的文档工具里浏览、编辑、讨论和改进 skills——Notion、GitBook、VitePress、Obsidian、飞书、语雀。",
    propAgentT: "Agent 可执行",
    propAgentB: "同一份 Markdown 直接成为 agent 在运行时安装和使用的程序化记忆。没有独立的 prompt 存储——文档本身就是 skill。",
    propGitT:   "Git 可信分发",
    propGitB:   "Review、CI、来源追踪、release、回滚——把几十年软件工程的安全经验，搬到 agent 行为的管理上来。",

    tagEvidenceSec: "调研信号",
    evidenceTitleA: "生态已经暴露出",
    evidenceTitleB: "管理层缺口",
    evidenceTitleC: "。",
    evidenceLede: "公共 skills 正在快速增长，真实用户已经在本地目录和安装器之间来回维护，安全研究也已经发现了实际恶意 skills。答案不是恐慌，而是可见的责任人、审查、来源追踪和回滚。",
    evidenceGrowthT: "快速增长",
    evidenceGrowthB: "SkillsBench 在数千个仓库中识别出数万份去重后的公开 skills。",
    evidenceWorkflowT: "工作流分散",
    evidenceWorkflowB: "用户需要在个人目录、项目目录、GitHub 仓库和多个 agent client 之间创建、复制、安装、编辑、更新和同步 skills。",
    evidenceSecurityT: "真实安全风险",
    evidenceSecurityB: "Snyk 在扫描样本中发现 13.4% 的 skills 有 critical 级别问题，SC Media 也报道过 341 个恶意 ClawHub skills。",
    evidenceGovernanceT: "需要治理",
    evidenceGovernanceB: "官方文档也警告恶意 skills 可能造成数据外泄或未授权访问。扫描器有帮助，但审查和来源追踪仍然必要。",
    evidenceSourceSkillsBench: "SkillsBench",
    evidenceSourceCli: "Skills CLI",
    evidenceSourceSnyk: "Snyk",
    evidenceSourceSC: "SC Media",
    evidenceSourceClaude: "Claude 文档",
    evidenceSourceCisco: "Cisco scanner",
    evidenceTagEco: "生态",
    evidenceTagOps: "运维",
    evidenceTagRisk: "风险",
    evidenceTagGov: "治理",

    tagProto:    "协议",
    protoTitleA: "在",
    protoTitleB: "人",
    protoTitleC: "和",
    protoTitleD: "agents",
    protoLede:   "每一次有效纠正都应该进入 skill library，而不是丢在某段聊天记录里。这套协议把反复教 agent 的经验，沉淀成稳定的团队知识。",
    sTag1: "撰写",  sText1: "在熟悉的文档界面里编写或修订一项 skill。",
    sTag2: "审查",  sText2: "把 Markdown 同步到 Git，并以 pull request 的方式审查。",
    sTag3: "校验",  sText3: "运行 hooks，对 metadata、链接、生成的 registry 做校验。",
    sTag4: "分发",  sText4: "Agents 从可信仓库拉取更新后的 skills。",
    sTag5: "改进",  sText5: "失败和纠正变成下一份 skill patch。",

    tagArt:     "构成",
    artTitleA:  "仓库",
    artTitleB:  "应该交付什么",
    artLede:    "刻意保持小表面。下面列的每一项要么是人会读的文档，要么是读文档的生成器。",
    repoManT:   "宣言",
    repoManB:   "清楚解释为什么 skills 应该作为共享的运行文档来管理——就是这一份文档。",
    repoSchT:   "Schema",
    repoSchBA:  "用于",
    repoSchBB:  "和生成的",
    repoCliB:   "以及生成各类 adapter 索引的工具。",
    repoAdaT:   "Adapters",
    repoAdaB:   "先支持 GitBook 和 VitePress，再扩展到 MkDocs、Obsidian、飞书、语雀——任何能承载 Markdown 的文档界面。",
    repoTmpT:   "Templates",
    repoTmpB:   "可直接 fork 的团队和个人 skill library 模板——在结构上有主张，在内容上保持中立。",
    repoCasT:   "案例研究",
    repoCasB:   "用真实案例展示反复发生的 agent 失败如何被收敛进一次 skill patch。",
    tagText:    "正文",
    tagSpec:    "规范",
    tagTool:    "工具",
    tagInteg:   "集成",
    tagStarter: "模板",
    tagEvidence:"证据",

    tagAdopt:   "采用",
    adoptTitleA:"在工具完整之前，",
    adoptTitleB:"就先采用这套模式",
    adoptLede:  "建一个文件夹。写干净的 Markdown。通过 Git review 管变更。让你的 agent clients 从仓库安装。第一版 CLI 会把剩下的重复劳动自动化。",

    tagNon:     "非目标",
    ngTitleA:   "SkillDocs 刻意",
    ngTitleB:   "不是这三件事",
    ngLede:     "每一项否定都承重：它通过保持小，让项目保持有用。",
    ngX:        "不是",
    ngMktT:     "marketplace",
    ngMktB:     "公共发现可以以后再做。第一件事是帮助团队从容地治理自己的私有 skills。",
    ngPromT:    "prompt manager",
    ngPromB:    "Skills 是文件系统里的能力包和工作流文档，不仅仅是按字符串匹配检索的运行时 prompt 模板。",
    ngDocT:     "AI 文档生成器",
    ngDocB:     "目标不是让现有文档可被 AI 读取，而是让团队的流程可被 agents 安装与执行。",

    sbDraft:    "草案",
    sbLang:     "中文",

    languageToggle: "EN",
    languageLabel:  "切换语言",
    themeDark:      "暗色",
    themeLight:     "亮色",
    themeLabel:     "切换主题"
  }
};

const root = document.documentElement;
const langButton  = document.querySelector("[data-language-toggle]");
const themeButton = document.querySelector("[data-theme-toggle]");
const themeLabel  = document.querySelector("[data-theme-label]");

const savedLang   = localStorage.getItem("skilldocs-language");
const browserZh   = navigator.language && navigator.language.toLowerCase().startsWith("zh");
let currentLang   = savedLang || (browserZh ? "zh" : "en");

const savedTheme  = localStorage.getItem("skilldocs-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
let currentTheme  = savedTheme || (prefersDark ? "dark" : "light");

let currentAccent  = localStorage.getItem("skilldocs-accent")  || "blue";
let currentDensity = localStorage.getItem("skilldocs-density") || "normal";

function applyLanguage(lang) {
  currentLang = translations[lang] ? lang : "en";
  const t = translations[currentLang];

  document.title = t.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", t.description);
  root.lang = currentLang === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (t[key] !== undefined) node.textContent = t[key];
  });

  if (langButton) {
    langButton.textContent = t.languageToggle;
    langButton.setAttribute("aria-label", t.languageLabel);
  }
  if (themeButton) themeButton.setAttribute("aria-label", t.themeLabel);
  updateThemeLabel();
  localStorage.setItem("skilldocs-language", currentLang);
  syncTweakButtons();
}

function updateThemeLabel() {
  if (!themeLabel) return;
  const t = translations[currentLang];
  themeLabel.textContent = currentTheme === "dark" ? t.themeLight : t.themeDark;
}

function applyTheme(theme) {
  currentTheme = theme === "dark" ? "dark" : "light";
  root.dataset.theme = currentTheme;
  updateThemeLabel();
  localStorage.setItem("skilldocs-theme", currentTheme);
  syncTweakButtons();
  persistTweaks();
}

function applyAccent(a) {
  currentAccent = a;
  root.dataset.accent = a;
  localStorage.setItem("skilldocs-accent", a);
  syncTweakButtons();
  persistTweaks();
}

function applyDensity(d) {
  currentDensity = d;
  root.dataset.density = d;
  localStorage.setItem("skilldocs-density", d);
  syncTweakButtons();
  persistTweaks();
}

langButton?.addEventListener("click", () => applyLanguage(currentLang === "en" ? "zh" : "en"));
themeButton?.addEventListener("click", () => applyTheme(currentTheme === "dark" ? "light" : "dark"));

/* ============================================================
   Tweaks panel
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent":  "blue",
  "theme":   "light",
  "density": "normal",
  "lang":    "en"
}/*EDITMODE-END*/;

const tweaks = document.getElementById("tweaks");

function openTweaks()  { tweaks?.classList.add("open"); tweaks?.setAttribute("aria-hidden", "false"); }
function closeTweaks() {
  tweaks?.classList.remove("open");
  tweaks?.setAttribute("aria-hidden", "true");
  try { window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*"); } catch(e) {}
}

function syncTweakButtons() {
  tweaks?.querySelectorAll("[data-tweak-group='accent'] .sw").forEach(b =>
    b.setAttribute("aria-pressed", b.dataset.value === currentAccent ? "true" : "false"));
  tweaks?.querySelectorAll("[data-tweak-group='theme'] button").forEach(b =>
    b.setAttribute("aria-pressed", b.dataset.value === currentTheme ? "true" : "false"));
  tweaks?.querySelectorAll("[data-tweak-group='density'] button").forEach(b =>
    b.setAttribute("aria-pressed", b.dataset.value === currentDensity ? "true" : "false"));
  tweaks?.querySelectorAll("[data-tweak-group='lang'] button").forEach(b =>
    b.setAttribute("aria-pressed", b.dataset.value === currentLang ? "true" : "false"));
}

function persistTweaks() {
  try {
    window.parent.postMessage({
      type: "__edit_mode_set_keys",
      edits: {
        accent: currentAccent,
        theme: currentTheme,
        density: currentDensity,
        lang: currentLang
      }
    }, "*");
  } catch(e) {}
}

tweaks?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  if (btn.matches("[data-tweaks-close]")) { closeTweaks(); return; }
  const group = btn.parentElement?.dataset.tweakGroup;
  const value = btn.dataset.value;
  if (!group || !value) return;
  if (group === "accent")  applyAccent(value);
  if (group === "theme")   applyTheme(value);
  if (group === "density") applyDensity(value);
  if (group === "lang")    { applyLanguage(value); persistTweaks(); }
});

window.addEventListener("message", (e) => {
  const t = e.data?.type;
  if (t === "__activate_edit_mode")   openTweaks();
  if (t === "__deactivate_edit_mode") closeTweaks();
});

try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch(e) {}

/* ============================================================
   Scrollspy: highlight current section in left rail + status bar
   ============================================================ */
const tocLinks = document.querySelectorAll('.toc a[data-section]');
const sbSection = document.getElementById('sb-section');
const sectionIds = ['hero','proposition','evidence','protocol','artifacts','adopt','nongoals'];
const sectionNumByName = { hero:'00', proposition:'01', evidence:'02', protocol:'03', artifacts:'04', adopt:'05', nongoals:'06' };

function setActive(id) {
  tocLinks.forEach(a => {
    const on = a.dataset.section === id;
    if (on) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  });
  if (sbSection) {
    const t = translations[currentLang];
    const labelKey = { hero:'tocHero', proposition:'tocProp', evidence:'tocEvidence', protocol:'tocProto', artifacts:'tocArt', adopt:'tocAdopt', nongoals:'tocNon' }[id];
    const label = (labelKey && t[labelKey]) || id;
    sbSection.textContent = `§ ${sectionNumByName[id]} ${label.toLowerCase()}`;
  }
}

const io = new IntersectionObserver((entries) => {
  /* pick the entry whose top is closest to (but above) the 30% viewport line */
  const candidates = entries
    .filter(e => e.isIntersecting)
    .map(e => ({ id: e.target.id, top: e.boundingClientRect.top }));
  if (candidates.length === 0) return;
  /* prefer the one closest to top of viewport but still in view */
  candidates.sort((a, b) => a.top - b.top);
  /* the first entry whose top is <= 30% of viewport is the active one */
  const threshold = window.innerHeight * 0.3;
  const active = candidates.find(c => c.top <= threshold) || candidates[0];
  setActive(active.id);
}, {
  rootMargin: "-25% 0px -55% 0px",
  threshold: [0, 0.2, 0.5, 1]
});

sectionIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) io.observe(el);
});

/* ============================================================
   Init
   ============================================================ */
applyAccent(currentAccent);
applyDensity(currentDensity);
applyTheme(currentTheme);
applyLanguage(currentLang);
setActive('hero');
