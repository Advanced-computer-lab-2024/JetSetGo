import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Typography, Divider, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // You can use Material-UI's back arrow icon
import "./TouristItineraryDetails.css";

function TouristItineraryDetails() {
  const { id } = useParams(); // Get itineraryId from the URL
  const [itinerary, setItinerary] = useState(null);
  const [touristUsername, setTouristUsername] = useState(""); // Store the tourist username
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  // Replace this with the actual touristId
  const touristId = "670670e70c449b57490188b7";

  useEffect(() => {
    // Fetch the tourist's username
    fetch("http://localhost:8000/api/tourist/getTouristUsername", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ touristId }), // Send touristId to the backend
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
      .catch((error) => {
        setError("Error fetching tourist username: " + error.message);
      });

    // Fetch the itinerary details by itineraryId
    fetch("http://localhost:8000/api/tourist/getSingleItinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itineraryId: id }), // Send itineraryId to the backend
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Itinerary fetch error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setItinerary(data); // Set fetched itinerary data
      })
      .catch((error) => {
        setError("Error fetching itinerary details: " + error.message);
      });
  }, [id, touristId]); // Refetch if itineraryId or touristId changes

  // Calculate the average rating (if ratings exist)
  const calculateAverageRating = (ratings) => {
    if (ratings && ratings.length > 0) {
      const sum = ratings.reduce((acc, { rating }) => acc + rating, 0);
      return (sum / ratings.length).toFixed(1); // Return the average rounded to 1 decimal
    }
    return "No ratings yet";
  };

  // Render error message if there's an error fetching data
  if (error) {
    return (
      <Typography variant="body1" color="error">
        {error}
      </Typography>
    );
  }

  // Render loading spinner or message until the data is loaded
  if (!itinerary) {
    return (
      <Typography variant="body1">Loading itinerary details...</Typography>
    );
  }

  return (
    <div className="itinerary-details">
      {/* Back Button */}
      <IconButton onClick={() => navigate(-1)} color="primary" sx={{ mb: 2 }}>
        <ArrowBackIcon /> {/* Back arrow icon */}
      </IconButton>

      <h1>Itinerary Details</h1>

      {/* Itinerary Details Card */}
      <div
        className="itinerary-details-card"
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "20px",
          width: "80%",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {itinerary.title}
        </Typography>

        <Typography variant="h6" color="textSecondary" gutterBottom>
          Price: ${itinerary.price}
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>Description:</strong> {itinerary.description}
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>Accessibility:</strong> {itinerary.accessibility}
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>Tags:</strong> {itinerary.tags.join(", ")}
        </Typography>

        {/* Display the average rating */}
        <Typography variant="body1" paragraph>
          <strong>Average Rating:</strong>{" "}
          {calculateAverageRating(itinerary.ratings)}
        </Typography>
      </div>

      {/* Rate/Comment Button */}
      <Link to={`/add-rating-comment-itinerary/${id}`}>
        <button variant="contained" color="primary">
          Rate/Comment
        </button>
      </Link>
      <Divider sx={{ my: 2 }} />

      {/* Comments Section Card */}
      {itinerary.comments && itinerary.comments.length > 0 && (
        <div className="comments-card">
          <Typography variant="h6">Comments</Typography>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            {itinerary.comments.map((comment, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                {comment.tourist ? (
                  <>
                    <p>
                      <strong>{touristUsername || "Unknown Tourist"}</strong> -{" "}
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                    <p>{comment.text}</p>
                  </>
                ) : (
                  <p>{comment.text}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TouristItineraryDetails;