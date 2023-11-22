import process from 'node:process';
import * as fs from 'node:fs';
import type { LintOptions, ParserOptions, QualifiedConfig } from '@commitlint/types';
import load from '@commitlint/load';
import lint from '@commitlint/lint';
import { setOutput } from '@actions/core';
import logWithTile from './log';

const defaultConfig = {
	extends: '@commitlint/config-conventional',
};

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
			? configuration.parserPreset.parserOpts as ParserOptions
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
 * @param {string} configPath - The configuration path of the commitlint config fetched from current working directory
 * @return {Promise<boolean>} - Returns true if linter passes, throws {@link Error} if failing
 */
export async function verifyTitle(title: string, configPath: string = ''): Promise<boolean> {
	const commitlintConfig: QualifiedConfig = fs.existsSync(configPath)
		? await load({}, { file: configPath, cwd: process.cwd() })
		: await load(defaultConfig);

	const linterResult = await lint(title, commitlintConfig.rules, getLintOptions(commitlintConfig));

	if (linterResult.valid) {
		setOutput('✅ Commitlint tests passed!\n', linterResult);
		return true;
	}
	else {
		const errors = linterResult.errors.map((error) => {
			return `${error.name}: ${error.message}`;
		}).join('\n');
		throw new Error(logWithTile('Commitlint check failed!', errors));
	}
}
