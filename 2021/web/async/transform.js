import { Log } from '../../../log/mod.js'
let log = new Log('stream')
import { lines as stringToLineArray } from '../../../string/mod.js'





export async function* bytesToText(byteStream, encoding = 'utf8') {
	let dec = new TextDecoder(encoding)
	for await (const x of byteStream)
		yield dec.decode(x)
}


export async function* textToLines(textStream) {
	let t0 = Date.now()
	let count = 0
	let lastLine = ''
	for await (const x of textStream) {
		// let lines = x.split('\n')
		let lines = stringToLineArray(x)
		yield lastLine + lines.shift()
		lastLine = lines.pop()
		for (const l of lines) yield l
		count += lines.length + 1
	}
	yield lastLine
	log.debug('streamed', count + 1, 'lines', t0)
}


export async function* linesToJSON(lineStream) {
	for await (const x of lineStream)
		yield parseJSON(x)
}

export async function* lines_to_cells(lineStream) {
	for await (const x of lineStream)
		yield x.split('\t')
}
export async function* lines_to_TALI_cells(lineStream) {
	for await (const x of lineStream)
		yield x.split('\t').map(x => decodeTALIcell(x))
}

export const taliLINE = '↵'
export const taliTAB = '⇥'
export function encodeTALIcell(str) { // js-string -> tali-string
	return String(str).replaceAll('\t', taliTAB).replaceAll('\n', taliLINE).trim()
}
export function decodeTALIcell(str) { // tali-string -> js-string
	return String(str).replaceAll(taliTAB, '\t').replaceAll(taliLINE, '\n').trim()
}

export async function* linesToTALI(lineStream) {
	let t0 = Date.now()
	let x = lines_to_cells(lineStream)
	let header = (await x.next()).value.slice(1)
	// console.log('first',first)
	for await (const cells of x)
		yield { [cells[0]]: Object.fromEntries(cells.slice(1).map((x, i) => [header[i], x])) }
	log.debug('parsed tali', t0)
}

export function parseJSON(text) {
	try { return JSON.parse(text) }
	catch { log.warning('couldnt parse', text) }
}



export async function consume(generator) {
	let out = []
	for await (const x of generator)
		out.push(x)
	return out
}