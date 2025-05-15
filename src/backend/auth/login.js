import { verifyPassword } from './hash.js';

/**
 * Represents a User registration process.
 * This class must be considered as an abstract class.
 * @class Login
 */
class Login {
    /**
     * The name of the database table for registration.
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
     * Creates an instance of Login.
     * @param {Object} db - The database connection object.
     * @param {string} username - The username for registration.
     * @param {string} password - The password for registration.
     */
    constructor(db, username, password) {
        /**
         * The database connection object.
         * @type {Object}
         */
        this.db = db;

        /**
         * The username for registration.
         * @type {string}
         */
        this.username = username;

        /**
         * The password for registration.
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
     * @throws {LoginError} If verification fails.
     * @returns {Promise<void>}
     */
    async verifyPW() {
        try {
            this.hashedPassword = await verifyPassword(this.password, this.storedPassword);
        } catch (err) {
            throw new LoginError("Wrong password");
        }
    }

    /**
     * Checks if the username already exists in the database.
     * @throws {LoginError} If the username already exists.
     * @returns {Promise<void>}
     */
    async checkUsername()  {
        const query = `SELECT ${this.constructor.dbPassword} FROM ${this.constructor.dbTableName} WHERE ${this.constructor.dbUsername} = $1`;
        const values = [this.username];
        const res = await this.db.query(query, values);
        if (res.rows.length <= 0) {
            throw new LoginError('Username does not exist');
        } else {
            this.storedPassword = res.rows[0][this.constructor.dbPassword];
        }
    }
    
    /**
     * Performs all necessary checks and saves the user to the database.
     * @throws {LoginError} If any checks fail or saving fails.
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
     * @throws {LoginError} If any checks fail or saving fails.
     */
    async login() {
        await this.authenticate();
        return genJWT(this.username, this.constructor.type);        
    }
}

/**
 * Represents a registration process for an artisan.
 * @class ArtisanLogin
 * @extends Login
 */
class ArtisanLogin extends Login {
    /**
     * The name of the database table for artisan registration.
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
}

/**
 * Represents a client registration process, extending the base Login class.
 * Handles validation and saving of client-specific data such as email, first name, and last name.
 * 
 * @class ClientLogin
 * @extends Login
 */
class ClientLogin extends Login {
    /**
     * The name of the database table for client registration.
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
}

/**
 * Represents a admin registration process, extending the base Login class.
 * Handles validation and saving of client-specific data such as email, first name, and last name.
 * 
 * @class AdminLogin
 * @extends Login
 */
class AdminLogin extends Login {
    /**
     * The name of the database table for client registration.
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
}

/**
 * Represents a registration Error.
 * @class LoginError
 * @extends Error
 */
class LoginError extends Error {
    /**
     * Constructs a new LoginError.
     * @param {string} message - The LoginError message.
     */
    constructor(message) {
        super(message);
        this.name = 'LoginError';
    }
}

export { ArtisanLogin, ClientLogin, AdminLogin, LoginError };
