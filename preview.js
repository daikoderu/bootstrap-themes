const express = require('express');


// App setup
const app = express();
app.set('view engine', 'pug');
app.set('views', './previewer/views');
app.use('/static', express.static('./previewer/static'));
app.use('/static/css/themes', express.static('./css'));

// Theme preview configuration
const config = require('./config.json');
baseContext = {
  htmlTitle: 'Daikoderu\'s Bootstrap Themes',
  themeList: config.themes,
};

// Endpoints
app.get('/', (req, res) => {
  res.render('index', baseContext)
});
app.get('/theme/:name', (req, res) => {
  res.render('preview', {
    ...baseContext,
    themeId: req.params.name,
    tabs: config.tabs,
    themeColors: config.themeColors,
    theme: config.themes[req.params.name],
    defaultTab: "accordion",
    colorVariants: ["primary", "secondary", "success", "danger", "warning", "info"],
  });
});

// Listening
app.listen(8080, () => {
  console.log(`⚡ Preview server ready at http://localhost:8080`);
})
