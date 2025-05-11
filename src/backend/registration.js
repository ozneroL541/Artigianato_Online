import argon2 from 'argon2';

/**
 * Represents a User registration process.
 * This class must be considered as an abstract class.
 * @class Registration
 */
class Registration {
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
     * Creates an instance of Registration.
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
         * The hashed version of the password.
         * @type {string|null}
         */
        this.hashedPassword = null;
    }

    /**
     * Hashes the user's password using the Argon2 algorithm.
     * Waring: This method will take a long time to execute for security reasons.
     * @throws {RegistrationError} If hashing fails.
     * @returns {Promise<void>}
     */
    async hashPassword() {
        try {
            this.hashedPassword = await argon2.hash(this.password);
        } catch (err) {
            console.error('Error hashing password:', this.username);
            console.error(err);
            throw err;
        }
    }

    /**
     * Checks if the username already exists in the database.
     * @throws {RegistrationError} If the username already exists.
     * @returns {Promise<void>}
     */
    async checkUsername()  {
        const query = `SELECT * FROM ${this.constructor.dbTableName} WHERE ${this.constructor.dbUsername} = $1`;
        const values = [this.username];
        const res = await this.db.query(query, values);
        if (res.rows.length > 0) {
            throw new RegistrationError('Username already exists');
        }
    }
    
    /**
     * Performs all necessary checks and saves the user to the database.
     * @throws {RegistrationError} If any checks fail or saving fails.
     * @returns {Promise<void>}
     */
    async register() {
        await this.allChecks();
        await this.save();
    }
}

/**
 * Represents a registration process for an artisan.
 * @class ArtisanRegistration
 * @extends Registration
 */
class ArtisanRegistration extends Registration {
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
     * Constructs a new instance of the registration class.
     *
     * @param {Object} db - The database connection object.
     * @param {string} username - The username for the registration.
     * @param {string} password - The password for the registration.
     * @param {string} companyName - The name of the company.
     * @param {string} iban - The IBAN associated with the company.
     */
    constructor(db, username, password, companyName, iban) {
        super(db, username, password);
        /**
         * The name of the company.
         * @type {string}
         */
        this.companyName = companyName;
        /**
         * The IBAN associated with the company.
         * @type {string}
         */
        this.iban = iban;
    }

    /**
     * Checks if the company name already exists in the database.
     * 
     * This method queries the database to determine if a company with the same
     * name as the current instance's `companyName` property already exists.
     * If a match is found, an RegistrationError is thrown to indicate that the company name
     * is already in use.
     * 
     * @throws {RegistrationError} Throws an RegistrationError if the company name already exists in the database.
     * @returns {Promise<void>} Resolves if the company name does not exist.
     */
    async checkCompanyName() {
        const query = `SELECT * FROM ${this.constructor.dbTableName} WHERE nome_impresa = $1`;
        const values = [this.companyName];
        const res = await this.db.query(query, values);
        if (res.rows.length > 0) {
            throw new RegistrationError('Company name already exists');
        }
    }

    /**
     * Validates the IBAN format of the current instance.
     * 
     * @throws {RegistrationError} Throws an RegistrationError if the IBAN format is invalid.
     */
    async checkIban() {
        const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
        if (!ibanRegex.test(this.iban)) {
            throw new RegistrationError('Invalid IBAN format');
        }
    }

    /**
     * Saves the artisan registration details into the database.
     * 
     * This method inserts the artisan's username, hashed password, company name, 
     * and IBAN into the corresponding database table. It first hashes the password 
     * before executing the database query. If an RegistrationError occurs during the process, 
     * it logs the RegistrationError and rethrows it.
     * 
     * @async
     * @throws {RegistrationError} If there is an issue executing the database query.
     */
    async save() {
        const query = `INSERT INTO ${this.constructor.dbTableName} (${this.constructor.dbUsername}, ${this.constructor.dbPassword}, nome_impresa, iban) VALUES ($1, $2, $3, $4)`;
        await this.hashPassword();
        const values = [this.username, this.hashedPassword, this.companyName, this.iban];
        try {
            await this.db.query(query, values);
        } catch (err) {
            throw new RegistrationError('Saving registration failed');
        }
    }

