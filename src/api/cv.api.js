import axios from './apiClient';

// Subir CV al perfil
export const uploadCVRequest = (formData) => {
  return axios.post('/users/upload-cv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Obtener CV guardado
export const getMyCVRequest = () => {
  return axios.get('/users/my-cv');
};

// Eliminar CV
export const deleteCVRequest = () => {
  return axios.delete('/users/cv-text');
};

// Comparar CV con oferta
export const compareCVWithJobRequest = (jobId) => {
  return axios.post(`/cv/compare/${jobId}`);
};