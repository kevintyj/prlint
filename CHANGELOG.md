# @kevintyj/prlint

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
