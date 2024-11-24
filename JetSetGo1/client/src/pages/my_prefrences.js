// MyPrefs.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import Cookies from "js-cookie"; // Import js-cookie
const MyPrefs = () => {
  // const { id } = useParams(); // Get user ID from URL
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const token = Cookies.get("auth_token");
  const decodedToken = jwtDecode(token);
  const id = decodedToken.id;
  console.log("id:", id);
  const modelName = decodedToken.userType;
  console.log("modelName:", modelName);
  // const { id } = location.state || {}; // Access the id from state


  // Fetch preferences for the specified user ID
  const fetchPreferences = async () => {
    try {
      console.log("fetching");
      const response = await axios.get(`/api/tourist/myPrefrences/${id}`);
      setPreferences(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching preferences');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Preferences for User ID: {id}</h2>
      {preferences ? (
        <div>
          <h3>Selected Tags:</h3>
          <ul>
            {preferences.tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
          <h3>Budget:</h3>
          <p>
            Lower Limit: {preferences.budget.from} <br />
            Upper Limit: {preferences.budget.to}
          </p>
        </div>
      ) : (
        <p>No preferences found for this user.</p>
      )}
    </div>
  );
};

export default MyPrefs;
