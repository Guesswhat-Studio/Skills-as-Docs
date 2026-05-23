import type { InstallSnippetOptions, SkillPackage } from "./types.js";
import { isApprovedStatus } from "./approval.js";
import { lintPackage } from "./lint.js";

export const DEFAULT_AGENTS = ["codex", "claude-code", "antigravity"] as const;

export function generateInstallCommand(source: string, skillName: string, agent: string, global = true): string {
  const globalFlag = global ? " -g" : "";
  return `npx skills add ${source} --skill ${skillName}${globalFlag} -a ${agent}`;
}

export function generateInstallSnippets(packages: SkillPackage[], options: InstallSnippetOptions): Record<string, string[]> {
  const agents = options.agents?.length ? options.agents : [...DEFAULT_AGENTS];
  const snippets: Record<string, string[]> = {};
  for (const pkg of packages) {
    if (!options.includeUnapproved && (!isApprovedStatus(pkg.frontmatter) || lintPackage(pkg, options.policy).risk === "high")) {
      continue;
    }
    snippets[pkg.name] = agents.map((agent) => generateInstallCommand(options.source, pkg.name, agent, options.global ?? true));
  }
  return snippets;
}
