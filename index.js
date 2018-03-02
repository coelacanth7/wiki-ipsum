const got = require("got");

const baseQuery =
	"https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=";

function wikiIpsum(wikiText) {
	var str = wikiText || "";
	if (str.length > 1000) {
		console.log(str);
		return str;
	}

	got("http://en.wikipedia.org/wiki/Special:Random")
		.then(res => {
			return res.url.substring(30);
		})
		.then(title => {
			got(`${baseQuery}${title}`)
				.then(json => {
					let obj = JSON.parse(json.body);
					let text = Object.values(obj.query.pages)[0].extract.replace(
						/^\s+|\s+$/g,
						""
					);

					if (text.length < 10) {
						wikiIpsum(str);
					} else {
						str += "" + text;
						wikiIpsum(str);
					}
				})
				.catch(err => {
					console.error(err);
				});
		})
		.catch(err => {
			console.error(err);
		});
}

let str = wikiIpsum();
