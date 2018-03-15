let request = require("async-request"),
	response;

const baseQuery =
	"https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=";

const WordCount = str => str.split(" ").length;

async function wikiIpsum(max) {
	let str = "";
	let maxWords = max || 200;

	while (WordCount(str) < maxWords) {
		let result;
		try {
			result = await getWikiText();
		} catch (error) {
			console.error(error);
			result = false;
		}
		if (!result) break;
		str += " " + result;
	}

	if (max)
		str
			.split(" ")
			.slice(0, maxWords)
			.join(" ");
	return str.trim();
}

async function getWikiText() {
	try {
		response = await request("http://en.wikipedia.org/wiki/Special:Random");
		let re = /\bwgPageName\\":\\"[^\\]*/g;
		const articleTitle = JSON.stringify(response.body)
			.match(re)[0]
			.substring(14)
			.substring(1);
		const apiJson = await request(`${baseQuery}${articleTitle}`);
		const parsed = JSON.parse(apiJson.body).query.pages;
		const text = Object.values(parsed)[0].extract.replace(/^\s+|\s+$/g, "");
		return text.replace(/\s\s/g, "");
	} catch (error) {
		console.error(error);
		return false;
	}
}

module.exports = wikiIpsum;
