/**
 * Handle standard error handler for github fail status
 * @param {Error | unknown} err - error thrown
 * @param {boolean} [fail] - enable to throw github failure status
 */
declare function handleError(err: Error | string | unknown, fail?: boolean): void;
export default handleError;
