import { getUserTeam, joinTeam, getTeams } from './api.js'; 

// Logout function
async function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('expiration');
    localStorage.removeItem('id');

    window.location.href = '/login';
    console.log('Logout successful');
}

// Check if user is logged in
async function isLoggedIn() {
    try {
        const token = localStorage.getItem('token');
        const expiration = localStorage.getItem('expiration');

        if (!token || !expiration) {
            console.log('Token or expiration date not found');
            return false;
        }
        const expirationDate = new Date(Number(expiration));
        console.log('Expiration date:', expirationDate);
        if (isNaN(expirationDate.getTime())) {
            console.log('Invalid expiration date');
            return false;
        }

        if (Date.now() > expirationDate.getTime()) {
            console.log('Token expired');
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error checking login status:', error);
        return false;
    }
}

// Check if user is member of a team
async function isMemberOfTeam() {
    try {
        const id = localStorage.getItem('id');
        const data = await getUserTeam(id);
        return data && data.members.length > 0;
    } catch (error) {
        console.error('Error checking team membership:', error);
        return false;
    }
}

async function selectTeam(team) {
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('team-container').style.display = 'block';
    document.getElementById('team-title').innerText = `Selected Team : ${team}`;
    await displayTeamChoice(team);
  }

async function displayTeamChoice(selectedTeam) {
    try {
        const teams = await getTeams();
        const teamList = document.getElementById('team-list');
        teamList.innerHTML = '';

        teams.forEach(team => {
            if (selectedTeam && selectedTeam !== team.type) {
                return;
            }
            const li = document.createElement('li');
            console.log(team);
            
            // Team name
            const nameSpan = document.createElement('span');
            nameSpan.textContent = team.name;
            li.appendChild(nameSpan);
            
            // Members count
            const membersSpan = document.createElement('span');
            membersSpan.className = 'members';
            membersSpan.textContent = `${team.members.length}/${team.maxMembers || 4}`; // Assuming max 4 members
            li.appendChild(membersSpan);
            
            // Join button
            const joinButton = document.createElement('button');
            joinButton.className = 'btn';
            
            // Check if team is full
            const isFull = team.currentMembers >= (team.maxMembers || 4);
            if (isFull) {
                joinButton.textContent = 'Full';
                joinButton.disabled = true;
            } else {
                joinButton.textContent = 'Join';
                joinButton.addEventListener('click', async () => {
                    try {
                        await joinTeam(team._id);
                        window.location.href = '/';
                    } catch (error) {
                        console.error('Error joining team:', error);
                    }
                });
            }
            li.appendChild(joinButton);
            
            teamList.appendChild(li);
        });

        // Setup search functionality
        const searchInput = document.getElementById('search');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const listItems = teamList.getElementsByTagName('li');
            
            Array.from(listItems).forEach(item => {
                const teamName = item.firstElementChild.textContent.toLowerCase();
                item.style.display = teamName.includes(searchTerm) ? '' : 'none';
            });
        });

    } catch (error) {
        console.error('Error fetching teams:', error);
    }
}

async function main() {

    // Check if user is logged in
    if (!await isLoggedIn()) {
        logout();
    }

    const isUserMemberOfTeam = await isMemberOfTeam();

    // Display username
    $('#profileUsername').text(localStorage.getItem('username'));

    // Check if user is member of a team
    if (!isUserMemberOfTeam && (window.location.pathname !== '/teamSelection' && window.location.pathname !== '/teamCreation')) {
        window.location.href = '/teamSelection';
    }

    // Display team choice
    if (window.location.pathname === '/teamSelection') {
        if (isUserMemberOfTeam) {
            window.location.href = '/';
        }
        await displayTeamChoice();
    }
}

$(document).ready(function () {

    // Handle logout button
    $('#logout').click(async function () {
        await logout();
    });

    $('#jediSelector').click(async function () {
        await selectTeam('jedi');
    });

    $('#sithSelector').click(async function () {
        await selectTeam('sith');
    });
    $('#createTeamButton').click(async function () {
        window.location.href = '/teamCreation';
    });
    $('#backToTeamList').click(async function () {
        window.location.href = '/teamSelection';
    });

    main();
})
