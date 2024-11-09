import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TouristDashboard.css"; // Import the CSS file

const API_BASE_URL = "http://localhost:8000/api/tourist"; // Replace with your backend URL

// API Requests
const addRating = (data) => axios.post(`${API_BASE_URL}/addRating`, data);
const addComment = (data) => axios.post(`${API_BASE_URL}/addComment`, data);
const addItineraryRating = (data) =>
  axios.post(`${API_BASE_URL}/addItineraryRating`, data);
const addItineraryComment = (data) =>
  axios.post(`${API_BASE_URL}/addItineraryComment`, data);
const getCompletedTourGuides = (touristId) =>
  axios.get(`${API_BASE_URL}/completed/${touristId}`);
const getFollowedItineraries = (touristId) =>
  axios.get(`${API_BASE_URL}/followed/${touristId}`);

// Rating component for Tour Guide and Itinerary
const Rating = ({ itemId, touristId, type }) => {
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const data = { [type + "Id"]: itemId, touristId, rating };
    try {
      const response =
        type === "tourist"
          ? await addRating(data)
          : await addItineraryRating(data);
      alert(
        `${
          type === "tourist" ? "tourist" : "itinerary"
        } rating submitted successfully`
      );
    } catch (error) {
      setError("Failed to submit rating. Please try again.");
      console.error("Error adding rating:", error);
    }
  };

  return (
    <div className="card">
      <h3>Rate {type === "tourist" ? "tourist" : "itinerary"}</h3>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="input"
        placeholder="Rate 1-5"
      />
      <button onClick={handleSubmit} className="button">
        Submit Rating
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

// Comment component for Tour Guide and Itinerary
const Comment = ({ itemId, touristId, type }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const data = { [type + "Id"]: itemId, touristId, comment };
    try {
      const response =
        type === "tourist"
          ? await addComment(data)
          : await addItineraryComment(data);
      alert(
        `${
          type === "tourist" ? "tourist" : "itinerary"
        } comment submitted successfully`
      );
    } catch (error) {
      setError("Failed to submit comment. Please try again.");
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="card">
      <h3>Leave a Comment</h3>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="textarea"
        placeholder="Leave a comment"
      />
      <button onClick={handleSubmit} className="button">
        Submit Comment
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

// Component for displaying followed itineraries
const FollowedItineraries = ({ touristId }) => {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getFollowedItineraries(touristId);
        setItineraries(data);
      } catch (error) {
        console.error("Error fetching followed itineraries:", error);
      }
    };
    fetchData();
  }, [touristId]);

  return (
    <div className="card">
      <h3>Followed Itineraries</h3>
      <ul className="list">
        {itineraries.map((itinerary) => (
          <li key={itinerary._id} className="list-item">
            {itinerary.title}
            <Rating
              itemId={itinerary._id}
              touristId={touristId}
              type="itinerary"
            />
            <Comment
              itemId={itinerary._id}
              touristId={touristId}
              type="itinerary"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component for displaying completed tour guides
const CompletedTourGuides = ({ touristId }) => {
  const [tourGuides, setTourGuides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getCompletedTourGuides(touristId);
        setTourGuides(data);
      } catch (error) {
        console.error("Error fetching completed tour guides:", error);
      }
    };
    fetchData();
  }, [touristId]);

  return (
    <div className="card">
      <h3>Completed Tour Guides</h3>
      <ul className="list">
        {tourGuides.map((guide) => (
          <li key={guide._id} className="list-item">
            {guide.username}
            <Rating itemId={guide._id} touristId={touristId} type="tourist" />
            <Comment itemId={guide._id} touristId={touristId} type="tourist" />
          </li>
        ))}
      </ul>
    </div>
  );
};

const TouristDashboard = ({ touristId }) => (
  <div className="dashboard">
    <h1>Tourist Dashboard</h1>
    <div className="card-container">
      <CompletedTourGuides touristId={touristId} />
      <FollowedItineraries touristId={touristId} />
    </div>
  </div>
);

export default TouristDashboard;
