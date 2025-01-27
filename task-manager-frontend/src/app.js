import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/HomePage.css'; // Ensure `.css` extension is present
import './styles/Register.css'; // Adjust path if styles folder is at src level
import RegisterPage from './pages/RegisterPage'; // Create/Register
import LoginPage from './pages/LoginPage'; // Login
import HomePage from './pages/HomePage'; // HomePage
import ForgetPassword from './pages/ForgetPassword';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
