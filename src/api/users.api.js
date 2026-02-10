import apiClient from './apiClient';

// Obtener TODOS los usuarios (solo ADMIN)
export const getAllUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

// Eliminar usuario por ID (solo ADMIN)
export const deleteUser = async (userId) => {
  const response = await apiClient.delete(`/users/${userId}`);
  return response.data;
};
