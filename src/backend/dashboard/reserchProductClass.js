
/**
 * Represents a User registration process.
 * This class must be considered as an abstract class.
 * @class Reaserch
 */
class Research {
    /**
     * The name of the database table for Reaserch.
     * @type {string|null}
     */
    static dbTableName = null;

    /**
     * The attribute name for the username in the database table.
     * @type {string}
     */
    static dbUsername_artigian = 'username_artigiano';

    /**
     * The attribute name for the category in the database table.
     * @type {string|null}
     */
    static dbcategory = null;
     
    /**
     * The attribute name for the Name of product in the database table
   *   @type {string}
     */
    static nome_product='nome_prodotto';
   
    /**
     * The attribute name for the price in the database table.
     * @type {string}
     */
      static db = 'prezzo';

    /**
     * The attribute name for the Availability in the database table.
     * @type {string|null}
     */
    static dbavailability = 'disponibilità';

    /**
     * The attribute name for the price in the database table.
     * @type {string}
     */
    static db = 'prezzo';

    /**
     * The attribute name for the id products in the database table.
     * @type {string|null}
     */
    static dbId_Products = 'id_prodotto';


    /**
     * Creates an instance of Registration.
     * @param {Object} db - The database connection object.
     * @param {string} usernameArtigian - The username of Artigian.
     * @param {string} nameProduct - The name of the product.
     * @param {string} IdProduct - The Id of the product
     * @param {string} category - The Category of the product
     * @param {string} price - The price of the product
     * @param {string} disponibility- The disponibility of the product
     */
    constructor(db, usernameArtigian, nameProduct, IdProduct,category, price, disponibility) {
        /**
         * The database connection object.
         * @type {Object}
         */
        this.db = db;

        /**
         * The username of the artigian.
         * @type {string}
         */
        this.usernameArtigian = usernameArtigian;

        /**
         * The name of product
         * @type {string}
         */
        this.nameProduct = nameProduct;

        /**
         * The id of the product
         * @type {string}
         */
        this.IdProduct = IdProduct;

         /**
         * The category of the product.
         * @type {string}
         */
         this.category = category;

         /**
          * The price of the product
          * @type {string}
          */
         this.price = price;
 
         /**
          * The disponibility of the product
          * @type {string}
          */
         this.disponibility = disponibility;
    }


    /**
     * Reasearch All Products that have a id.
     * @throws {IncompatiblyId} If the id dose not exits.
     * @returns {Promise<Array>}
     */
    async ResearchById()  {
        const query = `SELECT * FROM ${this.constructor.dbTableName}  WHERE ${this.constructor.IdProduct} = $1`;
        const values = [this.IdProduct];
        const res = await this.db.query(query, values);
        if (res.rows.length==0) {
            throw new IncompatiblyId("Id of The product is invalid");
        }
    }

    /**
     * Research All Products.
     *@returns {Promise<Array>} A promise that resolves to an array of product records.
 *    @throws {Error} If the query fails.
     */
    async ResearchProduct()  {
        const query = `SELECT * FROM ${this.constructor.dbTableName}`;
    try {
        const res = await this.db.query(query);
        return res.rows;
    } catch (err) {
        console.error('Failed to retrieve products:', err);
        throw new Error('Could not fetch products from the database');
    }
    }
    
    
}


