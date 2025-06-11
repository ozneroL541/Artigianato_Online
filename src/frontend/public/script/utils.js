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
/**
 * This function redirects the user to the `/negated` page if he does not have the right permits
 * @param {string} token The user's token, used to get the `userType`
 * @param {string} type The type that has the permits access the page
 * @author Leonardo Basso
 */
export const canSeePage = (token, type) => {
    const userType = token ? getUserType(token) : "unregistered";
    if ( userType !== type ) {
        window.location.href = "/negated";
    }
}