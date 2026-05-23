import type {
  LintIssue,
  PackageLintResult,
  RepositoryLintResult,
  RiskLevel,
  SkillPolicy,
  SkillPackage,
  SkillRepository
} from "./types.js";
import { isKnownReviewStatus, isKnownSourceType, normalizeReviewStatus } from "./approval.js";

const MIN_DESCRIPTION_LENGTH = 40;
const LARGE_ASSET_BYTES = 1024 * 1024;
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
const GOVERNED_SOURCE_TYPES = ["public_import", "generated", "evolved"];
const RISK_RANK: Record<RiskLevel, number> = {
  low: 0,
  medium: 1,
  high: 2
};

export const ADVISORY_POLICY: Required<SkillPolicy> = {
  mode: "advisory",
  failOnRisk: "high",
  requireOwner: "approved",
  requireReviewStatus: false,
  requireProvenanceFor: GOVERNED_SOURCE_TYPES,
  requireEvidenceForApproved: GOVERNED_SOURCE_TYPES
};

export const STRICT_POLICY: Required<SkillPolicy> = {
  mode: "strict",
  failOnRisk: "high",
  requireOwner: "all",
  requireReviewStatus: true,
  requireProvenanceFor: GOVERNED_SOURCE_TYPES,
  requireEvidenceForApproved: GOVERNED_SOURCE_TYPES
};

export function resolvePolicy(policy?: SkillPolicy | "advisory" | "strict"): Required<SkillPolicy> {
  if (policy === "strict") return STRICT_POLICY;
  if (policy === "advisory") return ADVISORY_POLICY;
  const base = policy?.mode === "strict" ? STRICT_POLICY : ADVISORY_POLICY;
  return {
    ...base,
    ...policy,
    requireProvenanceFor: policy?.requireProvenanceFor ?? base.requireProvenanceFor,
    requireEvidenceForApproved: policy?.requireEvidenceForApproved ?? base.requireEvidenceForApproved
  };
}

export function shouldFailLint(result: RepositoryLintResult | PackageLintResult, policy?: SkillPolicy | "advisory" | "strict"): boolean {
  const resolved = resolvePolicy(policy);
  return RISK_RANK[result.risk] >= RISK_RANK[resolved.failOnRisk];
}

export function lintRepository(repository: SkillRepository, policy?: SkillPolicy | "advisory" | "strict"): RepositoryLintResult {
  const resolvedPolicy = resolvePolicy(policy);
  const packageResults = repository.packages.map((pkg) => lintPackage(pkg, resolvedPolicy));
  const issues = [
    ...repository.ignoredSkillDirs.map((dir): LintIssue => ({
      id: "package.missing-entrypoint",
      severity: "error",
      path: `${dir}/SKILL.md`,
      message: `Package directory ${dir} is missing SKILL.md.`
    })),
    ...packageResults.flatMap((result) => result.issues)
  ];

  return {
    risk: riskFromIssues(issues),
    packages: packageResults,
    issues
  };
}

