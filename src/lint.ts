import type { LintOptions, QualifiedConfig } from '@commitlint/types';
import load from '@commitlint/load';
import lint from '@commitlint/lint';
import { setOutput } from '@actions/core';
import logWithTile from './log.js';

/**
 * Conditionally sets values from configuration as a LintOptions object
 * @param {QualifiedConfig} configuration - Commitlint configuration file from load
 * @return {LintOptions} LintOptions object with possible falsy default values
 */
function getLintOptions(configuration: QualifiedConfig): LintOptions {
	return {
		defaultIgnores: configuration.defaultIgnores ? configuration.defaultIgnores : true,
		ignores: configuration.ignores ? configuration.ignores : undefined,
		parserOpts: typeof configuration.parserPreset?.parserOpts == 'object'
			? configuration.parserPreset.parserOpts as LintOptions['parserOpts']
			: undefined,
		plugins: configuration.plugins ? configuration.plugins : undefined,
		helpUrl: configuration.helpUrl ? configuration.helpUrl : undefined,
	};
}

export const testLintOptions = {
	getLintOptions,
};

/**
 * Utilizes the {@link lint} function to verify the title with options fetched using {@link getLintOptions}
 * @param {string} title - The commit/PR title to check for lint
 * @return {Promise<boolean>} - Returns true if linter passes, throws {@link Error} if failing
 */
export async function verifyTitle(title: string): Promise<boolean> {
	const commitlintConfig: QualifiedConfig = await load({});

	const linterResult = await lint(title, commitlintConfig.rules, getLintOptions(commitlintConfig));

	if (linterResult.valid) {
		setOutput('lint-status', '✅ Commitlint tests passed!\n');
		setOutput('lint-details', linterResult);
		// eslint-disable-next-line no-console
		console.log(`✅ Commitlint tests passed!\nLinter Result:\n${JSON.stringify(linterResult)}`);
		return true;
	}
	else {
		setOutput('lint-status', '❌ Commitlint tests failed\n');
		setOutput('lint-details', linterResult);
		const errors = linterResult.errors.map((error) => {
			return `${error.name}: ${error.message}`;
		}).join('\n');
		throw new Error(logWithTile('Commitlint check failed!', errors));
	}
}
