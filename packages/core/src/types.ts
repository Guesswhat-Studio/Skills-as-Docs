export type SkillFileKind = "entrypoint" | "supporting" | "script" | "asset";

export type ReviewStatus = "draft" | "review" | "approved";

export interface SkillFrontmatter {
  name?: string;
  description?: string;
  category?: string;
  version?: string;
  owner?: string;
  review_status?: ReviewStatus | string;
  source_url?: string;
  license?: string;
  [key: string]: string | undefined;
}

export interface ParsedFrontmatter {
  data: SkillFrontmatter;
  body: string;
  hasFrontmatter: boolean;
}

export interface SkillFile {
  path: string;
  absolutePath: string;
  kind: SkillFileKind;
  size: number;
  changed: boolean;
}

export interface SkillPackage {
  name: string;
  root: `skills/${string}`;
  entrypoint: `skills/${string}/SKILL.md`;
  frontmatter: SkillFrontmatter;
  files: SkillFile[];
}

export interface SkillRepository {
  rootDir: string;
  packages: SkillPackage[];
  ignoredSkillDirs: string[];
}

export type LintSeverity = "error" | "warning";

export interface LintIssue {
  id: string;
  severity: LintSeverity;
  packageName?: string;
  path?: string;
  message: string;
}

export type RiskLevel = "low" | "medium" | "high";

export interface PackageLintResult {
  packageName: string;
  risk: RiskLevel;
  issues: LintIssue[];
}

export interface RepositoryLintResult {
  risk: RiskLevel;
  packages: PackageLintResult[];
  issues: LintIssue[];
}

export interface RegistrySource {
  repository?: string;
  branch?: string;
  commit?: string;
}

export interface RegistryOptions {
  source?: RegistrySource;
  generatedAt?: string;
}

export interface InstallSnippetOptions {
  source: string;
  agents?: string[];
  global?: boolean;
}
