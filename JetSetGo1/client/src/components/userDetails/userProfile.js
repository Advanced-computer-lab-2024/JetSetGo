import React, { useState, useEffect } from 'react';
import "./userProfile.css";
import { MDBBtn, MDBTypography, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
// import {userId} from '../accountBox/signupForm';

// const { userId, SignupForm } = require('../accountBox/signupForm');


const PersonalProfile = ({ userId }) => {
  console.log('bobaaa');
  console.log(userId); // Verify you have access to the imported userId

  const [userData, setUserData] = useState({
    fullName: '',
    description: '',
    companyProfile: '',
    websiteLink: '',
    hotline: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);

      try {
        if (!userId) {
          throw new Error('Missing user ID');
        }

        const role = localStorage.getItem('role');
        setUserRole(role); // Store user role
        let url;

        if (role === 'Advertiser') {
          url = `/api/advertiser/profile/${userId}`;
        } else if (role === 'Seller') {
          url = `/api/seller/profile/${userId}`;
        } else {
          throw new Error('Invalid user role');
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

        if (role === 'Advertiser' && !data.advertiser.accepted) {
          console.error('Advertiser profile creation not allowed: User not accepted.');
          return;
        } else if (role === 'Seller' && !data.seller.accepted) {
          console.error('Seller profile creation not allowed: User not accepted.');
          return;
        }

        // Initialize userData based on role
        if (role === 'Advertiser') {
          setUserData({
            companyProfile: data.companyProfile || '',
            websiteLink: data.websiteLink || '',
            hotline: data.hotline || '',
          });
        } else {
          setUserData({
            fullName: data.fullName || '',
            description: data.description || '',
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      console.log("dede", userRole.toLowerCase());
      if (userRole.toLowerCase() == 'advertiser') {
        const response = await fetch(`http://localhost:8000/api/advertisers/createProfile/${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
        if (!response.ok) {
          throw new Error('Failed to update user profile');
        }
        console.log('Profile updated successfully!');
        setIsEditing(false);
      }
      else if(userRole.toLowerCase() == 'seller'){
        const response = await fetch(`http://localhost:8000/api/sellers/create/${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
        if (!response.ok) {
          throw new Error('Failed to update user profile');
        }
        console.log('Profile updated successfully!');
        setIsEditing(false);
      }


     
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div className="container">
      <div className="main-info">
        <MDBBtn color="white" className="w-100" onClick={isEditing ? handleSave : handleEdit}>
          <MDBTypography variant="h6" color="warning">
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </MDBTypography>
        </MDBBtn>
      </div>

      <div className="secondary-info">
        <div className="information-header">Information</div>
        <div className="info-container">
          {isEditing ? (
            <div>
              {userRole === 'Advertiser' ? (
                <>
                  <MDBInput
                    label="Company Profile"
                    name="companyProfile"
                    value={userData.companyProfile}
                    onChange={handleChange}
                  />
                  <MDBInput
                    label="Website Link"
                    name="websiteLink"
                    value={userData.websiteLink}
                    onChange={handleChange}
                  />
                  <MDBInput
                    label="Hotline"
                    name="hotline"
                    value={userData.hotline}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <>
                  <MDBInput
                    label="Full Name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                  />
                  <MDBInput
                    label="description"
                    name="description"
                    value={userData.description}
                    onChange={handleChange}
                  />
                </>
              )}
            </div>
          ) : (
            <div>
              {userRole === 'Advertiser' ? (
                <>
                  <div>Company Profile: {userData.companyProfile}</div>
                  <div>Website Link: {userData.websiteLink}</div>
                  <div>Hotline: {userData.hotline}</div>
                </>
              ) : (
                <>
                  <div>Full Name: {userData.fullName}</div>
                  <div>Description: {userData.description}</div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default PersonalProfile