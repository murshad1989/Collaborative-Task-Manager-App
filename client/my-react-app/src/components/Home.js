import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to Collaborative Task Manager</h1>
        <p style={styles.subtitle}>
          Organise, track, and collaborate on tasks effortlessly.
        </p>
      </header>
      <main style={styles.main}>
        <p style={styles.description}>
          Collaborative Task Manager is designed to streamline your workflow,
          enhance productivity, and foster teamwork. Get started by logging in
          or signing up to create and manage your tasks efficiently.
        </p>
        <div style={styles.links}>
          <Link to="/login" style={styles.button}>
            Login
          </Link>
          <Link to="/register" style={styles.button}>
            Register
          </Link>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  header: {
    marginBottom: "20px",
  },
  title: {
    fontSize: "2.5em",
    margin: "0",
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: "1.2em",
    marginTop: "5px",
    color: "#7f8c8d",
  },
  main: {
    margin: "20px auto",
    maxWidth: "600px",
  },
  description: {
    fontSize: "1.1em",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  links: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  button: {
    display: "inline-block",
    padding: "10px 20px",
    fontSize: "1em",
    color: "#fff",
    backgroundColor: "#3498db",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#2980b9",
  },
};

export default Home;
