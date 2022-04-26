console.log(import.meta.url)
console.log(new URL('bundle.js', import.meta.url))
console.log(Deno.cwd())
console.log(new URL('test/b.json', 'file://///' + Deno.cwd()))
import { Log } from '../../log/css.js'
// try{console.log(new URL('test/b.json',Deno.cwd()))}
// catch(e){console.log('error',e)}

import { fetchByteStream, stream, Fetch } from '../web/async/fetch.js'
import { bytesToText, textToLines, linesToJSON, consume, linesToTALI } from '../web/async/transform.js'





let loremURL = new URL('_test/lorem.txt', import.meta.url)
console.log(loremURL)

for await (const x of textToLines(bytesToText(fetchByteStream(loremURL))))
	console.log('::LINE::', x)

let ndjsonURL = new URL('_test/test.ndjson', import.meta.url)
// for await (const x of linesToJSON(textToLines(bytesToText(fetchByteStream(ndjsonURL)))))
for await (const x of stream(ndjsonURL).ndjson())
	console.log('::ndjson::', x)

let arr = (await consume(bytesToText(fetchByteStream(ndjsonURL)))).join('')
console.log('array', arr)

let taliURL = new URL('file:///Users/max/GitHub/TabLine/js/lib/testdata/out.tali')
// for await (const x of linesToCells(textToLines(bytesToText(fetchByteStream(taliURL)))))
// 	console.log('::tali::', x)
// for await (let line of stream(taliURL).tali())
// 	// console.log('Fetch item',line)
// 	1


// for await (const x of textToTALI((bytesToText(fetchByteStream(taliURL)))))
// 	console.log('::tali::', x)
// tali()
let tali = await new Fetch(taliURL).tali()
// console.log(tali)
