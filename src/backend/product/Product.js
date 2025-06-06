import { pool } from '../db/dbConnection.js';
import { Category, CategoryError } from '../category/Category.js'; // Assuming Category is a class that handles categories

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
        this.categoria = new Category(categoria);
        this.prezzo = prezzo;
        this.disponibilita = disponibilita;
    }
    /**
     * Insert the product into the database.
     * If id_prodotto is null, it generates a new ID.
     * @returns {Promise} A promise that resolves to the result of the database operation.
     */
    async save() {
        const query = `INSERT INTO prodotti (id_prodotto, username_artigiano, nome_prodotto, categoria, prezzo, disponibilita)
                       VALUES ((SELECT MAX(id_prodotto)+1 AS next_id FROM prodotti), $1, $2, $3, $4, $5)
                       RETURNING id_prodotto;`;
        const params = [this.username_artigiano, this.nome_prodotto, this.categoria, this.prezzo, this.disponibilita];
        if (!this.categoria.exists()) {
            throw new CategoryError("Category does not exist");
        }
        try {
            const id_prodotto = await pool.query(query, params);
            this.id_prodotto = id_prodotto.rows[0].id_prodotto; // Set the ID of the product
            return this.id_prodotto; // Return the ID of the inserted product
        } catch (error) {
            throw new Error('Product already inserted');
        }
    }
    /**
     * Updates the product in the database.
     * @returns {Promise} A promise that resolves to the result of the update operation.
     */
    async update() {
        const query = `UPDATE prodotti SET 
                       nome_prodotto = $1, 
                       categoria = $2, 
                       prezzo = $3, 
                       disponibilita = $4 
                       WHERE id_prodotto = $5 AND username_artigiano = $6;`;
        if (!this.categoria.exists()) {
            throw new CategoryError("Category does not exist");
        }
        const params = [
            this.nome_prodotto,
            this.categoria,
            this.prezzo,
            this.disponibilita,
            this.id_prodotto,
            this.artisanUsername
        ];
        try {
            await pool.query(query, params);
            return true;
        } catch (error) {
            return false; // If the update fails, return false
        }
    }
    /**
     * Deletes the product from the database.
     * @returns {Promise} A promise that resolves to the result of the delete operation.
     */
    async delete() {
        const query = 'DELETE FROM prodotti WHERE id_prodotto = $1 AND username_artigiano = $2;';
        try {
            const result = await pool.query(query, [this.id_prodotto, this.username_artigiano]);
            return result;
        } catch (error) {
            throw new Error('Error deleting product: ' + error.message);
        }
    }
    /**
     * Retrieves a product by its ID from the database.
     * @param {number} id_prodotto - The unique identifier of the product.
     * @returns {Promise<Product>} A promise that resolves to an instance of Product.
     */
    static async getById(id_prodotto) {
        const query = 'SELECT * FROM prodotti WHERE id_prodotto = $1;';
        try {
            const result = await pool.query(query, [id_prodotto]);
            if (result.length === 0) {
                throw new Error('Product not found');
            }
            return new Product(
                result.rows[0].id_prodotto,
                result.rows[0].username_artigiano,
                result.rows[0].nome_prodotto,
                result.rows[0].categoria,
                result.rows[0].prezzo,
                result.rows[0].disponibilita
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
        const query = 'SELECT * FROM prodotti WHERE nome_prodotto = $1 AND username_artigiano = $2;';
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
    /**
     * Retrieves all products from the database.
     * @returns {Promise<Product[]>} A promise that resolves to an array of Product instances.
     */
    static async getAll() {
        const query = 'SELECT * FROM prodotti;';
        try {
            const result = await pool.query(query);
            return result.rows.map(row => new Product(
                row.id_prodotto,
                row.username_artigiano,
                row.nome_prodotto,
                row.categoria,
                row.prezzo,
                row.disponibilita
            ));
        } catch (error) {
            throw new Error('Error fetching all products: ' + error.message);
        }
    }
    /**
     * Retrieves all products by a specific artisan from the database.
     * @param {string} username_artigiano - The username of the artisan.
     * @returns {Promise<Product[]>} A promise that resolves to an array of Product instances.
     */
    static async getByArtisan(username_artigiano) {
        const query = 'SELECT * FROM prodotti WHERE username_artigiano = $1;';
        try {
            const result = await pool.query(query, [username_artigiano]);
            return result.rows.map(row => new Product(
                row.id_prodotto,
                row.username_artigiano,
                row.nome_prodotto,
                row.categoria,
                row.prezzo,
                row.disponibilita
            ));
        }
        catch (error) {
            throw new Error('Error fetching products by artisan: ' + error.message);
        }
    }
    static async search(username_artigiano, nome_prodotto, categoria, prezzo_min, prezzo_max, disponibilita) {
        let query = 'SELECT * FROM prodotti WHERE 1=1';
        const params = [];
        if (username_artigiano !== undefined && username_artigiano !== null) {
            query += ' AND username_artigiano = $' + (params.length + 1);
            params.push(username_artigiano);
        }
        if (nome_prodotto !== undefined && nome_prodotto !== null) {
            query += ' AND nome_prodotto ILIKE $' + (params.length + 1);
            params.push(`%${nome_prodotto}%`);
        }
        if (categoria !== undefined) {
            query += ' AND categoria = $' + (params.length + 1);
            params.push(categoria);
        }
        if (prezzo_min !== undefined && prezzo_min !== null) {
            query += ' AND prezzo >= $' + (params.length + 1);
            params.push(prezzo_min);
        }
        if (prezzo_max !== undefined && prezzo_max !== null) {
            query += ' AND prezzo <= $' + (params.length + 1);
            params.push(prezzo_max);
        }
        if (disponibilita !== undefined && disponibilita !== null) {
            query += ' AND disponibilita >= $' + (params.length + 1);
            params.push(disponibilita);
        }
        try {
            const result = await pool.query(query, params);
            return result.rows.map(row => new Product(
                row.id_prodotto,
                row.username_artigiano,
                row.nome_prodotto,
                row.categoria,
                row.prezzo,
                row.disponibilita
            ));
        } catch (error) {
            throw new Error('Error searching products: ' + error.message);
        }
    }
    /**
     * Checks if a product exists in the database by its ID.
     * @static
     * @async
     * @method exists
     * @description Checks if a product with the given ID exists in the database.
     * This method is useful for validating product existence before performing operations like update or delete.
     * @param {number} id_prodotto - The unique identifier of the product to check.
     * @returns {Promise<boolean>} A promise that resolves to true if the product exists, false otherwise.
     */
    static async exists(id_prodotto) {
        const query = 'SELECT COUNT(*) FROM prodotti WHERE id_prodotto = $1;';
        try {
            const result = await pool.query(query, [id_prodotto]);
            return result.rows[0].count > 0; // Returns true if the product exists
        } catch (error) {
            return false; // If there's an error, we assume the product does not exist
        }
    }
};

export { Product };
