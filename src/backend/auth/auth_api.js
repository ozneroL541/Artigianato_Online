import { ArtisanRegistration, ClientRegistration, AdminRegistration } from './registration.js';
import { ArtisanAuthentication, ClientAuthentication, AdminAuthentication } from './authentication.js';
import { pool } from '../db/dbConnection.js';

const registerArtisan = async (req, res) => {
    try {
        const { username, password, companyName, iban } = req.body;
        const reg = new ArtisanRegistration(pool, username, password, companyName, iban);
        await reg.register();
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
};

const registerClient = async (req, res) => {
    try {
        const { username, password, email, name, surname } = req.body;
        const reg = new ClientRegistration(pool, username, password, email, name, surname);
        await reg.register();
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
};

const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const reg = new AdminRegistration(pool, username, password);
        await reg.register();
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
};

const loginArtisan = async (req, res) => {
    try {
        const { username, password } = req.body;
        const l = new ArtisanAuthentication(pool, username, password);
        const jwt = await l.login();
        res.status(200).json({ message: 'Authentication successful', token: jwt });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
};

const loginClient = async (req, res) => {
    try {
        const { username, password } = req.body;
        const l = new ClientAuthentication(pool, username, password);
        const jwt = await l.login();
        res.status(200).json({ message: 'Authentication successful', token: jwt });
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const l = new AdminAuthentication(pool, username, password);
        const jwt = await l.login();
        res.status(200).json({ message: 'Authentication successful', token: jwt });
    } catch (error) {
        console.error(error);
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
