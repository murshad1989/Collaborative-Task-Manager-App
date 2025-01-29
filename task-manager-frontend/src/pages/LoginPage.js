import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // CSS for styling

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null); // JWT Token storage
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });

      setToken(response.data.token);
      setShowPopup(true);

      // Redirect to task page after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
        navigate('/tasks'); // Redirect to tasks page
      }, 3000);
    } catch (error) {
      console.error('Error during login:', error.response?.data?.message || 'No response from server.');
      alert('Login failed: ' + (error.response?.data?.message || 'Please try again later.'));
    }
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="reset-password">
          <a href="/forget-password">Forget Password?</a>
        </p>
      </div>

      {showPopup && (
        <div className="popup">
          <p>Login successful!</p>
          <p>
            <strong>JWT Token:</strong> {token}
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
