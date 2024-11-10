import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./userProfile.css";
import { MDBBtn, MDBTypography, MDBIcon, MDBInput } from 'mdb-react-ui-kit';

const PersonalProfile = () => {
  const { id, role } = useParams();
  const [userData, setUserData] = useState({
    fullName: '',
    description: '',
    companyProfile: '',
    websiteLink: '',
    hotline: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);

      try {
        if (!id) {
          throw new Error('Missing user ID');
        }

        let url;

        if (role.toLowerCase() === 'advertiser') {
          url = `/api/advertiser/profile/${id}`;
        } else if (role.toLowerCase() === 'seller') {
          url = `/api/seller/profile/${id}`;
        } else {
          throw new Error('Invalid user role');
        }

        const response = await axios.get(url);
        const data = response.data;

        if (role.toLowerCase() === 'advertiser' && !data.advertiser.accepted) {
          console.error('Advertiser profile creation not allowed: User not accepted.');
          return;
        } else if (role.toLowerCase() === 'seller' && !data.seller.accepted) {
          console.error('Seller profile creation not allowed: User not accepted.');
          return;
        }

        // Initialize userData based on role
        if (role.toLowerCase() === 'advertiser') {
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
  }, [id, role]);

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
      let url;
      if (role.toLowerCase() === 'advertiser') {
        url = `http://localhost:8000/api/advertisers/createProfile/${id}`;
      } else if (role.toLowerCase() === 'seller') {
        url = `http://localhost:8000/api/sellers/create/${id}`;
      } else {
        throw new Error('Invalid user role');
      }

      await axios.post(url, userData);

      console.log('Profile updated successfully!');
      setIsEditing(false);
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
              {role.toLowerCase() === 'advertiser' ? (
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
                    name="fullName"
                    value={userData.fullName}
                    onChange={handleChange}
                  />
                  <MDBInput
                    label="Description"
                    name="description"
                    value={userData.description}
                    onChange={handleChange}
                  />
                </>
              )}
            </div>
          ) : (
            <div>
              {role.toLowerCase() === 'advertiser' ? (
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

export default PersonalProfile;