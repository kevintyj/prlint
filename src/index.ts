import * as core from '@actions/core';
import * as github from '@actions/github';
import handleError from './errHandle.js';
import { verifyTitle } from './lint.js';

type PullRequest = {
	title: string
	number: number
	body?: string
};

export type DownloadOptions = 'ignore' | 'node' | 'test';
export type BooleanAsString = 'true' | 'false';

async function run(): Promise<void> {
	const downloadDependencies: DownloadOptions = core.getInput('download-dependencies') as DownloadOptions ?? 'ignore';
	const body: BooleanAsString = core.getInput('body') as BooleanAsString ?? 'false';

	const pullRequestPayload = github.context.payload.pull_request;

	if (!pullRequestPayload?.title)
		throw new Error('Pull Request or Title not found!');

	const pullRequestObject: PullRequest = {
		title: pullRequestPayload.title as string,
		number: pullRequestPayload.number,
		...((pullRequestPayload.body && body === 'true') ? { body: pullRequestPayload.body } : {}),
	};

	try {
		// Github's default empty line break style
		await verifyTitle(`${pullRequestObject.title}\n\n${pullRequestObject.body ?? ''}`, { downloadOptions: downloadDependencies });
	}
	catch (err) {
		handleError(err);
	}
}

await run();
