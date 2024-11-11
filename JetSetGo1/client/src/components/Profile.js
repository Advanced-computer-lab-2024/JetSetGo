import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  console.log("Extracted ID from URL:", id);

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/tour-guides/profile/${id}`);
        if (!response.ok) {
          throw new Error('You are not accepted on the system yet <3');
        }
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProfile();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <p><strong>Username:</strong> {profile.username || 'N/A'}</p>
      <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
      <p><strong>Mobile:</strong> {profile.mobile || 'N/A'}</p>
      <p><strong>Year(s) of experience:</strong> {profile.experience || 'N/A'}</p>
      <p><strong>Previous Work:</strong> {profile.previousWork || 'N/A'}</p>

      <button onClick={() => navigate(`/update-profile/tour-guides/${id}`)}>Update Profile</button>
    </div>
  );
};

export default Profile;
