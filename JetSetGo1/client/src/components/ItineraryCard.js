import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IT from "../assets/images/ItPic.jpg";
import "./ItineraryCard.css"; // Separate CSS for the card

const ItineraryCard = ({ itinerary }) => {
  const [tags, setTags] = useState([]);
  const [loadingTags, setLoadingTags] = useState(true); // Added state to track if tags are loading
  const [itineraryTags,setItineraryTags] = useState("")

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tourist/getTags');
        const data = await response.json();
        console.log(data)
        setTags(data); // Set tags from API
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setLoadingTags(false); // Once tags are loaded, set loading to false
      }

      const result =  itinerary.tags && Array.isArray(itinerary.tags) && itinerary.tags.length > 0 
    ? itinerary.tags
        .map((tagId) => {
          const tagItem = tags.find((t) => t._id === tagId);
          return tagItem ? tagItem.tag_name : "";
        })
        .join(", ")
    : "No tags available"; // Default message if no tags available or if itinerary.tags is not an array
    };
    fetchTags();
  }, []);

  // Safely handle itinerary.tags (default to empty array if undefined or null)
  

  return (
    <div className="itinerary-card" key={itinerary._id}>
      <div className="card-header">
        <img src={IT} alt={itinerary.title} className="card-image" />
      </div>
      <div className="card-content">
        <div className="card-title">{itinerary.title || "Untitled Itinerary"}</div>
        <div className="card-rating">
          <div className="rating">{renderStars(itinerary.ratings)}</div>
          ★{" "}
          {calculateAverageRating(itinerary.ratings) > 0
            ? `${calculateAverageRating(itinerary.ratings)} (${itinerary.ratings.length})`
            : "0 (0)"}
        </div>
        <div className="card-description">{itinerary.description || "No description available."}</div>
        <div className="card-tags">
          <strong>🏷️ Tags: </strong>
          {loadingTags ? <span>Loading tags...</span> : <span>{itineraryTags}</span>}
        </div>
        <div className="card-price">
          <strong>$</strong>
          {itinerary.price || "N/A"}
        </div>
      </div>
      <Link to={`/itinerary/${itinerary._id}`} className="view-more-btn">
        View More
      </Link>
    </div>
  );
};

// Helper functions to calculate ratings and render stars (assuming they are defined elsewhere)
const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;
  const total = ratings.reduce((acc, rating) => acc + rating, 0);
  return total / ratings.length;
};

const renderStars = (ratings) => {
  const avgRating = calculateAverageRating(ratings);
  let stars = "";
  for (let i = 0; i < 5; i++) {
    if (i < avgRating) stars += "★";
    else stars += "☆";
  }
  return stars;
};

export default ItineraryCard;
