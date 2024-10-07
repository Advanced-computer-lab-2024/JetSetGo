import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


//components
import MuseumDetails from "../components/MuseumDetails"

const Museums = () => {
    const [museums, setMuseums] = useState(null)
    const [tagId, setTagId] = useState(''); // State for tag ID
    const [filteredMuseums, setFilteredMuseums] = useState(null); // State for filtered museums

    useEffect(() => {
        fetchMuseums()
    }, [])

    const fetchMuseums = async () => {
        const response = await fetch('/api/guests/getMuseums')
        const json= await response.json()

        if (response.ok){
            setMuseums(json);
            setFilteredMuseums(json); // Initialize filtered museums with all museum
        }
    }

    const handleFilter = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Fetch museums filtered by tagId
        const response = await fetch(`/api/guests/filterMuseumsByTag/${tagId}`);
        const json = await response.json();

        if (response.ok) {
            setFilteredMuseums(json); // Update filtered museums
        } else {
            // Handle no museums found or error
            alert(json.message || 'Error fetching museums');
            setFilteredMuseums(null); // Clear filtered museums on error
        }
    }

    return (
        <div className="museums">
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
                <button type="submit">Filter Museums</button>
            </form>

            <div className="upcomingMuseums">
                {(filteredMuseums || museums) && (filteredMuseums.length ? 
                    filteredMuseums.map((museum) => (
                        <MuseumDetails key={museum._id} Museum={museum} />
                    )) : <p>No museums found.</p>
                )}
            </div>
        </div>
    )
}

export default Museums;