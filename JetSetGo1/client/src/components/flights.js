// import React, { useState } from 'react';
// import axios from 'axios';

// export const FlightSearch = ({ touristId }) => {
//     const [flights, setFlights] = useState([]);
//     const [origin, setOrigin] = useState('');
//     const [destination, setDestination] = useState('');
//     const [departureDate, setDepartureDate] = useState('');
//     const [returnDate, setReturnDate] = useState('');
//     const [adults, setAdults] = useState(1);
//     const [loading, setLoading] = useState(false);

//     // Fetch flights from the backend API
//     const fetchFlights = async () => {
//         setLoading(true); // Show loading indicator
//         try {
//             const response = await axios.get("http://localhost:8000/api/flights", {
//                 params: {
//                     originLocationCode: origin,
//                     destinationLocationCode: destination,
//                     departureDate,
//                     returnDate,
//                     adults,
//                 },
//             });
//             setFlights(response.data.data);
//         } catch (error) {
//             console.error("Error fetching flights:", error);
//         } finally {
//             setLoading(false); // Hide loading indicator
//         }
//     };

//     // Extra function for each flight data
//     const handleExtraAction = async (flight) => {
//         console.log(flight);
//         try {
//             const response = await axios.post("http://localhost:8000/api/tourist/bookflight", {
//                 touristId,
//                 flightId: flight.id,
//                 origin: flight.source,  // Ensure `origin` is set
//                 destination: flight.destination,
//                 departureDate: flight.itineraries[0].segments[0].departure.at,
//                 returnDate: flight.returnDate || null,
//                 price: flight.price?.total || 0,
//                 duration: flight.itineraries[0].duration,
//             });

//             if (response.status === 201) {
//                 alert("Flight booked successfully!");
//             }
//         } catch (error) {
//             console.error("Error booking flight:", error.message);
//             alert(error.message);
//         }
//     };


//     return (
//         <div style={styles.container}>
//             {/* Blue Background */}
//             <div style={styles.header}>
//                 <h1 style={styles.title}>Search Your Flight</h1>
//             </div>

//             {/* Search Inputs */}
//             <div style={styles.searchBar}>
//                 <input
//                     type="text"
//                     placeholder="Origin (IATA Code)"
//                     value={origin}
//                     onChange={(e) => setOrigin(e.target.value)}
//                     style={styles.input}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Destination (IATA Code)"
//                     value={destination}
//                     onChange={(e) => setDestination(e.target.value)}
//                     style={styles.input}
//                 />
//                 <input
//                     type="date"
//                     placeholder="Departure Date"
//                     value={departureDate}
//                     onChange={(e) => setDepartureDate(e.target.value)}
//                     style={styles.input}
//                 />
//                 <input
//                     type="date"
//                     placeholder="Return Date (Optional)"
//                     value={returnDate}
//                     onChange={(e) => setReturnDate(e.target.value)}
//                     style={styles.input}
//                 />
//                 <input
//                     type="number"
//                     placeholder="Adults"
//                     value={adults}
//                     onChange={(e) => setAdults(Number(e.target.value))}
//                     min="1"
//                     max="9"
//                     style={styles.input}
//                 />
//                 <button onClick={fetchFlights} style={styles.button}>Search Flights</button>
//             </div>

//             {/* Loading Indicator */}
//             {loading && <p style={styles.loading}>Loading...</p>}

//             {/* Flight Results */}
//             <div style={styles.results}>
//                 {flights.length > 0 ? (
//                     flights.map((flight, index) => (
//                         <div key={index} style={styles.flightCard}>
//                             <p><strong>Flight ID:</strong> {flight.id}</p>
//                             <p><strong>Price:</strong> {flight.price?.total || 'N/A'}</p>
//                             <p><strong>Departure:</strong> {flight.itineraries[0].segments[0].departure.at}</p>
//                             <p><strong>Arrival:</strong> {flight.itineraries[0].segments[0].arrival.at}</p>
//                             <p><strong>Duration:</strong> {flight.itineraries[0].duration}</p>
//                             <button onClick={() => handleExtraAction(flight)} style={styles.extraButton}>
//                                 Booking
//                             </button>
//                         </div>
//                     ))
//                 ) : (
//                     !loading && <p style={styles.noResults}>No flights found. Please search to see results.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// const styles = {
//     container: {
//       fontFamily: 'Arial, sans-serif',
//       backgroundColor: '#ADD8E6', // Baby blue background
//       padding: '20px',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//     },
//     header: {
//       width: '100%',
//       textAlign: 'center',
//       marginBottom: '20px',
//       color: '#fff',
//     },
//     title: {
//       fontSize: '2em',
//       fontWeight: 'bold',
//       textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
//     },
//     searchBar: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       padding: '20px',
//       borderRadius: '8px',
//       background: 'linear-gradient(135deg, #1e3c72, #2a5298)', // Blue gradient background for search bar
//       width: '100%',
//       maxWidth: '600px',
//       color: '#fff',
//       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     },
//     input: {
//       width: '100%',
//       padding: '10px',
//       margin: '5px 0',
//       borderRadius: '4px',
//       border: '1px solid #ddd',
//     },
//     button: {
//       padding: '10px 20px',
//       margin: '10px 5px',
//       backgroundColor: '#0071c2',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       fontSize: '16px',
//     },
//     results: {
//       width: '100%',
//       maxWidth: '600px',
//       marginTop: '20px',
//     },
//     loading: {
//       color: '#0071c2',
//       fontSize: '1.2em',
//       marginTop: '10px',
//     },
//     flightCard: {
//       border: '1px solid #ddd',
//       borderRadius: '8px',
//       padding: '15px',
//       margin: '10px 0',
//       backgroundColor: '#fff',
//       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
//     },
//     extraButton: {
//       padding: '8px 16px',
//       backgroundColor: '#34a853',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       fontSize: '14px',
//       marginTop: '10px',
//     },
//     noResults: {
//       textAlign: 'center',
//       color: '#888',
//     },
//   };


