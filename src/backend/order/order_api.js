import Order from './Order.js';

/**
 * @returns {string} a date between 5 amd 7 days from now
 */
function getRandomDeliveryDate() {
    const today = new Date();
    const daysToAdd = Math.floor(Math.random() * 3) + 5; // Numero tra 5 e 7
    today.setDate(today.getDate() + daysToAdd);

    return today.toISOString().split('T')[0];
}

/**
 * Crea un nuovo ordine.
 * @param {Object} req - Richiesta contenente { id_prodotto, quantita }
 * @param {Object} res - Risposta JSON
 */
const createOrder = async (req, res) => {
    try {
        const username_cliente = req.username; // Da token
        const { id_prodotto, quantita } = req.body;

        if (!id_prodotto || !quantita || quantita <= 0) {
            return res.status(400).json({ message: 'Missing or invalid fields' });
        }

        const data_consegna = getRandomDeliveryDate()

        const ordine = new Order(null, id_prodotto, username_cliente, null, quantita, data_consegna);
        const id = await ordine.save();

        res.status(201).json({
            message: 'Ordine effettuato con successo',
            order_id: id,
            consegna_prevista: data_consegna
        });
    } catch (error) {
        res.status(400).json({ message: 'Errore nella creazione dell\'ordine', error: error.message });
    }
};

/**
 * Recupera tutti gli ordini del cliente loggato.
 * @param {Object} req - Richiesta con token
 * @param {Object} res - Risposta JSON
 */
const getOrdersByCustomer = async (req, res) => {
    try {
        const username_cliente = req.username;
        const ordini = await Order.getByCustomer(username_cliente);
        res.status(200).json(ordini);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel recupero ordini cliente', error: error.message });
    }
};

/**
 * Recupera tutti gli ordini ricevuti da un artigiano.
 * @param {Object} req - Richiesta con token
 * @param {Object} res - Risposta JSON
 */
const getOrdersByArtisan = async (req, res) => {
    try {
        const username_artigiano = req.username;
        const ordini = await Order.getByArtisan(username_artigiano);
        res.status(200).json(ordini);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel recupero ordini artigiano', error: error.message });
    }
};

export { createOrder, getOrdersByCustomer, getOrdersByArtisan };
