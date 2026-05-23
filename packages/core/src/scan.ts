import { promises as fs } from "node:fs";
import path from "node:path";
import { parseFrontmatter } from "./frontmatter.js";
import type { SkillFile, SkillFileKind, SkillPackage, SkillRepository } from "./types.js";

const POSIX_SEP = "/";

export async function scanSkillRepository(rootDir: string): Promise<SkillRepository> {
  const resolvedRoot = path.resolve(rootDir);
  const skillsDir = path.join(resolvedRoot, "skills");
  const packages: SkillPackage[] = [];
  const ignoredSkillDirs: string[] = [];

  if (!(await exists(skillsDir))) {
    return { rootDir: resolvedRoot, packages, ignoredSkillDirs };
  }

  const entries = await fs.readdir(skillsDir, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory()) continue;

    const packageName = entry.name;
    const packageRootAbs = path.join(skillsDir, packageName);
    const entrypointAbs = path.join(packageRootAbs, "SKILL.md");
    const packageRoot = toRepoPath(path.relative(resolvedRoot, packageRootAbs)) as `skills/${string}`;
    const entrypoint = `${packageRoot}/SKILL.md` as `skills/${string}/SKILL.md`;

    if (!(await exists(entrypointAbs))) {
      ignoredSkillDirs.push(packageRoot);
      continue;
    }

    const files = await collectPackageFiles(resolvedRoot, packageRootAbs);
    const entryContent = await fs.readFile(entrypointAbs, "utf8");
    packages.push({
      name: packageName,
      root: packageRoot,
      entrypoint,
      frontmatter: parseFrontmatter(entryContent).data,
      files
    });
  }

  return { rootDir: resolvedRoot, packages, ignoredSkillDirs };
}

export function detectFileKind(repoPath: string): SkillFileKind {
  if (repoPath.endsWith("/SKILL.md")) return "entrypoint";
  if (repoPath.includes("/scripts/")) return "script";
  if (
    repoPath.includes("/evals/")
    || repoPath.includes("/reports/")
    || repoPath.includes("/review-notes/")
    || repoPath.includes("/trigger-samples/")
  ) {
    return "evidence";
  }
  if (
    repoPath.includes("/assets/")
    || /\.(png|jpe?g|gif|webp|pdf|xlsx?|pptx?|docx?|zip|gz|tar|ico|ttf|otf|woff2?)$/i.test(repoPath)
  ) {
    return "asset";
  }
  return "supporting";
}

async function collectPackageFiles(rootDir: string, packageRootAbs: string): Promise<SkillFile[]> {
  const files: SkillFile[] = [];
  await walk(packageRootAbs, async (absolutePath) => {
    const stat = await fs.stat(absolutePath);
    if (!stat.isFile()) return;
    const repoPath = toRepoPath(path.relative(rootDir, absolutePath));
    const metadata = await readFileMetadata(absolutePath, repoPath, stat.size);
    files.push({
      path: repoPath,
      absolutePath,
      kind: detectFileKind(repoPath),
      size: metadata.size,
      changed: false,
      content: metadata.content
    });
  });
  return files.sort((a, b) => {
    if (a.kind === "entrypoint") return -1;
    if (b.kind === "entrypoint") return 1;
    return a.path.localeCompare(b.path);
  });
}

async function readFileMetadata(absolutePath: string, repoPath: string, size: number): Promise<{ size: number; content?: string }> {
  if (isLikelyBinary(repoPath)) return { size };
  try {
    const content = await fs.readFile(absolutePath, "utf8");
    const normalizedSize = Buffer.byteLength(content.replace(/\r\n/g, "\n"), "utf8");
    return {
      size: normalizedSize,
      content: size > 256 * 1024 ? undefined : content
    };
  } catch {
    return { size };
  }
}

function isLikelyBinary(repoPath: string): boolean {
  return /\.(png|jpe?g|gif|webp|pdf|xlsx?|pptx?|docx?|zip|gz|tar|ico|ttf|otf|woff2?)$/i.test(repoPath);
}

async function walk(dir: string, visit: (absolutePath: string) => Promise<void>): Promise<void> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(absolutePath, visit);
    } else {
      await visit(absolutePath);
    }
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

function toRepoPath(value: string): string {
  return value.split(path.sep).join(POSIX_SEP);
}
