import React from 'react';

const HomePage = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    color: '#333',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#007bff',
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
    margin: '0 0.5rem',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to Collaborative Task Manager</h1>
      <p style={paragraphStyle}>
        Please <a href="/login" style={linkStyle}>Login</a> or <a href="/register" style={linkStyle}>Register</a>.
      </p>
    </div>
  );
};

export default HomePage;
