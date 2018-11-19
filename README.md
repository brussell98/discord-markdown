# discord-markdown
A markdown parser for Discord messages.

## Using

```bash
yarn add discord-markdown
npm i discord-markdown
```

```js
const { parser, htmlOutput, toHTML } = require('discord-markdown');

console.log(toHTML('This **is** a __test__'));
// => This <strong>is</strong> a <u>test</u>
```

Fenced codeblocks will include highlight.js tags and classes.

### Advanced usage

Discord has custom patterns for user mentions, channel mentions etc. `discord-markdown` provides a way to easily define callbacks so that you can have custom parsing behavior on those.

`discord-markdown` has multiple options to set:

```js
const { toHTML } = require('discord-markdown');
toHTML('This **is** a __test__', options);
```

`options` is here an object, the following properties exist (all are optional):

* `embed`: boolean (default: false), if it should parse embed contents (rules are slightly different)
* `escapeHTML`: boolean (default: true), if it should escape HTML
* `discordOnly`: boolean (default: false), if it should only parse the discord-specific stuff
* `discordCallback`: object, callbacks used for discord parsing. Each receive an object with different properties, and are expected to return an HTML escaped string
  * `user`: (`id`: number) user mentions "@someperson"
  * `channel`: (`id`: number) channel mentions "#somechannel"
  * `role`: (`id`: number) role mentions "@somerole"
  * `emoji`: (`animated`: boolean, `name`: string, `id`: number) emojis ":emote":
  * `everyone`: () everyone mention "@everyone"
  * `here`: () here mention "@here"

Example:

```js
const { toHTML } = require('discord-markdown');
toHTML('This **is** a __test__ for <@1234>', {
	discordCallback: {
		user: node => {
			// optionally fetch the username of that person based on their userid (node.id)
			return '@' + node.id;
		}
	}
});
```

## Contributing

Find an inconsistency? File an issue or submit a pull request with the fix and updated test(s).
