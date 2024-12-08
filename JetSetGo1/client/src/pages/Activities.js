import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActivityFilter from "../components/ActivityFilter";

const Activities2 = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingTags, setLoadingTags] = useState(true);
  const [category, setCategory] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/tourist/getUpcomingActivities");
        const data = await response.json();
        setActivities(data);
        setFilteredActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    const filtered = activities.filter((activity) =>
      activity.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredActivities(filtered);
  }, [searchTerm, activities]);
  

  const handleFilter = (filteredData) => {
    setFilteredActivities(filteredData);
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating.star, 0);
    return (total / ratings.length).toFixed(1);
  };

  const renderStars = (rating) => {
    rating = calculateAverageRating(rating);
    if (!rating) return <p className="no-ratings">No ratings yet</p>;
    const stars = Array.from({ length: 5 }, (_, index) => {
      const filledValue = index + 1;
      if (filledValue <= Math.floor(rating)) return "full";
      if (filledValue - 0.5 === rating) return "half";
      return "empty";
    })};

    useEffect(() => {
        const fetchCategory = async () => {
          try {
            const response = await fetch('/api/admin/category');
            const data = await response.json();
            setCategory(data); 
          } catch (error) {
            console.error('Error fetching tags:', error);
          } finally {
            setLoadingTags(false);
          }
        };
        fetchCategory();
      }, []); 
      
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tourist/getTags');
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


  return (
    <div className="activities-page" style={{ display: "flex", position: "relative" }}>
      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px", width: "100%" }}>
        <h1 className="page-title">Explore Activities</h1>

       {/* Search Bar */}
       <div className="search-bar">
        <input
          type="text"
          placeholder="Search for Activities"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <span className="search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </span> */}
      </div>

      {/* Itineraries Section */}
      <div className="tags">
        {filteredActivities.map((activity) => (
          <div className="itinerary-card" key={activity._id}>
            <div className="card-header">
              {/* <img src={IT} alt={activity.title} className="card-image" /> */}
            </div>
            <div className="card-content">
              <div className="card-title">{activity.title || "Untitled activity"}</div>
              <div className="card-rating">
                <div className="rating">{renderStars(activity.ratings)}</div>
                ★ {calculateAverageRating(activity.ratings) > 0
                  ? `${calculateAverageRating(activity.ratings)} (${activity.ratings.length})`
                  : "0 (0)"}
              </div>
              <div className="card-description">
                {activity.description || "No description available."}
              </div>
              <div className="card-tags">
                <strong>🏷️ Tags: </strong>
                {loadingTags ? (
                  <span>Loading tags...</span>
                ) : (
                  activity.tags && Array.isArray(activity.tags) && activity.tags.length > 0 ? (
                    activity.tags
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
                {activity.price || "N/A"}
              </div>
              <div className="card-tags">
                <strong>🏷️ Category: </strong>
                {loadingTags ? (
                  <span>Loading tags...</span>
                ) : (
                  activity.category ? (
                    category
                      .filter(t => activity.category.includes(t._id))
                      .map(t => t.name)
                      .join(', ') || "No tags available"
                  ) : (
                    <span>No tags available</span>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
          </div>
        </div>

{/* Sidebar */}
<div
  className={`sidebar ${sidebarOpen ? "open" : ""}`}
  style={{
    position: "fixed",
    right: sidebarOpen ? "0" : "-300px",
    width: "300px",
    height: "100%",
    backgroundColor: "#f8f9fa",
    boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
    padding: "20px",
    transition: "right 0.3s ease-in-out",
    zIndex: 1000,
  }}
>
  <button
    onClick={() => setSidebarOpen(false)}
    style={{
      display: "block",
      margin: "0 auto 20px auto",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    Close
  </button>
  <ActivityFilter onFilter={handleFilter} />
</div>

{/* Toggle Sidebar Button */}
{!sidebarOpen && (
  <button
    onClick={() => setSidebarOpen(true)}
    style={{
      position: "fixed",
      top: "60px",
      right: "10px",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      zIndex: 1001,
    }}
  >
    Open Filter
  </button>
)}
    </div>
  );
};

export default Activities2;
