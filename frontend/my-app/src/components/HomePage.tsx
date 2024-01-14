import React, { useState, useEffect } from 'react';

// importing async function getOrganizations from the backend API call/services file
import { getOrganizations } from '../services/api';

// importing Organization type from the types file
import { Organization } from '../types/types';

import styles from '../styles/HomePage.module.css'

const HomePage: React.FC = () => {
  // setting up a useState hook to hold the list of Organizations fetched from the backend
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  // setting up useState hook to represent loading status during async call
  const [loading, setLoading] = useState<boolean>(true);
  // setting up useState hook to manage error state information
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // upon component render, update list of organizations via backend API call to get Orgs
    getOrganizations()
      .then((data: Organization[]) => {
        setOrganizations(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Organizations</h1>
      <div className={styles.organizationsContainer}>
      {/* cleanly display the organizations by mapping the current fetched Orgs state from the backend */}
        {organizations.map(org => (
          <div key={org.id} className={styles.organizationItem}>
            {org.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
