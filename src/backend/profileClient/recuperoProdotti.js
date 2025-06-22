import { SearchProductById, SearchAllProduct } from'./searchProductClass.js';

/**
 * Research of a product by ID.
 * @param {Object} req - The request object containing { id } in params
 * @param {Object} res - The response object to send the result
 */
const researchProductById = async (req, res) => {
    try {
        const { idProduct } = req.params;
        const research = new SearchProductById(idProduct);
        const product = await research.getProductById();
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
};


/**
 * Research all products (no parameters required).
 * @param {Object} req - No parameters needed
 * @param {Object} res - The response object to send the result
 */
const researchAllProducts = async (req, res) => {
    try {
        const research = new SearchAllProduct();
        const products = await research.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
};

export{
    researchAllProducts,
    researchProductById
};



