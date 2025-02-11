import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/LoginPage/Login';
import Register from './components/RegisterPage/Register';
import HomePage from './components/HomePage/Home';
import ProtectedRoute from './components/ProtectedRoute';
import TeamSelection from './components/TeamSelection/TeamSelection';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/teamSelection" element={<TeamSelection />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
