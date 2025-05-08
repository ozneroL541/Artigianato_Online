const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const frontendPath = path.join(__dirname, '../frontend');

app.use(express.static(frontendPath));

// Routes

route('/', 'index')
route('artigiano/dashboard')
route('auth/login')
route('auth/register')

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

/**
 * This function automatically creates a route for a given path.
 *
 * It can accept one argument which is both the path for the file and the route or two arguments, the fist is the path for the route
 * and the second the path for the file
 * @author Leonardo Basso
 * */
function route() {
    switch (arguments.length) {
        case 1:
            app.get(`/${arguments[0]}`, (req, res) => {
                res.sendFile(path.join(frontendPath, `pages/${arguments[0]}.html`));
            });
            break;
        case 2:
            app.get(`/${arguments[0]}`, (req, res) => {
                res.sendFile(path.join(frontendPath, `pages/${arguments[1]}.html`));
            });
            break;
        default:
            console.error('Invalid number of arguments for route()');
            break;
    }
}