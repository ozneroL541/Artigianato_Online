import {ProfileClient, PassWord, Email} from './ProfileClient.js';
import {Segnala} from './Report.js';

/**
 * Reset the password for a given user.
 * @param {Object} req - The request object containing { username, newPassword }
 * @param {Object} res - The response object to send the result
 */
const resetPassword = async (req, res) => {
    const {newPassword} = req.body;
    const username = req.username;
    try {
        const profile = new PassWord(username, newPassword);
        const result = await profile.resetPassword();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'Bad request', error: error.message});
    }
};

/**
 * Reset the email for a given user.
 * @param {Object} req - The request object containing { username, newEmail }
 * @param {Object} res - The response object to send the result
 */
const resetMail = async (req, res) => {
    const {newEmail} = req.body;
    const username = req.username;
    try {
        const profile = new Email(username, newEmail);
        const result = await profile.ResetMail();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'Bad request', error: error.message});
    }
};

/**
 * Reset the email for a given user.
 * @param {Object} req - The request object {idSignal, orderId, description, resolved}
 * @param {Object} res - The response object to send the result
 */
const Report = async (req, res) => {
    const {idSignal, orderId, description, resolved} = req.body;
    const username = req.username;
    try {
        const sen = new Segnala(idSignal, orderId, null, description, resolved);
        const result = await sen.newReport();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'Bad request', error: error.message});
    }
};
/**
 * Get all reports.
 * @param {Object} req - The request object
 * @param {Object} res - The response object to send the result
 * @author Leonardo Basso
 */
const getReports = async (req, res) => {
    try {
        const reports = await Segnala.getReports();
        res.status(200).json(reports);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'Bad request', error: error.message});
    }
};
/**
 * Reset the email for a given user.
 * @param {Object} req - The request object
 * @param {Object} res - The response object to send the result
 */
const GetBuyproduct = async (req, res) => {
    try {
        const username = req.username;
        const profile = new ProfileClient(username);
        const products = await profile.getBuyProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'Bad request', error: error.message});
    }
};
/**
 * Sets a report as solved
 * @param {Object} req The request object
 * @param {Object} res The response object to send the results
 * @author Leonardo Basso
 */
const solveReport = async (req, res) => {
    const {idSignal} = req.body;
    try {
        const result = await Segnala.solveReport(idSignal);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'Bad request', error: error.message});
    }
};
export {
    GetBuyproduct,
    Report,
    resetMail,
    resetPassword,
    getReports,
    solveReport
};
