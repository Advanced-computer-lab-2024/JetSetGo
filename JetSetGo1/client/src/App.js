import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages & components
import MustGoPlaces from './pages/MustGoPlaces'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<MustGoPlaces />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
