import { pool } from '../db/connection.js';
import { Product } from '../product/Product.js';
import { User } from '../user/User.js';
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
        data_ordine,
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
        // TODO
    }
    /**
     * Add delivery date to the order.
     * This method updates the order with the delivery date.
     * @async
     * @returns {Promise<Order>} A promise that resolves to the updated Order object.
     * @throws {Error} If there is an error during the database operation.
     */
    async recived() {
        // TODO
    }
    /**
     * Retrieves an order by its ID.
     * @param {number} id_ordine - The unique identifier of the order to retrieve.
     * @returns {Promise<Order>} A promise that resolves to the Order object if found, or null if not found.
     * @throws {Error} If there is an error during the database operation.
     */
    static async getById(id_ordine) {
        // TODO
    }
}

export { Order };
