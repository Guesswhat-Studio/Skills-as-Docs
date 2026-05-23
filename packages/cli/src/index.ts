#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";
import {
  generateInstallSnippets,
  generateRegistry,
  lintRepository,
  scanSkillRepository,
  shouldFailLint
} from "@skills-charter/core";
import type { SkillPolicy } from "@skills-charter/core";

interface ParsedArgs {
  command: string[];
  root: string;
  options: Record<string, string | boolean>;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  if (args.command.length === 0 || args.options.help) {
    printHelp();
    return;
  }

  const [primary, secondary] = args.command;
  if (primary === "init") {
    await initSkillLibrary(args);
    return;
  }

  if (primary === "new") {
    await createSkillPackage(args);
    return;
  }

  if (primary === "scan") {
    const repo = await scanSkillRepository(args.root);
    writeJson({
      rootDir: repo.rootDir,
      packages: repo.packages.map((pkg) => ({
        name: pkg.name,
        root: pkg.root,
        entrypoint: pkg.entrypoint,
        files: pkg.files.length,
        frontmatter: pkg.frontmatter
      })),
      ignoredSkillDirs: repo.ignoredSkillDirs
    });
    return;
  }

  if (primary === "lint") {
    const repo = await scanSkillRepository(args.root);
    const policy = await loadPolicy(args);
    const result = lintRepository(repo, policy);
    if (args.options.json) {
      writeJson(result);
    } else {
      printLint(result);
    }
    process.exitCode = shouldFailLint(result, policy) ? 1 : 0;
    return;
  }

  if (primary === "generate" && secondary === "registry") {
    const repo = await scanSkillRepository(args.root);
    const policy = await loadPolicy(args);
    const generatedAt = stringOption(args, "generated-at")
      ?? (args.options.check ? await readExistingGeneratedAt(args) : undefined);
    const source = stringOption(args, "source") ?? stringOption(args, "repo");
    const registry = generateRegistry(repo.packages, {
      source: {
        repository: source,
        branch: stringOption(args, "branch"),
        commit: stringOption(args, "commit")
      },
      installSource: stringOption(args, "install-source") ?? source,
      generatedAt,
      approvedOnly: Boolean(args.options["approved-only"]),
      policy
    });
    if (args.options.check) {
      await checkOutput(args, registry);
      return;
    }
    await writeOutput(args, registry);
    return;
  }

  if (primary === "generate" && secondary === "install-snippets") {
    const repo = await scanSkillRepository(args.root);
    const policy = await loadPolicy(args);
    const source = stringOption(args, "source") ?? ".";
    const agents = stringOption(args, "agents")?.split(",").map((agent) => agent.trim()).filter(Boolean);
    const snippets = generateInstallSnippets(repo.packages, { source, agents, includeUnapproved: Boolean(args.options.all), policy });
    await writeOutput(args, snippets);
    return;
  }

  if (primary === "doctor") {
    const repo = await scanSkillRepository(args.root);
    const policy = await loadPolicy(args);
    const lint = lintRepository(repo, policy);
    const source = stringOption(args, "source") ?? ".";
    const snippets = generateInstallSnippets(repo.packages, { source, policy });
    const firstInstallable = Object.entries(snippets)[0];
    writeJson({
      rootDir: repo.rootDir,
      packages: repo.packages.length,
      ignoredSkillDirs: repo.ignoredSkillDirs,
      risk: lint.risk,
      issues: lint.issues,
      listCommand: `npx skills add ${source} --list`,
      installExample: firstInstallable
        ? firstInstallable[1][0]
        : undefined,
      installExamples: firstInstallable
        ? {
            codex: firstInstallable[1].find((command) => command.endsWith("-a codex")),
            claudeCode: firstInstallable[1].find((command) => command.endsWith("-a claude-code")),
            antigravity: firstInstallable[1].find((command) => command.endsWith("-a antigravity"))
          }
        : undefined
    });
    process.exitCode = shouldFailLint(lint, policy) ? 1 : 0;
    return;
  }

  throw new Error(`Unknown command: ${args.command.join(" ")}`);
}

