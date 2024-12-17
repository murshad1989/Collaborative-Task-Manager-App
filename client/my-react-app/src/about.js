import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Collaborative Task Manager</h1>
      <p style={styles.paragraph}>
        The Collaborative Task Manager is an efficient platform designed to help teams manage their tasks, collaborate seamlessly, and track their progress in real-time. Our goal is to improve productivity and ensure smooth task delegation and completion.
      </p>
      <p style={styles.paragraph}>
        Features include task creation, assignment, deadline tracking, and analytics, along with secure authentication and a user-friendly interface.
      </p>
      <p style={styles.paragraph}>
        We are continuously improving the platform to make it more feature-rich and responsive, ensuring it meets the needs of modern teams.
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
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '1.2rem',
    color: '#34495E',
    marginBottom: '15px',
    lineHeight: '1.6',
  },
};

export default About;
