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