import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../components/navbar.css';
import '@fortawesome/fontawesome-free/css/all.css';

function AdvertiserNavBar() {
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

    return (
        <div className="navvvbar">
            <div className="logo">
                {/* Logo or title here */}
            </div>
            <div className="menu">
                <ul>
                    <li>
                        <a href="#" onClick={() => handleNavigation(`/Advertiser/${id}`)}>Home</a>
                    </li>
                    <li onMouseEnter={() => togglePopup('activities')} onMouseLeave={() => togglePopup(null)}>
                        <a href="#" onClick={() => handleNavigation(`/Advertiser/${id}/AdvertiserActivities/${id}`)}>Activities</a>
                        {activePopup === 'activities' && (
                            <div className="popup">
                                <ul>
                                    <li><a href="#" onClick={() => handleNavigation(`/Advertiser/${id}/ActivitiesJohn/${id}`)}>Activity Manager</a></li>
                                    <li><a href="#" onClick={() => handleNavigation(``)}>Relaxation</a></li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li onMouseEnter={() => togglePopup('itineraries')} onMouseLeave={() => togglePopup(null)}>
                        <a href="#" onClick={() => handleNavigation(``)}>Itineraries</a>
                        {activePopup === 'itineraries' && (
                            <div className="popup">
                                <ul>
                                    <li><a href="#" onClick={() => handleNavigation(``)}>Categories</a></li>
                                    <li><a href="#" onClick={() => handleNavigation(``)}>Itinerary Manager</a></li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li onMouseEnter={() => togglePopup('museum')} onMouseLeave={() => togglePopup(null)}>
                        <a href="#" onClick={() => handleNavigation(``)}>Museums</a>
                        {activePopup === 'museum' && (
                            <div className="popup">
                                <ul>
                                    <li><a href="#" onClick={() => handleNavigation(``)}>History</a></li>
                                    <li><a href="#" onClick={() => handleNavigation(``)}>Art</a></li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li onMouseEnter={() => togglePopup('historicalPlaces')} onMouseLeave={() => togglePopup(null)}>
                        <a href="#" onClick={() => handleNavigation(``)}>Historical Places</a>
                        {activePopup === 'historicalPlaces' && (
                            <div className="popup">
                                <ul>
                                    <li><a href="#" onClick={() => handleNavigation(``)}>Castles</a></li>
                                    <li><a href="#" onClick={() => handleNavigation(``)}>Monuments</a></li>
                                </ul>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
            <div className="profile" ref={dropdownRef}>
                <span className="profile-link" onClick={() => setIsDropdownOpen((prev) => !prev)}>
                    <span className="profile-icon">A</span>
                </span>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <ul>
                            <li><a href="#" onClick={() => handleNavigation(`/Advertiser/${id}/advertiserprofile`)}><i className="fas fa-cog"></i> Account</a></li>
                            <li><a href="#" onClick={() => handleNavigation(``)}><i className="fas fa-user"></i> Profile</a></li>
                            <li><a href="#" onClick={() => handleNavigation('')}><i className="fas fa-cog"></i> Settings</a></li>
                            <hr />
                            <li><a href="#" onClick={() => handleNavigation('/logout')}><i className="fas fa-sign-out-alt"></i> Log out</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdvertiserNavBar;
