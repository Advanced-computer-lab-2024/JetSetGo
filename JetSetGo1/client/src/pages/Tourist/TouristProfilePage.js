import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Badge1 from '../../assets/images/Badge1.jpg';
import Badge2 from '../../assets/images/Badge2.jpg';
import Badge3 from '../../assets/images/Badge3.jpg';
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import Cookies from "js-cookie"; // Import js-cookie


function TouristProfilePage() {
    const token = Cookies.get("auth_token");
    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;
    console.log("id:", id);
    const modelName = decodedToken.userType;
    console.log("modelName:", modelName);

    // const { id } = useParams();
    const [tourist, setTourist] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch tourist data using fetch
        const fetchTouristData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/tourist/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setTourist(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching tourist data:', error);
            }
        };
        fetchTouristData();
    }, [id]);

    // Function to update points to wallet using fetch
    const handleUpdatePointsToWallet = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/tourist/updatePointsToWallet/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setMessage(data.message);
            setTourist(data.tourist); // Update tourist data after wallet update
        } catch (error) {
            console.error('Error updating wallet:', error);
        }
    };

    // Render level-specific image based on the tourist's level
    const renderLevelImage = (level) => {
        switch (level) {
            case 1:
                return <img src={Badge1} alt="Level 1 Badge" className="badge-image" style={{ width: '150px', height: '150px' }} />;
            case 2:
                return <img src={Badge2} alt="Level 2 Badge" className="badge-image" style={{ width: '150px', height: '150px' }} />;
            case 3:
                return <img src={Badge3} alt="Level 3 Badge" className="badge-image" style={{ width: '150px', height: '150px' }} />;
            default:
                return null;
        }
    };

    return (
        <div>
            <h1>Tourist Profile</h1>
            {tourist ? (
                <div>
                    <p>Username: {tourist.username}</p>
                    <p>Mobile: {tourist.mobile}</p>
                    <p>Nationality: {tourist.nationality}</p>
                    <p>Date of Birth: {new Date(tourist.dob).toLocaleDateString()}</p>
                    <p>Job: {tourist.job}</p>
                    <p>Wallet: {tourist.wallet}</p>
                    <p>Total Points: {tourist.TotalPoints}</p>
                    <p>Points: {tourist.Points}</p>
                    <p>Level: {tourist.Level}</p>
                    <p>{renderLevelImage(tourist.Level)}</p> {/* Render badge/image based on level */}
                    <button onClick={handleUpdatePointsToWallet}>Update Wallet with Points</button>
                    <p>{message}</p>
                </div>
            ) : (
                <p>Oups...</p>
            )}
        </div>
    );
}

export default TouristProfilePage;
