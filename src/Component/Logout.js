// src/Component/Logout.js
import React from 'react';

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        window.location.href = '/login'; // Redirect to login page
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;