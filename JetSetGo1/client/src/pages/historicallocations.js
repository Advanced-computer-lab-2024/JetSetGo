import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


//components
import HistoricalLocationDetails from "../components/HistoricalLocationDetails"

const HistoricalLocations = ({ filteredHistoricalPlace }) => {
    const [historicalLocations, setHistoricalLocations] = useState(null)
    
    const {id}= useParams();

    useEffect(() => {
        fetchHistoricalLocations()
    }, [])

    const fetchHistoricalLocations = async () => {
        const response = await fetch('/api/guests/getHistoricalLocations')
        const json= await response.json()

        if (response.ok){
            setHistoricalLocations(json);
        }
    }

    const activitiesToShow = filteredHistoricalPlace || historicalLocations;

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
            

            <div className="upcomingHistoricalLocations">
            { activitiesToShow && activitiesToShow.length === 0 && 
                (
                <p>No results found</p>
                )}
            {activitiesToShow && activitiesToShow.map((location) => (
                    <HistoricalLocationDetails key={location._id} HistoricalLocation={location} />
                ))}
                {/* {(filteredLocations || historicalLocations) && (filteredLocations.length ? 
                    filteredLocations.map((location) => (
                        <HistoricalLocationDetails key={location._id} HistoricalLocation={location} />
                    )) : <p>No historical locations found.</p>
                )} */}
            </div>
        </div>
    )
}

export default HistoricalLocations;