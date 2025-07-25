const { pool } = require('../db/dbConnection.js');

class Order {
    /**
     * @param {number|null} id_ordine - ID ordine (null se è nuovo)
     * @param {number} id_prodotto - ID del prodotto ordinato
     * @param {string} username_cliente - Username del cliente
     * @param {string|null} data_ordine - Timestamp dell'ordine (null se ora)
     * @param {number} quantita - Quantità ordinata (>0)
     * @param {string|null} data_consegna - Timestamp della consegna (facoltativo)
     */
    constructor(id_ordine = null, id_prodotto, username_cliente, data_ordine = null, quantita, data_consegna = null) {
        this.id_ordine = id_ordine;
        this.id_prodotto = id_prodotto;
        this.username_cliente = username_cliente;
        this.data_ordine = data_ordine;
        this.quantita = quantita;
        this.data_consegna = data_consegna;
    }

    /**
     * Inserisce l'ordine nel database
     * @returns {Promise<number>} ID dell'ordine inserito
     */
    async save() {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const checkQuery = ` SELECT disponibilita FROM prodotti WHERE id_prodotto = $1 FOR UPDATE `; //Check if there are enough products
            const checkResult = await client.query(checkQuery, [this.id_prodotto]);
            if (checkResult.rows.length === 0) { throw new Error('Prodotto non trovato.'); }

            const disponibile = checkResult.rows[0].disponibilita;
            if (disponibile < this.quantita) { throw new Error('Disponibilità insufficiente per questo prodotto.'); }

            const updateQuery = ` UPDATE prodotti SET disponibilita = disponibilita - $1 WHERE id_prodotto = $2 `; // remove products
            await client.query(updateQuery, [this.quantita, this.id_prodotto]);

            const insertQuery = ` 
            INSERT INTO ordini (id_prodotto, username_cliente, quantita, data_consegna)
            VALUES ($1, $2, $3, $4)
            RETURNING id_ordine, data_ordine
        `; //creates a new order
            const insertParams = [
                this.id_prodotto,
                this.username_cliente,
                this.quantita,
                this.data_consegna || null
            ];
            const result = await client.query(insertQuery, insertParams);

            await client.query('COMMIT');

            this.id_ordine = result.rows[0].id_ordine;
            this.data_ordine = result.rows[0].data_ordine;

            return this.id_ordine;
        } catch (err) {
            await client.query('ROLLBACK');
            if (err.code === '23505') {
                throw new Error('Ordine già effettuato per questo prodotto e data.');
            }
            throw new Error(`Errore nel salvataggio ordine: ${err.message}`);
        } finally {
            client.release();
        }
    }


    /**
     * Recupera tutti gli ordini effettuati da un cliente
     * @param {string} username_cliente
     * @returns {Promise<Order[]>}
     */
    static async getByCustomer(username_cliente) {
        const query = `
            SELECT * FROM ordini
            WHERE username_cliente = $1
            ORDER BY data_ordine DESC;
        `;
        const result = await pool.query(query, [username_cliente]);

        return result.rows.map(row =>
            new Order(
                row.id_ordine,
                row.id_prodotto,
                row.username_cliente,
                row.data_ordine,
                row.quantita,
                row.data_consegna
            )
        );
    }

    /**
     * Recupera tutti gli ordini di prodotti creati da un determinato artigiano
     * @param {string} username_artigiano
     * @returns {Promise<Order[]>}
     */
    static async getByArtisan(username_artigiano) {
        const query = `
            SELECT o.*
            FROM ordini o
            JOIN prodotti p ON o.id_prodotto = p.id_prodotto
            WHERE p.username_artigiano = $1
            ORDER BY o.data_ordine DESC;
        `;
        const result = await pool.query(query, [username_artigiano]);

        return result.rows.map(row =>
            new Order(
                row.id_ordine,
                row.id_prodotto,
                row.username_cliente,
                row.data_ordine,
                row.quantita,
                row.data_consegna
            )
        );
    }
}

module.exports = {Order};
