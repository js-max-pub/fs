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
