import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);

  const handleSendCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      alert(response.data.message);
      setStep(2);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message || 'Error sending reset code');
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      return alert('Passwords do not match');
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
        email,
        resetCode,
        newPassword,
      });
      alert(response.data.message);
      setStep(3); // Redirect to login
    } catch (error) {
      console.error(error);
      alert(error.response.data.message || 'Error resetting password');
    }
  };

  return (
    <div className="forget-password-container">
      {step === 1 && (
        <div>
          <h2>Forget Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendCode}>Send Reset Code</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Reset Password</h2>
          <input
            type="text"
            placeholder="Enter reset code"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Password Reset Successfully</h2>
          <button onClick={() => (window.location.href = '/login')}>Go to Login</button>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
