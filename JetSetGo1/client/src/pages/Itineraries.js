// Itineraries.js
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import ItineraryDetails from "../components/ItineraryDetails";
import ItineraryFilter from "../components/ItineraryFilter"; // Import the filter component

const Itineraries2 = () => {
    const [upcomingItineraries, setUpcomingItineraries] = useState(null);
    const [filteredItinerary, setFilteredItinerary] = useState([]); // State for filtered itineraries
    const [sortOrder, setSortOrder] = useState(''); // State for sorting order

    useEffect(() => {
        fetchItineraries();
    }, []);

    const fetchItineraries = async () => {
        const response = await fetch('/api/guests/getUpcomingItineraries');
        const json = await response.json();

        if (response.ok) {
            setUpcomingItineraries(json);
        }
    };

    // Sorting functions
    const sortByPrice = () => {
        const sorted = [...(filteredItinerary.length > 0 ? filteredItinerary : upcomingItineraries)].sort((a, b) => a.price - b.price);
        setFilteredItinerary(sorted);
        setSortOrder('price'); // Update sort order
    };

    const sortByRating = () => {
        const sorted = [...(filteredItinerary.length > 0 ? filteredItinerary : upcomingItineraries)].sort((a, b) => a.rating - b.rating);
        setFilteredItinerary(sorted);
        setSortOrder('rating'); // Update sort order
    };

    const itinerariesToShow = filteredItinerary.length > 0 ? filteredItinerary : upcomingItineraries;

    return (
        <div className="itineraries">
            {/* <nav>
                <ul>
                    <li><Link to="/activities">Activities</Link></li>
                    <li><Link to="/itineraries">Itineraries</Link></li>
                    <li><Link to="/museums">Museums</Link></li>
                    <li><Link to="/historicalLocations">Historical Locations</Link></li>
                </ul>
            </nav> */}
            
            {/* Itinerary Filter */}
            <ItineraryFilter onFilter={setFilteredItinerary} /> {/* Pass the state setter to filter */}

            {/* Sorting Buttons */}
            <div className="sorting-buttons" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button onClick={sortByPrice}>Sort by Price</button>
                <button onClick={sortByRating}>Sort by Rating</button>
            </div>

            <div className="product-grid">
                {itinerariesToShow && itinerariesToShow.length === 0 && <p>No results found</p>}
                {itinerariesToShow && itinerariesToShow.map((itinerary) => (
                    <Link key={itinerary._id} to={`/itinerary/${itinerary._id}/tourist/:touristId`}>
                    <ItineraryDetails Itinerary={itinerary} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Itineraries2;
