import React, { useState } from 'react';
import ApiController from '../../controllers/apiController';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token, role, id } = await ApiController.register(username, password);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('username', username);
            localStorage.setItem('expiration', Date.now() + 3600000); // Set expiration for 1 hour
            localStorage.setItem('id', id);
            window.location.href = '/'; // Redirect to main page
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="container">
            <h1>Register an account</h1>
            {error && <div className="alert-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="inputbox">
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Username" 
                        required 
                    />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="inputbox">
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        required 
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <button type="submit" className="btn">Register</button>
                <p className="signup-text">Already have an account? <a href="/login">Go login here</a></p>
            </form>
        </div>
    );
};

export default Register;
