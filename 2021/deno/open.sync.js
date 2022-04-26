export class SyncOpen {
	constructor(file, mode) {
		this.file = file
		this.mode = mode
		this.handle = Deno.openSync(file.path, mode)
	}

	close() {
		Deno.close(this.handle)
		return this
	}

	* read() {
		for (let bytes of Deno.readSync(this.handle)){
			yield bytes
		}
	}
}