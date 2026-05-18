const repo = {
  owner: "anthropics",
  name: "skills",
  branch: "main",
  packages: [
    {
      name: "frontend-design",
      files: [
        {
          path: "skills/frontend-design/SKILL.md",
          kind: "entrypoint",
          changed: false,
          content: `---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications.
license: Complete terms in LICENSE.txt
---

# Frontend Design

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic AI aesthetics.

## Design Thinking

Before coding, understand the context and commit to a clear aesthetic direction:

1. Purpose: what problem does this interface solve?
2. Tone: pick a specific visual direction.
3. Constraints: technical requirements and accessibility.
4. Differentiation: what makes this interface memorable?`
        },
        {
          path: "skills/frontend-design/LICENSE.txt",
          kind: "supporting",
          changed: false,
          content: "Complete license terms for the frontend-design skill."
        }
      ]
    },
    {
      name: "skill-creator",
      files: [
        {
          path: "skills/skill-creator/SKILL.md",
          kind: "entrypoint",
          changed: false,
          content: `---
name: skill-creator
description: Guide for creating effective skills. Use when users want to create a new skill or update an existing skill that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations.
license: Complete terms in LICENSE.txt
---

# Skill Creator

This skill helps design, validate, and improve skill packages.

## Package Structure

A skill is a directory with a required SKILL.md entrypoint. It may include references, scripts, assets, agents, and eval tooling.

## Review Priorities

1. The description should clearly state when the skill should be used.
2. Supporting files should have clear roles.
3. Scripts require extra review because they can execute code.
4. The package should remain readable to humans and installable by agents.`
        },
        {
          path: "skills/skill-creator/references/schemas.md",
          kind: "supporting",
          changed: false,
          content: "# Schemas\n\nReference material for validating skill metadata, eval specs, and generated reports."
        },
        {
          path: "skills/skill-creator/scripts/package_skill.py",
          kind: "script",
          changed: false,
          content: "from pathlib import Path\n\n\ndef package_skill(root: Path) -> None:\n    print(f'Packaging {root}')\n"
        },
        {
          path: "skills/skill-creator/scripts/quick_validate.py",
          kind: "script",
          changed: false,
          content: "def quick_validate(skill_path):\n    return skill_path.exists()\n"
        },
        {
          path: "skills/skill-creator/assets/eval_review.html",
          kind: "asset",
          changed: false,
          content: "<!doctype html><html><body>Eval review viewer asset.</body></html>"
        },
        {
          path: "skills/skill-creator/agents/analyzer.md",
          kind: "supporting",
          changed: false,
          content: "# Analyzer Agent\n\nReads a candidate skill and identifies trigger clarity, package risks, and missing references."
        },
        {
          path: "skills/skill-creator/eval-viewer/viewer.html",
          kind: "asset",
          changed: false,
          content: "<!doctype html><html><body>Skill eval viewer.</body></html>"
        }
      ]
    },
    {
      name: "pdf",
      files: [
        {
          path: "skills/pdf/SKILL.md",
          kind: "entrypoint",
          changed: false,
          content: `---
name: pdf
description: Work with PDF files where rendering, extraction, layout, or visual verification matters.
---

# PDF

Use this skill for PDF reading, generation, review, rendering, and layout checks.`
        }
      ]
    }
  ]
};

const root = document.documentElement;
const tree = document.querySelector("[data-tree]");
const searchInput = document.querySelector("[data-search]");
const repoInput = document.querySelector("[data-repo-input]");
const folderInput = document.querySelector("[data-folder-input]");
const filterTrigger = document.querySelector("[data-filter-trigger]");
const filterPopover = document.querySelector("[data-filter-popover]");
const filterInputs = document.querySelectorAll("[data-filter]");
const editor = document.querySelector("[data-editor]");
const editorHighlight = document.querySelector("[data-editor-highlight]");
const preview = document.querySelector("[data-preview]");
const currentPath = document.querySelector("[data-current-path]");
const currentKind = document.querySelector("[data-current-kind]");
const checkList = document.querySelector("[data-check-list]");
const installCommand = document.querySelector("[data-install-command]");
const listCommand = document.querySelector("[data-list-command]");
const metadataChips = document.querySelector("[data-metadata-chips]");
const riskSummary = document.querySelector("[data-risk-summary]");
const packageName = document.querySelector("[data-package-name]");
const packageCount = document.querySelector("[data-package-count]");
const packageRisk = document.querySelector("[data-package-risk]");
const syncState = document.querySelector("[data-sync-state]");
const themeButton = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const localeToggle = document.querySelector("[data-locale-toggle]");
const repoContextName = document.querySelector(".repo-context span:first-child");
const repoContextBranch = document.querySelector(".repo-context span:nth-child(2)");
const repoContextMode = document.querySelector(".repo-context span:nth-child(3)");
const viewButtons = document.querySelectorAll("[data-view]");
const viewSurfaces = document.querySelectorAll("[data-view-surface]");
const zenToggle = document.querySelector("[data-zen-toggle]");
const agentButtons = document.querySelectorAll("[data-agent]");
const fieldInputs = document.querySelectorAll("[data-field]");
const diffTarget = document.querySelector("[data-diff]");
const handoffSummary = document.querySelector("[data-handoff-summary]");
const handoffCommand = document.querySelector("[data-handoff-command]");
const registrySummary = document.querySelector("[data-registry-summary]");
const registryPreview = document.querySelector("[data-registry-preview]");
const packageEntry = document.querySelector("[data-package-entry]");
const settingsToggle = document.querySelector("[data-settings-toggle]");
const settingsPopover = document.querySelector("[data-settings-popover]");
const importOpenButton = document.querySelector("[data-import-open]");
const settingFont = document.querySelector("[data-setting-font]");
const settingSize = document.querySelector("[data-setting-size]");
const settingSizeValue = document.querySelector("[data-setting-size-value]");
const settingLine = document.querySelector("[data-setting-line]");
const settingLineValue = document.querySelector("[data-setting-line-value]");
const settingWrap = document.querySelector("[data-setting-wrap]");
const packageFolderInput = document.querySelector("[data-package-folder]");
const deletePackageButton = document.querySelector("[data-delete-package]");

