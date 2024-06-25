---
"@kevintyj/prlint": major
---

Adds pure native ESM support

**This new major version of prlint updates commitlint package to the new v19.
This update removes support for CJS and only exports the app as a ESM package 
(this should not affect the way you use this plugin in any way as the Github
 node runner handles ESM just fine).**

### This release drops support for:
- Custom configuration file names:
    - The new upgrade takes advantage of the native commitlint config loader to 
 load the configuration from your project folder. If you do really need support for custom commitlint specification file names such as my-awesome-config-file.jsx, either way you need to be setting up custom commitlint configurations on your environment (which I do not recommend you to do), you could easily just create a symlink pointing to a valid name such as commitlint.config.mjs, this action will be able to work in your workflow without any further setup.

### New features:
- Native ESM & CJS compatibility
  - As the new project bundles to native ESM ran on Node, previous handling of 
 CJS config files are unecessary
- Automatic configuration detection

Upgraded the following dependencies and devDependencies:

Dependencies:

@commitlint/config-conventional: ^18.1.0 -> ^19.2.2
@commitlint/lint: ^18.1.0 -> ^19.2.2
@commitlint/load: ^18.2.0 -> ^19.2.0
DevDependencies:

@antfu/eslint-config: ^2.1.0 -> ^2.21.1
@commitlint/cli: ^18.4.3 -> ^19.3.0
@commitlint/types: ^18.1.0 -> ^19.0.3
@types/node: ^20.9.0 -> ^20.14.8
eslint: ^8.54.0 -> ^8.57.0
lint-staged: ^15.1.0 -> ^15.2.7
rimraf: ^5.0.5 -> ^5.0.7
tsup: ^7.2.0 -> ^8.1.0
typescript: ^5.2.2 -> ^5.5.2
vitest: ^0.34.6 -> ^1.6.0

BREAKING: Upgraded @commitlint packages to v19 which have switched to pure ESM.

