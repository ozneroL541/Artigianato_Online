import {backendUrl} from "../../utils.js";
/**
 * This function deletes a profile from the db
 *
 * The cliente can be an `admin`, an `artisan` or a `client`
 * @example
 * // Delete an admin profile
 * document.getElementById('deleteProfileButton').addEventListener('click', () => {
 *    const token = localStorage.getItem('userToken');
 *    deleteProfile(token, "admin")
 * })
 *
 * @param {string} token the cliente's token
 * @param {"admin"|"client"|"artisan"} type the cliente's type
 * @author Leonardo Basso
 */
export const deleteProfile = async (token, type) => {
    try{
        const response = await fetch(`${backendUrl}/api/profile/delete/${type}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.clear();
            window.location.href = '/';
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
}