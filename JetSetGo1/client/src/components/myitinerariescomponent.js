
const Myitinerarieselement = ({ tag: itinerary, dispatch }) => {

    
    
    return (
        <div className="tag-details">
            <h4>{itinerary.title}</h4>
      <h4>{itinerary._id}</h4>
      <p><strong>Description: </strong>{itinerary.description}</p>
      <p><strong>Tour Guide: </strong>{itinerary.tourGuide}</p>
      <p><strong>Activities: </strong>{itinerary.activities}</p>
      <p><strong>Locations: </strong>{itinerary.locations}</p>
      <p><strong>Timeline: </strong>{itinerary.timeline}</p>
      <p><strong>Language: </strong>{itinerary.language}</p>
      <p><strong>Price: </strong>{itinerary.price}</p>
      <p><strong>Available Dates: </strong>{itinerary.availableDates}</p>
      <p><strong>Accessibility: </strong>{itinerary.accessibility}</p>
      <p><strong>Pickup Location: </strong>{itinerary.pickupLocation}</p>
      <p><strong>Dropoff Location: </strong>{itinerary.dropoffLocation}</p>
      <p><strong>Rating: </strong>{itinerary.rating}</p>
      <p>{itinerary.createdAt}</p>

      
      <br />


        </div>
    );
};

export default Myitinerarieselement;
