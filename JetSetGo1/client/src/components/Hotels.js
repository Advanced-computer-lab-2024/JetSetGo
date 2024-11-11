// In Hotels.js
import React, { useEffect, useState } from "react";
import { getHotels } from "../api";
import dayjs from "dayjs";
import axios from "axios"; // Import axios for making HTTP requests

const Hotels = ({ cityCode, checkInDate, checkOutDate, adults, touristId }) => {
    const [loading, setLoading] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState(null);
    console.log(touristId);
    useEffect(() => {
        if (!cityCode || !checkInDate || !checkOutDate || !adults) {
            setHotels([]);
            return;
        }

        setLoading(true);
        setError(null);

        const formattedCheckInDate = dayjs(checkInDate).format("YYYY-MM-DD");
        const formattedCheckOutDate = dayjs(checkOutDate).format("YYYY-MM-DD");

        getHotels(cityCode, formattedCheckInDate, formattedCheckOutDate, adults)
            .then((hotelsData) => {
                setHotels(hotelsData || []);
            })
            .catch((error) => {
                console.error("Error fetching hotels:", error);
                setError("Unable to load hotels. Please try again later.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [cityCode, checkInDate, checkOutDate, adults]);

    const handleBooking = async (hotel) => {
        const bookingData = {
            touristId,///670255f97b12bc9e3f1c7f26
            hotelId: hotel.id,///5LLRH32QHL
            name: hotel.name,//Fairfield by Marriott Inn and Suites Seattle Sea-Tac Airport
            address: hotel.address,//undefined
            room: hotel.room,//undefined
            boardType: hotel.boardType,//undefined
            checkInDate: checkInDate,//2024-11-12
            checkOutDate: checkOutDate,//2024-11-14
            price: hotel.price,//275.13
            currency: hotel.currency,//USD
            adults: adults,//
        };
        console.log(touristId,
            hotel.id,
            hotel.offerId,
            hotel.name,
            hotel.address,
            hotel.room,
            hotel.boardType,
            checkInDate,
            checkOutDate,
            hotel.price,
            hotel.currency,
            adults,);
        try {
            const response = await axios.post("http://localhost:8000/api/tourist/bookhotel", bookingData);
            alert("Booking saved successfully!");
        } catch (error) {
            console.error("Error saving booking:", error.message);
            alert("Error saving booking. Please try again.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={styles.container}>
            {hotels.length > 0 ? (
                hotels.map((hotel) => (
                    <div key={`${hotel.hotelId}-${hotel.offerId}`} style={styles.hotelBox}>
                        <h2 style={styles.hotelName}>{hotel.name || "Hotel Name Not Available"}</h2>
                        <p style={styles.address}>{hotel.address?.lines?.join(", ") || "Address Not Available"}</p>
                        <p><strong>Room:</strong> {hotel.room || "N/A"}</p>
                        <p><strong>Board Type:</strong> {hotel.boardType || "N/A"}</p>
                        <p><strong>Check-in:</strong> {hotel.checkInDate}</p>
                        <p><strong>Check-out:</strong> {hotel.checkOutDate}</p>
                        <p><strong>Price:</strong> {hotel.price} {hotel.currency}</p>
                        <button style={styles.bookButton} onClick={() => handleBooking(hotel)}>Book Now</button>
                    </div>
                ))
            ) : (
                <p>No hotels found for the specified criteria.</p>
            )}
        </div>
    );
};

// Styles for the component
const styles = {
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
        padding: "20px",
    },
    hotelBox: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    hotelName: {
        fontSize: "1.5em",
        margin: "0 0 10px",
        color: "#333",
    },
    address: {
        fontSize: "1em",
        margin: "5px 0",
        color: "#666",
    },
    bookButton: {
        marginTop: "10px",
        padding: "10px 15px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export { Hotels };
