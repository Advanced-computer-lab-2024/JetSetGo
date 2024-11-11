import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const ActivityList = ({ touristId }) => {
    const location = useLocation(); // Access state passed via Link
    const { id } = location.state || {}; // Access id from state
    touristId = id;
    console.log("touristId in page"+touristId);
    const [activities, setActivities] = useState([]);
    const [ratings, setRatings] = useState({});
    const [comment, setComment] = useState({});
    const [loading, setLoading] = useState(true);
    const [deletedComments, setDeletedComments] = useState({}); // Track deleted comments

    useEffect(() => {
        const fetchBookedActivities = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/tourist/activities/booked/${touristId}`);
                const { activities } = response.data;
                setActivities(activities);

                const ratingsResponse = await Promise.all(
                    activities.map(async (activity) => {
                        try {
                            const ratingRes = await axios.get(`http://localhost:8000/api/tourist/get_rating/${touristId}/${activity._id}`);
                            return { activityId: activity._id, rating: ratingRes.data.rating };
                        } catch (error) {
                            console.error("Error fetching rating for activity:", error);
                            return { activityId: activity._id, rating: 0 };
                        }
                    })
                );

                const initialRatings = ratingsResponse.reduce((acc, curr) => {
                    acc[curr.activityId] = curr.rating;
                    return acc;
                }, {});
                setRatings(initialRatings);
            } catch (error) {
                console.error('Error fetching booked activities or ratings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookedActivities();
    }, [touristId]);

    const handleRate = async (activityId, star) => {
        try {
            const response = await axios.put('http://localhost:8000/api/tourist/rating', {
                _id: touristId,
                star,
                activityId
            });

            const updatedRating = response.data.totalrating;
            const updatedActivities = activities.map(activity =>
                activity._id === activityId ? { ...activity, totalrating: updatedRating } : activity
            );

            setActivities(updatedActivities);
            setRatings(prevRatings => ({ ...prevRatings, [activityId]: star }));
        } catch (error) {
            console.error('Error rating activity:', error);
        }
    };
    const styles = {
        activityList: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px'
        },
        activityCard: {
            backgroundColor: '#f9f9f9',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            margin: '10px 0',
            width: '80%',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        },
        activityTitle: {
            margin: 0,
            fontSize: '24px',
            color: '#333'
        },
        activityDescription: {
            margin: '10px 0',
            fontSize: '16px',
            color: '#555'
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '4px'
        },
        button: {
            padding: '10px 20px',
            margin: '10px 5px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer'
        },
        buttonHover: {
            backgroundColor: '#0056b3'
        },
        comments: {
            marginTop: '20px'
        },
        comment: {
            backgroundColor: '#e9ecef',
            padding: '10px',
            borderRadius: '4px',
            margin: '5px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        userComment: {
            backgroundColor: '#d4edda',
        },
        otherComment: {
            backgroundColor: '#e9ecef',
        },
        star: {
            cursor: 'pointer',
            color: '#ccc',
            fontSize: '24px'
        },
        starFilled: {
            color: '#ffd700',
            fontSize: '24px'
        },
        deleteButton: {
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            padding: '5px 10px',
            marginLeft: '10px'
        }
    };
    const handleComment = async (activityId) => {
        if (!comment[activityId] || comment[activityId].trim() === '') return;

        try {
            const response = await axios.post('http://localhost:8000/api/tourist/comment', {
                _id: touristId,
                activityId,
                text: comment[activityId]
            });
            const updatedActivity = response.data;
            const updatedActivities = activities.map(activity =>
                activity._id === activityId ? updatedActivity : activity
            );

            setActivities(updatedActivities);
            setComment(prevComment => ({ ...prevComment, [activityId]: '' }));
        } catch (error) {
            console.error('Error adding comment to activity:', error);
        }
    };

    const handleDeleteComment = async (activityId, commentId) => {
        try {
            const response = await axios.delete('http://localhost:8000/api/tourist/del_comment', {
                data: { _id: touristId, activityId, commentId }
            });
            const updatedActivity = response.data;
            const updatedActivities = activities.map(activity =>
                activity._id === activityId ? updatedActivity : activity
            );

            setActivities(updatedActivities);
            setDeletedComments(prevState => ({ ...prevState, [commentId]: true })); // Mark comment as deleted
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div style={styles.activityList}>
            <h1>My Activities</h1>
            {loading ? (
                <p>Loading activities...</p>
            ) : (
                activities.map(activity => (
                    <div key={activity._id} style={styles.activityCard}>
                        <h2 style={styles.activityTitle}>{activity.title}</h2>
                        <p style={styles.activityDescription}>{activity.description}</p>
                        <p>Total Rating: {activity.totalrating || 0}</p>
                        <div>
                            {[1, 2, 3, 4, 5].map(star => (
                                <FaStar
                                    key={star}
                                    style={star <= (ratings[activity._id] || 0) ? styles.starFilled : styles.star}
                                    onClick={() => handleRate(activity._id, star)}
                                />
                            ))}
                        </div>
                        <textarea
                            value={comment[activity._id] || ''}
                            onChange={(e) => setComment({ ...comment, [activity._id]: e.target.value })}
                            placeholder="Add a comment"
                            style={styles.input}
                        />
                        <button
                            onClick={() => handleComment(activity._id)}
                            style={styles.button}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                            disabled={!comment[activity._id]?.trim()}
                        >
                            Comment
                        </button>
                        <div style={styles.comments}>
                            {activity.comments.map((c, idx) => (
                                !deletedComments[c._id] && ( // Do not render deleted comments
                                    <div
                                        key={idx}
                                        style={{
                                            ...styles.comment,
                                            ...(c.postedby._id === touristId ? styles.userComment : styles.otherComment)
                                        }}
                                    >
                                        <p>{c.text} - by {c.postedby.name}</p>
                                        {c.postedby._id === touristId && (
                                            <button
                                                style={styles.deleteButton}
                                                onClick={() => handleDeleteComment(activity._id, c._id)}
                                            >
                                                X
                                            </button>
                                        )}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ActivityList;
