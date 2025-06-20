const { pool } = require('../db/dbConnection.js');

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
        this.categoria = category_name.toUpperCase();        
    }
    /**
     * Save the category to the database.
     * If the category already exists, it will not be inserted again.
     * @returns {Promise<boolean>} A promise that resolves to true if the category was saved successfully, false otherwise.
     */
    async save() {
        const query = 'INSERT INTO categorie (categoria) VALUES ($1);';
        const params = [this.categoria];
        if (this.categoria == null) {
            throw new CategoryError("Category cannot be null");
        }
        if (await this.exists()) {
            return false; // If the category already exists, do not insert it again
        }
        try {
            await pool.query(query, params);
            return true;
        } catch (error) {
            throw new new CategoryError("Error saving category: " + error.message);            
        }
    }
    /**
     * Update the category in the database.
     * @param {string} new_category_name - The new name for the category.
     * @returns {Promise<boolean>} A promise that resolves to true if the category was updated successfully, false otherwise.
     */
    async update(new_category_name) {
        const query = 'UPDATE categorie SET categoria = $1 WHERE UPPER(categoria) = $2;';
        const params = [new_category_name, this.categoria];
        if (this.categoria == null || new_category_name == null) {
            throw new CategoryError("Category name cannot be null");
        }
        if (await this.exists() === false) {
            throw new CategoryError("Category does not exist");
        }
        try {
            await pool.query(query, params);
            this.categoria = new_category_name; // Update the instance variable
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
        const query = 'DELETE FROM categorie WHERE UPPER(categoria) = $1;';
        const params = [this.categoria];
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
        if (this.categoria == null) {
            return true;
        }
        const query = 'SELECT COUNT(*) FROM categorie WHERE UPPER(categoria) = $1;';
        const params = [this.categoria];
        try {
            const result = await pool.query(query, params);
            return result.rows[0].count > 0; // Return true if count is greater than 0
        } catch (error) {
            throw new CategoryError('Error checking category existence');
        }
    }
    /**
     * Get all categories from the database.
     * @returns {Promise<Array>} A promise that resolves to an array of category names.
     */
    static async getAll() {
        const query = 'SELECT UPPER(categoria) AS categoria FROM categorie;';
        try {
            const result = await pool.query(query);
            const allCategories = result.rows.map(row => row.categoria);
            return allCategories;
        } catch (error) {
            throw new CategoryError('Error fetching categories');
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
    constructor(message) {
        super(message);
        this.name = 'CategoryError';
    }
}

module.exports = { Category, CategoryError };
