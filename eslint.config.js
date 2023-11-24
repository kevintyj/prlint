import antfu from '@antfu/eslint-config';

/* Using custom configuration of Antfu's code style: https://github.com/antfu/eslint-config */
export default antfu(
	{
		typescript: {
			tsconfigPath: 'tsconfig.json',
		},
		stylistic: {
			quotes: 'single',
		},
		ignores: [
			'**/dist',
			'.idea',
			'**/__fixtures__',
			'eslint.config.js',
		],
		overrides: {
			typescript: {
				'ts/consistent-type-definitions': ['error', 'type'],
				'ts/no-unsafe-assignment': 'warn',
				'ts/no-unsafe-member-access': 'warn',
			},
		},
	},
	{
		rules: {
			'style/indent': ['error', 'tab', {
				SwitchCase: 1,
			}],
			'style/no-tabs': ['error', { allowIndentationTabs: true }],
			'style/no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'style/array-bracket-newline': ['error', { multiline : true }],
			'style/array-element-newline': ['error', 'consistent'],
			'style/semi': ['error', 'always'],
		},
	},
	{
		files: ['tsconfig.json', 'package.json'],
		rules: {
			'jsonc/sort-keys': 'off',
		},
	},
);
