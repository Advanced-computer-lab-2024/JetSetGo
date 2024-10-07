import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
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
import ProductForm from "./components/ProductForm";
import UpdateProducts from "./components/UpdateProduct";




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Profile/>
        <div className="pages">
          <Routes>
            <Route
            path="/delete/:role"
            element={<UserList/>}
            />
            <Route
            path="/tour-guide/itineraryManager"
            element={<ItineraryManager/>}
            />
            <Route
            path="/admin/profile"
            element={<AdminProfilePage/>}
            />
            <Route
            path="/admin/delete-options"
            element={<DeleteOptions/>}
            />
            <Route
            path="/admin/add"
            element={<AdminAddPage/>}
            />
            <Route
            path="/edit/tourist/:id"
            element={<TouristEditPage/>}
            />
            <Route
            path="/profile/tourist/:id"
            element={<TouristProfilePage/>}
            />
            <Route
            path="/create/tour-guides/:id"
            element={<CreateProfile/>}
            />
            <Route path="/update-profile/tour-guides/:id"
             element={<UpdateProfile />} 
            />
            <Route
              path="/profile/tour-guides/:id"
              element={<Profile/>}
            />
            <Route 
              path="/"
              element={<ProductListing />} />
              <Route
            path="/components/ProductForm"
            element={<ProductForm/>}
            />
            <Route
            path="components/UpdateProduct/:id"
            element={<UpdateProducts/>}
            />
          
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;



