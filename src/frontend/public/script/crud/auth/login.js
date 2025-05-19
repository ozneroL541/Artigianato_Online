import { setUserInfo } from '../../state.js';

/**
 * This function implements the API for the artisan login
 * @param {string} username the username of the user
 * @param {string} password The user password
 * @param {string} type If the user is an artisan or a client
 * @author Leonardo Basso
 */
export const login = async (username, password, type) => {
    try {
        const response = await fetch(`http://localhost:8080/api/auth/login/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            setUserInfo(data.token, type);
            window.location.href = '/';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
};