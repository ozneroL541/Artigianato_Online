import { updateUserInfo } from '../../script/state.js';

document.getElementById('artisanLoginButton').addEventListener('click', async () => {
    const username = document.getElementById('artisanUsername').value;
    const password = document.getElementById('artisanPassword').value;
    const errorDiv = document.getElementById('artisanError');

    try {
        const response = await fetch('http://localhost:8080/api/auth/login/artisan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            updateUserInfo({ isLogged: true, jwt_Token: data.token, userType: 'Artigiano', username });
            window.location.href = '/';
        } else {
            if (data.message.includes("utente o password non trovati")) {
                errorDiv.textContent = "Utente o password non trovati. Per favore, riprova.";
                errorDiv.style.display = 'block';
            } else {
                errorDiv.textContent = data.message;
                errorDiv.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Error:', error);
        errorDiv.textContent = 'An error occurred during login.';
        errorDiv.style.display = 'block';
    }
});

document.getElementById('clientLoginButton').addEventListener('click', async () => {
    const username = document.getElementById('clientUsername').value;
    const password = document.getElementById('clientPassword').value;
    const errorDiv = document.getElementById('clientError');

    try {
        const response = await fetch('http://localhost:8080/api/auth/login/client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            updateUserInfo({ isLogged: true, jwt_Token: data.token, userType: 'Cliente', username });
            window.location.href = '/';
        } else {
            if (data.message.includes("utente o password non trovati")) {
                errorDiv.textContent = "Utente o password non trovati. Per favore, riprova.";
                errorDiv.style.display = 'block';
            } else {
                errorDiv.textContent = data.message;
                errorDiv.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Error:', error);
        errorDiv.textContent = 'An error occurred during login.';
        errorDiv.style.display = 'block';
    }
});
