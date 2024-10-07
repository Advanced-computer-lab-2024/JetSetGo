import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Searchbar from './components/Searchbar'
import Form from './components/Form'
import FormV2 from './components/FormV2'
import ActivityFilter from './components/ActivityFilter'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ActivityFilter />
      <div className='pages'>
        <Routes>
          <Route 
          path='/'
          // element ={<Home />}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
