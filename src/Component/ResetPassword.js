import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword({ match }) {
    const [newPassword, setNewPassword] = useState('');
    const token = match.params.token; // Assuming you pass the token via URL params

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/auth/reset-password/${token}`, { password: newPassword });
            alert('Password reset successfully!');
        } catch (error) {
            console.error(error);
            alert('Error resetting password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required />
            <button type="submit">Reset Password</button>
        </form>
    );
}

export default ResetPassword;