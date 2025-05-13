class Dashboard{

    static dbTableName = 'prodotti';

    // crea un oggetto passando nome dell'artigiano
    constructor(db, artisan_name){
        this.db = db;
        this.artisan_name = artisan_name;
    }
}