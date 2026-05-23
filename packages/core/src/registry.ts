import { lintPackage } from "./lint.js";
import { generateInstallSnippets } from "./install-snippets.js";
import { isApprovedStatus, normalizeReviewStatus } from "./approval.js";
import type { RegistryOptions, SkillPackage } from "./types.js";

export interface SkillRegistry {
  $schema: "https://skills-charter.dev/schemas/skills-registry.v0.json";
  schema_version: "skills-charter.registry.v0";
  generated_at: string;
  source: {
    repository?: string;
    branch?: string;
    commit?: string;
  };
  packages: SkillRegistryPackage[];
}

export interface SkillRegistryPackage {
  name: string;
  path: string;
  entrypoint: string;
  description: string;
  category?: string;
  topics?: string;
  version?: string;
  owner?: string;
  review_status?: string;
  lifecycle: string;
  provenance?: {
    source_type?: string;
    source_url?: string;
    source_commit?: string;
    imported_at?: string;
    imported_by?: string;
    generator?: string;
    upstream?: string;
    approved_by?: string;
    approved_at?: string;
  };
  evidence?: {
    evals: string[];
    reports: string[];
    review_notes: string[];
    trigger_samples: string[];
  };
  risk: string;
  risk_reasons: string[];
  files: Array<{
    path: string;
    kind: string;
    size: number;
  }>;
  install?: string[];
}

export function generateRegistry(packages: SkillPackage[], options: RegistryOptions & { installSource?: string } = {}): SkillRegistry {
  const installSnippets = options.installSource
    ? generateInstallSnippets(packages, { source: options.installSource, policy: options.policy })
    : undefined;
  const registryPackages = options.approvedOnly
    ? packages.filter((pkg) => isApprovedStatus(pkg.frontmatter) && lintPackage(pkg, options.policy).risk !== "high")
    : packages;

  return {
    $schema: "https://skills-charter.dev/schemas/skills-registry.v0.json",
    schema_version: "skills-charter.registry.v0",
    generated_at: options.generatedAt ?? new Date().toISOString(),
    source: {
      repository: options.source?.repository,
      branch: options.source?.branch,
      commit: options.source?.commit
    },
    packages: registryPackages.map((pkg) => {
      const lint = lintPackage(pkg, options.policy);
      return {
        name: pkg.frontmatter.name || pkg.name,
        path: pkg.root,
        entrypoint: pkg.entrypoint,
        description: pkg.frontmatter.description || "",
        category: emptyToUndefined(pkg.frontmatter.category),
        topics: emptyToUndefined(pkg.frontmatter.topics),
        version: emptyToUndefined(pkg.frontmatter.version),
        owner: emptyToUndefined(pkg.frontmatter.owner),
        review_status: emptyToUndefined(pkg.frontmatter.review_status),
        lifecycle: normalizeReviewStatus(pkg.frontmatter.review_status),
        provenance: provenanceFor(pkg),
        evidence: evidenceFor(pkg),
        risk: lint.risk,
        risk_reasons: lint.issues.map((issue) => issue.id),
        files: pkg.files.map((file) => ({
          path: file.path,
          kind: file.kind,
          size: file.size
        })),
        install: installSnippets?.[pkg.name]
      };
    })
  };
}

function emptyToUndefined(value: string | undefined): string | undefined {
  return value?.trim() ? value : undefined;
}

function provenanceFor(pkg: SkillPackage): SkillRegistryPackage["provenance"] | undefined {
  const provenance = {
    source_type: emptyToUndefined(pkg.frontmatter.source_type),
    source_url: emptyToUndefined(pkg.frontmatter.source_url),
    source_commit: emptyToUndefined(pkg.frontmatter.source_commit),
    imported_at: emptyToUndefined(pkg.frontmatter.imported_at),
    imported_by: emptyToUndefined(pkg.frontmatter.imported_by),
    generator: emptyToUndefined(pkg.frontmatter.generator),
    upstream: emptyToUndefined(pkg.frontmatter.upstream),
    approved_by: emptyToUndefined(pkg.frontmatter.approved_by),
    approved_at: emptyToUndefined(pkg.frontmatter.approved_at)
  };
  return Object.values(provenance).some(Boolean) ? provenance : undefined;
}

function evidenceFor(pkg: SkillPackage): SkillRegistryPackage["evidence"] | undefined {
  const evidence = {
    evals: pathsMatching(pkg, "/evals/"),
    reports: pathsMatching(pkg, "/reports/"),
    review_notes: pathsMatching(pkg, "/review-notes/"),
    trigger_samples: pathsMatching(pkg, "/trigger-samples/")
  };
  return Object.values(evidence).some((paths) => paths.length > 0) ? evidence : undefined;
}

function pathsMatching(pkg: SkillPackage, needle: string): string[] {
  return pkg.files
    .map((file) => file.path)
    .filter((filePath) => filePath.includes(needle));
}
