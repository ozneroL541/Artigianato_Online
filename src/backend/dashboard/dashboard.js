const {pool} = require('../db/dbConnection.js');
// TODO documentation
class Dashboard{

    static dbTableName = 'prodotti';

    static dbTableArtisanName = 'username_artigiano';

    // crea un oggetto passando nome dell'artigiano
    constructor(artisan_name){
        this.db = pool;
        this.artisan_name = artisan_name;
    }


    async getProducts(){

        const query = `SELECT * FROM ${this.constructor.dbTableName} WHERE ${this.constructor.dbTableArtisanName} = $1`;
        const value = [this.artisan_name];
        const result = await this.db.query(query, value);
        const json = JSON.parse(result);
        return result;
    }
}

module.exports = {Dashboard};