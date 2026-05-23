export type SkillFileKind = "entrypoint" | "supporting" | "script" | "asset" | "evidence";

export type ReviewStatus =
  | "candidate"
  | "in_review"
  | "approved"
  | "rejected"
  | "deprecated"
  | "retired"
  | "draft"
  | "review";

export type SkillSourceType = "manual" | "public_import" | "generated" | "evolved" | "internal_template";

export interface SkillFrontmatter {
  name?: string;
  description?: string;
  category?: string;
  topics?: string;
  version?: string;
  owner?: string;
  review_status?: ReviewStatus | string;
  source_type?: SkillSourceType | string;
  source_url?: string;
  source_commit?: string;
  imported_at?: string;
  imported_by?: string;
  generator?: string;
  upstream?: string;
  approved_by?: string;
  approved_at?: string;
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
  content?: string;
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

export type PolicyMode = "advisory" | "strict";
export type PolicyOwnerRequirement = "off" | "approved" | "all";

export interface SkillPolicy {
  mode?: PolicyMode;
  /**
   * Minimum repository risk that should fail CI/CLI policy checks.
   * Advisory mode defaults to "high"; strict mode keeps the same default
   * but upgrades governance gaps to errors.
   */
  failOnRisk?: RiskLevel;
  requireOwner?: PolicyOwnerRequirement;
  requireReviewStatus?: boolean;
  requireProvenanceFor?: string[];
  requireEvidenceForApproved?: string[];
}

export interface RegistrySource {
  repository?: string;
  branch?: string;
  commit?: string;
}

export interface RegistryOptions {
  source?: RegistrySource;
  generatedAt?: string;
  approvedOnly?: boolean;
  policy?: SkillPolicy;
}

export interface InstallSnippetOptions {
  source: string;
  agents?: string[];
  global?: boolean;
  includeUnapproved?: boolean;
  policy?: SkillPolicy;
}
