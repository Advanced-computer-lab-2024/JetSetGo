import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookingsPage = ({ userId }) => {
  const [transportationBookings, setTransportationBookings] = useState([]);
  const [itineraryBookings, setItineraryBookings] = useState([]);

  useEffect(() => {
    // Fetch user's bookings on component mount
    const fetchBookings = async () => {
      try {
        // Fetch both transportation and itinerary bookings
        const response = await axios.get(`/api/bookings/${userId}`);
        
        // Update the state with fetched bookings
        setTransportationBookings(response.data.transportationBookings);
        setItineraryBookings(response.data.itineraryBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [userId]);

  const handleDeleteBooking = async (bookingId, type) => {
    // Handle booking cancellation if needed
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        // Send a delete request to remove the booking
        await axios.delete(`/api/bookings/cancel/${bookingId}`, { data: { type } });

        // Update the state to remove the deleted booking from the UI
        if (type === 'transportation') {
          setTransportationBookings((prev) => prev.filter((b) => b._id !== bookingId));
        } else {
          setItineraryBookings((prev) => prev.filter((b) => b._id !== bookingId));
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  return (
    <div>
      <h2>My Bookings</h2>

      <h3>Transportation Bookings</h3>
      {transportationBookings.length > 0 ? (
        transportationBookings.map((booking) => (
          <div key={booking._id}>
            <div>
              <p>Transportation ID: {booking.transportationId.name}</p>
              <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p>Seats: {booking.seats}</p>
              <button onClick={() => handleDeleteBooking(booking._id, 'transportation')}>
                X
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No transportation bookings found.</p>
      )}

      <h3>Itinerary/Activity Bookings</h3>
      {itineraryBookings.length > 0 ? (
        itineraryBookings.map((booking) => (
          <div key={booking._id}>
            <div>
              <p>{booking.referenceType}: {booking.referenceId.name}</p>
              <button onClick={() => handleDeleteBooking(booking._id, 'activity')}>
                X
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No itinerary/activity bookings found.</p>
      )}
    </div>
  );
};

export default MyBookingsPage;
