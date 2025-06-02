import {verifyPassword} from './hash.js';
import {genArtisanJWT, genClientJWT, genAdminJWT} from './jwt.js';
import { dbReferences, dbArtisanReferences, dbClientReferences, dbAdminReferences } from '../db/dbReferences.js';
import { pool } from '../db/dbConnection.js';

/**
 * Represents a User authentication process.
 * This class must be considered as an abstract class.
 * @class Authentication
 */
class Authentication {
    /**
     * Creates an instance of Authentication.
     * @param {dbReferences} dbRef - The database reference object.
     * @param {string} username - The username for authentication.
     * @param {string} password - The password for authentication.
     */
    constructor(dbRef, username, password) {
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
        /**
         * The password for authentication.
         * @type {string}
         */
        this.password = password;
        /**
         * Password stored in the database.
         * @type {string|null}
         */
        this.storedPassword = null;
    }

    /**
     * Verifies the password by hashing it and comparing it with the stored hash.
     * @throws {AuthenticationError} If verification fails.
     * @returns {Promise<void>}
     */
    async verifyPW() {
        try {
            this.hashedPassword = await verifyPassword(this.password, this.storedPassword);
        } catch (err) {
            throw new AuthenticationError("Wrong password");
        }
    }

    /**
     * Checks if the username already exists in the database.
     * @throws {AuthenticationError} If the username already exists.
     * @returns {Promise<void>}
     */
    async checkUsername() {
        const query = `SELECT ${this.dbRef.dbPassword}
                       FROM ${this.dbRef.dbTableName}
                       WHERE ${this.dbRef.dbUsername} = $1`;
        const values = [this.username];
        const res = await pool.query(query, values);
        if (res.rows.length <= 0) {
            throw new AuthenticationError('Username does not exist');
        } else {
            this.storedPassword = res.rows[0][this.dbRef.dbPassword];
        }
    }

    /**
     * Performs all necessary checks and saves the user to the database.
     * @throws {AuthenticationError} If any checks fail or saving fails.
     * @returns {Promise<void>}
     */
    async authenticate() {
        await this.checkUsername();
        await this.verifyPW();
    }

    /**
     * Performs the login process by checking the username and password.
     * If successful, generates a JWT for the user.
     * @returns {Promise<string>} The generated JWT for the user.
     * @throws {AuthenticationError} If any checks fail or saving fails.
     */
    async login() {
        await this.authenticate();
        return await this.getJWT();
    }
}

/**
 * Represents an authentication process for an artisan.
 * @class ArtisanAuthentication
 * @extends Authentication
 */
class ArtisanAuthentication extends Authentication {
    /**
     * The attribute name for the type of user who wants to log-in.
     * @type {string|null}
     */
    static type = 'artigiano';
    /**
     * Creates an instance of Authentication.
     * @param {string} username - The username for authentication.
     * @param {string} password - The password for authentication.
     */
    constructor( username, password) {
        super(new dbArtisanReferences(), username, password);
    }
    /**
     * Generates a JWT for the artisan user.
     * @returns {Promise<string>} The generated JWT for the artisan user.
     */
    async getJWT() {
        return genArtisanJWT(this.username);
    }
}

/**
 * Represents a client authentication process, extending the base Authentication class.
 * Handles validation and saving of client-specific data such as email, first name, and last name.
 *
 * @class ClientAuthentication
 * @extends Authentication
 */
class ClientAuthentication extends Authentication {
    /**
     * The attribute name for the type of user who wants to log-in.
     * @type {string|null}
     */
    static type = 'cliente';
    /**
     * Creates an instance of Authentication.
     * @param {string} username - The username for authentication.
     * @param {string} password - The password for authentication.
     */
    constructor(username, password) {
        super(new dbClientReferences(), username, password);
    }
    /**
     * Generates a JWT for the client user.
     * @returns {Promise<string>} The generated JWT for the client user.
     */
    async getJWT() {
        return genClientJWT(this.username);
    }
}

/**
 * Represents a admin authentication process, extending the base Authentication class.
 * Handles validation and saving of client-specific data such as email, first name, and last name.
 *
 * @class AdminAuthentication
 * @extends Authentication
 */
class AdminAuthentication extends Authentication {
    /**
     * The attribute name for the type of user who wants to log-in.
     * @type {string|null}
     */
    static type = 'amministratore';
    /**
     * Creates an instance of Authentication.
     * @param {string} username - The username for authentication.
     * @param {string} password - The password for authentication.
     */
    constructor( username, password) {
        super(new dbAdminReferences(), username, password);
    }
    /**
     * Generates a JWT for the admin user.
     * @returns {Promise<string>} The generated JWT for the admin user.
     */
    async getJWT() {
        return genAdminJWT(this.username);
    }
}

/**
 * Represents an authentication Error.
 * @class AuthenticationError
 * @extends Error
 */
class AuthenticationError extends Error {
    /**
     * Constructs a new AuthenticationError.
     * @param {string} message - The AuthenticationError message.
     */
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
    }
}

export {
    ArtisanAuthentication,
    ClientAuthentication,
    AdminAuthentication,
    AuthenticationError
};
