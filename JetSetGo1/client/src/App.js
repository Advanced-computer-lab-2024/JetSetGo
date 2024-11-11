import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { useState } from "react"; // Add this line
//pages & components
import Profile from "./components/Profile";
//import touristProfile from './components/touristProfile'
import UpdateProfile from "./components/UpdateProfile";
//import touristUpdateProfile from './components/touristUpdateProfile';
import CreateProfile from "./components/CreateProfile";
import TouristProfilePagehazem from "./pages/TouristProfilePages";
import TouristEditPage from "./pages/TouristEditPage";
import AdminAddPage from "./pages/AdminAddPage";
import AdminProfilePage from "./pages/AdminProfilePage";
import DeleteOptions from "./pages/DeleteOptions";
import UserList from "./pages/UserList";
import ItineraryManager from "./pages/ItineraryManager";
import ProductListing from "./pages/Product/productsPage";
import ViewProduct from "./pages/Product/ProductDetails.js";
import MyPrefs from './pages/my_prefrences.js';
import MyBookingsPage from './components/my_bookings.js'
import TransportBookingPage from './components/TouristTransportationComponent.js';
// import Navbar from "./components/Navbar";
import ProductForm from "./pages/Product/ProductForm";
import UpdateProducts from "./pages/Product/UpdateProduct";

import Activities2 from "./pages/Activities";
import Itineraries2 from "./pages/Itineraries";
import Museums from "./pages/museums";
import HistoricalLocations from "./pages/historicallocations";

// import ActivityFilter from './components/ActivityFilter';
// import ItineraryFilter from './components/ItineraryFilter';
import MuseumFilter from "./components/MuseumFilter";
import HistoricalPlaceFilter from "./components/HistoricalPlaceFilter";

import HomePage from "./pages/HomePage";

import "@fortawesome/fontawesome-free/css/all.css";

// import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages and components 

import Tagspage from './pages/my_tags.js'
import PreferencesSelection from './pages/SelectPrefrences.js'
import Transportationpage from './pages/Transportation.js'
import Categorypage from './pages/my_category.js'
//pages and components
import Home from "./pages/home.js";

// import Navbar from './components/navbar.js'
import Tourism_Governer from "./pages/Tourism_Governer.js";
import HL from "./pages/HistoricalLocations2.js";
import Museum from "./pages/Museums2.js";
import HLMs from "./pages/my_HLMs.js";
import Activities from "./pages/my_activities2.js";
import Itineraries from "./pages/my_itineraries.js";
import HLTags from "./pages/hltag.js";

//johnimport { useTouristId } from '../../pages/Tourist/TouristIdContext';
//const { id } = useTouristId();

import TourGuideLayout from "./components/TourGuideLayout.js";
import FlagItinerary from "./components/FlagItinerary";
import ItineraryManagement from "./components/ItineraryManagement";
import CategoriesAndActivities from "./components/CategoriesAndActivities";


//homepages
import AdminDashboard from "./pages/homepages/adminhomepage.js";
import Layout from "./components/Admin/layout.js";

import TouristComplaint from "./pages/Tourist/TouristComplaints.js";
import ToursitPage from "./pages/Tourist/home.js";
import TouristLayout from "./components/Tourist/TouristLayout.js";
import { CurrencyProvider } from "./components/Tourist/CurrencyContext.js";
import GuestPage from "./pages/homepages/guestHomepage.js";
import TermsAndConditionsForm from "./components/TermsAndCondition/TermsAndCondition.js";
import AdminDocumentReview from "./pages/Admin/AdminVeiwDocuments.js";
import AdminComplaints from "./pages/Admin/AdminComplaints.js";
import TouristProductListing from "./pages/Tourist/TouristProductPage.js";
import SalesOverviewChart from "./components/Admin/SalesOverviewChart.js";

import AdminViewComplaint from "./pages/Admin/AdminViewComplaint.js";

