class DBReferences {
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
}

/**
 * Represents artisan database references.
 * @class ArtisanDBReferences
 * @extends DBReferences
 */
class ArtisanDBReferences extends DBReferences {
    /**
     * The name of the database table for artisan registration.
     * @type {string}
     */
    static dbTableName = 'artigiani';
    /**
     * The attribute name for the username in the database table.
     * @type {string}
     */
    static dbUsername = 'username_artigiano';
}

/**
 * Represents client database references.
 * @class ClientDBReferences
 * @extends DBReferences
 */
class ClientDBReferences extends DBReferences {
    /**
     * The name of the database table for client registration.
     * @type {string}
     */
    static dbTableName = 'clienti';

    /**
     * The attribute name for the username in the database table.
     * @type {string}
     */
    static dbUsername = 'username_cliente';
}

/**
 * Represents admin database references.
 * @class AdminDBReferences
 * @extends DBReferences
 */
class AdminDBReferences extends DBReferences {
    /**
     * The name of the database table for client registration.
     * @type {string}
     */
    static dbTableName = 'amministratori';

    /**
     * The attribute name for the username in the database table.
     * @type {string}
     */
    static dbUsername = 'username_amministratore';
}
