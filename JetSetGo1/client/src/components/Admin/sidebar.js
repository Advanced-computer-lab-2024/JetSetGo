import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTags, faChartBar, faComments, faBox, faTasks, faUser } from '@fortawesome/free-solid-svg-icons'; 
import './sidebar.css';
import { Link } from "react-router-dom";

function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`sidebar ${isMinimized ? 'minimized' : ''}`}>
      <button 
        className={`hamburger ${isMinimized ? '' : 'open'}`} // Show lines if minimized, otherwise show X
        onClick={toggleSidebar} 
        aria-label="Toggle Sidebar"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
      <ul className="sidebar-menu">
        <li>
          <FontAwesomeIcon icon={faChartBar} className="icon" />
          <span>Sales</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faTags} className="icon" />
          <span>Tags</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faComments} className="icon" />
          <span><Link to="/admin/complaints">Complaints</Link></span>
        </li>
        <li>
          <FontAwesomeIcon icon={faBox} className="icon" />
          
          <span><Link to="/admin/products">Product</Link></span>
        </li>
        
        <li>
          <FontAwesomeIcon icon={faTasks} className="icon" />
          <span><Link to="/admin/requests">Request</Link></span>
        </li>
        <li>
          <FontAwesomeIcon icon={faUser} className="icon" />
          <span>User</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCog} className="icon" />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;