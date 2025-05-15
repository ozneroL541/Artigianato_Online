const jwt = require("jsonwebtoken");

/**
 * Generates a JSON Web Token (JWT) for a given username and type.
 *
 * @param {string} username - The username for which the token is generated.
 * @param {string} type - The type of user.
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
                res.status(403).json({ message: "Forbidden", detail: "this user is not authorized for this" });
            }
        } catch (error) {
            res.status(401).json({ message: "Unauthorized", detail: "invalid token" });
        }
    } else {
        res.status(401).json({ message: "Unauthorized", detail: "no token" });
    }
};

exports = {
    genJWT,
    checkAuth
};
