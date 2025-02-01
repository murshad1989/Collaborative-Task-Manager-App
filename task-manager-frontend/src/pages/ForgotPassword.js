import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/forget-password', { email });
      setMessage(res?.data?.message || 'Reset code sent successfully!');
    } catch (err) {
      setMessage(err?.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Forget Password</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <label
          htmlFor="email"
          style={{
            marginBottom: '10px',
            fontSize: '16px',
            fontWeight: '500',
            color: '#555',
          }}
        >
          Enter your email:
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            marginBottom: '20px',
            padding: '10px',
            width: '250px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <button
          type="submit"
          style={{
            background: 'linear-gradient(to right, #4caf50, #2e7d32)',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Send Reset Code
        </button>
      </form>
      {message && (
        <p style={{ marginTop: '20px', color: message.includes('error') ? 'red' : 'green' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ForgetPassword;
