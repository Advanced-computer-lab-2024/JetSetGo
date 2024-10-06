import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import './ProductListing.css';
import filterIcon from '../assets/filter_3839020.png';
import { FaStar } from 'react-icons/fa';
import Filter from '../components/Filterbox.js';
import { Range } from 'react-range';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

const STEP = 1;
const MIN = 0;
const MAX = 500;

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [values, setValues] = useState([100, 250]);
  const [isPriceRangeVisible, setIsPriceRangeVisible] = useState(false);
  const [ratingValue, setRatingValue] = useState(1);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);

  // Formatter for price display
  const formatter = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  // Toggle visibility of rating filter
  const toggleRatingVisibility = () => {
    setIsRatingVisible(!isRatingVisible);
  };

  // Toggle visibility of price range filter
  const togglePriceRangeVisibility = () => {
    setIsPriceRangeVisible(!isPriceRangeVisible);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Fetch all products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/sellers/Products');
        setProducts(response.data); // Assuming response data is an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Fetch filtered products by price range and rating
  useEffect(() => {
    if (filtersApplied) { // Only apply when filters are saved
      const fetchFilteredProducts = async () => {
        try {
          const response = await axios.get('/api/sellers/filterProducts', {
            params: {
              minPrice: values[0],
              maxPrice: values[1],
              rating: ratingValue, // Pass rating filter
            },
          });
          setProducts(response.data); // Update products with filtered data
        } catch (error) {
          console.error('Error filtering products:', error);
        }
      };

      fetchFilteredProducts();
    }
  }, [values, ratingValue, filtersApplied]); // Trigger when price range or rating changes, or save filters is clicked

  // Handle saving the filters
  const handleSaveFilter = () => {
    setFiltersApplied(true); // This will trigger the useEffect for fetching filtered products
  };

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-listing">
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />

        <Filter isFilterOpen={isFilterOpen} toggleFilter={setIsFilterOpen} onSaveFilter={handleSaveFilter}>
          <h2>Advanced Filters</h2>

          {/* Price selector */}
          <div className="price-toggle" onClick={togglePriceRangeVisibility}>
            <span>Price</span>
            <div className="toggle-arrow">
              {isPriceRangeVisible ? <MdArrowDropUp size={34} /> : <MdArrowDropDown size={34} />}
            </div>
          </div>

          {isPriceRangeVisible && (
            <div className="price-div">
              <div className="price-display">
                <span>Min: {formatter(values[0])}</span> - 
                <span>Max: {formatter(values[1])}</span>
              </div>

              <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={setValues}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '6px',
                      width: '100%',
                      background: 'black',
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '24px',
                      width: '24px',
                      backgroundColor: isDragged ? '#007bff' : '#ccc',
                      borderRadius: '50%',
                    }}
                  />
                )}
              />
            </div>
          )}

          {/* Rating Toggle Section */}
          <div className="rating-toggle" onClick={toggleRatingVisibility}>
            <span>Rating</span>
            <div className="toggle-arrow">
              {isRatingVisible ? <MdArrowDropUp size={34} /> : <MdArrowDropDown size={34} />}
            </div>
          </div>

          {isRatingVisible && (
            <div className="rating-div">
              <div className="rating-display">
                <span>Rating: {ratingValue.toFixed(1)} Stars</span>
              </div>

              <Range
                values={[ratingValue]}
                step={0.5}
                min={1}
                max={5}
                onChange={(values) => setRatingValue(values[0])}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '6px',
                      width: '100%',
                      background: 'linear-gradient(to right, #FF5733, #007bff)',
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '24px',
                      width: '24px',
                      backgroundColor: isDragged ? '#007bff' : '#ccc',
                      borderRadius: '50%',
                    }}
                  />
                )}
              />
            </div>
          )}
        </Filter>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id || product.name} className="product-card"> {/* Ensure unique key */}
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h2 className="product-title">{product.name}</h2>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <div className="product-rating">
              <p>{(product.rating !== undefined ? product.rating.toFixed(2) : '0.00')}</p>
              <FaStar className="star-icon" />
            </div>
            <p className="product-description">{product.description}</p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
