import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Badge1 from '../../assets/images/Badge1.jpg';
import Badge2 from '../../assets/images/Badge2.jpg';
import Badge3 from '../../assets/images/Badge3.jpg';
import { useLocation } from 'react-router-dom';
import './homepage.css';
import { CurrencyContext } from './CurrencyContext';
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import Cookies from "js-cookie"; // Import js-cookie
const currencies = ["EGP", "EUR", "USD"];


function NavBar() {
    const location = useLocation(); // Access state passed via Link
    const token = Cookies.get("auth_token");
    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;
    console.log("id:", id);
    // const modelName = decodedToken.userType;
    // console.log("modelName:", modelName);
    // const { id } = location.state || {}; // Access id from state
    // const { id } = useParams();
    const { currency, setCurrency } = useContext(CurrencyContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activePopup, setActivePopup] = useState(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const modelName = 'tourist'
    const [tourist, setTourist] = useState(null);


    useEffect(() => {// Fetch tourist data using fetch
        const fetchTouristData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/tourist/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setTourist(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching tourist data:', error);
            }
        };
        fetchTouristData();
    }, [id]);

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
        setActivePopup(null);
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
                return <img src={Badge1} alt="Level 1 Badge" className="badge-image" style={{ width: '50px', height: '50px' }} />;
            case 2:
                return <img src={Badge2} alt="Level 2 Badge" className="badge-image" style={{ width: '50px', height: '50px' }} />;
            case 3:
                return <img src={Badge3} alt="Level 3 Badge" className="badge-image" style={{ width: '50px', height: '50px' }} />;
            default:
                return null;
        }
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
                        <li><Link to={`/tourist/home`} state={{ id }}>Home</Link></li>
                        <li><Link to={`/tourist/products`} state={{ id }}>Products</Link></li>
                        <li><Link to={`/tourist/Complaints`} state={{ id }}>Complaints</Link></li>
                        <li><Link to={`/tourist/activities2`} state={{ id }}>Activities</Link></li>
                        <li><Link to={`/tourist/itineraries2`} state={{ id }}>Itineraries</Link></li>
                        <li><Link to={`/tourist/tourguidelist`} state={{ id }}>Tour Guide</Link></li>
                        <li><Link to={`/tourist/my_bookings`} state={{ id }}>Booking</Link></li>
                        <li><Link to={`/tourist/historicalLocations`} state={{ id }}>Locations</Link></li>
                        <li>
                            <Link to={`/tourist/book-hotel`} state={{ id }}>Hotels</Link>
                        </li>
                        <li>
                            <Link to={`/tourist/book_flight`} state={{ id }}>Flights</Link>
                        </li>
                        <li>
                            <Link to={`/tourist/transportbooking`} state={{ id }}>Transport Booking</Link>
                        </li>
                        <li>
                            <Link to={`/tourist/myprefs/${id}`} state={{ id }}>My Preferences</Link>
                        </li>
                        <li>
                            <Link to={`/tourist/my_prefrences`} state={{ id }}>Preferences Selection</Link>
                        </li>
                        <li>
                            <Link to={`/tourist/Transportation`} state={{ id }}>Transportation</Link>
                        </li>
                    </ul>
                </div>

                <div className='currency'>
                    <button className="currencyChanger">
                        {currencies[0]}
                    </button>
                    <select value={currency} onChange={handleCurrencyChange}>
                        <option value="EGP">EGP</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        {/* Add other currencies as needed */}
                    </select>
                </div>
                <div className="profile" ref={dropdownRef}>
                    <span className="profile-link" onClick={toggleDropdown}>
                        {(tourist && renderLevelImage(tourist.Level)) ||
                            (tourist && renderLevelImage(2)) ||
                            (tourist && renderLevelImage(3))}
                    </span>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <ul>
                                <li>
                                    <Link to={`/tourist/profile/tourist/${id}`}>
                                        <i className="fas fa-user"></i> Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/tourist/change-password/${id}/${modelName}`}>
                                        <i className="fas fa-user"></i> Change My password
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/tourist/RequestDelete/${modelName}/${id}`}>
                                        <i className="fas fa-user"></i> Request to delete
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/tourist/rate-comment-event/${modelName}/${id}`}>
                                        <i className="fas fa-user"></i> rate/comment_attended
                                    </Link>
                                </li>
                                {/* Additional dropdown links can go here */}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NavBar;
