import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {useContext} from 'react';
import Badge1 from '../../assets/images/Badge1.jpg';
import Badge2 from '../../assets/images/Badge2.jpg';
import Badge3 from '../../assets/images/Badge3.jpg';

import './homepage.css';

import { CurrencyContext } from './CurrencyContext';
const currencies=["EGP","EUR","USD"]

function NavBar() {

  const { currency, setCurrency } = useContext(CurrencyContext);
  const { id } = useParams();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activePopup, setActivePopup] = useState(null); // State to track which popup is active
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
        setIsDropdownOpen(false);
        setActivePopup(null); // Close all popups on navigation
    };

    const togglePopup = (menuItem) => {
        setActivePopup((prev) => (prev === menuItem ? null : menuItem));
    };


  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const renderLevelImage = (level) => {
    switch (level) {
        case 1:
            return <img src={Badge1} alt="Level 1 Badge" className="badge-image" style={{ width: '50px', height: '50px' }}/>;
        case 2:
            return <img src={Badge2} alt="Level 2 Badge" className="badge-image" style={{ width: '50px', height: '50px' }}/>;
        case 3:
            return <img src={Badge3} alt="Level 3 Badge" className="badge-image" style={{ width: '50px', height: '50px' }}/>;
        default:
            return null;
    }
  };

  return (
    <div>
        <div className="navvvbar">
            <div className="logo">
                {/* <h1>Travel Wiki</h1> 
                <img src="/images/jetsetgo.jpg" alt="Explore" className="card-image" />*/}
            </div>
            <div className="menu">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Trips</a></li>
                    <li><a href="#">Activities</a></li>
                    <li><a href="#">Recent Trips</a></li>
                    <li><a href="#">About Us</a></li>
                    
                    
                </ul>
            </div>
            <div className="signup">
                <a href="#">Sign Up</a>
            </div>
            <div className='currency'>
                <button className="currencyChanger">
                    {currencies[0]}
                </button>
                <select value={currency} onChange={handleCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    {/* Add other currencies as needed */}
                </select>
            </div>
            <div className="profile" ref={dropdownRef}>
                <span className="profile-link" onClick={toggleDropdown}>
                    {/* {renderLevelImage(tourist.Level)} */}
                  <img src={Badge1} alt="Level 1 Badge" className="badge-image" style={{ width: '50px', height: '50px' }}/>
                </span>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <ul>
                            {/* <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/update-profile/tour-guides/${id}`)}><i className="fas fa-cog"></i> Account</a></li> */}
                            <li>
                                <a href="#" onClick={() => handleNavigation(`/tourist/profile/tourist/${id}`)}>
                                    <i className="fas fa-user"></i> Profile
                                </a>
                            </li>
                            {/* <li><a href="#" onClick={() => handleNavigation('/settings')}><i className="fas fa-cog"></i> Settings</a></li>
                            <hr />
                            <li><a href="#" onClick={() => handleNavigation('/logout')}><i className="fas fa-sign-out-alt"></i> Log out</a></li> */}
                        </ul>
                    </div>
                )}
            </div>
	    </div>
    </div>
	
  );
}
export default NavBar;
