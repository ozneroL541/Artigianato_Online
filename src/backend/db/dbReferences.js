/** Username attribute's name for the database */
const dbUsername        = 'username';
/** Password attribute's name for the database */
const dbPassword        = 'h_password';
/** Artisans' table name for the database */
const dbArtisanTable    = 'artigiani';
/** Username attribute's name for the artisans in the database */
const dbArtisanUsername = dbUsername + '_artigiano';
/** Clients' table name for the database */
const dbClientTable     = 'clienti';
/** Username attribute's name for the clients in the database */
const dbClientUsername  = dbUsername + '_cliente';
/** Admins' table name for the database */
const dbAdminTable      = 'amministratori'
/** Username attribute's name for the admins in the database */;
const dbAdminUsername   = dbUsername + '_amministratore';

/**
 * Class to manage database references
 * @class dbReferences
 */
class dbReferences {
    /**
     * Constructor for dbReferences
     * @param {string} db_TableName - The name of the database table
     * @param {string} db_Username - The username for the database
     * @param {string} db_Password - The password for the database
     */
    constructor(db_TableName=null, db_Username=dbUsername, db_Password=dbPassword) {
        this.dbTableName = db_TableName;
        this.dbUsername = db_Username;
        this.dbPassword = db_Password;
    }
}

/**
 * Class to manage artisan database references
 * @class dbArtisanReferences
 * @extends dbReferences
*/
class dbArtisanReferences extends dbReferences {
    /**
     * Constructor for dbArtisanReferences
     */
    constructor() {
        super(dbArtisanTable, dbArtisanUsername, dbPassword);
    }
}

/**
 * Class to manage client database references
 * @class dbClientReferences
 * @extends dbReferences
 */
class dbClientReferences extends dbReferences {
    /**
     * Constructor for dbClientReferences
     */
    constructor() {
        super(dbClientTable, dbClientUsername, dbPassword);
    }
}

/**
 * Class to manage admin database references
 * @class dbAdminReferences
 * 
 */
class dbAdminReferences extends dbReferences {
    /**
     * Constructor for dbAdminReferences
     */
    constructor() {
        super(dbAdminTable, dbAdminUsername, dbPassword);
    }
}

export {
    dbReferences,
    dbArtisanReferences,
    dbClientReferences,
    dbAdminReferences
};
