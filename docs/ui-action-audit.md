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
| `Run policy` | active | Recomputes browser-side package policy state from the currently staged packages. |
| `Run PDF intake` | active | Fetches `anthropics/skills/skills/pdf`, stages an optimized browser-local package, adds evidence, marks it approved for handoff, and exposes install readiness. |
| Review ticket | active | Selects the package for review context. |
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
| `Run PDF intake` | active | Runs the public PDF governance intake scenario. |
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
| `Package/Edit/Preview/Diff` tabs | active | Switches the editor mode. |
| `Zen` | active | Switches focused editor layout. |
| `Run policy` | active | Recomputes browser-side package policy state. |
| `Review` | active | Navigates to Review. |
| `New file` | active | Adds a browser-local file to the selected package. |
| `Rename` | active | Renames the selected browser-local file path. |
| `Delete` | active | Deletes the selected browser-local file after confirmation. |
| `New skill` | active | Creates a new browser-local candidate package. |
| `Delete skill` | active | Deletes the selected browser-local package after confirmation. |
| font size slider | active | Changes editor, preview, and diff font scale. |

## Review, Registry, And History

| Control | Status | Behavior |
| --- | --- | --- |
| review package rows | active | Selects a package. |
| `Open editor` | active | Navigates to Editor. |
| `Run policy` | active | Recomputes browser-side package policy state. |
| `Registry` | active | Navigates to Registry. |
| install provider buttons | active | Select the agent target used in install snippets. |
| history skill chips | active | Filters timeline and versions by package. |
| commit guide link | active | Opens the commit convention document. |

## Removed Or Reworded

- Non-clicking Review Board filter chips were removed and replaced with explanatory text.
- Prototype wording was removed from the PDF flow. The flow is now labeled as a browser-local governance intake and Git handoff.
- The policy button was renamed to `Run policy` so it describes the actual browser-side policy recalculation.
