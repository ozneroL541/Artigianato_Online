const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const pagesPath = path.join(__dirname, './public/pages');
const publicPath = path.join(__dirname, './public');
const options = {
    extensions: ['html', ''],
    immutable: true,
    index: 'index.html'
};
app.use(express.static(pagesPath, options));
app.use(express.static(publicPath, {immutable: true, index: false}));

app.listen(port, () => {
    console.log(`Frontend running at http://localhost:${port}/`);
});
