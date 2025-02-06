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

async function displayTeamChoice() {
    try {
        const teams = await getTeams();
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        teams.forEach(team => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = team.name;
            row.appendChild(nameCell);

            const typeCell = document.createElement('td');
            typeCell.textContent = team.type;
            row.appendChild(typeCell);

            const actionCell = document.createElement('td');
            const joinButton = document.createElement('button');
            joinButton.textContent = 'Join';
            joinButton.addEventListener('click', async () => {
                try {
                    await joinTeam(team._id);
                    window.location.href = '/';
                } catch (error) {
                    console.error('Error joining team:', error);
                }
            });
            actionCell.appendChild(joinButton);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
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
    if (!isUserMemberOfTeam && (window.location.pathname !== '/teamSelection')) {
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

    main();
})
