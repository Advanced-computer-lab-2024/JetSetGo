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
import Home from "./pages/home.js";
import Tagspage from "./pages/my_tags.js";
import Categorypage from "./pages/my_category.js";
// import Navbar from './components/navbar.js'
import Tourism_Governer from "./pages/Tourism_Governer.js";
import HL from "./pages/HistoricalLocations2.js";
import Museum from "./pages/Museums2.js";
import HLMs from "./pages/my_HLMs.js";
import Activities from "./pages/my_activities2.js";
import Itineraries from "./pages/my_itineraries.js";
import HLTags from "./pages/hltag.js";

//john

import TourGuideLayout from "./components/TourGuideLayout.js";
import FlagItinerary from "./components/FlagItinerary";
import ItineraryManagement from "./components/ItineraryManagement";
import CategoriesAndActivities from "./components/CategoriesAndActivities";
import ShareLink from "./components/ShareLink";

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
import ActivityPagejohn from "./pages/ActivityJohn";
import Authentication from "./pages/Authentication/Authentication";
import ProfileJohn from "./pages/profileJohn.js";
import TourGuideLayout from "./components/TourGuideLayout.js";
import FlagItinerary from "./components/FlagItinerary";
import ItineraryManagement from "./components/ItineraryManagement";
import CategoriesAndActivities from "./components/CategoriesAndActivities";
import ShareLink from "./components/ShareLink";

import AdminComplaints from "./pages/Admin/AdminComplaintsPage.js";
import AdminViewComplaint from "./pages/Admin/AdminViewComplaint.js";

import TouristAddComplaintPage from "./pages/Tourist/TouristComplaintPage.js";
import TouristProfile from "./pages/Tourist/TouristProfilePage.js";

import ActivityDetailPage from "./pages/ActivityDetailPage";
import ItineraryDetailPage from "./pages/ItineraryDetailPage";

// JIMMY

import Dashboard2 from "./components/Jimmy/Dashboard2.js";
import AddRatingComment from "./components/Jimmy/AddRatingComment.js";
import AddRatingCommentItinerary from "./components/Jimmy/AddRatingCommentItinerary.js";
import TouristTourGuideProfile from "./components/Jimmy/TouristTourGuideProfile.js";
import TouristItineraryDetails from "./components/Jimmy/TouristItineraryDetails.js";

