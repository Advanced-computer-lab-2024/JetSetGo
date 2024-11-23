import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MyBookingsPage = () => {
  const [transportBookings, setTransportBookings] = useState([]);
  const [activityBookings, setActivityBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transportDetails, setTransportDetails] = useState({});
  const [activityDetails, setActivityDetails] = useState({});
  const location = useLocation(); // Access state passed via Link
  const { id } = location.state || {}; // Access id from state
  const tourist = id;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Fetch transport bookings
        const transportResponse = await fetch(`http://localhost:3000/api/tourist/mytransports/${id}`);
        const transportData = await transportResponse.json();
        setTransportBookings(transportData);
        console.log("fetch 1 done");

        // Fetch activity/itinerary bookings
        const activityResponse = await fetch(`http://localhost:3000/api/tourist/myactivities/${id}`);
        const activityData = await activityResponse.json();
        setActivityBookings(activityData);
        console.log("fetch 2 done");
        setLoading(false);
      } catch (err) {
        setError('Error fetching bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  });

  // Fetch details for transport bookings
  const fetchTransportDetails = async (transportationId) => {
    try {
      const transportDetailsResponse = await fetch(`http://localhost:3000/api/advertisers/findtransport/${transportationId}`);
      const transportDetails = await transportDetailsResponse.json();
      console.log("fetch 3 done")
      setTransportDetails((prevDetails) => ({
        ...prevDetails,
        [transportationId]: transportDetails,
      }));
    } catch (err) {
      console.error('Error fetching transport details:', err);
      return null;
    }
  };

  // Fetch activity or itinerary details based on referenceType
  const fetchActivityOrItineraryDetails = async (referenceId, referenceType) => {
    try {
      const detailsResponse = await fetch(`http://localhost:3000/api/advertisers/findrefdetails/${referenceId}/${referenceType}`);
      const details = await detailsResponse.json();
      console.log("fetch 4 done")
      setActivityDetails((prevDetails) => ({
        ...prevDetails,
        [`${referenceId}-${referenceType}`]: details,
      }));
      console.log(details);
    } catch (err) {
      console.error('Error fetching activity/itinerary details:', err);
      return null;
    }
  };


  const cancelBooking = async (bookingId, type) => {
    try {
      const url = type === 'transport'
        ? `http://localhost:3000/api/tourist/deleteTransportBooking/${bookingId}`
        : `http://localhost:3000/api/tourist/cancel_booking`;


      const body = type === 'transport' ? undefined : JSON.stringify({ booking_id: bookingId }); // Only send the body for activities


      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Booking canceled successfully: ${result.message}`);
        // Remove the cancelled booking from the state
        if (type === 'transport') {
          setTransportBookings(transportBookings.filter(booking => booking._id !== bookingId));
        } else {
          setActivityBookings(activityBookings.filter(booking => booking._id !== bookingId));
        }
      } else {
        alert(result.message || 'Failed to cancel booking');
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
      alert('Error cancelling booking');
    }
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>My Bookings</h1>

      {/* Transport Bookings */}
      <h2>Transportation Bookings</h2>
      {transportBookings.length > 0 ? (
        transportBookings.map((booking) => (
          <div key={booking._id}>
            <h3>Booking Date: {new Date(booking.date).toLocaleDateString()}</h3>
            {transportDetails[booking.transportationId] ? (
              <div>
                <p>Vehicle Type: {transportDetails[booking.transportationId].vehicle}</p>
                <p>Car Model: {transportDetails[booking.transportationId].carModel}</p>
                <p>Location: {transportDetails[booking.transportationId].cLocation}</p>
                <p>Days: {transportDetails[booking.transportationId].days.join(', ')}</p>
                <p>Time: {transportDetails[booking.transportationId].time}</p>
                <p>Price: ${transportDetails[booking.transportationId].price}</p>
              </div>
            ) : (

              <button onClick={() => fetchTransportDetails(booking.transportationId)}>Load Details</button>
            )}
            <button onClick={() => cancelBooking(booking._id, 'transport')}>Cancel Booking</button>
          </div>
        ))
      ) : (
        <p>No transportation bookings found.</p>
      )}

      {/* Activity / Itinerary Bookings */}
      <h2>Activity & Itinerary Bookings</h2>
      {activityBookings.length > 0 ? (
        activityBookings.map((booking) => (
          
          <div key={booking._id}>
            <h3>Booking Reference Type: {booking.referenceType}</h3>
            {activityDetails[`${booking.referenceId}-${booking.referenceType}`] ? (
              <div>
                <p>{booking.referenceType} Name: {activityDetails[`${booking.referenceId}-${booking.referenceType}`].title}</p>
                {/* <p>Details: {activityDetails[`${booking.referenceId}-${booking.referenceType}`].details}</p> */}
                {/* <p>Date: {{activityDetails[${booking.referenceId}-${booking.referenceType}].date}}</p> */}
                <p>Date: {activityDetails[`${booking.referenceId}-${booking.referenceType}`].date}</p>
              </div>
            ) : (
              <button onClick={() => fetchActivityOrItineraryDetails(booking.referenceId, booking.referenceType)}>
                Load Details
              </button>
            )}
            <button onClick={() => cancelBooking(booking._id, 'activity')}>Cancel Booking</button>
          </div>
        ))
      ) : (
        <p>No activity or itinerary bookings found.</p>
      )}
    </div>
  );
};

export default MyBookingsPage;