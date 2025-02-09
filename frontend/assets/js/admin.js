import { getUsers, getUserTeam, deleteUser} from './api.js';

// Authentication functions
function checkAuth() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const expiration = localStorage.getItem('expiration');
    const role = localStorage.getItem('role');

    if (!token || !username || !role || (expiration && Date.now() > parseInt(expiration))) {
        window.location.href = '/login.html';
        return false;
    }

    document.getElementById('userInfo').textContent = `Welcome, ${username} (${role})`;
    return true;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expiration');
    localStorage.removeItem('role');
    window.location.href = '/login.html';
}

// Modal functions
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Load data functions
async function loadUsers() {
    try {
        const response = await getUsers();
        const tbody = document.querySelector('#usersTable tbody');
        tbody.innerHTML = '';

        for (const user of response) {
            const team = await getUserTeam(user._id);
            let teamName = team ? team.name : 'N/A';
            let teamType = team ? `(${team.type})` : '';

            tbody.innerHTML += `
                <tr>
                    <td>${user.username}</td>
                    <td>${user.role}</td>
                    <td>${teamName} ${teamType}</td>
                    <td>
                        <button class="delete-btn" data-id="${user._id}">Delete</button>
                    </td>
                </tr>
            `;
        }

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                const userId = event.target.getAttribute('data-id');
                try {
                    await deleteUser(userId);
                    loadUsers();
                } catch (error) {
                    console.error('Error deleting user:', error);
                }
            });
        });

    } catch (error) {
        console.error('Error loading users:', error);
    }
}



async function loadLevels() {
    try {
        const response = await fetch('/api/levels', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const levels = await response.json();
        const tbody = document.querySelector('#levelsTable tbody');
        tbody.innerHTML = '';
        levels.forEach(level => {
            tbody.innerHTML += `
                <tr>
                    <td>${level.name}</td>
                    <td>${level.hid}</td>
                    <td>${level.points}</td>
                    <td>
                        <button onclick="deleteLevel('${level._id}')">Delete</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Error loading levels:', error);
    }
}

async function loadScoreboard() {
    try {
        const response = await fetch('/api/scoreboard', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const scores = await response.json();
        const tbody = document.querySelector('#scoreboardTable tbody');
        tbody.innerHTML = '';
        scores.forEach(score => {
            tbody.innerHTML += `
                <tr>
                    <td>${score.username}</td>
                    <td>${score.achieved.level_hid || 'N/A'}</td>
                    <td>${score.achieved.points}</td>
                    <td>
                        <button onclick="awardPoints('${score._id}')">Award Points</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Error loading scoreboard:', error);
    }
}

// Form submission handlers
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('userForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const userData = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            role: document.getElementById('role').value
        };

        try {
            await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userData)
            });
            hideModal('userModal');
            loadUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    });

    document.getElementById('levelForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const levelData = {
            name: document.getElementById('levelName').value,
            hid: document.getElementById('hid').value,
            flag: document.getElementById('flag').value,
            points: parseInt(document.getElementById('points').value)
        };

        try {
            await fetch('/api/levels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(levelData)
            });
            hideModal('levelModal');
            loadLevels();
        } catch (error) {
            console.error('Error creating level:', error);
        }
    });
});


async function deleteLevel(levelId) {
    if (confirm('Are you sure you want to delete this level?')) {
        try {
            await fetch(`/api/levels/${levelId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            loadLevels();
        } catch (error) {
            console.error('Error deleting level:', error);
        }
    }
}

async function awardPoints(userId) {
    const levelHid = prompt('Enter level HID:');
    if (levelHid) {
        try {
            await fetch(`/api/users/${userId}/award`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ levelHid })
            });
            loadScoreboard();
        } catch (error) {
            console.error('Error awarding points:', error);
        }
    }
}

// Initialize dashboard
if (checkAuth()) {
    loadUsers();
    loadLevels();
    loadScoreboard();
}