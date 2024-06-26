import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import type { LintOptions, QualifiedConfig } from '@commitlint/types';
import load from '@commitlint/load';
import lint from '@commitlint/lint';
import { setOutput } from '@actions/core';
import logWithTile from './log.js';
import handleError from './errHandle.js';
import type { DownloadOptions } from './index.js';

const execPromise = promisify(exec);

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

type configurationProps = {
	downloadOptions: DownloadOptions
};

async function loadCommitLintConfig(downloadConfig: DownloadOptions) {
	try {
		return await load({});
	}
	/* v8 ignore next 8 */
	catch (err) {
		const missingPackage = extractPackageNameFromError(err instanceof Error ? err.message : '');
		if (missingPackage != null && downloadConfig !== 'ignore') {
			await execPromise(`npm install ${missingPackage} --omit=dev --legacy-peer-deps`).catch(handleError);
			return loadCommitLintConfig(downloadConfig);
		}
		handleError(err);
	}
}

function extractPackageNameFromError(errorMessage: string) {
	const match = errorMessage.match(/Cannot find module ['"]([^'"]+)['"]/);
	return match ? match[1] : null;
}

export const testLintOptions = {
	getLintOptions,
	extractPackageNameFromError,
	loadCommitLintConfig,
};

/**
 * Utilizes the {@link lint} function to verify the title with options fetched using {@link getLintOptions}
 * @param {string} title - The commit/PR title to check for lint
 * @param {configurationProps} config - the verifyTitle configuration object
 * @return {Promise<boolean>} - Returns true if linter passes, throws {@link Error} if failing
 */
export async function verifyTitle(title: string, config: configurationProps = { downloadOptions: 'ignore' }): Promise<boolean> {
	const commitlintConfig: QualifiedConfig = await loadCommitLintConfig(config.downloadOptions) as QualifiedConfig;

	const linterResult = await lint(
		title,
		config.downloadOptions === 'test'
			? { 'subject-case': [2, 'always', 'sentence-case'] }
			: commitlintConfig.rules,
		getLintOptions(commitlintConfig),
	);

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
