import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages and components 
import Home from './pages/home.js'
import Tagspage from './pages/my_tags.js'
import Categorypage from './pages/my_category.js'
import Navbar from './components/navbar.js'
import Tourism_Governer from './pages/Tourism_Governer.js'
import HL from './pages/historicallocations.js'
import Museum from './pages/museums.js'
import HLMs from './pages/my_HLMs.js'
import Activities from './pages/my_activities.js'
import Itineraries from './pages/my_itineraries.js'
import HLTags from './pages/hltag.js'


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
              path="/Itineraries"
              element={<Itineraries />}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
