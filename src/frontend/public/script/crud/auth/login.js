import {setUserInfo} from '../../jwt.js';

/**
 * This function implements the API for logging in a cliente.
 *
 * The cliente can be a `client`, an `artisan` or an `admin`
 * @example
 * // Logging in an admin
 * document.getElementById('loginBtn').addEventListener('click', () => {
 *      const username = document.getElementById('username').value;
 *      const password = document.getElementById('password').value;
 *      login(username, password, "admin");
 * }
 *
 * @param {string} username the username of the cliente
 * @param {string} password The cliente password
 * @param {"admin"| "artisan" | "client"} type If the cliente is an artisan or a client
 * @author Leonardo Basso
 */
export const login = async (username, password, type) => {
    try {
        const response = await fetch(`/api/auth/login/${type}`, {
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