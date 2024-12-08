import React from "react";
import AuthForm from "../components/AuthForm";

const RegisterPage = ({ onRegister }) => {
  const handleRegister = (credentials) => {
    // Call the API or handle the registration logic
    console.log("Register credentials:", credentials);
    onRegister(credentials);
  };

  return (
    <div>
      <h1>Register</h1>
      <AuthForm type="register" onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;
