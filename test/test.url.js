import FS from './deno.js'
import './src/sync/test.url.js'
// console.log(new URL('./url.txt'))
let a = FS.file('url.txt')
FS.file(a.url)
FS.file(a.path)
FS.file('_test/../url.txt')
FS.file('_test/a.txt')

// import u from './sync/test.js'

// Deno.writeTextFileSync('url.txt', 'test')

// let url = new URL('url.txt', import.meta.url)
// console.log(url)
// console.log(Deno.readTextFileSync(url))
// //  url = new URL(Deno.)
// // console.log('u', u('url.txt'))
// console.log(new URL('file://' + url.pathname))

// console.log(new URL('file://url.txt'))
// console.log('OS',Deno.build.os)
// console.log('CWD',Deno.cwd())

// console.log(new URL(`file://${Deno.cwd()}/url.txt`, undefined))
// console.log(new URL('https://google.com/search'))

