require('svelte/register');
const fs = require('fs');
const { minify } = require("html-minifier");

const production = process.argv[2] === 'true';

const templatePath = './src/template.svelte';
const outPath = 'public/index.html';

const Template = require(templatePath).default;

const { html } = Template.render({ includeJS: true });

const output = production ? minify(html, { collapseWhitespace: true }) : html;

fs.writeFileSync(outPath, output, 'utf-8');
