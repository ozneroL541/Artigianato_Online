const { hashPassword } = require('./hash.js');
const { dbReferences, dbArtisanReferences, dbClientReferences, dbAdminReferences } = require('../db/dbReferences.js');
const { pool } = require('../db/dbConnection.js');

/**
 * Represents a User registration process.
 * This class must be considered as an abstract class.
 * @class Registration
 */
class Registration {
    /**
     * Creates an instance of Registration.
     * @param {dbReferences} dbRef - The database reference object.
     * @param {string} username - The username for registration.
     * @param {string} password - The password for registration.
     */
    constructor(dbRef, username, password) {
        /**
         * The name of the database table for registration.
         * @type {string}
         */
        this.dbRef = dbRef;
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
     * Hashes the cliente's password using the Argon2 algorithm.
     * Waring: This method will take a long time to execute for security reasons.
     * @throws {RegistrationError} If hashing fails.
     * @returns {Promise<void>}
     */
    async hashPW() {
        try {
            this.hashedPassword = await hashPassword(this.password);
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
        const query = `SELECT * FROM ${this.dbRef.dbTableName} WHERE ${this.dbRef.dbUsername} = $1`;
        const values = [this.username];
        const res = await pool.query(query, values);
        if (res.rows.length > 0) {
            throw new RegistrationError('Username already exists');
        }
    }
    
    /**
     * Performs all necessary checks and saves the cliente to the database.
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
     * Constructs a new instance of the registration class.
     *
     * @param {string} username - The username for the registration.
     * @param {string} password - The password for the registration.
     * @param {string} companyName - The name of the company.
     * @param {string} iban - The IBAN associated with the company.
     */
    constructor(username, password, companyName, iban) {
        super(new dbArtisanReferences(), username, password);
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
        const query = `SELECT * FROM ${this.dbRef.dbTableName} WHERE nome_impresa = $1`;
        const values = [this.companyName];
        const res = await pool.query(query, values);
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
        const query = `INSERT INTO ${this.dbRef.dbTableName} (${this.dbRef.dbUsername}, ${this.dbRef.dbPassword}, nome_impresa, iban) VALUES ($1, $2, $3, $4)`;
        await this.hashPW();
        const values = [this.username, this.hashedPassword, this.companyName, this.iban];
        try {
            await pool.query(query, values);
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
     * Constructs a new instance of the registration class.
     *
     * @param {string} username - The username for the registration.
     * @param {string} password - The password for the registration.
     * @param {string} email - The email address of the client.
     * @param {string} firstName - The first name of the client.
     * @param {string} lastName - The last name of the client.
     */
    constructor(username, password, email, firstName, lastName) {
        super(new dbClientReferences(), username, password);
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
        const query = `SELECT * FROM ${this.dbRef.dbTableName} WHERE email_cliente = $1`;
        const values = [this.email];
        const res = await pool.query(query, values);
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
     * Validates the first name and last name of the client.
     * 
     * This method checks if both the first name and last name are provided.
     * If either is missing, an RegistrationError is thrown.
     *
     * @async
     * @throws {RegistrationError} If either the first name or last name is missing.
     */
    async checkNames() {
        if (!this.firstName || !this.lastName) {
            throw new RegistrationError('First name and last name are required');
        }
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
        const query = `INSERT INTO ${this.dbRef.dbTableName} (${this.dbRef.dbUsername}, ${this.dbRef.dbPassword}, email_cliente, nome_cliente, cognome_cliente) VALUES ($1, $2, $3, $4, $5)`;
        await this.hashPW();
        const values = [this.username, this.hashedPassword, this.email, this.firstName, this.lastName];
        try {
            await pool.query(query, values);
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
        await this.checkNames();
    }
}

/**
 * Represents a admin registration process, extending the base Registration class.
 * Handles validation and saving of client-specific data such as email, first name, and last name.
 * 
 * @class AdminRegistration
 * @extends Registration
 */
class AdminRegistration extends Registration {
    /**
     * Constructs a new instance of the registration class.
     *
     * @param {string} username - The username for the registration.
     * @param {string} password - The password for the registration.
     * @param {string} email - The email address of the admin.
     * @param {string} firstName - The first name of the admin.
     * @param {string} lastName - The last name of the admin.
     */
    constructor(username, password) {
        super(new dbAdminReferences(), username, password);
    }
    /**
     * Saves the admin registration details into the database.
     * 
     * @async
     * @throws {RegistrationError} If there is an issue executing the database query.
     */
    async save() {
        const query = `INSERT INTO ${this.dbRef.dbTableName} (${this.dbRef.dbUsername}, ${this.dbRef.dbPassword}) VALUES ($1, $2)`;
        await this.hashPW();
        const values = [this.username, this.hashedPassword];
        try {
            await pool.query(query, values);
        } catch (err) {
            console.error(err);
            throw new RegistrationError('Saving registration failed');
        }
    }

    /**
     * Performs all necessary validation checks for the registration process.
     * 
     * @async
     * @returns {Promise<void>} Resolves when all checks are completed.
     */
    async allChecks() {
        await this.checkUsername();
    }
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

module.exports = { 
    ArtisanRegistration,
    ClientRegistration, 
    AdminRegistration, 
    RegistrationError 
};