function lintPackageWithPolicy(pkg: SkillPackage, policy: Required<SkillPolicy>): PackageLintResult {
  const issues: LintIssue[] = [];
  const entry = pkg.files.find((file) => file.kind === "entrypoint");
  const reviewStatus = pkg.frontmatter.review_status;
  const normalizedStatus = normalizeReviewStatus(reviewStatus);
  const sourceType = pkg.frontmatter.source_type;
  const evidenceFiles = pkg.files.filter((file) => file.kind === "evidence");
  const requiresGovernedEvidence = sourceType ? policy.requireEvidenceForApproved.includes(sourceType) : false;
  const requiresGovernedProvenance = sourceType ? policy.requireProvenanceFor.includes(sourceType) : false;

  if (!entry) {
    issues.push(issue("package.missing-entrypoint", "error", pkg, `${pkg.root}/SKILL.md`, "Package is missing SKILL.md."));
  }

  if (!pkg.frontmatter.name?.trim()) {
    issues.push(issue("frontmatter.name.required", "error", pkg, pkg.entrypoint, "SKILL.md frontmatter must include name."));
  }

  if (!pkg.frontmatter.description?.trim()) {
    issues.push(issue("frontmatter.description.required", "error", pkg, pkg.entrypoint, "SKILL.md frontmatter must include description."));
  } else if (pkg.frontmatter.description.trim().length < MIN_DESCRIPTION_LENGTH) {
    issues.push(issue(
      "frontmatter.description.too-short",
      "warning",
      pkg,
      pkg.entrypoint,
      `Description should be at least ${MIN_DESCRIPTION_LENGTH} characters and explain when to use the skill.`
    ));
  }

  if (pkg.frontmatter.name && pkg.frontmatter.name !== pkg.name) {
    issues.push(issue(
      "frontmatter.name.folder-mismatch",
      "warning",
      pkg,
      pkg.entrypoint,
      `Frontmatter name "${pkg.frontmatter.name}" differs from folder name "${pkg.name}".`
    ));
  }

  if (reviewStatus && !isKnownReviewStatus(reviewStatus)) {
    issues.push(issue(
      "frontmatter.review-status.unknown",
      policy.requireReviewStatus ? "error" : "warning",
      pkg,
      pkg.entrypoint,
      `Review status "${reviewStatus}" is not a known Skills Charter lifecycle value.`
    ));
  } else if (!reviewStatus && policy.requireReviewStatus) {
    issues.push(issue(
      "frontmatter.review-status.required",
      "error",
      pkg,
      pkg.entrypoint,
      "Strict policy requires review_status so packages cannot silently default to candidate."
    ));
  }

  if (sourceType && !isKnownSourceType(sourceType)) {
    issues.push(issue(
      "frontmatter.source-type.unknown",
      "warning",
      pkg,
      pkg.entrypoint,
      `Source type "${sourceType}" is not one of manual, public_import, generated, evolved, or internal_template.`
    ));
  }

  const ownerRequired = policy.requireOwner === "all" || (policy.requireOwner === "approved" && normalizedStatus === "approved");
  if (ownerRequired && !pkg.frontmatter.owner?.trim()) {
    issues.push(issue(
      "approval.owner-required",
      "error",
      pkg,
      pkg.entrypoint,
      policy.requireOwner === "all"
        ? "Policy requires every package to declare an owner."
        : "Approved packages must declare an owner."
    ));
  }

  if (normalizedStatus === "approved" && requiresGovernedEvidence && evidenceFiles.length === 0) {
    issues.push(issue(
      policy.mode === "strict" ? "approval.evidence-required" : "approval.evidence-recommended",
      policy.mode === "strict" ? "error" : "warning",
      pkg,
      pkg.entrypoint,
      policy.mode === "strict"
        ? "Strict policy requires Git-tracked evidence before approving public, generated, or evolved packages."
        : "Approved public, generated, or evolved packages should include evals, reports, review-notes, or trigger-samples evidence."
    ));
  }

  if (requiresGovernedProvenance && !pkg.frontmatter.source_url?.trim() && !pkg.frontmatter.upstream?.trim() && !pkg.frontmatter.generator?.trim()) {
    issues.push(issue(
      "provenance.source-required",
      policy.mode === "strict" ? "error" : "warning",
      pkg,
      pkg.entrypoint,
      policy.mode === "strict"
        ? "Strict policy requires source_url, upstream, or generator provenance for public, generated, or evolved packages."
        : "Imported, generated, or evolved packages should declare source_url, upstream, or generator provenance."
    ));
  }

  for (const file of pkg.files) {
    if (!file.path.startsWith(`${pkg.root}/`)) {
      issues.push(issue("package.boundary", "error", pkg, file.path, "Package file is outside its skill root."));
    }
    if (file.kind === "script") {
      issues.push(issue("script.review-required", "warning", pkg, file.path, "Scripts require human review before approval."));
      if (file.content && SUSPICIOUS_SCRIPT_PATTERNS.some((pattern) => pattern.test(file.content ?? ""))) {
        issues.push(issue("script.suspicious-command", "warning", pkg, file.path, "Script contains shell, network, destructive, or encoded-command patterns that require careful review."));
      }
    }
    if (file.kind === "asset") {
      issues.push(issue("asset.review-required", "warning", pkg, file.path, "Assets and binary-like files require provenance and size review."));
      if (file.size > LARGE_ASSET_BYTES) {
        issues.push(issue("asset.large-file", "warning", pkg, file.path, "Large assets should be reviewed before packaging into an installable skill."));
      }
    }
    if (DEPENDENCY_FILE_PATTERN.test(file.path)) {
      issues.push(issue("dependency.review-required", "warning", pkg, file.path, "Dependency manifests can change runtime behavior and require review."));
    }
    if (file.content && SECRET_PATTERNS.some((pattern) => pattern.test(file.content ?? ""))) {
      issues.push(issue("secret.possible-token", "error", pkg, file.path, "Possible API key or access token found in package content."));
    }
    if (file.content) {
      const urls = [...file.content.matchAll(EXTERNAL_URL_PATTERN)].map((match) => match[0]);
      if (urls.length > 0) {
        issues.push(issue("external-url.review-required", "warning", pkg, file.path, `External URLs require provenance review (${urls.length} found).`));
      }
    }
  }

  return {
    packageName: pkg.name,
    risk: riskFromIssues(issues),
    issues
  };
}

export function lintPackage(pkg: SkillPackage, policy?: SkillPolicy | "advisory" | "strict"): PackageLintResult {
  return lintPackageWithPolicy(pkg, resolvePolicy(policy));
}

export function riskFromIssues(issues: LintIssue[]): RiskLevel {
  if (issues.some((issue) => issue.severity === "error")) return "high";
  if (issues.some((issue) => issue.severity === "warning")) return "medium";
  return "low";
}

function issue(
  id: string,
  severity: "error" | "warning",
  pkg: SkillPackage,
  path: string,
  message: string
): LintIssue {
  return {
    id,
    severity,
    packageName: pkg.name,
    path,
    message
  };
}
