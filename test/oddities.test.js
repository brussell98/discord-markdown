const markdown = require('../index');

test('Unmatched mark', () => {
	expect(markdown.toHTML('`Inline `code` with extra marker'))
		.toBe('<code>Inline</code>code` with extra marker');
});

test('* next to space', () => {
	expect(markdown.toHTML('*Hello World! *'))
		.toBe('*Hello World! *');
});

test('Triple *s', () => {
	expect(markdown.toHTML('***underlined bold***'))
		.toBe('<em><strong>underlined bold</strong></em>');
});

test('Inline code with ` inside', () => {
	expect(markdown.toHTML('``function test() { return "`" }``'))
		.toBe('<code>function test() { return "`" }</code>');
});

test('Code blocks aren\'t parsed', () => {
	expect(markdown.toHTML('some\n    text'))
		.toBe('some<br>    text');
});

test('multiple new lines', () => {
	expect(markdown.toHTML('some\n\ntext'))
		.toBe('some<br><br>text');
});