// export default FlightSearch;
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import NavBar from './Tourist/navbar';
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import Cookies from "js-cookie"; // Import js-cookie

export const FlightSearch = ({ touristId }) => {
    const location = useLocation(); // Access state passed via Link
    const token = Cookies.get("auth_token");
    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;
    console.log("id:", id);
    const modelName = decodedToken.userType;
    console.log("modelName:", modelName);
    // const { id } = location.state || {}; // Access id from state
    touristId = id;
    const [flights, setFlights] = useState([]);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [adults, setAdults] = useState(1);
    const [loading, setLoading] = useState(false);
    console.log("touristId" + touristId);
    // Fetch flights from the backend API
    const fetchFlights = async () => {
        setLoading(true); // Show loading indicator
        try {
            const response = await axios.get("http://localhost:8000/api/flights", {
                params: {
                    originLocationCode: origin,
                    destinationLocationCode: destination,
                    departureDate,
                    returnDate: departureDate, // Set returnDate to departureDate
                    adults,
                },
            });
            setFlights(response.data.data);
        } catch (error) {
            console.error("Error fetching flights:", error);
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    // Extra function for each flight data
    const handleExtraAction = async (flight) => {
        console.log(flight);
        try {
            const response = await axios.post("http://localhost:8000/api/tourist/bookflight", {
                touristId,
                flightId: flight.id,
                origin: flight.source,
                destination: flight.destination,
                departureDate: flight.itineraries[0].segments[0].departure.at,
                returnDate: flight.itineraries[0].segments[0].departure.at, // Set returnDate same as departureDate
                price: flight.price?.total || 0,
                duration: flight.itineraries[0].duration,
            });

            if (response.status === 201) {
                alert("Flight booked successfully!");
            }
        } catch (error) {
            console.error("Error booking flight:", error.message);
            alert(error.message);
        }
    };

    return (
        <div style={styles.container}>
            {/* <NavBar /> */}
            <br />
            {/* Blue Background */}
            <div style={styles.header}>
                <h1 style={styles.title}>Search Your Flight</h1>
            </div>

            {/* Search Inputs */}
            <div style={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Origin (IATA Code)"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Destination (IATA Code)"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="date"
                    placeholder="Departure Date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="number"
                    placeholder="Adults"
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    min="1"
                    max="9"
                    style={styles.input}
                />
                <button onClick={fetchFlights} style={styles.button}>Search Flights</button>
            </div>

            {/* Loading Indicator */}
            {loading && <p style={styles.loading}>Loading...</p>}

            {/* Flight Results */}
            <div style={styles.results}>
                {flights.length > 0 ? (
                    flights.map((flight, index) => (
                        <div key={index} style={styles.flightCard}>
                            <p><strong>Flight ID:</strong> {flight.id}</p>
                            <p><strong>Price:</strong> {flight.price?.total || 'N/A'}</p>
                            <p><strong>Departure:</strong> {flight.itineraries[0].segments[0].departure.at}</p>
                            <p><strong>Arrival:</strong> {flight.itineraries[0].segments[0].arrival.at}</p>
                            <p><strong>Duration:</strong> {flight.itineraries[0].duration}</p>
                            <button onClick={() => handleExtraAction(flight)} style={styles.extraButton}>
                                Booking
                            </button>
                        </div>
                    ))
                ) : (
                    !loading && <p style={styles.noResults}>No flights found. Please search to see results.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#ADD8E6', // Baby blue background
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        textAlign: 'center',
        marginBottom: '20px',
        color: '#fff',
    },
    title: {
        fontSize: '2em',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    },
    searchBar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #1e3c72, #2a5298)', // Blue gradient background for search bar
        width: '100%',
        maxWidth: '600px',
        color: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '5px 0',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    button: {
        padding: '10px 20px',
        margin: '10px 5px',
        backgroundColor: '#0071c2',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    results: {
        width: '100%',
        maxWidth: '600px',
        marginTop: '20px',
    },
    loading: {
        color: '#0071c2',
        fontSize: '1.2em',
        marginTop: '10px',
    },
    flightCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        margin: '10px 0',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
    },
    extraButton: {
        padding: '8px 16px',
        backgroundColor: '#34a853',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        marginTop: '10px',
    },
    noResults: {
        textAlign: 'center',
        color: '#888',
    },
};

export default FlightSearch;
