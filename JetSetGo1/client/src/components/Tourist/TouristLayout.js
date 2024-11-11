import React from 'react';
import './boxes.css';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBar from './navbar';
// import { useLocation } from 'react-router-dom';

function TouristLayout() {
  const location = useLocation(); // Access the location object
  const { id } = location.state || {}; // Access the id from state

  return (
    <div className="admin-dashboard">
      <div className="main-content">
        <NavBar  state={{ id }}/> {/* Navbar stays visible */}
        <div className="dashboard-data">
          <Outlet  state={{ id }}/> {/* Renders the page content here */}
        </div>
      </div>
    </div>
  );
}

export default TouristLayout;
