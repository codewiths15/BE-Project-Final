// src/App.js
import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Home from './Home';
import { isAuthenticated } from './components/auth';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Home/> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
  );
}

export default App;