async function initSkillLibrary(args: ParsedArgs): Promise<void> {
  await fs.mkdir(path.join(args.root, "skills"), { recursive: true });
  await fs.writeFile(path.join(args.root, "skills", ".gitkeep"), "", { flag: args.options.force ? "w" : "wx" }).catch((error: NodeJS.ErrnoException) => {
    if (error.code !== "EEXIST") throw error;
  });

  const registryPath = path.join(args.root, "skills.json");
  const source = stringOption(args, "source");
  if (Boolean(args.options.force) || !(await exists(registryPath))) {
    const repo = await scanSkillRepository(args.root);
    const registry = generateRegistry(repo.packages, {
      source: { repository: source },
      installSource: source,
      generatedAt: stringOption(args, "generated-at")
    });
    await fs.writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`, "utf8");
  }
  console.log(`Initialized Skills Charter library at ${args.root}`);
  console.log("Next: skills-charter new literature-review --description \"Use this skill when...\"");
}

async function createSkillPackage(args: ParsedArgs): Promise<void> {
  const rawName = args.command[1];
  if (!rawName) throw new Error("Usage: skills-charter new <skill-name>");
  const name = slugifySkillName(rawName);
  const skillRoot = path.join(args.root, "skills", name);
  const skillPath = path.join(skillRoot, "SKILL.md");
  const description = stringOption(args, "description")
    ?? "Use this skill when the user needs a clear, repeatable workflow for a specific task.";
  const category = stringOption(args, "category") ?? "workflow";
  const owner = stringOption(args, "owner") ?? "";
  const reviewStatus = stringOption(args, "review-status") ?? "candidate";
  const sourceType = stringOption(args, "source-type") ?? "manual";

  await fs.mkdir(skillRoot, { recursive: true });
  await writeFileIfAllowed(skillPath, newSkillTemplate({
    name,
    description,
    category,
    owner,
    reviewStatus,
    sourceType,
    sourceUrl: stringOption(args, "source-url"),
    generator: stringOption(args, "generator"),
    upstream: stringOption(args, "upstream")
  }), Boolean(args.options.force));
  await refreshRegistryIfPresent(args);

  console.log(`Created skills/${name}/SKILL.md`);
}

function parseArgs(raw: string[]): ParsedArgs {
  const command: string[] = [];
  const options: Record<string, string | boolean> = {};
  let root = ".";

  for (let index = 0; index < raw.length; index += 1) {
    const token = raw[index];
    if (token === "--root") {
      root = raw[index + 1] ?? ".";
      index += 1;
    } else if (token.startsWith("--")) {
      const key = token.slice(2);
      const next = raw[index + 1];
      if (!next || next.startsWith("--")) {
        options[key] = true;
      } else {
        options[key] = next;
        index += 1;
      }
    } else {
      command.push(token);
    }
  }

  return {
    command,
    root: path.resolve(root),
    options
  };
}

function stringOption(args: ParsedArgs, key: string): string | undefined {
  const value = args.options[key];
  return typeof value === "string" ? value : undefined;
}

async function loadPolicy(args: ParsedArgs): Promise<SkillPolicy | undefined> {
  const policyOption = stringOption(args, "policy");
  const policyFileOption = stringOption(args, "policy-file");
  let policy: SkillPolicy | undefined;
  let policyPath: string | undefined;
  const explicitMode = policyOption === "strict" || policyOption === "advisory";

  if (explicitMode) {
    policy = { mode: policyOption };
  } else if (policyOption) {
    policyPath = policyOption;
  }

  if (policyFileOption) policyPath = policyFileOption;
  if (!policyPath && !explicitMode) {
    const defaultPolicyPath = path.join(args.root, "skills-charter.policy.json");
    if (await exists(defaultPolicyPath)) policyPath = defaultPolicyPath;
  }

  if (policyPath) {
    const loaded = JSON.parse(await fs.readFile(path.resolve(args.root, policyPath), "utf8")) as SkillPolicy;
    policy = { ...loaded, ...policy };
  }

  const failOn = stringOption(args, "fail-on");
  if (failOn) {
    if (!["low", "medium", "high"].includes(failOn)) throw new Error("--fail-on must be low, medium, or high");
    policy = { ...policy, failOnRisk: failOn as SkillPolicy["failOnRisk"] };
  }

  return policy;
}

async function writeOutput(args: ParsedArgs, value: unknown): Promise<void> {
  const out = stringOption(args, "out");
  if (!out) {
    writeJson(value);
    return;
  }
  const target = path.resolve(out);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  console.log(`Wrote ${target}`);
}

async function checkOutput(args: ParsedArgs, value: unknown): Promise<void> {
  const out = stringOption(args, "out");
  if (!out) throw new Error("--check requires --out");
  const target = path.resolve(out);
  const expected = `${JSON.stringify(value, null, 2)}\n`;
  let current = "";
  try {
    current = await fs.readFile(target, "utf8");
  } catch {
    throw new Error(`${target} does not exist. Run the generate command without --check.`);
  }
  if (normalizeNewlines(current) !== normalizeNewlines(expected)) {
    throw new Error(`${target} is out of date. Regenerate it with skills-charter generate registry.`);
  }
  console.log(`${target} is up to date.`);
}

async function readExistingGeneratedAt(args: ParsedArgs): Promise<string | undefined> {
  const out = stringOption(args, "out");
  if (!out) return undefined;
  try {
    const current = JSON.parse(await fs.readFile(path.resolve(out), "utf8")) as { generated_at?: unknown };
    return typeof current.generated_at === "string" ? current.generated_at : undefined;
  } catch {
    return undefined;
  }
}

async function refreshRegistryIfPresent(args: ParsedArgs): Promise<void> {
  const registryPath = path.join(args.root, "skills.json");
  if (!(await exists(registryPath))) return;
  const repo = await scanSkillRepository(args.root);
  const source = stringOption(args, "source") ?? await readExistingRegistrySource(registryPath);
  const generatedAt = await readExistingGeneratedAt({ ...args, options: { ...args.options, out: registryPath } });
  const registry = generateRegistry(repo.packages, {
    source: { repository: source },
    installSource: source,
    generatedAt
  });
  await fs.writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`, "utf8");
}

