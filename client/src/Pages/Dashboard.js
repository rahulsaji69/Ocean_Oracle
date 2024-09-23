import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import UserDashboard from '../Components/UserDashboard/UserDashboard';

function Dashboard() {
  return (
    <div>
      <Navbar />
      <UserDashboard />
    </div>
  );
}

export default Dashboard;