const markdown = require('../index');

test('Converts **text** to <strong>text</strong>', () => {
	expect(markdown.toHTML('This is a **test** with **some bold** text in it'))
		.toBe('This is a <strong>test</strong> with <strong>some bold</strong> text in it');
});

test('Converts _text_ to <em>text</em>', () => {
	expect(markdown.toHTML('This is a _test_ with _some italicized_ text in it'))
		.toBe('This is a <em>test</em> with <em>some italicized</em> text in it');
});

test('Converts _ text_ to <em> text </em>', () => {
	expect(markdown.toHTML('This is a _ test_ with _ italic _ text in it'))
		.toBe('This is a <em> test</em> with <em> italic </em> text in it');
});

test('Converts __text__ to <u>text</u>', () => {
	expect(markdown.toHTML('This is a __test__ with __some underlined__ text in it'))
		.toBe('This is a <u>test</u> with <u>some underlined</u> text in it');
});

test('Converts *text* to <em>text</em>', () => {
	expect(markdown.toHTML('This is a *test* with *some italicized* text in it'))
		.toBe('This is a <em>test</em> with <em>some italicized</em> text in it');
});

test('Converts `text` to <code>text</code>', () => {
	expect(markdown.toHTML('Code: `1 + 1 = 2`'))
		.toBe('Code: <code>1 + 1 = 2</code>');
});

test('Converts ~~text~~ to <del>text</del>', () => {
	expect(markdown.toHTML('~~this~~that'))
		.toBe('<del>this</del>that');
});

test('Converts ~~ text ~~ to <del>', () => {
	expect(markdown.toHTML('~~ text ~~ stuffs'))
		.toBe('<del> text </del> stuffs');
});

test('Converts links to <a> links', () => {
	expect(markdown.toHTML('https://brussell.me'))
		.toBe('<a href="https://brussell.me">https://brussell.me</a>');

	expect(markdown.toHTML('<https://brussell.me>'))
		.toBe('<a href="https://brussell.me">https://brussell.me</a>');
});

test('Fence normal codeblocks', () => {
	expect(markdown.toHTML('text\n```\ncode\nblock\n```\nmore text'))
		.toBe('text<br><pre><code class="hljs">code\nblock</code></pre>more text');
});

test('Fenced code blocks with hljs', () => {
	expect(markdown.toHTML('```js\nconst one = 1;\nconsole.log(one);\n```'))
		.toBe('<pre><code class="hljs js"><span class="hljs-keyword">const</span> one = <span class="hljs-number">1</span>;\n<span class="hljs-built_in">console</span>.log(one);</code></pre>');
});

test('Escaped marks', () => {
	expect(markdown.toHTML('Code: \\`1 + 1` = 2`'))
		.toBe('Code: `1 + 1<code>= 2</code>');
});

test('Multiline', () => {
	expect(markdown.toHTML('multi\nline'))
		.toBe('multi<br>line');
	expect(markdown.toHTML('some *awesome* text\nthat **spreads** lines'))
		.toBe('some <em>awesome</em> text<br>that <strong>spreads</strong> lines');
});

// apparently discord special-cased this exact thing, so that in this character sequence the \ doesn't escape
test('don\'t drop arms', () => {
	expect(markdown.toHTML('¯\\_(ツ)_/¯'))
		.toBe('¯\\_(ツ)_/¯');
	expect(markdown.toHTML('¯\\_(ツ)_/¯ *test* ¯\\_(ツ)_/¯'))
		.toBe('¯\\_(ツ)_/¯ <em>test</em> ¯\\_(ツ)_/¯');
});

test('only embeds have [label](link)', () => {
	expect(markdown.toHTML('[label](http://example.com)'))
		.toBe('[label](<a href="http://example.com">http://example.com</a>)');
	expect(markdown.toHTML('[label](http://example.com)', { embed: true }))
		.toBe('<a href="http://example.com">label</a>');
});

test('escape html', () => {
	expect(markdown.toHTML('<b>test</b>'))
		.toBe('&lt;b&gt;test&lt;/b&gt;');
});

test('don\'t escape html if set', () => {
	expect(markdown.toHTML('<b>test</b>', { escapeHTML: false }))
		.toBe('<b>test</b>');
});

test('css module support', () => {
	expect(markdown.toHTML('Hey @everyone check this out!', {
		cssModuleNames: {
			'd-mention': '_DiscordMessage_1ve6S_d-mention_A64y',
			'd-user': '_DiscordMessage_1ve6S_d-user_75Tef'
		}
	})).toBe('Hey <span class="_DiscordMessage_1ve6S_d-mention_A64y _DiscordMessage_1ve6S_d-user_75Tef">@everyone</span> check this out!');

	expect(markdown.toHTML('Hey @everyone check this out!'))
		.toBe('Hey <span class="d-mention d-user">@everyone</span> check this out!');
});
