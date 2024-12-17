import React, { useState, useEffect } from "react";
import collaborationService from "../Services/CollaborationService";

const UserSelector = ({ onSelect }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const userList = await collaborationService.getAllUsers();
        setUsers(userList);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user list.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (event) => {
    const userId = event.target.value;
    setSelectedUser(userId);
    if (onSelect) onSelect(userId);
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <label htmlFor="userSelector" style={styles.label}>
        Select User:
      </label>
      <select
        id="userSelector"
        value={selectedUser}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="">-- Choose a User --</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>
    </div>
  );
};

const styles = {
  container: {
    margin: "20px 0",
    fontFamily: "Arial, sans-serif",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "1em",
    color: "#2c3e50",
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "1em",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#f4f4f9",
    outline: "none",
  },
  error: {
    color: "red",
    fontSize: "1em",
  },
};

export default UserSelector;
