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

**Sample github actions file (javascript only, no external dependencies):**

`.github/prlint.yml`
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
      - name: 📝Validate PR title with commitlint
        uses: kevintyj/prlint@v2
        # Optional (with default values)
        with:
          download-dependencies: ignore
          body: false
```

## v2 release

> [!CAUTION]
> v2.0.0 release is an unstable breaking build. v2.0.0 is known to have issues with
> **remote action run**. You will still be able to run v2.0.0 as a local action.

----

**This new major version of prlint updates commitlint package to the new v19.
This update removes support for CJS and only exports the app as a ESM package
(this should not affect the way you use this plugin in any way as the Github
node runner handles ESM just fine).**

### New configuration dependency option
Now users can make the dependency install step **optional**. The action will automatically install the dependency listed in your configuration file. 
This means that if the user's config does not have any dependencies, the entire node and npm setup process can be omitted.

**See Inputs section for more details on how to set this option**

However, if you wish to still download dependencies as a part of your workflow (recommended with cache enabled) see [v1 compatibility section](##-v1-support) (Configuration file would look identical with different input options)

**When to use different options**

| Project environment and nature of commitlint config                 | Recommended method                                                                                     | 
|---------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| Does not use "extends" or outside dependencies **Recommended**      | 'ignore'                                                                                               |
| Does not use "extends" but also contains other outside dependencies | 'ignore' and install dependencies using actions                                                        |
| Does use "extends" but no outside dependencies                      | 'node' when no caching is used 'ignore' and install dependencies using actions when caching is enabled |
| Does use "extends" but also contains other outside dependencies     | 'ignore' and install dependencies using actions                                                        |

## Inputs

### `download-dependencies`
**Optional** Experimental - use node to download commitlint config dependency (eg. @commitlint/config-conventional) Default : `'ignore'`

Options: 
- `'node'` uses node's exec to run a child process to automatically detect the dependency and install from action (may be slower if caching is not enabled in actions) - currently only limited to `@commitlint/config-conventional`
- `'ignore'` expects all dependencies to be added with actions script using a package manager such as npm or pnpm

> Only available in v2

---

### `body`
**Optional** Pass the body of the PR to the commit as the body. Default : `'false'`

Options:
- `'true'` Passes the body and appends the body in Github's default style (`\n\n`)
- `'false'` Ignore body

> Only available in v^2.0.1

---

### `cl-config`
**Optional** Path to commit lint config. Default : `'commitlint.config.js'`

> Removed in v2, Only available in v1.0.0 (v1)

## Outputs
#### `lint-status`
Status of the lint result. Returns `✅ Commitlint tests passed!` if successful and `❌ Commitlint tests failed` if
linter tests fail.
#### `lint-details`
Output of the commitlint result.

## Limitations
The current action of Prlint only accepts javascript based configurations on commitlint.
`v1.0.1` introduced support for ESM based configuration files. `v1.1.0` introduced support for custom config file names.
However, due to ESM support added in `v1.0.1` non `js` config files such as `yaml` or `json` is not supported.

Even if the project does not use `config-conventional`, the Prlint uses the configuration as a fallback, therefore the
project must contain the `config-conventional` package as a development dependency.

> Above behavior corrected in v2

## v1 support

**Sample github actions file (using pnpm to download dependencies):**

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
          node-version: 20
          cache: pnpm
          
      - name: 🗂️ Get pnpm store directory
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV
      - name: 🚀 Cache pnpm packages
        uses: actions/cache@v4
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-
            
      - name: 🛠️Install dependencies for prlint
        run: pnpm install @commitlint/config-conventional
      - name: 📝Validate PR title with commitlint
        uses: kevintyj/prlint@v2
```

The above action only check's out the current repository to fetch the commitlint configuration file.
PNPM and node is used to install necessary dependencies, then config-conventional is used as a default config.
When using the above configuration, `pnpm-lock.yaml` is required. Please use npm and node if `package-lock.json` is used.

## Changelog
See [CHANGELOG](CHANGELOG.md) for the release details

## License

Licensed under the BSD-3 License, Copyright © 2023-present [Kevin Taeyoon Jin](https://github.com/kevintyj).

See [LICENSE](./LICENSE) for more information
