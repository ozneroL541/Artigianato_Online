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
const { uploadProduct, updateProduct, deleteProduct } = require('./product/product_api.js');
const { uploadCategory, deleteCategory, updateCategory, getAllCategories } = require('./category/category_api.js');
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
        openapi: '3.1.0',
        info: {
            title: 'Artigianato Online Server',
            version: '1.0.0',
            "summary": 'API for Artigiano Online',
            description: 'Server which provides APIs for Artigiano Online website to manage the database',
            "license": {
                "name": "GNU General Public License v3.0",
                "url": "https://www.gnu.org/licenses/gpl-3.0.en.html"
            },
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
        security: [
            {
                bearerAuth: []
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT token received at login'
                }
            }
        },
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
 *      tags:
 *       - Authentication
 *       - Registration
 *       - Artisan
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
 *      tags:
 *       - Authentication
 *       - Registration
 *       - Client
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
 *      tags:
 *       - Authentication
 *       - Registration
 *       - Admin
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
 *    tags:
 *     - Authentication
 *     - Artisan
 *     - Login
 *     - JWT
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
 *    tags:
 *     - Authentication
 *     - Client
 *     - Login
 *     - JWT
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
 *    tags:
 *     - Authentication
 *     - Admin
 *     - Login
 *     - JWT
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
 *   tags:
 *    - Profile
 *    - Client
 *    - Delete
 *   security:
 *    - bearerAuth: []
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
 *   tags:
 *    - Profile
 *    - Artisan
 *    - Delete
 *   security:
 *    - bearerAuth: []
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
 *   tags:
 *    - Profile
 *    - Admin
 *    - Delete
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: Admin deleted successfully
 *    500:
 *     description: Error deleting Admin
 */
app.delete('/api/profile/delete/admin', checkAdmin, delAdmin);
/**
 * @swagger
 * /api/product/upload:
 *  post:
 *   summary: Upload a new product
 *   description: Upload a new product with artisan username, product name, category, price, and availability.
 *   tags:
 *    - Product
 *    - Artisan
 *    - Upload
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: nome_prodotto
 *      in: body
 *      description: The name of the product.
 *      required: true
 *      type: string
 *    - name: categoria
 *      in: body
 *      description: The category of the product.
 *      required: false
 *      type: string
 *    - name: prezzo
 *      in: body
 *      description: The price of the product.
 *      required: true
 *      type: number
 *    - name: disponibilita
 *      in: body
 *      description: The availability of the product (stock quantity).
 *      required: true
 *      type: number
 *   responses:
 *    201:
 *     description: Product uploaded successfully
 *    400:
 *     description: Bad request
 */
app.post('/api/product/upload', checkArtisan, uploadProduct);
/**
 * @swagger
 * /api/product/update:
 *  put:
 *   summary: Update an existing product
 *   description: Update an existing product with product ID, artisan username, product name, category, price, and availability.
 *   tags:
 *    - Product
 *    - Artisan
 *    - Update
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: id_prodotto
 *      in: body
 *      description: The ID of the product to update.
 *      required: true
 *      type: number
 *    - name: nome_prodotto
 *      in: body
 *      description: The name of the product.
 *      required: true
 *      type: string
 *    - name: categoria
 *      in: body
 *      description: The category of the product.
 *      required: false
 *      type: string
 *    - name: prezzo
 *      in: body
 *      description: The price of the product.
 *      required: true
 *      type: number
 *    - name: disponibilita
 *      in: body
 *      description: The availability of the product (stock quantity).
 *      required: true
 *      type: number
 *   responses:
 *    200:
 *     description: Product updated successfully
 *    400:
 *     description: Bad request
 *    404:
 *     description: Product not updated
 */
app.put('/api/product/update', checkArtisan, updateProduct);
/**
 * @swagger
 * /api/product/delete:
 *  delete:
 *   summary: Delete a product
 *   description: Delete a product by its ID.
 *   tags:
 *    - Product
 *    - Artisan
 *    - Delete
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: id_prodotto
 *      in: body
 *      description: The ID of the product to delete.
 *      required: true
 *      type: number
 *   responses:
 *    200:
 *     description: Product deleted successfully
 *    400:
 *     description: Bad request
 *    404:
 *     description: Product not deleted
 */
app.delete('/api/product/delete', checkArtisan, deleteProduct);
/**
 * @swagger
 * /api/category/upload:
 *  post:
 *   summary: Upload a new category
 *   description: Upload a new category with the category name.
 *   tags:
 *    - Category
 *    - Admin
 *    - Upload
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: categoria
 *      in: body
 *      description: The name of the category to upload.
 *      required: true
 *      type: string
 *   responses:
 *    201:
 *     description: Category uploaded successfully
 *    400:
 *     description: Bad request
 *    500:
 *    description: Internal server error
 */
app.post('/api/category/upload', checkAdmin, uploadCategory);
/**
 * @swagger
 * /api/category/update:
 *  put:
 *   summary: Update an existing category
 *   description: Update an existing category with the current category name and the new category name.
 *   tags:
 *    - Category
 *    - Admin
 *    - Update
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: categoria
 *      in: body
 *      description: The current name of the category to update.
 *      required: true
 *      type: string
 *    - name: new_categoria
 *      in: body
 *      description: The new name for the category.
 *      required: true
 *      type: string
 *   responses:
 *    200:
 *     description: Category updated successfully
 *    404:
 *     description: Category not updated
 *    500:
 *     description: Internal server error
 */
app.put('/api/category/update', checkAdmin, updateCategory);
/**
 * @swagger
 * /api/category/delete:
 *  delete:
 *   summary: Delete a category
 *   tags:
 *    - Category
 *    - Admin
 *    - Delete
 *   security:
 *    - bearerAuth: []
 *   description: Delete a category by its name.
 *   parameters:
 *    - name: categoria
 *      in: body
 *      description: The name of the category to delete.
 *      required: true
 *      type: string
 *   responses:
 *    200:
 *     description: Category deleted successfully
 *    404:
 *     description: Category not deleted
 *    500:
 *     description: Internal server error
 */
app.delete('/api/category/delete', checkAdmin, deleteCategory);
/**
 * @swagger
 * /api/category/all:
 *  get:
 *   summary: Get all categories
 *   description: Retrieve a list of all categories.
 *   tags:
 *    - Category
 *   responses:
 *    200:
 *     description: List of categories retrieved successfully
 *    404:
 *     description: No categories found
 *    500:
 *     description: Internal server error
 */
app.get('/api/category/all', getAllCategories);

// TODO: doc e spostare funzione asincrona in altro file
app.get('/api/artigiano/dashboard', checkArtisan, async (req, res) => {
    try {
        const artisan_name = req.username;
        const d = new Dashboard(artisan_name);
        
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
        const profile = new ProfileClient(req.query.username); // esempio con username passato da query
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
        const profile = new ProfileClient(username);
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
        const profile = new ProfileClient(username);
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
        const profile = new ProfileClient(); // non servono parametri per segnalazione
        const result = await profile.newSignal(idSignal, orderId, description, resolved);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

// All products
// TODO: doc e spostare funzione asincrona in altro file
app.get('/api/ricerca/dashboard', async (req, res) => {
    try {
        //const research = new ProductResearch();
        //const products = await research.getAllProducts();
        //res.status(200).json(products);
        res.status(200).json({ message: 'Not implemented' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

// products by id
// TODO: doc e spostare funzione asincrona in altro file
app.get('/api/ricerca/dashboard/:id', async (req, res) => {
    try {
        const research = new ProductResearch(req.params.id);
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
