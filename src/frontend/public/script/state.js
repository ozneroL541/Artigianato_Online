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

/**
 * This function returns an array with the user infos
 * @return {object} an object with the following parameters: <br>
 * `userToken` for the JWT Token <br>
 * `userType` for the user Type, which should always be artisan or client <br>
 * `isUserLogged` for checking if the user is logged or not
 * @author Leonardo Basso
 * */
export function getUserInfo() {
    return {
        userToken: localStorage.getItem("userToken"),
        userType: localStorage.getItem("UserType"),
        isUserLogged: localStorage.getItem("isUserLogged")
    }
}
