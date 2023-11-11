import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as core from '@actions/core';
import handleError from '../src/errHandle';

const debugErr = vi.spyOn(core, 'error');
const debugFail = vi.spyOn(core, 'setFailed');

describe('error handler', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});
	it('simple string error calls error and fail once', () => {
		handleError('error');
		expect(debugErr).toBeCalledWith('error');
		expect(debugErr).toBeCalledTimes(1);
		expect(debugFail).toBeCalledTimes(1);
	});
	it('simple string warning calls error once but does not block', () => {
		handleError('error', false);
		expect(debugErr).toBeCalledWith('error');
		expect(debugErr).toBeCalledTimes(1);
		expect(debugFail).toBeCalledTimes(0);
	});
	it('class error calls error and fail once', () => {
		handleError(new Error('error'));
		expect(debugErr).toBeCalledWith(new Error('error'));
		expect(debugErr).toBeCalledTimes(1);
		expect(debugFail).toBeCalledTimes(1);
	});
	it('class error warning calls error once but does not block', () => {
		handleError(new Error('error'), false);
		expect(debugErr).toBeCalledWith(new Error('error'));
		expect(debugErr).toBeCalledTimes(1);
		expect(debugFail).toBeCalledTimes(0);
	});
	it('unknown error calls error and fail once', () => {
		handleError(false);
		expect(debugErr).toBeCalledWith('Unknown error has occurred!');
		expect(debugErr).toBeCalledTimes(1);
		expect(debugFail).toBeCalledTimes(1);
	});
	it('unknown error warning calls error once but does not block', () => {
		handleError(false, false);
		expect(debugErr).toBeCalledWith('Unknown error has occurred!');
		expect(debugErr).toBeCalledTimes(1);
		expect(debugFail).toBeCalledTimes(0);
	});
});
