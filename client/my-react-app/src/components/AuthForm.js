import React, { useState } from "react";

const AuthForm = ({ type, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }


    if (type === "register" && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {

      await onSubmit({ email, password });
      setLoading(false);
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>{type === "login" ? "Login" : "Register"}</h2>

      {/* Email Input */}
      <div style={styles.field}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      {/* Password Input */}
      <div style={styles.field}>
        <label>Password:</label>
        <div style={styles.passwordContainer}>
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button
            type="button"
            style={styles.toggleButton}
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Confirm Password Input (For Registration Only) */}
      {type === "register" && (
        <div style={styles.field}>
          <label>Confirm Password:</label>
          <input
            type={passwordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
      )}

      {/* Error Message */}
      {error && <p style={styles.error}>{error}</p>}

      {/* Submit Button */}
      <button type="submit" disabled={loading} style={styles.submitButton}>
        {loading ? "Loading..." : type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    fontFamily: "'Arial', sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  field: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "5px",
  },
  passwordContainer: {
    position: "relative",
  },
  toggleButton: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#007BFF",
    fontSize: "14px",
  },
  error: {
    color: "red",
    marginTop: "-10px",
    marginBottom: "10px",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};

export default AuthForm;
