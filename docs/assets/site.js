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
category: design/ui
topics: frontend, accessibility, visual-design
review_status: candidate
source_type: public_import
source_url: https://github.com/anthropics/skills/tree/main/skills/frontend-design
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
category: governance/skill-authoring
topics: creation, review, package-structure
owner: @platform
review_status: approved
source_type: public_import
source_url: https://github.com/anthropics/skills/tree/main/skills/skill-creator
approved_by: @platform
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
        },
        {
          path: "skills/skill-creator/review-notes/approval.md",
          kind: "evidence",
          changed: false,
          content: "# Approval Notes\n\nReviewed trigger clarity, package scope, scripts, and eval viewer assets before approval."
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
category: documents/pdf
topics: rendering, extraction, layout
review_status: candidate
source_type: manual
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
const installStatus = document.querySelector("[data-install-status]");
const metadataChips = document.querySelector("[data-metadata-chips]");
const reviewGate = document.querySelector("[data-review-gate]");
const approvalSummary = document.querySelector("[data-approval-summary]");
const provenanceFacts = document.querySelector("[data-provenance-facts]");
const evidenceSummary = document.querySelector("[data-evidence-summary]");
const governanceProgress = document.querySelector("[data-governance-progress]");
const dashboard = document.querySelector("[data-dashboard]");
const packageIndex = document.querySelector("[data-package-index]");
const riskSummary = document.querySelector("[data-risk-summary]");
const packageName = document.querySelector("[data-package-name]");
const packageCount = document.querySelector("[data-package-count]");
const packageRisk = document.querySelector("[data-package-risk]");
const syncState = document.querySelector("[data-sync-state]");
const themeButton = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const localeToggle = document.querySelector("[data-locale-toggle]");
const repoContextName = document.querySelector("[data-repo-context-name]");
const repoContextBranch = document.querySelector("[data-repo-context-branch]");
const repoContextMode = document.querySelector("[data-repo-context-mode]");
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
const importOpenButtons = document.querySelectorAll("[data-import-open]");
const settingFont = document.querySelector("[data-setting-font]");
const settingSize = document.querySelector("[data-setting-size]");
const settingSizeValue = document.querySelector("[data-setting-size-value]");
const settingLine = document.querySelector("[data-setting-line]");
const settingLineValue = document.querySelector("[data-setting-line-value]");
const settingWrap = document.querySelector("[data-setting-wrap]");
const packageFolderInput = document.querySelector("[data-package-folder]");
const deletePackageButton = document.querySelector("[data-delete-package]");
const fileActionSummary = document.querySelector("[data-file-action-summary]");
const deleteFileButton = document.querySelector("[data-delete-file]");
const tutorialPanel = document.querySelector("[data-tutorial-panel]");
const tutorialToggle = document.querySelector("[data-tutorial-toggle]");
const tutorialCoachmark = document.querySelector(".tutorial-coachmark");
const tutorialStepsList = document.querySelector("[data-tutorial-steps]");
const tutorialCounter = document.querySelector("[data-tutorial-counter]");
const tutorialTitle = document.querySelector("[data-tutorial-title]");
const tutorialBody = document.querySelector("[data-tutorial-body]");
const tutorialApply = document.querySelector("[data-tutorial-apply]");
const tutorialPrev = document.querySelector("[data-tutorial-prev]");
const tutorialNext = document.querySelector("[data-tutorial-next]");
const tutorialDismiss = document.querySelector("[data-tutorial-dismiss]");

let selectedPackage = repo.packages[1];
let selectedFile = selectedPackage.files[0];
let selectedAgent = "codex";
let currentTheme = localStorage.getItem("skills-charter-theme") || "light";
let currentLocale = localStorage.getItem("skills-charter-locale") || "en";
let zenMode = false;
let tutorialStepIndex = 0;
let deletedPackages = [];
let deletedFiles = [];
let deleteArmedFor = null;
let deleteFileArmedFor = null;
const MIN_DESCRIPTION_LENGTH = 40;
const REGISTRY_SCHEMA = "https://skills-charter.dev/schemas/skills-registry.v0.json";
const DEFAULT_AGENTS = ["codex", "claude-code", "antigravity"];
const REVIEW_STATUSES = ["candidate", "in_review", "approved", "rejected", "deprecated", "retired", "draft", "review"];
const SOURCE_TYPES = ["manual", "public_import", "generated", "evolved", "internal_template"];
const GOVERNED_SOURCE_TYPES = ["public_import", "generated", "evolved"];
const LARGE_ASSET_BYTES = 1024 * 1024;
const TUTORIAL_FINISHED_KEY = "skills-charter-tutorial-finished";
const EXTERNAL_URL_PATTERN = /\bhttps?:\/\/[^\s<>"')]+/gi;
const SECRET_PATTERNS = [
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
  /\bsk-proj-[A-Za-z0-9_-]{20,}\b/,
  /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/,
  /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bAIza[0-9A-Za-z_-]{20,}\b/
];
const SUSPICIOUS_SCRIPT_PATTERNS = [
  /\bcurl\b.+\|\s*(bash|sh|powershell|pwsh)\b/i,
  /\bwget\b.+\|\s*(bash|sh|powershell|pwsh)\b/i,
  /\bInvoke-WebRequest\b.+\|\s*(iex|Invoke-Expression)\b/i,
  /\birm\b.+\|\s*iex\b/i,
  /\brm\s+-rf\s+[/~$]/i,
  /\bdel\s+\/[sq]\b/i,
  /\bpowershell\b.+-(enc|encodedcommand)\b/i,
  /\b(base64|FromBase64String)\b/i
];
const DEPENDENCY_FILE_PATTERN = /(^|\/)(package-lock\.json|package\.json|requirements(-lock)?\.txt|requirements\.lock|pyproject\.toml|poetry\.lock|uv\.lock|pnpm-lock\.yaml|yarn\.lock|Cargo\.toml|go\.mod)$/i;
const openDirs = new Set(["skills", "skills/skill-creator", "skills/skill-creator/references", "skills/skill-creator/scripts", "skills/skill-creator/assets", "skills/skill-creator/agents", "skills/skill-creator/eval-viewer"]);
const PACKAGE_ROLE_DEFS = [
  { id: "entrypoint", labelKey: "role.entrypoint", descriptionKey: "role.entrypoint.description" },
  { id: "references", labelKey: "role.references", descriptionKey: "role.references.description" },
  { id: "templates", labelKey: "role.templates", descriptionKey: "role.templates.description" },
  { id: "examples", labelKey: "role.examples", descriptionKey: "role.examples.description" },
  { id: "scripts", labelKey: "role.scripts", descriptionKey: "role.scripts.description" },
  { id: "assets", labelKey: "role.assets", descriptionKey: "role.assets.description" },
  { id: "evidence", labelKey: "role.evidence", descriptionKey: "role.evidence.description" },
  { id: "supporting", labelKey: "role.supporting", descriptionKey: "role.supporting.description" }
];
const GOVERNANCE_GRAPH_STEPS = [
  { id: "candidate", labelKey: "graph.candidate" },
  { id: "source", labelKey: "graph.source" },
  { id: "review", labelKey: "graph.review" },
  { id: "approval", labelKey: "graph.approval" },
  { id: "registry", labelKey: "graph.registry" },
  { id: "install", labelKey: "graph.install" }
];
const FILE_TEMPLATES = {
  reference: {
    dir: "references",
    name: "notes.md",
    content: (pkg) => `# ${pkg.name} Reference Notes\n\nCapture durable background, policies, links, constraints, or domain notes that the entrypoint should not carry inline.\n`
  },
  template: {
    dir: "templates",
    name: "output-template.md",
    content: (pkg) => `# ${pkg.name} Output Template\n\n## Inputs\n\n- \n\n## Expected Output\n\nUse this template when the skill needs a repeatable structure.\n`
  },
  example: {
    dir: "examples",
    name: "sample-prompt.md",
    content: (pkg) => `# ${pkg.name} Example\n\n## Prompt\n\n\n## Expected Behavior\n\n\n## Notes\n\n`
  },
  script: {
    dir: "scripts",
    name: "helper.py",
    content: () => `"""Helper script for this skill.\n\nReview this script before approving the package.\n"""\n\n\ndef main() -> None:\n    print("hello from skill helper")\n\n\nif __name__ == "__main__":\n    main()\n`
  },
  asset: {
    dir: "assets",
    name: "asset-notes.md",
    content: (pkg) => `# ${pkg.name} Asset Notes\n\nTrack asset provenance, license, size, and expected use here before adding binary files.\n`
  },
  evidence: {
    dir: "review-notes",
    name: "approval.md",
    content: (pkg) => `# Approval Notes: ${pkg.name}\n\nOwner:\nReviewer:\nDecision: candidate\n\n## Evidence Reviewed\n\n- \n\n## Risk Decision\n\nExplain scripts, external URLs, assets, dependencies, and trigger behavior before approval.\n`
  }
};
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
const TUTORIAL_STEPS = [
  {
    id: "import",
    target: "[data-import-open]",
    titleKey: "tutorial.step.import.title",
    bodyKey: "tutorial.step.import.body",
    ctaKey: "tutorial.step.import.cta"
  },
  {
    id: "select",
    target: ".tree-panel",
    titleKey: "tutorial.step.select.title",
    bodyKey: "tutorial.step.select.body",
    ctaKey: "tutorial.step.select.cta"
  },
  {
    id: "candidate",
    target: "[data-inspector-section='metadata']",
    titleKey: "tutorial.step.candidate.title",
    bodyKey: "tutorial.step.candidate.body",
    ctaKey: "tutorial.step.candidate.cta"
  },
  {
    id: "checks",
    target: "[data-inspector-section='review-gate']",
    titleKey: "tutorial.step.checks.title",
    bodyKey: "tutorial.step.checks.body",
    ctaKey: "tutorial.step.checks.cta"
  },
  {
    id: "evidence",
    target: "[data-inspector-section='evidence']",
    titleKey: "tutorial.step.evidence.title",
    bodyKey: "tutorial.step.evidence.body",
    ctaKey: "tutorial.step.evidence.cta"
  },
  {
    id: "approve",
    target: "[data-inspector-section='install']",
    titleKey: "tutorial.step.approve.title",
    bodyKey: "tutorial.step.approve.body",
    ctaKey: "tutorial.step.approve.cta"
  }
];
const localeCopy = {
  en: {
    "brand.subtitle": "Governance manager",
    "context.aria": "Workspace context",
    "context.repo": "Repo",
    "context.branch": "Branch",
    "context.registry": "Registry",
    "actions.aria": "Workspace actions",
    "actions.utilities": "Utilities",
    "status.clean": "No local edits",
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
    "action.tutorial": "Tutorial",
    "action.scenario": "Scenario",
    "action.manifesto": "Manifesto",
    "tutorial.aria": "Guided demo tutorial",
    "tutorial.stepsAria": "Tutorial steps",
    "tutorial.label": "Guided demo",
    "tutorial.title": "Public skill intake review",
    "tutorial.body": "Walk through how a team turns Anthropic's public skill-creator into an approved internal skill without making public install the governance model.",
    "tutorial.prev": "Back",
    "tutorial.next": "Next",
    "tutorial.hide": "Hide",
    "tutorial.finish": "Finish",
    "tutorial.show": "Show tutorial",
    "tutorial.stepCounter": "Step {current} of {total}",
    "tutorial.step.import.title": "Import public repo",
    "tutorial.step.import.body": "Load anthropics/skills. Public discovery stays fast; approval stays in Git.",
    "tutorial.step.import.cta": "Load anthropics/skills",
    "tutorial.step.select.title": "Select skill-creator",
    "tutorial.step.select.body": "Open the package the research team wants to internalize.",
    "tutorial.step.select.cta": "Open skill-creator",
    "tutorial.step.candidate.title": "Mark as candidate",
    "tutorial.step.candidate.body": "Record owner, source type, and provenance before team install is allowed.",
    "tutorial.step.candidate.cta": "Write intake metadata",
    "tutorial.step.checks.title": "Run review checks",
    "tutorial.step.checks.body": "Warnings become review work: scripts, URLs, assets, and evidence gaps.",
    "tutorial.step.checks.cta": "Run checks",
    "tutorial.step.evidence.title": "Attach evidence",
    "tutorial.step.evidence.body": "Add a Git-tracked review note that explains why approval is justified.",
    "tutorial.step.evidence.cta": "Add evidence note",
    "tutorial.step.approve.title": "Approve install",
    "tutorial.step.approve.body": "Promote only after review evidence exists. Click Finish to close; use the top Tutorial button to replay this walkthrough.",
    "tutorial.step.approve.cta": "Promote to approved",
    "research.aria": "Research signals",
    "research.lifecycle.label": "Survey signal",
    "research.lifecycle.title": "Skills now have a lifecycle.",
    "research.lifecycle.body": "Recent research frames skills around representation, acquisition, retrieval, and evolution. Skills Charter focuses the human governance layer.",
    "research.lifecycle.link": "arXiv survey",
    "research.competition.label": "Adjacent systems",
    "research.competition.title": "Search, routing, and orchestration are crowded.",
    "research.competition.body": "SkillNet, AgentSkillOS, and SkillRouter point toward marketplaces, graphs, DAG execution, and hosted routing.",
    "research.wedge.label": "Skills Charter wedge",
    "research.wedge.title": "Teams still need a trusted source of truth.",
    "research.wedge.body": "Before an agent installs a skill, people need owners, diffs, lint, provenance, CI, review status, and rollback.",
    "research.wedge.link": "Open the manager",
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
    "view.dashboard": "Dashboard",
    "view.package": "Package",
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
    "inspector.files": "Files",
    "inspector.metadataHint": "These fields are a form view of the selected package's `SKILL.md` frontmatter. Editing here rewrites the Markdown frontmatter; editing `SKILL.md` updates this panel.",
    "inspector.labelsHint": "Generated from frontmatter, file type, and package scan. Future versions can write selected labels back to metadata.",
    "inspector.lintHint": "Risk is derived from this lint list: failures make it high, warnings make it medium, and a clean package is low. CI is the final gate before merge.",
    "packageIndex.label": "Skill charter",
    "packageIndex.title": "Package index",
    "packageIndex.files": "files",
    "packageIndex.packages": "包",
    "packageIndex.changed": "changed",
    "packageIndex.evidence": "evidence",
    "packageIndex.scripts": "scripts",
    "packageIndex.installAllowed": "Install allowed",
    "packageIndex.installBlocked": "Install blocked",
    "packageIndex.blockers": "Blockers",
    "packageIndex.warnings": "Review notes",
    "packageIndex.roles": "Package roles",
    "packageIndex.emptyRole": "No files yet",
    "packageIndex.structure": "Package structure",
    "packageIndex.graph": "Governance graph",
    "packageIndex.library": "Library categories",
    "packageIndex.category": "Category",
    "packageIndex.uncategorized": "uncategorized",
    "packageIndex.noTopics": "no topics",
    "packageIndex.selected": "selected",
    "role.entrypoint": "Entrypoint",
    "role.entrypoint.description": "Manifest, routing, and primary instructions.",
    "role.references": "References",
    "role.references.description": "Durable background docs, policies, and guides.",
    "role.templates": "Templates",
    "role.templates.description": "Reusable input and output shapes.",
    "role.examples": "Examples",
    "role.examples.description": "Sample prompts, outputs, and expected formats.",
    "role.scripts": "Scripts",
    "role.scripts.description": "Executable helpers that need extra review.",
    "role.assets": "Assets",
    "role.assets.description": "Images, PDFs, fixtures, and binary-like files.",
    "role.evidence": "Evidence",
    "role.evidence.description": "Review notes, evals, reports, and trigger samples.",
    "role.supporting": "Supporting",
    "role.supporting.description": "Other package files that support the entrypoint.",
    "approval.allowed": "Install allowed: this package is approved and passes the policy gate.",
    "approval.blocked": "Install blocked",
    "graph.candidate": "Candidate",
    "graph.source": "Source",
    "graph.review": "Review",
    "graph.approval": "Approval",
    "graph.registry": "Registry",
    "graph.install": "Install",
    "file.addReference": "Reference",
    "file.addTemplate": "Template",
    "file.addExample": "Example",
    "file.addScript": "Script",
    "file.addAsset": "Asset note",
    "file.addEvidence": "Evidence",
    "file.rename": "Rename file",
    "file.delete": "Delete file",
    "file.confirmDelete": "Confirm delete",
    "file.renamePrompt": "Rename file within this skill package",
    "file.renameInvalid": "Use a safe relative path inside this skill package.",
    "file.renameExists": "A file already exists at that path.",
    "file.entrypointLocked": "SKILL.md is the required entrypoint. Rename the skill package instead.",
    "file.deleteConfirm": "Confirm to delete this file from the browser workspace.",
    "file.created": "File created",
    "file.renamed": "File renamed",
    "file.deleted": "File deleted",
    "file.hint": "Add supporting files as Git-tracked package material. SKILL.md remains the entrypoint; rename the package to move it.",
    "field.name": "name",
    "field.description": "description",
    "field.category": "category",
    "field.topics": "topics",
    "field.version": "version",
    "field.owner": "owner",
    "field.reviewStatus": "review status",
    "field.required": "required",
    "field.optional": "optional",
    "field.unset": "Unset",
    "field.categoryPlaceholder": "Writing, coding, research...",
    "field.topicsPlaceholder": "review, security, docs...",
    "field.ownerPlaceholder": "@team or maintainer",
    "install.target": "Install target",
    "install.hint": "Discovery stays non-mutating; install writes the package into the selected agent target.",
    "dashboard.label": "Governance overview",
    "dashboard.title": "Git-backed skill governance",
    "dashboard.body": "Use Git as the source of truth: import candidates, review provenance and evidence, approve through PRs, then expose install commands from the generated registry.",
    "dashboard.total": "Total skills",
    "dashboard.installable": "Installable",
    "dashboard.reviewQueue": "Review queue",
    "dashboard.highRisk": "High risk",
    "dashboard.missingOwner": "Missing owner",
    "dashboard.missingEvidence": "Missing evidence",
    "dashboard.changed": "Changed files",
    "dashboard.registryReady": "Registry ready",
    "dashboard.pipeline": "Governance loop",
    "dashboard.queue": "Review queue",
    "dashboard.queueEmpty": "No packages are waiting for review.",
    "dashboard.package": "Package",
    "dashboard.owner": "Owner",
    "dashboard.status": "Status",
    "dashboard.blocker": "Next blocker",
    "dashboard.open": "Open",
    "dashboard.registry": "Approved registry",
    "dashboard.registryBody": "Only approved packages that pass policy expose install commands. Candidate and blocked packages stay visible for review but do not become installable runtime assets.",
    "dashboard.gitBackend": "Git is the backend",
    "dashboard.gitBackendBody": "Commits, pull requests, CI checks, generated registry output, and tags carry the durable governance state. The Pages manager is a static working surface over that repo.",
    "dashboard.intake": "Intake sources",
    "dashboard.publicImport": "Public import",
    "dashboard.localFolder": "Local folder",
    "dashboard.newSkill": "New skill",
    "dashboard.publicImportBody": "Start as candidate and require provenance plus evidence.",
    "dashboard.localFolderBody": "Review private skills before team-wide install.",
    "dashboard.newSkillBody": "Create from a governed template with required metadata.",
    "dashboard.readyCommand": "List approved skills",
    "dashboard.selected": "Selected package"
  },
  zh: {
    "brand.subtitle": "治理管理器",
    "context.aria": "工作区上下文",
    "context.repo": "仓库",
    "context.branch": "分支",
    "context.registry": "注册表",
    "actions.aria": "工作区操作",
    "actions.utilities": "全局工具",
    "status.clean": "无本地改动",
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
    "action.tutorial": "教程",
    "action.scenario": "场景",
    "action.manifesto": "理念",
    "tutorial.aria": "引导式 demo 教程",
    "tutorial.stepsAria": "教程步骤",
    "tutorial.label": "引导式 demo",
    "tutorial.title": "公开 Skill 引入审阅",
    "tutorial.body": "跟着走一遍：团队如何把 Anthropic 公开的 skill-creator 变成已批准的内部 skill，而不是把公开安装当成治理模型。",
    "tutorial.prev": "上一步",
    "tutorial.next": "下一步",
    "tutorial.hide": "隐藏",
    "tutorial.finish": "完成",
    "tutorial.show": "显示教程",
    "tutorial.stepCounter": "第 {current} / {total} 步",
    "tutorial.step.import.title": "导入公开仓库",
    "tutorial.step.import.body": "加载 anthropics/skills。公开发现保持快速，团队批准仍然留在 Git 里。",
    "tutorial.step.import.cta": "加载 anthropics/skills",
    "tutorial.step.select.title": "选中 skill-creator",
    "tutorial.step.select.body": "打开研究团队想内化到内部流程里的 package。",
    "tutorial.step.select.cta": "打开 skill-creator",
    "tutorial.step.candidate.title": "标记为候选",
    "tutorial.step.candidate.body": "在允许团队安装前，先记录 owner、来源类型和 provenance。",
    "tutorial.step.candidate.cta": "写入引入元数据",
    "tutorial.step.checks.title": "运行审阅检查",
    "tutorial.step.checks.body": "warning 不是判决，而是 Git 里的审阅任务：scripts、URLs、assets、evidence gaps。",
    "tutorial.step.checks.cta": "运行检查",
    "tutorial.step.evidence.title": "附加证据",
    "tutorial.step.evidence.body": "新增一份 Git-tracked review note，说明为什么可以批准。",
    "tutorial.step.evidence.cta": "添加 evidence note",
    "tutorial.step.approve.title": "批准安装",
    "tutorial.step.approve.body": "只有 review evidence 存在后才提升为 approved。点完成关闭引导；之后可以点顶部 Tutorial 按钮重新查看。",
    "tutorial.step.approve.cta": "提升为 approved",
    "research.aria": "调研信号",
    "research.lifecycle.label": "论文信号",
    "research.lifecycle.title": "Skills 已经进入生命周期问题。",
    "research.lifecycle.body": "最新综述把 skills 拆成表示、获取、检索和演化四个阶段。Skills Charter 聚焦其中的人为治理层。",
    "research.lifecycle.link": "arXiv 综述",
    "research.competition.label": "相邻系统",
    "research.competition.title": "搜索、路由和编排已经很拥挤。",
    "research.competition.body": "SkillNet、AgentSkillOS 和 SkillRouter 指向 marketplace、关系图、DAG 执行和托管路由。",
    "research.wedge.label": "Skills Charter 切入点",
    "research.wedge.title": "团队仍然需要可信源。",
    "research.wedge.body": "在 agent 安装 skill 之前，人需要责任人、diff、lint、来源追踪、CI、审查状态和回滚。",
    "research.wedge.link": "打开管理器",
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
    "view.dashboard": "总览",
    "view.package": "包视图",
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
    "inspector.files": "文件",
    "inspector.metadataHint": "这些字段是所选包 `SKILL.md` frontmatter 的表单视图。在这里编辑会重写 Markdown frontmatter；直接编辑 `SKILL.md` 也会更新此面板。",
    "inspector.labelsHint": "由 frontmatter、文件类型和包扫描结果生成。后续版本可以把选中的标签写回元数据。",
    "inspector.lintHint": "风险来自 lint 列表：失败为高风险，警告为中风险，无问题为低风险。CI 是合并前的最终门禁。",
    "packageIndex.label": "Skill Charter",
    "packageIndex.title": "包索引",
    "packageIndex.files": "文件",
    "packageIndex.packages": "packages",
    "packageIndex.changed": "已改动",
    "packageIndex.evidence": "证据",
    "packageIndex.scripts": "脚本",
    "packageIndex.installAllowed": "允许安装",
    "packageIndex.installBlocked": "安装被阻止",
    "packageIndex.blockers": "阻塞项",
    "packageIndex.warnings": "审阅提示",
    "packageIndex.roles": "包角色",
    "packageIndex.emptyRole": "暂无文件",
    "packageIndex.structure": "包结构",
    "packageIndex.graph": "治理图",
    "packageIndex.library": "库分类",
    "packageIndex.category": "分类",
    "packageIndex.uncategorized": "未分类",
    "packageIndex.noTopics": "无 topics",
    "packageIndex.selected": "已选中",
    "role.entrypoint": "入口",
    "role.entrypoint.description": "Manifest、路由和主要指令。",
    "role.references": "参考资料",
    "role.references.description": "长期背景文档、政策和指南。",
    "role.templates": "模板",
    "role.templates.description": "可复用的输入和输出结构。",
    "role.examples": "示例",
    "role.examples.description": "样例 prompt、输出和期望格式。",
    "role.scripts": "脚本",
    "role.scripts.description": "可执行 helper，需要额外审阅。",
    "role.assets": "资产",
    "role.assets.description": "图片、PDF、fixtures 和类二进制文件。",
    "role.evidence": "证据",
    "role.evidence.description": "review notes、evals、reports 和 trigger samples。",
    "role.supporting": "支持文件",
    "role.supporting.description": "其他支持入口文件的包内文件。",
    "approval.allowed": "允许安装：这个 package 已批准并通过 policy gate。",
    "approval.blocked": "安装被阻止",
    "graph.candidate": "候选",
    "graph.source": "来源",
    "graph.review": "审阅",
    "graph.approval": "批准",
    "graph.registry": "注册表",
    "graph.install": "安装",
    "file.addReference": "参考",
    "file.addTemplate": "模板",
    "file.addExample": "示例",
    "file.addScript": "脚本",
    "file.addAsset": "资产说明",
    "file.addEvidence": "证据",
    "file.rename": "重命名文件",
    "file.delete": "删除文件",
    "file.confirmDelete": "确认删除",
    "file.renamePrompt": "在当前 skill 包内重命名文件",
    "file.renameInvalid": "请输入当前 skill 包内的安全相对路径。",
    "file.renameExists": "这个路径已经有文件了。",
    "file.entrypointLocked": "SKILL.md 是必需入口文件。如需移动它，请重命名 skill 包。",
    "file.deleteConfirm": "再次确认会从浏览器工作区删除这个文件。",
    "file.created": "已新建文件",
    "file.renamed": "已重命名文件",
    "file.deleted": "已删除文件",
    "file.hint": "把支持材料作为 Git-tracked package 文件加入。SKILL.md 保持为入口；需要移动时重命名 package。",
    "field.name": "name",
    "field.description": "description",
    "field.category": "category",
    "field.topics": "topics",
    "field.version": "version",
    "field.owner": "owner",
    "field.reviewStatus": "review status",
    "field.required": "必填",
    "field.optional": "可选",
    "field.unset": "未设置",
    "field.categoryPlaceholder": "Writing、coding、research...",
    "field.topicsPlaceholder": "review、security、docs...",
    "field.ownerPlaceholder": "@team 或维护者",
    "install.target": "安装目标",
    "install.hint": "发现命令不会写入文件；安装命令会把包写入选中的 agent 目标目录。",
    "dashboard.label": "治理总览",
    "dashboard.title": "以 Git 为基石的 Skills 治理",
    "dashboard.body": "把 Git 当作事实来源：导入候选 skill，审阅来源和证据，通过 PR 批准，再从生成的 registry 暴露安装命令。",
    "dashboard.total": "Skills 总数",
    "dashboard.installable": "可安装",
    "dashboard.reviewQueue": "待审查",
    "dashboard.highRisk": "高风险",
    "dashboard.missingOwner": "缺 owner",
    "dashboard.missingEvidence": "缺证据",
    "dashboard.changed": "已改文件",
    "dashboard.registryReady": "Registry 就绪",
    "dashboard.pipeline": "治理闭环",
    "dashboard.queue": "审查队列",
    "dashboard.queueEmpty": "当前没有待审查的 package。",
    "dashboard.package": "Package",
    "dashboard.owner": "Owner",
    "dashboard.status": "状态",
    "dashboard.blocker": "下一阻塞项",
    "dashboard.open": "打开",
    "dashboard.registry": "已批准 Registry",
    "dashboard.registryBody": "只有 approved 且通过 policy 的 package 才暴露安装命令。候选和阻塞的 package 仍可见，但不会变成可安装的运行资产。",
    "dashboard.gitBackend": "Git 就是后端",
    "dashboard.gitBackendBody": "Commit、PR、CI 检查、生成的 registry 和 tag 承载持久治理状态。Pages manager 只是这个 repo 上方的静态工作台。",
    "dashboard.intake": "输入来源",
    "dashboard.publicImport": "公开导入",
    "dashboard.localFolder": "本地文件夹",
    "dashboard.newSkill": "新建 skill",
    "dashboard.publicImportBody": "先成为 candidate，再要求 provenance 和 evidence。",
    "dashboard.localFolderBody": "把个人私有 skills 审阅后再团队安装。",
    "dashboard.newSkillBody": "从带必填元数据的治理模板开始。",
    "dashboard.readyCommand": "列出已批准 skills",
    "dashboard.selected": "当前选中"
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

function tutorialCounterText() {
  return t("tutorial.stepCounter")
    .replace("{current}", String(tutorialStepIndex + 1))
    .replace("{total}", String(TUTORIAL_STEPS.length));
}

function setTutorialPanelVisible(visible) {
  tutorialPanel?.classList.toggle("hidden", !visible);
  tutorialToggle?.setAttribute("aria-expanded", visible ? "true" : "false");
  document.body.classList.toggle("tutorial-mode", Boolean(visible));
  if (visible) renderTutorial();
  if (!visible) clearTutorialHighlights();
}

function clearTutorialHighlights() {
  document.querySelectorAll(".tutorial-highlight").forEach((node) => node.classList.remove("tutorial-highlight"));
  if (tutorialCoachmark) {
    tutorialCoachmark.style.left = "";
    tutorialCoachmark.style.top = "";
    tutorialCoachmark.style.right = "";
    tutorialCoachmark.style.bottom = "";
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function positionTutorialCoachmark(target) {
  if (!tutorialCoachmark || !target) return;
  const gap = 14;
  const margin = 16;
  tutorialCoachmark.style.right = "auto";
  tutorialCoachmark.style.bottom = "auto";
  tutorialCoachmark.style.left = `${margin}px`;
  tutorialCoachmark.style.top = `${margin}px`;

  const rect = target.getBoundingClientRect();
  const coachRect = tutorialCoachmark.getBoundingClientRect();
  const width = coachRect.width;
  const height = coachRect.height;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const maxLeft = Math.max(margin, viewportWidth - width - margin);
  const maxTop = Math.max(margin, viewportHeight - height - margin);

  let left;
  let top;

  if (rect.right + gap + width <= viewportWidth - margin) {
    left = rect.right + gap;
    top = clamp(rect.top, margin, maxTop);
  } else if (rect.left - gap - width >= margin) {
    left = rect.left - gap - width;
    top = clamp(rect.top, margin, maxTop);
  } else if (rect.bottom + gap + height <= viewportHeight - margin) {
    left = clamp(rect.left, margin, maxLeft);
    top = rect.bottom + gap;
  } else if (rect.top - gap - height >= margin) {
    left = clamp(rect.left, margin, maxLeft);
    top = rect.top - gap - height;
  } else {
    left = maxLeft;
    top = maxTop;
  }

  tutorialCoachmark.style.left = `${left}px`;
  tutorialCoachmark.style.top = `${top}px`;
}

function highlightTutorialTarget(selector) {
  clearTutorialHighlights();
  if (!selector) return;
  const target = document.querySelector(selector);
  if (!target || target.classList.contains("hidden")) return;
  target.classList.add("tutorial-highlight");
  target.scrollIntoView({ block: "center", inline: "nearest", behavior: "auto" });
  positionTutorialCoachmark(target);
}

function renderTutorial() {
  if (!tutorialPanel || !tutorialStepsList) return;
  const step = TUTORIAL_STEPS[tutorialStepIndex];
  const focusedInspector = {
    candidate: "metadata",
    checks: "review-gate",
    evidence: "evidence",
    approve: "install"
  }[step.id];
  if (focusedInspector) focusInspectorSection(focusedInspector);
  tutorialStepsList.innerHTML = TUTORIAL_STEPS.map((item, index) => {
    const state = index === tutorialStepIndex ? " active" : index < tutorialStepIndex ? " done" : "";
    const label = `${index + 1}. ${t(item.titleKey)}. ${t(item.bodyKey)}`;
    return `
      <li>
        <button type="button" class="tutorial-step-button${state}" data-tutorial-step="${index}" aria-label="${escapeHtml(label)}">
          <span class="tutorial-step-index">${index + 1}</span>
          <span class="tutorial-step-copy">
            <strong>${escapeHtml(t(item.titleKey))}</strong>
            <span>${escapeHtml(t(item.bodyKey))}</span>
          </span>
        </button>
      </li>
    `;
  }).join("");
  tutorialStepsList.querySelectorAll("[data-tutorial-step]").forEach((button) => {
    button.addEventListener("click", () => setTutorialStep(Number(button.dataset.tutorialStep)));
  });
  if (tutorialCounter) tutorialCounter.textContent = tutorialCounterText();
  if (tutorialTitle) tutorialTitle.textContent = t(step.titleKey);
  if (tutorialBody) tutorialBody.textContent = t(step.bodyKey);
  if (tutorialApply) tutorialApply.textContent = tutorialStepIndex === TUTORIAL_STEPS.length - 1 ? t("tutorial.finish") : t(step.ctaKey);
  if (tutorialPrev) tutorialPrev.disabled = tutorialStepIndex === 0;
  if (tutorialNext) {
    tutorialNext.hidden = tutorialStepIndex === TUTORIAL_STEPS.length - 1;
    tutorialNext.disabled = tutorialStepIndex === TUTORIAL_STEPS.length - 1;
  }
  highlightTutorialTarget(step.target);
}

function setTutorialStep(index) {
  tutorialStepIndex = Math.max(0, Math.min(TUTORIAL_STEPS.length - 1, index));
  setTutorialPanelVisible(true);
  renderTutorial();
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
  if (syncState && ["Clean", "干净", "No local edits", "无本地改动"].includes(syncState.textContent || "")) {
    syncState.textContent = t("status.clean");
  }
  if (zenToggle) zenToggle.textContent = zenMode ? t("view.exitZen") : t("view.zen");
  if (selectedPackage) {
    renderPackageActions();
    renderFileActions();
    renderReviewGate();
    renderPackageIndex();
    updateInstallCommand();
  }
  if (tutorialPanel && !tutorialPanel.classList.contains("hidden")) renderTutorial();
  localStorage.setItem("skills-charter-locale", currentLocale);
}

function loadEditorSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem("skills-charter-editor-settings") || "{}");
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
  localStorage.setItem("skills-charter-editor-settings", JSON.stringify(editorSettings));
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
  if (path.includes("/evals/") || path.includes("/reports/") || path.includes("/review-notes/") || path.includes("/trigger-samples/")) return "evidence";
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
  if (file.kind === "evidence") return filterMap.evidence ?? filterMap.supporting;
  if (file.kind === "asset") return filterMap.supporting;
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

function normalizeReviewStatus(value) {
  if (value === "draft") return "candidate";
  if (value === "review") return "in_review";
  return REVIEW_STATUSES.includes(value) ? value : "candidate";
}

function evidencePaths(pkg) {
  const paths = pkg.files.map((file) => file.path);
  return {
    evals: paths.filter((path) => path.includes("/evals/")),
    reports: paths.filter((path) => path.includes("/reports/")),
    review_notes: paths.filter((path) => path.includes("/review-notes/")),
    trigger_samples: paths.filter((path) => path.includes("/trigger-samples/"))
  };
}

function hasEvidence(pkg) {
  return Object.values(evidencePaths(pkg)).some((paths) => paths.length > 0);
}

function evidenceCountForPackage(pkg) {
  return Object.values(evidencePaths(pkg)).reduce((total, paths) => total + paths.length, 0);
}

function roleForFile(file) {
  if (file.kind === "entrypoint") return "entrypoint";
  if (file.kind === "evidence") return "evidence";
  if (file.kind === "script") return "scripts";
  if (file.kind === "asset") return "assets";
  if (file.path.includes("/references/")) return "references";
  if (file.path.includes("/templates/")) return "templates";
  if (file.path.includes("/examples/")) return "examples";
  return "supporting";
}

function relativePathForFile(pkg, file) {
  const rootPath = `${packageRoot(pkg)}/`;
  return file.path.startsWith(rootPath) ? file.path.slice(rootPath.length) : file.path;
}

function sortPackageFiles(pkg) {
  pkg.files.sort((a, b) => {
    if (a.path.endsWith("/SKILL.md")) return -1;
    if (b.path.endsWith("/SKILL.md")) return 1;
    return a.path.localeCompare(b.path);
  });
}

function approvalDecision(pkg) {
  const entry = pkg.files.find((file) => file.kind === "entrypoint");
  const fm = entry ? getFrontmatter(entry.content) : {};
  const lint = lintPackage(pkg);
  const lifecycle = normalizeReviewStatus(fm.review_status);
  const sourceType = fm.source_type || "";
  const governedSource = GOVERNED_SOURCE_TYPES.includes(sourceType);
  const evidenceCount = evidenceCountForPackage(pkg);
  const hasProvenance = Boolean(fm.source_url || fm.source_commit || fm.upstream || fm.generator);
  const blockers = [];
  const warnings = [];

  if (lifecycle !== "approved") blockers.push(`Review status is ${lifecycle}; promote to approved in Git before install.`);
  if (!fm.owner?.trim()) blockers.push("Owner is missing.");
  if (lint.risk === "high") blockers.push("High-risk lint findings must be resolved.");
  if (governedSource && !hasProvenance) blockers.push("Public, generated, and evolved skills need provenance.");
  if (governedSource && evidenceCount === 0) blockers.push("Public, generated, and evolved skills need review evidence.");

  const scripts = pkg.files.filter((file) => file.kind === "script").length;
  const reviewNotes = evidencePaths(pkg).review_notes.length;
  if (scripts > 0 && reviewNotes === 0) warnings.push(`${scripts} script file${scripts === 1 ? "" : "s"} should have review notes.`);
  if (lint.risk === "medium") warnings.push("Medium-risk lint findings should be discussed in PR review.");
  if (!fm.approved_by?.trim() && lifecycle === "approved") warnings.push("Approved packages should record approved_by.");

  return {
    installable: blockers.length === 0,
    blockers,
    warnings,
    lint,
    lifecycle,
    sourceType: sourceType || "unspecified",
    owner: fm.owner || "",
    evidenceCount,
    governedSource,
    hasProvenance
  };
}

function isInstallablePackage(pkg) {
  return approvalDecision(pkg).installable;
}

function lintPackage(pkg) {
  const entry = pkg.files.find((item) => item.kind === "entrypoint");
  const rootPath = packageRoot(pkg);
  const fm = entry ? getFrontmatter(entry.content) : {};
  const issues = [];
  const lifecycle = normalizeReviewStatus(fm.review_status);
  const sourceType = fm.source_type;

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

  if (fm.review_status && !REVIEW_STATUSES.includes(fm.review_status)) {
    issues.push(issue("frontmatter.review-status.unknown", "warning", entry?.path || `${rootPath}/SKILL.md`, `Review status "${fm.review_status}" is not a known lifecycle value.`));
  }

  if (sourceType && !SOURCE_TYPES.includes(sourceType)) {
    issues.push(issue("frontmatter.source-type.unknown", "warning", entry?.path || `${rootPath}/SKILL.md`, `Source type "${sourceType}" is not one of manual, public_import, generated, evolved, or internal_template.`));
  }

  if (lifecycle === "approved" && !fm.owner?.trim()) {
    issues.push(issue("approval.owner-required", "error", entry?.path || `${rootPath}/SKILL.md`, "Approved packages must declare an owner."));
  }

  if (lifecycle === "approved" && GOVERNED_SOURCE_TYPES.includes(sourceType || "") && !hasEvidence(pkg)) {
    issues.push(issue("approval.evidence-recommended", "warning", entry?.path || `${rootPath}/SKILL.md`, "Approved public, generated, or evolved packages should include evals, reports, review-notes, or trigger-samples evidence."));
  }

  if (GOVERNED_SOURCE_TYPES.includes(sourceType || "") && !fm.source_url?.trim() && !fm.upstream?.trim() && !fm.generator?.trim()) {
    issues.push(issue("provenance.source-required", "warning", entry?.path || `${rootPath}/SKILL.md`, "Imported, generated, or evolved packages should declare source_url, upstream, or generator provenance."));
  }

  for (const file of pkg.files) {
    if (!file.path.startsWith(`${rootPath}/`)) {
      issues.push(issue("package.boundary", "error", file.path, "Package file is outside its skill root."));
    }
    if (file.kind === "script") {
      issues.push(issue("script.review-required", "warning", file.path, "Scripts require human review before approval."));
      if (file.content && SUSPICIOUS_SCRIPT_PATTERNS.some((pattern) => pattern.test(file.content))) {
        issues.push(issue("script.suspicious-command", "warning", file.path, "Script contains shell, network, destructive, or encoded-command patterns that require careful review."));
      }
    }
    if (file.kind === "asset") {
      issues.push(issue("asset.review-required", "warning", file.path, "Assets and binary-like files require provenance and size review."));
      if (fileSize(file) > LARGE_ASSET_BYTES) {
        issues.push(issue("asset.large-file", "warning", file.path, "Large assets should be reviewed before packaging into an installable skill."));
      }
    }
    if (DEPENDENCY_FILE_PATTERN.test(file.path)) {
      issues.push(issue("dependency.review-required", "warning", file.path, "Dependency manifests can change runtime behavior and require review."));
    }
    if (file.content && SECRET_PATTERNS.some((pattern) => pattern.test(file.content))) {
      issues.push(issue("secret.possible-token", "error", file.path, "Possible API key or access token found in package content."));
    }
    if (file.content) {
      EXTERNAL_URL_PATTERN.lastIndex = 0;
      const urls = [...file.content.matchAll(EXTERNAL_URL_PATTERN)];
      if (urls.length > 0) {
        issues.push(issue("external-url.review-required", "warning", file.path, `External URLs require provenance review (${urls.length} found).`));
      }
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
  const evidenceCount = Object.values(evidencePaths(selectedPackage)).reduce((total, paths) => total + paths.length, 0);
  const lint = lintPackage(selectedPackage);
  const lifecycle = normalizeReviewStatus(fm.review_status);
  const chips = [
    ["package", selectedPackage.name, "pass"],
    ["file", selectedFile.kind, selectedFile.kind === "script" ? "warn" : "pass"],
    ["risk", lint.risk, lint.risk === "low" ? "pass" : "warn"],
    ["lifecycle", lifecycle, lifecycle === "approved" ? "pass" : "warn"],
    ["source", fm.source_type || "unspecified", fm.source_type ? "pass" : "warn"],
    ["agent", selectedAgent, "pass"]
  ];
  if (scriptCount) chips.push(["scripts", String(scriptCount), "warn"]);
  if (evidenceCount) chips.push(["evidence", String(evidenceCount), "pass"]);
  metadataChips.innerHTML = chips.map(([key, value, tone]) => `<span class="chip ${tone}">${key}: ${escapeHtml(value)}</span>`).join("");
}

function renderReviewGate() {
  if (!reviewGate) return;
  const entry = selectedPackage.files.find((file) => file.kind === "entrypoint");
  const fm = entry ? getFrontmatter(entry.content) : {};
  const lint = lintPackage(selectedPackage);
  const decision = approvalDecision(selectedPackage);
  const lifecycle = normalizeReviewStatus(fm.review_status);
  const sourceType = fm.source_type || "unspecified";
  const scripts = selectedPackage.files.filter((file) => file.kind === "script").length;
  const evidence = evidencePaths(selectedPackage);
  const hasReviewEvidence = Object.values(evidence).some((paths) => paths.length > 0);
  if (approvalSummary) {
    approvalSummary.textContent = decision.installable
      ? t("approval.allowed")
      : `${t("approval.blocked")}: ${decision.blockers[0] || "review required"}`;
    approvalSummary.classList.toggle("blocked", !decision.installable);
  }
  const rows = [
    {
      id: "lifecycle.approved",
      severity: lifecycle === "approved" ? "pass" : "error",
      message: lifecycle === "approved"
        ? "Approved packages can expose install commands."
        : `Current lifecycle is ${lifecycle}; install stays gated until approval.`
    },
    {
      id: "owner.present",
      severity: fm.owner?.trim() ? "pass" : "error",
      message: fm.owner?.trim() ? `Owner: ${fm.owner}` : "Add an owner before approval."
    },
    {
      id: "risk.not-high",
      severity: lint.risk === "high" ? "error" : "pass",
      message: lint.risk === "high" ? "Resolve high-risk lint before install." : `${lint.risk} risk is installable after approval.`
    },
    {
      id: "provenance.visible",
      severity: decision.governedSource && !decision.hasProvenance ? "error" : sourceType !== "unspecified" ? "pass" : "warning",
      message: decision.governedSource && !decision.hasProvenance
        ? "Public, generated, and evolved skills need source_url, source_commit, upstream, or generator."
        : sourceType !== "unspecified" ? `Source type: ${sourceType}` : "Declare whether this is manual, imported, generated, or evolved."
    },
    {
      id: "evidence.attached",
      severity: hasReviewEvidence ? "pass" : GOVERNED_SOURCE_TYPES.includes(sourceType) ? "error" : "pass",
      message: hasReviewEvidence ? "Evidence files are attached." : "Attach evals, reports, review notes, or trigger samples when the source is imported/generated/evolved."
    },
    {
      id: "scripts.reviewed",
      severity: scripts > 0 && evidence.review_notes.length === 0 ? "warning" : "pass",
      message: scripts > 0 ? `${scripts} script file${scripts === 1 ? "" : "s"} need review notes.` : "No scripts in package."
    }
  ];
  reviewGate.innerHTML = rows.map((item) => {
    const kind = item.severity === "error" ? " fail" : item.severity === "warning" ? " warn" : "";
    return `<li><span class="check-dot${kind}"></span><span><strong>${escapeHtml(item.id)}</strong><br>${escapeHtml(item.message)}</span></li>`;
  }).join("");
}

function renderProvenance() {
  if (!provenanceFacts) return;
  const entry = selectedPackage.files.find((file) => file.kind === "entrypoint");
  const fm = entry ? getFrontmatter(entry.content) : {};
  const facts = [
    ["source type", fm.source_type || "unspecified"],
    ["source url", fm.source_url || "not recorded"],
    ["source commit", fm.source_commit || "not recorded"],
    ["generator", fm.generator || "not recorded"],
    ["upstream", fm.upstream || "not recorded"],
    ["imported by", fm.imported_by || "not recorded"],
    ["approved by", fm.approved_by || "not recorded"]
  ];
  provenanceFacts.innerHTML = facts.map(([key, value]) => `<div><dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("");
}

function renderEvidenceSummary() {
  if (!evidenceSummary) return;
  const evidence = evidencePaths(selectedPackage);
  const rows = [
    ["evals", evidence.evals],
    ["reports", evidence.reports],
    ["review notes", evidence.review_notes],
    ["trigger samples", evidence.trigger_samples]
  ];
  evidenceSummary.innerHTML = rows.map(([label, paths]) => `
    <div>
      <strong>${paths.length}</strong>
      <span>${escapeHtml(label)}</span>
      <small>${escapeHtml(paths[0] || "none yet")}</small>
    </div>
  `).join("");
}

function renderGovernanceProgress() {
  if (!governanceProgress) return;
  const entry = selectedPackage.files.find((file) => file.kind === "entrypoint");
  const fm = entry ? getFrontmatter(entry.content) : {};
  const lifecycle = normalizeReviewStatus(fm.review_status);
  const sourceType = fm.source_type || "";
  const lint = lintPackage(selectedPackage);
  const decision = approvalDecision(selectedPackage);
  const evidence = evidencePaths(selectedPackage);
  const evidenceCount = evidenceCountForPackage(selectedPackage);
  const importedOrGenerated = GOVERNED_SOURCE_TYPES.includes(sourceType);
  const provenanceOk = Boolean(sourceType) && (!importedOrGenerated || Boolean(fm.source_url || fm.source_commit || fm.upstream || fm.generator));
  const reviewOk = Boolean(fm.owner?.trim()) && lint.risk !== "high" && (!importedOrGenerated || evidenceCount > 0);
  const approved = lifecycle === "approved";
  const registryOk = approved && decision.installable;
  const installOk = decision.installable;
  const steps = [
    {
      label: "Candidate",
      done: Boolean(entry),
      detail: lifecycle === "approved" ? "package exists" : lifecycle
    },
    {
      label: "Source",
      done: provenanceOk,
      detail: sourceType || "source missing"
    },
    {
      label: "Review",
      done: reviewOk,
      detail: lint.risk === "high" ? "high risk" : evidenceCount ? `${evidenceCount} evidence` : "needs evidence"
    },
    {
      label: "Approval",
      done: approved,
      detail: approved ? fm.approved_by || "approved" : "awaiting maintainer"
    },
    {
      label: "Registry",
      done: registryOk,
      detail: registryOk ? "install snippet enabled" : "visible, not installable"
    },
    {
      label: "Install",
      done: installOk,
      detail: installOk ? selectedAgent : "blocked"
    }
  ];
  const currentIndex = steps.findIndex((step) => !step.done);
  governanceProgress.innerHTML = steps.map((step, index) => {
    const isCurrent = currentIndex === -1 ? index === steps.length - 1 : index === currentIndex;
    const blocked = isCurrent && !step.done && (step.label === "Review" && lint.risk === "high" || step.label === "Install");
    const state = step.done ? "done" : blocked ? "blocked" : isCurrent ? "current" : "pending";
    const status = step.done ? "done" : isCurrent ? "now" : blocked ? "blocked" : "next";
    const aria = `${step.label}: ${step.detail}. ${status}.`;
    return `
      <div class="pipeline-step ${state}" tabindex="0" aria-label="${escapeHtml(aria)}" title="${escapeHtml(step.detail)}">
        <span class="pipeline-dot" aria-hidden="true"></span>
        <span class="pipeline-copy">
          <strong>${escapeHtml(step.label)}</strong>
          <span>${escapeHtml(step.detail)}</span>
        </span>
        <span class="pipeline-status">${escapeHtml(status)}</span>
      </div>
    `;
  }).join("");
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

function renderFileActions() {
  if (deleteFileArmedFor && deleteFileArmedFor !== selectedFile?.path) deleteFileArmedFor = null;
  const entryLocked = selectedFile?.kind === "entrypoint";
  if (fileActionSummary && selectedFile) {
    fileActionSummary.textContent = `${fileName(selectedFile.path)} · ${selectedFile.kind} · ${relativePathForFile(selectedPackage, selectedFile)}`;
  }
  if (deleteFileButton) {
    deleteFileButton.textContent = deleteFileArmedFor === selectedFile?.path ? t("file.confirmDelete") : t("file.delete");
    deleteFileButton.disabled = entryLocked;
  }
  document.querySelector("[data-rename-file]")?.toggleAttribute("disabled", entryLocked);
}

function renderPackageFacts() {
  const scripts = selectedPackage.files.filter((file) => file.kind === "script").length;
  const evidenceCount = evidenceCountForPackage(selectedPackage);
  const entry = selectedPackage.files.find((file) => file.kind === "entrypoint");
  const summary = lintSummary();
  renderPackageActions();
  renderFileActions();
  if (packageName) packageName.textContent = selectedPackage.name;
  if (packageEntry) packageEntry.textContent = entry ? fileName(entry.path) : "missing";
  if (packageCount) packageCount.textContent = String(selectedPackage.files.length);
  if (packageRisk) packageRisk.textContent = `${summary.risk} · ${scripts} script${scripts === 1 ? "" : "s"} · ${evidenceCount} evidence`;
  renderGovernanceProgress();
}

function entryForPackage(pkg) {
  return pkg.files.find((file) => file.kind === "entrypoint");
}

function frontmatterForPackage(pkg) {
  const entry = entryForPackage(pkg);
  return entry ? getFrontmatter(entry.content) : {};
}

function normalizedCategory(value) {
  const cleaned = String(value || "")
    .trim()
    .replace(/\\/g, "/")
    .replace(/^\/+|\/+$/g, "")
    .replace(/\/+/g, "/");
  return cleaned || t("packageIndex.uncategorized");
}

function categoryForPackage(pkg) {
  return normalizedCategory(frontmatterForPackage(pkg).category);
}

function topicsForPackage(pkg) {
  const value = frontmatterForPackage(pkg).topics || "";
  return String(value)
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function roleLabelForFile(file) {
  const role = PACKAGE_ROLE_DEFS.find((item) => item.id === roleForFile(file));
  return role ? t(role.labelKey) : file.kind;
}

function fileIssueTone(file, lint) {
  const issues = lint.issues.filter((item) => item.path === file.path);
  if (issues.some((item) => item.severity === "error")) return "fail";
  if (issues.some((item) => item.severity === "warning")) return "warn";
  return "pass";
}

function fileIssueLabel(file, lint) {
  const issues = lint.issues.filter((item) => item.path === file.path);
  if (issues.length === 0) return file.changed ? "changed" : "clean";
  const failCount = issues.filter((item) => item.severity === "error").length;
  const warnCount = issues.filter((item) => item.severity === "warning").length;
  return [
    failCount ? `${failCount} fail` : "",
    warnCount ? `${warnCount} warn` : ""
  ].filter(Boolean).join(" · ");
}

function buildPackageStructure(pkg) {
  const rootNode = { type: "dir", name: `${pkg.name}/`, children: new Map(), count: pkg.files.length };
  for (const file of pkg.files) {
    const parts = relativePathForFile(pkg, file).split("/");
    let current = rootNode;
    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;
      if (isFile) {
        current.children.set(part, { type: "file", name: part, file });
        return;
      }
      if (!current.children.has(part)) {
        current.children.set(part, { type: "dir", name: `${part}/`, children: new Map(), count: 0 });
      }
      current = current.children.get(part);
      current.count += 1;
    });
  }
  return rootNode;
}

function sortedStructureChildren(node) {
  return [...node.children.values()].sort((a, b) => {
    if (a.type !== b.type) return a.type === "file" ? -1 : 1;
    if (a.file?.kind === "entrypoint") return -1;
    if (b.file?.kind === "entrypoint") return 1;
    return a.name.localeCompare(b.name);
  });
}

function renderStructureNode(node, lint, depth = 0) {
  if (node.type === "dir") {
    const children = sortedStructureChildren(node).map((child) => renderStructureNode(child, lint, depth + 1)).join("");
    return `
      <div class="structure-branch">
        <div class="structure-row dir" style="--indent: ${depth * 16}px">
          <span class="structure-caret">▾</span>
          <strong>${escapeHtml(node.name)}</strong>
          <em>${node.count || ""}</em>
        </div>
        ${children}
      </div>
    `;
  }
  const file = node.file;
  const tone = fileIssueTone(file, lint);
  const active = file === selectedFile ? " active" : "";
  return `
    <button type="button" class="structure-row file ${tone}${active}" style="--indent: ${depth * 16}px" data-index-path="${escapeHtml(file.path)}">
      <span class="structure-caret"></span>
      <strong>${escapeHtml(node.name)}</strong>
      <span>${escapeHtml(roleLabelForFile(file))}</span>
      <em>${escapeHtml(fileIssueLabel(file, lint))}</em>
    </button>
  `;
}

function governanceGraphSteps(pkg, decision) {
  const fm = frontmatterForPackage(pkg);
  const entry = entryForPackage(pkg);
  const sourceType = fm.source_type || "";
  const governedSource = GOVERNED_SOURCE_TYPES.includes(sourceType);
  const provenanceOk = Boolean(sourceType) && (!governedSource || Boolean(fm.source_url || fm.source_commit || fm.upstream || fm.generator));
  const reviewOk = Boolean(fm.owner?.trim()) && decision.lint.risk !== "high" && (!governedSource || decision.evidenceCount > 0);
  const approved = decision.lifecycle === "approved";
  return [
    { ...GOVERNANCE_GRAPH_STEPS[0], done: Boolean(entry), detail: decision.lifecycle },
    { ...GOVERNANCE_GRAPH_STEPS[1], done: provenanceOk, detail: sourceType || "source missing" },
    { ...GOVERNANCE_GRAPH_STEPS[2], done: reviewOk, detail: decision.lint.risk === "high" ? "high risk" : `${decision.evidenceCount} evidence` },
    { ...GOVERNANCE_GRAPH_STEPS[3], done: approved, detail: approved ? fm.approved_by || "approved" : "awaiting approval" },
    { ...GOVERNANCE_GRAPH_STEPS[4], done: decision.installable, detail: decision.installable ? "registry installable" : "registry gated" },
    { ...GOVERNANCE_GRAPH_STEPS[5], done: decision.installable, detail: decision.installable ? selectedAgent : "blocked" }
  ];
}

function renderGovernanceGraph(pkg, decision) {
  const steps = governanceGraphSteps(pkg, decision);
  const currentIndex = steps.findIndex((step) => !step.done);
  return `
    <div class="governance-graph">
      ${steps.map((step, index) => {
        const isCurrent = currentIndex === -1 ? index === steps.length - 1 : index === currentIndex;
        const state = step.done ? "done" : isCurrent ? "current" : "pending";
        return `
          <div class="graph-node ${state}">
            <span>${index + 1}</span>
            <strong>${escapeHtml(t(step.labelKey))}</strong>
            <small>${escapeHtml(step.detail)}</small>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function buildCategoryHierarchy() {
  const rootNode = { label: "root", children: new Map(), packages: [] };
  for (const pkg of repo.packages) {
    const segments = categoryForPackage(pkg).split("/").filter(Boolean);
    let current = rootNode;
    for (const segment of segments) {
      if (!current.children.has(segment)) current.children.set(segment, { label: segment, children: new Map(), packages: [] });
      current = current.children.get(segment);
    }
    current.packages.push(pkg);
  }
  return rootNode;
}

function renderCategoryNode(node, depth = 0) {
  const children = [...node.children.values()].sort((a, b) => a.label.localeCompare(b.label));
  const packages = node.packages.slice().sort((a, b) => a.name.localeCompare(b.name));
  const childHtml = children.map((child) => renderCategoryNode(child, depth + 1)).join("");
  const packageHtml = packages.map((pkg) => {
    const decision = approvalDecision(pkg);
    const topics = topicsForPackage(pkg);
    const active = pkg === selectedPackage ? " active" : "";
    const tone = decision.installable ? "pass" : decision.lint.risk === "high" ? "fail" : "warn";
    return `
      <button type="button" class="category-package ${tone}${active}" style="--indent: ${(depth + 1) * 14}px" data-category-package="${escapeHtml(pkg.name)}">
        <strong>${escapeHtml(pkg.name)}</strong>
        <span>${escapeHtml(decision.lifecycle)} · ${escapeHtml(decision.lint.risk)} risk</span>
        <small>${escapeHtml(topics.length ? topics.join(", ") : t("packageIndex.noTopics"))}</small>
      </button>
    `;
  }).join("");
  if (depth === 0) return `${childHtml}${packageHtml}`;
  const packageCount = packages.length + children.reduce((total, child) => total + countCategoryPackages(child), 0);
  return `
    <div class="category-node">
      <div class="category-row" style="--indent: ${(depth - 1) * 14}px">
        <span>▾</span>
        <strong>${escapeHtml(node.label)}</strong>
        <em>${packageCount}</em>
      </div>
      ${childHtml}
      ${packageHtml}
    </div>
  `;
}

function countCategoryPackages(node) {
  return node.packages.length + [...node.children.values()].reduce((total, child) => total + countCategoryPackages(child), 0);
}

function dashboardRecords() {
  return repo.packages.map((pkg) => {
    const decision = approvalDecision(pkg);
    const fm = frontmatterForPackage(pkg);
    const blocker = decision.installable
      ? t("packageIndex.installAllowed")
      : decision.blockers[0] || decision.warnings[0] || "Review required";
    return {
      pkg,
      decision,
      fm,
      blocker
    };
  });
}

function dashboardMetrics(records) {
  return {
    total: records.length,
    installable: records.filter((record) => record.decision.installable).length,
    reviewQueue: records.filter((record) => !record.decision.installable).length,
    highRisk: records.filter((record) => record.decision.lint.risk === "high").length,
    missingOwner: records.filter((record) => !record.decision.owner.trim()).length,
    missingEvidence: records.filter((record) => record.decision.governedSource && record.decision.evidenceCount === 0).length,
    changed: allFiles().filter((file) => file.changed).length + deletedFiles.length + deletedPackages.flatMap((pkg) => pkg.files).length,
    registryReady: records.filter((record) => record.decision.installable).length
  };
}

function renderDashboardPipeline() {
  const decision = approvalDecision(selectedPackage);
  const steps = governanceGraphSteps(selectedPackage, decision);
  const currentIndex = steps.findIndex((step) => !step.done);
  return `
    <div class="dashboard-pipeline">
      ${steps.map((step, index) => {
        const isCurrent = currentIndex === -1 ? index === steps.length - 1 : index === currentIndex;
        const state = step.done ? "done" : isCurrent ? "current" : "pending";
        return `
          <div class="dashboard-pipeline-step ${state}">
            <span>${index + 1}</span>
            <strong>${escapeHtml(t(step.labelKey))}</strong>
            <small>${escapeHtml(step.detail)}</small>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderDashboardQueue(records) {
  const queue = records
    .filter((record) => !record.decision.installable)
    .sort((a, b) => {
      const severityA = a.decision.lint.risk === "high" ? 0 : a.decision.lifecycle === "approved" ? 1 : 2;
      const severityB = b.decision.lint.risk === "high" ? 0 : b.decision.lifecycle === "approved" ? 1 : 2;
      if (severityA !== severityB) return severityA - severityB;
      return a.pkg.name.localeCompare(b.pkg.name);
    })
    .slice(0, 6);
  if (queue.length === 0) {
    return `<p class="dashboard-empty">${escapeHtml(t("dashboard.queueEmpty"))}</p>`;
  }
  return `
    <div class="dashboard-queue" role="table" aria-label="${escapeHtml(t("dashboard.queue"))}">
      <div class="dashboard-queue-row head" role="row">
        <span>${escapeHtml(t("dashboard.package"))}</span>
        <span>${escapeHtml(t("dashboard.owner"))}</span>
        <span>${escapeHtml(t("dashboard.status"))}</span>
        <span>${escapeHtml(t("dashboard.blocker"))}</span>
        <span></span>
      </div>
      ${queue.map((record) => `
        <div class="dashboard-queue-row" role="row">
          <strong>${escapeHtml(record.pkg.name)}</strong>
          <span>${escapeHtml(record.decision.owner || "missing")}</span>
          <span>${escapeHtml(record.decision.lifecycle)} · ${escapeHtml(record.decision.lint.risk)}</span>
          <span title="${escapeHtml(record.blocker)}">${escapeHtml(record.blocker)}</span>
          <button type="button" data-dashboard-package="${escapeHtml(record.pkg.name)}">${escapeHtml(t("dashboard.open"))}</button>
        </div>
      `).join("")}
    </div>
  `;
}

function renderDashboard() {
  if (!dashboard) return;
  const records = dashboardRecords();
  const metrics = dashboardMetrics(records);
  const selectedDecision = approvalDecision(selectedPackage);
  const metricCards = [
    [t("dashboard.total"), metrics.total, "neutral"],
    [t("dashboard.installable"), metrics.installable, "pass"],
    [t("dashboard.reviewQueue"), metrics.reviewQueue, metrics.reviewQueue ? "warn" : "pass"],
    [t("dashboard.highRisk"), metrics.highRisk, metrics.highRisk ? "fail" : "pass"],
    [t("dashboard.missingOwner"), metrics.missingOwner, metrics.missingOwner ? "warn" : "pass"],
    [t("dashboard.missingEvidence"), metrics.missingEvidence, metrics.missingEvidence ? "warn" : "pass"],
    [t("dashboard.changed"), metrics.changed, metrics.changed ? "warn" : "neutral"],
    [t("dashboard.registryReady"), metrics.registryReady, "pass"]
  ];
  dashboard.innerHTML = `
    <section class="dashboard-hero">
      <div>
        <span class="label">${escapeHtml(t("dashboard.label"))}</span>
        <h2>${escapeHtml(t("dashboard.title"))}</h2>
        <p>${escapeHtml(t("dashboard.body"))}</p>
      </div>
      <div class="dashboard-command">
        <span class="label">${escapeHtml(t("dashboard.readyCommand"))}</span>
        <code>npx skills add ${escapeHtml(installSource())} --list</code>
      </div>
    </section>

    <section class="dashboard-metrics" aria-label="${escapeHtml(t("dashboard.label"))}">
      ${metricCards.map(([label, value, tone]) => `
        <article class="dashboard-metric ${tone}">
          <strong>${escapeHtml(value)}</strong>
          <span>${escapeHtml(label)}</span>
        </article>
      `).join("")}
    </section>

    <section class="dashboard-grid">
      <article class="dashboard-card span-2">
        <div class="dashboard-card-head">
          <div>
            <span class="label">${escapeHtml(t("dashboard.pipeline"))}</span>
            <strong>${escapeHtml(t("dashboard.selected"))}: ${escapeHtml(selectedPackage.name)}</strong>
          </div>
          <button type="button" data-dashboard-view="package">${escapeHtml(t("view.package"))}</button>
        </div>
        ${renderDashboardPipeline()}
      </article>

      <article class="dashboard-card">
        <div class="dashboard-card-head">
          <div>
            <span class="label">${escapeHtml(t("dashboard.registry"))}</span>
            <strong>${metrics.installable}/${metrics.total}</strong>
          </div>
          <span class="dashboard-state ${selectedDecision.installable ? "pass" : "warn"}">${escapeHtml(selectedDecision.installable ? t("packageIndex.installAllowed") : t("packageIndex.installBlocked"))}</span>
        </div>
        <p>${escapeHtml(t("dashboard.registryBody"))}</p>
      </article>
    </section>

    <section class="dashboard-grid lower">
      <article class="dashboard-card span-2">
        <div class="dashboard-card-head">
          <div>
            <span class="label">${escapeHtml(t("dashboard.queue"))}</span>
            <strong>${metrics.reviewQueue} ${escapeHtml(t("dashboard.reviewQueue"))}</strong>
          </div>
          <button type="button" data-dashboard-action="checks">${escapeHtml(t("action.runChecks"))}</button>
        </div>
        ${renderDashboardQueue(records)}
      </article>

      <article class="dashboard-card">
        <div class="dashboard-card-head">
          <div>
            <span class="label">${escapeHtml(t("dashboard.gitBackend"))}</span>
            <strong>Pages + Actions + PR</strong>
          </div>
        </div>
        <p>${escapeHtml(t("dashboard.gitBackendBody"))}</p>
      </article>
    </section>

    <section class="dashboard-intake">
      <article>
        <strong>${escapeHtml(t("dashboard.publicImport"))}</strong>
        <p>${escapeHtml(t("dashboard.publicImportBody"))}</p>
      </article>
      <article>
        <strong>${escapeHtml(t("dashboard.localFolder"))}</strong>
        <p>${escapeHtml(t("dashboard.localFolderBody"))}</p>
      </article>
      <article>
        <strong>${escapeHtml(t("dashboard.newSkill"))}</strong>
        <p>${escapeHtml(t("dashboard.newSkillBody"))}</p>
      </article>
    </section>
  `;
}

function renderPackageIndex() {
  if (!packageIndex) return;
  renderDashboard();
  const entry = entryForPackage(selectedPackage);
  const fm = frontmatterForPackage(selectedPackage);
  const decision = approvalDecision(selectedPackage);
  const changedCount = selectedPackage.files.filter((file) => file.changed).length;
  const scripts = selectedPackage.files.filter((file) => file.kind === "script").length;
  const description = fm.description || "No description yet. Add one in SKILL.md frontmatter.";
  const decisionItems = [
    ...(decision.blockers.length ? [`${t("packageIndex.blockers")}: ${decision.blockers.join(" ")}`] : []),
    ...(decision.warnings.length ? [`${t("packageIndex.warnings")}: ${decision.warnings.join(" ")}`] : [])
  ];
  const facts = [
    [t("field.owner"), decision.owner || "missing"],
    [t("packageIndex.category"), categoryForPackage(selectedPackage)],
    ["source", decision.sourceType],
    ["status", decision.lifecycle],
    ["risk", decision.lint.risk]
  ];
  const structure = buildPackageStructure(selectedPackage);
  const libraryTree = buildCategoryHierarchy();

  packageIndex.innerHTML = `
    <section class="package-overview">
      <div class="package-title-block">
        <span class="label">${escapeHtml(t("packageIndex.label"))}</span>
        <h2>${escapeHtml(fm.name || selectedPackage.name)}</h2>
        <p>${escapeHtml(description)}</p>
        <div class="metadata-chips compact">
          ${facts.map(([key, value]) => `<span class="chip ${value === "missing" ? "warn" : "pass"}">${escapeHtml(key)}: ${escapeHtml(value)}</span>`).join("")}
        </div>
      </div>
      <div class="package-decision ${decision.installable ? "pass" : "blocked"}">
        <span class="label">${escapeHtml(decision.installable ? t("packageIndex.installAllowed") : t("packageIndex.installBlocked"))}</span>
        <strong>${escapeHtml(decision.installable ? generateInstallCommand(installSource(), selectedPackage.name, selectedAgent) : decision.blockers[0] || "review required")}</strong>
        ${decisionItems.length ? `<ul>${decisionItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
      </div>
    </section>

    <section class="package-stat-grid" aria-label="${escapeHtml(t("packageIndex.title"))}">
      <div><strong>${selectedPackage.files.length}</strong><span>${escapeHtml(t("packageIndex.files"))}</span></div>
      <div><strong>${changedCount}</strong><span>${escapeHtml(t("packageIndex.changed"))}</span></div>
      <div><strong>${decision.evidenceCount}</strong><span>${escapeHtml(t("packageIndex.evidence"))}</span></div>
      <div><strong>${scripts}</strong><span>${escapeHtml(t("packageIndex.scripts"))}</span></div>
    </section>

    <section class="package-workbench">
      <article class="package-structure-panel">
        <div class="package-section-head">
          <span class="label">${escapeHtml(t("packageIndex.structure"))}</span>
          <strong>${escapeHtml(packageRoot(selectedPackage))}</strong>
        </div>
        <div class="structure-tree">
          ${renderStructureNode(structure, decision.lint)}
        </div>
      </article>

      <article class="governance-graph-panel">
        <div class="package-section-head">
          <span class="label">${escapeHtml(t("packageIndex.graph"))}</span>
          <strong>${escapeHtml(decision.installable ? t("packageIndex.installAllowed") : t("packageIndex.installBlocked"))}</strong>
        </div>
        ${renderGovernanceGraph(selectedPackage, decision)}
      </article>
    </section>

    <section class="library-category-panel">
      <div class="package-section-head">
        <span class="label">${escapeHtml(t("packageIndex.library"))}</span>
        <strong>${repo.packages.length} ${escapeHtml(t("packageIndex.packages"))}</strong>
      </div>
      <div class="category-tree">
        ${renderCategoryNode(libraryTree)}
      </div>
    </section>
  `;
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
  const provenance = {
    source_type: fm.source_type || undefined,
    source_url: fm.source_url || undefined,
    source_commit: fm.source_commit || undefined,
    imported_at: fm.imported_at || undefined,
    imported_by: fm.imported_by || undefined,
    generator: fm.generator || undefined,
    upstream: fm.upstream || undefined,
    approved_by: fm.approved_by || undefined,
    approved_at: fm.approved_at || undefined
  };
  const evidence = evidencePaths(pkg);
  const record = {
    name: fm.name || pkg.name,
    path: packageRoot(pkg),
    entrypoint: entry?.path || `${packageRoot(pkg)}/SKILL.md`,
    description: fm.description || "",
    lifecycle: normalizeReviewStatus(fm.review_status),
    risk: lint.risk,
    risk_reasons: lint.issues.map((item) => item.id),
    files: pkg.files.map((file) => ({
      path: file.path,
      kind: file.kind,
      size: fileSize(file)
    }))
  };
  if (Object.values(provenance).some(Boolean)) record.provenance = provenance;
  if (Object.values(evidence).some((paths) => paths.length > 0)) record.evidence = evidence;
  if (isInstallablePackage(pkg)) record.install = DEFAULT_AGENTS.map((agent) => generateInstallCommand(installSource(), pkg.name, agent));
  for (const key of ["category", "topics", "version", "owner", "review_status"]) {
    if (fm[key]?.trim()) record[key] = fm[key].trim();
  }
  return record;
}

function generateRegistryPreview() {
  const repository = repo.owner === "local" ? undefined : `${repo.owner}/${repo.name}`;
  return {
    $schema: REGISTRY_SCHEMA,
    schema_version: "skills-charter.registry.v0",
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
  const decision = approvalDecision(selectedPackage);
  const installable = decision.installable;
  if (installStatus) {
    installStatus.textContent = installable
      ? "Approved package: install command is available."
      : `Install gated: ${decision.blockers[0] || "review required"}`;
    installStatus.classList.toggle("blocked", !installable);
  }
  if (installCommand) {
    installCommand.textContent = installable
      ? generateInstallCommand(source, selectedPackage.name, selectedAgent)
      : `# Review required before install\n${decision.blockers.map((item) => `# - ${item}`).join("\n")}`;
  }
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
  deletedFiles = [];
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
  const deletedPackageFiles = deletedPackages.flatMap((pkg) => pkg.files);
  const deletedStandaloneFiles = deletedFiles.filter((file) => (
    !deletedPackages.some((pkg) => file.path.startsWith(`skills/${pkg.name}/`))
  ));
  const allDeletedFiles = [...deletedPackageFiles, ...deletedStandaloneFiles];
  const changeCount = changedFiles.length + allDeletedFiles.length;
  const deleteOnly = allDeletedFiles.length > 0 && changedFiles.length === 0;
  const handoffSubject = deleteOnly && deletedPackages.length ? deletedPackages.at(-1).name : selectedPackage.name;
  const handoffBranch = `skills-charter/${handoffSubject}-${deleteOnly ? "delete" : "update"}`;
  const commitMessage = deleteOnly && deletedPackages.length ? `Delete ${handoffSubject} skill` : `Update ${selectedPackage.name} skill`;
  const selectedDiff = selectedFile.changed
    ? `<div class="diff-row"><span class="add">+ browser edit staged for skills-charter/${selectedPackage.name}-update</span></div>`
    : '<div class="diff-row"><span class="context">  no browser edits staged for this file yet</span></div>';
  const deletedDiff = deletedPackages.map((pkg) => (
    `<div class="diff-row"><span class="remove">- deleted skills/${escapeHtml(pkg.name)}/</span></div>`
  )).join("") + deletedStandaloneFiles.map((file) => (
    `<div class="diff-row"><span class="remove">- deleted ${escapeHtml(file.path)}</span></div>`
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
          ...allDeletedFiles.map((file) => `# deleted: ${file.path}`)
        ].join("\n")
      : "# No browser edits yet. Create, rename, delete, edit a file, or update metadata before preparing a PR.";
    const deleteCommands = [
      ...deletedPackages.map((pkg) => `git rm -r skills/${pkg.name}`),
      ...deletedStandaloneFiles.map((file) => `git rm ${file.path}`)
    ].join("\n");
    handoffCommand.textContent = [
      changedList,
      `git checkout -b ${handoffBranch}`,
      deleteCommands,
      "npm run skills-charter -- lint --root .",
      `npm run skills-charter -- generate registry --root .${sourceFlag} --out skills.json`,
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
  const loadingLabel = `Loading ${fileName(file.path)}`;
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
  renderReviewGate();
  renderProvenance();
  renderEvidenceSummary();
  renderPackageFacts();
  renderPackageIndex();
  updateInstallCommand();
  updateRegistryPreview();
  renderDiff();
  if (syncState?.textContent === loadingLabel) syncState.textContent = t("status.clean");
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
  deletedFiles = [];
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

function normalizeRelativeFilePath(value) {
  const cleaned = String(value || "")
    .trim()
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .replace(/\/+/g, "/");
  if (!cleaned || cleaned.endsWith("/") || cleaned.includes("..") || cleaned.split("/").some((part) => !part.trim())) {
    return "";
  }
  return cleaned;
}

function uniqueFilePath(pkg, dir, baseName) {
  const rootPath = packageRoot(pkg);
  const base = normalizeRelativeFilePath(`${dir}/${baseName}`);
  const parts = base.split("/");
  const filename = parts.pop() || "notes.md";
  const dotIndex = filename.lastIndexOf(".");
  const stem = dotIndex > 0 ? filename.slice(0, dotIndex) : filename;
  const ext = dotIndex > 0 ? filename.slice(dotIndex) : "";
  let suffix = 1;
  let candidate = `${rootPath}/${base}`;
  while (pkg.files.some((file) => file.path === candidate)) {
    suffix += 1;
    candidate = `${rootPath}/${[...parts, `${stem}-${suffix}${ext}`].join("/")}`;
  }
  return candidate;
}

function openDirsForPath(path) {
  const parts = path.split("/");
  let current = "";
  for (let index = 0; index < parts.length - 1; index += 1) {
    current = current ? `${current}/${parts[index]}` : parts[index];
    openDirs.add(current);
  }
}

function createFileFromTemplate(role) {
  if (!selectedPackage) return;
  const template = FILE_TEMPLATES[role];
  if (!template) return;
  const path = uniqueFilePath(selectedPackage, template.dir, template.name);
  const file = {
    path,
    kind: detectKind(path),
    changed: true,
    created: true,
    content: template.content(selectedPackage)
  };
  deleteFileArmedFor = null;
  selectedPackage.files.push(file);
  sortPackageFiles(selectedPackage);
  openDirsForPath(path);
  void selectFile(path);
  if (syncState) syncState.textContent = t("file.created");
}

function renameSelectedFile(requestedPath) {
  if (!selectedFile || !selectedPackage) return;
  if (selectedFile.kind === "entrypoint") {
    window.alert(t("file.entrypointLocked"));
    return;
  }
  const rawPath = typeof requestedPath === "string"
    ? requestedPath
    : window.prompt(t("file.renamePrompt"), relativePathForFile(selectedPackage, selectedFile));
  if (rawPath === null) return;
  const relativePath = normalizeRelativeFilePath(rawPath);
  if (!relativePath) {
    window.alert(t("file.renameInvalid"));
    return;
  }
  const nextPath = `${packageRoot(selectedPackage)}/${relativePath}`;
  if (nextPath === selectedFile.path) return;
  if (selectedPackage.files.some((file) => file !== selectedFile && file.path === nextPath)) {
    window.alert(t("file.renameExists"));
    return;
  }
  const previousPath = selectedFile.path;
  if (!selectedFile.created) deletedFiles.push({ path: previousPath });
  selectedFile.path = nextPath;
  selectedFile.kind = detectKind(nextPath);
  selectedFile.changed = true;
  deleteFileArmedFor = null;
  sortPackageFiles(selectedPackage);
  openDirsForPath(nextPath);
  void selectFile(nextPath);
  if (syncState) syncState.textContent = t("file.renamed");
}

function deleteSelectedFile(skipConfirm = false) {
  if (!selectedFile || !selectedPackage) return;
  if (selectedFile.kind === "entrypoint") {
    window.alert(t("file.entrypointLocked"));
    return;
  }
  const current = selectedFile;
  if (!skipConfirm && deleteFileArmedFor !== current.path) {
    deleteFileArmedFor = current.path;
    renderFileActions();
    if (syncState) syncState.textContent = t("file.deleteConfirm");
    return;
  }
  deleteFileArmedFor = null;
  if (!current.created) deletedFiles.push({ path: current.path });
  selectedPackage.files = selectedPackage.files.filter((file) => file !== current);
  const nextFile = selectedPackage.files.find((file) => file.kind === "entrypoint") || selectedPackage.files[0];
  if (nextFile) void selectFile(nextFile.path);
  if (syncState) syncState.textContent = t("file.deleted");
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
      created: true,
      content: `---\nname: ${name}\ndescription: Use this skill when the user needs a clear, repeatable workflow for a specific task.\ncategory: workflow/custom\ntopics: review, operations\nversion: 0.1.0\nowner: \nreview_status: candidate\nsource_type: manual\n---\n\n# ${name}\n\nUse this skill when the user needs help with...\n\n## Workflow\n\n1. Clarify the user's goal and constraints.\n2. Gather the minimum required context.\n3. Execute the workflow in small, reviewable steps.\n4. Verify the output before responding.\n\n## Evidence\n\nAdd evals, reports, review notes, or trigger samples before approval.\n\n## Notes\n\nAdd references, templates, examples, scripts, or assets as separate files when the skill grows beyond this entrypoint.`
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
  deletedFiles = deletedFiles.filter((file) => !file.path.startsWith(`${packageRoot(current)}/`));
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

function inspectorSection(name) {
  return document.querySelector(`[data-inspector-section="${name}"]`);
}

function focusInspectorSection(name) {
  document.querySelectorAll("[data-inspector-section]").forEach((section) => {
    section.open = section.dataset.inspectorSection === name;
  });
  const section = inspectorSection(name);
  if (section) section.scrollIntoView({ block: "center", inline: "nearest", behavior: "auto" });
}

async function selectTutorialSkill() {
  const pkg = repo.packages.find((item) => item.name === "skill-creator") || selectedPackage || repo.packages[0];
  if (!pkg) return;
  const entry = pkg.files.find((file) => file.kind === "entrypoint") || pkg.files[0];
  expandPackage(pkg);
  await selectFile(entry.path);
}

function patchSelectedPackageFrontmatter(fields) {
  const entry = selectedPackage?.files.find((file) => file.kind === "entrypoint");
  if (!entry) return;
  let next = entry.content || "---\nname: skill-creator\ndescription: Guide for creating effective skills.\n---\n";
  for (const [key, value] of Object.entries(fields)) {
    next = setFrontmatterField(next, key, value, key === "name" || key === "description");
  }
  entry.content = next;
  entry.changed = true;
  if (selectedFile === entry && editor) editor.value = next;
  if (syncState) syncState.textContent = "Tutorial metadata applied";
  renderTree();
  renderEditorHighlight();
  renderPreview();
  renderFields();
  renderChecks();
  renderMetadataChips();
  renderReviewGate();
  renderProvenance();
  renderEvidenceSummary();
  renderPackageFacts();
  renderPackageIndex();
  updateInstallCommand();
  updateRegistryPreview();
  renderDiff();
}

async function applyTutorialCandidateMetadata() {
  await selectTutorialSkill();
  patchSelectedPackageFrontmatter({
    owner: "@research-ops",
    review_status: "candidate",
    source_type: "public_import",
    source_url: "https://github.com/anthropics/skills/tree/main/skills/skill-creator",
    imported_by: "@maya",
    imported_at: "2026-05-20",
    approved_by: "",
    approved_at: ""
  });
  focusInspectorSection("metadata");
}

async function addTutorialEvidenceNote() {
  await selectTutorialSkill();
  const evidencePath = `${packageRoot(selectedPackage)}/review-notes/skill-creator-intake.md`;
  const evidenceContent = `# Review Note: Anthropic skill-creator Intake

Owner: @research-ops
Source: https://github.com/anthropics/skills/tree/main/skills/skill-creator
Decision: candidate for internal pilot

## Review Scope

- Confirm the trigger is limited to creating or improving team skills.
- Review scripts and eval helper files before approval.
- Keep public provenance visible in SKILL.md frontmatter.
- Require PR review and registry regeneration before install snippets are exposed.

## Demo Point

This note is Git-tracked evidence. Approval is not a hidden database flag; it is a reviewed repository change.`;
  let evidenceFile = selectedPackage.files.find((file) => file.path === evidencePath);
  if (!evidenceFile) {
    evidenceFile = {
      path: evidencePath,
      kind: "evidence",
      changed: true,
      created: true,
      content: evidenceContent
    };
    selectedPackage.files.push(evidenceFile);
  } else {
    evidenceFile.kind = "evidence";
    evidenceFile.changed = true;
    evidenceFile.content = evidenceContent;
  }
  sortPackageFiles(selectedPackage);
  openDirs.add("skills");
  openDirs.add(packageRoot(selectedPackage));
  openDirs.add(`${packageRoot(selectedPackage)}/review-notes`);
  await selectFile(evidenceFile.path);
  focusInspectorSection("evidence");
  if (syncState) syncState.textContent = "Tutorial evidence note added";
}

async function approveTutorialPackage() {
  await selectTutorialSkill();
  patchSelectedPackageFrontmatter({
    review_status: "approved",
    approved_by: "@research-lead",
    approved_at: "2026-05-20"
  });
  focusInspectorSection("install");
  setView("edit");
  if (syncState) syncState.textContent = "Tutorial approval applied";
}

async function runTutorialStepAction() {
  const step = TUTORIAL_STEPS[tutorialStepIndex];
  try {
    if (step.id === "import") {
      if (repoInput) repoInput.value = "anthropics/skills";
      settingsPopover?.classList.remove("hidden");
      settingsToggle?.setAttribute("aria-expanded", "true");
      try {
        await loadPublicGithubRepo("anthropics/skills");
      } catch (error) {
        if (syncState) syncState.textContent = `Using seeded demo: ${error.message}`;
      }
      closeSettings();
      await selectTutorialSkill();
    } else if (step.id === "select") {
      await selectTutorialSkill();
      setView("edit");
    } else if (step.id === "candidate") {
      await applyTutorialCandidateMetadata();
      setView("edit");
    } else if (step.id === "checks") {
      await selectTutorialSkill();
      focusInspectorSection("review-gate");
      renderChecks();
      renderReviewGate();
      renderPackageIndex();
      updateRegistryPreview();
      const summary = lintSummary();
      if (syncState) syncState.textContent = `Checked: ${summary.failCount} fail, ${summary.warnCount} warn`;
    } else if (step.id === "evidence") {
      await addTutorialEvidenceNote();
      setView("preview");
    } else if (step.id === "approve") {
      await approveTutorialPackage();
    }
    if (tutorialStepIndex < TUTORIAL_STEPS.length - 1) {
      setTutorialStep(tutorialStepIndex + 1);
    } else {
      setTutorialPanelVisible(false);
      localStorage.setItem(TUTORIAL_FINISHED_KEY, "true");
      if (syncState) syncState.textContent = "Tutorial finished. Use Tutorial to replay.";
    }
  } catch (error) {
    if (syncState) syncState.textContent = error.message || "Tutorial step failed";
  }
}

function setView(view) {
  viewButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  viewSurfaces.forEach((surface) => surface.classList.toggle("hidden", surface.dataset.viewSurface !== view));
}

function setZenMode(next) {
  zenMode = Boolean(next);
  document.body.classList.toggle("zen-mode", zenMode);
  if (zenToggle) zenToggle.textContent = zenMode ? t("view.exitZen") : t("view.zen");
  if (zenMode) {
    setView("edit");
    requestAnimationFrame(() => editor?.focus());
  }
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
  localStorage.setItem("skills-charter-theme", currentTheme);
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

packageIndex?.addEventListener("click", (event) => {
  const row = event.target.closest("[data-index-path]");
  if (row) {
    void selectFile(row.dataset.indexPath);
    return;
  }
  const packageRow = event.target.closest("[data-category-package]");
  if (packageRow) {
    const pkg = repo.packages.find((item) => item.name === packageRow.dataset.categoryPackage);
    const entry = pkg?.files.find((file) => file.kind === "entrypoint") || pkg?.files[0];
    if (entry) void selectFile(entry.path);
  }
});

dashboard?.addEventListener("click", (event) => {
  const packageRow = event.target.closest("[data-dashboard-package]");
  if (packageRow) {
    const pkg = repo.packages.find((item) => item.name === packageRow.dataset.dashboardPackage);
    const entry = pkg?.files.find((file) => file.kind === "entrypoint") || pkg?.files[0];
    if (entry) {
      void selectFile(entry.path);
      setView("package");
    }
    return;
  }
  const viewButton = event.target.closest("[data-dashboard-view]");
  if (viewButton) {
    setView(viewButton.dataset.dashboardView || "package");
    return;
  }
  const actionButton = event.target.closest("[data-dashboard-action]");
  if (actionButton?.dataset.dashboardAction === "checks") {
    renderChecks();
    renderReviewGate();
    renderDashboard();
    renderPackageIndex();
    updateRegistryPreview();
    const summary = lintSummary();
    if (syncState) syncState.textContent = `Checked: ${summary.failCount} fail, ${summary.warnCount} warn`;
  }
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
  if (
    settingsPopover.contains(event.target) ||
    settingsToggle.contains(event.target) ||
    [...importOpenButtons].some((button) => button.contains(event.target))
  ) return;
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

importOpenButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    settingsPopover?.classList.remove("hidden");
    settingsToggle?.setAttribute("aria-expanded", "true");
    repoInput?.focus();
  });
});

tutorialToggle?.addEventListener("click", () => {
  const nextVisible = tutorialPanel?.classList.contains("hidden");
  if (nextVisible) setTutorialStep(0);
  else setTutorialPanelVisible(false);
});

tutorialDismiss?.addEventListener("click", () => setTutorialPanelVisible(false));
tutorialPrev?.addEventListener("click", () => setTutorialStep(tutorialStepIndex - 1));
tutorialNext?.addEventListener("click", () => setTutorialStep(tutorialStepIndex + 1));
tutorialApply?.addEventListener("click", () => void runTutorialStepAction());

document.querySelector("[data-import-repo]")?.addEventListener("click", () => void loadRepoFromInput());
document.querySelector("[data-import-folder]")?.addEventListener("click", () => folderInput?.click());
document.querySelectorAll("[data-create-package]").forEach((button) => button.addEventListener("click", createNewPackage));
document.querySelector("[data-rename-package]")?.addEventListener("click", renameSelectedPackage);
document.querySelector("[data-delete-package]")?.addEventListener("click", () => deleteSelectedPackage());
document.querySelectorAll("[data-create-file]").forEach((button) => {
  button.addEventListener("click", () => createFileFromTemplate(button.dataset.createFile));
});
document.querySelector("[data-rename-file]")?.addEventListener("click", renameSelectedFile);
document.querySelector("[data-delete-file]")?.addEventListener("click", () => deleteSelectedFile());
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
  renderReviewGate();
  renderProvenance();
  renderEvidenceSummary();
  renderPackageFacts();
  renderPackageIndex();
  updateInstallCommand();
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
    renderReviewGate();
    renderProvenance();
    renderEvidenceSummary();
    renderPackageFacts();
    renderPackageIndex();
    updateInstallCommand();
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
    renderPackageIndex();
  });
});

document.querySelector("[data-run-checks]")?.addEventListener("click", () => {
  renderChecks();
  renderReviewGate();
  renderProvenance();
  renderEvidenceSummary();
  renderPackageIndex();
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
setTutorialPanelVisible(localStorage.getItem(TUTORIAL_FINISHED_KEY) !== "true");
void selectFile("skills/skill-creator/SKILL.md");
setView(["dashboard", "package", "edit", "preview", "diff", "registry"].includes(window.location.hash.slice(1)) ? window.location.hash.slice(1) : "dashboard");
setZenMode(window.location.hash === "#zen");
if (window.location.hash === "#settings") {
  settingsPopover?.classList.remove("hidden");
  settingsToggle?.setAttribute("aria-expanded", "true");
}
