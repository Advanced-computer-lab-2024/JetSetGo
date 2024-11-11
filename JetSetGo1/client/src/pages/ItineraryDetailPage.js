import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import ShareLink from '../components/ShareLink';
import { useLocation } from 'react-router-dom';


const ItineraryDetailPage = () => {
    const location = useLocation(); // Access the location object
    // const { id } = location.state || {}; // Access the id from state
    const { itineraryId, id } = useParams(); // Get itineraryId and id from URL
    const [itinerary, setItinerary] = useState(null);
    const [error, setError] = useState(null);
    const [tagNames, setTagNames] = useState([]);
    const [paymentMessage, setPaymentMessage] = useState('');

    // Fetch Itinerary Details
    useEffect(() => {
        const fetchItineraryDetails = async () => {
            try {
                const response = await fetch(`/api/tourist/itinerary/${itineraryId}`);
                const data = await response.json();

                if (response.ok) {
                    setItinerary(data);
                } else {
                    setError('Failed to fetch itinerary details');
                }
            } catch (err) {
                setError('An error occurred while fetching the itinerary details');
            }
        };

        fetchItineraryDetails();
    }, [itineraryId]);

    // Fetch Tag Names
    useEffect(() => {
        const fetchTagNames = async () => {
            try {
                if (!itinerary?.tags) return;

                const names = [];
                for (const tagId of itineraryId.tags) {
                    const response = await fetch(`/api/tourist/tagName/${tagId}`);
                    const data = await response.json();
                    if (response.ok) {
                        names.push(data.tag_name);
                    } else {
                        console.error(data.error);
                    }
                }
                setTagNames(names);
            } catch (error) {
                console.error("Failed to fetch tag names:", error);
            }
        };

        if (itineraryId) fetchTagNames();
    }, [itineraryId]);


    // Handle Payment
    const handlePayment = async () => {
        try {
            const response = await fetch(`/api/tourist/payForItinerary/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    itineraryId,
                }),
            });
            
            const data = await response.json();
            if (response.ok) {
                setPaymentMessage(data.message);
                setItinerary(prevItinerary => ({
                    ...prevItinerary,
                    isBookedYet: true,
                }));
            } else {
                setPaymentMessage(data.message || 'Payment failed');
            }
        } catch (error) {
            console.error('Error in payment:', error);
            setPaymentMessage('An error occurred during payment');
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!itinerary) {
        return <p>Loading...</p>;
    }

    return (
        <div className="itinerary-detail">
            <h2>{itinerary.title}</h2>
            <p><strong>Description: </strong>{itinerary.description}</p>
            <p><strong>Tour Guide: </strong>{itinerary.tourGuide}</p>
            <p><strong>Activities: </strong>
                {itinerary.activities.name.map((activityName, index) => (
                    <div key={index}>
                        {activityName} - Duration: {itinerary.activities.duration[index]}
                    </div>
                ))}
            </p>
            
            <p><strong>Locations: </strong>{itinerary.locations.join(', ')}</p>
            <p><strong>Timeline: </strong>{itinerary.timeline.join(', ')}</p>
            <p><strong>Language: </strong>{itinerary.language}</p>
            <p><strong>Price:</strong> ${itinerary.price}</p>

            <p><strong>Available Dates: </strong>
                {itinerary.availableDates.map((dateObj, index) => (
                    <div key={index}>
                        {dateObj.date.toString()}: {dateObj.times.join(', ')}
                    </div>
                ))}
            </p>

            <p><strong>Accessibility: </strong>{itinerary.accessibility}</p>
            <p><strong>Pick Up Location: </strong>{itinerary.pickupLocation}</p>
            <p><strong>Drop Off Location: </strong>{itinerary.dropoffLocation}</p>
            <p><strong>Tags:</strong> {tagNames.map((tag) => `#${tag}`).join(', ')}</p>

            <div className="adv-rating">
              <p  className='rating'><strong> Rating: </strong>{itinerary.rating}</p>
               <FaStar className="star-icon" />
            </div>
            

            {/* Payment button */}
            <div>
                <button onClick={handlePayment} disabled={itinerary.isBookedYet}>
                    {itinerary.isBookedYet ? 'Already Booked' : 'Pay for Itinerary'}
                </button>
                <ShareLink/>
            </div>

            {/* Payment Message */}
            {paymentMessage && <p>{paymentMessage}</p>}
        </div>
    );
};

export default ItineraryDetailPage;
