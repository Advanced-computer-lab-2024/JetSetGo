import React, { useState, useEffect } from 'react';

const ItineraryManagement = () => {
  const [itineraries, setItineraries] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all itineraries on component mount
    const fetchItineraries = async () => {
      try {
        const response = await fetch('/api/tour-guides/getItineraries'); // Adjust this route as per your backend
        const data = await response.json();
        setItineraries(data);
      } catch (error) {
        setError('Error fetching itineraries');
      }
    };

    fetchItineraries();
  }, []);

  // Activate or deactivate an itinerary
  const toggleItineraryStatus = async (id, activate) => {
    setMessage('');
    setError('');

    try {
      const response = await fetch(`/api/tour-guides/itineraries/${activate ? 'activate' : 'deactivate'}/${id}`, {
        method: 'PATCH',
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setItineraries(itineraries.map(itinerary =>
          itinerary._id === id ? { ...itinerary, active: activate } : itinerary
        ));
      } else {
        setError(data.message || 'Error updating itinerary status');
      }
    } catch (error) {
      setError('Error updating itinerary status');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Itinerary Management</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {itineraries.map((itinerary) => (
          <li key={itinerary._id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            <div>
              <strong>Title:</strong> {itinerary.title}<br />
              <strong>Active:</strong> {itinerary.active ? 'Yes' : 'No'}
            </div>
            <button
              onClick={() => toggleItineraryStatus(itinerary._id, true)}
              disabled={itinerary.active}
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                backgroundColor: itinerary.active ? '#ccc' : '#28a745',
                color: '#fff',
                border: 'none',
                cursor: itinerary.active ? 'not-allowed' : 'pointer',
              }}
            >
              {itinerary.active ? 'Already Active' : 'Activate'}
            </button>
            <button
              onClick={() => toggleItineraryStatus(itinerary._id, false)}
              disabled={!itinerary.active}
              style={{
                marginTop: '10px',
                marginLeft: '10px',
                padding: '8px 12px',
                backgroundColor: !itinerary.active ? '#ccc' : '#dc3545',
                color: '#fff',
                border: 'none',
                cursor: !itinerary.active ? 'not-allowed' : 'pointer',
              }}
            >
              {!itinerary.active ? 'Already Deactivated' : 'Deactivate'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryManagement;
