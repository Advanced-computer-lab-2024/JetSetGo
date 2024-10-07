import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductListing from './pages/productsPage';
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm";
import UpdateProducts from "./components/UpdateProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            {/* Default route for home or other components
            <Route path="/" element={<Home />} />
            */}
            

            {/* Seller route */}
            <Route path="/seller/products" element={<ProductListing usertype="seller" />} />
            <Route path="/admin/products" element={<ProductListing usertype="admin" />} />
            <Route path="/tourist/products" element={<ProductListing usertype="tourist" />} />
            {/* Other routes can be defined similarly */}
            <Route path="/seller/addProduct" element={<ProductForm usertype="seller" />} /> {/* Add product page */}
            <Route path="/admin/addProduct" element={<ProductForm usertype="admin" />} /> {/* Add product page */}
            <Route path="/seller/updateProduct/:id" element={<UpdateProducts usertype="seller"/>} /> {/* Update product page */}
            <Route path="/admin/updateProduct/:id" element={<UpdateProducts usertype="admin"/>} />

            {/* Product Form for adding products 
            <Route
              path="/components/ProductForm"
              element={<ProductForm />}
            />
            */}
            

            {/* Route for updating products 
            */}
            
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
