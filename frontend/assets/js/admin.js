import { getUsers, getUserTeam, deleteUser, register, getLevels, createLevel, deleteLevel, getScoreboard, awardUserPoints, getTeams, createTeam, deleteTeam, removeUserFromTeam, addUserToTeam} from './api.js';

// Authentication functions
function checkAuth() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const expiration = localStorage.getItem('expiration');
    const role = localStorage.getItem('role');

    if (!token || !username || !role || (expiration && Date.now() > parseInt(expiration))) {
        window.location.href = '/login';
        return false;
    }

    if (role !== 'admin') {
        alert('You do not have permission to view this page');
        window.location.href = '/';
        return false;
    }

    document.getElementById('userInfo').textContent = `Welcome, ${username} (${role})`;
    return true;
}

// Modal functions
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Load data functions
async function loadTeams() {
    try {
        const response = await getTeams();
        const tbody = document.querySelector('#teamsTable tbody');
        tbody.innerHTML = '';

        for (const team of response) {
            
            tbody.innerHTML += `
                <tr>
                    <td>${team.name}</td>
                    <td>${team.type}</td>
                    <td>${team.members.length}</td>
                    <td>
                        <button class="delete-team-btn" data-id="${team._id}">Delete</button>
                        <button class="assign-btn" data-id="${team._id}">Manage</button>

                    </td>
                </tr>
            `;
        }

        // Set up delete button listeners
        document.querySelectorAll('.delete-team-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                const teamId = event.target.getAttribute('data-id');
                try {
                    await deleteTeam(teamId);
                    loadTeams();
                } catch (error) {
                    console.error('Error deleting team:', error);
                }
            });
        });

        // Set up award button listeners
        document.querySelectorAll('.assign-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const userId = event.target.getAttribute('data-id');
                showManageTeamModal(userId);
            });
        });

    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// Load users functions
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

function showManageTeamModal(teamId) {
    document.getElementById('manageTeamModalForm').setAttribute('data-team-id', teamId);
    updateManageTeamModal(teamId);
    showModal('manageTeamModal');
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
                <td>${level.url}</td>
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

    document.getElementById('teamForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const teamData = {
            name: document.getElementById('name').value,
            type: document.getElementById('type').value,
        };
        console.log(teamData);

        try {
            await createTeam(teamData.name, teamData.type);
            hideModal('teamModal');
            loadTeams();
        } catch (error) {
            console.error('Error creating team:', error);
        }
    });

    // Level form
    document.getElementById('levelForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log(document.getElementById('description').value);
        const levelData = {
            name: document.getElementById('levelName').value,
            hid: document.getElementById('hid').value,
            flag: document.getElementById('flag').value,
            points: parseInt(document.getElementById('points').value),
            url: document.getElementById('url').value,
            description: document.getElementById('description').value
        };
        console.log(levelData);

        try {
            await createLevel(levelData.name, levelData.hid, levelData.points, levelData.flag, levelData.url, levelData.description);
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

    document.getElementById('manageTeamModalForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const teamId = e.target.getAttribute('data-team-id');
        const userSelect = document.getElementById('availableUsers');
        const selectedUserId = userSelect.value;
    
        if (selectedUserId) {
            try {
                await addUserToTeam(selectedUserId, teamId);
                await updateManageTeamModal(teamId);
                await loadTeams();
            } catch (error) {
                console.error('Error adding user to team:', error);
                alert('Failed to add user to team');
            }
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

async function updateManageTeamModal(teamId) {
    try {
        // Get current team data
        const teams = await getTeams();
        const currentTeam = teams.find(team => team._id === teamId);
        
        // Get all users
        const allUsers = await getUsers();
        
        // Filter out users already in the team
        const teamMemberIds = new Set(currentTeam.members.map(member => member._id));
        const availableUsers = allUsers.filter(user => !teamMemberIds.has(user._id));
        
        // Update current members list
        const teamMembersList = document.getElementById('currentTeamMembers');
        teamMembersList.innerHTML = '';
        currentTeam.members.forEach(member => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${member.username}
                <button class="remove-member-btn" data-user-id="${member._id}" data-team-id="${teamId}">
                    Remove
                </button>
            `;
            teamMembersList.appendChild(li);
        });
        
        // Update available users dropdown
        const userSelect = document.getElementById('availableUsers');
        userSelect.innerHTML = availableUsers
            .map(user => `<option value="${user._id}">${user.username}</option>`)
            .join('');
            
        // Set up remove button listeners
        document.querySelectorAll('.remove-member-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                const userId = event.target.getAttribute('data-user-id');
                const teamId = event.target.getAttribute('data-team-id');
                try {
                    await removeUserFromTeam(userId, teamId);
                    await updateManageTeamModal(teamId);
                    await loadTeams();
                } catch (error) {
                    console.error('Error removing user from team:', error);
                    alert('Failed to remove user from team');
                }
            });
        });
    } catch (error) {
        console.error('Error updating team management modal:', error);
        alert('Failed to update team management modal');
    }
}

// Initialize dashboard
if (checkAuth()) {
    loadUsers();
    loadLevels();
    loadTeams();
    loadScoreboard();
}