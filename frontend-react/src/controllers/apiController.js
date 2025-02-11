const API_URL = 'http://localhost:3001';

class ApiController {
    async login(username, password) {
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
    async register(username, password) {
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
    async getUserTeam(id) {
        try {
            const response = await fetch(`${API_URL}/teams?user=${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error getting user team');
        }
    }

    // Create team 
    async createTeam(name, type) {
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
    async deleteTeam(id) {
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
    async getTeams() {
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
    async getUsers() {
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
    async deleteUser(id) {
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
    async getLevels() {
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
    async createLevel(name, hid, points, flag, url) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/levels`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, hid, points, flag, url })
            });

            if (!response.ok) {
                throw new Error('Level creation failed');
            }
        } catch (error) {
            throw new Error('Error creating level');
        }
    }

    // Delete level (admin)
    async deleteLevel(id) {
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

    async getScoreboard() {
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
    async awardUserPoints(userId, levelId) {
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

    async addUserToTeam(userId, teamId) {
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

    async removeUserFromTeam(userId, teamId) {
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

    isAuthenticated() {
        const token = localStorage.getItem('token');
        const expiration = localStorage.getItem('expiration');
        return token && expiration && Date.now() < parseInt(expiration);
    }

}

export default new ApiController();
