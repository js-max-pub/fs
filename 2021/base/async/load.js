import { lines } from 'https://jsv.max.pub/string/2021/mod.js'
import { bytes_to_string, parseJSON } from './lib.js'

export class Load {
	constructor(file) {
		this.file = file
	}
	async text(encoding = 'utf8') {
		return bytes_to_string(await this.bytes())
	}
	async lines() {
		return lines(await this.text())
	}
	async json() {
		return parseJSON(await this.text())
	}
	async ndjson() {
		return (await this.lines()).map(x => parseJSON(x))//.filter(x => x)
	}
}