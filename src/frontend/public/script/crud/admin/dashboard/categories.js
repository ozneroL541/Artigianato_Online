/**
 * This function adds a category to the db
 * @param {string} token The admin token
 * @param {string} name The category name
 * @author Leonardo Basso
 */
export const addCategory = async (token, name) => {
    try {
        const response = await fetch('http://localhost:8080/api/category/upload', {
            method: 'POST', headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
            }, body: JSON.stringify({
                categoria: name
            })
        });

        if (response.ok) {
            alert("Categoria aggiunta con successo!");
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
 * This function removes a category from the db
 * @param {string} token The admin token
 * @param {string} name The category name
 * @author Leonardo Basso
 */
export const deleteCategory = async (token, name) => {
    try {
        const response = await fetch('http://localhost:8080/api/category/delete', {
            method: 'DELETE', headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` // Ensure the key matches
            }, body: JSON.stringify({
                categoria: name
            })
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
 * This function updates a category in the db
 * @param {string} token The admin's token
 * @param {string} name The category you want to modify
 * @param {string} newName The new category name
 * @author Leonardo Basso
 */
export const updateCategory = async (token, name, newName) => {
    try {
        if (!newName) {
            alert('Compila tutti i campi correttamente.');
            return
        }

        const response = await fetch('http://localhost:8080/api/category/update', {
            method: 'PUT', headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
            }, body: JSON.stringify({
                categoria: name,
                new_categoria: newName
            })
        });

        if (response.ok) {
            alert('Categoria modificato con successo!');
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