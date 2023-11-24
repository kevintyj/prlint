import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	splitting: false,
	sourcemap: true,
	clean: true,
	noExternal: [
		'@actions/core',
		'@actions/github',
		'@commitlint/lint',
		'@commitlint/load',
		'@commitlint/config-conventional',
	],
});
