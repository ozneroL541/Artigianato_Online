const cors = require('cors');
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const { Dashboard } = require('./dashboard/dashboard.js');
const { ProfileClient}= require('./dashboard/ProfileClient.js');
const { checkArtisan, checkClient, checkAdmin } = require('./auth/jwt.js');
const { delClient, delArtisan, delAdmin } = require('./profile/profile_api.js');
const { Search } = require('./dashboard/searchProductClass.js');
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

/** Port for the frontend server */
const frontendPort = 8000;
/** Port for the backend server */
const port = 8080;

/** Middleware to enable CORS */
app.use(cors({
    origin: `http://localhost:${frontendPort}`,
    methods: ['GET', 'POST'],
}));

/** Middleware to parse JSON request bodies */
app.use(express.json());

/** Swagger options for API documentation */
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

/**
 * Use Swagger UI to serve the API documentation
 */
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
/**
 * @swagger
 * /api/profile/delete/client:
 *  delete:
 *   summary: Delete client
 *   description: Delete a client profile.
 *   parameters:
 *    - name: username
 *      in: body
 *      description: The username of the client.
 *      required: true
 *      type: string
 *   responses:
 *    200:
 *     description: Client deleted successfully
 *    500:
 *     description: Error deleting Client
 */
app.delete('/api/profile/delete/client', checkClient, delClient);
/**
 * @swagger
 * /api/profile/delete/artisan:
 *  delete:
 *   summary: Delete artisan
 *   description: Delete an artisan profile.
 *   parameters:
 *    - name: username
 *      in: body
 *      description: The username of the artisan.
 *      required: true
 *      type: string
 *   responses:
 *    200:
 *     description: Artisan deleted successfully
 *    500:
 *     description: Error deleting Artisan
 */
app.delete('/api/profile/delete/artisan', checkArtisan, delArtisan);
/**
 * @swagger
 * /api/profile/delete/admin:
 *  delete:
 *   summary: Delete admin
 *   description: Delete an admin profile.
 *   parameters:
 *    - name: username
 *      in: body
 *      description: The username of the admin.
 *      required: true
 *      type: string
 *   responses:
 *    200:
 *     description: Admin deleted successfully
 *    500:
 *     description: Error deleting Admin
 */
app.delete('/api/profile/delete/admin', checkAdmin, delAdmin);

// TODO: doc e spostare funzione asincrona in altro file
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

// TODO: Utilizzare JWT per autenticazione e ottenere username
// TODO: doc e spostare funzione asincrona in altro file
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

// TODO: Utilizzare JWT per autenticazione e ottenere username
// TODO: doc e spostare funzione asincrona in altro file
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

// TODO: Utilizzare JWT per autenticazione e ottenere username
// TODO: doc e spostare funzione asincrona in altro file
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

// TODO: Utilizzare JWT per autenticazione
// TODO: doc e spostare funzione asincrona in altro file
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

// All products
app.get('/api/ricerca/dashboard', async (req, res) => {
    try {
        const research = new ProductResearch(pool);
        const products = await research.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

// products by id
app.get('/api/ricerca/dashboard/:id', async (req, res) => {
    try {
        const research = new ProductResearch(pool, req.params.id);
        const product = await research.getProductById();
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

/**
 * Start the server
 * @param {number} port - The port number to listen on.
 */
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    console.log(`API documentation available at http://localhost:${port}/api/docs`);
});
