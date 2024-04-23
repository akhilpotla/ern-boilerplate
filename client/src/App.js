import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Profile from './components/Profile';
import Register from './components/auth/Register';

// Styles
import './App.css';

axios.defaults.baseURL = 'http://localhost:5000';

const App = () => (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    </Router>
);

export default App;
