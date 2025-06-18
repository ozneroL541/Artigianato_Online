import{pool} from'../db/dbConnection.js';
/**
 * Represents a Product Research process.
 * This class is intended to be used as a base class.
 * @class Search
 */
class SearchProductById{
    

    /**
     * Creates an instance of Research.
     * @param {string} idProduct
     */
    
    static dbPrice = 'prezzo';
    
    constructor(idProduct) {
        
        this.idProduct = idProduct;
        
    }

    /**
     * Research a product by ID and convert decimal price if needed.
     * @returns {Promise<Object>}
     * @throws {IncompatiblyId} If the ID does not exist.
     */
    async researchById() {
    const query = `SELECT * FROM prodotti WHERE ${this.constructor.dbIdProducts} = $1`;
    const values = [this.idProduct];
    const res = await pool.query(query, values);

    if (res.rows.length === 0) {
        throw new IncompatiblyId('No products found for the given ID');
    }

    const priceField = this.constructor.dbPrice;

    
    const products = res.rows.map(product => {
        if (product[priceField] != null) {
            product[priceField] = Number(product[priceField]);
        }
        return product;
    });

    return products;
}

}

class SearchAllProduct{

    /**
     * Research all products and convert price where needed.
     * @returns {Promise<Array>}
     * @throws {Error} If the query fails.
     */
    static dbPrice = 'prezzo';

    async researchProduct() {
    const query = `SELECT * FROM prodotti`;

    try {
        const res = await pool.query(query);
        const products = res.rows;

        const priceField = this.constructor.dbPrice;

        for (const product of products) {
            if (typeof product[priceField] === 'string') {
                product[priceField] = parseFloat(product[priceField]);
            }
        }

        return products;
    } catch (err) {
        console.error('Failed to retrieve products:', err);
        throw new Error('Could not fetch products from the database');
    }
}

    }




export{ 
    SearchProductById, 
    SearchAllProduct};
