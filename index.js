const got = require("got");
const baseQuery =
	"https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&pageids=";

let redirects = "redirects=1";

function randomPage() {
	return Math.floor(Math.random() * Math.floor(1580147));
}

function wikiIpsum(wikiText) {
	const page = randomPage();

	var str = wikiText || "";
	if (str.length > 10000) {
		console.log(str);
		return str;
	}

	got(`${baseQuery}${page}`)
		.then(json => {
			let obj = JSON.parse(json.body);
			// console.log(obj);
			// console.log(json.body);
			if (
				obj.query.pages[page].missing === "" ||
				obj.warnings ||
				obj.query.pages[page].extract.length < 10
			) {
				console.log("no page");
				wikiIpsum(str);
			} else {
				// console.log(obj.query.pages[page].extract);
				str += "" + obj.query.pages[page].extract;
				wikiIpsum(str);
			}
		})
		.catch(err => {
			console.error(err);
		});
}

let str = wikiIpsum();

let failureSample = {
	batchcomplete: "",
	query: {
		pages: {
			"134": { pageid: 134, missing: "" }
		}
	}
};

let successSample = {
	batchcomplete: "",
	query: {
		pages: {
			"1344": {
				pageid: 1344,
				ns: 0,
				title: "Apple I",
				extract:
					"Apple Computer 1, also known later as the Apple I, or Apple-1, is a desktop computer released by the Apple Computer Company (now Apple Inc.) in 1976. It was designed and hand-built by Steve Wozniak. Wozniak's friend Steve Jobs had the idea of selling the computer. The Apple I was Apple's first product, and to finance its creation, Jobs sold his only motorized means of transportation, a VW Microbus, for a few hundred dollars, and Steve Wozniak sold his HP-65 calculator for $500; however, Wozniak said that Jobs planned to use his bicycle if necessary. It was demonstrated in July 1976 at the Homebrew Computer Club in Palo Alto, California.\nProduction was discontinued on September 30, 1977, after the June 10, 1977 introduction of its successor, the Apple II, which Byte magazine referred to as part of the \"1977 Trinity\" of personal computing (along with the PET 2001 and the TRS-80)."
			}
		}
	}
};
