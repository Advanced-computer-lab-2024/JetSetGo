import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import Cookies from "js-cookie"; // Import js-cookie
//components
import HistoricalLocationDetails from "../components/HistoricalLocationDetails"

const HistoricalLocations = ({ filteredHistoricalPlace }) => {
    const [historicalLocations, setHistoricalLocations] = useState(null)
    const token = Cookies.get("auth_token");
    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;
    console.log("id:",id);
    const modelName = decodedToken.userType;
    console.log("modelName:",modelName);
    // const {id}= useParams();

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
            {/* <nav>
                <ul>
                    <li><Link to="/activities">Activities</Link></li>
                    <li><Link to="/itineraries">Itineraries</Link></li>
                    <li><Link to="/museums">Museums</Link></li>
                    <li><Link to="/historicalLocations">Historical Locations</Link></li>
                </ul>
            </nav> */}
            

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