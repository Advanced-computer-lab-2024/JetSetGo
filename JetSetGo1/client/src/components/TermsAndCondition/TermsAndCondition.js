import React, { useState,useEffect  } from 'react';
import './TermsAndCondition.css'; // Import CSS for styling
import { Link, useParams } from "react-router-dom";
 
import { useLocation } from 'react-router-dom';



function TermsAndConditionsForm() {
  const location = useLocation();
  const {modelName,id}= useParams()
  
  


   
 

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
                  <Link to={`/${modelName}`} state={{id}}>
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