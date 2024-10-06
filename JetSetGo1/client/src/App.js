import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages and components 
import Home from './pages/home.js'
import Tagspage from './pages/my_tags.js'
import Categorypage from './pages/my_category.js'
import Navbar from './components/navbar.js'
import Tourism_Governer from './pages/Tourism_Governer.js'
import HL from './pages/historicallocations.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="navigation-links">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
