import {getUserType} from "./jwt.js";

/**
 * The frontend's url
 * @type {string}
 */
export const frontendUrl = 'http://localhost:8000'

/**
 * The backend's url
 * @type {string}
 */
export const backendUrl = 'http://localhost:8080';
// export const backendUrl = await fetch(`${frontendUrl}/backend/url`)
//         .then(response => response.json())
//         .then(data => data.url)
//         .catch(() => 'http://localhost:8080');

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
export const getCategories = async () => {
    const response = await fetch(`${backendUrl}/api/category/all`)
    return await response.json()
}
/**
 * This function redirects the user to the <i>/negated</i> page if he does not have the right permits
 * @example
 * //Only admin can see the page
 * const token = window.localStorage.getItem("userToken");
 * canSeePage(token, "amministratore")
 *
 * @param {string} token The user's token, used to get the `userType`
 * @param {string} type The type that has the permits access the page
 * @author Leonardo Basso
 */
export const canSeePage = (token, type) => {
    const userType = token ? getUserType(token) : "unregistered";
    if (userType !== type) {
        window.location.href = `${frontendUrl}/negated`;
    }
}
/**
 * This function populates a given ```<select>``` element with options from a given array
 * @example
 * // Populate a select menu with categories
 * const categories = await getCategories();
 * const selectCategoryAdd = document.getElementById('selectCategory');
 * populateSelectMenu(categories.categories, selectCategoryAdd)
 *
 * @param {Array} options The list of content which will be put as ```<option>```
 * @param {HTMLSelectElement} selectElement The ```<select>``` element to populate
 * @author Leonardo Basso
 */
export const populateSelectMenu = (options, selectElement) => {
    options.forEach(c => {
        const option = document.createElement('option');
        option.value = c;
        option.textContent = c;
        selectElement.appendChild(option);
    });
}
/**
 * This function returns a formattet date
 * @example
 * //Convert a timestamp to a date
 * const timestamp = "2022-04-24T00:49:08.000Z"
 * console.log(formatDate(timestamp)) //2022/04/24 02:49
 * @param {string} timestamp the timestamp to format
 * @returns {string} The formatted date
 * @author Leonardo Basso
 */
export const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // I mesi partono da 0
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
}