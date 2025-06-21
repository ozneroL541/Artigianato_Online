const { pool } = require('../db/connection.js');
const { Product } = require('../product/Product.js');
const { User } = require('../user/User.js');
/**
 * Order class to represent an order in the system.
 * @class Order
 */
class Order {
    /**
     * Creates an instance of Order.
     * @constructor
     * @param {number|null} id_ordine - The unique identifier for the order. If null, a new ID will be generated.
     * @param {number} id_prodotto - The unique identifier for the product being ordered.
     * @param {string} username_cliente - The username of the customer who placed the order.
     * @param {Date} data_ordine - The date when the order was placed.
     * @param {number} quantita - The quantity of the product ordered.
     * @param {Date|null} data_consegna - The date when the order is expected to be delivered. If null, delivery date is not set.
     */
    constructor(
        id_ordine = null,
        id_prodotto,
        username_cliente,
        data_ordine = new Date(),
        quantita,
        data_consegna = null
    ) {
        this.id_ordine = id_ordine;
        this.id_prodotto = id_prodotto;
        this.username_cliente = username_cliente;
        this.data_ordine = data_ordine;
        this.quantita = quantita;
        this.data_consegna = data_consegna;
    }
    /**
     * Creates a new order in the database.
     * This method inserts a new order into the database and returns the created order object.
     * @async
     * @returns {Promise<number>} The order ID of the newly created order.
     * @throws {Error} If there is an error during the database operation.
     */
    async create() {
        const query = `INSERT INTO ordini (id_ordine, id_prodotto, username_cliente, data_ordine, quantita, data_consegna)
                       VALUE (((SELECT MAX(id_ordine)+1) AS next_id FROM ordini), $1, $2, CURRENT_TIMESTAMP(), $3, $4) 
                       RETURNING id_ordine, data_ordine;`;

        const params = [this.id_prodotto, this.username_cliente, this.quantita, this.data_consegna];

        try{
            const result = await pool.query(query, params);
            this.id_ordine = result.rows[0].id_ordine; // Set the order ID from the query result
            this.data_ordine = result.rows[0].data_ordine; // Set the order date from the query result
            return this.id_ordine; // Return the ID of the inserted order
        }catch(error){
            throw new Error('Order already inserted')
        }                       
    }
    /**
     * Add delivery date to the order.
     * This method updates the order with the delivery date.
     * @async
     * @returns {Promise<Order>} A promise that resolves to the updated Order object.
     * @throws {Error} If there is an error during the database operation.
     */
    async recived() {
        const query = `UPDATE ordini SET
                       data_consegna = $1
                       WHERE id_ordine = $2;`;

        const params = [this.data_consegna, this.id_ordine];

        try{
            const result = await pool.query(query, params);
            if(result.length === 0){
                throw new Error('Order not found');
            }

            return new Order(result.rows[0].id_ordine, result.rows[0].id_prodotto, result.rows[0].username_cliente, result.rows[0].data_ordine, result.rows[0].quantita, result.rows[0].data_consegna);

        }catch(error){
            throw new Error('Error updating order: ' + error.message);
        }
    }
    /**
     * Retrieves an order by its ID.
     * @param {number} id_ordine - The unique identifier of the order to retrieve.
     * @returns {Promise<Order>} A promise that resolves to the Order object if found, or null if not found.
     * @throws {Error} If there is an error during the database operation.
     */
    static async getById(id_ordine) {
        const query = `SELECT * 
                       FROM ordini
                       WHERE id_ordine = $1;`;
        
        const params = [id_ordine];

        try {
            const result = await pool.query(query, params);
            if (result.length === 0) {
                throw new Error('Order not found');
            }

            return new Order(result.rows[0].id_ordine, result.rows[0].id_prodotto, result.rows[0].username_cliente, result.rows[0].data_ordine, result.rows[0].quantita, result.rows[0].data_consegna);

        } catch (error) {
            throw new Error('Error fetching order: ' + error.message);
        }
    }
}

module.exports = { Order };
