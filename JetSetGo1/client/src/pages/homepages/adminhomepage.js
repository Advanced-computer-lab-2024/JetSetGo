import React from 'react';
import Sidebar from '../../components/Admin/sidebar';
import Navbar from '../../components/Admin/navbarr';
import './adminhomepage.css'; // Style the dashboard

function AdminDashboard() {
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
