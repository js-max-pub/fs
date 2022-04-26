export async function get_cwd() {
	try {
		let info = await Neutralino.os.execCommand('pwd');
		return info.stdOut.trim()
		// console.log(`pwd: ${info.stdOut}`);
	} catch (e) { console.log('exec error', e) }
}

const cwd = get_cwd()
export default await cwd