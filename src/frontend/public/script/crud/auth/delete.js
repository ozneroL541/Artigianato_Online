/**
 * This function deletes a profile from the db
 * @param token the user's token
 * @param type the user's type (`admin`, `artisan`, `client`)
 * @author Leonardo Basso
 */
export const deleteProfile = async (token, type) => {
    try{
        const response = await fetch(`http://localhost:8080/api/profile/delete/${type}`, {
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