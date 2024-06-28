# @kevintyj/prlint

## 2.2.0

### Minor Changes

- [#20](https://github.com/kevintyj/prlint/pull/20) [`7a22e6b95bd102732dd05d78a269adf9738617db`](https://github.com/kevintyj/prlint/commit/7a22e6b95bd102732dd05d78a269adf9738617db) Thanks [@kevintyj](https://github.com/kevintyj)! - Add timeout and timeout input on action

## 2.1.0

### Minor Changes

- [`d6cb453dbf8447cdddc94fb4cbe59763e80fe078`](https://github.com/kevintyj/prlint/commit/d6cb453dbf8447cdddc94fb4cbe59763e80fe078) Thanks [@kevintyj](https://github.com/kevintyj)! - Add ability to pass in body to commit

- [#18](https://github.com/kevintyj/prlint/pull/18) [`a99014b7b89d14c0e30e6354464b218df764b04c`](https://github.com/kevintyj/prlint/commit/a99014b7b89d14c0e30e6354464b218df764b04c) Thanks [@kevintyj](https://github.com/kevintyj)! - Fixes unresolved behavior on remote action run

## 2.0.0

### Major Changes

- [#15](https://github.com/kevintyj/prlint/pull/15) [`c14bd660b8588fa73708f9697bcc35f0a34b7d56`](https://github.com/kevintyj/prlint/commit/c14bd660b8588fa73708f9697bcc35f0a34b7d56) Thanks [@kevintyj](https://github.com/kevintyj)! - Adds pure native ESM support

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

## 1.1.0

### Minor Changes

- [#9](https://github.com/kevintyj/prlint/pull/9) [`3256453`](https://github.com/kevintyj/prlint/commit/325645397da52ccaf94385d87a3a4a6ace34c8d0) Thanks [@kevintyj](https://github.com/kevintyj)! - Add support for custom configuration files

## 1.0.1

### Patch Changes

- [#6](https://github.com/kevintyj/prlint/pull/6) [`1d0ac4f`](https://github.com/kevintyj/prlint/commit/1d0ac4f2affd791a57a29b072ba7bc688a9ea7f1) Thanks [@kevintyj](https://github.com/kevintyj)! - Add ESM support for commitlint config

## 1.0.0

### Major Changes

- [`aaf60e9`](https://github.com/kevintyj/prlint/commit/aaf60e9c6f1cc167fd60dd49c44b0f5a2883db59) Thanks [@kevintyj](https://github.com/kevintyj)! - Minify build output using cjs output

  Uses a prebuild and post-build step to enforce cjs compilation for nodejs support.
  Removes test files from the build bundle.
  BREAKING!: previous implementations of @kevintyj/prlint is now deprecated,
  no support for mjs is provided due to upstream limitation.

## 0.2.0

### Minor Changes

- [`ac016e5`](https://github.com/kevintyj/prlint/commit/ac016e54124815f458b6ed7362f7424dff0b4613) Thanks [@kevintyj](https://github.com/kevintyj)! - Change build strategy to @vercel/ncc using webpack

## 0.1.1

### Patch Changes

- [`c58f797`](https://github.com/kevintyj/prlint/commit/c58f7973eed41af5641f677b821ba3c67cd26f9e) Thanks [@kevintyj](https://github.com/kevintyj)! - Change ci entry to mjs

## 0.1.0

### Minor Changes

- [`f3fc140`](https://github.com/kevintyj/prlint/commit/f3fc1404a886a372257ac2dd9a95a52802892fc2) Thanks [@kevintyj](https://github.com/kevintyj)! - Stable build with in-built packages for independent usage

## 0.0.1

### Patch Changes

- [`9cbd5b4`](https://github.com/kevintyj/prlint/commit/9cbd5b44059ca425725302032a8964594da12486) Thanks [@kevintyj](https://github.com/kevintyj)! - Initial release of prlint

  The following repository has been ejected from [@kevintyj/conventionalsets](https://github.com/kevintyj/conventionalsets)
