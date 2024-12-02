import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import Badge1 from '../../assets/images/Badge1.jpg';
import Badge2 from '../../assets/images/Badge2.jpg';
import Badge3 from '../../assets/images/Badge3.jpg';
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import Cookies from "js-cookie"; // Import js-cookie
import './SellerNavbar.css';




function SellerNavbar() {
    // const { id } = useParams();
    //const location=useLocation();
   // const {id} = location.state;

    const token = Cookies.get("auth_token");
    const decodedToken = jwtDecode(token);

    const id = decodedToken.id;
    console.log("ANA GOWA EL NAV BAR")
    console.log("id:",id);
    const modelName = decodedToken.userType;
    console.log("modelName:",modelName);

    
    console.log("at navbar:"+id);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activePopup, setActivePopup] = useState(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
   // const modelName='sellers'

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
                        <li><Link to={`/Seller/home`} state={{id}}>Home</Link></li>
                        <li><Link to={`/Seller/products`} state={{id}}>Products</Link></li>
                        <li><Link>Activities</Link></li>
                        <li><Link>Itineraries</Link></li>
                        <li><Link>Tour Guide</Link></li>
                        <li><Link>Booking</Link></li>
                        <li><Link>Historical Locations</Link></li>
                    </ul>
                </div>
                
                
                <div className="profile" ref={dropdownRef}>
                    <span className="profile-link" onClick={toggleDropdown}>
                        {renderLevelImage(1)} {/* Replace 1 with the tourist's level if available */}
                    </span>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <ul>
                                <li>
                                    <Link to={`/Seller/change-password/${id}/${modelName}`} state={{id,modelName}}>
                                        <i className="fas fa-user"></i> Change My password
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/Seller/RequestDelete/${id}/${modelName}`} state={{id,modelName}}>
                                        <i className="fas fa-user"></i> Request to delete
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/Seller/upload-image/${id}/${modelName}`} state={{id,modelName}}>
                                        <i className="fas fa-user"></i> upload Image
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/Seller/sellerprofile/${id}`} state={{id}}>
                                        <i className="fas fa-user"></i> seller profile
                                    </Link>
                                </li>
                               
                            </ul>
                        </div>
                    )}
                </div>
	        </div>
        </div>
    );
}

export default SellerNavbar;
