import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';

import HomePage from './components/HomePage';
import DonationPage from './components/DonationPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/donate/:organizationId" element={<DonationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
