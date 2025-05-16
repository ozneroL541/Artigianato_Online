import { updateUserInfo } from '../state.js';

/**
 * This function implements the API for the artisan login
 * @param {string} userid the userId of the user
 * @param {string} password The user password
 * @author Leonardo Basso
 */
const loginArtisan = async (userid, password) => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/login/artisan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: userid, password }),
        });

        const data = await response.json();
        if (response.ok) {
            updateUserInfo({ isLogged: true, jwt_Token: data.token, userType: 'Artigiano' });
            // Redirect to homepage
            window.location.href = '/';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
};

/**
 * This function implements the API for the client login
 * @param {string} userid the userId of the user
 * @param {string} password The user password
 * @author Leonardo Basso
 */
const loginClient = async (userid, password) => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/login/client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: userid, password }),
        });

        const data = await response.json();
        if (response.ok) {
            updateUserInfo({ isLogged: true, jwt_Token: data.token, userType: 'Cliente' });
            // Redirect to homepage
            window.location.href = '/';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
};

export { loginArtisan, loginClient };
