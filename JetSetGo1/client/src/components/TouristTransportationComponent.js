import React, { useState, useEffect } from 'react';

const TransportBookingPage = () => {
  const [transports, setTransports] = useState([]);
  const [selectedTransport, setSelectedTransport] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [wallet, setWallet] = useState(3000000000000);
  const [seats, setSeats] = useState(1);
  const [bookingStatus, setBookingStatus] = useState('');

  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/advertisers/showTransportation');
        if (!response.ok) throw new Error('Error fetching transports');
        const data = await response.json();
        console.log('fetched transports: ', data);
        setTransports(data.filter(transport => transport.vehicle === 'car' || transport.capacity > 0));
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransports();
  }, []);


  const fetchTouristWallet = async () => {
    // const tourist = await fetch('http://localhost:8000/api/advertisers/profile/670255f97b12bc9e3f1c7f26');
    // const touristData = await tourist.json();
    // setWallet(touristData.wallet);
    // setWallet(30000000000000000);
    console.log('Wallet set to :', wallet);
  };

  const handleBooking = async () => {
    await fetchTouristWallet();
    console.log('Wallet value before checking funds:', wallet);
    if (!selectedTransport || !selectedTransport.vehicle) {
      setBookingStatus('Please select a valid transport first');
      return;
    }



    const transportId = selectedTransport._id;
    const price = selectedTransport.price;
    const totalCost = selectedTransport.vehicle === 'bus' ? price * seats : price;

    // Check for sufficient funds
    if (wallet < totalCost) {
      setBookingStatus('Insufficient funds');
      return;
    }

    // If it's a car, check availability on selected day and date
    if (selectedTransport.vehicle === 'car') {
      const selectedDay = new Date(selectedDate).toLocaleString('en-us', { weekday: 'long' });

      const availableDays = selectedTransport.days[0].split(', ').map(day => day.trim());

      console.log('Selected day:', selectedDay);
      console.log('Available days:', availableDays);

      // Check if selected day is in available days array
      if (!availableDays.includes(selectedDay)) {
        setBookingStatus('Sorry! This car is not available on this day');
        return;
      }

      // Check if car is already booked on selected date
      // const isAlreadyBooked = selectedTransport.bookings?.some(
      //   booking => new Date(booking.date).toISOString().split('T')[0] === new Date(selectedDate).toISOString().split('T')[0]
      // );
      // if (isAlreadyBooked) {
      //   setBookingStatus('Sorry! This car is already booked on this date');
      //   return;
      // }
    


      const response = await fetch('http://localhost:8000/api/tourist/newTransportBooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transportationId: transportId,
          touristId: '670255f97b12bc9e3f1c7f26',
          date: selectedDate,
        })
        
      });
  
      const result = await response.json();
  
      if (response.ok) {
        const newWalletBalance = wallet - totalCost;
        setWallet(newWalletBalance);
        setBookingStatus('Booking successful!');
        // setTransports(transports.map(t => (t._id === transportId ? result.updatedTransport : t)));
      } else {
        setBookingStatus(result.message);
      }
    } else {
      // Booking request for a bus

     
      const response = await fetch('http://localhost:8000/api/tourist/newTransportBooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transportationId: transportId,
          touristId: '670255f97b12bc9e3f1c7f26',
          seats: seats,
        })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        const newWalletBalance = wallet - totalCost;
        setWallet(newWalletBalance);
        setBookingStatus('Booking successful!');
        // setTransports(transports.map(t => (t._id === transportId ? result.updatedTransport : t)));
      } else {
        setBookingStatus(result.message);
      }
    }
  };

  return (
    <div>
      <h2>Available Transports</h2>
      <ul>
        {transports.map(transport => (
          <li key={transport._id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
            {/* <h3>{transport.vehicle === 'car' ? 'Car' : 'Bus'}</h3> */}

            {transport.vehicle === 'car' ? (
              <div>
                <p><strong>Car Model:</strong> {transport.carModel}</p>
                <p><strong>Location:</strong> {transport.cLocation}</p>
                <p><strong>Available Days:</strong> {transport.days.join(', ')}</p>
                <p><strong>Time:</strong> {transport.time}</p>
              </div>
            ) : (
              <div>
                <p><strong>Capacity: </strong> {transport.capacity}</p>
                <p><strong>Pickup Location:</strong> {transport.bLocation.pickup}</p>
                <p><strong>Dropoff Location:</strong> {transport.bLocation.dropoff}</p>
                <p><strong>Departure Day:</strong> {transport.days.join(', ')}</p>
                <p><strong>Departure Time:</strong> {transport.time}</p>
              </div>
            )}

            <p><strong>Price: </strong> {transport.price}</p>

            <p><strong>Rating: </strong>
              {transport.ratings && transport.ratings.length > 0
                ? (transport.ratings.reduce((total, rating) => total + rating, 0) / transport.ratings.length).toFixed(1)
                : 'No ratings yet'}
            </p>

            <button onClick={() => {
              setSelectedTransport(transport)
              console.log('Selected Transport:', transport);
            }}>+</button>
          </li>
        ))}
      </ul>

      {selectedTransport && selectedTransport.vehicle && (
        <div>
          <h3>Booking {selectedTransport.vehicle}</h3>
          {selectedTransport.vehicle === 'bus' ? (
            <div>
              <label>Seats: </label>
              <input
                type="number"
                value={seats}
                onChange={e => setSeats(Number(e.target.value))}
                min="1"
                max={selectedTransport.capacity}
              />
            </div>
          ) : (
            <div>
              <label>Date: </label>
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
              />
            </div>
          )}
          <button onClick={handleBooking} disabled={!selectedDate && selectedTransport.vehicle === 'car'}>Book and Pay</button>
          <p>{bookingStatus}</p>
        </div>
      )}
    </div>
  );
};

export default TransportBookingPage;



    // Proceed with booking

    
      // =============UPDATE WALLET IN TOURIST PROFILE==========

      // await fetch(`http://localhost:8000/api/tourist/updateWallet/670255f97b12bc9e3f1c7f26`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ wallet: newWalletBalance })
      // });