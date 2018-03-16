let request = require("async-request"),
	response;

const baseQuery =
	"https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro=&explaintext=&titles=";
const titles =
	"https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=1&format=json&origin=*&rnnamespace=0";

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
		if (result === false) break;
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
		response = await request(titles);
		let articleTitle = JSON.parse(response.body).query.random[0].title;
		if (!articleTitle) return "";
		const apiJson = await request(`${baseQuery}${articleTitle}`);
		const parsed = JSON.parse(apiJson.body).query.pages;
		const text = Object.values(parsed)[0].extract.replace(/^\s+|\s+$/g, "");
		if (text === "" || !text) return "";
		return text.replace(/\s\s/g, "");
	} catch (error) {
		console.error(error);
		return false;
	}
}

module.exports = wikiIpsum;
