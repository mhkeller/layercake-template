import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dsv from '@rollup/plugin-dsv';
import execute from "rollup-plugin-execute";
import json from "@rollup/plugin-json";
import css from 'rollup-plugin-css-only';

import config from './config.json';

export default {
	input: 'src/App.svelte',
	output: {
		file: 'build/App.js',
		format: 'cjs',
		sourcemap: true,
		exports: 'default'
	},
	plugins: [
		svelte({
			compilerOptions: {
				generate: 'ssr',
				hydratable: config.hydrate
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),
		dsv(),
		json(),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		execute(`node pre-render.js`)
	]
};
