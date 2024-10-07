import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


//components
import HistoricalLocationDetails from "../components/HistoricalLocationDetails"

const HistoricalLocations = () => {
    const [historicalLocations, setHistoricalLocations] = useState(null)
    const [tagId, setTagId] = useState(''); // State for tag ID
    const [filteredLocations, setFilteredLocations] = useState(null); // State for filtered locations
    
    useEffect(() => {
        fetchHistoricalLocations()
    }, [])

    const fetchHistoricalLocations = async () => {
        const response = await fetch('/api/guests/getHistoricalLocations')
        const json= await response.json()

        if (response.ok){
            setHistoricalLocations(json);
            setFilteredLocations(json); // Initialize filtered locations with all locations
        }
    }

    const handleFilter = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Fetch historical locations filtered by tagId
        const response = await fetch(`/api/guests/filterHistoricalLocationsByTag/${tagId}`);
        const json = await response.json();

        if (response.ok) {
            setFilteredLocations(json); // Update filtered locations
        } else {
            // Handle no locations found or error
            alert(json.message || 'Error fetching historical locations');
            setFilteredLocations(null); // Clear filtered locations on error
        }
    }

    return (
        <div className="historicalLocations">
            <nav>
                <ul>
                    <li><Link to="/activities">Activities</Link></li>
                    <li><Link to="/itineraries">Itineraries</Link></li>
                    <li><Link to="/museums">Museums</Link></li>
                    <li><Link to="/historicalLocations">Historical Locations</Link></li>
                </ul>
            </nav>
            
            <form onSubmit={handleFilter}>
                <input
                    type="text"
                    placeholder="Enter tag ID"
                    value={tagId}
                    onChange={(e) => setTagId(e.target.value)} // Update tagId state on input change
                />
                <button type="submit">Filter Locations</button>
            </form>

            <div className="upcomingHistoricalLocations">
                {(filteredLocations || historicalLocations) && (filteredLocations.length ? 
                    filteredLocations.map((location) => (
                        <HistoricalLocationDetails key={location._id} HistoricalLocation={location} />
                    )) : <p>No historical locations found.</p>
                )}
            </div>
        </div>
    )
}

export default HistoricalLocations;