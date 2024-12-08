import React from 'react';

const DashboardPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <p>Welcome to the Task Manager App!</p>

      <div style={{ marginTop: '20px' }}>
        <h2>Your Tasks</h2>
        <p>This is where you'll see a list of your tasks.</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Analytics</h2>
        <p>Visualize your task progress here (coming soon!).</p>
      </div>
    </div>
  );
};

export default DashboardPage;