async function readExistingRegistrySource(registryPath: string): Promise<string | undefined> {
  try {
    const current = JSON.parse(await fs.readFile(registryPath, "utf8")) as { source?: { repository?: unknown } };
    return typeof current.source?.repository === "string" ? current.source.repository : undefined;
  } catch {
    return undefined;
  }
}

async function writeFileIfAllowed(target: string, content: string, force: boolean): Promise<void> {
  try {
    await fs.writeFile(target, content, { encoding: "utf8", flag: force ? "w" : "wx" });
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "EEXIST") throw new Error(`${target} already exists. Pass --force to overwrite.`);
    throw error;
  }
}

async function exists(target: string): Promise<boolean> {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

function slugifySkillName(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!slug) throw new Error("Skill name must contain at least one letter or number.");
  return slug;
}

function newSkillTemplate(input: {
  name: string;
  description: string;
  category: string;
  owner: string;
  reviewStatus: string;
  sourceType: string;
  sourceUrl?: string;
  generator?: string;
  upstream?: string;
}): string {
  const optional = [
    ["source_url", input.sourceUrl],
    ["generator", input.generator],
    ["upstream", input.upstream]
  ]
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${yamlString(value ?? "")}`)
    .join("\n");
  const optionalBlock = optional ? `\n${optional}` : "";
  return `---\nname: ${yamlString(input.name)}\ndescription: ${yamlString(input.description)}\ncategory: ${yamlString(input.category)}\nversion: ${yamlString("0.1.0")}\nowner: ${yamlString(input.owner)}\nreview_status: ${yamlString(input.reviewStatus)}\nsource_type: ${yamlString(input.sourceType)}${optionalBlock}\n---\n\n# ${input.name}\n\nUse this skill when the user needs help with...\n\n## Workflow\n\n1. Clarify the user's goal and constraints.\n2. Gather the minimum required context.\n3. Execute the workflow in small, reviewable steps.\n4. Verify the output before responding.\n\n## Evidence\n\nAdd evals, reports, review notes, or trigger samples before approving generated, public, or evolved skills.\n\n## Notes\n\nAdd references, templates, examples, scripts, or assets as separate files when the skill grows beyond this entrypoint.\n`;
}

function yamlString(value: string): string {
  return JSON.stringify(value);
}

function writeJson(value: unknown): void {
  console.log(JSON.stringify(value, null, 2));
}

function printLint(result: ReturnType<typeof lintRepository>): void {
  console.log(`risk: ${result.risk}`);
  if (result.issues.length === 0) {
    console.log("No issues found.");
    return;
  }
  for (const issue of result.issues) {
    console.log(`[${issue.severity}] ${issue.id} ${issue.path ?? ""} ${issue.message}`);
  }
}

function printHelp(): void {
  console.log(`skills-charter

Git-backed management tools for Agent Skill packages.

Commands:
  skills-charter init [--root .] [--source owner/repo] [--force]
  skills-charter new <skill-name> [--root .] [--description "..."] [--category workflow] [--owner @team] [--review-status candidate] [--source-type manual]
  skills-charter scan [--root .]
  skills-charter lint [--root .] [--policy strict|advisory|skills-charter.policy.json] [--fail-on high|medium|low] [--json]
  skills-charter generate registry [--root .] [--source owner/repo] [--out skills.json] [--approved-only]
  skills-charter generate registry [--root .] [--source owner/repo] [--install-source owner/repo] [--out skills.json] --check
  skills-charter generate install-snippets [--root .] [--source owner/repo] [--agents codex,claude-code] [--all] [--policy strict]
  skills-charter doctor [--root .] [--source owner/repo] [--policy strict]
`);
}

function normalizeNewlines(value: string): string {
  return value.replace(/\r\n/g, "\n");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
