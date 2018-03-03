const got = require("got");

const baseQuery = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=";

const WordCount = str => str.split(" ").length;

async function wikiIpsum(max) {
	let str = "";
	let maxWords = max || 200;

	while (WordCount(str) < maxWords) {
		let result;
		try {
			result = await getWikiText();
		} catch (err) {
			console.error(error);
			result = false;
		}
		if (!result) break;
		str += " " + result;
	}

	if (max) str.split(" ").slice(0, maxWords).join(" ");
	return str;
}

async function getWikiText() {
	try {
		const response = await got("http://en.wikipedia.org/wiki/Special:Random");
		const articleTitle = response.url.substring(30);
		const apiJson = await got(`${baseQuery}${articleTitle}`);
		const parsedText = JSON.parse(apiJson.body).query.pages;
		const text = Object.values(parsedText)[0].extract.replace(/^\s+|\s+$/g, "");
		return text.replace(/\s\s/g, "");
	} catch (error) {
		console.error(error);
		return false;
	}
}

module.exports = wikiIpsum;
