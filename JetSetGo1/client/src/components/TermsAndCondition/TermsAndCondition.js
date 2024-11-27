import React, { useState } from 'react';
import './TermsAndCondition.css'; // Import CSS for styling
import { Link, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import Cookies from "js-cookie"; // Import js-cookie

function TermsAndConditionsForm() {
  const token = Cookies.get("auth_token");
  const decodedToken = jwtDecode(token);
  const id = decodedToken.id; 
  const modelName = decodedToken.userType;
  // const location = useLocation();
  console.log("terms", modelName, id);
  // const { modelName, id } = useParams(); 

  // State to track whether the terms are accepted
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    setAcceptedTerms(event.target.checked);
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (acceptedTerms) {
      setFormSubmitted(true);
      alert("Form submitted. Terms accepted!");
    } else {
      alert("Please accept the terms and conditions before proceeding.");
    }
  };

  // Conditionally set the link path based on the role
  const getLinkPath = () => {
    if (modelName === 'Seller' || modelName === 'Tourist') {
      return `/${modelName}/products`;  // Lowercase the model name for the URL
    } else {
      return `/${modelName}/${id}`; // Replace with the link you want for other roles
    }
  };
      
  return (
    <div className="centered-container">
      <div className="terms-form">
        <h2>Terms and Conditions</h2>
        <p>Please read and accept the terms and conditions to continue.</p>

        <div className="terms-text">
          <p>[Insert Terms and Conditions text here]</p>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="terms"> I accept the terms and conditions</label>
          </div>
          
          <Link to={getLinkPath()} state={{ id }}>
            <button
              type="submit"
              disabled={!acceptedTerms}
              className={`continue-button ${acceptedTerms ? 'active' : ''}`}
            >
              Continue
            </button>
          </Link>
        </form>

        {formSubmitted && <p>Thank you! Your acceptance has been recorded.</p>}
      </div>
    </div>
  );
}

export default TermsAndConditionsForm;
