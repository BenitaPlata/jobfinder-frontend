import { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spinner,
  Center,
  useToast,
  HStack,
  Text,
} from '@chakra-ui/react';
import { Trash2 } from 'lucide-react';

import { getAllUsers, deleteUser } from '../../api/users.api';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // 🔁 Cargar usuarios
  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data.users || data);
    } catch (error) {
      console.error('❌ Error cargando usuarios:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los usuarios',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // 🗑️ Eliminar usuario
  const handleDelete = async (userId, userName) => {
    const confirmDelete = window.confirm(
      `¿Seguro que quieres eliminar al usuario "${userName}"?\n\nEsta acción NO se puede deshacer.`
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(userId);

      toast({
        title: 'Usuario eliminado',
        description: `El usuario "${userName}" ha sido eliminado correctamente`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      loadUsers(); // 🔄 recargar lista
    } catch (error) {
      console.error('❌ Error eliminando usuario:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el usuario',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Center minH="60vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box>
      <Heading mb={6}>Usuarios</Heading>

      {users.length === 0 ? (
        <Text color="var(--text-tertiary)">No hay usuarios registrados.</Text>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Email</Th>
              <Th>Rol</Th>
              <Th isNumeric>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td isNumeric>
                  <HStack justify="flex-end">
                    {user.role !== 'ADMIN' && (
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="outline"
                        leftIcon={<Trash2 size={16} />}
                        onClick={() => handleDelete(user._id, user.name)}
                      >
                        Eliminar
                      </Button>
                    )}
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}

export default AdminUsers;
