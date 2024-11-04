import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminViewComplaintStyle.css';

const AdminViewComplaint = () => {
    const [complaint, setComplaint] = useState(null);
    const params = new URLSearchParams(window.location.search);
    const complaintId = params.get('complaintId');

     const navigate = useNavigate()

    useEffect(() => {
        viewComplaint();
    }, []);

    const viewComplaint = async () => {
        const response = await fetch(`http://localhost:3000/api/admin/viewComplaint?complaintId=${complaintId}`);
        const json = await response.json();
        if (response.ok) {
            setComplaint(json);
        }
    };

    const resolveComplaint = async (replyText) => {
        try {
            const response = await fetch('http://localhost:3000/api/admin/resolveComplaint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ complaintId, reply: replyText }),
            });
            if (response.ok) {
                window.location.href = '/admin/getComplaints';
            }
        } catch (error) {
            console.error('Error resolving complaint:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const replyText = document.getElementById("response").value;
        resolveComplaint(replyText);
    };

    return (
        <div className="complaint-container">
             <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
            <h2 className="complaint-title">Complaint Details</h2>

            <div className="complaint-details">
                <h3>{complaint ? complaint.title : "Not found"}</h3>
                <p><strong>Description:</strong> {complaint ? complaint.body : "Not found"}</p>
                <p><strong>Status:</strong> {complaint ? complaint.status : "Not found"}</p>
                <p><strong>Date:</strong> {complaint ? complaint.date : "Not found"}</p>
            </div>

            <form onSubmit={handleSubmit} className="response-form">
                <label htmlFor="response" className="response-label">Admin Response:</label>
                <input id="response" className="response-input" placeholder="Enter your response here..." />
                <button type="submit" className="submit-button">Submit Response</button>
            </form>
        </div>
    );
};

export default AdminViewComplaint;
