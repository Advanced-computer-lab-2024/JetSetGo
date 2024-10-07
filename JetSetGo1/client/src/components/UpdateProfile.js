import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams to get the model and ID from the URL
import './UpdateProfile.css';

const UpdateProfile = () => {
  const { id} = useParams(); // Extract the profile ID and model from the URL
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    mobile: '',
    experience: '',
    previousWork: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For navigation after the update

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/tour-guides/profile/${id}`); // Dynamically use the model in the API endpoint
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch profile');
        }
        const data = await response.json();
        setFormValues({
          username: data.username || '',
          email: data.email || '',
          mobile: data.mobile || '',
          experience: data.experience || '',
          previousWork : data.previousWork || ''
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

     fetchProfile();
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update profile
  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`/api/tour-guides/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }
      //const updatedProfile = await response.json();
      navigate(`/profile/tour-guides/${id}`); // Redirect back to the profile page after a successful update
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="update-profile-container">
      <h2>Update Your Profile</h2>
      <form className="profile-form">
        <div className="form-group">
          <label htmlFor="username">Username <span className="required">*</span></label>
          <input
            type="text"
            id="username"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            required
          />
          <small>Choose a unique username.</small>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email <span className="required">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            required
          />
          <small>We’ll use this to contact you.</small>
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile <span className="required">*</span></label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formValues.mobile}
            onChange={handleInputChange}
            placeholder="Enter your mobile number"
            required
          />
          <small>Your contact number for communication.</small>
        </div>

        <div className="form-group">
          <label htmlFor="experience">Experience <span className="required">*</span></label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formValues.experience}
            onChange={handleInputChange}
            placeholder="Enter years of experience"
            required
          />
          <small>Enter the total number of years you’ve worked as a tour guide.</small>
        </div>

        <div className="form-group">
          <label htmlFor="previousWork">Previous Work</label>
          <textarea
            id="previousWork"
            name="previousWork"
            value={formValues.previousWork}
            onChange={handleInputChange}
            placeholder="Describe your previous work experience"
            rows="4"
          />
          <small>Briefly describe your previous experience in the industry.</small>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleUpdateProfile}>Save Changes</button>
          <button type="button" onClick={() => navigate(`/profile/tour-guides/${id}`)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
