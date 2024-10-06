import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import ProductListing from './pages/productsPage'
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm";
import UpdateProducts from "./components/UpdateProduct";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
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
