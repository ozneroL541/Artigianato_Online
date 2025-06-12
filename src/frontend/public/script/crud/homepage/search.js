/**
 * This function returns a list of products given specific params which are `name`, `category`, `minimum price`,
 * `maximum price` and `stock`
 * @param {URLSearchParams} params The params used to search the data
 * @returns {Array} A list of products
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
        }

    } catch (err) {
        alert(`Error: ${err.message}`)
    }
}