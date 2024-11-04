import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import './navbar.css';
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome

function TourGuideNavBar() {
    const { id } = useParams(); // Get the ID from the URL parameters
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref to track dropdown
    const navigate = useNavigate(); // Initialize navigate

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Function to handle navigation
    const handleNavigation = (path) => {
        navigate(path);
        setIsDropdownOpen(false); // Close dropdown after navigation
    };

    return (
        <div className="navvvbar">
            <div className="logo">
                {/* Logo or title here */}
            </div>
            <div className="menu">
                <ul>
                    <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}`)}>Home</a></li>
                    <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/Activities`)}>Activities</a></li>
                    <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/Itineraries`)}>Itineraries</a></li>
                    <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/Museum`)}>Museums</a></li>
                    <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/HL`)}>Historical Places</a></li>
                </ul>
            </div>
            <div className="profile" ref={dropdownRef}>
                <span className="profile-link" onClick={toggleDropdown}>
                    <span className="profile-icon">Z</span>
                </span>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <ul>
                            <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/update-profile/tour-guides/${id}`)}><i className="fas fa-cog"></i> Account</a></li>
                            <li>
                                <a href="#" onClick={() => handleNavigation(`/tourguide/${id}/profile/tour-guides/${id}`)}>
                                    <i className="fas fa-user"></i> Profile
                                </a>
                            </li>
                            <li><a href="#" onClick={() => handleNavigation('/settings')}><i className="fas fa-cog"></i> Settings</a></li>
                            <hr />
                            <li><a href="#" onClick={() => handleNavigation('/logout')}><i className="fas fa-sign-out-alt"></i> Log out</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TourGuideNavBar;
