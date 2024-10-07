import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use React Router to navigate to the UpdateProfile component
import './Profile.css';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const {id} = useParams();
  console.log("Extracted ID from URL:", id);
  
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // React Router hook to handle navigation

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/tour-guides/profile/${id}`); // Dynamically use the model in the API endpoint
        if (!response.ok) {
          
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        
        setProfile(data);
      } catch (err) {
        
        setError(err.message);
        
      } finally {
        setLoading(false);
      }
    };

  if(id) fetchProfile();
  }, [id]);

  if (loading) return <div></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-container">
      
   
      <p><strong>Username:</strong> {profile.username || 'N/A'}</p>
      <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
      <p><strong>Mobile:</strong> {profile.mobile || 'N/A'}</p>
      <p><strong>Year(s) of experience:</strong> {profile.experience || 'N/A'}</p>
      <p><strong>Previous Work:</strong> {profile.previousWork || 'N/A'}</p>

      {/* Button to navigate to UpdateProfile component */}
      <button onClick={() => navigate(`/update-profile/tour-guides/${id}`)}>Update Profile</button>
    </div>
  );
};

export default Profile;