    /**
     * Performs all necessary validation checks for the registration process.
     * This includes checking the username, company name, and IBAN.
     * Each check is executed asynchronously in sequence.
     * 
     * @async
     * @returns {Promise<void>} Resolves when all checks are completed.
     */
    async allChecks() {
        await this.checkUsername();
        await this.checkCompanyName();
        await this.checkIban();
    }
}

/**
 * Represents a client registration process, extending the base Registration class.
 * Handles validation and saving of client-specific data such as email, first name, and last name.
 * 
 * @class ClientRegistration
 * @extends Registration
 */
class ClientRegistration extends Registration {
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
     * Constructs a new instance of the registration class.
     *
     * @param {Object} db - The database connection object.
     * @param {string} username - The username for the registration.
     * @param {string} password - The password for the registration.
     * @param {string} email - The email address of the client.
     * @param {string} firstName - The first name of the client.
     * @param {string} lastName - The last name of the client.
     */
    constructor(db, username, password, email, firstName, lastName) {
        super(db, username, password);
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    /**
     * Checks if the email associated with the current instance is unique in the database.
     * 
     * Queries the database table associated with the current class to determine if the 
     * provided email already exists. If the email is found, an RegistrationError is thrown.
     * 
     * @async
     * @throws {RegistrationError} Throws an RegistrationError if the email already exists in the database.
     * @throws {RegistrationError} Throws an RegistrationError if there is an issue executing the database query.
     */
    async checkEmailUnique() {
        const query = `SELECT * FROM ${this.constructor.dbTableName} WHERE email_cliente = $1`;
        const values = [this.email];
        const res = await this.db.query(query, values);
        if (res.rows.length > 0) {
            throw new RegistrationError('Email already exists');
        }
    }

    /**
     * Validates the format of the email address stored in the `email` property.
     * Throws an RegistrationError if the email format is invalid.
     * 
     * @throws {RegistrationError} If the email format is invalid.
     */
    checkEmailFormat() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
            throw new RegistrationError('Invalid email format');
        }
    }

    /**
     * Validates the email by performing two checks:
     * 1. Ensures the email format is correct.
     * 2. Verifies that the email is unique and not already in use.
     * 
     * @async
     * @throws {RegistrationError} Throws an RegistrationError if the email format is invalid or if the email is not unique.
     */
    async checkEmail() {
        this.checkEmailFormat();
        await this.checkEmailUnique();
    }

    /**
     * Saves the client registration details into the database.
     * 
     * This method inserts the client's username, hashed password, email, first name, and last name
     * into the corresponding database table. It first hashes the password before executing the database query.
     * If an RegistrationError occurs during the process, it logs the RegistrationError and rethrows it.
     * 
     * @async
     * @throws {RegistrationError} If there is an issue executing the database query.
     */
    async save() {
        const query = `INSERT INTO ${this.constructor.dbTableName} (${this.constructor.dbUsername}, ${this.constructor.dbPassword}, email_cliente, nome_cliente, cognome_cliente) VALUES ($1, $2, $3, $4, $5)`;
        await this.hashPassword();
        const values = [this.username, this.hashedPassword, this.email, this.firstName, this.lastName];
        try {
            await this.db.query(query, values);
        } catch (err) {
            console.error(err);
            throw new RegistrationError('Saving registration failed');
        }
    }
    
    /**
     * Performs all necessary validation checks for the registration process.
     * This includes checking the username and email.
     * Each check is executed asynchronously in sequence.
     * 
     * @async
     * @returns {Promise<void>} Resolves when all checks are completed.
     */
    async allChecks() {
        await this.checkUsername();
        await this.checkEmail();
    }
}

class AdminRegistration extends Registration {
    // TODO
}

/**
 * Represents a registration Error.
 * @class RegistrationError
 * @extends Error
 */
class RegistrationError extends Error {
    /**
     * Constructs a new RegistrationError.
     * @param {string} message - The RegistrationError message.
     */
    constructor(message) {
        super(message);
        this.name = 'RegistrationError';
    }
}

export { ArtisanRegistration, ClientRegistration, RegistrationError };
