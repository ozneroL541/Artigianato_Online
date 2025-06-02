import { ProfileClient } from './dashboard/ProfileClient.js';
 import {Segnala} from './dashboard/Segnalachion.js';

/**
 * Reset the password for a given user.
 * @param {Object} req - The request object containing { username, newPassword }
 * @param {Object} res - The response object to send the result
 */
export const resetPassword = async (req, res) => {
    const { username, newPassword } = req.body;
    try {
        const profile = new ProfileClient(username);
        const result = await profile.resetPassword(newPassword);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
}

/**
 * Reset the email for a given user.
 * @param {Object} req - The request object containing { username, newEmail }
 * @param {Object} res - The response object to send the result
 */
export const resetMail = async (req, res) => {
    const { username, newEmail } = req.body;
    try {
        const profile = new ProfileClient(username);
        const result = await profile.resetMail(newEmail);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
}

/**
 * Reset the email for a given user.
 * @param {Object} req - The request object {idSignal, orderId, description, resolved}
 * @param {Object} res - The response object to send the result
 */
export const Segnalachion = async (req, res) => {
    const { idSignal, orderId, description, resolved } = req.body;
    try {
        const sen = new Segnala(idSignal, orderId,description,resolved);
        const result = await sen.newSignal();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
}

/**
 * Reset the email for a given user.
 * @param {Object} req - The request object
 * @param {Object} res - The response object to send the result
 */
export const GetBuyproduct=async (req, res) => {
    try {
        const profile = new ProfileClient(req.query.username); 
        const products = await profile.getBuyProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
}
