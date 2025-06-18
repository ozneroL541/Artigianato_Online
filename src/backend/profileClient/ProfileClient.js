import { pool } from "../db/dbConnection.js";

class ProfileClient{


    //this constructor is for the product 
    constructor(usernameClient) {
        this.usernameClient = usernameClient; 
                 
    }
    
   


    async getBuyProducts(){

        SELECT `P.nome_prodotto AS "nameProduct", 
               P.id_prodotto AS "productId", 
               O.quantita AS "Quantity"
        FROM ordini O NATURAL JOIN prodotti P 
        WHERE O.${this.constructor.dbTableUserNameClient} = $1`

    try {
        const result = await pool.query(query, [this.usernameClient]);
        return result.rows;
    } catch (err) {
        console.error('Error while retrieving purchased products:', err);
        throw new Error('Failed to retrieve purchased products from the database');
    }
    }}

    class PassWord{

    constructor(usernameClient) {
        
        this.usernameClient = usernameClient; 
                 
    }
    
    async resetPassword(newPassword) {
    const query = `
        UPDATE clienti
        SET ${this.constructor.PasswordClient} = $1
        WHERE ${this.constructor.UsernameClient} = $2
    `;

    const values = [newPassword, this.usernameClient];

    try {
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            throw new Error('No user found with the given username');
        }

        return { message: 'Password updated successfully' };
    } catch (err) {
        console.error('Error while resetting password:', err);
        throw new Error('Failed to reset password');
    }
 }
}

class Email{

    constructor(usernameClient) {
        
        this.usernameClient = usernameClient; 
                 
    }

    async ResetMail(newMail){

        const query = `
        UPDATE clienti
        SET email_cliente = $1
        WHERE ${this.constructor.UsernameClient}  = $2
    `;

    const values = [newMail, this.usernameClient];

    try {
        const result = await pool.query(query, values);

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

export {ProfileClient,PassWord,Email};
