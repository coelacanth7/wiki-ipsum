# wiki-ipsum

> Get random text generated from wikipedia articles. More interesting filler than your average lorem ipsum.

For longer Ipsums, many requests must be made to wikipedia which could slow down your application

## Get text without any code

https://wiki-ipsum.herokuapp.com/

## API

```
$ npm i wiki-ipsum
```

#### Example Usage:

```js
const wikiIpsum = require("wiki-ipsum");

wikiIpsum().then(text => {
	console.log(text);
	// Edward Herrera (born 14 November 1986 in Pietà, Malta) is a Maltese
	// footballer. He currently plays for the Maltese Premier League side
	// Birkirkara, where he plays mainly as a wing back. He also works as a
	// teacher at De La Salle College, where he teaches pure
	// mathematics. Policy monitoring comprises a range of activities
	// describing and analyzing the development and implementation of
	// policies, identifying potential gaps in the process, outlining areas
	// or improvement, and holding policy implementers accountable for
	// their activities
});

// an optional word length parameter can be supplied:
wikiIpsum(40).then(text => {
	console.log(text);
	// The Liberty Bank (Georgian: ლიბერთი ბანკი, libert'i banki), formerly
	// the People's Bank of Georgia (Georgian: საქართველოს სახალხო ბანკი,
	// sak'art'velos sakhalkho banki) is private bank in Georgia, the seventh
	// largest in the country by total assets with 3.4% market share. It has
	// the largest network of branches in Georgia.
});
```

## License

MIT © Gregory Alford
