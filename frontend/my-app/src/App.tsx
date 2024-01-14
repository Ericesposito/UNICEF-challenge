import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage';
import DonationPage from './components/DonationPage';
import styles from './styles/App.module.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Add nav bar component here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/donate/:organizationId" element={<DonationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
