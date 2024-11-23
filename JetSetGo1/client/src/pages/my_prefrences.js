import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const MyPrefs = () => {
  const [preferences, setPreferences] = useState(null);
  const [tagNames, setTagNames] = useState([]); // To store tag names
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { id } = location.state || {}; // Access the id from state

  // Fetch preferences for the specified user ID
  const fetchPreferences = async () => {
    try {
      const response = await axios.get(`/api/tourist/myPrefrences/${id}`);
      setPreferences(response.data);
      fetchTagNames(response.data.tags); // Fetch tag names
    } catch (error) {
      setError("Error fetching preferences");
    } finally {
      setLoading(false);
    }
  };

  // Fetch tag names for a list of tag IDs
  const fetchTagNames = async (tagIds) => {
    try {
      const tagNamePromises = tagIds.map((tagId) =>
        axios.get(`/api/tourist/tagName/${tagId}`).then((res) => res.data.tag_name)
      );
      const names = await Promise.all(tagNamePromises);
      setTagNames(names);
    } catch (error) {
      console.error("Error fetching tag names:", error);
      setTagNames([]); // Default to an empty array if there's an error
    }
  };

  useEffect(() => {
    if (id) {
      fetchPreferences();
    }
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
            {tagNames.length > 0 ? (
              tagNames.map((name, index) => <li key={index}>{name}</li>)
            ) : (
              <li>No tags found</li>
            )}
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
