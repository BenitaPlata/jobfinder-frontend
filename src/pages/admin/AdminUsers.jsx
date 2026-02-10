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
  HStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Trash2 } from 'lucide-react';

import { getAllUsers, deleteUser } from '../../api/users.api';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // 🔹 FUNCIÓN CORRECTA (memorizada)
  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();

      // Tu backend devuelve { users: [...] }
      setUsers(data.users || []);
    } catch (error) {
      console.error('❌ Error cargando usuarios:', error);
      toast({
        title: 'Error cargando usuarios',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // 🔹 useEffect LIMPIO (sin warning)
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // 🔹 BORRAR USUARIO
  const handleDelete = async (userId) => {
    const confirm = window.confirm('¿Seguro que quieres eliminar este usuario?');
    if (!confirm) return;

    try {
      await deleteUser(userId);

      toast({
        title: 'Usuario eliminado',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      loadUsers(); // recargar lista
    } catch (error) {
      console.error('❌ Error eliminando usuario:', error);
      toast({
        title: 'Error eliminando usuario',
        status: 'error',
        duration: 3000,
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
    <Box px={{ base: 4, md: 8 }} py={6}>
      <Heading mb={6}>Usuarios</Heading>

      {users.length === 0 ? (
        <Text>No hay usuarios</Text>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Email</Th>
              <Th>Rol</Th>
              <Th textAlign="right">Acciones</Th>
            </Tr>
          </Thead>

          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td textAlign="right">
                  <HStack justify="flex-end">
                    <Button
                      size="sm"
                      colorScheme="red"
                      leftIcon={<Trash2 size={16} />}
                      onClick={() => handleDelete(user._id)}
                    >
                      Eliminar
                    </Button>
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
