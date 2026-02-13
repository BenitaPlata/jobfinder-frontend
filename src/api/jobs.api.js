import apiClient from './apiClient';

export const getJobsRequest = async (filters = {}) => {
  const response = await apiClient.get('/jobs', { params: filters });
  return response.data;
};

export const getJobByIdRequest = async (jobId) => {
  const response = await apiClient.get(`/jobs/${jobId}`);
  return response.data;
};

// Eliminar oferta (solo ADMIN)
export const deleteJobRequest = async (jobId) => {
  const response = await apiClient.delete(`/jobs/${jobId}`);
  return response.data;
};