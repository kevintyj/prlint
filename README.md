# Prlint
**Github PR title checker using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) spec on
[Changesets](https://github.com/changesets/changesets)**

---

![Github CI tests](https://github.com/kevintyj/prlint/actions/workflows/ci.yml/badge.svg?branch=main)
![Github Build & Publish tests](https://github.com/kevintyj/prlint/actions/workflows/publish.yml/badge.svg?branch=main)
[![Latest Release](https://img.shields.io/github/v/release/kevintyj/prlint)](https://github.com/kevintyj/prlint/releases)
[![codecov](https://codecov.io/gh/kevintyj/prlint/graph/badge.svg?token=WBT1WWSLF0)](https://codecov.io/gh/kevintyj/prlint)

## Getting started
### Use as a standalone action
Use Prlint with any github repository with the latest release.
Checking out the repository is required to fetch the `commitlint.config.js`

**Sample github actions file using PNPM:**
`prlint.yml`
```yaml
name: 📝 Lint PR title
on:
  pull_request:
    types: [opened, edited, reopened, synchronize]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: 🔖Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: 📦Setup PNPM
        uses: pnpm/action-setup@v4
        with:
          version: 9
      - name: 🌳Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - name: 🛠️Install dependencies for prlint
        run: pnpm install @commitlint/config-conventional
      - name: 📝Validate PR title with commitlint
        uses: kevintyj/prlint@v2
```
The above action only check's out the current repository to fetch the commitlint configuration file.
PNPM and node is used to install necessary dependencies, then config-conventional is used as a default config.
When using the above configuration, `pnpm-lock.yaml` is required. Please use npm and node if `package-lock.json` is used.

## v2 release
**This new major version of prlint updates commitlint package to the new v19.
This update removes support for CJS and only exports the app as a ESM package
(this should not affect the way you use this plugin in any way as the Github
node runner handles ESM just fine).**

### Inputs
#### `cl-config`
**Optional** Path to commit lint config. Default : `'commitlint.config.js'`

> Removed in v2

### Outputs
#### `lint-status`
Status of the lint result. Returns `✅ Commitlint tests passed!` if successful and `❌ Commitlint tests failed` if
linter tests fail.
#### `lint-details`
Output of the commitlint result.

### Limitations
The current action of Prlint only accepts javascript based configurations on commitlint.
`v1.0.1` introduced support for ESM based configuration files. `v1.1.0` introduced support for custom config file names.
However, due to ESM support added in `v1.0.1` non `js` config files such as `yaml` or `json` is not supported.

Even if the project does not use `config-conventional`, the Prlint uses the configuration as a fallback, therefore the
project must contain the `config-conventional` package as a development dependency.

> Above behavior corrected in v2

## Changelog
See [CHANGELOG](CHANGELOG.md) for the release details

## License

Licensed under the BSD-3 License, Copyright © 2023-present [Kevin Taeyoon Jin](https://github.com/kevintyj).

See [LICENSE](./LICENSE) for more information
