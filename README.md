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
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: 📦Setup PNPM
        uses: pnpm/action-setup@v2
        with:
          version: 8
      - name: 🌳Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: pnpm
      - name: 🛠️Install dependencies for prlint
        run: pnpm install @commitlint/config-conventional
      - name: 🧾Print versions
        run: |
          git --version
          node --version
          pnpm --version
          pnpm commitlint --version
      - name: 📝Validate PR title with commitlint
        uses: kevintyj/prlint@v1
```
The above action only check's out the current repository to fetch the commitlint configuration file.
PNPM and node is used to install necessary dependencies, then config-conventional is used as a default config.
When using the above configuration, `pnpm-lock.yaml` is required. Please use npm and node if `package-lock.json` is used.

### Limitations
The current action of Prlint only accepts `commitlint.config.js` based configurations on commitlint. 
`v1.0.1` introduced support for ESM based configuration files. However, currently there is no support for configuration 
files of different name in the repository such as `commitlintrc` files especially of different file types. 
Future support for an `js` file input will be enabled through an optional action input. However, no support for `json` 
or `yaml` files are currently planned. Please feel free to contribute to add aditional features!

Even if the project does not use `config-conventional`, the Prlint uses the configuration as a fallback, therefore the 
project must contain the `config-conventional` package as a development dependency. 

## License

Licensed under the BSD-3 License, Copyright © 2023-present [Kevin Taeyoon Jin](https://github.com/kevintyj).

See [LICENSE](./LICENSE) for more information
