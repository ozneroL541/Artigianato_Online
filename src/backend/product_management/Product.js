import { pool } from '../db/dbConnection.js';

/**
 * Product class representing a product in the artisan marketplace.
 * It provides methods to manage products in the database.
 * @class Product
 */
class Product {
    /**
     * Creates an instance of Product.
     * @constructor
     * @param {number|null} id_prodotto - The unique identifier for the product. If null, a new ID will be generated.
     * @param {string} username_artigiano - The username of the artisan who created the product.
     * @param {string} nome_prodotto - The name of the product.
     * @param {string|null} categoria - The category of the product. If null, no category is assigned.
     * @param {number} prezzo - The price of the product.
     * @param {number} disponibilita - The availability of the product (stock quantity). 
     */
    constructor(id_prodotto=null, username_artigiano, nome_prodotto, categoria=null, prezzo, disponibilita) {
        this.id_prodotto = id_prodotto;
        this.username_artigiano = username_artigiano;
        this.nome_prodotto = nome_prodotto;
        this.categoria = categoria;
        this.prezzo = prezzo;
        this.disponibilita = disponibilita;
    }
    /**
     * Updates or inserts the product into the database.
     * If id_prodotto is null, it generates a new ID.
     * @returns {Promise} A promise that resolves to the result of the database operation.
     */
    async update() {
        const query = `INSERT INTO prodotti (id_prodotto, username_artigiano, nome_prodotto, categoria, prezzo, disponibilita)
                       VALUES (?, ?, ?, ?, ?, ?)
                       ON DUPLICATE KEY (username_artigiano, nome_prodotto) UPDATE SET
                       (nome_prodotto, categoria, prezzo, disponibilita) = ( ?, ?, ?, ?)`;
        this.id_prodotto = this.id_prodotto || await this.getNextId(dbConnection);
        const params = [this.id_prodotto, this.username_artigiano, this.nome_prodotto, this.categoria, this.prezzo, this.disponibilita,
                        this.nome_prodotto, this.categoria, this.prezzo, this.disponibilita
                       ];
        try {
            const result = await pool.query(query, params);
            return result;
        } catch (error) {
            throw new Error('Error inserting product: ' + error.message);
        }        
    }
    /**
     * Deletes the product from the database.
     * @returns {Promise} A promise that resolves to the result of the delete operation.
     */
    async delete() {
        const query = 'DELETE FROM prodotti WHERE id_prodotto = ?';
        try {
            const result = await pool.query(query, [this.id_prodotto]);
            return result;
        } catch (error) {
            throw new Error('Error deleting product: ' + error.message);
        }
    }
    /**
     * Retrieves the next available product ID from the database.
     * @returns {Promise<number>} A promise that resolves to the next product ID.
     */
    async getNextId() {
        const query = 'SELECT MAX(id_prodotto) AS max_id FROM prodotti';
        try {
            const result = await pool.query(query);
            return result[0].max_id + 1;
        } catch (error) {
            throw new Error('Error getting next product ID: ' + error.message);
        }
    }
    /**
     * Retrieves a product by its ID from the database.
     * @param {number} id_prodotto - The unique identifier of the product.
     * @returns {Promise<Product>} A promise that resolves to an instance of Product.
     */
    static async getById(id_prodotto) {
        const query = 'SELECT * FROM prodotti WHERE id_prodotto = ?';
        try {
            const result = await pool.query(query, [id_prodotto]);
            if (result.length === 0) {
                throw new Error('Product not found');
            }
            return new Product(
                result[0].id_prodotto,
                result[0].username_artigiano,
                result[0].nome_prodotto,
                result[0].categoria,
                result[0].prezzo,
                result[0].disponibilita
            );
        } catch (error) {
            throw new Error('Error fetching product: ' + error.message);
        }
    }
    /**
     * Retrieves a product by its name and artisan username from the database.
     * @param {string} nome_prodotto - The name of the product.
     * @param {string} username_artigiano - The username of the artisan.
     * @returns {Promise<Product>} A promise that resolves to an instance of Product.
     */
    static async getByName(nome_prodotto, username_artigiano) {
        const query = 'SELECT * FROM prodotti WHERE nome_prodotto = ? AND username_artigiano = ?';
        try {
            const result = await pool.query(query, [nome_prodotto, username_artigiano]);
            if (result.length === 0) {
                throw new Error('Product not found');
            }
            return new Product(
                result[0].id_prodotto,
                result[0].username_artigiano,
                result[0].nome_prodotto,
                result[0].categoria,
                result[0].prezzo,
                result[0].disponibilita
            );
        } catch (error) {
            throw new Error('Error fetching product by name: ' + error.message);
        }
    }
};

export { Product };
