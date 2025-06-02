import { ProductResearch } from './searchProductClass.js';

/**
 * Research of a product by ID.
 * @param {Object} req - The request object containing { id } in params
 * @param {Object} res - The response object to send the result
 */
export const researchProductById = async (req, res) => {
    try {
        const research = new ProductResearch(req.params.id);
        const product = await research.getProductById();
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
}

/**
 * Research all products (no parameters required).
 * @param {Object} req - No parameters needed
 * @param {Object} res - The response object to send the result
 */
export const researchAllProducts = async (req, res) => {
    try {
        const research = new ProductResearch();
        const products = await research.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
}
