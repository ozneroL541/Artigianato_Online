const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const frontendPath = path.join(__dirname, '../frontend/pages');
const options = {
    extensions: ['html', ''],
    immutable: true,
    index: 'index.html'
};

app.use(express.static(frontendPath, options));
app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
