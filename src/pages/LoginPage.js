import React from "react";
import AuthForm from "../components/AuthForm";

const LoginPage = ({ onLogin }) => {
  const handleLogin = (credentials) => {
    // Call the API or handle the login logic
    console.log("Login credentials:", credentials);
    onLogin(credentials);
  };

  return (
    <div>
      <h1>Login</h1>
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
