import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CountryDetails from './pages/Country';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/country/:name" element={<CountryDetails />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
