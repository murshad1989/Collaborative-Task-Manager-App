import React, { useState } from "react";
import AuthForm from "../components/AuthForm";

const LoginPage = ({ onLogin }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (credentials) => {
    try {
      // API call to login the user
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        // Call onLogin if successful
        onLogin(data);
      } else {
        // Show error message if login fails
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
