import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { createRequire } from 'node:module';
import * as github from '@actions/github';
import handleError from './errHandle.js';
import { verifyTitle } from './lint.js';

/* eslint-disable no-restricted-globals */
global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(global.__filename);
global.require = createRequire(import.meta.url);
/* eslint-enable no-restricted-globals */

type pullRequest = {
	title: string
	number: number
};

async function run(): Promise<void> {
	const pullRequestPayload = github.context.payload.pull_request;

	if (!pullRequestPayload?.title)
		throw new Error('Pull Request or Title not found!');

	// eslint-disable-next-line no-console
	console.log(`Github Payload Context: ${JSON.stringify(pullRequestPayload)}`);

	const pullRequestObject: pullRequest = {
		title: pullRequestPayload.title as string,
		number: pullRequestPayload.number,
	};

	await verifyTitle(pullRequestObject.title);
}

await run().catch(err => handleError(err, false));
