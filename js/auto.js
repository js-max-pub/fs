export default async function () {
    let system = '';
    try {
        Deno;
        system = 'deno';
    } catch  {
        system = 'node';
    }
    let mod = await import(`./${system}.js`)
    return mod.default;
}





// import deno from './deno.js';
// import node from './node.js';
// let out = null;
// try {
// 	Deno;
// 	out = deno;
// } catch {
// 	out = node;
// }
// // const out = Deno ? deno : node;
// export default out;