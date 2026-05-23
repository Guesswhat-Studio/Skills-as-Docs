import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const root = process.cwd();
const cli = path.join(root, "packages", "cli", "dist", "index.js");
const tmp = mkdtempSync(path.join(tmpdir(), "skills-charter-onboarding-"));

function run(args, options = {}) {
  return execFileSync(process.execPath, [cli, ...args], {
    cwd: root,
    encoding: "utf8",
    stdio: options.stdio ?? "pipe"
  });
}

try {
  run(["init", "--root", tmp, "--source", "org/team-skills", "--generated-at", "2026-05-18T00:00:00.000Z"]);
  run([
    "new",
    "Literature Review",
    "--root",
    tmp,
    "--description",
    "Use this skill when the user needs a structured literature review workflow, paper triage, evidence extraction, or synthesis across academic sources.",
    "--category",
    "research",
    "--owner",
    "@research",
    "--review-status",
    "approved"
  ]);

  const scan = JSON.parse(run(["scan", "--root", tmp]));
  assert.equal(scan.packages.length, 1);
  assert.equal(scan.packages[0].name, "literature-review");
  assert.equal(scan.packages[0].files, 1);

  const lint = run(["lint", "--root", tmp]);
  assert.match(lint, /risk: low/);

  run(["generate", "registry", "--root", tmp, "--source", "org/team-skills", "--out", path.join(tmp, "skills.json")]);
  run(["generate", "registry", "--root", tmp, "--source", "org/team-skills", "--out", path.join(tmp, "skills.json"), "--check"]);

  const snippets = JSON.parse(run(["generate", "install-snippets", "--root", tmp, "--source", "org/team-skills"]));
  assert.equal(snippets["literature-review"][0], "npx skills add org/team-skills --skill literature-review -g -a codex");

  const doctor = JSON.parse(run(["doctor", "--root", tmp, "--source", "org/team-skills"]));
  assert.equal(doctor.packages, 1);
  assert.equal(doctor.risk, "low");

  const registry = JSON.parse(readFileSync(path.join(tmp, "skills.json"), "utf8"));
  assert.equal(registry.packages.length, 1);
  assert.equal(registry.packages[0].install[0], "npx skills add org/team-skills --skill literature-review -g -a codex");

  console.log("Smoke onboarding flow passed.");
  console.log(`Temporary repo: ${tmp}`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
