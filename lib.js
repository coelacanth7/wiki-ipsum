const got = require("got");

const baseQuery =
	"https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=";

const WordCount = str => str.split(" ").length;

// wikiIpsum
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

	if (max) {
		str
			.split(" ")
			.slice(0, maxWords)
			.join(" ");
	}

	return str;
}

function getWikiText() {
	return got("http://en.wikipedia.org/wiki/Special:Random")
		.then(res => {
			// get a random useful wikipedia page
			return res.url.substring(30);
		})
		.then(title => {
			// use random page to get clean text
			// normal wikipedia text is cluttered
			return got(`${baseQuery}${title}`)
				.then(json => {
					let obj = JSON.parse(json.body);
					let text = Object.values(obj.query.pages)[0].extract.replace(
						/^\s+|\s+$/g,
						""
					);

					return text;
				})
				.catch(err => {
					console.error(err);
					return false;
				});
		})
		.catch(err => {
			console.error(err);
			return false;
		});
}

module.exports = wikiIpsum;
