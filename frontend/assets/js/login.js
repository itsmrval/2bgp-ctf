import { login, register } from './api.js';

$(document).ready(function () {

    if (localStorage.getItem('token')) {
        window.location.href = '/';
    }

    $('#loginForm').submit(async function (event) {
        event.preventDefault();

        const usernameField = $('#username').val();
        const passwordField = $('#password').val();

        try {
            const {token, username, role, id} = await login(usernameField, passwordField);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('username', username);
            localStorage.setItem('expiration', Date.now() + 3600000);
            localStorage.setItem('id', id);
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging in:', error);
            $('#alertBox').show();
        }
    });

    $('#registerForm').submit(async function (event) {
        event.preventDefault();

        const usernameField = $('#username').val();
        const passwordField = $('#password').val();

        try {
            const {token, username, role, id} = await register(usernameField, passwordField);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('username', username);
            localStorage.setItem('expiration', Date.now() + 3600000);
            localStorage.setItem('id', id);
            window.location.href = '/';
        } catch (error) {
            console.error('Error registering in:', error);
            $('#alertBox').show();
        }
    });
});