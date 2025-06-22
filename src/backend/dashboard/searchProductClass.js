/**
 * Represents a Product Research process.
 * This class is intended to be used as a base class.
 * @class Search
 */
class Search {
    static dbTableName = null;
    static dbUsernameArtigian = 'username_artigiano';
    static dbCategory = null;
    static dbNameProduct = 'nome_prodotto';
    static dbPrice = 'prezzo'; 
    static dbAvailability = 'disponibilità';
    static dbIdProducts = 'id_prodotto';

    /**
     * Creates an instance of Research.
     * @param {Object} db - The database connection object.
     * @param {string} usernameArtigian
     * @param {string} nameProduct
     * @param {string} idProduct
     * @param {string} category
     * @param {string} price
     * @param {string} availability
     */
    constructor(db, usernameArtigian, nameProduct, idProduct, category, price, availability) {
        this.db = db;
        this.usernameArtigian = usernameArtigian;
        this.nameProduct = nameProduct;
        this.idProduct = idProduct;
        this.category = category;
        this.price = price;
        this.availability = availability;
    }

    /**
     * Research a product by ID and convert decimal price if needed.
     * @returns {Promise<Object>}
     * @throws {IncompatiblyId} If the ID does not exist.
     */
    async researchById() {
        const query = `SELECT * FROM ${this.constructor.dbTableName} WHERE ${this.constructor.dbIdProducts} = $1`;
        const values = [this.idProduct];
        const res = await this.db.query(query, values);

        if (res.rows.length === 0) {
            throw new IncompatiblyId('Product ID is invalid');
        }

        const product = res.rows[0];

        // Convert DECIMAL price to float if needed
        const priceField = this.constructor.dbPrice;
        if (typeof product[priceField] === 'string') {
            product[priceField] = parseFloat(product[priceField]);
        }

        return product;
    }

    /**
     * Research all products and convert price where needed.
     * @returns {Promise<Array>}
     * @throws {Error} If the query fails.
     */
    async researchProduct() {
        const query = `SELECT * FROM ${this.constructor.dbTableName}`;
        try {
            const res = await this.db.query(query);
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

/**
 * Custom error class for invalid product IDs.
 */
class IncompatiblyId extends Error {
    constructor(message) {
        super(message);
        this.name = 'IncompatiblyId';
    }
}

module.exports = { default { Search };
