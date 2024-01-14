import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import logo from './assets/logo.svg';
import HomePage from './components/HomePage';
import DonationPage from './components/DonationPage';
import styles from './styles/App.module.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Navigation components like header or navbar can go here */}

        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/donate/:organizationId" element={<DonationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
