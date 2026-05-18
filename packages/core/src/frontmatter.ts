import type { ParsedFrontmatter, SkillFrontmatter } from "./types.js";

export function parseFrontmatter(content: string): ParsedFrontmatter {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) {
    return { data: {}, body: content, hasFrontmatter: false };
  }

  return {
    data: parseSimpleYaml(match[1] ?? ""),
    body: content.slice(match[0].length),
    hasFrontmatter: true
  };
}

export function stringifyFrontmatter(data: SkillFrontmatter, body: string): string {
  const lines = Object.entries(data)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}: ${value ?? ""}`);
  return `---\n${lines.join("\n")}\n---\n\n${body.replace(/^\n+/, "")}`;
}

export function setFrontmatterFields(
  content: string,
  patch: SkillFrontmatter,
  requiredKeys: string[] = []
): string {
  const parsed = parseFrontmatter(content);
  const data = { ...parsed.data };
  for (const [key, value] of Object.entries(patch)) {
    const normalized = value?.trim() ?? "";
    if (!normalized && !requiredKeys.includes(key)) {
      delete data[key];
    } else {
      data[key] = normalized;
    }
  }
  return stringifyFrontmatter(data, parsed.body);
}

function parseSimpleYaml(raw: string): SkillFrontmatter {
  const data: SkillFrontmatter = {};
  for (const line of raw.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const index = line.indexOf(":");
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    if (!key) continue;
    data[key] = stripYamlQuotes(value);
  }
  return data;
}

function stripYamlQuotes(value: string): string {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}
