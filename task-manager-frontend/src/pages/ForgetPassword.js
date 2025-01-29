import React, { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Email Input, 2: Code Input, 3: New Password

  const handleSendCode = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setStep(2);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Server Error! Try again.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setStep(3);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Server Error! Try again.");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        window.location.href = "/tasks"; // Redirect to tasks page
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Server Error! Try again.");
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f4f4f4" }}>
      <div style={{ padding: "20px", borderRadius: "8px", backgroundColor: "white", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <h2>Forget Password</h2>

        {step === 1 && (
          <>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "10px", marginBottom: "10px", width: "100%" }} />
            <button onClick={handleSendCode} style={{ padding: "10px", backgroundColor: "blue", color: "white", width: "100%", cursor: "pointer" }}>
              Send Reset Code
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input type="text" placeholder="Enter reset code" value={code} onChange={(e) => setCode(e.target.value)} style={{ padding: "10px", marginBottom: "10px", width: "100%" }} />
            <button onClick={handleVerifyCode} style={{ padding: "10px", backgroundColor: "green", color: "white", width: "100%", cursor: "pointer" }}>
              Verify Code
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ padding: "10px", marginBottom: "10px", width: "100%" }} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ padding: "10px", marginBottom: "10px", width: "100%" }} />
            <button onClick={handleResetPassword} style={{ padding: "10px", backgroundColor: "purple", color: "white", width: "100%", cursor: "pointer" }}>
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
