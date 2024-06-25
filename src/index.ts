import { isAbsolute, resolve } from 'node:path';
import { Module } from 'node:module';
import * as github from '@actions/github';
import handleError from './errHandle.js';
import { verifyTitle } from './lint.js';

type pullRequest = {
	title: string
	number: number
};

/* eslint-disable ts/no-unsafe-return */
const originalRequire = Module.prototype.require;

// @ts-expect-error Module from node
Module.prototype.require = function (request: string) {
	if (!isAbsolute(request) && !request.startsWith('.')) {
		const distNodeModulesPath = resolve(__dirname, 'node_modules', request);
		try {
			return originalRequire.call(this, distNodeModulesPath);
		}
		catch (err) {
			// If it fails, fallback to the original behavior
		}
	}
	return originalRequire.call(this, request);
};
/* eslint-enable ts/no-unsafe-return */

async function run(): Promise<void> {
	const pullRequestPayload = github.context.payload.pull_request;

	if (!pullRequestPayload?.title)
		throw new Error('Pull Request or Title not found!');

	const pullRequestObject: pullRequest = {
		title: pullRequestPayload.title as string,
		number: pullRequestPayload.number,
	};

	try {
		await verifyTitle(pullRequestObject.title);
	}
	catch (err) {
		handleError(err);
	}
}

await run();
