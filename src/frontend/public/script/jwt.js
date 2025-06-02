/**
 * This function saves the jwt token of a user in the localstorage
 * @param {string} jwt  The user Token
 * @author Leonardo Basso
 * */
export function setUserInfo(jwt) {
    localStorage.setItem('userToken', jwt)
}

/**
 * Decodes a JSON Web Token (JWT) and returns the payload.
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
 * @param {string} token The user token
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
 * This function is used to get the type of user from a given token
 * @param {string} token The user token
 * @return {string} The user type, which can be `artigiano`, `cliente`, `admin`
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