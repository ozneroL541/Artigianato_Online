import {pool} from "../db/dbConnection.js";

class Segnala {
    static db3TableName = 'segnalazioni';

    static idsen = 'id_segnalazione';
    static timestamp_segnalazione = 'timestamp_segnalazione'; // <-- colonna corretta
    static descr = 'descrizione';
    static ris = 'risolta';
    static dbTableIdOrder = 'id_ordine';

    constructor(id_segn, id_ord, timeStampsen, desc, ris) {
        this.db = pool;
        this.id_segn = id_segn;
        this.id_ord = id_ord;
        this.timeStampsen = timeStampsen;
        this.desc = desc;
        this.ris = ris;
    }

    async newReport() {
        const query = `
            INSERT INTO ${Segnala.db3TableName}
                (${Segnala.dbTableIdOrder}, ${Segnala.timestamp_segnalazione}, ${Segnala.descr}, ${Segnala.ris})
            VALUES ($1, CURRENT_TIMESTAMP, $2, $3)
        `;
        const values = [this.id_ord, this.desc, this.ris];

        try {
            await this.db.query(query, values);
            return {message: 'Report inserted successfully'};
        } catch (err) {
            console.error('Error while inserting report:', err);
            throw new Error('Failed to insert report into the database');
        }
    }

    static async getReports() {
        const query = `SELECT *
                       FROM ${Segnala.db3TableName}
                       ORDER BY id_segnalazione DESC`;
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (err) {
            console.error('Error while fetching reports:', err);
            throw new Error('Failed to fetch reports from the database');
        }
    }

    static async solveReport(idSignal) {
        const query = `
            UPDATE ${Segnala.db3TableName}
            SET ${Segnala.ris} = true
            WHERE ${Segnala.idsen} = $1
        `;
        try {
            await pool.query(query, [idSignal]);
            return {message: 'Report marked as solved successfully'};
        } catch (err) {
            console.error('Error while solving report:', err);
            throw new Error('Failed to mark report as solved in the database');
        }
    }
}

export {Segnala};
