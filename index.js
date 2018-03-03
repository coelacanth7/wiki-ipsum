const got = require("got");

const baseQuery =
	"https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=";

const WordCount = str => str.split(" ").length;

// wikiIpsum
async function wikiIpsum(max) {
	let str = "";
	let maxWords = max || 200;

	while (WordCount(str) < maxWords) {
		await getWikiText().then(wikiText => {
			str += "" + wikiText;
		});
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
				});
		})
		.catch(err => {
			console.error(err);
		});
}

// wikiIpsum().then(str => console.log(str));
// getWikiText().then(text => console.log(text));
