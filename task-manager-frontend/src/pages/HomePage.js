import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HomePage.css'; // For Styling

const HomePage = () => {
  const navigate = useNavigate();

  const goToRegister = () => navigate('/register'); // For Register page
  const goToLogin = () => navigate('/login'); // For Login page

  return (
    <div className="home-container">
      <div className="content-box">
        <h1>Welcome to Collaborative Task Management App Builed By Murshad</h1>
        <button className="register-button" onClick={goToRegister}>
          Register
        </button>
        <button className="login-button" onClick={goToLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;
