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
const optionsCompressed = {
  loadPaths: ['.'],
  style: 'compressed',
}

console.log(`Transpiling themes: ${themes}`)
for (let theme of themes) {
  // Transpile theme files.
  const source = `./scss/themes/${theme}/bootstrap.scss`;
  fs.writeFileSync(`./css/themes/${theme}/bootstrap.css`, sass.compile(source, options).css);
  fs.writeFileSync(`./css/themes/${theme}/bootstrap.min.css`, sass.compile(source, optionsCompressed).css);

  // Transpile color previews.
  const colorPreviews = `./scss/themes/${theme}/colorpreview.scss`;
  fs.writeFileSync(`./css/themes/${theme}/colorpreview.min.css`, sass.compile(colorPreviews, optionsCompressed).css);
}
