import process from 'node:process';
import load from '@commitlint/load';
import { describe, expect, it, vi } from 'vitest';
import { testLintOptions, verifyTitle } from '../src/lint';

const { getLintOptions, extractPackageNameFromError, loadCommitLintConfig } = testLintOptions;

/* eslint-disable regexp/no-super-linear-backtracking */
const emptyConfigOption = {
	defaultIgnores: true,
	helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
	ignores: undefined,
	parserOpts: {
		breakingHeaderPattern: /^(\w*)(?:\((.*)\))?!: (.*)$/,
		headerCorrespondence: [
			'type',
			'scope',
			'subject',
		],
		headerPattern: /^(\w*)(?:\((.*)\))?!?: (.*)$/,
		issuePrefixes: ['#'],
		noteKeywords: [
			'BREAKING CHANGE',
			'BREAKING-CHANGE',
		],
		revertCorrespondence: [
			'header',
			'hash',
		],
		revertPattern: /^(?:Revert|revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
	},
	plugins: {},
};
/* eslint-enable regexp/no-super-linear-backtracking */

const emptyConfigOptionNoParserOpts = {
	defaultIgnores: true,
	helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
	ignores: undefined,
	parserOpts: undefined,
	plugins: {},
};

describe('commitlint', async () => {
	const emptyConfig = await load({});
	const defaultConfig = await load({ extends: '@commitlint/config-conventional' });
	const currentConfig = await load({}, { file: 'commitlint.config.js', cwd: process.cwd() });

	it('configurations return proper extensions and rules', () => {
		expect(emptyConfig).toHaveProperty('extends', ['@commitlint/config-conventional']);
		expect(defaultConfig).toHaveProperty('extends', ['@commitlint/config-conventional']);
		expect(currentConfig).toHaveProperty('rules.subject-case', [2, 'always', 'sentence-case']);
	});

	it('configuration returns the right qualified lint options', () => {
		expect(getLintOptions(emptyConfig)).toMatchObject(emptyConfigOption);
		expect(getLintOptions(defaultConfig)).toMatchObject(emptyConfigOption);
		expect(getLintOptions(currentConfig)).toMatchObject(emptyConfigOption);
		delete currentConfig.parserPreset?.parserOpts;
		expect(getLintOptions(currentConfig)).toMatchObject(emptyConfigOptionNoParserOpts);
	});

	it('throw error on incorrect title', async () => {
		await expect(verifyTitle('foo: bar.', { downloadOptions: 'node' })).rejects.toThrow();
		await expect(verifyTitle('foo: bar.', { downloadOptions: 'ignore' })).rejects.toThrow();
		await expect(verifyTitle('test: add tests', { downloadOptions: 'test' })).rejects.toThrowError(/sentence-case/);
	});

	it('return true if title is valid', async () => {
		await expect(verifyTitle('fix: Add new comments', { downloadOptions: 'test' })).resolves.toEqual(true);
		await expect(verifyTitle('feat: Title is short and nice!', { downloadOptions: 'test' })).resolves.toEqual(true);
		await expect(verifyTitle('test: Add test suites', { downloadOptions: 'test' })).resolves.toEqual(true);
	});
});

describe('handler', async () => {
	it('misc errors should return empty', () => {
		expect(extractPackageNameFromError('Error: You forgot a semicolon')).toBeNull();
	});

	it('valid errors should return package', () => {
		expect(extractPackageNameFromError('Cannot find module "semicolon"')).toBe('semicolon');
	});

	it('test valid config', async () => {
		await expect(loadCommitLintConfig('ignore')).resolves.toHaveProperty('rules');
		await expect(loadCommitLintConfig('node')).resolves.toHaveProperty('rules');
	});

	it('falls back to default config when no config file is found', async () => {
		vi.spyOn(process, 'cwd').mockReturnValue('/text-tmp');
		await expect(loadCommitLintConfig('node')).resolves.toHaveProperty('extends');
		await expect(loadCommitLintConfig('ignore')).resolves.toHaveProperty('extends');
	});
});
