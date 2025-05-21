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
	}
	else {
		const message: string = typeof err == 'string' ? err : 'Unknown error has occurred!';
		error(message);
		fail && setFailed(message);
	}
	setFailed('Out of bounds');
}

export default handleError;
