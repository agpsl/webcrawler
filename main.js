const { crawlPage, normalizeURL } = require("./crawl.js");
const { printReport } = require("./report.js");

async function main() {
	if (process.argv.length != 3) {
		console.log('Usage: npm run start BASEURL');
		process.exit(1)
	}

	const baseURL = process.argv[2];

	console.log(`Starting to crawl ${baseURL}`);

	const normBaseURL = normalizeURL(baseURL);
	const pages = await crawlPage(baseURL, baseURL, { [normBaseURL]: 0 });
	printReport(pages);
}

main()
