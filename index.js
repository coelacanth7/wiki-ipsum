const got = require("got");

const baseQuery =
	"https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=";

// wikiIpsum
async function wikiIpsum() {
	var str = "";

	while (str.length < 1000) {
		await getWikiText().then(wikiText => {
			str += "" + wikiText;
		});
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

					// str += "" + text;
					// wikiIpsum(str);
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

wikiIpsum().then(str => console.log(str));
// getWikiText().then(text => console.log(text));
