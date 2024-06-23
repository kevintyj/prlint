import process from 'node:process';
import { describe, expect, it } from 'vitest';
import load from '@commitlint/load';
import { testLintOptions, verifyTitle } from '../src/lint';

const { getLintOptions, convertESMtoCJS, convertCJStoESM } = testLintOptions;

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
		await expect(verifyTitle('foo: bar')).rejects.toThrowError(/check failed/);
		await expect(verifyTitle('foo: bar', 'something.config.js')).rejects.toThrowError(/subject-case/);
		await expect(verifyTitle('test: add tests', 'commitlint.config.js')).rejects.toThrowError(/sentence-case/);
	});

	it('return true if title is valid', async () => {
		await expect(verifyTitle('fix: Add new commets')).resolves.toEqual(true);
		await expect(verifyTitle('feat: Title is short and nice!', 'something.config.js')).resolves.toEqual(true);
		await expect(verifyTitle('test: Add test suites', 'commitlint.config.js')).resolves.toEqual(true);
	});

	it('return error if file for esm conversion does not exist', async () => {
		await expect(convertESMtoCJS('dne.js', 'dne.cjs')).rejects.toThrowError(/no such file or directory/);
	});

	it('return error if file for cjs conversion does not exist', async () => {
		await expect(convertCJStoESM('dne.js', 'dne.mjs')).rejects.toThrowError(/no such file or directory/);
	});
});
