import {verifyPassword} from './hash.js';
import {genArtisanJWT, genClientJWT, genAdminJWT} from './jwt.js';

/**
 * Represents a User authentication process.
 * This class must be considered as an abstract class.
 * @class Authentication
 */
class Authentication {
    /**
     * The name of the database table for authentication.
     * @type {string|null}
     */
    static dbTableName = null;

    /**
     * The attribute name for the username in the database table.
     * @type {string|null}
     */
    static dbUsername = null;

    /**
     * The attribute name for the password in the database table.
     * @type {string}
     */
    static dbPassword = 'h_password';

    /**
     * The attribute name fot the type of user who wants to log-in.
     * @type {string|null}
     */
    static type = null;

    /**
     * Creates an instance of Authentication.
     * @param {Object} db - The database connection object.
     * @param {string} username - The username for authentication.
     * @param {string} password - The password for authentication.
     */
    constructor(db, username, password) {
        /**
         * The database connection object.
         * @type {Object}
         */
        this.db = db;

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
        const query = `SELECT ${this.constructor.dbPassword}
                       FROM ${this.constructor.dbTableName}
                       WHERE ${this.constructor.dbUsername} = $1`;
        const values = [this.username];
        const res = await this.db.query(query, values);
        if (res.rows.length <= 0) {
            throw new AuthenticationError('Username does not exist');
        } else {
            this.storedPassword = res.rows[0][this.constructor.dbPassword];
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
     * The name of the database table for artisan authentication.
     * @type {string}
     */
    static dbTableName = 'artigiani';
    /**
     * The attribute name for the username in the database table.
     * @type {string|null}
     */
    static dbUsername = 'username_artigiano';
    /**
     * The attribute name for the type of user who wants to log-in.
     * @type {string|null}
     */
    static type = 'artigiano';

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
     * The name of the database table for client authentication.
     * @type {string}
     */
    static dbTableName = 'clienti';
    /**
     * The attribute name for the username in the database table.
     * @type {string|null}
     */
    static dbUsername = 'username_cliente';
    /**
     * The attribute name for the type of user who wants to log-in.
     * @type {string|null}
     */
    static type = 'cliente';

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
     * The name of the database table for client authentication.
     * @type {string}
     */
    static dbTableName = 'amministratori';
    /**
     * The attribute name for the username in the database table.
     * @type {string|null}
     */
    static dbUsername = 'username_amministratore';
    /**
     * The attribute name for the type of user who wants to log-in.
     * @type {string|null}
     */
    static type = 'amministratore';

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
