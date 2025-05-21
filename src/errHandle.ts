/* eslint-disable node/prefer-global/process */
import { error, setFailed } from '@actions/core';

/**
 * Handle standard error handler for github fail status
 * @param {Error | unknown} err - error thrown
 * @param {boolean} [fail] - enable to throw github failure status
 */
function handleError(err: Error | string | unknown, fail: boolean = true) {
	if (err instanceof Error) {
		error(err);
		fail && setFailed(`Error Name: ${err.name} \nMessage: ${err.message} \nStack: ${err.stack}`);
		process.exit(1);
	}
	else {
		const message: string = typeof err == 'string' ? err : 'Unknown error has occurred!';
		error(message);
		fail && setFailed(message);
		process.exit(1);
	}
}

export default handleError;
