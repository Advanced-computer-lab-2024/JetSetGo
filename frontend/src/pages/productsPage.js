import React, { useState,useEffect, useRef} from 'react';
import './ProductListing.css';
import filterIcon from '../assets/filter_3839020.png';
import { FaStar } from 'react-icons/fa'; // Feather Icon for the filter
import { PriceRange } from '@faststore/ui'
import Filter from '../components/Filterbox.js';
import { Range } from 'react-range';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';


const STEP = 1;
const MIN = 0;
const MAX = 500;
const productsData = [
  {
    id: 1,
    name: 'Vintage Mug',
    price: 12.99,
    description: 'A stylish vintage mug for coffee lovers.',
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.5, // Add rating for each product
  },
  {
    id: 2,
    name: 'Souvenir T-Shirt',
    price: 19.99,
    description: 'A comfy t-shirt with local souvenir print.',
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.0,
  },
  {
    id: 3,
    name: 'Handcrafted Keychain',
    price: 5.99,
    description: 'Handcrafted keychain with a unique design.',
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.8,
  },
  // Add more products as needed
];


const ProductListing = () => {
  const [products] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [values, setValues] = useState([100, 250]);
  const [isPriceRangeVisible, setIsPriceRangeVisible] = useState(false);
  const [ratingValue, setRatingValue] = useState(1);
  const [isRatingVisible, setIsRatingVisible] = useState(false);

  const formatter = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const toggleRatingVisibility = () => {
    setIsRatingVisible(!isRatingVisible);
  };

  const togglePriceRangeVisibility = () => {
    setIsPriceRangeVisible(!isPriceRangeVisible);
  };
  
   // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
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
        
        <Filter isFilterOpen={isFilterOpen} toggleFilter={setIsFilterOpen}>
          {/* Dynamic content passed to the filter */}
          <h2>Advanced Filters</h2>
          {/* Price selector */}
          <div className="price-toggle" onClick={togglePriceRangeVisibility} >
            <span>Price</span>
            <div className="toggle-arrow" onClick={togglePriceRangeVisibility} >
              {isPriceRangeVisible ? <MdArrowDropUp size={34} /> : <MdArrowDropDown size={34} />} {/* Icon based on visibility */}
            </div>
          </div>
          {isPriceRangeVisible && (<div className="price-div">
          <div className="price-display">
            <span>Min: {formatter(values[0])}</span> - 
            <span>Max: {formatter(values[1])}</span>
          </div>
          <div>

          <Range
            values={values}
            step={1}
            min={0}
            max={500}
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
        </div>)}

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
            <span>Rating: {ratingValue.toFixed(1)} Stars</span> {/* Display with one decimal */}
          </div>
          <Range
            values={[ratingValue]} // Use a single value
            step={0.5} // Change step to 0.5
            min={1}
            max={5}
            onChange={(values) => setRatingValue(values[0])} // Update rating value
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
                  left: `${((ratingValue -1) / (200)) * 100}%`, // Adjust calculation
                  transform: 'translateX(-50%)',
                }}
              />
            )}
          />
        </div>
      )}
          
          
        </Filter>
      </div>

      
      
      {/* Filter Panel */}
      

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h2 className="product-title">{product.name}</h2>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <div className="product-rating">
              <p>{product.rating.toFixed(2)}</p> {/* Display the rating number */}
              <FaStar className="star-icon" /> {/* Star icon */}
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
