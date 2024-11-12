import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTags, faChartBar, faComments, faBox, faTasks, faUser } from '@fortawesome/free-solid-svg-icons'; 
import { Edit } from 'react-feather';  // Importing Feather's edit icon
import './details.css';
import SalesOverviewChart from "../../components/Admin/SalesOverviewChart";

function ViewProduct() {
  const location = useLocation();
  console.log(location.state )
  const list = location.state || {};
  const productId =list[0];
  const userType=list[1];
  const id=list[2];

  console.log(productId,userType,id)
  

  const [starFilter, setStarFilter] = useState(""); // To filter by star rating
  const [sortOrder, setSortOrder] = useState("");
  const [product, setProduct] = useState(null); // Initialize product as null
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false); // State to show/hide review modal
  const [newRating, setNewRating] = useState(5);
  const [newReview, setNewReview] = useState("");

  

  // Use useEffect to fetch product details when ID is available
  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/${userType}/getSingleProduct/${productId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const product = await response.json(); // Parse the JSON response
          setProduct(product); // Update product with fetched data
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };

      fetchProduct();
    }
  }, [productId]);

  if (!productId) {
    return <div>No product data available!</div>;
  }

  if (!product) {
    return <div>Loading product...</div>;
  }

  
       

  

  const getAccuracyColor = (percentage) => {
    if (percentage >= 85) return '#33cc33'; // Bright green for 85% and above
    if (percentage >= 70) return '#99cc00'; // Yellow-green for 70% to 84%
    if (percentage >= 50) return '#ffcc00'; // Yellow for 50% to 69%
    return '#ff4d4d'; // Red for below 50%
  };

  const getStarColor = (rating) => {
    if (rating === 1) return '#ff4d4d';
    if (rating === 2) return '#ffcc00';
    if (rating === 3) return '#99cc00'; // Light orange for 3
    if (rating === 4) return '#33cc33'; // Green-orange for 4
    return '#33cc33'; // Green for 5
  };

  function getRatingColor(rating) {
    switch (rating) {
      case 1: return 'red';
      case 2: return 'orange';
      case 3: return 'lightorange';
      case 4: return 'greenorange';
      default: return 'green';
    }
  }


  const filteredAndSortedReviews = reviews
    .filter(review => starFilter === "" || review.rating === parseInt(starFilter))
    .sort((a, b) => {
      if (sortOrder === "highest") return b.rating - a.rating;
      if (sortOrder === "lowest") return a.rating - b.rating;
      if (sortOrder === "mostRecent") return new Date(b.date) - new Date(a.date);
      return 0; // No sorting applied
    });

  const handleStarFilterChange = (e) => setStarFilter(e.target.value);
  const handleSortOrderChange = (e) => setSortOrder(e.target.value);

  const handleBuyClick = async () => {
    // const price=200;
    // const quantityPurchased=1
    // const touristId="6702c760367bb353e255fd8b";
    // const productId="66ff1538b4b8e6aaa752b086";
    // const sellerId="66ff14e7d87f7729749e8a5f";
  
    // try {
    //    const saleResponse = await fetch(`/api/tourist/addSales`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ price,quantityPurchased,touristId,productId,sellerId }),
    // });

    // if (saleResponse.ok ) {
    //   alert("item is bought successfully");
    // }
    // }
    // catch (error) {
    //   console.error("Error submitting review:", error);
    //   alert("An error occurred while submitting your review.");
    // }

    setShowReviewModal(true); 
  }

  const handleSubmitReview = async () => {
    const price=200;
    const quantityPurchased=4343434
    const touristId=id;
    const productId=productId;
    const sellerId=product.seller;
    const ratings=newRating;
    const reviews= newReview;
  
    // const response1 = await fetch('/api/tourist/feedback', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ ratings,reviews,touristId,productId}),
    // });

    try {
      const saleResponse = await fetch(`/api/tourist/addSales`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ price,quantityPurchased,touristId,productId,sellerId,ratings,reviews }),
   });

   if (saleResponse.ok ) {
     alert("item is bought successfully");
   }
   }
   catch (error) {
     console.error("Error submitting review:", error);
     alert("An error occurred while submitting your review.");
   }

   setShowReviewModal(false); 

    // if (response1.status==200){
    //   alert("Review submitted successfully!");
    //  }
    // else{
    //   alert("failed to fetch response2")
    // }
  
 
};

  
  

  // Calculating how long the seller has been on the platform
  const sellerStartDate = new Date(product[0].sellerStartDate);
  const currentDate = new Date();
  const sellerMonths = (currentDate.getFullYear() - sellerStartDate.getFullYear()) * 12 + (currentDate.getMonth() - sellerStartDate.getMonth());
  const sellerDuration = sellerMonths >= 12 ? `${Math.floor(sellerMonths / 12)} years` : `${sellerMonths} months`;

  // Calculate the percentage of how well the item is described
  const accuracyPercentage = Math.min(Math.max(product[0].itemAccuracy, 0), 100);  // Ensure accuracy is between 0 and 100
  const ratingDistribution = [0, 0, 0, 0, 0]; // Array for ratings 1-5
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingDistribution[review.rating - 1] += 1; // Increment the count for the respective rating
    }
  });

  return (
    <div className="product-view-container">
    <div className="product-boxes">
    {/* Product Image Section */}
    <div className="box-shadow image-section">
      <div className="image-wrapper">
        <img src={`http://localhost:8000/${product[0].picture}`} alt={product[0].name} className="product-image" />
        <button className="edit-image-btn">
          <Edit size={24} color="white" /> {/* Using Feather Edit icon */}
        </button>
      </div>
    {userType === 'tourist' && (
        <button className="buy-button" onClick={handleBuyClick}>
          Buy
        </button>
      )}
    </div>

    {/* Product Details Section */}
    <div className="box-shadow product-details">
      <h1 className="product-name">{product[0].name}</h1>
      <p className="product-description"> {product[0].description}</p>

      <div className="rating-section">
        <span className="rating-star" style={{ color: getRatingColor(product[0].ratings) }}>★</span>
        <span className="rating-count">({product[0].ratingsCount})</span>
      </div>

      {/* Old Price 
      <p className="old-price">Was: <span className="strikethrough">EGP {product[0].oldPrice}</span></p>*/}

      {/* New Price */}
      <p className="product-price">Now: <strong>$ {product[0].price}</strong> Inclusive of VAT</p>

      {/* Savings 
      <p className="product-savings">Saving: <strong>EGP {product[0].savings}</strong> <span className="discount">10% Off</span></p>*/}

      {/* Lowest Price Notification 
      <p className="lowest-price">Lowest price in a year</p>*/}
       {/* Stock Quantity */}
      <p className={`product-quantity ${product[0].quantityAvailable > 0 ? '' : 'out-of-stock'}`}>
         {product[0].quantityAvailable > 0 ? `${product[0].quantityAvailable} available` : 'Out of Stock'}
      </p>
      {/* Express Shipping Badge */}
      <div className="express-shipping">
        <span className="express-badge">express</span>
        <p className="delivery-info">Get it by {product[0].deliveryDate} <br /><small>Order in {product[0].timeRemaining}</small></p>
      </div>

      

      {/* Archive Section */}
      <div className="archive-section">
        <input type="checkbox" checked={product[0].archieved && false} readOnly />
        <label className="product-status" style={{ color: product[0].archieved && false ? 'red' : 'green' }}>
          <strong>Status:</strong> {product[0].archieved ? 'Archived' : 'Active'}
        </label>
      </div>
    </div>


    {/* Seller Information Section */}
    <div className="box-shadow seller-info-section">
      <p className="seller-name">Sold by {product[0].sellerName}</p>
      <p><strong>Partner since</strong> <span className="seller-duration">{sellerDuration}</span></p>
      <p><strong>Items sold:</strong> {product[0].itemsSold}</p>

      {/* Item Accuracy Section */}
      <div className="accuracy-section">
      <FontAwesomeIcon icon={faBox} className="accuracy-icon" />
        
        <div className="accuracy-text-bar">
          <p className="accuracy-description">Item as Described</p>
          <div className="accuracy-bar-wrapper">
            <div className="accuracy-bar-container">
              <div className="accuracy-bar" style={{ width: `${accuracyPercentage}%`, background: 'green' }} />
            </div>
            <span className="accuracy-percentage">{accuracyPercentage}%</span>
          </div>
        </div>
      </div>
    </div>
    </div>

    {/* Overall Rating and Reviews Section */}
    <div className="box-shadow overall-rating-reviews">
      <div className="rating-box">
        <h4>Overall Rating</h4>
        {ratingDistribution.map((count, index) => {
          const percentage = (count / reviews.length) * 100 || 0; // Calculate percentage of each rating
          const barColors = ['#ff4d4d', '#ffcc00', '#bdc014', '#98ce05', '#12f75e']; // Array of colors
          return (
            <div key={index} className="rating-bar-container">
              <span>{index + 1} ★ </span>
              <div
                className="rating-bar"
                style={{ width: `${percentage}%`, background: barColors[index] || 'blue' }}
              />
              <span>{percentage.toFixed(1)}%</span>
            </div>
          );
        })}
      </div>

      <div className="reviews-section">
        <div className="review-header">
          <h4>{filteredAndSortedReviews.length} Reviews</h4>
              <div className="filter-sort-options">
                <label className="filter-label">Star Rating:</label>
                <select id="star-filter" value={starFilter} onChange={handleStarFilterChange} className="filter-stars">
                  <option value="">All</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>

                {/* Sort Order Filter */}
                <label className="sort-label">Sort By:</label>
                <select id="sort-order" value={sortOrder} onChange={handleSortOrderChange} className="sort-reviews">
                  <option value="">Select</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                  <option value="mostRecent">Most Recent</option>
                </select>
              </div>
        </div>
        
          {filteredAndSortedReviews.length > 0 ? (
            filteredAndSortedReviews.map((review, index) => (
              <div class="review">
              <div key={index} className="review-header">
                <span class="review-author">{review.reviewerName}</span>
                <span class="review-date">{new Date(review.date).toLocaleDateString()}</span>
              </div>
                <div class="review-rating">
                  <span class="stars">{review.rating}★★★★★</span>
                </div>
                <div class="review-content">
                    <h4>{review.content}</h4>
                    <p>{review.content}</p>
                </div>
                <p>{review.content}</p>
                </div>
            ))
          ) : (
            <p>No reviews matching the criteria.</p>
          )}
          <button className="view-all-reviews-btn">View All Reviews</button>
        
      </div>

      
    </div>
    <div>
    {userType!=="tourist" && (
        <SalesOverviewChart />
      )}
    </div>

    {showReviewModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Rate & Review Product</h3>
            <label>
              Rating:
              <select value={newRating} onChange={(e) => setNewRating(Number(e.target.value))}>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
            </label>
            <label>
              Review:
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write your review here"
              />
            </label>
            <button onClick={handleSubmitReview}>Submit Review</button>
            <button onClick={() => setShowReviewModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      

  </div>
  );
}

export default ViewProduct;
