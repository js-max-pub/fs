export function parseJSON(text) {
	try { return JSON.parse(text) }
	catch { log.warning('couldnt parse', text) }
}
export function bytes_to_string(bytes, encoding = 'utf8') {
	return new TextDecoder(encoding).decode(bytes)
}
