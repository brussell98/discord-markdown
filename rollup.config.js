import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';

export default {
	input: 'index.js',
	external: ['highlight.js', 'simple-markdown'],
	output: {
		format: 'iife',
		file: 'dist/discord-markdown-fix.min.js',
		name: 'discordMarkdown',
		exports: 'named',
		globals: {
			'simple-markdown': 'markdown',
			'highlight.js': 'hljs',
		},
	},
	plugins: [
		commonjs(),
		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		terser(),
	],
};