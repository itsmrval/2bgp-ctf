const API_URL = 'http://localhost:3001';

// Login user and return token
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
            const { role, username, id } = user;

            return { token, role, username, id };
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        throw new Error('Error during login');
    }
}

// Get user team by id
async function getUserTeam(id) {
    try {
        const response = await fetch(`${API_URL}/teams?user=${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error getting user team');
    }
}

// Create team 
async function createTeam(name, type) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/teams`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, type })
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Team creation failed');
        }
    } catch (error) {
        throw new Error('Error creating team');
    }
}

// Join team
async function joinTeam(team_id) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/teams/${team_id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Team join failed');
        }
    } catch (error) {
        throw new Error('Error joining team');
    }
}

// Get team
async function getTeams() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/teams`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    }
    catch (error) {
        throw new Error('Error getting team');
    }
}

export { login, getUserTeam, createTeam, joinTeam, getTeams };
