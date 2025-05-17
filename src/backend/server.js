const cors = require('cors');
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const { Dashboard } = require('./dashboard/dashboard.js');
const { ProfileClient}= require('./dashboard/ProfileClient.js');
const { checkArtisan, checkClient, checkAdmin } = require('./auth/jwt.js');
const { delClient, delArtisan, delAdmin } = require('./profile/profile_api.js');
const {
    registerArtisan,
    registerClient,
    registerAdmin,
    loginArtisan,
    loginClient,
    loginAdmin
} = require('./auth/auth_api.js');
// TODO: Remove this dependency
const { pool } = require('./db/dbConnection.js');

const frontendPort = 8000;
const port = 8080;

app.use(cors({
    origin: `http://localhost:${frontendPort}`,
    methods: ['GET', 'POST'],
}));

app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Artisan API',
            version: '1.0.0',
            description: 'API for Artigiano Online website',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./server.js'],
};

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

/**
 * @swagger
 * /api/auth/register/artisan:
 *   post:
 *      summary: Register a new artisan
 *      description: Register a new artisan with username, password, company name, and IBAN.
 *      parameters:
 *       - name: username
 *         in: body
 *         description: The username of the artisan.
 *         required: true
 *         type: string
 *       - name: password
 *         in: body
 *         description: The password of the artisan.
 *         required: true
 *         type: string
 *       - name: companyName
 *         in: body
 *         description: The company name of the artisan.
 *         required: true
 *         type: string
 *       - name: iban
 *         in: body
 *         description: The IBAN of the artisan.
 *         required: true
 *         type: string
 *      responses:
 *        200:
 *          description: Registration successful
 *        400:
 *          description: Bad request
 */
app.post('/api/auth/register/artisan', registerArtisan);
/**
 * @swagger
 * /api/auth/register/client:
 *   post:
 *      summary: Register a new client
 *      description: Register a new client with username, password, email, name, and surname.
 *      parameters:
 *       - name: username
 *         in: body
 *         description: The username of the client.
 *         required: true
 *         type: string
 *       - name: password
 *         in: body
 *         description: The password of the client.
 *         required: true
 *         type: string
 *       - name: email
 *         in: body
 *         description: The email of the client.
 *         required: true
 *         type: string
 *       - name: name
 *         in: body
 *         description: The name of the client.
 *         required: true
 *         type: string
 *       - name: surname
 *         in: body
 *         description: The surname of the client.
 *         required: true
 *         type: string
 *      responses:
 *        200:
 *          description: Registration successful
 *        400:
 *          description: Bad request
 */
app.post('/api/auth/register/client', registerClient);
/**
 * @swagger
 * /api/auth/register/admin:
 *   post:
 *      summary: Register a new admin
 *      description: Register a new admin with username and password.
 *      parameters:
 *       - name: username
 *         in: body
 *         description: The username of the admin.
 *         required: true
 *         type: string
 *       - name: password
 *         in: body
 *         description: The password of the admin.
 *         required: true
 *         type: string
 *      responses:
 *        200:
 *          description: Registration successful
 *        400:
 *          description: Bad request
 */
app.post('/api/auth/register/admin', registerAdmin);
/**
 * @swagger
 * /api/auth/login/artisan:
 *  post:
 *    summary: Login artisan
 *    description: Login artisan with username and password and get JWT token.
 *    parameters:
 *     - name: username
 *       in: body
 *       description: The username of the artisan.
 *       required: true
 *       type: string
 *     - name: password
 *       in: body
 *       description: The password of the artisan.
 *       required: true
 *       type: string
 *    responses:
 *      200:
 *        description: Authentication successful
 *      400:
 *        description: Bad request
 */
app.post('/api/auth/login/artisan', loginArtisan);
/**
 * @swagger
 * /api/auth/login/client:
 *  post:
 *    summary: Login client
 *    description: Login client with username and password and get JWT token.
 *    parameters:
 *     - name: username
 *       in: body
 *       description: The username of the client.
 *       required: true
 *       type: string
 *     - name: password
 *       in: body
 *       description: The password of the client.
 *       required: true
 *       type: string
 *    responses:
 *      200:
 *        description: Authentication successful
 *      400:
 *        description: Bad request
 */
app.post('/api/auth/login/client', loginClient);
/**
 * @swagger
 * /api/auth/login/admin:
 *  post:
 *    summary: Login Admin
 *    description: Login administrator with username and password and get JWT token.
 *    parameters:
 *     - name: username
 *       in: body
 *       description: The username of the admin.
 *       required: true
 *       type: string
 *     - name: password
 *       in: body
 *       description: The password of the admin.
 *       required: true
 *       type: string
 *    responses:
 *      200:
 *        description: Authentication successful
 *      400:
 *        description: Bad request
 */
app.post('/api/auth/login/admin', loginAdmin);

app.post('/api/profile/delete/client', checkClient, delClient);
app.post('/api/profile/delete/artisan', checkArtisan, delArtisan);
app.post('/api/profile/delete/admin', checkAdmin, delAdmin);

app.get('/api/artigiano/dashboard', checkArtisan, async (req, res) => {
    try {
        const artisan_name = req.username;
        const d = new Dashboard(pool, artisan_name);
        
        //TODO 
        //metodo per prendere tutti i prodotti

        res.status(200).json({ message: 'Dashboard data', data: "TODO" });

    } catch (error){
        console.error(error);
        res.status(400).json({message: 'Bad request', error: error.message})

    }
});


app.get('/api/client/Profile', async (req, res) => {
    try {
        const profile = new ProfileClient(pool, req.query.username); // esempio con username passato da query
        const products = await profile.getBuyProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});


app.put('/api/client/password', async (req, res) => {
    const { username, newPassword } = req.body;
    try {
        const profile = new ProfileClient(pool, username);
        const result = await profile.resetPassword(newPassword);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});


app.put('/api/client/email', async (req, res) => {
    const { username, newEmail } = req.body;
    try {
        const profile = new ProfileClient(pool, username);
        const result = await profile.ResetMail(newEmail);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});


app.post('/api/client/report', async (req, res) => {
    const { idSignal, orderId, description, resolved } = req.body;
    try {
        const profile = new ProfileClient(pool); // non servono parametri per segnalazione
        const result = await profile.newSignal(idSignal, orderId, description, resolved);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    console.log(`API documentation available at http://localhost:${port}/api/docs`);
});
