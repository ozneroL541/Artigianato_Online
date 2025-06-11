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
            method: 'POST', headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
            }, body: JSON.stringify({
                nome_prodotto: name, categoria: category, prezzo: price, disponibilita: stock
            })
        });

        if (response.ok) {
            alert("Prodotto aggiunto con successo!");
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
 * This function deletes a product from the DB
 * @param {string} token The artisan's token
 * @param {string} id The id of the product to remove
 * @author Leonardo Basso
 */
export const deleteProduct = async (token, id) => {
    try {
        const response = await fetch('http://localhost:8080/api/product/delete', {
            method: 'DELETE', headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` // Ensure the key matches
            }, body: JSON.stringify({id_prodotto: id})
        });

        const result = await response.json();

        if (response.ok) {
            alert('Product deleted successfully');
            window.location.reload();
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('An error occurred while deleting the product');
    }
}
/**
 * This function updates the data of a product in the db
 *
 * !! The function currently does not work
 * @param {string} token The artisan's token
 * @param {string} id The product's id
 * @param {string} name The new name of the product
 * @param {string} category The new category of the product
 * @param {number} price The new price of the product
 * @param {int} stock The new stock number of the product
 * @author Leonardo Basso
 */
export const updateProduct = async (token, id, name, category, price, stock) => {
    try {
        if (!name || !category || isNaN(price) || isNaN(stock)) {
            alert('Compila tutti i campi correttamente.');
            return
        }

        const response = await fetch('http://localhost:8080/api/product/update', {
            method: 'PUT', headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
            }, body: JSON.stringify({
                id_prodotto: id, nome_prodotto: name, categoria: category, prezzo: price, disponibilita: stock
            })
        });

        if (response.ok) {
            alert('Prodotto modificato con successo!');
            window.location.reload();
        } else {
            const error = await response.json();
            alert(`Errore: ${error.message || 'Errore nella modifica'}`);
        }
    } catch (err) {
        alert('Errore nella richiesta. Controlla la connessione.');
        console.error(err);
    }
}
/**
 * This function returns all the articles from a specific artisan
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
        return [];
    }
};