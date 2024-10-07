import { useState, useEffect } from 'react';
import ActivityDetails from "../components/ActivityDetails";
import { Link } from 'react-router-dom';
import ActivityFilter from '../components/ActivityFilter';  // Import ActivityFilter

const Activities = () => {
    const [upcomingActivities, setUpcomingActivities] = useState(null); // All activities fetched from backend
    const [filteredActivitiesState, setFilteredActivitiesState] = useState(null); // Holds activities after filtering
    const [sortedActivities, setSortedActivities] = useState(null); // Holds the currently sorted activities
    const [loading, setLoading] = useState('');

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        const response = await fetch('/api/guests/getUpcomingActivities');
        const json = await response.json();

        if (response.ok) {
            setUpcomingActivities(json);
            setFilteredActivitiesState(json); // Initialize with all activities by default
        }
    };

    // Sorting by price (ascending)
    const fetchSortedByPrice = () => {
        let activitiesToSort = filteredActivitiesState || upcomingActivities; // Use filtered activities if available, else use all
        if (activitiesToSort) {
            const sortedByPrice = [...activitiesToSort].sort((a, b) => a.price - b.price);
            setSortedActivities(sortedByPrice);
        }
    };

    // Sorting by rating (ascending)
    const fetchSortedByRating = () => {
        let activitiesToSort = filteredActivitiesState || upcomingActivities; // Use filtered activities if available, else use all
        if (activitiesToSort) {
            const sortedByRating = [...activitiesToSort].sort((a, b) => a.rating - b.rating);
            setSortedActivities(sortedByRating);
        }
    };

    // Function to handle search filter results (triggered by ActivityFilter component)
    const handleSearchFilter = (filteredActivities) => {
        if (filteredActivities.length > 0) {
            setFilteredActivitiesState(filteredActivities); // Store filtered activities
            setSortedActivities(null); // Reset sorting whenever a new filter is applied
        } else {
            setFilteredActivitiesState([]); // No results found
            setSortedActivities(null);
        }
    };

    // Show sorted activities if sorting is applied, otherwise show filtered or upcoming
    let activitiesToShow = sortedActivities || filteredActivitiesState || upcomingActivities;

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

            {/* Render ActivityFilter component */}
            <ActivityFilter onFilter={handleSearchFilter} />

            {/* Sorting Buttons */}
            <div className="sorting-buttons" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button onClick={fetchSortedByPrice}>Sort by Price</button>
                <button onClick={fetchSortedByRating}>Sort by Rating</button>
            </div>

            <div className="upcomingActivities">
                { activitiesToShow && activitiesToShow.length === 0 && 
                (
                <p>No results found</p>
                )}
                {activitiesToShow  && activitiesToShow.map((Activity) => (
                    <ActivityDetails key={Activity._id} Activity={Activity} />
                ))}
            </div>
        </div>
    );
};

export default Activities;
