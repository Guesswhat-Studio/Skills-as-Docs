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
  const root = await mkdtemp(path.join(tmpdir(), "skilldocs-core-"));
  try {
    await writeSkill(root, "literature-review", {
      skill: `---\nname: literature-review\ndescription: Use this skill when a user needs a structured literature review workflow with evidence extraction.\ncategory: research\nversion: 0.1.0\nreview_status: draft\n---\n\n# Literature Review\n`,
      files: {
        "references/rubric.md": "# Rubric\n",
        "scripts/extract.py": "print('extract')\n"
      }
    });
    await mkdir(path.join(root, "skills", "missing-entrypoint"), { recursive: true });
    await writeFile(path.join(root, "skills", "missing-entrypoint", "README.md"), "# Missing\n");

    const repo = await scanSkillRepository(root);
    assert.equal(repo.packages.length, 1);
    assert.equal(repo.packages[0]?.files.length, 3);
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

test("generates deterministic registry packages and npx skills commands", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "skilldocs-registry-"));
  try {
    await writeSkill(root, "coding-standards", {
      skill: `---\nname: coding-standards\ndescription: Use this skill when a user needs repository coding standards applied during implementation.\nowner: @platform\n---\n\n# Coding Standards\n`,
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

    assert.equal(registry.$schema, "https://agent-skilldocs.dev/schemas/skills-registry.v0.json");
    assert.equal(registry.schema_version, "skilldocs.registry.v0");
    assert.equal(registry.packages[0]?.name, "coding-standards");
    assert.equal(registry.packages[0]?.risk, "low");
    assert.equal(registry.packages[0]?.install?.[0], "npx skills add org/team-skills --skill coding-standards -g -a codex");
    assert.equal(generateInstallCommand(".", "coding-standards", "antigravity"), "npx skills add . --skill coding-standards -g -a antigravity");
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
