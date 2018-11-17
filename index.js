const markdown = require('simple-markdown');
const highlight = require('highlight.js');

function htmlTag(tagName, content, attributes, isClosed) {
	attributes = attributes || { };
	isClosed = typeof isClosed !== 'undefined' ? isClosed : true;

	let attributeString = '';
	for (let attr in attributes) {
		// Removes falsy attributes
		if (Object.prototype.hasOwnProperty.call(attributes, attr) && attributes[attr])
			attributeString += ' ' + attr + '="' + attributes[attr] + '"';
	}

	let unclosedTag = '<' + tagName + attributeString + '>';

	if (isClosed)
		return unclosedTag + content + '</' + tagName + '>';
	return unclosedTag;
}

const rules = {
	codeBlock: Object.assign(markdown.defaultRules.codeBlock, {
		html: node => {
			if (node.lang && highlight.getLanguage(node.lang))
				var code = highlight.highlight(node.lang, node.content);

			return `<pre><code class="hljs${code ? ' ' + code.language : ''}">${code ? code.value : node.content}</code></pre>`
		}
	}),
	fence: Object.assign(markdown.defaultRules.fence, {
		match: markdown.inlineRegex(/^ *(`{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n *)*/)
	}),
	newline: markdown.defaultRules.newline,
	escape: markdown.defaultRules.escape,
	autolink: Object.assign(markdown.defaultRules.autolink, {
		parse: capture => {
			return {
				content: [{
					type: "text",
					content: capture[1]
				}],
				target: capture[1]
			};
		},
		html: (node, output, state) => {
			return htmlTag('a', output(node.content, state), { href: markdown.sanitizeUrl(node.target) });
		}
	}),
	url: Object.assign(markdown.defaultRules.url, {
//		match: markdown.inlineRegex(/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/),
		parse: capture => {
			return {
				content: [{
					type: 'text',
					content: capture[1]
				}],
				target: capture[1]
			}
		},
		html: (node, output, state) => {
			return htmlTag('a', output(node.content, state), { href: markdown.sanitizeUrl(node.target) });
		}
	}),
	em: markdown.defaultRules.em,
	strong: markdown.defaultRules.strong,
	u: markdown.defaultRules.u,
	del: Object.assign(markdown.defaultRules.del, {
		match: markdown.inlineRegex(/^~~(\s*?(?:\\[\s\S]|~(?!~)|[^\s\\~]|\s+(?!~~))+?\s*?)~~/),
	}),
	inlineCode: markdown.defaultRules.inlineCode,
	text: Object.assign(markdown.defaultRules.text, {
		match: source => /^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff-]|\n\n|\n|\w+:\S|$)/.exec(source)
	}),
	specialCaseArms: {
		order: markdown.defaultRules.escape.order - 0.5,
		match: source => /^¯\\_\(ツ\)_\/¯/.exec(source),
		parse: function(capture, parse, state) {
			return {
				content: parse(capture[0].replace(/^¯\\_\(ツ\)_\/¯/, '¯\\\\\\_(ツ)_/¯'), state)
			};
		},
		react: function(node, output, state) {
			return output(node.content, state);
		},
		html: function(node, output, state) {
			return output(node.content, state);
		},
	},
	br: Object.assign(markdown.defaultRules.br, {
		match: markdown.anyScopeRegex(/^\n/),
	}),
};

const rulesEmbed = Object.assign({}, rules, {
	link: Object.assign(markdown.defaultRules.link, {
		match: markdown.inlineRegex(/^\[(https?:\/\/[^\s<]+[^<.,:;"')\]\s])\]\(([^\s\)]+)\)/),
		parse: capture => {
			return {
				content: [{
					type: 'text',
					content: capture[2]
				}],
				target: capture[1]
			}
		},
		html: (node, output, state) => {
			return htmlTag('a', output(node.content, state), { href: markdown.sanitizeUrl(node.target) });
		}
	}),
});

const parser = markdown.parserFor(rules);
const htmlOutput = markdown.htmlFor(markdown.ruleOutput(rules, 'html'));
const parserEmbed = markdown.parserFor(rulesEmbed);
const htmlOutputEmbed = markdown.htmlFor(markdown.ruleOutput(rulesEmbed, 'html'));

function toHTML(source, options) {
	options = Object.assign({
		embed: false,
	}, options || {});

	let _parser = parser;
	let _htmlOutput = htmlOutput;
	if (options.embed) {
		_parser = parserEmbed;
		_htmlOutput = htmlOutputEmbed;
	}
	return _htmlOutput(_parser(source, { inline: true }));
}
module.exports = {
	parser: source => parser(source, { inline: true }),
	htmlOutput,
	toHTML,
};
