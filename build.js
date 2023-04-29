const fs = require('fs');
const sass = require('sass');
const config = require('./config.json');


const params = process.argv.slice(2);
let themes;
if (params.length === 1 && params[0] === 'all') {
  themes = Object.keys(config.themes);
} else if (params.length === 0) {
  console.error('No themes specified.');
  process.exit(1);
} else {
  themes = params;
}

const options = {
  loadPaths: ['.'],
}

console.log(`Transpiling themes: ${themes}`)
for (let theme of themes) {
  const source = `./scss/${theme}.scss`;
  fs.writeFileSync(`./css/${theme}/bootstrap.css`, sass.compile(source, options).css);
  fs.writeFileSync(`./css/${theme}/bootstrap.min.css`, sass.compile(source, {
    ...options,
    style: 'compressed',
  }).css);

  const colorPreview = `./scss/colorpreviews/${theme}.scss`;
  fs.writeFileSync(`./static/css/colorpreviews/${theme}.min.css`, sass.compile(colorPreview, {
    ...options,
    style: 'compressed',
  }).css);
}
