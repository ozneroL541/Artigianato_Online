/**
 * This function returns a list of products given specific params which are `name`, `category`, `minimum price`,
 * `maximum price` and `stock`
 * @param {URLSearchParams} params The params used to search the data
 * @returns {Array | Null} A list of products
 * @author Leonardo Basso
 */
export const searchProduct = async (params) => {
    try {
        const res = await fetch(`http://localhost:8080/api/product/search?${params.toString()}`);

        if (res.ok) {
            const products = await res.json();
            console.log(products)
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
 * This function redirects the user to the <i>/search/?param</i> url with the given param
 * @param {HTMLInputElement} name The input with the product name
 * @param {HTMLSelectElement | HTMLInputElement} category The input/select with the product category
 * @param {HTMLInputElement} minPrice The input with the product minimum price
 * @param {HTMLInputElement} maxPrice The input with the product maximum price
 * @param {HTMLInputElement} availability The input with the product stock
 * @author Leonardo Basso
 */
export const prepareSearch = (name, category, minPrice, maxPrice, availability) => {
    const searchParams = new URLSearchParams();
    if (name) searchParams.set('nome_prodotto', name);
    if (category) searchParams.set('categoria', category);
    if (minPrice) searchParams.set('prezzo_min', minPrice);
    if (maxPrice) searchParams.set('prezzo_max', maxPrice);
    if (availability) searchParams.set('disponibilita', availability);

    window.location.href = `/search?${searchParams.toString()}`;
}