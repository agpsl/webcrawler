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
		const href = link.href
		if (href.startsWith(baseURL)){
			try {
				urls.push(new URL(href, baseURL).href);
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

async function crawlPage(baseURL, currentURL, pages) {
	const baseURLObj = new URL(baseURL);
	const currentURLObj = new URL(currentURL);
	if (currentURLObj.host !== baseURLObj.host) {
		return pages
	}

	const normURL = normalizeURL(currentURL)

	if (pages[normURL] > 0) {
		pages[normURL]++;
		return pages
	}

	if (currentURL === baseURL) {
		pages[normURL] = 0;
	} else {
		pages[normURL] = 1;
	}

	// console.log(currentURL);

	let htmlContent = '';
	try {
        const response = await fetch(baseURL)
        const contentType = response.headers.get('Content-Type');

        if (response.status >= 400) {
	        console.log('HTTP error: ' + response.statusText);
			return pages
		}

		if (!contentType.includes('text/html')) {
			console.log('Content is not HTML: ' + contentType);
			return pages
		}

		htmlContent = await response.text()
	} catch (err) {
		console.log(err.message);
	}

	const urls = getURLsFromHTML(htmlContent, baseURL);
	for (const url of urls) {
		pages = await crawlPage(baseURL, url, pages);
	}

	return pages
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
	crawlPage
}
