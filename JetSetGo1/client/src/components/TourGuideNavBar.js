import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './navbar.css';
import '@fortawesome/fontawesome-free/css/all.css';

function TourGuideNavBar() {
    const { id } = useParams();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Function to handle navigation
    const handleNavigation = (path) => {
        navigate(path);
        setIsDropdownOpen(false);
        setActiveSubmenu(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
                setActiveSubmenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleSubmenu = (menu) => {
        setActiveSubmenu((prev) => (prev === menu ? null : menu));
    };

    return (
        <div className="navvvbar">
            <div className="logo">
                {/* Logo or title here */}
            </div>
            <div className="menu">
                <ul>
                    <li>
                        <a href="#" onClick={() => handleNavigation(`/tourguide/${id}`)}>Home</a>
                    </li>
                    <li>
                        <a href="#" onClick={() => toggleSubmenu('activities')}>Activities</a>
                        {activeSubmenu === 'activities' && (
                            <ul className="dropdown-submenu">
                                <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/Activities/Culture`)}>Culture</a></li>
                                <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/Activities/Adventure`)}>Adventure</a></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <span onClick={() => toggleSubmenu('itineraries')}>Itineraries</span>
                        {activeSubmenu === 'itineraries' && (
                            <ul className="dropdown-submenu">
                                <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/ItineraryManagement`)}>Categories</a></li>
                                <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/Itineraries/Day`)}>Day Trips</a></li>
                                <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/Itineraries/Weekend`)}>Weekend Getaways</a></li>
                                <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/Itineraries/Long`)}>Long Trips</a></li>
                                <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/ItineraryManagement`)}>Manage Itineraries</a></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <a href="#" onClick={() => toggleSubmenu('museum')}>Museums</a>
                        {activeSubmenu === 'museum' && (
                            <ul className="dropdown-submenu">
                                <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/Museum/Art`)}>Art Museum</a></li>
                                <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/Museum/History`)}>History Museum</a></li>
                                <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/Museum/Science`)}>Science Museum</a></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <a href="#" onClick={() => toggleSubmenu('hl')}>Historical Places</a>
                        {activeSubmenu === 'hl' && (
                            <ul className="dropdown-submenu">
                                <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/HL/Ancient`)}>Ancient Sites</a></li>
                                <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/HL/Castles`)}>Castles</a></li>
                                <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/HL/Monuments`)}>Monuments</a></li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
            <div className="profile" ref={dropdownRef}>
                <span className="profile-link" onClick={() => setIsDropdownOpen((prev) => !prev)}>
                    <span className="profile-icon">Z</span>
                </span>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <ul>
                            <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/update-profile/tour-guides/${id}`)}><i className="fas fa-cog"></i> Account</a></li>
                            <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/profile/tour-guides/${id}`)}><i className="fas fa-user"></i> Profile</a></li>
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
