import React,{useContext} from 'react';

import './homepage.css';

import { CurrencyContext } from './CurrencyContext';
const currencies=["EGP","EUR","USD"]

function NavBar() {

  const { currency, setCurrency } = useContext(CurrencyContext);

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <div>
        <div className="navvvbar">
            <div className="logo">
                {/* <h1>Travel Wiki</h1> 
                <img src="/images/jetsetgo.jpg" alt="Explore" className="card-image" />*/}
            </div>
            <div className="menu">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Trips</a></li>
                    <li><a href="#">Activities</a></li>
                    <li><a href="#">Recent Trips</a></li>
                    <li><a href="#">About Us</a></li>
                    
                    
                </ul>
            </div>
            <div className="signup">
                <a href="#">Sign Up</a>
            </div>
            <div className='currency'>
                <button className="currencyChanger">
                    {currencies[0]}
                </button>
                <select value={currency} onChange={handleCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    {/* Add other currencies as needed */}
                </select>
            </div>
	    </div>
    </div>
	
  );
}
export default NavBar;
