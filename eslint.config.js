import antfu from '@antfu/eslint-config';

/* Using custom configuration of Antfu's code style: https://github.com/antfu/eslint-config */
export default antfu(
	{
		typescript: {
			tsconfigPath: 'tsconfig.json',
			overrides: {
				'ts/consistent-type-definitions': ['error', 'type'],
			},
			overridesTypeAware: {
				'ts/no-unsafe-assignment': 'warn',
				'ts/no-unsafe-member-access': 'warn',
				'ts/strict-boolean-expressions': 'warn',
			},
		},
		stylistic: {
			indent: 'tab',
			quotes: 'single',
			semi: true,
		},
		ignores: [
			'**/dist',
			'.idea',
			'**/__fixtures__',
			'eslint.config.js'
		],
	}, {
		rules: {
			'style/no-tabs': ['error', { allowIndentationTabs: true }],
			'style/no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'style/array-bracket-newline': ['error', { multiline: true }],
			'style/array-element-newline': ['error', 'consistent'],
		},
	}, {
		files: ['**/*.json', '**/*.json5', '**/*.jsonc'],
		rules: {
			'jsonc/indent': ['error', 2],
		},
	}, {
		files: ['tsconfig.json', 'package.json'],
		rules: {
			'jsonc/sort-keys': 'off',
		},
	}, {
		files: ['__tests__/**/*.test.ts'],
		rules: {
			'ts/no-unsafe-call': 'off'
		}
	}
);
