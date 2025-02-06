import { login } from './api.js';

$(document).ready(function () {

    if (localStorage.getItem('token')) {
        window.location.href = '/';
    }

    $('#loginForm').submit(async function (event) {
        event.preventDefault();

        const usernameField = $('#username').val();
        const passwordField = $('#password').val();

        try {
            const {token, username, role} = await login(usernameField, passwordField);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('username', username);
            localStorage.setItem('expiration', Date.now() + 3600000);
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging in:', error);
            $('#alertBox').show();
        }
    });
});