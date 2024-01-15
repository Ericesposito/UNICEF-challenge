import Web3 from 'web3';

import DonationContractJSON from '../contracts/Donation.json';

const web3 = new Web3(
  window.ethereum ||
    'https://sepolia.infura.io/v3/648c42b77ca14423a0accd250d22c8f0'
);

const contractAddress = '0xB38AF23bc70B81cef1d54620aFb775c8C094145A';
const donationContract = new web3.eth.Contract(
  DonationContractJSON.abi,
  contractAddress
);

const makeBlockchainDonation = async (amountInEther: string): Promise<void> => {
  try {
    // confirming that MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    } else {
      console.log('MetaMask not found. Please install MetaMask.');
    }

    // confirming that window.ethereum is being accessed properly for account validation
    if (!window.ethereum || !window.ethereum.request) {
      throw new Error('Ethereum object not found.');
    }

    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // validate gathered account
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0)
      throw new Error('No Ethereum accounts available.');

    const amountInWei = web3.utils.toWei(amountInEther, 'ether');

    await donationContract.methods.donate().send({
      from: accounts[0],
      value: amountInWei,
    });
  } catch (error) {
    console.error('Donation error:', error);
    throw error;
  }
};

const isMetaMaskInstalled = (): boolean => {
  return (
    typeof window.ethereum !== 'undefined' &&
    (window.ethereum.isMetaMask || false)
  );
};

export { web3, donationContract, makeBlockchainDonation, isMetaMaskInstalled };
