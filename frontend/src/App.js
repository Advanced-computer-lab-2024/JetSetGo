import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import ProductListing from './pages/productsPage'
import Navbar from "./components/Navbar";

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
