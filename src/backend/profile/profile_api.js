const { DeleteClient, DeleteArtisan, DeleteAdmin } = require('./delete.js');

/**
 * Delete a client from the system.
 * @param {Object} req - The request object containing the username of the client to delete
 * @param {Object} res - The response object to send the result
 */
const delClient = async (req, res) => {
    try {
        const { username } = req
        const del = new DeleteClient(username);
        await del.delete();
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Client', detail: error.message });
    }
};
/**
 * Delete an artisan from the system.
 * @param {Object} req - The request object containing the username of the artisan to delete
 * @param {Object} res - The response object to send the result
 */
const delArtisan = async (req, res) => {
    try {
        const { username } = req
        const del = new DeleteArtisan(username);
        await del.delete();
        res.status(200).json({ message: 'Artisan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Artisan', detail: error.message });
    }
};
/**
 * Delete an admin from the system.
 * @param {Object} req - The request object containing the username of the admin to delete
 * @param {Object} res - The response object to send the result
 */
const delAdmin = async (req, res) => {
    try {
        const { username } = req
        const del = new DeleteAdmin(username);
        await del.delete();
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Admin', detail: error.message });
    }
};

module.exports = { delClient, delArtisan, delAdmin };
