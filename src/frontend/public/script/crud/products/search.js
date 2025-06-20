import {backendUrl, frontendUrl} from "../../utils.js";
/**
 * This function returns a list of products given specific params which are `name`, `category`, `minimum price`,
 * `maximum price` and `stock`
 * @example
 * // Search using the page URL to get the parameters
 * const params = new URLSearchParams(window.location.search);
 * const products = await searchProduct(params);
 *
 * @param {URLSearchParams} params The params used to search the data
 * @returns {Array} A list of products
 * @author Leonardo Basso
 */
export const searchProduct = async (params) => {
    try {
        const res = await fetch(`${backendUrl}/api/product/search?${params.toString()}`);

        if (res.ok) {
            const products = await res.json();
            return products;
        } else {
            const err = await res.json();
            alert(`Error: ${err.message}`)
            console.log(err.message)
            window.location.href = history.back();
        }

    } catch (err) {
        alert(`Error: ${err.message}`)
    }
}
/**
 * This function redirects the cliente to the <i>/search/?param</i> url with the given param
 * @param {string} name The input with the product name
 * @param {string | HTMLInputElement} category The input/select with the product category
 * @param {string} minPrice The input with the product minimum price
 * @param {string} maxPrice The input with the product maximum price
 * @param {string} availability The input with the product stock
 * @author Leonardo Basso
 */
export const prepareSearch = (name, category, minPrice, maxPrice, availability) => {
    const searchParams = new URLSearchParams();
    if (name) searchParams.set('nome_prodotto', name);
    if (category) searchParams.set('categoria', category);
    if (minPrice) searchParams.set('prezzo_min', minPrice);
    if (maxPrice) searchParams.set('prezzo_max', maxPrice);
    if (availability) searchParams.set('disponibilita', availability);

    window.location.href = `${frontendUrl}/products/search?${searchParams.toString()}`;
}