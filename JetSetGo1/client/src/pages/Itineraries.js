import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// Components
import ItineraryDetails from "../components/ItineraryDetails";
import ItineraryCard from "../components/ItineraryCard";
import ItineraryFilter from "../components/ItineraryFilter";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Itineraries2 = () => {
  const location = useLocation();
  const token = Cookies.get("auth_token");
  const decodedToken = jwtDecode(token);
  const id = decodedToken.id;
  const modelName = decodedToken.userType;

  const [upcomingItineraries, setUpcomingItineraries] = useState(null);
  const [filteredItinerary, setFilteredItinerary] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar
  const [nameFilter, setNameFilter] = useState(''); // Name filter state

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    const response = await fetch('/api/guests/getUpcomingItineraries');
    const json = await response.json();

    if (response.ok) {
      setUpcomingItineraries(json);
      setFilteredItinerary(json); // Initialize filtered itineraries
    }
  };

  // Sorting functions
  const sortByPrice = () => {
    const sorted = [...filteredItinerary].sort((a, b) => a.price - b.price);
    setFilteredItinerary(sorted);
    setSortOrder('price');
  };

  const sortByRating = () => {
    const sorted = [...filteredItinerary].sort((a, b) => a.rating - b.rating);
    setFilteredItinerary(sorted);
    setSortOrder('rating');
  };

  // Live Name Filtering
  useEffect(() => {
    if (upcomingItineraries) {
      const filtered = upcomingItineraries.filter((itinerary) =>
        itinerary.title.toLowerCase().includes(nameFilter.toLowerCase())
      );
      setFilteredItinerary(filtered);
    }
  }, [nameFilter, upcomingItineraries]);

  return (
    <div className="itineraries" style={{ display: 'flex', position: 'relative' }}>
      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px', width: '100%' }}>
        {/* Name Filter */}
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <input
            type="text"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="Search by name..."
            style={{
              padding: '10px',
              width: '300px',
              borderRadius: '5px',
              border: '1px solid #ddd',
            }}
          />
        </div>

        {/* Sorting Buttons */}
        <div className="sorting-buttons" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={sortByPrice}
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Sort by Price
          </button>
          <button
            onClick={sortByRating}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Sort by Rating
          </button>
        </div>

        {/* Itineraries Grid */}
        <div
          className="product-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)', // Set exactly 4 columns
            gap: '20px', // Space between items
          }}
        >
          {filteredItinerary && filteredItinerary.length === 0 && <p>No results found</p>}
          {filteredItinerary &&
            filteredItinerary.map((itinerary) => (
              <Link key={itinerary._id} to={`/tourist/itinerary/${itinerary._id}/tourist/${id}`}>
                <ItineraryDetails Itinerary={itinerary} />
              </Link>
            ))}
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`sidebar ${sidebarOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          right: sidebarOpen ? '0' : '-250px',
          width: '250px',
          height: '100%',
          backgroundColor: '#f8f9fa',
          boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
          padding: '20px',
          transition: 'right 0.3s ease-in-out',
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          style={{
            display: 'block',
            margin: '0 auto 20px auto',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
        <ItineraryFilter onFilter={setFilteredItinerary} />
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        style={{
          position: 'fixed',
          top: '60px', // Adjust based on your navbar height
          right: '10px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1001,
        }}
      >
        Open Filter
      </button>
    </div>
  );
};

export default Itineraries2;
