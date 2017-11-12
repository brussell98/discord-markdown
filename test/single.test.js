const markdown = require('../index');

test('Converts **text** to <strong>text</strong>', () => {
	expect(markdown.toHTML('This is a **test** with **some bold** text in it'))
		.toBe('This is a <strong>test</strong> with <strong>some bold</strong> text in it');
});

test('Converts _text_ to <em>text</em>', () => {
	expect(markdown.toHTML('This is a _test_ with _some italicized_ text in it'))
		.toBe('This is a <em>test</em> with <em>some italicized</em> text in it');
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

test('Converts links to <a> links', () => {
	expect(markdown.toHTML('https://brussell.me'))
		.toBe('<a href="https://brussell.me">https://brussell.me</a>');

	expect(markdown.toHTML('<https://brussell.me>'))
		.toBe('<a href="https://brussell.me">https://brussell.me</a>');
});

test('Fenced code blocks with hljs', () => {
	expect(markdown.toHTML('```js\nconst one = 1;\nconsole.log(one);\n```'))
		.toBe('<pre><code class="hljs js"><span class="hljs-keyword">const</span> one = <span class="hljs-number">1</span>;\n<span class="hljs-built_in">console</span>.log(one);</code></pre>');
});

test('Escaped marks', () => {
	expect(markdown.toHTML('Code: \\`1 + 1` = 2`'))
		.toBe('Code: `1 + 1<code>= 2</code>');
});
