# Skills Charter UI Action Audit

This audit keeps the static manager honest: every control should either perform a real browser-side action, navigate to a real surface, or be plain explanatory text.

## Top Bar

| Control | Status | Behavior |
| --- | --- | --- |
| `sync` | active | Reloads `skills.json` from the configured GitHub repository and branch. |
| `Tutorial` | active | Opens the guided tutorial overlay. |
| `Manifesto` | active | Opens the manifesto page. |
| language toggle | active | Switches English/Chinese copy and stores the setting in localStorage. |
| theme toggle | active | Switches light/dark theme and stores the setting in localStorage. |
| GitHub icon | active | Opens the current project repository. |
| `Intake` | active | Opens the intake modal. |

No user/account chip is shown in the top bar until Skills Charter has authenticated user data. The static manager should not invent identity.

## Dashboard

| Control | Status | Behavior |
| --- | --- | --- |
| `Run policy` | active | Recomputes browser-side package findings and risk from current package metadata and files. |
| `Browse all` in Live Policy findings | active | Navigates to Review after the dashboard shows the top five findings sorted by severity and review impact. |
| Review ticket | active | Opens the selected package in Review. |
| Inventory row | active | Selects the package. |
| `Open library` | active | Navigates to Library. |

## Intake Modal

| Control | Status | Behavior |
| --- | --- | --- |
| folder picker | active | Reads local folder files in the browser. |
| `Stage local candidates` | active | Converts local `SKILL.md` roots into browser-local candidate packages. |
| `Import selected` | active | Imports one public GitHub skill path as a candidate. |
| `Import all` | active | Imports all discovered public GitHub skill packages from the repository tree. |
| `Create candidate` | active | Creates a new browser-local package from the starter template. |
| `Open settings` | active | Opens workspace settings. |

## Library

| Control | Status | Behavior |
| --- | --- | --- |
| filter icon | active | Opens or closes lifecycle filters. |
| lifecycle filter rows | active | Toggles category/package visibility. |
| category pills | active | Opens the selected package in Editor. |
| package rows | active | Opens the selected package in Editor. |

## Editor

| Control | Status | Behavior |
| --- | --- | --- |
| package rows | active | Selects the package. |
| file rows | active | Selects the file. |
| package search | active | Filters the Skill package list by name, category, path, owner, or source. |
| `Package/Edit/Preview/Diff/Zen` tabs | active | Switches the editor mode; Zen forces the text editor into focus. |
| package rail toggle | active | Collapses or expands the skill package/file rail so the editor has more horizontal room. |
| `Zen` | active | Full-screens only the central text editor surface and exposes an `Exit Zen` control. |
| `Run policy` | active | Recomputes browser-side package findings and risk from current package metadata and files. |
| `Review` | active | Navigates to Review. |
| `New file` | active | Adds a browser-local file to the selected package. |
| `Rename` | active | Renames the selected browser-local file path. |
| `Delete` | active | Deletes the selected browser-local file after confirmation. |
| `New skill` | active | Creates a new browser-local candidate package. |
| `Delete skill` | active | Deletes the selected browser-local package after confirmation. |
| font size slider | moved | Lives in Settings and changes editor, preview, and diff font scale. |

## Pull Requests

| Control | Status | Behavior |
| --- | --- | --- |
| `Refresh GitHub PRs` | active | Fetches open pull requests, selected PR files, and check-runs from the live GitHub API for the configured public repository. |
| PR rows | active | Selects a PR and loads its changed files. |
| `Open on GitHub` | active | Opens the selected PR in GitHub for review, checks, comments, or merge. |
| GitHub check rows | active | Opens the selected Actions check run in GitHub when check-run URLs are available. |
| Git handoff command block | explanatory | Shows checkout, policy, registry generation, commit, push, and merge commands. It does not execute commands in the browser. |

## Review, Registry, And History

| Control | Status | Behavior |
| --- | --- | --- |
| review package rows | active | Selects a package. |
| `Open editor` | active | Navigates to Editor. |
| `Run policy` | active | Recomputes browser-side package findings and risk from current package metadata and files. |
| `Registry` | active | Navigates to Registry. |
| install target dropdown | active | Selects the agent target used in install snippets and updates the suggested local skill root. |
| local skill root input | active | Overrides the local install root stored in browser localStorage. |
| `Remote raw` | active | Opens the configured repository's raw `skills.json` from GitHub. |
| `Download current` | active | Downloads the currently rendered registry snapshot, including browser-local staged changes. |
| history skill chips | active | Filters timeline and versions by package. |
| commit guide link | active | Opens the commit convention document. |

## Removed Or Reworded

- Non-clicking Review Board filter chips were removed and replaced with explanatory text.
- PDF demo intake was removed from the Intake modal so Intake only imports or creates candidate packages.
- The policy button was renamed to `Run policy` so it describes the actual browser-side policy recalculation.
