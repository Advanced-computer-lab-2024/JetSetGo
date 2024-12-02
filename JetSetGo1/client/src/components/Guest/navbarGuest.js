import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import './homepage.css';


function NavBarGuest() {
    const navigate = useNavigate();


    const handleNavigation = (path) => {
        navigate(path);
    };



    return (
        <div>
            <div className="navvvbar">
                <div className="logo">
                    {/* <h1>Travel Wiki</h1>
                    <img src="/images/jetsetgo.jpg" alt="Explore" className="card-image" /> */}
                </div>
                <div className="menu">
                    <ul>
                        <li><Link to={`/guest/home`}>Home</Link></li>
                        <li><Link to={`/guest/activities2`}>Activities</Link></li>
                        <li><Link to={`/guest/itineraries2`}>Itineraries</Link></li>
                        <li><Link to={`/guest/historicalLocations`}>Historical Locations</Link></li>
                    </ul>
                </div>

                <button onClick={() => handleNavigation('/Authentication')}>
                    Register
                </button>
                
	        </div>
        </div>
    );
}

export default NavBarGuest;
