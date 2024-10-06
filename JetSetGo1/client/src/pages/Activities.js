import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

//components
import ActivityDetails from "../components/ActivityDetails"

const Activities = () => {
    const [upcomingActivities, setUpcomingActivities] = useState(null)

    useEffect(() => {
        fetchActivities()
    }, [])

    const fetchActivities = async () => {
        const response = await fetch('/api/guests/getUpcomingActivities')
        const json= await response.json()

        if (response.ok){
            setUpcomingActivities(json)
        }
    }

    const fetchSortedByPrice = async () => {
        const response = await fetch('/api/guests/sortActivityByPrice');
        const json = await response.json();

        if (response.ok) {
            setUpcomingActivities(json);
        }
    }

    const fetchSortedByRating = async () => {
        const response = await fetch('/api/guests/sortActivityByRating');
        const json = await response.json();

        if (response.ok) {
            setUpcomingActivities(json);
        }
    }

    return (
        <div className="activities">
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

            <div className="upcomingActivities">
                {upcomingActivities && upcomingActivities.map((Activity) => (
                    <ActivityDetails key={Activity._id} Activity={Activity} />
                ))}
            </div>
        </div>
    )
}

export default Activities;