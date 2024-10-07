import { useState, useEffect } from 'react'; // Add this line
import ActivityDetails from "../components/ActivityDetails";
import { Link } from 'react-router-dom'
import { trusted } from 'mongoose';

const Activities = ({ filteredActivities }) => {
    const [upcomingActivities, setUpcomingActivities] = useState(null);
    const [loading,setLoading ] = useState('')

    useEffect(() => {
        fetchActivities();
    }, []);

 
    const fetchActivities = async () => {
        const response = await fetch('/api/guests/getUpcomingActivities');
        const json = await response.json();

        if (response.ok) {
            setUpcomingActivities(json);
        }
    };

    const fetchSortedByPrice = async () => {
        console.log("PRICE CLICKED")
    }
    const fetchSortedByRating = async () => {
        console.log("RAITNG CLICKED")
    }
 

    let activitiesToShow = filteredActivities || upcomingActivities

 
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
                <button onClick={ fetchSortedByPrice}>Sort by Price</button>
                <button onClick={fetchSortedByRating}>Sort by Rating</button>
            </div>
            <div className="upcomingActivities">
                {loading && <p> Loading ...</p>}
                { activitiesToShow && activitiesToShow.length === 0 && 
                (
                <p>No results found</p>
                )}
                {activitiesToShow  && activitiesToShow.map((Activity) => (
                    <ActivityDetails key={Activity._id} Activity={Activity} />
                ) )}
            </div>
        </div>
    );

}


export default Activities;
