async function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('expiration');

    window.location.href = '/login';
    console.log('Logout successful');
}

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

async function main() {
    if (!await isLoggedIn()) {
        window.location.href = '/login';
    }

    $('#profileUsername').text(localStorage.getItem('username'));
}

$(document).ready(function () {
    $('#logout').click(async function () {
        await logout();
    });

    main();
})
