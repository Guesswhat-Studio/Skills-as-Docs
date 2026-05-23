---
name: code-review
description: Use this skill when reviewing pull requests for correctness, maintainability, test coverage, and security risk.
category: engineering
owner: "@platform"
review_status: approved
source_type: manual
approved_by: "@platform-lead"
approved_at: 2026-05-20
---

# Code Review

This skill helps an agent review code changes in a repository while keeping findings actionable and grounded in file references.

## Workflow

1. Read the user request and identify the review scope.
2. Inspect changed files and nearby context before judging behavior.
3. Prioritize correctness, regressions, security risk, and missing tests.
4. Report findings first, ordered by severity.
5. Keep summary and praise secondary to concrete risks.

## Review Evidence

Before approving a major change to this skill, add a short note under `review-notes/` describing the test pull request, false positives, missed issues, and any wording changes.