let selectedPackage = repo.packages[1];
let selectedFile = selectedPackage.files[0];
let selectedAgent = "codex";
let currentTheme = localStorage.getItem("skilldocs-theme") || "light";
let currentLocale = localStorage.getItem("skilldocs-locale") || "en";
let zenMode = false;
let deletedPackages = [];
let deleteArmedFor = null;
const MIN_DESCRIPTION_LENGTH = 40;
const REGISTRY_SCHEMA = "https://agent-skilldocs.dev/schemas/skills-registry.v0.json";
const DEFAULT_AGENTS = ["codex", "claude-code", "antigravity"];
const openDirs = new Set(["skills", "skills/skill-creator", "skills/skill-creator/references", "skills/skill-creator/scripts", "skills/skill-creator/assets", "skills/skill-creator/agents", "skills/skill-creator/eval-viewer"]);
const editorSettingsDefaults = {
  font: "ibm",
  size: 14,
  lineHeight: 1.76,
  wrap: true
};
const editorFonts = {
  ibm: 'var(--font-mono)',
  consolas: 'Consolas, "SFMono-Regular", ui-monospace, monospace',
  system: 'ui-monospace, "SFMono-Regular", Menlo, Monaco, Consolas, monospace',
  serif: 'Georgia, "Times New Roman", serif'
};
const localeCopy = {
  en: {
    "brand.subtitle": "Package tree editor",
    "status.clean": "Clean",
    "action.import": "Import skills",
    "action.locale": "Switch language",
    "action.settings": "Workspace settings",
    "action.theme": "Toggle theme",
    "action.runChecks": "Run checks",
    "action.runChecksTitle": "Recompute browser-side lint rules",
    "action.preparePr": "Prepare draft PR",
    "action.preparePrTitle": "Prepare a PR payload; GitHub sync needs authentication",
    "action.loadRepo": "Load repo",
    "action.localFolder": "Local folder",
    "action.newPackage": "New package",
    "action.copyJson": "Copy JSON",
    "settings.label": "Settings",
    "settings.title": "Workspace setup",
    "settings.reset": "Reset reading",
    "settings.source": "Source",
    "settings.importHint": "Load a public GitHub repo or select a local skill folder. Local imports stay in this browser.",
    "settings.githubRepo": "GitHub repo",
    "settings.reading": "Reading",
    "settings.readingTitle": "Editor, preview, diff",
    "settings.font": "Font",
    "settings.textSize": "Text size",
    "settings.lineHeight": "Line height",
    "settings.wrap": "Soft wrap long lines",
    "tree.aria": "Repository tree",
    "tree.title": "Repository tree",
    "tree.search": "Search files",
    "tree.searchPlaceholder": "SKILL.md, scripts, references...",
    "tree.collapse": "Collapse",
    "tree.expandCurrent": "Expand current",
    "crud.aria": "Skill package actions",
    "crud.create": "New skill",
    "crud.folder": "Skill folder",
    "crud.rename": "Rename",
    "crud.delete": "Delete",
    "crud.confirmDelete": "Confirm delete",
    "crud.renamePrompt": "Rename skill folder",
    "crud.renameInvalid": "Use a folder-safe skill name.",
    "crud.renameExists": "A skill with this name already exists.",
    "crud.deleteConfirm": "Delete this skill package from the browser workspace?",
    "crud.created": "New package created",
    "crud.renamed": "Package renamed",
    "crud.deleted": "Package deleted",
    "editor.aria": "File editor",
    "view.edit": "Edit",
    "view.preview": "Preview",
    "view.diff": "Diff",
    "view.registry": "Registry",
    "view.zen": "Zen",
    "view.exitZen": "Exit zen",
    "diff.handoff": "Git handoff",
    "inspector.aria": "Inspector",
    "inspector.metadata": "Metadata",
    "inspector.labels": "Labels",
    "inspector.generated": "generated",
    "inspector.liveLint": "Live lint",
    "inspector.install": "Install",
    "inspector.packageScope": "Package scope",
    "inspector.metadataHint": "These fields are a form view of the selected package's `SKILL.md` frontmatter. Editing here rewrites the Markdown frontmatter; editing `SKILL.md` updates this panel.",
    "inspector.labelsHint": "Generated from frontmatter, file type, and package scan. Future versions can write selected labels back to metadata.",
    "inspector.lintHint": "Risk is derived from this lint list: failures make it high, warnings make it medium, and a clean package is low. CI is the final gate before merge.",
    "field.name": "name",
    "field.description": "description",
    "field.category": "category",
    "field.version": "version",
    "field.owner": "owner",
    "field.reviewStatus": "review status",
    "field.required": "required",
    "field.optional": "optional",
    "field.unset": "Unset",
    "field.categoryPlaceholder": "Writing, coding, research...",
    "field.ownerPlaceholder": "@team or maintainer",
    "install.target": "Install target",
    "install.hint": "Discovery stays non-mutating; install writes the package into the selected agent target."
  },
  zh: {
    "brand.subtitle": "技能包树编辑器",
    "status.clean": "干净",
    "action.import": "导入 skills",
    "action.locale": "切换语言",
    "action.settings": "工作区设置",
    "action.theme": "切换主题",
    "action.runChecks": "运行检查",
    "action.runChecksTitle": "重新计算浏览器端 lint 规则",
    "action.preparePr": "准备草稿 PR",
    "action.preparePrTitle": "准备 PR 交接内容；GitHub 同步需要认证",
    "action.loadRepo": "加载仓库",
    "action.localFolder": "本地文件夹",
    "action.newPackage": "新建包",
    "action.copyJson": "复制 JSON",
    "settings.label": "设置",
    "settings.title": "工作区初始化",
    "settings.reset": "重置阅读设置",
    "settings.source": "来源",
    "settings.importHint": "加载公开 GitHub 仓库，或选择本地 skill 文件夹。本地导入只保留在当前浏览器。",
    "settings.githubRepo": "GitHub 仓库",
    "settings.reading": "阅读",
    "settings.readingTitle": "编辑、预览、Diff",
    "settings.font": "字体",
    "settings.textSize": "字号",
    "settings.lineHeight": "行高",
    "settings.wrap": "长行软换行",
    "tree.aria": "仓库树",
    "tree.title": "仓库树",
    "tree.search": "搜索文件",
    "tree.searchPlaceholder": "SKILL.md、scripts、references...",
    "tree.collapse": "收起",
    "tree.expandCurrent": "展开当前",
    "crud.aria": "Skill 包操作",
    "crud.create": "新建 skill",
    "crud.folder": "Skill 文件夹",
    "crud.rename": "重命名",
    "crud.delete": "删除",
    "crud.confirmDelete": "确认删除",
    "crud.renamePrompt": "重命名 skill 文件夹",
    "crud.renameInvalid": "请输入可作为文件夹名的 skill 名称。",
    "crud.renameExists": "这个 skill 名称已经存在。",
    "crud.deleteConfirm": "从当前浏览器工作区删除这个 skill 包？",
    "crud.created": "已新建 package",
    "crud.renamed": "已重命名 package",
    "crud.deleted": "已删除 package",
    "editor.aria": "文件编辑器",
    "view.edit": "编辑",
    "view.preview": "预览",
    "view.diff": "Diff",
    "view.registry": "Registry",
    "view.zen": "专注",
    "view.exitZen": "退出专注",
    "diff.handoff": "Git 交接",
    "inspector.aria": "检查器",
    "inspector.metadata": "元数据",
    "inspector.labels": "标签",
    "inspector.generated": "自动生成",
    "inspector.liveLint": "实时检查",
    "inspector.install": "安装",
    "inspector.packageScope": "包范围",
    "inspector.metadataHint": "这些字段是所选包 `SKILL.md` frontmatter 的表单视图。在这里编辑会重写 Markdown frontmatter；直接编辑 `SKILL.md` 也会更新此面板。",
    "inspector.labelsHint": "由 frontmatter、文件类型和包扫描结果生成。后续版本可以把选中的标签写回元数据。",
    "inspector.lintHint": "风险来自 lint 列表：失败为高风险，警告为中风险，无问题为低风险。CI 是合并前的最终门禁。",
    "field.name": "name",
    "field.description": "description",
    "field.category": "category",
    "field.version": "version",
    "field.owner": "owner",
    "field.reviewStatus": "review status",
    "field.required": "必填",
    "field.optional": "可选",
    "field.unset": "未设置",
    "field.categoryPlaceholder": "Writing、coding、research...",
    "field.ownerPlaceholder": "@team 或维护者",
    "install.target": "安装目标",
    "install.hint": "发现命令不会写入文件；安装命令会把包写入选中的 agent 目标目录。"
  }
};
let editorSettings = loadEditorSettings();

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function t(key) {
  return localeCopy[currentLocale]?.[key] || localeCopy.en[key] || key;
}

