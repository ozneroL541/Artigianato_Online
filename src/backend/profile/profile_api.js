import { pool } from '../db/dbConnection.js';
import { DeleteClient, DeleteArtisan, DeleteAdmin } from './delete.js';

const delClient = async (req, res) => {
    try {
        const { username } = req.username
        const del = new DeleteClient(pool, username);
        await del.delete();
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Client', detail: error.message });
    }
};

const delArtisan = async (req, res) => {
    try {
        const { username } = req.username
        const del = new DeleteArtisan(pool, username);
        await del.delete();
        res.status(200).json({ message: 'Artisan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Artisan', detail: error.message });
    }
};

const delAdmin = async (req, res) => {
    try {
        const { username } = req.username
        const del = new DeleteAdmin(pool, username);
        await del.delete();
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Admin', detail: error.message });
    }
};

export { delClient, delArtisan, delAdmin };
