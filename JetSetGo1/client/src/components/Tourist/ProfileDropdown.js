import React from 'react';
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ tourist, id, modelName, isDropdownOpen, toggleDropdown, dropdownRef, renderLevelImage }) => {
    return (
        <div style={styles.profile} ref={dropdownRef}>
            <span style={styles.profileLink} onClick={toggleDropdown}>
                {tourist && renderLevelImage(tourist.Level)}
            </span>
            {isDropdownOpen && (
                <div style={styles.dropdownMenu}>
                    <ul style={styles.menuList}>
                        <li><Link to={`/tourist/profile/tourist/${id}`}><i className="fas fa-user"></i> Profile</Link></li>
                        <li><Link to={`/tourist/change-password/${id}/${modelName}`}><i className="fas fa-user"></i> Change Password</Link></li>
                        <li><Link to={`/tourist/RequestDelete/${modelName}/${id}`}><i className="fas fa-user"></i> Request to Delete</Link></li>
                        <li><Link to={`/tourist/rate-comment-event/${modelName}/${id}`}><i className="fas fa-user"></i> Rate/Comment</Link></li>
                        {/* Additional dropdown links */}
                    </ul>
                </div>
            )}
        </div>
    );
};

const styles = {
    profile: {
        position: 'relative',
        cursor: 'pointer',
    },
    profileLink: {
        display: 'inline-block',
        padding: '10px',
        borderRadius: '50%',
        backgroundColor: '#f9f9f9',
    },
    dropdownMenu: {
        position: 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
        padding: '10px',
        zIndex: 100,
    },
    menuList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
};

export default ProfileDropdown;
