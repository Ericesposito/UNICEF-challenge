// importing Organization type from the types file
import { Organization } from '../types/types';

const BASE_URL = 'http://localhost:5000/api';

// Setting up an async function to request the list of organizations from the backend
export const getOrganizations = async (): Promise<Organization[]> => {
  try {
    const response = await fetch(`${BASE_URL}/organizations`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching organizations:', error);
    throw error;
  }
};

export const getOrganizationById = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/organizations/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching organization:', error);
    throw error;
  }
};

export const makeDonation = async (
  organizationId: string,
  amount: string,
  donorName: string,
  donorEmail: string
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/donate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ organizationId, amount }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    console.error('Error making donation:', error);
    throw error;
  }
};
