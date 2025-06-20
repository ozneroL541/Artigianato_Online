/**
 * This function creates and/or updates shopping cart saving its data in session storage.
 *
 * To access the shopping cart use
 * ```js
 * sessionStorage.getItem('productCart')
 * ```
 * @param {string} productId The id of the product you want to add
 * @param {string} name The name of the product you want to add
 * @author Leonardo Basso
 */
export const addToCart = (productId, name) => {
    if (sessionStorage.getItem('productCart') === null) {
        sessionStorage.setItem('productCart', JSON.stringify([]));
    }
    const currentCart = JSON.parse(sessionStorage.getItem('productCart'));
    const existingProduct = currentCart.find(p => p.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        currentCart.push({
            id: productId,
            name: name,
            quantity: 1
        });
    }
    sessionStorage.setItem('productCart', JSON.stringify(currentCart));
}
/**
 * This function removes an element from the cart in the session storage.
 * If the product has already 0 quantity it will not act
 * @param productId
 * @author Leonardo Basso
 */
export const removeFromCart = (productId) => {
    const currentCart = JSON.parse(sessionStorage.getItem('productCart'));
    const existingProduct = currentCart.find(p => p.id === productId);
    if (!existingProduct) {
        return;
    }
    if (existingProduct.quantity > 0) {
        existingProduct.quantity -= 1
    }
    sessionStorage.setItem('productCart', JSON.stringify(currentCart));
}