function normalizeURL (rawURL) {
	const url = new URL(rawURL);
	let path = '';
	if (url.pathname.endsWith('/')) {
		path = url.pathname.slice(0, -1)
	} else {
		path = url.pathname
	}
	return `${url.host}${path}`
}

module.exports = {
	normalizeURL
}
