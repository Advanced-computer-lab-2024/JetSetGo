import React, { useEffect, useState } from 'react';
import './tourismgovernertags.css'; // Import the custom CSS for the modal

const TourismGovTags = () => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newTag, setNewTag] = useState({ type: '', historicalPeriod: '' });
    const [modalError, setModalError] = useState(null);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/tourism-governer/tags', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch tags');
                }

                const data = await response.json();
                setTags(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tags:', error);
                setError('Failed to fetch tags. Please try again.');
                setLoading(false);
            }
        };

        fetchTags();
    }, []);

    const handleAddTag = async () => {
        if (!newTag.type || !newTag.historicalPeriod) {
            setModalError('Please fill out all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/tourism-governer/newTag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTag),
            });

            if (!response.ok) {
                throw new Error('Failed to add new tag');
            }

            const createdTag = await response.json();
            setTags([...tags, createdTag]);
            setShowModal(false);
            setNewTag({ type: '', historicalPeriod: '' });
            setModalError(null);
        } catch (error) {
            console.error('Error adding tag:', error);
            setModalError('Failed to add tag. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="d-flex justify-content-center mt-4">
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Historical Tags</h1>
            
            {/* Button at the top right */}
            <button
                className="btn btn-primary custom-add-button"
                onClick={() => setShowModal(true)}
            >
                +
            </button>

            {/* Center the table */}
            <div className="d-flex justify-content-center mt-4">
                <table className="table table-striped text-center w-75">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Historical Period</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags.map((tag) => (
                            <tr key={tag._id}>
                                <td>{tag.type}</td>
                                <td>{tag.historicalPeriod}</td>
                                <td>{new Date(tag.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div></div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Add New Tag</h2>
                        <div className="mb-3">
                            <label className="form-label">Type</label>
                            <select
                                className="form-select"
                                value={newTag.type}
                                onChange={(e) =>
                                    setNewTag({ ...newTag, type: e.target.value })
                                }
                            >
                                <option value="">Select Type</option>
                                <option value="Monuments">Monuments</option>
                                <option value="Museums">Museums</option>
                                <option value="Religious Sites">Religious Sites</option>
                                <option value="Palaces/Castles">Palaces/Castles</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Historical Period</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newTag.historicalPeriod}
                                onChange={(e) =>
                                    setNewTag({ ...newTag, historicalPeriod: e.target.value })
                                }
                            />
                        </div>
                        {modalError && <div className="alert alert-danger">{modalError}</div>}

                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={handleAddTag}>
                                Submit
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TourismGovTags;
