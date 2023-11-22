import * as github from '@actions/github';
import handleError from './errHandle';
import { verifyTitle } from './lint';

type pullRequest = {
	title: string
	number: number
};

async function run(): Promise<void> {
	const pullRequestPayload = github.context.payload.pull_request;

	if (!pullRequestPayload?.title)
		throw new Error('Pull Request or Title not found!');

	const pullRequestObject: pullRequest = {
		title: pullRequestPayload.title as string,
		number: pullRequestPayload.number,
	};

	await verifyTitle(pullRequestObject.title, 'commitlint.config.js');
}

run().catch(handleError);
