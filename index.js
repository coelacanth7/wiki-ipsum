const wikiIpsum = require("./lib");

module.exports = wikiIpsum;

wikiIpsum().then(str => {
	console.log(str);
});
