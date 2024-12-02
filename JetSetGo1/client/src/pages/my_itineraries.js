import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import IT from "../assets/images/ItPic.jpg";
import "./Myitinerariespage.css"; 

const Myitinerariespage = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loadingTags, setLoadingTags] = useState(true); 
  const [tags, setTags] = useState([]); 
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const token = Cookies.get("auth_token");
  const decodedToken = jwtDecode(token);
  const id = decodedToken.id;

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await fetch(`/api/tour-guides/showAll?guideId=${id}`);
        const data = await response.json();
        setItineraries(data);
      } catch (error) {
        setError('You don’t have itineraries yet.');
      }
    };
    fetchItineraries();
  }, [id]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/admin/tag');
        const data = await response.json();
        setTags(data); 
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setLoadingTags(false);
      }
    };
    fetchTags();
  }, []);   
  
  const calculateAverageRating = (ratings   ) => {
    if (!ratings || ratings.length === 0)    return 0;
    const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  const renderStars = (rating) => {
    rating = calculateAverageRating(rating);
    if (rating === null || rating === undefined) {
      return <p className="no-ratings">No ratings yet</p>;
    }
    const stars = Array.from({ length: 5 }, (_, index) => {
      const filledValue = index + 1;
      if (filledValue <= Math.floor(rating)) return "full";
      if (filledValue - 0.5 === rating) return "half";
      return "empty";
    });

    return (
      <div className="rating-stars">
        {stars.map((star, index) => (
          <span key={index} className={`star ${star}`} />
        ))}
      </div>
    );
  };

  const filteredItineraries = itineraries.filter((itinerary) =>
    itinerary.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      {/* Page Title */}
      <h1 className="page-title">My Itineraries</h1>

      {/* Search Bar */}
      <div className="search-bar">
      <input
    type="text"
    placeholder="Search for itineraries                                                                                                                🔍"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
<span className="search-icon">
  <i className="fas fa-search"></i>
</span>

</div>

      {/* Itineraries Section */}
      <div className="tags">
        {filteredItineraries.map((itinerary) => (
          <div className="itinerary-card" key={itinerary._id}>
            <div className="card-header">
              <img src={IT} alt={itinerary.title} className="card-image" />
            </div>
            <div className="card-content">
              <div className="card-title">{itinerary.title || "Untitled Itinerary"}</div>
              <div className="card-rating">
                <div className="rating">{renderStars(itinerary.ratings)}</div>
                ★ {calculateAverageRating(itinerary.ratings) > 0
                  ? `${calculateAverageRating(itinerary.ratings)} (${itinerary.ratings.length})`
                  : "0 (0)"}
              </div>
              <div className="card-description">
                {itinerary.description || "No description available."}
              </div>
              <div className="card-tags">
                <strong>🏷️ Tags: </strong>
                {loadingTags ? (
                  <span>Loading tags...</span>
                ) : (
                  itinerary.tags && Array.isArray(itinerary.tags) && itinerary.tags.length > 0 ? (
                    itinerary.tags
                      .map((tagId) => {
                        const tagItem = tags.find((t) => t._id === tagId);
                        return tagItem ? tagItem.tag_name : '';
                      })
                      .join(', ') || "No tags available"
                  ) : (
                    <span>No tags available</span>
                  )
                )}
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
        ))}
      </div>
    </div>
  );
};

export default Myitinerariespage;
