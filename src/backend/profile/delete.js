const { dbReferences, dbArtisanReferences, dbClientReferences, dbAdminReferences } = require('../db/dbReferences.js');
const { pool } = require('../db/dbConnection.js');

/**
 * Represents a Profile deleting process.
 * This class must be considered as an abstract class.
 * @class DeleteProfile
 */
class DeleteProfile {
    /**
     * Creates an instance of DeleteProfile.
     * @param {dbReferences} dbRef - The database reference object.
     * @param {string} username - The username for authentication.
     */
    constructor(dbRef, username) {
        /**
         * The database connection object.
         * @type {Object}
         */
        this.db = pool;
        /**
         * The name of the database table for authentication.
         * @type {string}
         */
        this.dbRef = dbRef;
        /**
         * The username for authentication.
         * @type {string}
         */
        this.username = username;
    }
    /**
     * Deletes the cliente from the database.
     */
    async delete() {
        const query = `DELETE FROM ${this.dbRef.dbTableName}
                       WHERE ${this.dbRef.dbUsername} = $1`;
        const values = [this.username];
        await this.db.query(query, values)
    }
};

/**
 * Represents a Client deleting process.
 * @class DeleteClient
 * @extends DeleteProfile
 */
class DeleteClient extends DeleteProfile {
    /**
     * Creates an instance of DeleteClient.
     * @param {string} username - The username for authentication.
     */
    constructor(username) {
        super(new dbClientReferences(), username);
    }
};
/**
 * Represents an Artisan deleting process.
 * @class DeleteArtisan
 * @extends DeleteProfile
 */
class DeleteArtisan extends DeleteProfile {
    /**
     * Creates an instance of DeleteArtisan.
     * @param {string} username - The username for authentication.
     */
    constructor(username) {
        super(new dbArtisanReferences(), username);
    }
};

/**
 * Represents an Admin deleting process.
 * @class DeleteAdmin
 * @extends DeleteProfile
 */
class DeleteAdmin extends DeleteProfile {
    /**
     * Creates an instance of DeleteAdmin.
     * @param {string} username - The username for authentication.
     */
    constructor(username) {
        super(new dbAdminReferences(), username);
    }
};

module.exports = {
    DeleteClient,
    DeleteArtisan,
    DeleteAdmin
};
