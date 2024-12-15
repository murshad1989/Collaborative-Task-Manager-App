import React from "react";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

const ProfilePage = () => {
  const { user, token, logout } = useAuth(); // Get user data and logout function from context

  if (!user) {
    return <p>Please log in to see your profile.</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
