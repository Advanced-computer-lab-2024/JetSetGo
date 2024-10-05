import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar';
import CMuseum from './pages/cMuseum';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className='pages'>
        <Routes>
          <Route
            path = "/"
            element={<CMuseum />}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
