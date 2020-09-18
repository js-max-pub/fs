function test(file) {
	let testFile = file('abc.json');
	testFile.json = { abc: 1, bcd: 2 }
	console.log(testFile.json)
	console.log(testFile.size);
	console.log(testFile.path);
	testFile.remove()

	console.log(file('aa.txt').exists)
}
function run(sys) {
	import(`./js/file/${sys}.js`).then(x => test(x.default))
}


try {
	Deno;
	run('deno')
} catch  {
	run('node')
}