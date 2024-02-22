const { JSDOM } = require('jsdom')

function normalizeURL (rawURL) {
	const url = new URL(rawURL);
	let path = '';
	if (url.pathname.endsWith('/')) {
		path = url.pathname.slice(0, -1);
	} else {
		path = url.pathname;
	}
	return `${url.host}${path}`;
}

function getURLsFromHTML(htmlBody, baseURL) {
	const dom = new JSDOM(htmlBody);
	const links = dom.window.document.querySelectorAll('a');
	const urls = []

	for (const link of links) {
		href = link.href
		if (href.startsWith(baseURL)){
			try {
				urls.push(new URL(href).href);
			} catch (err) {
				console.log(err.message, href);
			}
		} else if (href.startsWith('/')){
			try {
				urls.push(new URL(href, baseURL).href);
			} catch (err) {
				console.log(err.message, href);
			}
		}
	}
	return urls
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
}
