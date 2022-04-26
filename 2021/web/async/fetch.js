import { Log } from '../../../log/mod.js'
let log = new Log('FS')
import * as transform from './transform.js'

export async function* fetchByteStream(url) {
	let a = await fetch(url)//.then(x=>x.body)
	for await (const x of a.body)
		yield x
}

export class Stream {
	constructor(url) {
		this.url = url
	}
	async * bytes() {
		yield* fetchByteStream(this.url)
	}
	async * text() {
		yield* transform.bytesToText(this.bytes())
	}
	async * lines() {
		yield* transform.textToLines(this.text())
	}
	async * ndjson() {
		yield* transform.linesToJSON(this.lines())
	}
	async * tali() {
		yield* transform.linesToTALI(this.lines())
	}
}
export function stream(url) { return new Stream(url) }

export class Fetch {
	constructor(url) {
		this.url = url
	}

	async tali() {
		let t0 = Date.now()
		let out = {}
		for await (const row of stream(this.url).tali())
			for (let key in row)
				out[key] = row[key]
		log.debug('tali dict', t0)
		return out
	}
}