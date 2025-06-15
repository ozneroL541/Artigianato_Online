const { Order } = require("../order/Order.js");

/**
 * Warning class represents a warning associated with an order.
 * @class Warning
 */
class Warning {
    /**
     * @constructor
     * @param {number|null} id_segnalazione - Unique identifier for the warning.
     * @param {number} id_ordine - Identifier for the order associated with the warning.
     * @param {Date} timestamp_segnalazione - Timestamp when the warning was created.
     * @param {string} descrizione - Description of the warning.
     * @param {boolean} risolta - Indicates if the warning has been resolved.
     */
    constructor(id_segnalazione = null, id_ordine, timestamp_segnalazione = new Date(), descrizione = '', risolta = false) {
        this.id_segnalazione = id_segnalazione;
        this.id_ordine = id_ordine;
        this.timestamp_segnalazione = timestamp_segnalazione;
        this.descrizione = descrizione;
        this.risolta = risolta;
    }
    /**
     * Creates a new warning in the database.
     * @async
     * @returns {Promise<number>} The ID of the newly created warning.
     * @throws {Error} If there is an error during the database operation.
     */
    async create() {
        // TODO
    }
    /**
     * Marks the warning as resolved.
     * @async
     * @returns {Promise<Warning>} The updated Warning object.
     * @throws {Error} If there is an error during the database operation.
     */
    async resolve() {
        // TODO
    }
    /**
     * Retrieves a warning by its ID.
     * @param {number} id_segnalazione - The unique identifier of the warning to retrieve.
     * @returns {Promise<Warning>} A promise that resolves to the Warning object if found, or null if not found.
     * @throws {Error} If there is an error during the database operation.
     */
    static async getById(id_segnalazione) {
        // TODO
    }
    /**
     * Retrieves all warnings associated with a specific order.
     * @param {number} id_ordine - The unique identifier of the order for which to retrieve warnings.
     * @returns {Promise<Warning[]>} A promise that resolves to an array of Warning objects associated with the order.
     * @throws {Error} If there is an error during the database operation.
     */
    static async getByOrderId(id_ordine) {
        // TODO
    }
    /**
     * Retrieves all unresolved warnings.
     * @returns {Promise<Warning[]>} A promise that resolves to an array of unresolved Warning objects.
     * @throws {Error} If there is an error during the database operation.
     */
    static async getUnresolved() {
        // TODO
    }
    /**
     * Retrieves all warnings.
     * @returns {Promise<Warning[]>} A promise that resolves to an array of all Warning objects.
     * @throws {Error} If there is an error during the database operation.
     */
    static async getAll() {
        // TODO
    }
}

module.exports = { Warning };
