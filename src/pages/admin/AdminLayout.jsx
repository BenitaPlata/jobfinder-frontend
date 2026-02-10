import { Box, Flex, VStack, Text, Button } from '@chakra-ui/react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, ArrowLeft } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();


  const sidebarButtonProps = {
    variant: 'ghost',
    justifyContent: 'flex-start',
    color: 'var(--text-primary)',
    fontWeight: '600',
    _hover: {
      bg: 'var(--bg-tertiary)',
      color: 'var(--color-accent)',
    },
  };

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
        <VStack align="stretch" spacing={6}>
          {/* HEADER */}
          <Box>
            <Text fontSize="lg" fontWeight="800" color="var(--color-accent)">
              Admin Panel
            </Text>
            <Text fontSize="sm" color="var(--text-tertiary)">
              {user?.name}
            </Text>
          </Box>

          {/* MENU */}
          <VStack align="stretch" spacing={2}>
            <Button
              as={Link}
              to="/admin"
              leftIcon={<LayoutDashboard size={18} />}
              {...sidebarButtonProps}
            >
              Dashboard
            </Button>

            <Button
              as={Link}
              to="/admin/users"
              leftIcon={<Users size={18} />}
              {...sidebarButtonProps}
            >
              Usuarios
            </Button>

            <Button
              as={Link}
              to="/admin/jobs"
              leftIcon={<Briefcase size={18} />}
              {...sidebarButtonProps}
            >
              Ofertas
            </Button>
          </VStack>

          <Box flex={1} />

          {/* VOLVER */}
          <Button
            leftIcon={<ArrowLeft size={18} />}
            {...sidebarButtonProps}
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
