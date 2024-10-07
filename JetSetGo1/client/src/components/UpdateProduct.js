import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams to get the model and ID from the URL
//import './Updateproduct.css';//////////////////////////////name, description, price, quantityAvailable, seller, picture,ratings
import ProductListing from '../pages/productsPage';
const UpdateProducts = () => {
  const { id} = useParams(); // Extract the profile ID and model from the URL
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    quantityAvailable: '',
    seller: '',
    picture: '',
    ratings: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For navigation after the update

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/admin/Products/${id}` || `/api/sellers/Products/${id}`); // Dynamically use the model in the API endpoint
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch profile');
        }
        const data = await response.json();
        setFormValues({
          name: data.name || '',
          description: data.description || '',
          price: data.price || '',
          quantityAvailable: data.quantityAvailable || '',
          seller : data.seller || '',
          picture : data.picture || '',
          ratings : data.ratings || ''
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

     fetchProfile();
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update profile
  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`/api/admin/product/${id}` || `/api/sellers/product/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update Product');
      }
      //const updatedProfile = await response.json();
      navigate(`../pages/productsPage/${id}`); // Redirect back to the profile page after a successful update
    } catch (err) {
      console.error('Error updating Product:', err);
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="update-Product">
      <h2>Update Your Product</h2>
      <form className="Product-form">
        <div className="form-group">
          <label htmlFor="name">name <span className="required">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            placeholder="Enter Product name"
            required
          />
          {/* <small>Choose a unique username.</small> */}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description <span className="required">*</span></label>
          <input
            type="text"
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            required
          />
          {/* <small>We’ll use this to contact you.</small> */}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price <span className="required">*</span></label>
          <input
            type="number"
            id="price"
            name="price"
            value={formValues.price}
            onChange={handleInputChange}
            placeholder="Enter product price"
            required
          />
          {/* <small>Your contact number for communication.</small> */}
        </div>

        <div className="form-group">
          <label htmlFor="quantityAvailable">Quantity-Available <span className="required">*</span></label>
          <input
            type="number"
            id="quantityAvailable"
            name="quantityAvailable"
            value={formValues.quantityAvailable}
            onChange={handleInputChange}
            placeholder="Enter quantity-Available"
            required
          />

        <div className="form-group">
          <label htmlFor="seller">Seller <span className="required">*</span></label>
          <input
            type="text"
            id="seller"
            name="seller"
            value={formValues.seller}
            onChange={handleInputChange}
            placeholder="Enter product seller"
            required
          />
          {/* <small>Your contact number for communication.</small> */}
        </div>




        <div className="form-group">
          <label htmlFor="picture">Price <span className="required">*</span></label>
          <input
            type="picture"
            id="picture"
            name="picture"
            value={formValues.picture}
            onChange={handleInputChange}
            placeholder="Enter product picture"
            required
          />
          {/* <small>Your contact number for communication.</small> */}
        </div>
          <div className="form-group">
          <label htmlFor="ratings">Ratings <span className="required">*</span></label>
          <input
            type="number"
            id="ratings"
            name="ratings"
            value={formValues.ratings}
            onChange={handleInputChange}
            placeholder="Enter product ratings"
            required
          />
          {/* <small>Your contact number for communication.</small> */}
        </div>
          {/* <small>Enter the total number of years you’ve worked as a tour guide.</small> */}
        </div>

        {/* <div className="form-group">
          <label htmlFor="previousWork">Previous Work</label>
          <textarea
            id="previousWork"
            name="previousWork"
            value={formValues.previousWork}
            onChange={handleInputChange}
            placeholder="Describe your previous work experience"
            rows="4"
          />
          <small>Briefly describe your previous experience in the industry.</small>
        </div> */}

        <div className="form-actions">
          <button type="button" onClick={handleUpdateProfile}>Save Changes</button>
          <button type="button" onClick={() => navigate(`../pages/productsPage`)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProducts;
