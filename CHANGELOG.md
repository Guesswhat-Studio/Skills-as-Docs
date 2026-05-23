# Changelog

## 0.1.0 Preview - 2026-05-18

This is the first public preview of Skills Charter.

### Added

- Static GitHub Pages manager prototype for skill package browsing, editing, preview, diff, registry preview, and Git handoff.
- Public GitHub repository import through the browser and local folder import through the file picker.
- Skill package tree with package-level create, rename, delete, and file selection.
- `SKILL.md` frontmatter editor with Markdown synchronization.
- Browser-side lint aligned with the initial core rule ids.
- `skills.json` registry preview with install snippets for `npx skills`.
- Initial Chinese UI placeholder and language toggle.
- Focused editor reading settings and Zen mode.
- `packages/core` scanner, frontmatter parser, linter, registry generator, and install snippet generator.
- `packages/cli` commands for `init`, `new`, `scan`, `lint`, `generate registry`, `generate install-snippets`, and `doctor`.
- Registry JSON Schema and GitHub Actions workflow for build/test/lint/registry drift.
- Smoke checks for onboarding and upstream `npx skills add <path> --list` compatibility.

### Known Gaps

- GitHub PR creation is a local Git handoff flow, not authenticated browser-side PR creation.
- File-level CRUD for supporting files is not complete.
- Browser edits are not persisted across refresh unless committed through the generated Git workflow.
- i18n is a lightweight placeholder dictionary, not a full localization system.
- CI policy checks for links, secrets, asset hashes, and script security are still upcoming.
