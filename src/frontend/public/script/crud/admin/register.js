
/**
 * This function implements the API for the client registration
 * @param {string} username the username of the client
 * @param {string} password The cliente password
 * @author Leonardo Basso
 */
export const registerAdmin = async (username, password) => {
    try {
        const response = await fetch(`/api/auth/register/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Registrazione completata con successo!");
            window.location.href = '/auth/admin/login';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Si è verificato un errore durante la registrazione.');
    }
};
