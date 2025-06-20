import jwt from "jsonwebtoken";

/**
 * Artisan type
 * @type {string}
 */
const artisanType = 'artigiano';
/**
 * Client type
 * @type {string}
 */
const clientType = 'cliente';
/**
 * Admin type
 * @type {string}
 */
const adminType = 'amministratore';

/**
 * Generates a JSON Web Token (JWT) for a given username and type.
 *
 * @param {string} username - The username for which the token is generated.
 * @param {string} type - The type of cliente.
 * @returns {string} The generated JWT.
 */
async function genJWT (username, type) {
    const payload = {
        username: username,
        type: type
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TTL });
    return token;
};

/**
 * Protect routes by verifying the JWT token.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} Responds with a 401 status code if the token is missing, invalid, or verification fails.
 * @throws {Error} Responds with a 403 status code if the token type does not match the expected type.
 */
async function checkAuth(req, res, type) {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
        try {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.type !== type) {
                res.status(403).json({ message: "Forbidden", detail: "this cliente is not authorized for this" });
            }
            req.username = decoded.username;
        } catch (error) {
            res.status(401).json({ message: "Unauthorized", detail: "invalid token" });
        }
    } else {
        res.status(401).json({ message: "Unauthorized", detail: "no token" });
    }
};

/**
 * Generates a JSON Web Token (JWT) for an artisan cliente.
 * @param {string} username artisan username
 * @returns JWT
 */
async function genArtisanJWT(username) {
    return genJWT(username, artisanType);    
}
/**
 * Generates a JSON Web Token (JWT) for a client cliente.
 * @param {string} username client username
 * @returns JWT
 */
async function genClientJWT(username) {
    return genJWT(username, clientType);    
}
/**
 * Generates a JSON Web Token (JWT) for an admin cliente.
 * @param {string} username admin username
 * @returns JWT
 */
async function genAdminJWT(username) {
    return genJWT(username, adminType);    
}


/**
 * Middleware to check if the cliente is authenticated as an artisan.
 * @param {string} req - The HTTP request object.
 * @param {string} res - The HTTP response object.
 * @param {function} next - The next middleware function.
 * @throws {Error} Responds with a 401 status code if the token is missing, invalid, or verification fails.
 * @throws {Error} Responds with a 403 status code if the token type does not match the expected type.
 */
const checkArtisan = async (req, res, next) => {
    await checkAuth(req, res, artisanType);
    if (res.statusCode === 200) {
        next();
    }
};

/**
 * Middleware to check if the cliente is authenticated as a client.
 * @param {string} req - The HTTP request object.
 * @param {string} res - The HTTP response object.
 * @param {function} next - The next middleware function.
 * @throws {Error} Responds with a 401 status code if the token is missing, invalid, or verification fails.
 * @throws {Error} Responds with a 403 status code if the token type does not match the expected type.
 */
const checkClient = async (req, res, next) => {
    await checkAuth(req, res, clientType);
    if (res.statusCode === 200) {
        next();
    }
};

/**
 * Middleware to check if the cliente is authenticated as an admin.
 * @param {string} req - The HTTP request object.
 * @param {string} res - The HTTP response object.
 * @param {function} next - The next middleware function.
 * @throws {Error} Responds with a 401 status code if the token is missing, invalid, or verification fails.
 * @throws {Error} Responds with a 403 status code if the token type does not match the expected type.
 */
const checkAdmin = async (req, res, next) => {
    await checkAuth(req, res, adminType);
    if (res.statusCode === 200) {
        next();
    }
};

export {
    genArtisanJWT,
    genClientJWT,
    genAdminJWT,
    checkArtisan,
    checkClient,
    checkAdmin
};
