import React from 'reo
act';

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Our Task Manager</h1>
      <p style={styles.description}>
        Welcome to our Task Manager application, a comprehensive platform designed to help you stay organised, productive, and in control of your tasks. Whether you're managing personal projects, team assignments, or deadlines, this app provides all the tools you need to plan, track, and achieve your goals effectively.
      </p>

      <h2 style={styles.subheading}>Key Features</h2>
      <ul style={styles.list}>
        <li>Create, edit, and delete tasks effortlessly.</li>
        <li>Track pending and completed tasks in real time.</li>
        <li>Set due times and mark completion to stay on schedule.</li>
        <li>Share tasks with team members via email.</li>
        <li>Reset forgotten passwords securely and quickly.</li>
        <li>Interactive dashboards for better task visibility.</li>
      </ul>

      <p style={styles.description}>
        Our application is built with modern technologies like React for an interactive user interface, Node.js and Express for a robust backend, and MariaDB for secure data storage. We prioritise user experience and data security, ensuring you have the best task management experience possible.
      </p>

      <h2 style={styles.subheading}>Get Started</h2>
      <p style={styles.description}>
        Ready to take control of your tasks? Head over to the registration page to create an account, or log in if you're an existing user. Start managing your tasks smarter and faster today!
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    textAlign: 'left',
    fontFamily: "'Arial', sans-serif",
    lineHeight: '1.6',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2.5em',
    color: '#333',
    marginBottom: '20px',
  },
  subheading: {
    fontSize: '1.8em',
    color: '#555',
    marginTop: '20px',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1.2em',
    color: '#666',
    marginBottom: '15px',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '40px',
    marginBottom: '20px',
  },
};

export default About;
