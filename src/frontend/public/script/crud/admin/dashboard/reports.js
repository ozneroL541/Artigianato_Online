import {backendUrl} from "../../../utils.js";

/**
 * This function returns all the reports
 * @param token The admin's token
 * @author Leonardo Basso
 */
export const getReports = async (token) => {
    try {
        const response = await fetch(`${backendUrl}/api/admin/get/reports`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Includi il token nell'intestazione
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            const error = await response.json();
            console.error('Error:', error.message);
            alert(`Error: ${error.message}`);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('An error occurred while fetching reports');
    }
};
/**
 * This function check as solved a report
 * @param token the admin's token
 * @param idSignal The id of the report to check as solved
 * @author Leonardo Basso
 */
export const solveReport = async (token, idSignal) => {
    try {
        const response = await fetch(`${backendUrl}/api/admin/solve/report`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({idSignal})
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
            window.location.reload(); // Ricarica la pagina per aggiornare la lista delle segnalazioni
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while solving the report');
    }
}
