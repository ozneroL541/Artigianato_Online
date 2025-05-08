const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const frontendPath = path.join(__dirname, '../frontend/public');

app.use(express.static(frontendPath));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
