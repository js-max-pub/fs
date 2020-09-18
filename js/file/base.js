export default class {
	get json() {
		return JSON.parse(this.text)
	}
	set json(p) {
		this.text = JSON.stringify(p, null, '\t')
	}
	get size() {
		return this.stat.size;
	}
}