import {getUserType} from "./jwt.js";

/**
 * The frontend's url
 * @type {string}
 */
export const frontendUrl = 'http://localhost:8000'

/**
 * Gets the backend URL from the frontend server.
 * @returns {string} The backend URL
 */
const getBackendUrl = async() => {
    try {
        const response = await fetch(`${frontendUrl}/url/backend`);
        console.log(`Fetching backend URL from: ${frontendUrl}/url/backend`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data =  await response.json();
        return await data.url.toString();
    } catch (error) {
        console.error('Failed to fetch backend URL:', error);
        return 'http://localhost:8080'; // Default fallback URL
    }
}

/**
 * The backend's url
 * @type {string}
 */
export const backendUrl = await getBackendUrl();
console.log(`Backend URL: ${backendUrl}`);

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
    const response = await fetch(`${backendUrl}/api/category/all`);
    return await response.json();
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
    if ( userType !== type ) {
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
