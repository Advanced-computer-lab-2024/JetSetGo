//import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import IT from "../../assets/images/hs.jpg";
import "./tourismgovernerhome.css";
import Filter from "../../components/Filterbox.js";

const TourismGovernerHomepage = () => {
    const [histlocs, setHistLocs] = useState([]);
    const [loadingTags, setLoadingTags] = useState(true);
    const [tags, setTags] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [showModal, setShowModal] = useState(false); // State for controlling the modal
    const [deletingId, setDeletingId] = useState(null); // State to store the id of the item to be deleted

    const token = Cookies.get("auth_token");
    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;

    useEffect(() => {
        const fetchHistLocs = async () => {
            try {
                const response = await fetch(`/api/tourism-governer/showAll/${id}`);
                const data = await response.json();
                setHistLocs(data);
            } catch (error) {
                setError('You don’t have any posts yet.');
            }
        };
        fetchHistLocs();
    }, [id]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('/api/tourism-governer/tags');
                const data = await response.json();
                console.log(data);
                setTags(data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            } finally {
                setLoadingTags(false);
            }
        };
        fetchTags();
    }, []);

    // const handleDelete = (id) => {
    //     setDeletingId(id); // Store the id to be deleted
    //     setShowModal(true); // Show the modal
    // };


    // const confirmDelete = () => {
    //     if (deletingId) {
    //         fetch(`/api/tourism-governor/deletHL/${deletingId}`, {
    //             method: 'DELETE',
    //         })
    //             .then((response) => {
    //                 if (response.ok) {
    //                     setHistLocs((prev) => prev.filter((item) => item._id !== deletingId));
    //                     setShowModal(false); // Close the modal
    //                     setDeletingId(null);
    //                     alert('Item deleted successfully');
    //                 } else {
    //                     alert('Failed to delete item');
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error("Error deleting the item:", error);
    //                 alert('Error deleting item');
    //             });
    //     }
    // };

    // const cancelDelete = () => {
    //     setShowModal(false); // Close the modal without deleting
    //     setDeletingId(null);
    // };

    const handleDelete = async (id) => {
        console.log('Deleting ID:', id);
    
        try {
            const response = await fetch(`/api/tourism-governer/deleteHL/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                // Update the state to remove the deleted post
                setHistLocs((prevHistLocs) => prevHistLocs.filter((loc) => loc._id !== id));
                setShowModal(false); // Close the modal
                console.log('Post deleted successfully');
            } else {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    console.error('Error deleting item:', data.message);
                } else {
                    const text = await response.text();
                    console.error('Error deleting item (non-JSON response):', text);
                }
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
        

    const handleDeleteClick = (id) => {
        setDeletingId(id); // Store the ID of the item to be deleted
        setShowModal(true); // Show the confirmation modal
    };
    
    const confirmDelete = () => {
        if (deletingId) {
            handleDelete(deletingId); // Perform the delete operation
        }
    };
    
    const cancelDelete = () => {
        setShowModal(false); // Close the modal without deleting
        setDeletingId(null); // Clear the stored ID
    };
    




    const filteredHistLocs = histlocs.filter((histloc) =>
        histloc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="home">
            {/* Page Title */}
            <h1 className="page-title">Historical Locations</h1>
            <div className="SearchBarAndFiletr">
                {/* Search Bar */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search for Historical Locations                                                                                                                🔍"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="search-icon">
                        <i className="fas fa-search"></i>
                    </span>

                </div>
                <Filter isFilterOpen={isFilterOpen} toggleFilter={setIsFilterOpen} />
            </div>

            {/* Modal for Confirmation */}
            {showModal && (
                
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete this location?</p>
                        <div className="modal-actions">
                            <button onClick={confirmDelete}>Delete</button>
                            <button onClick={cancelDelete}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}


            {/* Historical Locations Section */}
            <div className="tags">
                {filteredHistLocs.map((histloc) => (
                    <div className="histloc-card" key={histloc._id}>
                        <div className="card-header">
                            <img src={IT} alt={histloc.name} className="card-image" />
                            <a class="card-action" href="#" onClick={() => handleDeleteClick(histloc._id)}><i class="fa fa-trash"></i></a>
                        </div>
                        <div className="card-content">
                            <div className="card-title">{histloc.name || "Untitled Historical Location"}</div>
                            <div className="card-rating">
                                {/* <div className="rating">{renderStars(museum.ratings)}</div>
                ★ {calculateAverageRating(museum.ratings) > 0
                  ? `${calculateAverageRating(museum.ratings)} (${museum.ratings.length})`
                  : "0 (0)"} */}
                            </div>
                            <div className="card-description">
                                {histloc.description || "No description available."}
                            </div>
                            <div className="card-location">
                                <strong>Location: </strong>
                                {histloc.location || "No location available."}
                            </div>
                            <div className="card-location">
                                <strong>Opening Hours: </strong>

                                {histloc.openingHours.from} - {histloc.openingHours.to}
                            </div>
                            <div className="card-tags">
                                <strong>🏷 Tag:  </strong>
                                {loadingTags ? (
                                    <span>Loading tag...</span>
                                ) : (
                                    histloc.tags ? (
                                        (() => {
                                            const tagItem = tags.find((tag) => tag._id === histloc.tags);
                                            return tagItem ? ` ${tagItem.type} - ${tagItem.historicalPeriod}` : "Tag not found";
                                        })()
                                    ) : (
                                        <span>No tag available</span>
                                    )
                                )}
                            </div>
                            <div className="card-price">


                                <ul>
                                    <li>
                                        <strong> $ Foreigners: </strong> {histloc.ticketPrices.foreigner || "N/A"}
                                    </li>
                                    <li>
                                        <strong> $ Natives: </strong> {histloc.ticketPrices.native || "N/A"}
                                    </li>
                                    <li>
                                        <strong> $ Students: </strong> {histloc.ticketPrices.student || "N/A"}
                                    </li>
                                </ul>
                            </div>

                        </div>
                        {/* <Link to={`/historicalLocation/${histloc._id}`} className="view-more-btn">
              View More
            </Link> */}
                    </div>
                ))}
            </div>

        </div>
    );
};
export default TourismGovernerHomepage;