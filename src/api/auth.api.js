import apiClient from './apiClient';

export const loginRequest = async (email, password) => {
  const response = await apiClient.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

export const registerRequest = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

export const getMeRequest = async (token) => {
  const response = await apiClient.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};