// CompletedTourGuides.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/tour-guides"; // Replace with your backend URL

const CompletedTourGuides = ({ touristId }) => {
  const [tourGuides, setTourGuides] = useState([]);

  useEffect(() => {
    const fetchCompletedTourGuides = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/completed/${touristId}`
        );
        setTourGuides(response.data);
      } catch (error) {
        console.error("Error fetching completed tour guides:", error);
      }
    };
    fetchCompletedTourGuides();
  }, [touristId]);

  return (
    <div className="completed-tour-guides">
      <h3>Completed Tour Guides</h3>
      <ul>
        {tourGuides.length > 0 ? (
          tourGuides.map((guide) => <li key={guide._id}>{guide.username}</li>)
        ) : (
          <p>No completed tour guides found.</p>
        )}
      </ul>
    </div>
  );
};

export default CompletedTourGuides;
