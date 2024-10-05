import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages and components
import Navbar from './components/Navbar';
import Museums from './pages/Museums.js';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className='pages'>
        <Routes>
          <Route
            path = "/"
            element={<Museums/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
