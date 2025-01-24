import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // CSS for styling

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null); // Store JWT token
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        name,
        email,
        password,
      });

      setToken(response.data.token);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false); // Auto-hide popup after 5 seconds
        navigate('/login'); // Redirect to login page
      }, 5000);
    } catch (error) {
      console.error('Error during registration:', error.response?.data?.message || 'No response from server.');
      alert('Registration failed: ' + (error.response?.data?.message || 'Please try again later.'));
    }
  };

  const copyToken = () => {
    navigator.clipboard.writeText(token);
    alert('Token copied to clipboard!');
  };

  return (
    <div className="register-container">
      <div className="form-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>

      {showPopup && (
        <div className="popup">
          <p>Registration successful!</p>
          <p>
            <strong>JWT Token:</strong> {token}
          </p>
          <button onClick={copyToken} className="copy-button">Copy Token</button>
        </div>
      )}
    </div>
  );
};

export default Register;
