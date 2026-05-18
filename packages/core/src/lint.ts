import type {
  LintIssue,
  PackageLintResult,
  RepositoryLintResult,
  RiskLevel,
  SkillPackage,
  SkillRepository
} from "./types.js";

const MIN_DESCRIPTION_LENGTH = 40;

export function lintRepository(repository: SkillRepository): RepositoryLintResult {
  const packageResults = repository.packages.map(lintPackage);
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

export function lintPackage(pkg: SkillPackage): PackageLintResult {
  const issues: LintIssue[] = [];
  const entry = pkg.files.find((file) => file.kind === "entrypoint");

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

  for (const file of pkg.files) {
    if (!file.path.startsWith(`${pkg.root}/`)) {
      issues.push(issue("package.boundary", "error", pkg, file.path, "Package file is outside its skill root."));
    }
    if (file.kind === "script") {
      issues.push(issue("script.review-required", "warning", pkg, file.path, "Scripts require human review before approval."));
    }
  }

  return {
    packageName: pkg.name,
    risk: riskFromIssues(issues),
    issues
  };
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
