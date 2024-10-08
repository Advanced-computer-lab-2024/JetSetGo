
import Mydateselement from '../components/Mydateselement.js'


const Myitinerarieselement = ({ tag: itinerary, dispatch }) => {



        

    
    const dates = itinerary.availableDates;



    return (
        <div className="tag-details">
            <h4>{itinerary.title}</h4>
            <h4>{itinerary._id}</h4>
            <p><strong>Description: </strong>{itinerary.description}</p>
            <p><strong>Tour Guide: </strong>{itinerary.tourGuide}</p>
            <p><strong>Activities: </strong>{itinerary.activities.name}</p>
            <p><strong>Activities: </strong>{itinerary.activities.duration}</p>
            <p><strong>Locations: </strong>{itinerary.locations}</p>
            <p><strong>Timeline: </strong>{itinerary.timeline}</p>
            <p><strong>Language: </strong>{itinerary.language}</p>
            <p><strong>Price: </strong>{itinerary.price}</p>
            {/* <p><strong>
            Available Dates: 
            </strong>{itinerary.availableDates}</p> */}
            {/* {dates && dates.map((tag) => (
                // <p key={tag.tag_name}>{tag.tag_name}</p>
                // <tagelement tag={tag}/>
                <Mydateselement tag={tag} />
            ))} */}
            <p><strong>Accessibility: </strong>{itinerary.accessibility}</p>
            <p><strong>Pickup Location: </strong>{itinerary.pickupLocation}</p>
            <p><strong>Dropoff Location: </strong>{itinerary.dropoffLocation}</p>
            {dates && dates.map((tag) => (
                // <p key={tag.tag_name}>{tag.tag_name}</p>
                // <tagelement tag={tag}/>
                <Mydateselement tag={tag} />
            ))}
            <p><strong>Rating: </strong>{itinerary.rating}</p>
            <p>{itinerary.createdAt}</p>


            <br />


        </div>
    );
};

export default Myitinerarieselement;
