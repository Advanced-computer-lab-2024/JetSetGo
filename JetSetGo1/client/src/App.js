import { useState } from 'react'; // Add this line
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Activities from './pages/Activities';
import Itineraries from './pages/Itineraries';
import Museums from './pages/Museums';
import HistoricalLocations from './pages/HistoricalLocations';
import Navbar from './components/Navbar';

import ActivityFilter from './components/ActivityFilter';
import ItineraryFilter from './components/ItineraryFilter';
import MuseumFilter from './components/MuseumFilter';
import HistoricalPlaceFilter from './components/HistoricalPlaceFilter';

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
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Navigate to="/activities" />} />
            <Route
              path="/activities"
              element={
                <>
                  <ActivityFilter onFilter={handleFilterResultsActivities}/>
                  <Activities filteredActivities={filteredActivities} />
                </>
              }
            />
            <Route
              path="/itineraries"
              element={
                <>
                  <ItineraryFilter onFilter={handleFilterResultsItineraries}/>
                  <Itineraries filteredItinerary={filteredItinerary} />
                </>
              }
            />
             <Route
              path="/museums"
              element={
                <>
                  <MuseumFilter onFilter={handleFilterResultsMusuems}/>
                  <Museums filteredMuseum={filteredMuseum} />
                </>
              }
            />
             <Route
              path="/historicalLocations"
              element={
                <>
                  <HistoricalPlaceFilter onFilter={handleFilterResultsHistoricalPlaces}/>
                  <HistoricalLocations filteredHistoricalPlace={filteredHistoricalPlace} />
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
