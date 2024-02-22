const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

test('normalizeURL urls', () => {
	const urls = [
		'https://blog.boot.dev/path/',
		'https://blog.boot.dev/path',
		'http://blog.boot.dev/path/',
		'http://blog.boot.dev/path',
		'http://blog.boot.dev/path?a=b&c=d',
		'http://BLOG.boot.dev/path',
	]
	for (const url of urls) {
		expect(normalizeURL(url)).toBe('blog.boot.dev/path')
	}
})

test('getURLsFromHTML', () => {
	const baseURL = 'https://blog.boot.dev/'
	const htmls = [
		[`<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>`, ["https://blog.boot.dev/"]],
		[`<html><body><a href="https://blog.boot.dev"><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>`, ["https://blog.boot.dev/", "https://blog.boot.dev/"]],
		[`<html><body><a href="https://blog.boot.dev"><a href="/test.php?a=b"><span>Go to Boot.dev</span></a></body></html>`, ["https://blog.boot.dev/", "https://blog.boot.dev/test.php?a=b"]],
	]

	for (let i = 0; i < htmls.length; i++) {
		expect(getURLsFromHTML(htmls[i][0], baseURL)).toEqual(htmls[i][1])
	}
})
