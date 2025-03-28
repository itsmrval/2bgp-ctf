const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001' // Dev. URL
    : 'https://api.2bgp-ctf.rvcs.fr'; // Production URL

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
            const data = await response.json();
            console.log("0=:" + JSON.stringify(data.error));
            if (JSON.stringify(data.error).includes("already"))
                throw new Error("Username already exists");
            throw new Error("Error during registration");
        }
    } catch (error) {
        throw error;
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

// Delete team
async function deleteTeam(id) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/teams/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Team deletion failed');
        }
    } catch (error) {
        throw new Error('Error deleting team');
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
async function createLevel(name, hid, points, flag, url, description) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/levels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, hid, points, flag, url, description })
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

// Award user points
async function awardUserPoints(userId, levelId, flag = '') {
    const response = await fetch(`${API_URL}/points/${userId}/${levelId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }, 
        body: JSON.stringify({ flag })
    });

    if (!response.ok) {
        throw new Error('Failed to award points');
    }

    return await response.json();
}

async function addUserToTeam(userId, teamId) {
    const response = await fetch(`${API_URL}/teams/${teamId}/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });
    
    if (!response.ok) {
        throw new Error('Failed to add user to team');
    }
    
    return response.json();
}

async function removeUserFromTeam(userId, teamId) {
    const response = await fetch(`${API_URL}/teams/${teamId}/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    
    if (!response.ok) {
        throw new Error('Failed to remove user from team');
    }
    
    return response.json();
}

async function getLevel(id) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/levels/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    }
    catch (error) {
        throw new Error('Error getting level');
    }
}

async function getUser(id) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    }
    catch (error) {
        throw new Error('Error getting user');
    }
}

export { login, register, getUserTeam, getUsers, deleteUser, getUser,
    getTeams, createTeam, deleteTeam, addUserToTeam, removeUserFromTeam,
    getLevels, createLevel, deleteLevel, getScoreboard, awardUserPoints, getLevel };
