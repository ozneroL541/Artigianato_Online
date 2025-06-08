/**
 * This function, given an artisan, adds a new product in the db
 * @param {string} token Artisan's token
 * @param {string} name Product's name
 * @param {string} category Product's category
 * @param {number} price Product's price
 * @param {int} stock Number of products in stock
 * @author Leonardo Basso
 */
export const addProduct = async (token, name, category, price, stock) => {
    try {
        const response = await fetch('http://localhost:8080/api/product/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nome_prodotto: name,
                categoria: category,
                prezzo: price,
                disponibilita: stock
            })
        });

        if (response.ok) {
            // const result = await response.json();
            alert("Prodotto aggiunto con successo!");
            toggleDialog('addProduct');
            window.location.reload();
        } else {
            const text = await response.text();
            console.error("Risp:", response.status, text);
            alert(`Errore: ${response.status} - ${text}`);
        }
    } catch (err) {
        alert("Errore nella richiesta. Controlla la connessione.");
        console.error(err);
    }
}
/**
 * This function returns all the articles from an artisan
 * @param token the Artisan's token
 * @returns {Promise<Product[]|*[]>} the articles published
 * @author Leonardo Basso
 */
export const getArtisanProducts = async (token) => {
    try {
        const response = await fetch('http://localhost:8080/api/product/artisan', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error("Errore nel caricamento dei prodotti");

        const data = await response.json();
        return data.products;
    } catch (err) {
        console.error(err);
        alert("Errore nel caricamento dei prodotti.");
        return [];
    }
};