function applyLocale(locale) {
  currentLocale = locale === "zh" ? "zh" : "en";
  root.dataset.locale = currentLocale;
  document.documentElement.lang = currentLocale === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((node) => {
    node.setAttribute("title", t(node.dataset.i18nTitle));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAria));
  });
  if (localeToggle) {
    localeToggle.textContent = currentLocale === "zh" ? "EN" : "中";
    localeToggle.setAttribute("aria-label", t("action.locale"));
    localeToggle.setAttribute("title", t("action.locale"));
  }
  if (syncState && ["Clean", "干净"].includes(syncState.textContent || "")) {
    syncState.textContent = t("status.clean");
  }
  if (zenToggle) zenToggle.textContent = zenMode ? t("view.exitZen") : t("view.zen");
  if (selectedPackage) renderPackageActions();
  localStorage.setItem("skilldocs-locale", currentLocale);
}

function loadEditorSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem("skilldocs-editor-settings") || "{}");
    return {
      ...editorSettingsDefaults,
      ...saved,
      size: Number(saved.size || editorSettingsDefaults.size),
      lineHeight: Number(saved.lineHeight || editorSettingsDefaults.lineHeight),
      wrap: saved.wrap !== false
    };
  } catch {
    return { ...editorSettingsDefaults };
  }
}

function syncSettingsControls() {
  if (settingFont) settingFont.value = editorSettings.font;
  if (settingSize) settingSize.value = String(editorSettings.size);
  if (settingSizeValue) settingSizeValue.textContent = `${editorSettings.size}px`;
  if (settingLine) settingLine.value = String(editorSettings.lineHeight);
  if (settingLineValue) settingLineValue.textContent = editorSettings.lineHeight.toFixed(2);
  if (settingWrap) settingWrap.checked = editorSettings.wrap;
}

function applyEditorSettings(nextSettings = editorSettings) {
  editorSettings = {
    ...editorSettingsDefaults,
    ...nextSettings,
    size: Math.min(20, Math.max(12, Number(nextSettings.size) || editorSettingsDefaults.size)),
    lineHeight: Math.min(2.1, Math.max(1.35, Number(nextSettings.lineHeight) || editorSettingsDefaults.lineHeight)),
    wrap: nextSettings.wrap !== false
  };
  root.style.setProperty("--editor-font-family", editorFonts[editorSettings.font] || editorFonts.ibm);
  root.style.setProperty("--editor-font-size", `${editorSettings.size}px`);
  root.style.setProperty("--editor-line-height", String(editorSettings.lineHeight));
  root.dataset.editorWrap = editorSettings.wrap ? "on" : "off";
  localStorage.setItem("skilldocs-editor-settings", JSON.stringify(editorSettings));
  syncSettingsControls();
  renderEditorHighlight();
}

function patchEditorSetting(key, value) {
  applyEditorSettings({ ...editorSettings, [key]: value });
}

function parseYamlScalar(value = "") {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    const quote = trimmed[0];
    const inner = trimmed.slice(1, -1);
    if (quote === '"') {
      try {
        return JSON.parse(trimmed);
      } catch {
        return inner.replace(/\\"/g, '"');
      }
    }
    return inner.replace(/''/g, "'");
  }
  return trimmed;
}

function yamlString(value = "") {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^[A-Za-z0-9][A-Za-z0-9 ._/-]*$/.test(trimmed) && !/^(true|false|null|undefined)$/i.test(trimmed)) {
    return trimmed;
  }
  return JSON.stringify(trimmed);
}

function getFrontmatter(content = "") {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const index = line.indexOf(":");
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    const value = parseYamlScalar(line.slice(index + 1));
    fields[key] = value;
  }
  return fields;
}

function setFrontmatterField(content, key, value, required = false) {
  if (!content.startsWith("---\n") && !content.startsWith("---\r\n")) return content;
  const endMatch = content.match(/\r?\n---/);
  const end = endMatch ? endMatch.index : -1;
  if (end === -1) return content;
  const body = content.slice(end);
  const frontmatterStart = content.startsWith("---\r\n") ? 5 : 4;
  const lines = content.slice(frontmatterStart, end).split(/\r?\n/);
  const normalized = value.trim();
  let seen = false;
  const next = lines.flatMap((line) => {
    if (!line.startsWith(`${key}:`)) return [line];
    seen = true;
    if (!normalized && !required) return [];
    return [`${key}: ${yamlString(normalized)}`];
  });
  if (!seen && (normalized || required)) next.push(`${key}: ${yamlString(normalized)}`);
  return `---\n${next.join("\n")}${body}`;
}

function packageForFile(file) {
  return repo.packages.find((pkg) => pkg.files.includes(file)) || repo.packages[0];
}

function allFiles() {
  return repo.packages.flatMap((pkg) => pkg.files);
}

function fileName(path) {
  return path.split("/").pop();
}

function isTextLike(path) {
  return /\.(md|txt|json|ya?ml|js|ts|tsx|jsx|py|html|css|toml|csv)$/i.test(path) || path.endsWith("SKILL.md");
}

async function ensureFileContent(file) {
  if (!file || typeof file.content === "string") return;
  if (!isTextLike(file.path)) {
    file.content = `[binary file]\n${file.path}\n${file.size || 0} bytes`;
    return;
  }
  if (!file.rawUrl) {
    file.content = "";
    return;
  }
  if (syncState) syncState.textContent = `Loading ${fileName(file.path)}`;
  const response = await fetch(file.rawUrl);
  if (!response.ok) throw new Error(`Could not load ${file.path}: ${response.status}`);
  file.content = await response.text();
}

function detectKind(path) {
  if (path.endsWith("/SKILL.md") || path === "SKILL.md") return "entrypoint";
  if (path.includes("/scripts/")) return "script";
  if (path.includes("/assets/") || path.endsWith(".png") || path.endsWith(".jpg") || path.endsWith(".pdf") || path.endsWith(".html")) return "asset";
  return "supporting";
}

function languageForPath(path) {
  if (path.endsWith(".py")) return "python";
  if (path.endsWith(".js") || path.endsWith(".ts") || path.endsWith(".tsx") || path.endsWith(".jsx")) return "javascript";
  if (path.endsWith(".html")) return "html";
  if (path.endsWith(".json")) return "json";
  if (path.endsWith(".md") || path.endsWith("SKILL.md")) return "markdown";
  if (path.endsWith(".yml") || path.endsWith(".yaml")) return "yaml";
  return "text";
}

