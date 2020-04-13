import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';
import tailwind from 'tailwindcss';
import postcss from 'rollup-plugin-postcss';
import purgeCss from '@fullhuman/postcss-purgecss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';

const production = !process.env.ROLLUP_WATCH;
const removeUnusedCss = purgeCss({
  content: ['./src/**/*.html', './src/**/*.svelte'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  whitelist: ['primary', 'secondary'],
  whitelistPatterns: [/icon$/]
});
const cssnano = require("cssnano")({ preset: 'default', });

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			preprocess: autoPreprocess({ /* options */ }),
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			// css: css => {
			// 	css.write('public/build/bundle.css');
			// }
			emitCss: true,
		}),

		postcss({
			plugins: [
			  postcssImport,
			  tailwind(),
			  autoprefixer,
			  production && removeUnusedCss,
			  production && cssnano,
			].filter(Boolean),
			extract: 'public/build/bundle.css',
		  }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
