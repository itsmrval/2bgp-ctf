import { getUsers, getUserTeam, deleteUser, register, getLevels, createLevel, deleteLevel, getScoreboard, awardUserPoints} from './api.js';

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
                        <button class="award-btn" data-id="${user._id}">Award</button>
                    </td>
                </tr>
            `;
        }

        // Set up delete button listeners
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

        // Set up award button listeners
        document.querySelectorAll('.award-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const userId = event.target.getAttribute('data-id');
                showAwardModal(userId);
            });
        });

    } catch (error) {
        console.error('Error loading users:', error);
    }
}

function showAwardModal(userId) {
    document.getElementById('assignLevelForm').setAttribute('data-user-id', userId);
    showModal('assignLevelModal');
}

async function loadLevels() {
    try {
        const response = await getLevels();

        // Populate level select dropdown
        const levelSelect = $('#levelSelect')[0];
        levelSelect.innerHTML = response.map(level => `<option value="${level._id}">${level.name} (${level.points} pts)</option>`).join('');
        
        // Populate levels table
        const tbody = document.querySelector('#levelsTable tbody');
        tbody.innerHTML = '';

        for (const level of response) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${level.name}</td>
                <td>${level.hid}</td>
                <td>${level.points}</td>
                <td>
                    <button class="delete-btn" data-id="${level._id}">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        }

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                const levelId = event.target.getAttribute('data-id');
                try {
                    await deleteLevel(levelId);
                    loadLevels();
                } catch (error) {
                    console.error('Error deleting level:', error);
                }            
            });
        });

    } catch (error) {
        console.error('Error loading levels:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('userForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const userData = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            role: document.getElementById('role').value
        };

        try {
            await register(userData.username, userData.password);
            hideModal('userModal');
            loadUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    });

    // Level form
    document.getElementById('levelForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const levelData = {
            name: document.getElementById('levelName').value,
            hid: document.getElementById('hid').value,
            flag: document.getElementById('flag').value,
            points: parseInt(document.getElementById('points').value)
        };

        try {
            await createLevel(levelData.name, levelData.hid, levelData.points, levelData.flag);
            hideModal('levelModal');
            loadLevels();
        } catch (error) {
            console.error('Error creating level:', error);
        }
    });

    // Award points form
    document.getElementById('assignLevelForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const userId = e.target.getAttribute('data-user-id');
        const levelSelect = document.getElementById('levelSelect');
        const levelId = levelSelect.value;

        try {
            await awardUserPoints(userId, levelId);
            hideModal('assignLevelModal');
            // Refresh the scoreboard to show updated points
            loadScoreboard();
            
            // Show success message (optional)
            alert('Points awarded successfully!');
        } catch (error) {
            console.error('Error awarding points:', error);
            alert('Error awarding points. Please try again.');
        }
    });
});


// Initialize dashboard
async function loadScoreboard() {
    try {
        const scores = await getScoreboard();
        const tbody = document.querySelector('#scoreboardTable tbody');
        tbody.innerHTML = '';

        scores.forEach((team, index) => {
            const isExpanded = index < 3 ? 'open' : '';
            tbody.innerHTML += `
                <tr>
                    <td>${team.rank}</td>
                    <td>${team.name}</td>
                    <td>${team.total_points}</td>
                    <td>
                        <details ${isExpanded}>
                            <summary>View Members</summary>
                            <ul>
                                ${team.members.map(member => `<li>${member.username}: ${member.points} pts</li>`).join('')}
                            </ul>
                        </details>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Error loading scoreboard:', error);
    }
}


// Initialize dashboard
if (checkAuth()) {
    loadUsers();
    loadLevels();
    loadScoreboard();
}