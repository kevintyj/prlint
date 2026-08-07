---
"@kevintyj/prlint": minor
---

Modernize toolchain and runtime

- Run the action on the Node 24 runtime (was Node 20). GitHub-hosted runners already execute actions on Node 24; self-hosted runners need runner v2.327.1+
- Update commitlint packages to v21 (requires Node 22.12+ when self-installing dependencies)
- Update `@actions/core` to v3 and `@actions/github` to v9
- Fix input defaults: empty inputs (`timeout`, `download-dependencies`, `body`) previously bypassed their documented defaults, causing spurious immediate timeouts (`NaN` timeout) and unintended dependency downloads
- Update dev toolchain: eslint 10, @antfu/eslint-config 9, vitest 4, TypeScript 6, husky 9, pnpm 10
- Update CI workflows to actions/checkout@v7, actions/setup-node@v7 (Node 24), pnpm/action-setup@v6, codecov-action@v7
- Add Dependabot config for weekly npm and GitHub Actions updates
