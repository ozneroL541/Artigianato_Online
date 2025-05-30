import { Category } from "Category.js";

/**
 * Uploads a new category to the database.
 * @param {Object} req - The request object containing category details { categoria }.
 * @param {Object} res - The response object to send the result.
 */
const uploadCategory = async (req, res) => {
    try {
        const { categoria } = req.body;
        if (!categoria) {
            return res.status(400).json({ message: 'Category name is required' });
        }
        const category = new Category(categoria);
        const saved = await category.save();
        if (saved) {
            res.status(201).json({ message: 'Category uploaded successfully' });
        } else {
            res.status(400).json({ message: 'Category already exists' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
/**
 * Deletes a category from the database.
 * @param {Object} req - The request object containing the category name to delete { categoria }.
 * @param {Object} res - The response object to send the result.
 */
const deleteCategory = async (req, res) => {
    try {
        const { categoria } = req.body;
        if (!categoria) {
            return res.status(400).json({ message: 'Category name is required' });
        }
        const category = new Category(categoria);
        const deleted = await category.delete();
        if (deleted) {
            res.status(200).json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ message: 'Category not deleted' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
/**
 * Updates an existing category in the database.
 * @param {Object} req - The request object containing updated category details { categoria, new_categoria }.
 * @param {Object} res - The response object to send the result.
 */
const updateCategory = async (req, res) => {
    try {
        const { categoria, new_categoria } = req.body;
        if (!categoria || !new_categoria) {
            return res.status(400).json({ message: 'Category name and new category name are required' });
        }
        const category = new Category(categoria);
        const updated = await category.update(new_categoria);
        if (updated) {
            res.status(200).json({ message: 'Category updated successfully' });
        } else {
            res.status(404).json({ message: 'Category not updated' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
/**
 * Retrieves all categories from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the result.
 */
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.getAll();
        if (categories.length > 0) {
            res.status(200).json({ categories });
        } else {
            res.status(404).json({ message: 'No categories found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export { uploadCategory, deleteCategory, updateCategory, getAllCategories };
