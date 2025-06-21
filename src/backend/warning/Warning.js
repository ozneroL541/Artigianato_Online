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
        const query = `INSERT INTO segnalazioni (id_segnalazione, id_ordine, timestamp_segnalazione, descrizione, risolta)
                       VALUE (((SELECT MAX(id_segnalazione)+1) AS next_id FROM segnalazioni), $1, CURRENT_TIMESTAMP(), $2, $3) 
                       RETURNING id_ordine, data_ordine;`;
        
        const params = [this.id_ordine, this.descrizione, this.risolta];
        
        try{
            const result = await pool.query(query, params);
            this.id_segnalazione = result.rows[0].id_segnalazione; // Set the warning ID from the query result
            return this.id_segnalazione; // Return the ID of the inserted warning
        }catch(error){
            throw new Error('Warning already inserted')
        } 
    }
    /**
     * Marks the warning as resolved.
     * @async
     * @returns {Promise<Warning>} The updated Warning object.
     * @throws {Error} If there is an error during the database operation.
     */
    async resolve() {
        const query = `UPDATE segnalazioni SET
                       risolta = TRUE
                       WHERE id_segnalazione = $1;`;

        const params = [this.id_segnalazione];

        try{
            const result = await pool.query(query, params);
            if(result.length === 0){
                throw new Error('Warning not found');
            }

            return new Warning(result.rows[0].id_segnalazione, result.rows[0].id_ordine, result.rows[0].timestamp_segnalazione, result.rows[0].descrizione, result.rows[0].risolta);

        }catch(error){
            throw new Error('Error updating warning: ' + error.message);
        }
    }
    /**
     * Retrieves a warning by its ID.
     * @param {number} id_segnalazione - The unique identifier of the warning to retrieve.
     * @returns {Promise<Warning>} A promise that resolves to the Warning object if found, or null if not found.
     * @throws {Error} If there is an error during the database operation.
     */
    static async getById(id_segnalazione) {
        const query = `SELECT * 
                       FROM segnalazioni
                       WHERE id_segnalazione = $1;`;

        const params = [id_segnalazione];

        try {
            const result = await pool.query(query, params);
            if (result.length === 0) {
                throw new Error('Warning not found');
            }

            return new Warning(result.rows[0].id_segnalazione, result.rows[0].id_ordine, result.rows[0].timestamp_segnalazione, result.rows[0].descrizione, result.rows[0].risolta);
            
        } catch (error) {
            throw new Error('Error fetching warning: ' + error.message);
        }
    }
    /**
     * Retrieves all warnings associated with a specific order.
     * @param {number} id_ordine - The unique identifier of the order for which to retrieve warnings.
     * @returns {Promise<Warning[]>} A promise that resolves to an array of Warning objects associated with the order.
     * @throws {Error} If there is an error during the database operation.
     */
    static async getByOrderId(id_ordine) {
        const query = `SELECT * 
                       FROM segnalazioni
                       WHERE id_ordine = $1;`;

        const params = [id_ordine];

        try {
            const result = await pool.query(query, params);
            if (result.length === 0) {
                throw new Error('Warning not found');
            }
                                 
            return result.rows.map(row => new Warning(row.id_segnalazione, row.id_ordine, row.timestamp_segnalazione, row.descrizione, row.risolta));
            
        } catch (error) {
            throw new Error('Error fetching warnings by order: ' + error.message);
        }
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
