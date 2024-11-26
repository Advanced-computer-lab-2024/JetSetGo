'use client'

// import React, { useState } from 'react'
import styles from './Navbar.module.css'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Badge1 from '../../assets/images/Badge1.jpg';
import Badge2 from '../../assets/images/Badge2.jpg';
import Badge3 from '../../assets/images/Badge3.jpg';
import { CurrencyContext } from './CurrencyContext';
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
const menuItems = [
  {
    title: "Trips",
    items: [
      { icon: "landmark", title: "Historical Locations", subText: "Explore famous landmarks and their rich history." },
      { icon: "university", title: "Museums", subText: "Discover world-class museums and cultural treasures." },
      // { icon: "bomb", title: "Super Collider", subText: "Remove mass from any object." },
    ]
  },
  {
    title: "Places",
    items: [
      { icon: "hiking", title: "Activities", subText: "Engage in exciting adventures and outdoor experiences." },
      { icon: "map-marked-alt", title: "Itineraries", subText: "Plan your trip with curated itineraries tailored for you." }
      // { icon: "school", title: "Learn", subText: "By Video" },
      // { icon: "chess-rook", title: "Keep", subText: "The Castle" },
      // { icon: "video-plus", title: "Become", subText: "A Creator" },
      // { icon: "cat", title: "Understand", subText: "Our Journey" },
    ]
  },
  {
    title: "Book",
    items: [
      { icon: "hotel", title: "Hotels", subText: "Find and book the best hotels worldwide." },
      { icon: "plane", title: "Flights", subText: "Discover great deals on flights to your destination." },
      { icon: "bus", title: "Transportation", subText: "Plan your local and intercity travel with ease." }
      // { icon: "phone-volume", title: "Live Chat" },
      // { icon: "book-spells", title: "Documentation" },
    ]
  },
  {
    title: "Products",
    // items: [
    //   { icon: "satellite", title: "Forum", subText: "Join our passionate community." },
    //   { icon: "twitter-square", title: "Twitter", subText: "Follow us on twitter." },
    //   { icon: "twitch", title: "Live Stream", subText: "We stream content every day." },
    // ]
  }
];

const Navbar2 = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { currency, setCurrency } = useContext(CurrencyContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tourist, setTourist] = useState(null);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const token = Cookies.get("auth_token");
  const decodedToken = jwtDecode(token);
  const id = decodedToken.id;
  const modelName = 'tourist';

  useEffect(() => {
    const fetchTouristData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/tourist/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setTourist(data);
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

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const renderLevelImage = (level) => {
    const badges = {
      1: Badge1,
      2: Badge2,
      3: Badge3,
    };
    return (
      level &&
      badges[level] && (
        <img
          src={badges[level]}
          alt={`Level ${level} Badge`}
          className="badge-image"
        />
      )
    );
  };


  return (
    <nav className={styles.navbar}>
      {menuItems.map((item) => (
        <div key={item.title}
          className={styles.menuItem}
          onMouseEnter={() => setActiveDropdown(item.title)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className={styles.menuText}>
            <a href="#">{item.title}</a>
          </div>
          {activeDropdown === item.title && (
            <div className={styles.subMenu}>
              {item.items && item.items.map((subItem, index) => (
                <a href="#" key={index} className={styles.iconBox}>
                  <div className={styles.icon}><i className={`fal fa-${subItem.icon}`}></i></div>
                  <div className={styles.text}>
                    <div className={styles.title}>{subItem.title} <i className="far fa-arrow-right"></i></div>
                    {subItem.subText && <div className={styles.subText}>{subItem.subText}</div>}
                  </div>
                </a>
              ))}
              {item.title === 'Services' && (
                <div className={styles.bottomContainer}>
                  Ready to dive in? <a href="#">Get Started</a>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      <div className={styles.subMenuContainer}>
        <div className={styles.subMenuHolder}>
          <div className={styles.subMenuBottom}></div>
        </div>
      </div>
      
    </nav>
  )
}

export default Navbar2;
