export function urlFrom(url, base, cwd) {
	if (base instanceof URL) base = base.href
	if (cwd && !(base?.startsWith?.('/') || base?.includes('://'))) base = cwd
	if (!base && !url?.includes?.('://')) url = 'file://' + url
	if (base && !base?.includes?.('://')) base = 'file://' + base
	// console.log('now file with url', url, 'and base', base)
	return new URL(cleanHREF(new URL(url, base).href))
}
function cleanHREF(href) { //.replace(/([^:]\/)\/+/g, "$1")
	return 'file://' + href.replace('file://', '').replaceAll('//', '/')
}
export function parseJSON(text) {
	try { return JSON.parse(text) }
	catch { log.warning('couldnt parse', text) }
}
export function bytes_to_string(bytes, encoding = 'utf8') {
	return new TextDecoder(encoding).decode(bytes)
}
export function string_to_bytes(string, encoding = 'utf8') {
	return new TextEncoder(encoding).encode(string)
}

