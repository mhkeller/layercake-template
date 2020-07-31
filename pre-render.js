require('svelte/register');
const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const { minify } = require("html-minifier");
const config = require('./config.json');

const includeJS = config.hydrate;

const App = require('./build/App.js');

const templatePath = './src/template.svelte';
const outDir = 'public';

const Template = require(templatePath).default;

const { head, html, css } = App.render({});
const data = Template.render({ includeJS, head, html });

const cssOptions = {};
const minifiedCss = new CleanCSS(cssOptions).minify(css.code).styles;

const htmlOptions = { collapseWhitespace: true };
const minifiedHtml = minify(data.html, htmlOptions);

fs.writeFileSync(path.join(outDir, 'index.html'), minifiedHtml, 'utf-8');
fs.writeFileSync(path.join(outDir, 'styles.css'), minifiedCss, 'utf-8');
fs.writeFileSync(path.join(outDir, 'styles.css.map'), css.map, 'utf-8');
