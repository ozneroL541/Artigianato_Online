import { dbReferences, dbArtisanReferences, dbClientReferences, dbAdminReferences } from '../db/dbReferences.js';

/**
 * Represents a Profile deleting process.
 * This class must be considered as an abstract class.
 * @class DeleteProfile
 */
class DeleteProfile {
    /**
     * Creates an instance of DeleteProfile.
     * @param {Object} db - The database connection object.
     * @param {dbReferences} dbRef - The database reference object.
     * @param {string} username - The username for authentication.
     */
    constructor(db, dbRef, username) {
        /**
         * The database connection object.
         * @type {Object}
         */
        this.db = db;
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
     * Deletes the user from the database.
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
     * @param {Object} db - The database connection object.
     * @param {string} username - The username for authentication.
     */
    constructor(db, username) {
        super(db, new dbClientReferences(), username);
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
     * @param {Object} db - The database connection object.
     * @param {string} username - The username for authentication.
     */
    constructor(db, username) {
        super(db, new dbArtisanReferences(), username);
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
     * @param {Object} db - The database connection object.
     * @param {string} username - The username for authentication.
     */
    constructor(db, username) {
        super(db, new dbAdminReferences(), username);
    }
};

export {
    DeleteClient,
    DeleteArtisan,
    DeleteAdmin
};
