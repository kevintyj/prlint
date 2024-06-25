import * as core from '@actions/core';
import * as github from '@actions/github';
import handleError from './errHandle.js';
import { verifyTitle } from './lint.js';

type pullRequest = {
	title: string
	number: number
};

export type downloadOptions = 'ignore' | 'node' | 'test';

async function run(): Promise<void> {
	const downloadDependencies: downloadOptions = core.getInput('download-dependencies') as downloadOptions ?? 'ignore';

	const pullRequestPayload = github.context.payload.pull_request;

	if (!pullRequestPayload?.title)
		throw new Error('Pull Request or Title not found!');

	const pullRequestObject: pullRequest = {
		title: pullRequestPayload.title as string,
		number: pullRequestPayload.number,
	};

	try {
		await verifyTitle(pullRequestObject.title, { downloadOptions: downloadDependencies });
	}
	catch (err) {
		handleError(err);
	}
}

await run();
