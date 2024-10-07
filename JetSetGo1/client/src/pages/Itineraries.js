import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


//components
import ItineraryDetails from "../components/ItineraryDetails"

const Itineraries = ({ filteredItinerary }) => {
    const [upcomingItineraries, setUpcomingItineraries] = useState(null);
  
    useEffect(() => {
      fetchItineraries();
    }, []);

    const fetchItineraries = async () => {
        const response = await fetch('/api/guests/getUpcomingItineraries')
        const json= await response.json()

        if (response.ok){
            setUpcomingItineraries(json)
        }
    }

    const fetchSortedByPrice = async () => {
        const response = await fetch('/api/guests/sortItineraryByPrice');
        const json = await response.json();

        if (response.ok) {
            setUpcomingItineraries(json);
        }
    }

    const fetchSortedByRating = async () => {
        const response = await fetch('/api/guests/sortItineraryByRating');
        const json = await response.json();

        if (response.ok) {
            setUpcomingItineraries(json);
        }
    }

    const itinerariesToShow = filteredItinerary || upcomingItineraries;

    return (
        <div className="itineraries">
            <nav>
                <ul>
                    <li><Link to="/activities">Activities</Link></li>
                    <li><Link to="/itineraries">Itineraries</Link></li>
                    <li><Link to="/museums">Museums</Link></li>
                    <li><Link to="/historicalLocations">Historical Locations</Link></li>
                </ul>
            </nav>
            
            {/* Sorting Buttons */}
            <div className="sorting-buttons" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button onClick={fetchSortedByPrice}>Sort by Price</button>
                <button onClick={fetchSortedByRating}>Sort by Rating</button>
            </div>

            <div className="upcomingItineraries">
            { itinerariesToShow && itinerariesToShow.length === 0 && 
            (
            <p>No results found</p>
            )}
                {itinerariesToShow && itinerariesToShow.map((Itinerary) => (
                    <ItineraryDetails key={Itinerary._id} Itinerary={Itinerary} />
                ))}
            </div>
        </div>
    )
}

export default Itineraries;