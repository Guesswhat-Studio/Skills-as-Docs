# UI Redesign Handoff

Use this file as the input checklist when sending the current Skills Charter UI to Claude Design or another design tool.

## Primary UI Files

These are the files that define the current GitHub Pages manager experience:

- `docs/index.html` - main Skills Charter manager page and interaction surface.
- `docs/assets/site.css` - shared visual system for the manager, article pages, demo blocks, accessibility colors, responsive layout, editor styling, and inspector panels.
- `docs/assets/site.js` - browser-only prototype logic: sample skill packages, i18n, theme toggle, tree/editor/preview/diff/registry/review-gate interactions.
- `docs/manager-semantics.md` - product and UI meaning contract; especially useful for avoiding misleading controls.
- `docs/development.md` - MVP implementation contract and target architecture.

## Secondary UI / Content Pages

These are related pages that may need visual consistency, but should not drive the manager redesign unless explicitly requested:

- `docs/blogs/agent-skills-need-governance.html` - published manifesto/article page.
- `docs/blogs/agent-skills-need-governance.md` - source copy for the manifesto/article.
- `docs/demo-scenario.html` - small demo scenario / presentation artifact.
- `docs/demo-scenario.md` - source copy for the demo scenario.
- `docs/pitch/index.html` - field-test pitch page.
- `docs/pitch/pitch.css` - pitch page styling.
- `docs/pitch/pitch.js` - pitch page script.
- `docs/pitch/field-test-pitch.md` - English pitch copy.
- `docs/pitch/field-test-pitch.zh.md` - Chinese pitch copy.

## Product Context Files

Give these as background, not as UI implementation files:

- `README.md` - public positioning and repository landing content.
- `PLAN.md` - strategy, market positioning, phases, naming, and roadmap thinking.
- `docs/quickstart.md` - usage-oriented copy.
- `docs/research.md` - market/research notes.
- `docs/bmad/research-report.md` - deeper product research artifact.

## Optional Visual References

- `redesign/index.html`
- `redesign/assets/site.css`
- `redesign/assets/site.js`

The `redesign/` folder is ignored by Git on purpose. Use it only as a local visual reference, not as a source of truth.

## Do Not Send As UI Source

These are implementation, schema, examples, or generated output rather than current UI source:

- `packages/**`
- `schemas/**`
- `scripts/**`
- `.github/**`
- `examples/**`
- `templates/**`
- `case-studies/**`
- `outputs/**`
- `node_modules/**`
- `packages/*/dist/**`

## Current Design Constraints To Preserve

- The public concept is **Skills Charter** / **Skills Charter**.
- Core loop: `Charter Editor -> Git sync + hooks -> approved registry -> Agents -> improve the charter`.
- The UI is a workbench for human review and management of agent skill packages, not a marketing landing page.
- Header taxonomy: product identity, workspace context, concept reference, workflow actions, global utilities.
- Initial workspace status should say `No local edits` / `无本地改动`, not `Clean`.
- Light/dark theme and bilingual English/Chinese support should remain.
- The manager should optimize for long human review sessions: readable editor, metadata form, review gate, provenance/evidence, diff, registry preview, install command.
- Current color patch targets WCAG AA contrast for normal text and primary buttons.

## Redesign Ask

Redesign the Skills Charter manager as a serious, docs-native governance workbench:

- Make the left tree, central editor, and right inspector feel intentionally structured rather than crowded.
- Keep controls grouped by user intent: source setup, review, editing, validation, handoff, and global utilities.
- Improve density and scanability for repeated team use.
- Keep the previous loop/teaser graphic style as a conceptual motif if a landing or intro section is included.
- Avoid making it look like a generic SaaS landing page or decorative dashboard.
