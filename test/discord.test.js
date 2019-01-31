const markdown = require('../index');

test('user parsing', () => {
	expect(markdown.toHTML('hey <@1234>!'))
		.toBe('hey <span class="d-mention d-user">@1234</span>!');
});

test('custom user parsing', () => {
	expect(markdown.toHTML('hey <@1234>!', {
		discordCallback: { user: node => {
			return '++@' + node.id + '++';
		}}
	})).toBe('hey <span class="d-mention d-user">++@1234++</span>!');
});

test('channel parsing', () => {
	expect(markdown.toHTML('goto <#1234>, please'))
		.toBe('goto <span class="d-mention d-channel">#1234</span>, please');
});

test('custom channel parsing', () => {
	expect(markdown.toHTML('goto <#1234>, please', {
		discordCallback: { channel: node => {
			return '++#' + node.id + '++';
		}}
	})).toBe('goto <span class="d-mention d-channel">++#1234++</span>, please');
});

test('role parsing', () => {
	expect(markdown.toHTML('is any of <@&1234> here?'))
		.toBe('is any of <span class="d-mention d-role">&1234</span> here?');
});

test('custom role parsing', () => {
	expect(markdown.toHTML('is any of <@&1234> here?', {
		discordCallback: { role: node => {
			return '++&' + node.id + '++';
		}}
	})).toBe('is any of <span class="d-mention d-role">++&1234++</span> here?');
});

test('emoji parsing', () => {
	expect(markdown.toHTML('heh <:blah:1234>'))
		.toBe('heh <span class="d-emoji">:blah:</span>');
});

test('custom emoji parsing', () => {
	expect(markdown.toHTML('heh <:blah:1234>', {
		discordCallback: { emoji: node => {
			return '++:' + node.id + ':++';
		}}
	})).toBe('heh <span class="d-emoji">++:1234:++</span>');
});

test('everyone mentioning', () => {
	expect(markdown.toHTML('Hey @everyone!', {
		discordCallback: {
			everyone: () => {
				return '++everyone++';
			}
		}
	})).toBe('Hey <span class="d-mention d-user">++everyone++</span>!');
});

test('here mentioning', () => {
	expect(markdown.toHTML('Hey @here!', {
		discordCallback: {
			here: () => {
				return '++here++';
			}
		}
	})).toBe('Hey <span class="d-mention d-user">++here++</span>!');
});

test('don\'t parse stuff in code blocks', () => {
	expect(markdown.toHTML('`<@1234>`'))
		.toBe('<code>&lt;@1234&gt;</code>');
});

test('animated emojis work', () => {
	expect(markdown.toHTML('heh <a:blah:1234>', {
		discordCallback: { emoji: node => {
			return '++' + (node.animated ? 'animated' : '') + ':' + node.id + ':++';
		}}
	})).toBe('heh <span class="d-emoji d-emoji-animated">++animated:1234:++</span>');
});

test('with discord-only don\'t parse normal stuff', () => {
	expect(markdown.toHTML('*yay* <@123456>', { discordOnly: true }))
		.toBe('*yay* <span class="d-mention d-user">@123456</span>');
});

test('spoilers are parsed correctly', () => {
	expect(markdown.toHTML('||fox||'))
		.toBe('<spoiler>fox</spoiler>');
	expect(markdown.toHTML('|| fox ||'))
		.toBe('<spoiler> fox </spoiler>');
	expect(markdown.toHTML('|| fox | bunny ||'))
		.toBe('<spoiler> fox | bunny </spoiler>');
	expect(markdown.toHTML('a ||fox|| and a ||bunny||\nlike to ||hop||'))
		.toBe('a <spoiler>fox</spoiler> and a <spoiler>bunny</spoiler><br>like to <spoiler>hop</spoiler>');
	expect(markdown.toHTML('this ||fox\nreally likes|| to dig'))
		.toBe('this <spoiler>fox<br>really likes</spoiler> to dig');
});

test('spoiler oddities', () => {
	expect(markdown.toHTML('||||'))
		.toBe('||||');
	expect(markdown.toHTML('|| ||'))
		.toBe('<spoiler> </spoiler>');
	expect(markdown.toHTML('||||||'))
		.toBe('<spoiler>|</spoiler>|');
	expect(markdown.toHTML('||<a>yay</a>||'))
		.toBe('<spoiler>&lt;a&gt;yay&lt;/a&gt;</spoiler>');
})
