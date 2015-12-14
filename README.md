# Changelog, please

Generate changelogs from git commit messages using node.js. The generated changelogs are written in markdown.

Support this project by [donating on Gittip](https://www.gittip.com/scottgonzalez/).

## Installation

```
npm install changelogplease
```

## Usage

```javascript
var changelog = require( "changelogplease" );
changelog({
	ticketUrl: "https://github.com/scottgonzalez/changelogplease/issues/{id}",
	commitUrl: "https://github.com/scottgonzalez/changelogplease/commit/{id}",
	repo: "/path/to/repo",
	committish: "1.2.3..1.2.4"
}, function( error, log ) {
	if ( error ) {
		console.log( error );
		return;
	}

	console.log( log );
});
```

## API

### changelog( options, callback )

* `options` (Object): Options for creating the changelog.
  * `ticketTypes` (Array): Which ticket types to look for when parsing logs. See [#changelog-ticketparsers](`Changelog.ticketParsers`) for a list of available types. Defaults to `["github"]`.
  * `ticketUrl` (String or Object): Template(s) for ticket/issue URLs; `{id}` will be replaced with the ticket ID. When specifying multiple values for `ticketTypes`, `ticketUrl` must be an object with the ticket type as the keys and the URL templates as the values.
  * `commitUrl (String)`: Template for commit URLs; `{id}` will be replaced with the commit hash.
  * `repo` (String): Path to the repository.
  * `committish` (String): The range of commits for the changelog.
  * `sort` (Boolean, Function): Function for sorting commits. By default commits are sorted alphabetically so they are grouped by component. A value of `false` disables sorting.
* `callback` (Function; `function( error, log )`): Function to invoke after generating the changelog.
  * `log` (String): Generated changelog, written in markdown.

### Changelog

`changelog( options, callback )` is a shorthand for the following:

```js
var Changelog = require( "changelogplease" ).Changelog;
var instance = new Changelog( options );
instance.parse( callback );
```

Changelog generation is tailored to a specific format based on the needs of the various jQuery
projects. However, the `Changelog` constructor and prototype are exposed to allow flexibility.
Be aware that these methods are not currently documented because they may change. Feel free to
submit [feature requests](https://github.com/scottgonzalez/changelogplease/issues/new) if you don't
feel comfortable hacking in your own changes (or even if you do).

### Changelog.ticketParsers

Changelogplease supports multiple issue trackers. `Changelog.ticketParsers` defines the list of supported ticket types and allows user-defined parsers to be added.

#### Built-in parsers

* github: The github parser supports all forms of GitHub issue references: `#123`, `gh-123`, and `account/repo#123`. Because GitHub supports the short form `#123`, this parser can be used for other issue trackers as well.
* jira: JIRA issues must be in the form `PROJECT-123`, with the project reference in all caps.

#### Custom parsers

Custom parsers can be implemented by adding a new property to `Changelog.ticketParsers`. The key is the name of the parser and the value is a function which receives two parameters:

* `commit` (String): The full commit message.
* `ticketUrl` (Function; `function( ticketId )`): A function which accepts a ticket ID and returns the URL for the specified ticket.

The function must return an array of objects each containing two values:

* `url`: The URL for the ticket (generated by invoking the `ticketUrl` method).
* `label`: The label for the ticket.

## License

Copyright 2014 Scott González. Released under the terms of the MIT license.

---

Support this project by [donating on Gittip](https://www.gittip.com/scottgonzalez/).
