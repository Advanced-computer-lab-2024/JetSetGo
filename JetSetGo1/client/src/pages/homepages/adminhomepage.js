import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Admin/sidebar';
import Navbar from '../../components/Admin/navbarr';
import './adminhomepage.css'; // Style the dashboard

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersThisMonth, setUsersThisMonth] = useState(0);

  useEffect(() => {
    // Fetch stats when the component mounts
    const fetchStats = async () => {
      try {
        // Fetching the stats from the API using fetch
        const response = await fetch('/api/admin/users'); // Adjust the API route if necessary
        const data = await response.json();

        // Destructure the data to get the stats
        const { totalUsers, usersThisMonth } = data;

        // Set the state with the fetched stats
        setTotalUsers(totalUsers);
        setUsersThisMonth(usersThisMonth);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    fetchStats();
  }, []); // Empty dependency array means this runs once after component mounts

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="dashboard-data">
          <h2>Admin Dashboard</h2>
          <div className="stats">
            <div className="stat-card">
              <h3>Sales</h3>
              <p>$50,000</p>
            </div>
            <div className="stat-card">
              <h3>New Complaints</h3>
              <p>3</p>
            </div>
            <div className="stat-card">
              <h3>Total Products</h3>
              <p>120</p>
            </div>
            <div className="stat-card">
              <h3>Active Admins</h3>
              <p>5</p>
            </div>

            <div className="stat-card">
              <h3>All Users</h3>
              <p>{totalUsers}</p>
            </div>

            <div className="stat-card">
              <h3>Users this month</h3>
              <p>{usersThisMonth}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
