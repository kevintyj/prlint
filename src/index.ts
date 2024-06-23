// Shim globals in esm bundle
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const getFilename = () => fileURLToPath(import.meta.url);
const getDirname = () => path.dirname(getFilename());

// eslint-disable-next-line no-restricted-globals
global.__dirname = getDirname();
// eslint-disable-next-line no-restricted-globals
global.__filename = getFilename();

/* eslint-disable import/first */
import * as github from '@actions/github';
import * as core from '@actions/core';
import handleError from './errHandle';
import { verifyTitle } from './lint';

/* eslint-enable import/first */

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
