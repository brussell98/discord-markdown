# discord-markdown
A markdown parser with the same rules as Discord.

> This is still in development. A complete set of tests is needed.
> If you know any special cases of discord markdown let me know or submit a PR.

## Using

```bash
yarn add @brussell98/discord-markdown
```

```js
const { parser, htmlOutput, toHTML } = require('discord-markdown');

console.log(toHTML('This **is** a __test__'));
// => This <strong>is</strong> a <u>test</u>
```

Fenced codeblocks will include highlight.js tags and classes.

## Contributing

Find an inconsistency? File an issue, or submit a pull request with the fix and updated test.