function highlightCode(code, lang = "text") {
  let html = escapeHtml(code);
  if (lang === "markdown") {
    html = html
      .replace(/^---$/gm, '<span class="tok-meta">---</span>')
      .replace(/^(#{1,3}\s.*)$/gm, '<span class="tok-head">$1</span>')
      .replace(/^(\d+\.\s)/gm, '<span class="tok-list">$1</span>')
      .replace(/^([a-zA-Z_][\w-]*:)(.*)$/gm, '<span class="tok-key">$1</span>$2');
  } else if (lang === "python" || lang === "javascript") {
    const keywords = /\b(def|return|from|import|for|if|elif|else|const|let|var|function|async|await|class|new|if|try|catch)\b/g;
    const commentToken = lang === "python" ? "#" : "//";
    html = html.split("\n").map((line) => {
      const strings = [];
      let protectedLine = line.replace(/(&quot;.*?&quot;|&#039;.*?&#039;|`.*?`)/g, (match) => {
        strings.push(match);
        return `@@STR${strings.length - 1}@@`;
      });
      const commentIndex = protectedLine.indexOf(commentToken);
      const codePart = commentIndex === -1 ? protectedLine : protectedLine.slice(0, commentIndex);
      const commentPart = commentIndex === -1 ? "" : protectedLine.slice(commentIndex);
      const restoreStrings = (value) => value.replace(/@@STR(\d+)@@/g, (_, index) => `<span class="tok-str">${strings[Number(index)]}</span>`);
      return restoreStrings(codePart
        .replace(keywords, '<span class="tok-key">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="tok-num">$1</span>'))
        + (commentPart ? `<span class="tok-comment">${restoreStrings(commentPart)}</span>` : "");
    }).join("\n");
  } else if (lang === "html") {
    html = html.replace(/(&lt;\/?[\w-]+.*?&gt;)/g, '<span class="tok-key">$1</span>');
  } else if (lang === "json" || lang === "yaml") {
    html = html
      .replace(/^([ \t]*&quot;?[\w-]+&quot;?:)/gm, '<span class="tok-key">$1</span>')
      .replace(/(&quot;.*?&quot;)/g, '<span class="tok-str">$1</span>');
  }
  return html;
}

function directoryForPackage(pkg) {
  return `skills/${pkg.name}`;
}

function directoryKeysForPackage(pkg) {
  const keys = new Set([directoryForPackage(pkg)]);
  for (const file of pkg.files) {
    const parts = file.path.split("/");
    let current = "";
    for (let index = 0; index < parts.length - 1; index += 1) {
      current = current ? `${current}/${parts[index]}` : parts[index];
      if (current.startsWith(directoryForPackage(pkg))) keys.add(current);
    }
  }
  return keys;
}

function packageForDirKey(key) {
  const match = key.match(/^skills\/([^/]+)$/);
  if (!match) return null;
  return repo.packages.find((pkg) => pkg.name === match[1]) || null;
}

function expandPackage(pkg) {
  if (!pkg) return;
  openDirs.add("skills");
  directoryKeysForPackage(pkg).forEach((key) => openDirs.add(key));
}

function collapsePackage(pkg) {
  if (!pkg) return;
  const rootKey = directoryForPackage(pkg);
  [...openDirs].forEach((key) => {
    if (key === rootKey || key.startsWith(`${rootKey}/`)) openDirs.delete(key);
  });
}

function shouldShowFile(file) {
  const query = (searchInput?.value || "").toLowerCase().trim();
  const filterMap = Object.fromEntries([...filterInputs].map((input) => [input.dataset.filter, input.checked]));
  if (query && !file.path.toLowerCase().includes(query)) return false;
  if (filterMap.changed && !file.changed) return false;
  if (file.kind === "entrypoint") return filterMap.entrypoint;
  if (file.kind === "script") return filterMap.script;
  return filterMap.supporting;
}

function renderTree() {
  if (!tree) return;
  const html = [];
  html.push(dirRow("skills", "skills/", 8, repo.packages.length, "root"));

  for (const pkg of repo.packages) {
    const visibleFiles = pkg.files.filter(shouldShowFile);
    if (visibleFiles.length === 0) continue;
    const pkgKey = `skills/${pkg.name}`;
    html.push(dirRow(pkgKey, `${pkg.name}/`, 22, visibleFiles.length, "package"));
    if (!openDirs.has("skills") || !openDirs.has(pkgKey)) continue;

    const groups = new Map();
    for (const file of visibleFiles) {
      const rel = file.path.slice(directoryForPackage(pkg).length + 1);
      const parts = rel.split("/");
      if (parts.length === 1) {
        groups.set(rel, { files: [file], direct: true });
      } else {
        const group = parts[0];
        if (!groups.has(group)) groups.set(group, { files: [], direct: false });
        groups.get(group).files.push(file);
      }
    }

    for (const [group, value] of groups) {
      if (value.direct) {
        const file = value.files[0];
        html.push(fileRow(file, 42));
      } else {
        const groupKey = `${pkgKey}/${group}`;
        html.push(dirRow(groupKey, `${group}/`, 42, value.files.length, "folder"));
        if (!openDirs.has(groupKey)) continue;
        for (const file of value.files) html.push(fileRow(file, 62));
      }
    }
  }

  tree.innerHTML = html.join("");
}

function dirRow(key, name, padding, count, role = "folder") {
  const open = openDirs.has(key);
  const activePackage = key === directoryForPackage(selectedPackage) ? " active-package" : "";
  return `
    <button type="button" class="tree-row dir ${role}${activePackage}" style="padding-left: ${padding}px" data-dir="${key}" aria-expanded="${open}">
      <span class="chev">${open ? "▾" : "▸"}</span>
      <span class="name">${name}</span>
      <span class="kind">${count || ""}</span>
    </button>
  `;
}

function fileRow(file, padding) {
  const active = file === selectedFile ? " active" : "";
  const changed = file.changed ? " changed" : "";
  return `
    <button type="button" class="tree-row file${active}${changed}" style="padding-left: ${padding}px" data-path="${file.path}">
      <span class="chev"></span>
      <span class="name">${fileName(file.path)}</span>
      <span class="kind">${file.kind}</span>
    </button>
  `;
}

function renderMarkdown(markdown) {
  const withoutFrontmatter = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
  const lines = withoutFrontmatter.split("\n");
  const html = [];
  let inList = false;
  let inCode = false;
  let codeLang = "text";
  let codeLines = [];

  function closeList() {
    if (inList) {
      html.push("</ol>");
      inList = false;
    }
  }

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code>${highlightCode(codeLines.join("\n"), codeLang)}</code></pre>`);
        inCode = false;
        codeLines = [];
        codeLang = "text";
      } else {
        closeList();
        inCode = true;
        codeLang = line.slice(3).trim() || "text";
      }
    } else if (inCode) {
      codeLines.push(line);
    } else if (line.startsWith("# ")) {
      closeList();
      html.push(`<h1>${escapeHtml(line.slice(2))}</h1>`);
    } else if (line.startsWith("## ")) {
      closeList();
      html.push(`<h2>${escapeHtml(line.slice(3))}</h2>`);
    } else if (/^\d+\.\s/.test(line)) {
      if (!inList) {
        html.push("<ol>");
        inList = true;
      }
      html.push(`<li>${escapeHtml(line.replace(/^\d+\.\s/, ""))}</li>`);
    } else if (line.trim()) {
      closeList();
      html.push(`<p>${escapeHtml(line)}</p>`);
    }
  }
  if (inCode) html.push(`<pre><code>${highlightCode(codeLines.join("\n"), codeLang)}</code></pre>`);
  closeList();
  return html.join("");
}

function packageRoot(pkg) {
  return `skills/${pkg.name}`;
}

function issue(id, severity, path, message) {
  return { id, severity, path, message };
}

function riskFromIssues(issues) {
  if (issues.some((item) => item.severity === "error")) return "high";
  if (issues.some((item) => item.severity === "warning")) return "medium";
  return "low";
}

function lintPackage(pkg) {
  const entry = pkg.files.find((item) => item.kind === "entrypoint");
  const rootPath = packageRoot(pkg);
  const fm = entry ? getFrontmatter(entry.content) : {};
  const issues = [];

  if (!entry) {
    issues.push(issue("package.missing-entrypoint", "error", `${rootPath}/SKILL.md`, "Package is missing SKILL.md."));
  }

  if (!fm.name?.trim()) {
    issues.push(issue("frontmatter.name.required", "error", entry?.path || `${rootPath}/SKILL.md`, "SKILL.md frontmatter must include name."));
  }

  if (!fm.description?.trim()) {
    issues.push(issue("frontmatter.description.required", "error", entry?.path || `${rootPath}/SKILL.md`, "SKILL.md frontmatter must include description."));
  } else if (fm.description.trim().length < MIN_DESCRIPTION_LENGTH) {
    issues.push(issue(
      "frontmatter.description.too-short",
      "warning",
      entry?.path || `${rootPath}/SKILL.md`,
      `Description should be at least ${MIN_DESCRIPTION_LENGTH} characters and explain when to use the skill.`
    ));
  }

  if (fm.name && fm.name !== pkg.name) {
    issues.push(issue(
      "frontmatter.name.folder-mismatch",
      "warning",
      entry?.path || `${rootPath}/SKILL.md`,
      `Frontmatter name "${fm.name}" differs from folder name "${pkg.name}".`
    ));
  }

  for (const file of pkg.files) {
    if (!file.path.startsWith(`${rootPath}/`)) {
      issues.push(issue("package.boundary", "error", file.path, "Package file is outside its skill root."));
    }
    if (file.kind === "script") {
      issues.push(issue("script.review-required", "warning", file.path, "Scripts require human review before approval."));
    }
  }

  return {
    packageName: pkg.name,
    risk: riskFromIssues(issues),
    issues
  };
}

function lintSummary() {
  const packageLint = lintPackage(selectedPackage);
  const contextIssues = [];
  if (selectedFile.kind !== "entrypoint") {
    contextIssues.push(issue("editor.supporting-file", "context", selectedFile.path, "Editing a supporting file does not change registry metadata unless SKILL.md changes."));
  }
  const failCount = packageLint.issues.filter((item) => item.severity === "error").length;
  const warnCount = packageLint.issues.filter((item) => item.severity === "warning").length;
  return {
    checks: packageLint.issues,
    contextIssues,
    failCount,
    warnCount,
    risk: packageLint.risk
  };
}

function renderChecks() {
  if (!checkList) return;
  const summary = lintSummary();
  if (riskSummary) {
    riskSummary.textContent = `${summary.risk} risk · ${summary.failCount} fail · ${summary.warnCount} warn`;
  }
  const rows = summary.checks.length
    ? summary.checks
    : [issue("package.clean", "pass", selectedPackage.files[0]?.path || packageRoot(selectedPackage), "Package passes browser lint.")];
  checkList.innerHTML = [...rows, ...summary.contextIssues].map((item) => {
    const kind = item.severity === "error" ? " fail" : item.severity === "warning" ? " warn" : "";
    return `<li><span class="check-dot${kind}"></span><span><strong>${escapeHtml(item.id)}</strong><br>${escapeHtml(item.message)}</span></li>`;
  }).join("");
}

function renderMetadataChips() {
  if (!metadataChips) return;
  const entry = selectedPackage.files.find((file) => file.kind === "entrypoint");
  const fm = entry ? getFrontmatter(entry.content) : {};
  const scriptCount = selectedPackage.files.filter((file) => file.kind === "script").length;
  const lint = lintPackage(selectedPackage);
  const chips = [
    ["package", selectedPackage.name, "pass"],
    ["file", selectedFile.kind, selectedFile.kind === "script" ? "warn" : "pass"],
    ["risk", lint.risk, lint.risk === "low" ? "pass" : "warn"],
    ["review", fm.review_status || "unreviewed", fm.review_status === "approved" ? "pass" : "warn"],
    ["agent", selectedAgent, "pass"]
  ];
  if (scriptCount) chips.push(["scripts", String(scriptCount), "warn"]);
  metadataChips.innerHTML = chips.map(([key, value, tone]) => `<span class="chip ${tone}">${key}: ${escapeHtml(value)}</span>`).join("");
}

function renderFields() {
  const entry = selectedPackage.files.find((file) => file.kind === "entrypoint");
  const fm = entry ? getFrontmatter(entry.content) : {};
  fieldInputs.forEach((input) => {
    input.value = fm[input.dataset.field] || "";
    input.disabled = !entry;
  });
}

function renderPackageActions() {
  if (packageFolderInput) packageFolderInput.value = selectedPackage.name;
  if (deleteArmedFor && deleteArmedFor !== selectedPackage.name) deleteArmedFor = null;
  if (deletePackageButton) {
    deletePackageButton.textContent = deleteArmedFor === selectedPackage.name ? t("crud.confirmDelete") : t("crud.delete");
  }
}

function renderPackageFacts() {
  const scripts = selectedPackage.files.filter((file) => file.kind === "script").length;
  const entry = selectedPackage.files.find((file) => file.kind === "entrypoint");
  const summary = lintSummary();
  renderPackageActions();
  if (packageName) packageName.textContent = selectedPackage.name;
  if (packageEntry) packageEntry.textContent = entry ? fileName(entry.path) : "missing";
  if (packageCount) packageCount.textContent = String(selectedPackage.files.length);
  if (packageRisk) packageRisk.textContent = scripts > 0 ? `${summary.risk} · ${scripts} script file${scripts > 1 ? "s" : ""}` : `${summary.risk} · text-only`;
}

function installSource() {
  return repo.owner === "local" ? "." : `${repo.owner}/${repo.name}`;
}

function generateInstallCommand(source, skillName, agent, global = true) {
  const globalFlag = global ? " -g" : "";
  return `npx skills add ${source} --skill ${skillName}${globalFlag} -a ${agent}`;
}

function fileSize(file) {
  if (Number.isFinite(file.size)) return file.size;
  return new Blob([file.content || ""]).size;
}

function packageRegistryRecord(pkg) {
  const entry = pkg.files.find((file) => file.kind === "entrypoint");
  const fm = entry ? getFrontmatter(entry.content) : {};
  const lint = lintPackage(pkg);
  const record = {
    name: fm.name || pkg.name,
    path: packageRoot(pkg),
    entrypoint: entry?.path || `${packageRoot(pkg)}/SKILL.md`,
    description: fm.description || "",
    risk: lint.risk,
    files: pkg.files.map((file) => ({
      path: file.path,
      kind: file.kind,
      size: fileSize(file)
    })),
    install: DEFAULT_AGENTS.map((agent) => generateInstallCommand(installSource(), pkg.name, agent))
  };
  for (const key of ["category", "version", "owner", "review_status"]) {
    if (fm[key]?.trim()) record[key] = fm[key].trim();
  }
  return record;
}

function generateRegistryPreview() {
  const repository = repo.owner === "local" ? undefined : `${repo.owner}/${repo.name}`;
  return {
    $schema: REGISTRY_SCHEMA,
    schema_version: "skilldocs.registry.v0",
    generated_at: new Date().toISOString(),
    source: {
      repository,
      branch: repo.branch === "local" ? undefined : repo.branch
    },
    packages: repo.packages.map(packageRegistryRecord)
  };
}

function updateInstallCommand() {
  const source = installSource();
  if (listCommand) listCommand.textContent = `npx skills add ${source} --list`;
  if (installCommand) installCommand.textContent = generateInstallCommand(source, selectedPackage.name, selectedAgent);
}

function updateRegistryPreview() {
  if (!registryPreview && !registrySummary && !repoContextMode) return;
  const registry = generateRegistryPreview();
  const packageCountValue = registry.packages.length;
  const issueCount = repo.packages.reduce((total, pkg) => total + lintPackage(pkg).issues.length, 0);
  if (registryPreview) registryPreview.textContent = JSON.stringify(registry, null, 2);
  if (registrySummary) registrySummary.textContent = `${packageCountValue} packages · ${issueCount} lint issue${issueCount === 1 ? "" : "s"}`;
  if (repoContextMode) repoContextMode.textContent = `${packageCountValue} packages`;
}

function setRepoName(value) {
  const cleaned = value.replace(/^https:\/\/github\.com\//, "").replace(/\/$/, "") || "local/imported-skills";
  const [owner = "local", name = "imported-skills"] = cleaned.split("/");
  repo.owner = owner;
  repo.name = name;
  if (repo.owner === "local") repo.branch = "local";
  if (repoContextName) repoContextName.textContent = `${repo.owner}/${repo.name}`;
  if (repoContextBranch) repoContextBranch.textContent = repo.branch;
}

function closeSettings() {
  settingsPopover?.classList.add("hidden");
  settingsToggle?.setAttribute("aria-expanded", "false");
}

function parseGitHubRepo(value) {
  const cleaned = (value || "anthropics/skills")
    .trim()
    .replace(/^https?:\/\/github\.com\//, "")
    .replace(/^github\.com\//, "")
    .replace(/\.git$/, "")
    .replace(/\/$/, "");
  const [owner, name] = cleaned.split("/").filter(Boolean);
  if (!owner || !name) throw new Error("Use owner/repo or a GitHub repository URL.");
  return { owner, name };
}

function rawGitHubUrl(owner, name, branch, path) {
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  return `https://raw.githubusercontent.com/${owner}/${name}/${encodeURIComponent(branch)}/${encodedPath}`;
}

async function fetchGitHubJson(url) {
  const response = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
  return response.json();
}

async function loadPublicGithubRepo(value) {
  const target = parseGitHubRepo(value);
  if (syncState) syncState.textContent = "Loading repo";

  const repoMeta = await fetchGitHubJson(`https://api.github.com/repos/${target.owner}/${target.name}`);
  const branch = repoMeta.default_branch || "main";
  const treeData = await fetchGitHubJson(`https://api.github.com/repos/${target.owner}/${target.name}/git/trees/${encodeURIComponent(branch)}?recursive=1`);
  const blobs = (treeData.tree || [])
    .filter((item) => item.type === "blob" && item.path?.startsWith("skills/"));

  const byPackage = new Map();
  for (const blob of blobs) {
    const match = blob.path.match(/^skills\/([^/]+)\/(.+)$/);
    if (!match) continue;
    const [, packageName, relativePath] = match;
    if (!byPackage.has(packageName)) byPackage.set(packageName, []);
    byPackage.get(packageName).push({ ...blob, relativePath });
  }

  const nextPackages = [...byPackage.entries()]
    .filter(([, files]) => files.some((file) => file.relativePath === "SKILL.md"))
    .map(([name, files]) => ({
      name,
      files: files
        .sort((a, b) => {
          if (a.relativePath === "SKILL.md") return -1;
          if (b.relativePath === "SKILL.md") return 1;
          return a.path.localeCompare(b.path);
        })
        .map((file) => ({
          path: file.path,
          kind: detectKind(file.path),
          changed: false,
          size: file.size || 0,
          rawUrl: rawGitHubUrl(target.owner, target.name, branch, file.path),
          content: isTextLike(file.path) ? undefined : `[binary file]\n${file.path}\n${file.size || 0} bytes`
        }))
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (nextPackages.length === 0) throw new Error("No skills/<name>/SKILL.md packages found.");

  repo.owner = target.owner;
  repo.name = target.name;
  repo.branch = branch;
  repo.packages = nextPackages;
  deletedPackages = [];
  if (repoContextName) repoContextName.textContent = `${repo.owner}/${repo.name}`;
  if (repoContextBranch) repoContextBranch.textContent = repo.branch;
  openDirs.clear();
  expandPackage(repo.packages[0]);
  await selectFile(repo.packages[0].files.find((file) => file.kind === "entrypoint").path);
  if (syncState) {
    syncState.textContent = treeData.truncated
      ? `Loaded ${nextPackages.length} packages, tree truncated`
      : `Loaded ${nextPackages.length} packages`;
  }
}

function renderDiff() {
  if (!diffTarget) return;
  const rel = selectedFile.path.slice(directoryForPackage(selectedPackage).length + 1);
  const changedFiles = allFiles().filter((file) => file.changed);
  const deletedFiles = deletedPackages.flatMap((pkg) => pkg.files);
  const changeCount = changedFiles.length + deletedFiles.length;
  const deleteOnly = deletedPackages.length > 0 && changedFiles.length === 0;
  const handoffSubject = deleteOnly ? deletedPackages.at(-1).name : selectedPackage.name;
  const handoffBranch = `skilldocs/${handoffSubject}-${deleteOnly ? "delete" : "update"}`;
  const commitMessage = deleteOnly ? `Delete ${handoffSubject} skill` : `Update ${selectedPackage.name} skill`;
  const selectedDiff = selectedFile.changed
    ? `<div class="diff-row"><span class="add">+ browser edit staged for skilldocs/${selectedPackage.name}-update</span></div>`
    : '<div class="diff-row"><span class="context">  no browser edits staged for this file yet</span></div>';
  const deletedDiff = deletedPackages.map((pkg) => (
    `<div class="diff-row"><span class="remove">- deleted skills/${escapeHtml(pkg.name)}/</span></div>`
  )).join("");
  diffTarget.innerHTML = `
    <div class="diff-row"><span class="context"># ${selectedFile.path}</span></div>
    <div class="diff-row"><span class="remove">- previous ${escapeHtml(rel)} from ${repo.branch}</span></div>
    ${selectedDiff}
    ${deletedDiff}
    <div class="diff-row"><span class="context">  CI regenerates skills.json after merge</span></div>
  `;
  if (handoffSummary) {
    handoffSummary.textContent = `${changeCount} changed file${changeCount === 1 ? "" : "s"} · branch ${handoffBranch}`;
  }
  if (handoffCommand) {
    const sourceFlag = repo.owner === "local" ? "" : ` --source ${repo.owner}/${repo.name}`;
    const changedList = changeCount
      ? [
          ...changedFiles.map((file) => `# changed: ${file.path}`),
          ...deletedFiles.map((file) => `# deleted: ${file.path}`)
        ].join("\n")
      : "# No browser edits yet. Create, rename, delete, edit a file, or update metadata before preparing a PR.";
    const deleteCommands = deletedPackages.map((pkg) => `git rm -r skills/${pkg.name}`).join("\n");
    handoffCommand.textContent = [
      changedList,
      `git checkout -b ${handoffBranch}`,
      deleteCommands,
      "npm run skilldocs -- lint --root .",
      `npm run skilldocs -- generate registry --root .${sourceFlag} --out skills.json`,
      "npm run check",
      "git add -A skills skills.json",
      `git commit -m "${commitMessage}"`,
      "git push -u origin HEAD"
    ].filter(Boolean).join("\n");
  }
}

async function selectFile(path) {
  const file = allFiles().find((item) => item.path === path);
  if (!file) return;
  selectedFile = file;
  selectedPackage = packageForFile(file);
  expandToFile(file.path);
  try {
    await ensureFileContent(file);
    const entry = selectedPackage.files.find((item) => item.kind === "entrypoint");
    if (entry && entry !== file) await ensureFileContent(entry);
  } catch (error) {
    file.content = `# Load failed\n\n${error.message}`;
    if (syncState) syncState.textContent = "Load failed";
  }
  if (editor) editor.value = file.content || "";
  if (currentPath) currentPath.textContent = file.path;
  if (currentKind) currentKind.textContent = file.kind;
  renderEditorHighlight();
  renderPreview();
  renderTree();
  renderFields();
  renderChecks();
  renderMetadataChips();
  renderPackageFacts();
  updateInstallCommand();
  updateRegistryPreview();
  renderDiff();
}

function renderEditorHighlight() {
  if (!editorHighlight || !editor) return;
  editorHighlight.innerHTML = highlightCode(editor.value, languageForPath(selectedFile.path));
  editorHighlight.scrollTop = editor.scrollTop;
  editorHighlight.scrollLeft = editor.scrollLeft;
}

function renderPreview() {
  if (!preview) return;
  const content = editor?.value ?? selectedFile.content ?? "";
  if (languageForPath(selectedFile.path) === "markdown") {
    preview.innerHTML = renderMarkdown(content);
  } else {
    preview.innerHTML = `<pre class="code-preview"><code>${highlightCode(content, languageForPath(selectedFile.path))}</code></pre>`;
  }
}

function expandToFile(path) {
  const file = allFiles().find((item) => item.path === path);
  if (file) {
    expandPackage(packageForFile(file));
    return;
  }
  openDirs.add("skills");
}

async function importLocalFolder(fileList) {
  const files = [...fileList];
  const skillEntrypoints = files.filter((file) => file.name === "SKILL.md");
  if (skillEntrypoints.length === 0) {
    if (syncState) syncState.textContent = "No SKILL.md found";
    return;
  }

  const nextPackages = [];
  for (const entryFile of skillEntrypoints) {
    const relative = entryFile.webkitRelativePath || entryFile.name;
    const parts = relative.split("/");
    const skillIndex = parts.lastIndexOf("SKILL.md");
    const packageParts = parts.slice(0, skillIndex);
    const packageName = packageParts.at(-1) || "imported-skill";
    const packageRoot = packageParts.join("/");
    const packageFiles = files.filter((file) => {
      const rel = file.webkitRelativePath || file.name;
      return rel === `${packageRoot}/SKILL.md` || rel.startsWith(`${packageRoot}/`);
    });

    const mappedFiles = [];
    for (const file of packageFiles) {
      const rel = file.webkitRelativePath || file.name;
      const repoPath = rel.startsWith("skills/") ? rel : `skills/${packageName}/${rel.slice(packageRoot.length + 1)}`;
      const text = file.type.startsWith("text/") || /\.(md|txt|json|ya?ml|js|ts|py|html|css)$/i.test(file.name)
        ? await file.text()
        : `[binary file]\n${file.name}\n${file.size} bytes`;
      mappedFiles.push({
        path: repoPath,
        kind: detectKind(repoPath),
        changed: false,
        content: text
      });
    }

    nextPackages.push({ name: packageName, files: mappedFiles });
  }

  repo.packages = nextPackages;
  deletedPackages = [];
  setRepoName("local/imported-skills");
  openDirs.clear();
  expandPackage(repo.packages[0]);
  await selectFile(repo.packages[0].files.find((file) => file.kind === "entrypoint").path);
  closeSettings();
  if (syncState) syncState.textContent = `Imported ${nextPackages.length} package${nextPackages.length > 1 ? "s" : ""}`;
}

async function loadRepoFromInput() {
  const value = repoInput?.value?.trim() || "anthropics/skills";
  try {
    await loadPublicGithubRepo(value);
    closeSettings();
  } catch (error) {
    if (syncState) syncState.textContent = error.message;
  }
}

function slugifySkillName(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueSkillName(base) {
  let name = slugifySkillName(base) || "new-skill";
  let suffix = 1;
  while (repo.packages.some((pkg) => pkg.name === name)) {
    suffix += 1;
    name = `${slugifySkillName(base) || "new-skill"}-${suffix}`;
  }
  return name;
}

function createNewPackage() {
  const name = uniqueSkillName("new-skill");
  deleteArmedFor = null;
  const pkg = {
    name,
    files: [{
      path: `skills/${name}/SKILL.md`,
      kind: "entrypoint",
      changed: true,
      content: `---\nname: ${name}\ndescription: Use this skill when the user needs a clear, repeatable workflow for a specific task.\ncategory: workflow\nversion: 0.1.0\nowner: \nreview_status: draft\n---\n\n# ${name}\n\nUse this skill when the user needs help with...\n\n## Workflow\n\n1. Clarify the user's goal and constraints.\n2. Gather the minimum required context.\n3. Execute the workflow in small, reviewable steps.\n4. Verify the output before responding.\n\n## Notes\n\nAdd references, templates, examples, scripts, or assets as separate files when the skill grows beyond this entrypoint.`
    }]
  };
  repo.packages.push(pkg);
  selectedPackage = pkg;
  expandPackage(pkg);
  void selectFile(pkg.files[0].path);
  closeSettings();
  if (syncState) syncState.textContent = t("crud.created");
}

function renameSelectedPackage(requestedName) {
  if (!selectedPackage) return;
  const rawName = typeof requestedName === "string"
    ? requestedName
    : packageFolderInput?.value || window.prompt(t("crud.renamePrompt"), selectedPackage.name);
  if (rawName === null) return;
  const nextName = slugifySkillName(rawName);
  if (!nextName) {
    window.alert(t("crud.renameInvalid"));
    return;
  }
  if (nextName === selectedPackage.name) return;
  if (repo.packages.some((pkg) => pkg !== selectedPackage && pkg.name === nextName)) {
    window.alert(t("crud.renameExists"));
    return;
  }

  const oldRoot = packageRoot(selectedPackage);
  const nextRoot = `skills/${nextName}`;
  deleteArmedFor = null;
  selectedPackage.name = nextName;
  for (const file of selectedPackage.files) {
    file.path = file.path.replace(`${oldRoot}/`, `${nextRoot}/`);
    file.changed = true;
  }
  const entry = selectedPackage.files.find((file) => file.kind === "entrypoint");
  if (entry) entry.content = setFrontmatterField(entry.content, "name", nextName, true);

  openDirs.clear();
  expandPackage(selectedPackage);
  void selectFile(selectedFile.path);
  if (syncState) syncState.textContent = t("crud.renamed");
}

function deleteSelectedPackage(skipConfirm = false) {
  if (!selectedPackage) return;
  const current = selectedPackage;
  if (!skipConfirm && deleteArmedFor !== current.name) {
    deleteArmedFor = current.name;
    renderPackageActions();
    if (syncState) syncState.textContent = t("crud.deleteConfirm");
    return;
  }

  deleteArmedFor = null;
  const currentIndex = repo.packages.indexOf(current);
  deletedPackages.push({
    name: current.name,
    files: current.files.map((file) => ({ path: file.path }))
  });
  repo.packages = repo.packages.filter((pkg) => pkg !== current);
  openDirs.clear();
  openDirs.add("skills");

  if (repo.packages.length === 0) {
    createNewPackage();
  } else {
    const nextPackage = repo.packages[Math.min(currentIndex, repo.packages.length - 1)];
    selectedPackage = nextPackage;
    const nextFile = nextPackage.files.find((file) => file.kind === "entrypoint") || nextPackage.files[0];
    expandPackage(nextPackage);
    void selectFile(nextFile.path);
  }
  if (syncState) syncState.textContent = t("crud.deleted");
}

function setView(view) {
  viewButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  viewSurfaces.forEach((surface) => surface.classList.toggle("hidden", surface.dataset.viewSurface !== view));
}

function setZenMode(next) {
  zenMode = Boolean(next);
  document.body.classList.toggle("zen-mode", zenMode);
  if (zenToggle) zenToggle.textContent = zenMode ? t("view.exitZen") : t("view.zen");
  if (zenMode) requestAnimationFrame(() => editor?.focus());
}

function applyTheme(theme) {
  currentTheme = theme === "dark" ? "dark" : "light";
  root.dataset.theme = currentTheme;
  if (themeLabel) themeLabel.textContent = currentTheme === "dark" ? "Light" : "Dark";
  const themeIcon = document.querySelector("[data-theme-icon]");
  if (themeIcon) {
    themeIcon.innerHTML = currentTheme === "dark"
      ? '<path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>'
      : '<path d="M21 12.8A8.3 8.3 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8Z"></path>';
  }
  localStorage.setItem("skilldocs-theme", currentTheme);
}

tree?.addEventListener("click", (event) => {
  const dir = event.target.closest("[data-dir]");
  if (dir) {
    const key = dir.dataset.dir;
    const pkg = packageForDirKey(key);
    if (pkg) {
      if (openDirs.has(key)) collapsePackage(pkg);
      else expandPackage(pkg);
    } else if (openDirs.has(key)) {
      [...openDirs].forEach((openKey) => {
        if (openKey === key || openKey.startsWith(`${key}/`)) openDirs.delete(openKey);
      });
    } else {
      openDirs.add(key);
    }
    renderTree();
    return;
  }
  const row = event.target.closest("[data-path]");
  if (row) void selectFile(row.dataset.path);
});

searchInput?.addEventListener("input", renderTree);
filterInputs.forEach((input) => input.addEventListener("change", renderTree));

filterTrigger?.addEventListener("click", () => {
  const open = filterPopover?.classList.toggle("hidden") === false;
  filterTrigger.setAttribute("aria-expanded", open ? "true" : "false");
});

document.addEventListener("click", (event) => {
  if (!filterPopover || !filterTrigger) return;
  if (filterPopover.contains(event.target) || filterTrigger.contains(event.target)) return;
  filterPopover.classList.add("hidden");
  filterTrigger.setAttribute("aria-expanded", "false");
});

settingsToggle?.addEventListener("click", () => {
  const open = settingsPopover?.classList.toggle("hidden") === false;
  settingsToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.addEventListener("click", (event) => {
  if (!settingsPopover || !settingsToggle) return;
  if (settingsPopover.contains(event.target) || settingsToggle.contains(event.target) || importOpenButton?.contains(event.target)) return;
  settingsPopover.classList.add("hidden");
  settingsToggle.setAttribute("aria-expanded", "false");
});

document.querySelector("[data-collapse-all]")?.addEventListener("click", () => {
  openDirs.clear();
  openDirs.add("skills");
  renderTree();
});

document.querySelector("[data-expand-selected]")?.addEventListener("click", () => {
  expandPackage(selectedPackage);
  renderTree();
});

importOpenButton?.addEventListener("click", () => {
  settingsPopover?.classList.remove("hidden");
  settingsToggle?.setAttribute("aria-expanded", "true");
  repoInput?.focus();
});

document.querySelector("[data-import-repo]")?.addEventListener("click", () => void loadRepoFromInput());
document.querySelector("[data-import-folder]")?.addEventListener("click", () => folderInput?.click());
document.querySelectorAll("[data-create-package]").forEach((button) => button.addEventListener("click", createNewPackage));
document.querySelector("[data-rename-package]")?.addEventListener("click", renameSelectedPackage);
document.querySelector("[data-delete-package]")?.addEventListener("click", () => deleteSelectedPackage());
packageFolderInput?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  renameSelectedPackage();
});
folderInput?.addEventListener("change", (event) => void importLocalFolder(event.target.files));

editor?.addEventListener("input", () => {
  selectedFile.content = editor.value;
  selectedFile.changed = true;
  renderEditorHighlight();
  renderPreview();
  if (syncState) syncState.textContent = "Unsaved";
  renderTree();
  renderFields();
  renderChecks();
  renderMetadataChips();
  renderPackageFacts();
  updateRegistryPreview();
  renderDiff();
});

editor?.addEventListener("scroll", renderEditorHighlight);

fieldInputs.forEach((input) => {
  const syncField = () => {
    const entry = selectedPackage.files.find((file) => file.kind === "entrypoint");
    if (!entry) return;
    entry.content = setFrontmatterField(entry.content, input.dataset.field, input.value, input.dataset.required === "true");
    entry.changed = true;
    if (selectedFile === entry && editor) editor.value = entry.content;
    if (syncState) syncState.textContent = "Metadata edited";
    renderTree();
    renderEditorHighlight();
    renderPreview();
    renderChecks();
    renderMetadataChips();
    renderPackageFacts();
    updateRegistryPreview();
    renderDiff();
  };
  input.addEventListener("input", syncField);
  input.addEventListener("change", syncField);
});

viewButtons.forEach((button) => button.addEventListener("click", () => setView(button.dataset.view || "edit")));

zenToggle?.addEventListener("click", () => setZenMode(!zenMode));

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (settingsPopover && !settingsPopover.classList.contains("hidden")) {
    settingsPopover.classList.add("hidden");
    settingsToggle?.setAttribute("aria-expanded", "false");
    return;
  }
  if (zenMode) setZenMode(false);
});

themeButton?.addEventListener("click", () => applyTheme(currentTheme === "dark" ? "light" : "dark"));
localeToggle?.addEventListener("click", () => applyLocale(currentLocale === "zh" ? "en" : "zh"));

settingFont?.addEventListener("change", () => patchEditorSetting("font", settingFont.value));
settingSize?.addEventListener("input", () => patchEditorSetting("size", Number(settingSize.value)));
settingLine?.addEventListener("input", () => patchEditorSetting("lineHeight", Number(settingLine.value)));
settingWrap?.addEventListener("change", () => {
  patchEditorSetting("wrap", settingWrap.checked);
  renderPreview();
});

document.querySelector("[data-settings-reset]")?.addEventListener("click", () => {
  applyEditorSettings({ ...editorSettingsDefaults });
  renderPreview();
});

agentButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedAgent = button.dataset.agent || "codex";
    agentButtons.forEach((item) => item.classList.toggle("active", item === button));
    updateInstallCommand();
    renderMetadataChips();
  });
});

