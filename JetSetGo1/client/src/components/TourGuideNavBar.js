import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './navbar.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import Cookies from "js-cookie"; // Import js-cookie    
function TourGuideNavBar() {
    //const { id } = useParams();
    const token = Cookies.get("auth_token");
const decodedToken = jwtDecode(token);
const id = decodedToken.id;
console.log("id:",id);
const modelName = decodedToken.userType;
console.log("modelName:",modelName);

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
        navigate(path , {state:{id}});
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
                        <a href="#" onClick={() => handleNavigation(`/Tourguide/${id}`)}>Home</a>
                    </li>
                    <li onMouseEnter={() => togglePopup('activities')} onMouseLeave={() => togglePopup(null)}>
                        <a href="#" onClick={() => handleNavigation(`/Tourguide/${id}/Activities`)}>Activities</a>
                        {activePopup === 'activities' && (
                            <div className="popup">
                                <ul>
                                    <li><a href="#" onClick={() => handleNavigation(`/Tourguide/${id}/activities/adventure`)}>Adventure</a></li>
                                    <li><a href="#" onClick={() => handleNavigation(`/Tourguide/${id}/activities/relaxation`)}>Relaxation</a></li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li onMouseEnter={() => togglePopup('itineraries')} onMouseLeave={() => togglePopup(null)}>
                        <a href="#" onClick={() => handleNavigation(`/Tourguide/${id}/MyItineraries`)}>Itineraries</a>
                        {activePopup === 'itineraries' && (
                            <div className="popup">
                                <ul>
                                    <li><a href="#" onClick={() => handleNavigation(`/Tourguide/${id}/ItineraryManagement`)}>Active/Deactive</a></li>
                                    <li><a href="#" onClick={() => handleNavigation(`/Tourguide/${id}/tour-guide/itineraryManager/${id}`)}>Itinerary Manager</a></li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li onMouseEnter={() => togglePopup('museum')} onMouseLeave={() => togglePopup(null)}>
                        <a href="#" onClick={() => handleNavigation(`/Tourguide/${id}/Museum`)}>Museums</a>
                        {activePopup === 'museum' && (
                            <div className="popup">
                                <ul>
                                    <li><a href="#" onClick={() => handleNavigation(`/Tourguide/${id}/museum/history`)}>History</a></li>
                                    <li><a href="#" onClick={() => handleNavigation(`/Tourguide/${id}/museum/art`)}>Art</a></li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li onMouseEnter={() => togglePopup('historicalPlaces')} onMouseLeave={() => togglePopup(null)}>
                        <a href="#" onClick={() => handleNavigation(`/Tourguide/${id}/HL`)}>Historical Places</a>
                        {activePopup === 'historicalPlaces' && (
                            <div className="popup">
                                <ul>
                                    <li><a href="#" onClick={() => handleNavigation(`/Tourguide/${id}/hl/castles`)}>Castles</a></li>
                                    <li><a href="#" onClick={() => handleNavigation(`/Tourguide/${id}/hl/monuments`)}>Monuments</a></li>
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
                            
                            <li><a href="#" onClick={() => handleNavigation(`/Tourguide/${id}/profile/tour-guides/${id}`)}><i className="fas fa-user"></i> Profile</a></li>
                            
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
