import { pool } from '../db/dbConnection.js';

/**
 * Category class representing a product category in the artisan marketplace.
 * It provides methods to manage categories in the database.
 * @class Category
 */
class Category {
    /**
     * @param {string} category_name - The name of the category.
     * @constructor
     */
    constructor(category_name=null) {
        this.category_name = category_name;        
    }
    /**
     * Save the category to the database.
     * If the category already exists, it will not be inserted again.
     * @returns {Promise<boolean>} A promise that resolves to true if the category was saved successfully, false otherwise.
     */
    async save() {
        const query = 'INSERT INTO categorie (categoria) VALUES ($1);';
        const params = [this.category_name];
        try {
            await pool.query(query, params);
            return true;
        } catch (error) {
            return false; // If the insertion fails, return false
        }
    }
    /**
     * Update the category in the database.
     * @param {string} new_category_name - The new name for the category.
     * @returns {Promise<boolean>} A promise that resolves to true if the category was updated successfully, false otherwise.
     */
    async update(new_category_name) {
        const query = 'UPDATE categorie SET categoria = $1 WHERE categoria = $2;';
        const params = [new_category_name, this.category_name];
        try {
            await pool.query(query, params);
            this.category_name = new_category_name; // Update the instance variable
            return true; // Return true if the update was successful
        } catch (error) {
            return false; // If the update fails, return false
        }
    }
    /**
     * Delete the category from the database.
     * @returns {Promise<boolean>} A promise that resolves to true if the category was deleted successfully, false otherwise.
     */
    async delete() {
        const query = 'DELETE FROM categorie WHERE categoria = $1;';
        const params = [this.category_name];
        try {
            await pool.query(query, params);
            return true; // Return true if the deletion was successful
        } catch (error) {
            return false; // If the deletion fails, return false
        }
    }
    /**
     * Check if a category exists in the database.
     * @returns {Promise<boolean>} A promise that resolves to true if the category exists, false otherwise.
     */
    async exists() {
        if (this.category_name == null) {
            return true;
        }
        const query = 'SELECT COUNT(*) FROM categorie WHERE categoria = $1;';
        const params = [this.category_name];
        try {
            const result = await pool.query(query, params);
            return result.rows[0].count > 0; // Return true if count is greater than 0
        } catch (error) {
            throw new Error('Error checking category existence');
        }
    }
    /**
     * Get all categories from the database.
     * @returns {Promise<Array>} A promise that resolves to an array of category names.
     */
    static async getAllCategories() {
        const query = 'SELECT categoria FROM categorie;';
        try {
            const result = await pool.query(query);
            return result.rows.map(row => row.categoria); // Return an array of category names
        } catch (error) {
            throw new Error('Error fetching categories');
        }
    }
}
/**
 * Custom error class for category-related errors.
 * @class CategoryError
 * @extends Error
 */
class CategoryError extends Error {
    /**
     * Custom error class for category-related errors.
     * @param {string} message - The error message.
     */
    constructor(parameters) {
        super(parameters.message);
        this.name = 'CategoryError';
    }
}


export { Category, CategoryError };
