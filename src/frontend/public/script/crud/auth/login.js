import {setUserInfo} from '../../jwt.js';
import {backendUrl} from "../../utils.js";
/**
 * This function implements the API for logging in a user.
 *
 * The user can be a `client`, an `artisan` or an `admin`
 * @example
 * // Logging in an admin
 * document.getElementById('loginBtn').addEventListener('click', () => {
 *      const username = document.getElementById('username').value;
 *      const password = document.getElementById('password').value;
 *      login(username, password, "admin");
 * }
 *
 * @param {string} username the username of the user
 * @param {string} password The user password
 * @param {"admin"| "artisan" | "client"} type If the user is an artisan or a client
 * @author Leonardo Basso
 */
export const login = async (username, password, type) => {
    try {
        const response = await fetch(`${backendUrl}/api/auth/login/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        const data = await response.json();
        if (response.ok) {

            setUserInfo(data.token);
            window.location.href = '/';
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
};