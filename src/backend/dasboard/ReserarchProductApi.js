dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default pool;

class IncompatiblyId extends Error {
    constructor(message) {
        super(message);
        this.name = 'IncompatiblyId';
    }
}

class Research {
    static dbTableName = 'prodotti'; 
    static dbId_Products = 'id_prodotto';

    constructor(db, idProduct) {
        this.db = db;
        this.IdProduct = idProduct;
    }

    async ResearchById() {
        const query = `SELECT * FROM ${this.constructor.dbTableName} WHERE ${this.constructor.dbId_Products} = $1`;
        const values = [this.IdProduct];
        const res = await this.db.query(query, values);
        if (res.rows.length === 0) {
            throw new IncompatiblyId("Id of the product is invalid");
        }
        return res.rows[0];
    }

    static async ResearchProduct(db) {
        const query = `SELECT * FROM ${this.dbTableName}`;
        try {
            const res = await db.query(query);
            return res.rows;
        } catch (err) {
            console.error('Failed to retrieve products:', err);
            throw new Error('Could not fetch products from the database');
        }
    }
}

export { Research, IncompatiblyId };
