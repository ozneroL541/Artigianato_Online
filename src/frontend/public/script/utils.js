import {getUserType} from "./jwt.js";

/**
 * This function toggles the visibility of the modal element.
 * @author Leonardo Basso
 * */
export function toggleDialog(id) {
    const dialog = document.getElementById(id);
    if (dialog.open) {
        dialog.close();
    } else {
        dialog.showModal();
    }
}

/**
 * This function returns all the categories
 * @returns {Object} An Object containing an array with the categories
 * @author Leonardo Basso
 */
export const getCategories = async() => {
    const response = await fetch('http://localhost:8080/api/category/all')
    return await response.json()
}

export const canSeePage = (token, type) => {
    const userType = token ? getUserType(token) : "unregistered";
    console.log(userType)

    // Se l'utente non è un amministratore, reindirizzalo
    if ( userType !== type ) {
        window.location.href = "/negated";
    }
}