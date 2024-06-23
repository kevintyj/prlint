const SEPARATOR: string = '=====================';

function logWithTile(title: string, content: string): string {
	if (content === '')
		throw new Error('Content is empty');

	return `${title}\n${SEPARATOR}\n${content}`;
}
export default logWithTile;
