class ProfileClient{

    static dbTableName = 'ordini';
    static db1TableName='clienti';
    static db2TableName='prodotti';
    static db3TableName='segnalazioni';

    //this value are for the first constructor
    static dbTableUserNameClient='username_cliente';
    static dbTableIdProduct='id_prodotto';
    static dbTableNameProduct='nome_prodotto';
    static dbTableIdOrder='id_ordine';
    static PasswordUser='h_password';
    static MailUser='email_cliente';

    static idsen='id_segnalazione';
    static timestamp_segnalazione='timestamp';
    static descr='descrizione';
    static ris='risolta';

   


    //this constructor is for the product 
    constructor(db, usernameClient, productId, orderId, nameProduct) {
        this.db = db;
        this.usernameClient = usernameClient; 
        this.productId = productId; 
        this.orderId=orderId;
        this.nameProduct=nameProduct;          
    }
    
    //this constructor is for the segnalacion
    //constructor(id_segn, id_ord, timeStampsen, desc, ris){
    //    this.id_segn=id_segn;
    //    this.id_ord=id_ord;
    //    this.timeStampsen=timeStampsen;
    //    this.desc=desc;
    //    this.ris=ris;
    //}


    async getBuyProducts(){

        const query = `
        SELECT P.${this.constructor.dbTableNameProduct}, P.${this.constructor.dbTableIdProduct},O.${this.constructor.dbTableIdOrder}
        FROM ${this.constructor.dbTableName} O
        NATURAL JOIN ${this.constructor.db2TableName} P
        WHERE O.${this.constructor.dbTableUserNameClient} IN (
            SELECT ${this.constructor.UsernameClient}
            FROM ${this.constructor.db1TableName}
            NATURAL JOIN ${this.constructor.dbTableName}
        )`;

    try {
        const result = await this.db.query(query);
        return result.rows;
    } catch (err) {
        console.error('Error while retrieving purchased products:', err);
        throw new Error('Failed to retrieve purchased products from the database');
    }
    }

    async resetPassword(newPassword) {
    const query = `
        UPDATE ${this.constructor.db1TableName}
        SET ${this.constructor.PasswordUser} = $1
        WHERE ${this.constructor.UsernameClient} = $2
    `;

    const values = [newPassword, this.usernameClient];

    try {
        const result = await this.db.query(query, values);

        if (result.rowCount === 0) {
            throw new Error('No user found with the given username');
        }

        return { message: 'Password updated successfully' };
    } catch (err) {
        console.error('Error while resetting password:', err);
        throw new Error('Failed to reset password');
    }
}


    async ResetMail(newMail){

        const query = `
        UPDATE ${this.constructor.db1TableName}
        SET ${this.constructor.MailUser} = $1
        WHERE ${this.constructor.UsernameClient} = $2
    `;

    const values = [newMail, this.usernameClient];

    try {
        const result = await this.db.query(query, values);

        if (result.rowCount === 0) {
            throw new Error('No user found with the given username');
        }

        return { message: 'Mail updated successfully' };
    } catch (err) {
        console.error('Error while resetting Mail:', err);
        throw new Error('Failed to reset Mail');
    }

    }
async newSignal(idSignal, orderId, description, resolved) {
    const query = `
        INSERT INTO ${this.constructor.db3TableName}
        (${this.constructor.idsen}, ${this.constructor.dbTableIdOrder}, ${this.constructor.timestamp_segnalazione}, ${this.constructor.descr}, ${this.constructor.ris})
        VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4)
    `;

    const values = [idSignal, orderId, description, resolved];

    try {
        await this.db.query(query, values);
        return { message: 'Report inserted successfully' };
    } catch (err) {
        console.error('Error while inserting report:', err);
        throw new Error('Failed to insert report into the database');
    }
}

   }

export {ProfileClient};