import TouristAddComplaintPage from "./pages/Tourist/TouristComplaintPage.js";
import TouristProfile from "./pages/Tourist/TouristProfilePage.js";

import ActivityDetailPage from "./pages/ActivityDetailPage";
import ItineraryDetailPage from "./pages/ItineraryDetailPage";

import ChangePassword from "./components/Admin/changePassword.js";
import ImageUpload from "./components/Admin/uploadPicture.js";
import RequestAccountDeletion from "./components/Admin/AccountDeletion.js";
import ActivityPageJohn from "./pages/Advertiser/ActivityJohn.js";
import Authentication from "./pages/Authentication/Authentication";
import SellerProfile from "./components/userDetails/SellerProfile.js";
import AdvertiserProfile from "./components/userDetails/AdvertiserProfile.js";

// Jimmy
import Dashboard2 from "./components/Jimmy/Dashboard2.js";
import AddRatingComment from "./components/Jimmy/AddRatingComment.js";
import AddRatingCommentItinerary from "./components/Jimmy/AddRatingCommentItinerary.js";
import TouristTourGuideProfile from "./components/Jimmy/TouristTourGuideProfile.js";
import TouristItineraryDetails from "./components/Jimmy/TouristItineraryDetails.js";
import AdvertiserLayout from "./components/Advertiser/AdvertiserLayout.js"
import AdvertiserActivities from "./pages/Advertiser/AdvertiserActivities.js";
// JIMMY END

import GuestLayout from "./components/Guest/GuestLayout.js";




import Booking from './pages/bookhotel.js'
import ActivityList from './components/ActivityList-Rate-Comment.js';
import FlightSearch from './components/flights.js'; 


