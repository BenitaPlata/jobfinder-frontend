import apiClient from './apiClient';

export const getJobsRequest = async (filters = {}) => {
  const params = new URLSearchParams(filters); 
  const response = await apiClient.get(`/jobs?${params}`);
  return response.data;
};

export const getJobByIdRequest = async (jobId) => {
  const response = await apiClient.get(`/jobs/${jobId}`);
  return response.data;
};