const wikiIpsum = require("./lib");

module.exports = wikiIpsum;

wikiIpsum(500).then(str => console.log(str));
