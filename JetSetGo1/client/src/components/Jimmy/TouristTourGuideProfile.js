import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./TouristTourGuideProfile.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // You can use Material-UI's back arrow icon
import { IconButton } from "@mui/material";

function TouristTourGuideProfile() {
  const { id,guideId } = useParams();
  const touristId=id
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [followedItineraries, setFollowedItineraries] = useState([]);
  const [error, setError] = useState(null);
  const [touristUsername, setTouristUsername] = useState(""); // Store the tourist username
  const [usernames, setUsernames] = useState({}); // Store usernames for each touristId
  // Replace this with the actual touristId
  

  useEffect(() => {
    // Fetch the tourist's username
    fetch("http://localhost:8000/api/tourist/getTouristUsername", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ touristId }), // Sending touristId in the request body
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Username fetch error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setTouristUsername(data.username); // Set the fetched username
      })
      .catch((error) => setError("Error fetching tourist username: " + error));

    

    // Fetch itineraries by tour guide ID
    fetch("http://localhost:8000/api/tourist/getItinerariesByTourGuide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tourGuideId: guideId }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Itineraries fetch error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Itineraries data:", data);
        setItineraries(data);
      })
      .catch((error) => setError("Error fetching itineraries: " + error));

    // Fetch followed itineraries for the tourist
    fetch(`http://localhost:8000/api/tourist/followed/${touristId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Followed itineraries fetch error! status: ${res.status}`
          );
        }
        return res.json();
      })
      .then((data) => {
        console.log("Followed itineraries:", data);
        setFollowedItineraries(data);
      })
      .catch((error) =>
        setError("Error fetching followed itineraries: " + error)
      );
  }, [guideId, touristId]);

  useEffect(() => {
    // Fetch the tour guide profile and itineraries as before
    fetch(`http://localhost:8000/api/tour-guides/profile/${guideId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Profile fetch error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        // Extract unique tourist IDs from comments
        const uniqueTouristIds = [...new Set(data.comments.map(comment => comment.tourist))];
        // Fetch usernames for these unique tourist IDs
        Promise.all(
          uniqueTouristIds.map((touristId) =>
            fetch("http://localhost:8000/api/tourist/getTouristUsername", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ touristId })
            })
              .then(res => res.json())
              .then(({ username }) => ({ [touristId]: username }))
          )
        )
          .then(results => {
            const usernamesMap = Object.assign({}, ...results);
            setUsernames(usernamesMap);
          })
          .catch(error => setError("Error fetching usernames: " + error));
      })
      .catch((error) => setError("Error fetching tour guide profile: " + error));

    // Fetch itineraries and followed itineraries as before
  }, [guideId, touristId]);


  // Check if an itinerary is followed
  const isFollowed = (itineraryId) =>
    followedItineraries.some((followed) => followed._id === itineraryId);

  // Calculate average rating from the ratings array (each item has a tourist and rating)
  const calculateAverageRating = (ratings) => {
    if (ratings && ratings.length > 0) {
      const sum = ratings.reduce((acc, { rating }) => acc + rating, 0);
      return (sum / ratings.length).toFixed(1); // Round to 1 decimal
    }
    return "No ratings yet";
  };

  if (error) return <div>{error}</div>;
  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="tour-guide-profile">
      <h1>Tour Guide Profile</h1>
      {/* Back Button */}
      <IconButton onClick={() => navigate(-1)} color="primary" sx={{ mb: 2 }}>
        <ArrowBackIcon /> {/* Back arrow icon */}
      </IconButton>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Profile Details Card (Larger Width) */}
        <div
          className="profile-details-card"
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            width: "70%",
            marginBottom: "20px",
          }}
        >
          <h2>Profile Details</h2>
          <p>
            <strong>Username:</strong> {profile.username}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Previous Work:</strong> {profile.previousWork}
          </p>
          {/* Display the average rating */}
          <p>
            <strong>Rating:</strong> {calculateAverageRating(profile.ratings)}
          </p>
          {/* Button to add rating or comment */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
              marginLeft: "20px",
            }}
          >
            <Link to={`/tourist/${touristId}/add-rating-comment/${guideId}`}>
              <button
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add Rating/Comment
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tour Guide Comments Card */}
      {profile.comments && profile.comments.length > 0 && (
        <div className="comments-card" style={{ padding: "15px", border: "1px solid #ccc", borderRadius: "8px", marginBottom: "20px" }}>
          <h3>Tour Guide Comments</h3>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            {profile.comments.map((comment, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <p>
                  <strong>{usernames[comment.tourist] || "Unknown Tourist"}</strong> -{" "}
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
                <p>{comment.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Itinerary Table Card Outside the Profile Section */}
      <div
        className="itinerary-table-card"
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <h2>Itineraries</h2>
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Followed</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {itineraries.length > 0 ? (
              itineraries.map((itinerary) => (
                <tr key={itinerary._id}>
                  <td>{itinerary.title}</td>
                  <td>{isFollowed(itinerary._id) ? "Yes" : "No"}</td>
                  <td>
                    <Link to={`/tourist/${touristId}/TouristItineraryDetails/${itinerary._id}`}>
                      View Description
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">
                  No itineraries available for this tour guide.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TouristTourGuideProfile;