document.querySelector("[data-run-checks]")?.addEventListener("click", () => {
  renderChecks();
  updateRegistryPreview();
  const summary = lintSummary();
  if (syncState) syncState.textContent = `Checked: ${summary.failCount} fail, ${summary.warnCount} warn`;
});

document.querySelector("[data-open-pr]")?.addEventListener("click", () => {
  renderDiff();
  setView("diff");
  const changeCount = allFiles().filter((file) => file.changed).length + deletedPackages.flatMap((pkg) => pkg.files).length;
  if (syncState) syncState.textContent = changeCount ? "Git handoff prepared locally" : "No browser edits yet";
});

document.querySelector("[data-copy-registry]")?.addEventListener("click", async () => {
  const payload = JSON.stringify(generateRegistryPreview(), null, 2);
  try {
    await navigator.clipboard.writeText(payload);
    if (syncState) syncState.textContent = "Registry JSON copied";
  } catch {
    if (syncState) syncState.textContent = "Clipboard unavailable";
  }
});

applyTheme(currentTheme);
applyLocale(currentLocale);
applyEditorSettings(editorSettings);
void selectFile("skills/skill-creator/SKILL.md");
setView(["preview", "diff", "registry"].includes(window.location.hash.slice(1)) ? window.location.hash.slice(1) : "edit");
setZenMode(window.location.hash === "#zen");
if (window.location.hash === "#settings") {
  settingsPopover?.classList.remove("hidden");
  settingsToggle?.setAttribute("aria-expanded", "true");
}
