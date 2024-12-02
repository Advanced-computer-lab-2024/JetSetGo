import React, { useState } from 'react';
import Search from './Search';
import { DateFilters } from "./DateFilters";
import { Hotels } from "./Hotels";

const AccommodationApp = ({touristId}) => {
    const [cityCode, setCityCode] = useState("");
    const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split("T")[0]);
    const [checkOutDate, setCheckOutDate] = useState(
        new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]
    );
    const [adults, setAdults] = useState(1);
    const [showHotels, setShowHotels] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleAdultsChange = (event) => {
        const count = parseInt(event.target.value, 10);
        setAdults(count);
    };

    const handleSearchClick = () => {
        setShowHotels(false); // Reset to hide Hotels component
        setIsLoading(true); // Start loading indicator
        setTimeout(() => {
            setShowHotels(true); // Show Hotels after loading
            setIsLoading(false); // Stop loading indicator
        }, 2000); // Simulating a network request delay
    };

    const styles = {
        appContainer: {
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            backgroundColor: '#0071c2',
            padding: '50px 0',
            minHeight: '100vh'
        },
        contentBox: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            maxWidth: '600px',
            margin: '0 auto',
        },
        searchRow: {
            marginBottom: '20px',
        },
        inputRow: {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            alignItems: 'center',
            marginBottom: '20px',
        },
        label: {
            display: 'flex',
            flexDirection: 'column',
            fontSize: '14px'
        },
        searchButton: {
            backgroundColor: '#0071c2',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '14px',
            borderRadius: '4px',
            transition: 'background-color 0.3s'
        },
        searchButtonHover: {
            backgroundColor: '#005fa3'
        },
        loadingIndicator: {
            fontSize: '16px',
            color: '#0071c2',
            marginTop: '20px'
        }
    };

    return (
        <div style={styles.appContainer}>
            <h1 style={{ color: '#fff' }}></h1>

            <div style={styles.contentBox}>
                <div style={styles.searchRow}>
                    <Search setCityCode={setCityCode} />
                </div>

                <div style={styles.inputRow}>
                    <DateFilters
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        setCheckInDate={setCheckInDate}
                        setCheckOutDate={setCheckOutDate}
                    />

                    <label style={styles.label}>
                        Adults:
                        <select value={adults} onChange={handleAdultsChange}>
                            {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button
                        style={styles.searchButton}
                        onClick={handleSearchClick}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.searchButtonHover.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.searchButton.backgroundColor)}
                    >
                        Search
                    </button>
                </div>

                {/* Loading Indicator */}
                {isLoading && <div style={styles.loadingIndicator}>Loading...</div>}

                {/* Hotels Component */}
                {showHotels && cityCode ? (
                    <Hotels
                        cityCode={cityCode}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        adults={adults}
                        touristId={touristId}
                    />
                ) : (
                    !isLoading && <p>Please search and select a city to view accommodations.</p>
                )}
            </div>
        </div>
    );
};

export default AccommodationApp;
