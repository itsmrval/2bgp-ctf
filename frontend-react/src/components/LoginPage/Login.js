import React, { useState, useEffect } from 'react';
import ApiController from '../../controllers/apiController';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (ApiController.isAuthenticated()) {
            window.location.href = '/';
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token, role, id } = await ApiController.login(username, password);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('username', username);
            localStorage.setItem('id', id);
            localStorage.setItem('expiration', Date.now() + 3600000); // Set expiration for 1 hour
            window.location.href = '/';
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="space-background">
            <div className="container">
                <h1 className="titlebox">Login to your account</h1>
                {error && <div id="alertBox" className="alert-message">{error}</div>}
                <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="inputbox">
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="inputbox">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit" className="btn" id="submitLogin">Login</button>
                    <p className="signup-text">Don't have an account? <a href="/register">Create one</a></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
