// importing Organization type from the types file
import { Organization } from '../types/types';

// Setting up an async function to request the list of organizations from the backend
export const getOrganizations = async (): Promise<Organization[]> => {
  try {
    const response = await fetch('http://localhost:5000/api/organizations');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching organizations:', error);
    throw error;
  }
};

export const makeDonation = async (
  organizationId: string,
  amount: string
): Promise<any> => {
  try {
    const response = await fetch(`http://localhost:5000/api/donate`, {
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
