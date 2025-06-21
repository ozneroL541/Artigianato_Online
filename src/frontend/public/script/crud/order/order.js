import { backendUrl } from "../../utils.js";

/**
 * This function, given a cart (which is a list of orders) publishes all the orders
 * @param {string} token The cliente's token
 * @param {Object} cart The cart full of orders
 * @author Leonardo Basso
 */
export const addOrder = async (token, cart) => {
    try {
        for (const p of cart) {
            console.log(p)
            if (p.quantity > 0) {
                const response = await fetch(`${backendUrl}/api/order/buy`, {
                    method: "POST", headers: {
                        'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
                    }, body: JSON.stringify({
                        id_prodotto: p.id,
                        quantita: p.quantity,
                    })
                })
                if (response.ok) {
                    console.log("Ordine aggiunto con successo!")
                } else {
                    const text = await response.text();
                    console.error("Risp:", response.status, text);
                    alert(`Errore: ${response.status} - ${text}`);
                }
            }
        }
    } catch (e) {console.error(e)}
}

/**
 * This function returns all the orders given a cliente token
 * @param {string} token The cliente's token
 * @returns {Promise<Object>} The list of orders done by a specific cliente
 * @author Leonardo Basso
 */
export const getOrdersByClient = async (token) => {
    try {
        const res = await fetch(`${backendUrl}/api/order/get/client`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();

        if (!res.ok) {
            console.error('Error:', data.message);
            alert(`Errore: ${data.message}`);
            return;
        }
        return data;

    } catch (err) {
        console.error('Errore durante la fetch:', err);
        alert('Errore di rete o server.');
    }
}
/**
 * This function returns all the orders given a cliente token
 * @param {string} token The cliente's token
 * @returns {Promise<Object>} The list of orders done by a specific cliente
 * @author Leonardo Basso
 */
export const getOrdersByArtisan = async (token) => {
    try {
        const res = await fetch(`${backendUrl}/api/order/get/artisan`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();

        if (!res.ok) {
            console.error('Error:', data.message);
            alert(`Errore: ${data.message}`);
            return;
        }
        return data;

    } catch (err) {
        console.error('Errore durante la fetch:', err);
        alert('Errore di rete o server.');
    }
}
