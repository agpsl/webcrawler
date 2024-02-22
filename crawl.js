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

async function crawlPage(baseURL) {
	try {
		const response = await fetch(baseURL)
		const contentType = response.headers.get('Content-Type');
		if (response.status >= 400) {
			console.log('HTTP error: ' + response.statusText);
			return
		}
		if (!contentType.includes('text/html')) {
			console.log('Content is not HTML: ' + contentType);
			return
		}
		const html = await response.text();
		console.log(html);
	} catch (err) {
		console.log('Erro ao pegar HTML: ' + err);
	}
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
	crawlPage
}
