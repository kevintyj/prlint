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

/**
 * Convert a ESM js file to CJS
 * @param {string} inputFilePath - Input file path for conversion
 * @param {string} outputFilePath - Output file path
 */
async function convertESMtoCJS(inputFilePath: string, outputFilePath: string) {
	try {
		const esmContent = fs.readFileSync(inputFilePath, 'utf8');

		// Replace import, export, and variable declaration statements using regex
		const cjsContent = esmContent
			.replace(/import (.+?) from ['"](.+?)['"]/g, 'const $1 = require(\'$2\')')
			.replace(/export default/g, 'module.exports =')
			.replace(/export (const|let|var|function|class) (\w+)/g, 'exports.$2 = $2');

		fs.writeFileSync(outputFilePath, cjsContent, 'utf8');
	}
	catch (err) {
		// @ts-expect-error explicit type unknown for error
		throw new Error(logWithTile('File read failed!', err));
	}
}

export const testLintOptions = {
	getLintOptions,
	convertESMtoCJS,
};

/**
 * Utilizes the {@link lint} function to verify the title with options fetched using {@link getLintOptions}
 * @param {string} title - The commit/PR title to check for lint
 * @param {string} configPath - The configuration path of the commitlint config fetched from current working directory
 * @return {Promise<boolean>} - Returns true if linter passes, throws {@link Error} if failing
 */
export async function verifyTitle(title: string, configPath: string = ''): Promise<boolean> {
	const outputConfig = async () => {
		if (fs.existsSync(configPath)) {
			await convertESMtoCJS(configPath, 'commitlint-cjs.config.cjs');
			return await load({}, { file: 'commitlint-cjs.config.cjs', cwd: process.cwd() });
		}
		else {
			return await load(defaultConfig);
		}
	};

	const commitlintConfig: QualifiedConfig = await outputConfig();

	const linterResult = await lint(title, commitlintConfig.rules, getLintOptions(commitlintConfig));

	if (linterResult.valid) {
		setOutput('lint-status', '✅ Commitlint tests passed!\n');
		setOutput('lint-details', linterResult);
		return true;
	}
	else {
		const errors = linterResult.errors.map((error) => {
			return `${error.name}: ${error.message}`;
		}).join('\n');
		throw new Error(logWithTile('Commitlint check failed!', errors));
	}
}
