import { getUserTeam, joinTeam } from './api.js'; 

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

async function main() {

    // Check if user is logged in
    if (!await isLoggedIn()) {
        window.location.href = '/login';
    }

    // Display username
    $('#profileUsername').text(localStorage.getItem('username'));

    // Check if user is member of a team
    if (!await isMemberOfTeam() && (window.location.pathname !== '/teamSelection')) {
            window.location.href = '/teamSelection';
    }
}

$(document).ready(function () {

    // Handle logout button
    $('#logout').click(async function () {
        await logout();
    });

    main();
})
