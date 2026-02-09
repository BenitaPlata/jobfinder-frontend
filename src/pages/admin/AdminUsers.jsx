import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  Badge,
} from '@chakra-ui/react';
import { Trash2 } from 'lucide-react';

function AdminUsers() {
  // MOCK DE USUARIOS (luego vendrán del backend)
  const users = [
    {
      id: 1,
      name: 'Admin JobFinder',
      email: 'admin@jobfinder.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Usuario Demo',
      email: 'user@demo.com',
      role: 'USER',
    },
  ];

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="800" mb={6}>
        Usuarios
      </Text>

      <Box
        bg="var(--bg-card)"
        borderRadius="xl"
        boxShadow="var(--shadow-sm)"
        overflowX="auto"
      >
        <Table>
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
              <Tr key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Badge
                    colorScheme={user.role === 'ADMIN' ? 'purple' : 'gray'}
                  >
                    {user.role}
                  </Badge>
                </Td>
                <Td textAlign="right">
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    leftIcon={<Trash2 size={16} />}
                    isDisabled={user.role === 'ADMIN'}
                  >
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default AdminUsers;
