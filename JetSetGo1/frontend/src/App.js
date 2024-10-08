import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from "react";
import "./styles.css";
import styled from "styled-components";
import Authentication from './pages/Authentication/Authentication';

//pages and components
import Profile from './pages/Profile.js';
// JetSetGo\JetSetGo1\frontend\src\pages\Profile.js
import AccountBox from "./components/accountBox/index"
import ActivityPage from './pages/ActivityPage';


const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
        <Routes>
        <Route path='/Activities' element={<ActivityPage />} />
        <Route path='/' element={<Authentication />} />
        <Route path='/profile/:id' element={<Profile/>} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
