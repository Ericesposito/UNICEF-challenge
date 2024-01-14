import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from '../styles/DonationPage.module.css'; // Adjust the path as needed

// Assume makeDonation is defined in your services
import { makeDonation } from '../services/api';

const DonationPage: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const { organizationId } = useParams<{ organizationId: string }>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      if (!organizationId || !amount) {
        throw new Error("Organization ID and amount are required for donation.");
      }
      await makeDonation(organizationId, amount.toString());
      // Handle successful submission logic (e.g., showing a success message)
  };

  return (
    <form onSubmit={handleSubmit} className={styles.donationForm}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={styles.donationInput}
      />
      <button type="submit" className={styles.donationButton}>
        Donate
      </button>
    </form>
  );
};

export default DonationPage;