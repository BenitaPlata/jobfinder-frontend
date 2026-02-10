import { Box, Flex, VStack, Text, Button } from '@chakra-ui/react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, ArrowLeft } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Flex minH="calc(100vh - 120px)">
      {/* SIDEBAR */}
      <Box
        w="260px"
        bg="var(--bg-card)"
        borderRight="1px solid"
        borderColor="var(--bg-tertiary)"
        p={6}
      >
        <VStack align="stretch" spacing={6} h="100%">
          {/* HEADER */}
          <Box>
            <Text fontSize="lg" fontWeight="800" color="var(--color-accent)">
              Admin Panel
            </Text>
            <Text fontSize="sm" color="var(--text-tertiary)">
              {user?.name}
            </Text>
          </Box>

          {/* NAV */}
          <VStack align="stretch" spacing={2}>
            <Button
              as={Link}
              to="/admin"
              justifyContent="flex-start"
              leftIcon={<LayoutDashboard size={18} />}
              variant="ghost"
            >
              Dashboard
            </Button>

            <Button
              as={Link}
              to="/admin/users"
              justifyContent="flex-start"
              leftIcon={<Users size={18} />}
              variant="ghost"
            >
              Usuarios
            </Button>
          </VStack>

          {/* PUSH BOTTOM */}
          <Box flex={1} />

          {/* VOLVER A LA APP */}
          <Button
            leftIcon={<ArrowLeft size={18} />}
            variant="ghost"
            justifyContent="flex-start"
            fontWeight="600"
            color="var(--text-secondary)"
            _hover={{
              bg: 'var(--bg-tertiary)',
              color: 'var(--color-accent)',
            }}
            onClick={() => navigate('/')}
          >
            Volver a la app
          </Button>
        </VStack>
      </Box>

      {/* CONTENIDO */}
      <Box flex={1} p={8}>
        <Outlet />
      </Box>
    </Flex>
  );
}

export default AdminLayout;
