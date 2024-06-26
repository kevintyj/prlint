import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
		coverage: {
			exclude: ['**/src/index.ts'],
		},
	},
});
