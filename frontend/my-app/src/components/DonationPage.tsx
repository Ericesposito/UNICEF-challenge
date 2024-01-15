import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// importing backend calls to fetch data
import { getOrganizationById, makeDonation } from '../services/api';
import {
  makeBlockchainDonation,
  isMetaMaskInstalled,
} from '../services/web3Service';
import { Organization } from '../types/types';
import styles from '../styles/DonationPage.module.css';

const DonationPage: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [nameError, setNameError] = useState('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [emailError, setEmailError] = useState('');
  const [organization, setOrganization] = useState<Organization | null>(null);
  const { organizationId } = useParams<{ organizationId: string }>();

  useEffect(() => {
    if (organizationId) {
      getOrganizationById(organizationId)
        .then((data) => setOrganization(data))
        .catch((error) => console.error(error));
    }
  }, [organizationId]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string): boolean => {
    return name.trim().length > 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset name and email for validation
    setNameError('');
    setEmailError('');

    if (!organizationId) {
      throw new Error('Organization ID is required for donation.');
    } else if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    // Validating name entry
    setNameError('');
    if (!validateName(donorName)) {
      setNameError('Please enter your name.');
      return;
    }

    // Validate email entry
    setEmailError('');
    if (!validateEmail(donorEmail)) {
      setEmailError('Please enter a valid email.');
      return;
    }

    try {
      // confirm that MetaMask is installed
      // if (!isMetaMaskInstalled()) {
      //   alert('Please install MetaMask to proceed.');
      //   return;
      // }

      // confirm that the Ethereum account in MetaMask is accessible
      // const accounts = await window.ethereum.request({
      //   method: 'eth_requestAccounts',
      // });
      // console.log('Accounts:', accounts);

      // if (accounts.length === 0) {
      //   alert(
      //     'No Ethereum accounts available. Please connect an account in MetaMask.'
      //   );
      //   return;
      // }

      // attempt to make the blockchain donation and confirm
      await makeBlockchainDonation(amount);

      await makeDonation(organizationId, amount, donorName, donorEmail);
      // Alert to handle successful submission logic
      alert('Donation successful!');
    } catch (error) {
      // Alert to handle error logic
      alert('Error processing donation.');
      console.error(error);
    }
  };

  return (
    <div>
      {organization && (
        <h2 className={styles.organizationName}>
          Donate to {organization.name}
        </h2>
      )}
      <form onSubmit={handleSubmit} className={styles.donationForm}>
        <input
          type="text"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          placeholder="Your Name"
          className={styles.inputField}
        />
        {nameError && <div className={styles.error}>{nameError}</div>}

        <input
          type="email"
          value={donorEmail}
          onChange={(e) => setDonorEmail(e.target.value)}
          placeholder="Your Email"
          className={styles.inputField}
        />
        {emailError && <div className={styles.error}>{emailError}</div>}

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Donation Amount in ETH"
          className={styles.inputField}
        />
        <button type="submit" className={styles.submitButton}>
          Donate
        </button>
      </form>
    </div>
  );
};

export default DonationPage;
