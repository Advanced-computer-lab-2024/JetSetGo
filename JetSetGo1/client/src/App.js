import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import { useState } from 'react'; // Add this line
//pages & components
import Profile from './components/Profile'
//import touristProfile from './components/touristProfile'
import UpdateProfile from './components/UpdateProfile';
//import touristUpdateProfile from './components/touristUpdateProfile';
import CreateProfile from './components/CreateProfile';
import TouristProfilePage from './pages/TouristProfilePages';
import TouristEditPage from './pages/TouristEditPage';
import AdminAddPage from './pages/AdminAddPage';
import AdminProfilePage from './pages/AdminProfilePage';
import DeleteOptions from './pages/DeleteOptions';
import UserList from './pages/UserList';
import ItineraryManager from './pages/ItineraryManager';
import ProductListing from './pages/productsPage'
// import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm";
import UpdateProducts from "./components/UpdateProduct";

import Activities2 from './pages/Activities';
import Itineraries2 from './pages/Itineraries';
import Museums from './pages/museums';
import HistoricalLocations from './pages/historicallocations';

import ActivityFilter from './components/ActivityFilter';
import ItineraryFilter from './components/ItineraryFilter';
import MuseumFilter from './components/MuseumFilter';
import HistoricalPlaceFilter from './components/HistoricalPlaceFilter';


import HomePage from './pages/HomePage';

// import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages and components 
// import Home from './pages/home.js'
import Tagspage from './pages/my_tags.js'
import Categorypage from './pages/my_category.js'
// import Navbar from './components/navbar.js'
import Tourism_Governer from './pages/Tourism_Governer.js'
import HL from './pages/HistoricalLocations2.js'
import Museum from './pages/Museums2.js'
import HLMs from './pages/my_HLMs.js'
import Activities from './pages/my_activities2.js'
import Itineraries from './pages/my_itineraries.js'
import HLTags from './pages/hltag.js'

//john
import ActivityPagejohn from './pages/ActivityJohn';
import Authentication from './pages/Authentication/Authentication';
import ProfileJohn from './pages/profileJohn.js';


import AdminComplaints from './pages/Admin/AdminComplaintsPage.js';
import AdminViewComplaint from './pages/Admin/AdminViewComplaint.js'


function App() {

  const [filteredActivities, setFilteredActivities] = useState(null);
  const [filteredItinerary, setFilteredItinerary] = useState(null);
  const [filteredMuseum, setFilteredMuseum] = useState(null);
  const [filteredHistoricalPlace, setFilteredHistoricalPlace] = useState(null);

  const handleFilterResultsActivities = (results) => {
    setFilteredActivities(results);
  };

  const handleFilterResultsItineraries = (results) => {
    setFilteredItinerary(results);
  };

  const handleFilterResultsMusuems = (results) => {
    setFilteredMuseum(results);
  };

  const handleFilterResultsHistoricalPlaces = (results) => {
    setFilteredHistoricalPlace(results);
  };

  return (
    <div className="App">
      <BrowserRouter>

        <div className="pages">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/seller/products" element={<ProductListing usertype="seller" />} />
            <Route path="/admin/products" element={<ProductListing usertype="admin" />} />
            <Route path="/tourist/products" element={<ProductListing usertype="tourist" />} />
            {/* Other routes can be defined similarly */}
            <Route path="/seller/addProduct" element={<ProductForm usertype="seller" />} /> {/* Add product page */}
            <Route path="/admin/addProduct" element={<ProductForm usertype="admin" />} /> {/* Add product page */}
            <Route path="/seller/updateProduct/:id" element={<UpdateProducts usertype="seller" />} /> {/* Update product page */}
            <Route path="/admin/updateProduct/:id" element={<UpdateProducts usertype="admin" />} />

            <Route path="/delete/:role" element={<UserList />} />
            <Route path="/tour-guide/itineraryManager" element={<ItineraryManager />} />
            <Route path="/admin/profile" element={<AdminProfilePage />} />
            <Route path="/admin/delete-options" element={<DeleteOptions />} />
            <Route path="/admin/add" element={<AdminAddPage />} />
            <Route path="/edit/tourist/:id" element={<TouristEditPage />} />
            <Route path="/profile/tourist/:id" element={<TouristProfilePage />} />
            <Route path="/create/tour-guides/:id" element={<CreateProfile />} />
            <Route path="/update-profile/tour-guides/:id" element={<UpdateProfile />} />
            <Route path="/profile/tour-guides/:id" element={<Profile />} />
            <Route path="/activities2" element={<Activities2 filteredActivities={filteredActivities} />} />
            <Route path="/itineraries2" element={<Itineraries2 filteredItinerary={filteredItinerary} />} />
            <Route path="/museums" element={
              <><MuseumFilter onFilter={handleFilterResultsMusuems} />
                <Museums filteredMuseum={filteredMuseum} /></>} />
                
            {/* 
            <Route
              path="/"
              element={<Home />}
            /> */}
            <Route
              path="/my_tags"
              element={<Tagspage />}
            />
            <Route
              path="/my_category"
              element={<Categorypage />}
            />
            <Route
              path="/Tourism_Governer"
              element={<Tourism_Governer />}
            />
            <Route
              path="/HL"
              element={<HL />}
            />

            <Route
              path="/Museum"
              element={<Museum />}
            />
            <Route
              path="/HLTags"
              element={<HLTags />}
            />
            <Route
              path="/HLMs"
              element={<HLMs />}
            />

            <Route
              path="/Activities"
              element={<Activities />}
            />

            <Route
              path="/admin/getComplaints"
              element={<AdminComplaints />}
            />

            <Route
              path="/api/admin/viewComplaint"
              element={<AdminViewComplaint />}
            /> 

            <Route
              path="/Itineraries"
              element={<Itineraries />}
            />{/*johnn* */}
            <Route path='/ActivitiesJohn' element={<ActivityPagejohn />} />
            <Route path='/Authentication' element={<Authentication />} />
            <Route path='/profileJohn/:id' element={<ProfileJohn/>} />
              {/*johnn* */}
            <Route path="/historicalLocations" element={
              <>
                <HistoricalPlaceFilter onFilter={handleFilterResultsHistoricalPlaces} />
                <HistoricalLocations filteredHistoricalPlace={filteredHistoricalPlace} />
              </>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
