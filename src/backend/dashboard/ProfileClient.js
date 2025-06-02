import { pool } from "../db/dbConnection.js";

class ProfileClient{

    static dbTableName = 'ordini';
    static db1TableName='clienti';
    static db2TableName='prodotti';
    

    //this value are for the first constructor
    static dbTableUserNameClient='username_cliente';
    static dbTableIdProduct='id_prodotto';
    static dbTableNameProduct='nome_prodotto';
    static dbTableIdOrder='id_ordine';
    static PasswordUser='h_password';
    static MailUser='email_cliente';


   


    //this constructor is for the product 
    constructor(usernameClient, productId, orderId, nameProduct) {
        this.db = pool;
        this.usernameClient = usernameClient; 
        this.productId = productId; 
        this.orderId=orderId;
        this.nameProduct=nameProduct;          
    }
    
   


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


   }

export {ProfileClient};
