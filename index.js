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
	br: Object.assign(markdown.defaultRules.br, {
		match: markdown.anyScopeRegex(/^\n/),
	}),
};

const parser = markdown.parserFor(rules);
const htmlOutput = markdown.htmlFor(markdown.ruleOutput(rules, 'html'));

module.exports = {
	parser: source => parser(source, { inline: true }),
	htmlOutput,
	toHTML: source => htmlOutput(parser(source, { inline: true }))
};
