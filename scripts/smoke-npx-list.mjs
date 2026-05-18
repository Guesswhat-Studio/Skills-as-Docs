import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const root = process.cwd();
const cli = path.join(root, "packages", "cli", "dist", "index.js");
const tmp = mkdtempSync(path.join(tmpdir(), "skilldocs-npx-list-"));

function runNode(args) {
  return execFileSync(process.execPath, [cli, ...args], {
    cwd: root,
    encoding: "utf8"
  });
}

try {
  runNode(["init", "--root", tmp, "--source", "org/team-skills", "--generated-at", "2026-05-18T00:00:00.000Z"]);
  runNode([
    "new",
    "literature-review",
    "--root",
    tmp,
    "--description",
    "Use this skill when the user needs a structured literature review workflow, paper triage, evidence extraction, or synthesis across academic sources.",
    "--category",
    "research",
    "--owner",
    "@research"
  ]);

  const output = runNpxSkillsList(tmp);

  const plainOutput = stripAnsi(output);
  assert.match(plainOutput, /Found\s+1\s+skill/);
  assert.match(plainOutput, /literature-review/);
  console.log("npx skills --list compatibility smoke passed.");
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

function stripAnsi(value) {
  return value.replace(/\u001b\[[0-9;?]*[ -/]*[@-~]/g, "");
}

function runNpxSkillsList(target) {
  if (process.platform === "win32") {
    return execFileSync("powershell.exe", ["-NoProfile", "-Command", `npx --yes skills add '${target}' --list`], {
      cwd: root,
      encoding: "utf8"
    });
  }
  return execFileSync("npx", ["--yes", "skills", "add", target, "--list"], {
    cwd: root,
    encoding: "utf8"
  });
}
