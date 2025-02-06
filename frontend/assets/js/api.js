const API_URL = 'http://localhost:3001';

async function login(username, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            const { token, user } = data;
            const { role, username } = user;

            return { token, role, username };
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        throw new Error('Error during login');
    }
}

export { login };