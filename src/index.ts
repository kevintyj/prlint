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

/**
 * Main function for @prlint action
 */
async function run(): Promise<boolean> {
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

	return await verifyTitle(`${pullRequestObject.title}\n\n${pullRequestObject.body ?? ''}`, { downloadOptions: downloadDependencies });
}

/**
 * Run the run() method with a optional timeout value set to 20 seconds to default
 */
void (async () => {
	const timeoutInput: string = core.getInput('timeout') ?? '20000';

	const timeout = Number.parseInt(timeoutInput, 10);

	const timeoutPromise = new Promise((_, reject) => {
		setTimeout(() => reject(new Error('Action timed out')), timeout);
	});

	try {
		return await Promise.race([run(), timeoutPromise]);
	}
	catch (err) {
		handleError(err);
	}
})();
