import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import ShareLink from '../components/ShareLink';

const ActivityDetailPage = () => {
    const { activityId, id } = useParams(); // Get activityId and id from URL
    console.log({ activityId, id })
    const [activity, setActivity] = useState(null);
    const [error, setError] = useState(null);
    const [tagNames, setTagNames] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [paymentMessage, setPaymentMessage] = useState('');

    // Fetch Activity Details
    useEffect(() => {
        const fetchActivityDetails = async () => {
            try {
                const response = await fetch(`/api/tourist/activity/${activityId}`);
                const data = await response.json();

                if (response.ok) {
                    setActivity(data);
                } else {
                    setError('Failed to fetch activity details');
                }
            } catch (err) {
                setError('An error occurred while fetching the activity details');
            }
        };

        fetchActivityDetails();
    }, [activityId]);

    // Fetch Tag Names
    useEffect(() => {
        const fetchTagNames = async () => {
            try {
                if (!activity?.tags) return;

                const names = [];
                for (const tagId of activity.tags) {
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

        if (activity) fetchTagNames();
    }, [activity]);

    // Fetch Category Name
    useEffect(() => {
        const fetchCategoryName = async () => {
            try {
                if (!activity?.category) return;

                const response = await fetch(`/api/tourist/categoryName/${activity.category}`);
                const data = await response.json();
                if (response.ok) {
                    setCategoryName(data.name);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error("Failed to fetch category name:", error);
            }
        };

        if (activity) fetchCategoryName();
    }, [activity]);

    // Handle Payment
    const handlePayment = async () => {
        try {
            const response = await fetch(`/api/tourist/payForActivity/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    activityId,
                }),
            });
            
            const data = await response.json();
            if (response.ok) {
                setPaymentMessage(data.message);
                setActivity(prevActivity => ({
                    ...prevActivity,
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
        return <p>{error}  lol</p>;
    }

    if (!activity) {
        return <p>Loading...</p>;
    }
    
    if (id) {
        return (
            <div className="activity-detail">
                <h2>{activity.title}</h2>
                <p><strong> Date: </strong>{activity.date}</p>
                <p><strong> Time: </strong>{activity.time}</p>
                <p><strong> Location: </strong>{activity.location}</p>
                <p><strong>Price:</strong> ${activity.price}</p>
                <p><strong>Category:</strong> {categoryName}</p>
                <p><strong>Tags:</strong> {tagNames.map((tag) => `#${tag}`).join(', ')}</p>
                <p><strong> Advertiser: </strong>{activity.advertiser}</p>
                <p><strong> Booking Open: </strong>{activity.bookingOpen}</p>
                <div className="adv-rating">
                  <p  className='rating'><strong> Rating: </strong>{activity.rating}</p>
                   <FaStar className="star-icon" />
                </div>
                <p><strong> Special Discounts: </strong>{activity.specialDiscounts}</p>
                
    
                {/* Payment button */}
                <div>
                    <button onClick={handlePayment} disabled={activity.isBookedYet}>
                        {activity.isBookedYet ? 'Already Booked' : 'Pay for Activity'}
                    </button>
                    <ShareLink/>
                </div>
    
                {/* Payment Message */}
                {paymentMessage && <p>{paymentMessage}</p>}
            </div>
        );
    } else{
        return (
            <div className="activity-detail">
                <h2>{activity.title}</h2>
                <p><strong> Date: </strong>{activity.date}</p>
                <p><strong> Time: </strong>{activity.time}</p>
                <p><strong> Location: </strong>{activity.location}</p>
                <p><strong>Price:</strong> ${activity.price}</p>
                <p><strong>Category:</strong> {categoryName}</p>
                <p><strong>Tags:</strong> {tagNames.map((tag) => `#${tag}`).join(', ')}</p>
                <p><strong> Advertiser: </strong>{activity.advertiser}</p>
                <p><strong> Booking Open: </strong>{activity.bookingOpen}</p>
                <div className="adv-rating">
                  <p  className='rating'><strong> Rating: </strong>{activity.rating}</p>
                   <FaStar className="star-icon" />
                </div>
                <p><strong> Special Discounts: </strong>{activity.specialDiscounts}</p>
                
            </div>
        );
    }
};

export default ActivityDetailPage;
