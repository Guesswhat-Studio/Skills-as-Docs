import { lintPackage } from "./lint.js";
import { generateInstallSnippets } from "./install-snippets.js";
import type { RegistryOptions, SkillPackage } from "./types.js";

export interface SkillRegistry {
  $schema: "https://agent-skilldocs.dev/schemas/skills-registry.v0.json";
  schema_version: "skilldocs.registry.v0";
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
  version?: string;
  owner?: string;
  review_status?: string;
  risk: string;
  files: Array<{
    path: string;
    kind: string;
    size: number;
  }>;
  install?: string[];
}

export function generateRegistry(packages: SkillPackage[], options: RegistryOptions & { installSource?: string } = {}): SkillRegistry {
  const installSnippets = options.installSource
    ? generateInstallSnippets(packages, { source: options.installSource })
    : undefined;

  return {
    $schema: "https://agent-skilldocs.dev/schemas/skills-registry.v0.json",
    schema_version: "skilldocs.registry.v0",
    generated_at: options.generatedAt ?? new Date().toISOString(),
    source: {
      repository: options.source?.repository,
      branch: options.source?.branch,
      commit: options.source?.commit
    },
    packages: packages.map((pkg) => {
      const lint = lintPackage(pkg);
      return {
        name: pkg.frontmatter.name || pkg.name,
        path: pkg.root,
        entrypoint: pkg.entrypoint,
        description: pkg.frontmatter.description || "",
        category: emptyToUndefined(pkg.frontmatter.category),
        version: emptyToUndefined(pkg.frontmatter.version),
        owner: emptyToUndefined(pkg.frontmatter.owner),
        review_status: emptyToUndefined(pkg.frontmatter.review_status),
        risk: lint.risk,
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
