import React from 'react';
import './boxes.css';
import { Outlet, useLocation } from 'react-router-dom';

import SellerNavbar from './SellerNavbar';

function SellerLayout() {
  const location=useLocation()
  const {id}=location.state
  console.log(id)
  return (
    <div className="admin-dashboard">
      <div className="main-content">
        <SellerNavbar  state={{ id }} /> {/* Navbar stays visible */}
        <div className="dashboard-data">
          <Outlet  state={{ id }} /> {/* Renders the page content here */}
        </div>
      </div>
    </div>
  );
}

export default SellerLayout;
