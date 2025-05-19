/**
 * This function saves the jwt token, the type of the user and a variable that indicates that the user is logged inside
 * the browser's local storage
 * @param jwt {string} The user Token
 * @param userType {string} If the user is a client or an artisan
 * @author Leonardo Basso
 * */
export function setUserInfo(jwt, userType) {
    localStorage.setItem('userToken', jwt)
    localStorage.setItem('userType', userType)
    localStorage.setItem('isUserLogged', "true")
}