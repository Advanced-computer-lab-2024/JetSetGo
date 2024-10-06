import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

//pages & components
import Activities from './pages/Activities'
import Itineraries from './pages/Itineraries';
import Museums from './pages/Museums';
import HistoricalLocations from './pages/HistoricalLocations';
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            {/* Redirect to the /activities route when the app loads */}
            <Route path="/" element={<Navigate to="/activities" />} />

            
            <Route path="/activities" element={<Activities />} />
            <Route path="/itineraries" element={<Itineraries />} />
            <Route path="/museums" element={<Museums />} />
            <Route path="/historicalLocations" element={<HistoricalLocations />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
