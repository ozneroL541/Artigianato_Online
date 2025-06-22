import {backendUrl} from "../../../utils.js";

export const sendReport = async (token, message, orderId) =>  {
    try {
        const response = await fetch(`${backendUrl}/api/client/report`, {
            method: "POST", headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
            }, body: JSON.stringify({
                orderId: orderId,
                description: message,
            })
        })
        if (response.ok) {
            alert("Report inviato con successo!")
        } else {
            const text = await response.text();
            console.error("Risp:", response.status, text);
            alert(`Errore: ${response.status} - ${text}`);
        }
} catch (e) {console.error(e)}

}