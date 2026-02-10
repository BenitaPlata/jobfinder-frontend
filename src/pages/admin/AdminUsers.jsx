import { useEffect, useState } from 'react';
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
  Badge,
  useToast,
} from '@chakra-ui/react';
import { Trash2 } from 'lucide-react';
import { getAllUsers, deleteUser } from '../../api/users.api';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await getAllUsers();
      // 🔑 AJUSTE CLAVE: tu API devuelve { users: [...] }
      setUsers(data.users || []);

    } catch  {
      toast({
        title: 'Error cargando usuarios',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      '¿Seguro que quieres eliminar este usuario?'
    );
    if (!confirmDelete) return;

    try {
      await deleteUser(userId);

      toast({
        title: 'Usuario eliminado',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      // Recargar lista
      loadUsers();
    } catch  {
      toast({
        title: 'Error al eliminar usuario',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

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
              <Td>
                <Badge colorScheme={user.role === 'ADMIN' ? 'purple' : 'gray'}>
                  {user.role}
                </Badge>
              </Td>
              <Td textAlign="right">
                <Button
                  size="sm"
                  colorScheme="red"
                  leftIcon={<Trash2 size={16} />}
                  onClick={() => handleDelete(user._id)}
                >
                  Eliminar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default AdminUsers;
