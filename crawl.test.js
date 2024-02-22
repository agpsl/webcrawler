const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

test('normalizeURL https', () => {
	expect(normalizeURL('https://example.com')).toEqual('example.com');
});

test('normalizeURL https', () => {
	expect(normalizeURL('http://example.com')).toEqual('example.com');
});

test('normalizeURL trailing slash', () => {
	expect(normalizeURL('https://example.com/')).toEqual('example.com');
});

test('normalizeURL subdomain', () => {
	expect(normalizeURL('https://test.example.com')).toEqual('test.example.com');
});

test('normalizeURL capitalization', () => {
	expect(normalizeURL('https://EXAMPLE.com/')).toEqual('example.com');
});

test('normalizeURL longer path', () => {
	expect(normalizeURL('https://example.com/longer/path')).toEqual('example.com/longer/path');
});

test('normalizeURL extension', () => {
	expect(normalizeURL('https://example.com/file.ext')).toEqual('example.com/file.ext');
});

const baseURL = 'https://example.com'
test('getURLsFromHTML base eq url found', () => {
	const html = `<html><body><a href="https://example.com"><span>Go to Boot.dev</span></a></body></html>`;
	const expected = [ 'https://example.com/' ];
	expect(getURLsFromHTML(html, baseURL)).toEqual(expected);
});

test('getURLsFromHTML multiple urls', () => {
	const html = `<html><body><a href="https://example.com"><a href="https://example.com"><span>Go to Boot.dev</span></a></body></html>`;
	const expected = [ 'https://example.com/', 'https://example.com/' ];
	expect(getURLsFromHTML(html, baseURL)).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
	const html = `<html><body><a href="/relative/path"><span>Go to Boot.dev</span></a></body></html>`
	const expected = [ 'https://example.com/relative/path' ];
	expect(getURLsFromHTML(html, baseURL)).toEqual(expected);
});

test('getURLsFromHTML error handling', () => {
	const html = `<html><body><a href="relative/path"><span>Go to Boot.dev</span></a></body></html>`
	const expected = [ ];
	expect(getURLsFromHTML(html, baseURL)).toEqual(expected);
});
