import React, { useState, useEffect } from 'react';
import "../components/adminflag.css"

const FlagActivity= () => {
  const [activities, setActivities] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch all activities on component mount
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/admin/activities'); // Adjust this route as per your backend
        const data = await response.json();
        setActivities(data.activities);
      } catch (error) {
        setErrorMessage('Error fetching activities');
      }
    };

    fetchActivities();
  }, []);

  const handleFlagActivity = async (activityId) => {
    setResponseMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(`/api/admin/activities/${activityId}/flag`, {
        method: 'PATCH',
      });
      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.message);
        setActivities(activities.map((activity) => 
            activity._id === activityId ? { ...activity, flagged: true } : activity
        ));
      } else {
        setErrorMessage(data.error || 'Error flagging activity');
      }
    } catch (error) {
      setErrorMessage('Error flagging activity');
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">Flag Activities</h2>
      {responseMessage && <p className="success-message">{responseMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="card-grid">
        
        {activities.map((activity) => (
          <div className="card" key={activity._id}>
            <div className="card-body">
              <p className="card-title">{activity.title}</p>
              <button
                onClick={() => handleFlagActivity(activity._id)}
                disabled={activity.flagged}
                className={`button ${activity.flagged ? 'button-disabled' : 'button-primary'}`}
              >
                {activity.flagged ? 'Already Flagged' : 'Flag'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlagActivity;