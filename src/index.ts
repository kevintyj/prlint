import * as github from '@actions/github';
import * as core from '@actions/core';
import handleError from './errHandle';
import { verifyTitle } from './lint';

type pullRequest = {
	title: string
	number: number
};

async function run(): Promise<void> {
	const pullRequestPayload = github.context.payload.pull_request;
	const configPayload = core.getInput('cl-config');

	if (!pullRequestPayload?.title)
		throw new Error('Pull Request or Title not found!');

	const pullRequestObject: pullRequest = {
		title: pullRequestPayload.title as string,
		number: pullRequestPayload.number,
	};

	await verifyTitle(pullRequestObject.title, configPayload);
}

run().catch(handleError);
