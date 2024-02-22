const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

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
