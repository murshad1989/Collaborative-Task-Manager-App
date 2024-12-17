import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUserData = async () => {
      const mockUser = {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Project Manager",
        joinedDate: "2023-05-15",
      };
      setUser(mockUser);
    };
    fetchUserData();
  }, []);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Profile Page</h1>
      <div style={styles.profileCard}>
        <img
          src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
          alt={`${user.name} Avatar`}
          style={styles.avatar}
        />
        <div style={styles.info}>
          <h2 style={styles.name}>{user.name}</h2>
          <p style={styles.email}><strong>Email:</strong> {user.email}</p>
          <p style={styles.role}><strong>Role:</strong> {user.role}</p>
          <p style={styles.joined}>
            <strong>Joined:</strong> {new Date(user.joinedDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "2em",
    color: "#2c3e50",
    marginBottom: "20px",
  },
  profileCard: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    maxWidth: "600px",
    width: "100%",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginRight: "20px",
    border: "2px solid #3498db",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: "1.5em",
    margin: "0 0 10px",
    color: "#34495e",
  },
  email: {
    fontSize: "1em",
    margin: "5px 0",
    color: "#7f8c8d",
  },
  role: {
    fontSize: "1em",
    margin: "5px 0",
    color: "#7f8c8d",
  },
  joined: {
    fontSize: "1em",
    margin: "5px 0",
    color: "#7f8c8d",
  },
};

export default ProfilePage;
