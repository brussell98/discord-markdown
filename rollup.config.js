import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';

export default {
	input: 'index.js',
	output: {
		format: 'iife',
		file: 'dist/discord-markdown-fix.min.js',
		name: 'discordMarkdown',
		exports: 'named'
	},
	plugins: [
		nodeResolve(),
		commonjs(),
		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		terser()
	]
}