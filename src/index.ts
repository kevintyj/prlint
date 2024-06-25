import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import * as github from '@actions/github';
import handleError from './errHandle.js';
import { verifyTitle } from './lint.js';

type pullRequest = {
	title: string
	number: number
};

const execPromise = promisify(exec);

async function installPackage(packageName: string): Promise<void> {
	try {
		await execPromise(`npm install ${packageName} --omit=dev --legacy-peer-deps`);
	}
	catch (err) {
		handleError(err);
	}
}

async function run(): Promise<void> {
	await installPackage('@commitlint/config-conventional');

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
