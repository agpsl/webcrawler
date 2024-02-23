function sortPagesCount(pages) {
	const retPages = Object.entries(pages)
	retPages.sort((a, b) => {
		return b[1] - a[1]
	});
	return retPages
}

function printReport(pages) {
	const srtPages = sortPagesCount(pages)
	for (const url of srtPages) {
		console.log(`Found ${url[1]} internal links to ${url[0]}`);
	}
}

module.exports = {
	sortPagesCount,
	printReport
}
