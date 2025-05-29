import { ArtisanRegistration, ClientRegistration, AdminRegistration } from './registration.js';
import { ArtisanAuthentication, ClientAuthentication, AdminAuthentication } from './authentication.js';

/**
 * Register an artisan in the system.
 * @param {Object} req - The request object containing artisan details { username, password, companyName, iban }
 * @param {Object} res - The response object to send the result
 */
const registerArtisan = async (req, res) => {
    try {
        const { username, password, companyName, iban } = req.body;
        const reg = new ArtisanRegistration(username, password, companyName, iban);
        await reg.register();
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
};
/**
 * Register a client in the system.
 * @param {Object} req - The request object containing client details { username, password, email, name, surname }
 * @param {Object} res - The response object to send the result
 */
const registerClient = async (req, res) => {
    try {
        const { username, password, email, name, surname } = req.body;
        const reg = new ClientRegistration(username, password, email, name, surname);
        await reg.register();
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
};
/**
 * Register an admin in the system.
 * @param {Object} req - The request object containing admin details { username, password }
 * @param {Object} res - The response object to send the result
 */
const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const reg = new AdminRegistration(username, password);
        await reg.register();
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
};
/**
 * Log in an artisan in.
 * @param {Object} req - The request object containing artisan credentials { username, password }
 * @param {Object} res - The response object to send the result
 */
const loginArtisan = async (req, res) => {
    try {
        const { username, password } = req.body;
        const l = new ArtisanAuthentication(username, password);
        const jwt = await l.login();
        res.status(200).json({ message: 'Authentication successful', token: jwt });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
};
/**
 * Log in a client in.
 * @param {Object} req - The request object containing client credentials { username, password }
 * @param {Object} res - The response object to send the result
 */
const loginClient = async (req, res) => {
    try {
        const { username, password } = req.body;
        const l = new ClientAuthentication(username, password);
        const jwt = await l.login();
        res.status(200).json({ message: 'Authentication successful', token: jwt });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
};
/**
 * Log in an admin in.
 * @param {Object} req - The request object containing admin credentials { username, password }
 * @param {Object} res - The response object to send the result
 */
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const l = new AdminAuthentication( username, password);
        const jwt = await l.login();
        res.status(200).json({ message: 'Authentication successful', token: jwt });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
};

export {
    registerArtisan,
    registerClient,
    registerAdmin,
    loginArtisan,
    loginClient,
    loginAdmin
};
