const markdown = require('../index');

test('user parsing', () => {
  expect(markdown.toHTML('hey <@1234>!'))
    .toBe('hey @1234!');
});

test('custom user parsing', () => {
  expect(markdown.toHTML('hey <@1234>!', {
    discordCallback: { user: node => {
      return '++@' + node.id + '++';
    }}
  })).toBe('hey ++@1234++!');
});

test('channel parsing', () => {
  expect(markdown.toHTML('goto <#1234>, please'))
    .toBe('goto #1234, please');
});

test('custom channel parsing', () => {
  expect(markdown.toHTML('goto <#1234>, please', {
    discordCallback: { channel: node => {
      return '++#' + node.id + '++';
    }}
  })).toBe('goto ++#1234++, please');
});

test('role parsing', () => {
  expect(markdown.toHTML('is any of <@&1234> here?'))
    .toBe('is any of &1234 here?');
});

test('custom role parsing', () => {
  expect(markdown.toHTML('is any of <@&1234> here?', {
    discordCallback: { role: node => {
      return '++&' + node.id + '++';
    }}
  })).toBe('is any of ++&1234++ here?');
});

test('emoji parsing', () => {
  expect(markdown.toHTML('heh <:blah:1234>'))
    .toBe('heh :blah:');
});

test('custom emoji parsing', () => {
  expect(markdown.toHTML('heh <:blah:1234>', {
    discordCallback: { emoji: node => {
      return '++:' + node.id + ':++';
    }}
  })).toBe('heh ++:1234:++');
});

test('don\'t parse stuff in code blocks', () => {
  expect(markdown.toHTML('`<@1234>`'))
    .toBe('<code>&lt;@1234&gt;</code>');
});
