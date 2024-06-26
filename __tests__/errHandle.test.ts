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
		expect(debugFail).toBeCalledWith('error');
		expect(debugFail).toBeCalledTimes(1);
	});

	it('simple string warning calls error once but does not block', () => {
		handleError('error', false);
		expect(debugErr).toBeCalledWith('error');
		expect(debugErr).toBeCalledTimes(1);
		expect(debugFail).toBeCalledTimes(0);
	});

	it('class error calls error and fail once', () => {
		const errorInstance = new Error('error');
		// eslint-disable-next-line ts/no-unsafe-return
		expect(() => handleError(errorInstance)).not.toThrow();
		expect(debugErr).toBeCalledWith(errorInstance);
		expect(debugErr).toBeCalledTimes(1);
		expect(debugFail).toBeCalledWith(`Error Name: ${errorInstance.name} \nMessage: ${errorInstance.message} \nStack: ${errorInstance.stack}`);
		expect(debugFail).toBeCalledTimes(1);
	});

	it('class error warning calls error once but does not block', () => {
		const errorInstance = new Error('error');
		handleError(errorInstance, false);
		expect(debugErr).toBeCalledWith(errorInstance);
		expect(debugErr).toBeCalledTimes(1);
		expect(debugFail).toBeCalledTimes(0);
	});

	it('unknown error calls error and fail once', () => {
		handleError(false);
		expect(debugErr).toBeCalledWith('Unknown error has occurred!');
		expect(debugErr).toBeCalledTimes(1);
		expect(debugFail).toBeCalledWith('Unknown error has occurred!');
		expect(debugFail).toBeCalledTimes(1);
	});

	it('unknown error warning calls error once but does not block', () => {
		handleError(false, false);
		expect(debugErr).toBeCalledWith('Unknown error has occurred!');
		expect(debugErr).toBeCalledTimes(1);
		expect(debugFail).toBeCalledTimes(0);
	});
});
