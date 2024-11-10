import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './navbar.css';
import '@fortawesome/fontawesome-free/css/all.css';

function TourGuideNavBar() {
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
                setActiveSubmenu(null);
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
                    <li onMouseEnter={() => togglePopup('activities')} onMouseLeave={() => togglePopup(null)}>
                        <a href="#" onClick={() => handleNavigation(`/tourguide/${id}/Activities`)}>Activities</a>
                        {activePopup === 'activities' && (
                            <div className="popup">
                                <ul>
                                    <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/activities/adventure`)}>Adventure</a></li>
                                    <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/activities/relaxation`)}>Relaxation</a></li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li onMouseEnter={() => togglePopup('itineraries')} onMouseLeave={() => togglePopup(null)}>
                        <a href="#" onClick={() => handleNavigation(`/tourguide/${id}/Itineraries`)}>Itineraries</a>
                        {activePopup === 'itineraries' && (
                            <div className="popup">
                                <ul>
                                    <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/ItineraryManagement`)}>Categories</a></li>
                                    <li><a href="#" onClick={() => handleNavigation(`/tour-guide/itineraryManager/${id}`)}>Itinerary Manager</a></li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li onMouseEnter={() => togglePopup('museum')} onMouseLeave={() => togglePopup(null)}>
                        <a href="#" onClick={() => handleNavigation(`/tourguide/${id}/Museum`)}>Museums</a>
                        {activePopup === 'museum' && (
                            <div className="popup">
                                <ul>
                                    <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/museum/history`)}>History</a></li>
                                    <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/museum/art`)}>Art</a></li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li onMouseEnter={() => togglePopup('historicalPlaces')} onMouseLeave={() => togglePopup(null)}>
                        <a href="#" onClick={() => handleNavigation(`/tourguide/${id}/HL`)}>Historical Places</a>
                        {activePopup === 'historicalPlaces' && (
                            <div className="popup">
                                <ul>
                                    <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/hl/castles`)}>Castles</a></li>
                                    <li><a href="#" onClick={() => handleNavigation(`/tourguide/${id}/hl/monuments`)}>Monuments</a></li>
                                </ul>
                            </div>
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
