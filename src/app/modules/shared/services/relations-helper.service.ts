export class RelationsHelper {
	static getRelationsFrom(array: Array<string>): Array<string> {
		return [
			...new Set(array.filter((item) => item.includes('.')).map((column) => column.split('.')[0])),
		];
	}
}
