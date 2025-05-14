// WIP

const jwt = require("jsonwebtoken");

/**
 * Generates a JSON Web Token (JWT) for a given username and type.
 *
 * @param {string} username - The username for which the token is generated.
 * @param {string} type - The type of user.
 * @returns {string} The generated JWT.
 */
const genJWT = async (username, type) => {
    const payload = {
        username: username,
        type: type
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TTL });
    return token;
};

/**
 * Middleware to protect routes by verifying the JWT token.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.headers - The headers of the HTTP request.
 * @param {string} req.headers.authorization - The authorization header containing the Bearer token.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the stack.
 * @throws {Error} Responds with a 401 status code if the token is missing, invalid, or verification fails.
 */
const checkAuth = async (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
        try {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userResult = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [decoded.id]);
            req.user = userResult.rows[0];
            next();
        } catch (error) {
            res.status(401).json({ message: "Unauthorized, invalid token" });
        }
    } else {
        res.status(401).json({ message: "Unauthorized, no token" });
    }
};
