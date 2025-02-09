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

// Register user and return token
async function register(username, password) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
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
            throw new Error('Registration failed');
        }
    } catch (error) {
        throw new Error('Error during registration');
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

// Get users (admin)
async function getUsers() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    }
    catch (error) {
        throw new Error('Error getting users');
    }
}

// Delete user (admin)
async function deleteUser(id) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('User deletion failed');
        }
    } catch (error) {
        throw new Error('Error deleting user');
    }
}

// Get levels
async function getLevels() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/levels`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    }
    catch (error) {
        throw new Error('Error getting levels');
    }
}

// Create level (admin)
async function createLevel(name, hid, points, flag) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/levels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, hid, points, flag })
        });

        if (!response.ok) {
            throw new Error('Level creation failed');
        }
    } catch (error) {
        throw new Error('Error creating level');
    }
}

// Delete level (admin)
async function deleteLevel(id) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/levels/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Level deletion failed');
        }
    } catch (error) {
        throw new Error('Error deleting level');
    }
}

async function getScoreboard() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/points`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    }
    catch (error) {
        throw new Error('Error getting scoreboard');
    }
}

async function awardUserPoints(userId, levelId) {
    const response = await fetch(`${API_URL}/points/${userId}/${levelId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to award points');
    }

    return await response.json();
}


export { login, register, getUserTeam, getUsers, deleteUser,
    getTeams, createTeam, joinTeam, 
    getLevels, createLevel, deleteLevel, getScoreboard, awardUserPoints };
