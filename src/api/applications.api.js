import apiClient from './apiClient';

export const createApplicationRequest = async (jobId, status, notes = '') => {
  const response = await apiClient.post('/applications', {
    jobId,
    status,
    notes,
  });
  return response.data;
};

export const getMyApplicationsRequest = async () => {
  const response = await apiClient.get('/applications/my-applications');
  return response.data;
};

export const updateApplicationRequest = async (applicationId, updateData) => {
  const response = await apiClient.put(`/applications/${applicationId}`, updateData);
  return response.data;
};

export const deleteApplicationRequest = async (applicationId) => {
  const response = await apiClient.delete(`/applications/${applicationId}`);
  return response.data;
};
