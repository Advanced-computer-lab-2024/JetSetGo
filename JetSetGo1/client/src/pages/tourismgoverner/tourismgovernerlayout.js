import React from 'react';
import './boxes.css';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import TourismGovernerNavBar from './tourismgovernernavbar.js';
// import { useLocation } from 'react-router-dom';

import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import Cookies from "js-cookie"; // Import js-cookie

function TourismGovernerLayout() {
  const location = useLocation(); // Access the location object
  //const { id } = location.state || {}; // Access the id from state
  const token = Cookies.get("auth_token");
const decodedToken = jwtDecode(token);
const id = decodedToken.id;
console.log("id:",id);
const modelName = decodedToken.userType;
console.log("modelName:",modelName);

  return (
    <div className="admin-dashboard">
      <div className="main-content">
        <TourismGovernerNavBar  state={{ id }}/> {/* Navbar stays visible */}
        <div className="dashboard-data">
          <Outlet  state={{ id }}/> {/* Renders the page content here */}
        </div>
      </div>
    </div>
  );
}

export default TourismGovernerLayout;