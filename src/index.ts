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
 * Run the run() method with an optional timeout value set to 25 seconds to default
 */
void (async () => {
	const timeoutInput: string = core.getInput('timeout') ?? '25';
	const timeoutSeconds = Number.parseInt(timeoutInput, 10) * 1000;

	let timeoutId: NodeJS.Timeout = setTimeout(() => {}, 0); // Default to timeout
	const timeoutPromise = new Promise((_, reject) => {
		timeoutId = setTimeout(() => reject(new Error('Action timed out')), timeoutSeconds);
	});

	try {
		const result = await Promise.race([run(), timeoutPromise]);
		clearTimeout(timeoutId);
		return result;
	}
	catch (err) {
		handleError(err, true);
	}
})();
