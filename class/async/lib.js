

export async function consume(generator) {
	let out = []
	for await (const x of generator)
		out.push(x)
	return out
}

export async function sleep(t) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, t)
	})
}