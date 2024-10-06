const ItineraryDetails = ({ Itinerary }) => {
    return (
        <div className="itinerary-details">
            <h4>{Itinerary.title}</h4>
            <p><strong>Description: </strong>{Itinerary.description}</p>
            <p><strong>Tour Guide: </strong>{Itinerary.tourGuide}</p> {/* Assuming you fetch the name */}
            
            <p><strong>Activities: </strong>
                {Itinerary.activities.name.map((activityName, index) => (
                    <div key={index}>
                        {activityName} - Duration: {Itinerary.activities.duration[index]}
                    </div>
                ))}
            </p>
            
            <p><strong>Locations: </strong>{Itinerary.locations.join(', ')}</p>
            <p><strong>Timeline: </strong>{Itinerary.timeline.join(', ')}</p>
            <p><strong>Language: </strong>{Itinerary.language}</p>
            <p><strong>Price: </strong>{Itinerary.price}</p>
            
            <p><strong>Available Dates: </strong>
                {Itinerary.availableDates.map((dateObj, index) => (
                    <div key={index}>
                        {dateObj.date.toString()}: {dateObj.times.join(', ')}
                    </div>
                ))}
            </p>

            <p><strong>Accessibility: </strong>{Itinerary.accessibility}</p>
            <p><strong>Pick Up Location: </strong>{Itinerary.pickupLocation}</p>
            <p><strong>Drop Off Location: </strong>{Itinerary.dropoffLocation}</p>
            <p><strong>Rating: </strong>{Itinerary.rating}</p>
            <p><strong>Tags: </strong>{Itinerary.tags.join(', ')}</p> {/* Assuming you fetch tag names */}
            <p><strong>Is booked?: </strong>{Itinerary.isBooked ? 'Yes' : 'No'}</p>
            <p><strong>Created At: </strong>{new Date(Itinerary.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default ItineraryDetails;
