'use server';

import { getUserToken } from './session';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};

  return header;
};

export const serverFetch = async path => {
  try {
    const res = await fetch(`${baseURL}${path}`);

    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
      } catch {
        errorData = {};
      }
      throw new Error(
        errorData.message || `Fetch failed with status ${res.status}`,
      );
    }

    return await res.json();
  } catch (error) {
    console.error(`Server Fetch error at ${path}:`, error);
    throw error;
  }
};

/**
 * Core utility for mutating data (POST, PUT, PATCH, DELETE) with robust error handling.
 */
export const serverMutation = async (path, data, method = 'POST') => {
  try {
    // ✅ Print to console to verify the method is actually "PATCH"
    console.log(`🚀 Request Method: ${method} | URL: ${baseURL}${path}`);

    const res = await fetch(`${baseURL}${path}`, {
      method: method, // ✅ Now correctly sends PATCH / DELETE
      headers: {
        'Content-Type': 'application/json',
        ...(await authHeader()),
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    // Handle 401, 403, 404, 500 network exceptions safely
    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
      } catch {
        errorData = { message: 'An unknown error occurred' };
      }

      switch (res.status) {
        case 401:
          console.warn('Unauthorized request. Access tokens may be expired.');
          break;
        case 403:
          console.warn(
            'Forbidden. You do not have permission to execute this operation.',
          );
          break;
        case 404:
          console.warn('The requested resource endpoint could not be found.');
          break;
        case 500:
          console.error(
            'Internal Server Error encountered on the backend framework.',
          );
          break;
        default:
          console.error(`HTTP Error: ${res.status}`);
      }

      throw new Error(
        errorData.message || `Mutation failed with status ${res.status}`,
      );
    }

    // Protect against syntax crashes on empty responses (like 204 No Content)
    if (res.status === 204) {
      return { success: true };
    }

    return await res.json();
  } catch (error) {
    console.error(`Mutation failed at [${method}] ${path}:`, error);
    throw error;
  }
};
