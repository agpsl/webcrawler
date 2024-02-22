const { crawlPage } = require("./crawl.js");

function main() {
	if (process.argv.length != 3) {
		console.log('Usage: npm run start BASEURL');
		process.exit(1)
	}

	const baseURL = process.argv[2];

	console.log(`Starting to crawl ${baseURL}`);

	crawlPage(baseURL);
}

main()
