import { Category } from '../category/Category.js';
import { Product } from './Product.js';

/**
 * Uploads a new product to the database.
 * @param {Object} req - The request object containing product details { nome_prodotto, categoria, prezzo, disponibilita }.
 * @param {Object} res - The response object to send the result.
 * @returns {Promise<void>} A promise that resolves when the product is uploaded.
 */
const uploadProduct = async (req, res) => {
    try {
        const username_artigiano = req.username;
        const { nome_prodotto, categoria, prezzo, disponibilita } = req.body;
        if (!nome_prodotto || !prezzo || !disponibilita) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const product = new Product(null, username_artigiano, nome_prodotto, categoria, prezzo, disponibilita);
        const id = await product.save();
        res.status(201).json({ message: 'Product uploaded successfully', product_id: id });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
}

/**
 * Updates an existing product in the database.
 * @param {Object} req - The request object containing updated product details { id_prodotto, nome_prodotto, categoria, prezzo, disponibilita }.
 * @param {Object} res - The response object to send the result.
 * @returns {Promise<void>} A promise that resolves when the product is updated.
 */
const updateProduct = async (req, res) => {
    try {
        const username_artigiano = req.username;
        const { id_prodotto, nome_prodotto, categoria, prezzo, disponibilita } = req.body;
        if (!id_prodotto || !nome_prodotto || !prezzo || !disponibilita) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const product = new Product(id_prodotto, username_artigiano, nome_prodotto, categoria, prezzo, disponibilita);
        const updated = await product.update();
        if (updated) {
            res.status(200).json({ message: 'Product updated successfully' });
        } else {
            res.status(404).json({ message: 'Product not updated' });
        }
    }
    catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
}

/**
 * Deletes a product from the database.
 * @param {Object} req - The request object containing the product ID to delete { id_prodotto }.
 * @param {Object} res - The response object to send the result.
 * @returns {Promise<void>} A promise that resolves when the product is deleted.
 */
const deleteProduct = async (req, res) => {
    try {
        const username_artigiano = req.username;
        const { id_prodotto } = req.body;
        if (!id_prodotto) {
            return res.status(400).json({ message: 'Missing product ID' });
        }
        const product = new Product(id_prodotto, username_artigiano);
        const deleted = await product.delete();
        if (deleted) {
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not deleted' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
}
/*
 * Retrieves all products from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the result.
 * @returns {Promise<void>} A promise that resolves when the products are retrieved.
 */
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
/**
 * Retrieves all products by a specific artisan from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the result.
 * @returns {Promise<void>} A promise that resolves when the products are retrieved.
 */
const getProductsByArtisan = async (req, res) => {
    try {
        const username_artigiano = req.username;
        const products = await Product.getByArtisan(username_artigiano);
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
/**
 * Retrives all proucts which match the given parameters.
 * @param {Object} req - The request object containing search parameters.
 * @param {Object} res - The response object to send the result.
 * @returns {Promise<void>} A promise that resolves when the products are retrieved.
 */
const getProducts = async (req, res) => {
    try {
        const { username_artigiano, nome_prodotto, categoria, prezzo_min, prezzo_max, disponibilita,  limit, random } = req.query;
        const products = await Product.search(username_artigiano, nome_prodotto, categoria, prezzo_min, prezzo_max, disponibilita, limit, random);
        if (products.length === 0) {
            res.status(404).json({ message: 'No products found' });
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(400).json({ message: 'Bad request' });
    }
}

export { uploadProduct, updateProduct, deleteProduct, getAllProducts, getProductsByArtisan, getProducts };
