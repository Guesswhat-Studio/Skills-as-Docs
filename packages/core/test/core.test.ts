import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import {
  generateInstallCommand,
  generateRegistry,
  lintRepository,
  parseFrontmatter,
  scanSkillRepository,
  shouldFailLint,
  setFrontmatterFields
} from "../src/index.js";

test("parses and rewrites simple SKILL.md frontmatter", () => {
  const content = `---\nname: literature-review\ndescription: Use this skill when a user needs evidence synthesis.\n---\n\n# Literature Review\n`;
  const parsed = parseFrontmatter(content);
  assert.equal(parsed.data.name, "literature-review");
  assert.equal(parsed.body.trim(), "# Literature Review");

  const next = setFrontmatterFields(content, { owner: "@research", category: "" });
  assert.match(next, /owner: @research/);
  assert.doesNotMatch(next, /category:/);
});

test("parses CRLF frontmatter from Windows git checkouts", () => {
  const parsed = parseFrontmatter("---\r\nname: pdf\r\ndescription: Use this skill when working with PDF files.\r\n---\r\n\r\n# PDF\r\n");
  assert.equal(parsed.data.name, "pdf");
  assert.equal(parsed.body.trim(), "# PDF");
});

test("scans a git-style skills repository and lints package risk", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "skills-charter-core-"));
  try {
    await writeSkill(root, "literature-review", {
      skill: `---\nname: literature-review\ndescription: Use this skill when a user needs a structured literature review workflow with evidence extraction.\ncategory: research\nversion: 0.1.0\nreview_status: draft\n---\n\n# Literature Review\n`,
      files: {
        "references/rubric.md": "# Rubric\n",
        "scripts/extract.py": "print('extract')\n",
        "assets/brand.ttf": "fake-font"
      }
    });
    await mkdir(path.join(root, "skills", "missing-entrypoint"), { recursive: true });
    await writeFile(path.join(root, "skills", "missing-entrypoint", "README.md"), "# Missing\n");

    const repo = await scanSkillRepository(root);
    assert.equal(repo.packages.length, 1);
    assert.equal(repo.packages[0]?.files.length, 4);
    assert.equal(repo.packages[0]?.files.find((file) => file.path.endsWith("brand.ttf"))?.kind, "asset");
    assert.deepEqual(repo.ignoredSkillDirs, ["skills/missing-entrypoint"]);

    const lint = lintRepository(repo);
    assert.equal(lint.risk, "high");
    assert.equal(lint.packages[0]?.risk, "medium");
    assert.ok(lint.issues.some((issue) => issue.id === "script.review-required"));
    assert.ok(lint.issues.some((issue) => issue.id === "package.missing-entrypoint"));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("normalizes text file sizes across CRLF working trees", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "skills-charter-crlf-size-"));
  try {
    await writeSkill(root, "windows-checkout", {
      skill: "---\r\nname: windows-checkout\r\ndescription: Use this skill when testing registry file sizes from Windows checkouts.\r\n---\r\n\r\n# Windows Checkout\r\n",
      files: {
        "references/notes.md": "# Notes\r\n\r\nLine two\r\n"
      }
    });

    const repo = await scanSkillRepository(root);
    const entrypoint = repo.packages[0]?.files.find((file) => file.path.endsWith("/SKILL.md"));
    const notes = repo.packages[0]?.files.find((file) => file.path.endsWith("/references/notes.md"));

    assert.equal(entrypoint?.size, Buffer.byteLength(entrypoint.content?.replace(/\r\n/g, "\n") ?? "", "utf8"));
    assert.equal(notes?.size, Buffer.byteLength("# Notes\n\nLine two\n", "utf8"));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("generates deterministic registry packages and npx skills commands", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "skills-charter-registry-"));
  try {
    await writeSkill(root, "coding-standards", {
      skill: `---\nname: coding-standards\ndescription: Use this skill when a user needs repository coding standards applied during implementation.\ncategory: coding/frontend\ntopics: review, standards\nowner: @platform\n---\n\n# Coding Standards\n`,
      files: {
        "templates/review.md": "# Review\n"
      }
    });

    const repo = await scanSkillRepository(root);
    const registry = generateRegistry(repo.packages, {
      generatedAt: "2026-05-18T00:00:00.000Z",
      source: { repository: "org/team-skills", branch: "main" },
      installSource: "org/team-skills"
    });

    assert.equal(registry.$schema, "https://skills-charter.dev/schemas/skills-registry.v0.json");
    assert.equal(registry.schema_version, "skills-charter.registry.v0");
    assert.equal(registry.packages[0]?.name, "coding-standards");
    assert.equal(registry.packages[0]?.category, "coding/frontend");
    assert.equal(registry.packages[0]?.topics, "review, standards");
    assert.equal(registry.packages[0]?.risk, "low");
    assert.equal(registry.packages[0]?.lifecycle, "candidate");
    assert.equal(registry.packages[0]?.install, undefined);
    assert.equal(generateInstallCommand(".", "coding-standards", "antigravity"), "npx skills add . --skill coding-standards -g -a antigravity");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("registry emits install commands only for approved packages without hard errors", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "skills-charter-approved-"));
  try {
    await writeSkill(root, "approved-review", {
      skill: `---\nname: approved-review\ndescription: Use this skill when a user needs approved code review guidance for a repository.\nowner: @platform\nreview_status: approved\nsource_type: manual\n---\n\n# Approved Review\n`
    });
    await writeSkill(root, "candidate-review", {
      skill: `---\nname: candidate-review\ndescription: Use this skill when a user needs candidate code review guidance for a repository.\nowner: @platform\nreview_status: candidate\nsource_type: generated\ngenerator: claude-skill-creator\n---\n\n# Candidate Review\n`
    });
    await writeSkill(root, "broken-approved", {
      skill: `---\nname: broken-approved\ndescription: Use this skill when a user needs broken approved guidance for testing.\nreview_status: approved\nsource_type: manual\n---\n\n# Broken Approved\n`
    });

    const repo = await scanSkillRepository(root);
    const registry = generateRegistry(repo.packages, {
      generatedAt: "2026-05-18T00:00:00.000Z",
      source: { repository: "org/team-skills" },
      installSource: "org/team-skills"
    });
    const approvedOnlyRegistry = generateRegistry(repo.packages, {
      generatedAt: "2026-05-18T00:00:00.000Z",
      source: { repository: "org/team-skills" },
      installSource: "org/team-skills",
      approvedOnly: true
    });

    const approved = registry.packages.find((pkg) => pkg.name === "approved-review");
    const candidate = registry.packages.find((pkg) => pkg.name === "candidate-review");
    const broken = registry.packages.find((pkg) => pkg.name === "broken-approved");

    assert.equal(approved?.install?.[0], "npx skills add org/team-skills --skill approved-review -g -a codex");
    assert.equal(candidate?.install, undefined);
    assert.equal(broken?.risk, "high");
    assert.equal(broken?.install, undefined);
    assert.deepEqual(approvedOnlyRegistry.packages.map((pkg) => pkg.name), ["approved-review"]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("strict policy turns governance gaps into blocking lint", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "skills-charter-strict-"));
  try {
    await writeSkill(root, "public-approved", {
      skill: `---\nname: public-approved\ndescription: Use this skill when a user needs approved public imported guidance for testing policy.\nowner: @platform\nreview_status: approved\nsource_type: public_import\nsource_url: https://github.com/example/skills/tree/main/skills/public-approved\n---\n\n# Public Approved\n`
    });

    const repo = await scanSkillRepository(root);
    const advisory = lintRepository(repo);
    const strict = lintRepository(repo, "strict");

    assert.equal(advisory.risk, "medium");
    assert.ok(advisory.issues.some((issue) => issue.id === "approval.evidence-recommended"));

    assert.equal(strict.risk, "high");
    assert.ok(strict.issues.some((issue) => issue.id === "approval.evidence-required" && issue.severity === "error"));
    assert.equal(shouldFailLint(advisory), false);
    assert.equal(shouldFailLint(strict, "strict"), true);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("registry schema file matches generated registry schema id", async () => {
  const schemaPath = path.resolve("schemas/skills-registry.v0.json");
  const schema = JSON.parse(await readFile(schemaPath, "utf8")) as { $id: string; properties: { $schema: { const: string } } };
  const registry = generateRegistry([], { generatedAt: "2026-05-18T00:00:00.000Z" });
  assert.equal(schema.$id, registry.$schema);
  assert.equal(schema.properties.$schema.const, registry.$schema);
});

async function writeSkill(
  root: string,
  name: string,
  input: { skill: string; files?: Record<string, string> }
): Promise<void> {
  const skillRoot = path.join(root, "skills", name);
  await mkdir(skillRoot, { recursive: true });
  await writeFile(path.join(skillRoot, "SKILL.md"), input.skill, "utf8");
  for (const [relativePath, content] of Object.entries(input.files ?? {})) {
    const target = path.join(skillRoot, relativePath);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, content, "utf8");
  }
}
