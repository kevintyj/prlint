import * as core from '@actions/core';
import * as github from '@actions/github';
import handleError from './errHandle.js';
import { verifyTitle } from './lint.js';

type PullRequest = {
	title: string;
	number: number;
	body?: string;
};

export type DownloadOptions = 'ignore' | 'node' | 'test';
export type BooleanAsString = 'true' | 'false';

/**
 * Main function for @prlint action
 */
async function run(): Promise<boolean> {
	// getInput returns an empty string when the input is not set, so `||` is used for defaults
	const downloadDependencies: DownloadOptions = (core.getInput('download-dependencies') || 'ignore') as DownloadOptions;
	const body: BooleanAsString = (core.getInput('body') || 'false') as BooleanAsString;

	const pullRequestPayload = github.context.payload.pull_request;

	if (!pullRequestPayload?.title)
		throw new Error('Pull Request or Title not found!');

	const pullRequestObject: PullRequest = {
		title: pullRequestPayload.title as string,
		number: pullRequestPayload.number,
		...((pullRequestPayload.body && body === 'true') ? { body: pullRequestPayload.body } : {}),
	};

	return verifyTitle(`${pullRequestObject.title}\n\n${pullRequestObject.body ?? ''}`, { downloadOptions: downloadDependencies });
}

/**
 * Run the run() method with an optional timeout value set to 25 seconds to default
 */
void (async () => {
	const timeoutInput: string = core.getInput('timeout') || '25';
	const parsedTimeout: number = Number.parseInt(timeoutInput, 10);
	const timeoutSeconds = (Number.isNaN(parsedTimeout) ? 25 : parsedTimeout) * 1000;

	let timeoutId: NodeJS.Timeout = setTimeout(() => {}, 0); // Default to timeout
	const timeoutPromise = new Promise((_, reject) => {
		timeoutId = setTimeout(() => reject(new Error('Action timed out')), timeoutSeconds);
	});

	try {
		await Promise.race([run(), timeoutPromise]);
		clearTimeout(timeoutId);
	}
	catch (err) {
		handleError(err, true);
		// eslint-disable-next-line node/prefer-global/process
		process.exit(1);
	}
})();
