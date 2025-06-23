/**
 * This function saves the jwt token of a cliente in the localStorage
 * @param {string} jwt  The cliente Token
 * @author Leonardo Basso
 * */
export function setUserInfo(jwt) {
    localStorage.setItem('userToken', jwt)
}

/**
 * Decodes a JWT Token and returns the payload.
 * @example
 * //Get the username associated with the token
 * const token = window.localStorage.getItem("userToken");
 * const payload = decodeJWT(token)
 * const username = payload.username
 *
 * @param {string} token - The JWT token to decode.
 * @returns {Object|null} The decoded payload or null if the token is invalid.
 * @author Leonardo Basso
 */
export function decodeJWT(token) {
    try {
        const parts = token.split('.');

        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(payload);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
}

/**
 * This function is used to get the username from a given token
 * @param {string} token The cliente token
 * @return {string} The username
 * @author Leonardo Basso
 * */
export function getUsername(token) {
    if(!token) {
        return "No User Found"
    }
    const payload = decodeJWT(token)
    return payload.username
}

/**
 * This function is used to get the type of cliente from a given token
 * @example
 * // Permission system where only admin can access a specific page
 * const token = window.localStorage.getItem("userToken");
 * const userType = getUserType(token);
 * if ( userType !== admin ) {
 *      window.location.href = "/negated";
 *  }
 *
 * @param {string} token The cliente token
 * @return {"artigiano" | "cliente" | "amministratore"} The cliente type, which can be `artigiano`, `cliente`, `amministratore`
 * @default returns "unregistered"
 * @author Leonardo Basso
 * */
export function getUserType(token) {
    if (!token) {
        return "unregistered"
    }
    const payload = decodeJWT(token)
    return payload.type
}
