export class Folder {
	type = 'folder'
	url;
	get path() {
		return this.url.pathname
	}
	constructor(url, base) {
		console.log('new folder with url', url, 'and base', base)
		if (!base && !url?.includes('://')) url = 'file://' + url
		if (base && !base?.includes('://')) base = 'file://' + base
		console.log('now folder with url', url, 'and base', base)
		this.url = new URL(url, base)
	}
}