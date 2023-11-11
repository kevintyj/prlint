const SEPARATOR: string = '=====================';
function logWithTile(title: string, content: string): string {
	return `${title}\n${SEPARATOR}\n${content}`;
}
export default logWithTile;
