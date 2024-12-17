import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Collaborative Task Manager</h1>
      <p style={styles.paragraph}>
        This is your one-stop solution for managing tasks efficiently, collaborating with your team, and tracking your productivity in real-time.
      </p>
      <p style={styles.paragraph}>
        Please <a href="/login" style={styles.link}>Login</a> or <a href="/register" style={styles.link}>Register</a> to get started.
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f6f8',
    padding: '20px',
    textAlign: 'center',
  },
  heading: {
    color: '#2C3E50',
    fontSize: '3rem',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '1.2rem',
    color: '#34495E',
    marginBottom: '15px',
  },
  link: {
    color: '#3498DB',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Home;
