import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Badge1 from '../../assets/images/Badge1.jpg';
import Badge2 from '../../assets/images/Badge2.jpg';
import Badge3 from '../../assets/images/Badge3.jpg';
import { useLocation } from 'react-router-dom';
import './homepage.css';


function TourismGovernerNavBar() {
    const location = useLocation(); // Access state passed via Link
    // const { id } = location.state || {}; // Access id from state
    const { id } = useParams();
   
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activePopup, setActivePopup] = useState(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const modelName = "tourismgoverner"  /** 7ot modelName */
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
                        <li><Link to={`/tourism_governer/${id}/HLMs`} state={{ id }}>HLMss</Link></li>
                        <li><Link to={`/tourism_governer/${id}/HLTags`} state={{ id }}>HLTags</Link></li>
                        {/* <li><Link to={`/tourist/Complaints`} state={{ id }}>Complaints</Link></li> */}
                        
                        
                    </ul>
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
                                    <Link to={`/tourism_governer/${id}/${modelName}/change-password`} state={{id,modelName}}>
                                        <i className="fas fa-user"></i> Change My password
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/tourism_governer/RequestDelete/${id}/${modelName}`} state={{id,modelName}}>
                                        <i className="fas fa-user"></i> Request to delete
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/tourism_governer/upload-image/${id}/${modelName}`} state={{id,modelName}}>
                                        <i className="fas fa-user"></i> upload Image
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/tourism_governer/sellerprofile/${id}`} state={{id}}>
                                        <i className="fas fa-user"></i> seller profile
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

export default TourismGovernerNavBar;