// JIMMY END

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
                path="/upload-image/:id/:controllerName"
                element={<ImageUpload />}
              />
              {/*tourguide advertiser seller */}
              <Route
                path="/RequestDelete/:userType/:userId"
                element={<RequestAccountDeletion />}
              />
              {/* tourguide advertiser seller tourist*/}
              <Route
                path="/ActivitiesJohn/:id"
                element={<ActivityPageJohn />}
              />
              <Route path="/Authentication" element={<Authentication />} />
              <Route path="/profileJohn/:id/:role" element={<ProfileJohn />} />
              <Route path="/" element={<TermsAndConditionsForm />} />
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
              <Route path="/tourist" element={<TouristLayout />}>
                <Route
                  path="/tourist/Complaints"
                  element={<TouristComplaint />}
                />
                {/** lazem takhod id */}
                <Route
                  path="/tourist/products"
                  element={<TouristProductListing usertype="tourist" />}
                />
                <Route path="/tourist/home" element={<ToursitPage />} />
                <Route path="/tourist/viewproduct" element={<ViewProduct />} />
                <Route
                  path="/tourist/addComplaint/:id"
                  element={<TouristAddComplaintPage />}
                />
                <Route
                  path="/tourist/change-password/:id/tourist"
                  element={<ChangePassword />}
                />
                <Route
                  path="/tourist/RequestDelete/:userType/:userId"
                  element={<RequestAccountDeletion />}
                />
                <Route
                  path="/tourist/profile/tourist/:id"
                  element={<TouristProfile />}
                />
                <Route
                  path="/tourist/activity/:activityId/tourist/:id"
                  element={<ActivityDetailPage />}
                />{" "}
                {/* New route for activity details */}
                <Route
                  path="/tourist/activities2"
                  element={
                    <Activities2 filteredActivities={filteredActivities} />
                  }
                />
                <Route
                  path="/tourist/itineraries2"
                  element={
                    <Itineraries2 filteredItinerary={filteredItinerary} />
                  }
                />
                <Route
                  path="/tourist/itinerary/:itineraryId/tourist/:id"
                  element={<ItineraryDetailPage />}
                />{" "}
                {/* New route for itinerary details */}
              </Route>
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
              <Route
                path="/tourist/products"
                element={<ProductListing usertype="tourist" />}
              />
              <Route path="/" element={<HomePage />} />
              <Route
                path="/seller/products"
                element={<ProductListing usertype="seller" />}
              />
              <Route
                path="/admin/products"
                element={<ProductListing usertype="admin" />}
              />
              <Route
                path="/tourist/products"
                element={<ProductListing usertype="tourist" />}
              />
              {/* Other routes can be defined similarly */}
              <Route
                path="/seller/addProduct"
                element={<ProductForm usertype="seller" />}
              />{" "}
              {/* Add product page */}
              <Route
                path="/admin/addProduct"
                element={<ProductForm usertype="admin" />}
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
              <Route path="/FlagItinery" element={<FlagItinerary />} />
              <Route
                path="/ItineraryManagement"
                element={<ItineraryManagement />}
              />
              <Route
                path="/CategoriesAndActivities"
                element={<CategoriesAndActivities />}
              />
              <Route path="/ShareLink" element={<ShareLink />} />
              <Route
                path="/tour-guide/itineraryManager"
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
              <Route
                path="/profile/tourist/:id"
                element={<TouristProfilePage />}
              />
              <Route
                path="/activities2"
                element={
                  <Activities2 filteredActivities={filteredActivities} />
                }
              />
              <Route
                path="/activity/:activityId/tourist/:touristId"
                element={<ActivityDetailPage />}
              />{" "}
              {/* New route for activity details */}
              <Route
                path="/itineraries2"
                element={<Itineraries2 filteredItinerary={filteredItinerary} />}
              />
              <Route
                path="/itinerary/:itineraryId/tourist/:touristId"
                element={<ItineraryDetailPage />}
              />{" "}
              {/* New route for itinerary details */}
              <Route
                path="/museums"
                element={
                  <>
                    <MuseumFilter onFilter={handleFilterResultsMusuems} />
                    <Museums filteredMuseum={filteredMuseum} />
                  </>
                }
              />
              {/* 
            <Route
              path="/hhhprofile/tourist/:id"
              element={<TouristProfilePage />}
            />
            {/* JIMMY 
            <Route path="/touristFollows2" element={<Dashboard2 />} />
            <Route
              path="/tourist/viewTourGuideProfile/:id"
              element={<TouristTourGuideProfile />}
            />
            <Route
              path="/add-rating-comment/:id"
              element={<AddRatingComment />}
            />
            <Route
              path="/add-rating-comment-itinerary/:id"
              element={<AddRatingCommentItinerary />}
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
              path="/TouristItineraryDetails/:id"
              element={<TouristItineraryDetails />}
            />
            {/* JIMMY END */}
              <Route
                path="/activities2"
                element={
                  <Activities2 filteredActivities={filteredActivities} />
                }
              />
              <Route path="/Activities" element={<Activities />} />
              path="/itineraries2" element=
              {<Itineraries2 filteredItinerary={filteredItinerary} />}
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
              {/* 
            <Route
              path="/"
              element={<Home />}
            /> */}
              <Route path="/my_tags" element={<Tagspage />} />
              <Route path="/my_category" element={<Categorypage />} />
              <Route path="/Tourism_Governer" element={<Tourism_Governer />} />
              <Route path="/HLTags" element={<HLTags />} />
              <Route path="/HLMs" element={<HLMs />} />
              <Route path="/Activities" element={<Activities />} />
              <Route
                path="/admin/getComplaints"
                element={<AdminComplaints />}
              />
              <Route
                path="/api/admin/viewComplaint"
                element={<AdminViewComplaint />}
              />
              <Route path="/Itineraries" element={<Itineraries />} />
              {/*johnn* */}
              <Route path="/ActivitiesJohn" element={<ActivityPagejohn />} />
              <Route path="/Authentication" element={<Authentication />} />
              <Route path="/profileJohn/:id" element={<ProfileJohn />} />
              {/*johnn* */}
              <Route path="/Itineraries" element={<Itineraries />} />
              {/*johnn* */}
              <Route path="/Authentication" element={<Authentication />} />
              <Route path="/profileJohn/:id" element={<ProfileJohn />} />
              {/*johnn* */}
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
              path="/historicalLocations" element=
              {
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
              <Route
                path="/tourist/complaint/:userId"
                element={<TouristComplaint />}
              />
              <Route
                path="/tourist/touristProfile/:touristId"
                element={<TouristProfile />}
              />
            </Routes>
          </CurrencyProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
