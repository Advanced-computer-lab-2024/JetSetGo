import React, { useState, useEffect } from 'react';

const FlagItinerary = () => {
  const [itineraries, setItineraries] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch all itineraries on component mount
    const fetchItineraries = async () => {
      try {
        const response = await fetch('/api/admin/itineraries'); // Adjust this route as per your backend
        const data = await response.json();
        setItineraries(data.itineraries);
      } catch (error) {
        setErrorMessage('Error fetching itineraries');
      }
    };

    fetchItineraries();
  }, []);

  const handleFlagItinerary = async (itineraryId) => {
    setResponseMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(`/api/admin/itineraries/${itineraryId}/flag`, {
        method: 'PATCH',
      });
      const data = await response.json();
      
      if (response.ok) {
        setResponseMessage(data.message);
        setItineraries(itineraries.map(itinerary => 
          itinerary._id === itineraryId ? { ...itinerary, flagged: true } : itinerary
        ));
      } else {
        setErrorMessage(data.error || 'Error flagging itinerary');
      }
    } catch (error) {
      setErrorMessage('Error flagging itinerary');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>All Itineraries</h2>
      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {itineraries.map((itinerary) => (
          <li key={itinerary._id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            <div>
              <strong>Title:</strong> {itinerary.title}<br />
              <strong>Flagged:</strong> {itinerary.flagged ? 'Yes' : 'No'}
            </div>
            <button
              onClick={() => handleFlagItinerary(itinerary._id)}
              disabled={itinerary.flagged}
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                backgroundColor: itinerary.flagged ? '#ccc' : '#007bff',
                color: '#fff',
                border: 'none',
                cursor: itinerary.flagged ? 'not-allowed' : 'pointer',
              }}
            >
              {itinerary.flagged ? 'Already Flagged' : 'Flag'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlagItinerary;