function App() {
  const [view, setView] = useState("home"); // 'home', 'viewDocuments'

  const handleViewDocuments = () => {
    setView("viewDocuments");
  };

  const handleBackToHome = () => {
    setView("home");
  };
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
    <div>
      <BrowserRouter>
        <div>
          <CurrencyProvider>
            <Routes>
              <Route
                path="/change-password/:id/:modelName"
                element={<ChangePassword />}
              />
              {/*kol users */}
              <Route
                path="/upload-image/:id/:modelName"
                element={<ImageUpload />}
              />
              {/*tourguide advertiser seller */}
              <Route
                path="/RequestDelete/:id/:modelName"
                element={<RequestAccountDeletion />}
              />
              <Route path="/:modelName/:id/terms" element={<TermsAndConditionsForm />} />
              {/* tourguide advertiser seller tourist*/}
              {/* Advertiser */}
              <Route path="/Advertiser/:id" element={<AdvertiserLayout />}>
              <Route path='/Advertiser/:id/advertiserprofile' element={<AdvertiserProfile/>} />
              <Route
                path="/Advertiser/:id/ActivitiesJohn/:id"
                element={<ActivityPageJohn />}
              />
              <Route
                path="/Advertiser/:id/AdvertiserActivities/:id"
                element={<AdvertiserActivities />}
              />
              
              </Route>
              
              
              <Route path="/sellerprofile/:userId" element={<SellerProfile />} />
              <Route path="/Authentication" element={<Authentication />} />

              <Route path="/" element={<TermsAndConditionsForm />} />

              {/** Admiin */}
              <Route path="/admin" element={<Layout />}>
                <Route
                  path="/admin/requests"
                  element={<AdminDocumentReview />}
                />{" "}
                {/*momen */}
                <Route
                  path="/admin/products"
                  element={<ProductListing usertype="admin" />}
                />
                <Route path="/admin/viewproduct" element={<ViewProduct />} />
                <Route
                  path="/admin/complaints"
                  element={<AdminComplaints />}
                />{" "}
                {/*momen */}
                <Route
                  path="/admin/addProduct"
                  element={<ProductForm usertype="admin" />}
                />{" "}
                {/* Add product page */}
                <Route
                  path="/admin/viewComplaint"
                  element={<AdminViewComplaint />}
                />
                <Route path="/admin/sales" element={<SalesOverviewChart />} />
                <Route
                  path="/admin/change-password/:id/:modelName"
                  element={<ChangePassword />}
                />
              </Route>

              {/** Tourist */}
              <Route path="/tourist/:id" element={<TouristLayout />}>
                {/* <Route path="/tourist/:id/terms" element={<TermsAndConditionsForm />} /> */}
                <Route path="/tourist/:id/products"element={<TouristProductListing usertype="tourist" />}/>
                <Route path="/tourist/:id/Complaints" element={<TouristComplaint />}/>{/** lazem takhod id */}
                <Route path="/tourist/:id/home" element={<ToursitPage />} />
                <Route path="/tourist/:id/viewproduct" element={<ViewProduct />} />
                <Route path="/tourist/:id/addComplaint/:id"element={<TouristAddComplaintPage />}/>
                <Route path="/tourist/:id/change-password/:id/:modelName" element={<ChangePassword />}/>
                <Route path="/tourist/:id/RequestDelete/:modelName/:id" element={<RequestAccountDeletion />} />
                <Route path="/tourist/:id/profile/tourist/:id" element={<TouristProfile />} />
                <Route path="/tourist/:id/activity/:activityId/tourist/:id" element={<ActivityDetailPage />}/>{/* New route for activity details */}
                <Route path="/tourist/:id/activities2" element={<Activities2 filteredActivities={filteredActivities} />} />
                <Route path="/tourist/:id/itineraries2" element={<Itineraries2 filteredItinerary={filteredItinerary} />} />
                <Route path="/tourist/:id/itinerary/:itineraryId/tourist/:id" element={<ItineraryDetailPage />} /> 
                <Route path="/tourist/:id/historicalLocations" element={ <> <HistoricalPlaceFilter onFilter={handleFilterResultsHistoricalPlaces} /> <HistoricalLocations filteredHistoricalPlace={filteredHistoricalPlace}/></> } />
                {/** jimmy */}
                <Route path="/tourist/:id/tourguidelist" element={<Dashboard2 />} />
                <Route path="/tourist/:id/viewTourGuideProfile/:guideId" element={<TouristTourGuideProfile />} />
                <Route path="/tourist/:id/add-rating-comment/:guideId" element={<AddRatingComment />} />
                <Route path="/tourist/:id/add-rating-comment-itinerary/:iternaryId" element={<AddRatingCommentItinerary />} />
                <Route path="/tourist/:id/TouristItineraryDetails/:iternaryId" element={<TouristItineraryDetails />} />
                <Route path="/tourist/:id/ActivitiesHazem" element={<CategoriesAndActivities />} />
                
              </Route>

              {/** Guest */}
              <Route path="/guest" element={<GuestLayout />}>
                <Route path="/guest/home" element={<GuestPage />} />
                <Route path="/guest/activity/:activityId" element={<ActivityDetailPage />}/>{/* New route for activity details */}
                <Route path="/guest/activities2" element={<Activities2 filteredActivities={filteredActivities} />} />
                <Route path="/guest/itineraries2" element={<Itineraries2 filteredItinerary={filteredItinerary} />} />
                <Route path="/guest/itinerary/:itineraryId" element={<ItineraryDetailPage />} /> 
                <Route path="/guest/historicalLocations" element={ <> <HistoricalPlaceFilter onFilter={handleFilterResultsHistoricalPlaces} /> <HistoricalLocations filteredHistoricalPlace={filteredHistoricalPlace}/></> } />
                {/* <Route path="/guest/authentication" element={<Authentication />} /> */}
                
              </Route>



              {/** Tourguide */}
              <Route path="/tourguide/:id" element={<TourGuideLayout />}>
                <Route
                  path="/tourguide/:id/create/tour-guides/:id"
                  element={<CreateProfile />}
                />
                <Route
                  path="/tourguide/:id/profile/tour-guides/:id"
                  element={<Profile />}
                />
                <Route
                  path="/tourguide/:id/update-profile/tour-guides/:id"
                  element={<UpdateProfile />}
                />
                <Route
                  path="/tourguide/:id/Itineraries"
                  element={<Itineraries />}
                />
                <Route
                  path="/tourguide/:id/Activities"
                  element={<Activities />}
                />
                <Route path="/tourguide/:id/Museum" element={<Museum />} />
                <Route path="/tourguide/:id/HL" element={<HL />} />
                <Route
                  path="/tourguide/:id/ItineraryManagement"
                  element={<ItineraryManagement />}
                />
              </Route>
              <Route path="/guest" element={<GuestPage />} />
              <Route
                path="/admindashboard"
                element={<AdminDashboard />}
              ></Route>
              <Route
                path="/seller/products"
                element={<ProductListing usertype="seller" />}
              />
              
              
              {/* Other routes can be defined similarly */}
              <Route
                path="/seller/addProduct"
                element={<ProductForm usertype="seller" />}
              />{" "}
              {/* Add product page */}
              <Route
                path="/seller/updateProduct/:id"
                element={<UpdateProducts usertype="seller" />}
              />{" "}
              {/* Update product page */}
              <Route
                path="/admin/updateProduct/:id"
                element={<UpdateProducts usertype="admin" />}
              />
              <Route path="/delete/:role" element={<UserList />} />
              <Route
                path="/tour-guide/itineraryManager/:id"
                element={<ItineraryManager />}
              />
              <Route path="/admin/profile" element={<AdminProfilePage />} />
              <Route path="/admin/delete-options" element={<DeleteOptions />} />
              <Route path="/admin/add" element={<AdminAddPage />} />
              <Route path="/edit/tourist/:id" element={<TouristEditPage />} />
              <Route
                path="/create/tour-guides/:id"
                element={<CreateProfile />}
              />
              <Route
                path="/update-profile/tour-guides/:id"
                element={<UpdateProfile />}
              />
              <Route path="/profile/tour-guides/:id" element={<Profile />} />
              <Route
                path="/activities2"
                element={
                  <Activities2 filteredActivities={filteredActivities} />
                }
              />
              {/** tourist and guest */}
              <Route
                path="/itineraries2"
                element={<Itineraries2 filteredItinerary={filteredItinerary} />}
              />
              <Route
                path="/museums"
                element={
                  <>
                    <MuseumFilter onFilter={handleFilterResultsMusuems} />
                    <Museums filteredMuseum={filteredMuseum} />
                  </>
                }
              />
               <Route path="/book-hotel" element={
              <div style={{ padding: 20 }}>
                <Booking touristId={"670255f97b12bc9e3f1c7f26"} />
              </div>} />

            <Route path="/rate-comment-event" element={<ActivityList touristId={"670255f97b12bc9e3f1c7f26"} />} />  ///////////////////////////////////
            <Route path="/book_flight" element={<FlightSearch touristId={"670255f97b12bc9e3f1c7f26"} />} />
            
              <Route path="/hhh" element={<Home />} />
              <Route path="/my_tags" element={<Tagspage />} />
              <Route path="/my_category" element={<Categorypage />} />
              <Route path="/Tourism_Governer" element={<Tourism_Governer />} />
              <Route path="/HL" element={<HL />} />
              <Route path="/Museum" element={<Museum />} />
              <Route path="/HLTags" element={<HLTags />} />
              <Route path="/HLMs" element={<HLMs />} />
              <Route path="/Activities" element={<Activities />} />
              <Route path="/Itineraries" element={<Itineraries />} />
              {/*JIMMY */}

              <Route
                path="/historicalLocations"
                element={
                  <>
                    <HistoricalPlaceFilter
                      onFilter={handleFilterResultsHistoricalPlaces}
                    />
                    <HistoricalLocations
                      filteredHistoricalPlace={filteredHistoricalPlace}
                    />
                  </>
                }
              />
            </Routes>
          </CurrencyProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

