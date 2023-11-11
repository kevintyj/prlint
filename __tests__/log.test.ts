import { describe, expect, it } from 'vitest';
import logWithTile from '../src/log';

describe('logger', () => {
	it('log with title and error to return the correct string', () => {
		expect(logWithTile('title', 'error')).toBe('title\n=====================\nerror');
	});
});
