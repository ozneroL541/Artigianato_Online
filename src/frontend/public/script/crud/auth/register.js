/**
 * This function implements the API for the artisan registration
 * @param {string} username the username of the artisan
 * @param {string} password The artisan password
 * @param {string} companyName The artisan's company name
 * @param {string} email The artisan email
 * @param {string} iban The artisan IBAN
 * @author Leonardo Basso
 */
export const registerArtisan = async (username, password, companyName, email, iban) => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/register/artisan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password, companyName, email, iban}),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Registrazione completata con successo!");
            window.location.href = '/auth/login';
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Si è verificato un errore durante la registrazione.');
    }
};

/**
 * This function implements the API for the client registration
 * @param {string} username the username of the client
 * @param {string} password The user password
 * @param {string} name The client name
 * @param {string} surname The client surname
 * @param {string} email The client email
 * @author Leonardo Basso
 */
export const registerClient = async (username, password, name, surname, email) => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/register/client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password, name, surname, email}),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Registrazione completata con successo!");
            window.location.href = '/auth/login';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Si è verificato un errore durante la registrazione.');
    }
};
