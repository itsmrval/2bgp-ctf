import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

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

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await isLoggedIn();
            setIsAuthenticated(authStatus);
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
