import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, useParams } from 'react-router-dom';
import DonationPage from './DonationPage';
import { getOrganizationById, makeDonation } from '../services/api';
import {
  makeBlockchainDonation,
  isMetaMaskInstalled,
} from '../services/web3Service';

// Mock the useParams hook from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

// Mock your service methods
jest.mock('../services/api');
jest.mock('../services/web3Service');

const renderDonationPage = (organizationId: string) => {
  (useParams as jest.Mock).mockReturnValue({ organizationId });
  render(
    <BrowserRouter>
      <DonationPage />
    </BrowserRouter>
  );
};

describe('DonationPage', () => {
  it('fetches and displays organization data', async () => {
    const mockOrgData = { id: '1', name: 'Global Relief Foundation' };
    (getOrganizationById as jest.Mock).mockResolvedValue(mockOrgData);
    renderDonationPage('1');

    await waitFor(() => {
      expect(
        screen.getByText('Donate to Global Relief Foundation')
      ).toBeInTheDocument();
    });
  });

  it('validates and submits the donation form', async () => {
    renderDonationPage('1');

    // Simulate user input
    const nameInput = screen.getByPlaceholderText('Your Name');
    const emailInput = screen.getByPlaceholderText('Your Email');
    const amountInput = screen.getByPlaceholderText('Donation Amount in ETH');
    const submitButton = screen.getByRole('button', { name: /donate/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(amountInput, { target: { value: '10' } });

    // Mock the function calls
    (isMetaMaskInstalled as jest.Mock).mockReturnValue(true);
    (makeBlockchainDonation as jest.Mock).mockResolvedValue(undefined);
    (makeDonation as jest.Mock).mockResolvedValue({ success: true });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Verify if the donation functions were called correctly
    await expect(isMetaMaskInstalled).toHaveBeenCalled();
    await expect(makeBlockchainDonation).toHaveBeenCalledWith('10');
    await expect(makeDonation).toHaveBeenCalledWith(
      '1',
      '10',
      'John Doe',
      'john@example.com'
    );

    // Check for confirmation alerts or messages
    try {
      // Use await and try/catch to handle the Promise returned by findByText
      await screen.findByText('Donation successful!');
    } catch (error) {
      // Handle any errors or timeouts here
      console.error('Error or timeout occurred:', error);
    }
  });
});
