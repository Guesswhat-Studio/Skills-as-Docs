import type { ReviewStatus, SkillFrontmatter } from "./types.js";

export const REVIEW_STATUSES = [
  "candidate",
  "in_review",
  "approved",
  "rejected",
  "deprecated",
  "retired",
  "draft",
  "review"
] as const;

export const SOURCE_TYPES = [
  "manual",
  "public_import",
  "generated",
  "evolved",
  "internal_template"
] as const;

export function normalizeReviewStatus(value: string | undefined): ReviewStatus {
  if (value === "draft") return "candidate";
  if (value === "review") return "in_review";
  if (isKnownReviewStatus(value)) return value;
  return "candidate";
}

export function isKnownReviewStatus(value: string | undefined): value is ReviewStatus {
  return Boolean(value && (REVIEW_STATUSES as readonly string[]).includes(value));
}

export function isKnownSourceType(value: string | undefined): boolean {
  return Boolean(value && (SOURCE_TYPES as readonly string[]).includes(value));
}

export function isApprovedStatus(frontmatter: SkillFrontmatter): boolean {
  return normalizeReviewStatus(frontmatter.review_status) === "approved";
}
