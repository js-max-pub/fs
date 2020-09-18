import FS from './js/auto.js';


(async function () {
	let {file,folder} = await FS();
	let testFile = file('test.json');
	testFile.json = { abc: 1, bcd: 2 }
	console.log(testFile.json)
	console.log(testFile.size);
	console.log(testFile.path);
	testFile.remove()

	console.log(file('test.txt').exists)

	let testFolder = folder('js');
	for (let item of testFolder.list(1))
		console.log('item',item )
})()


