import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const TouristAddComplaintPage = () => {
    const { id } = useParams(); // Get userId from URL params
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset messages
        setError(null);
        setSuccessMessage('');

        try {
            const response = await fetch(`/api/tourist/addComplaint/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Failed to add complaint');
            } else {
                setSuccessMessage('Complaint added successfully!');
                setTitle('');
                setBody('');
            }
        } catch (err) {
            setError('An error occurred while adding the complaint');
            console.error('Error:', err);
        }
    };

    return (
        <div>
            <h2>Submit a Complaint</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Body:</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Complaint</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default TouristAddComplaintPage;