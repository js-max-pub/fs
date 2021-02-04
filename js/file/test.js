import FS from '../auto.js';


(async function () {
	let {file,folder} = await FS();
	let testFile = file('-test/test.json');
	testFile.folder.create()
	testFile.json = { abc: 1, bcd: 2 }
	console.log(testFile.json)
	console.log(testFile.size);
	console.log(testFile.path);
	// testFile.remove()

	console.log(file('test.txt').exists)

})()


