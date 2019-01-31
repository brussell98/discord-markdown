# [2.1.2](https://github.com/brussell98/discord-markdown/compare/v2.1.1...v2.1.2) (2019-01-31)

### Fixes

- Updated spoiler handling to match the Discord release of spoiler tags
- Added eslint to travis

# [2.1.1](https://github.com/brussell98/discord-markdown/compare/v2.1.0...v2.1.1) (2018-12-17)

### Fixes

- Fixed CSS Module support in highlight.js code blocks

# [2.1.0](https://github.com/brussell98/discord-markdown/compare/v2.0.0...v2.1.0) (2018-12-14)

This release improves on the library to make it easier to use and less error-prone.

### Features

- Added CSS Module support with `options.cssModuleNames`
- Add initial support for spoilers. This feature is not final, and will change as Discord releases it.

### Improvements

- Store options in the simple-markdown state instead of persistent variables, preventing options from impacting all other instances.
- Wrap mentions and emojis in `span` tags, including scoped classes for styling.
- Made code block parsing more lenient to further match Discord.
