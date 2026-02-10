import {
  Box,
  Flex,
  Button,
  Text,
  HStack,
  Container,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  VStack,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  User,
  FileText,
  Info,
  LogOut,
  Menu,
  FileSearch,
  Shield,
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (!isAuthenticated) return null;

  const isAdmin = user?.role === 'ADMIN';

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  return (
    <Box
      bg="var(--bg-card)"
      borderBottom="1px solid"
      borderColor="var(--bg-tertiary)"
      position="sticky"
      top={0}
      zIndex={1000}
      backdropFilter="blur(10px)"
    >
      <Container maxW="1400px" py={4}>
        {/* 🔝 FILA SUPERIOR */}
        <Flex align="center" justify="space-between" mb={4}>
          <Box w="200px" />

          <Text
            fontSize="3xl"
            fontWeight="900"
            letterSpacing="tight"
            color="var(--color-primary)"
            textShadow="var(--glow-primary)"
            textAlign="center"
          >
            JobFinder
          </Text>

          <HStack spacing={4}>
            <Text fontSize="sm" color="var(--text-secondary)">
              Hola, {user?.name}
            </Text>
            <Button
              size="sm"
              leftIcon={<LogOut size={16} />}
              onClick={handleLogout}
              bg="#C9ADE3"
              color="#0a0a0f"
              _hover={{
                bg: '#7FFFD4',
                color: '#0a0a0f',
                boxShadow: '0 0 20px rgba(127, 255, 212, 0.5)',
              }}
            >
              Cerrar sesión
            </Button>
          </HStack>
        </Flex>

        {/* 🔽 FILA INFERIOR */}
        {isMobile ? (
          <IconButton
            icon={<Menu size={24} />}
            onClick={onOpen}
            variant="ghost"
            aria-label="Open menu"
          />
        ) : (
          <Flex justify="center">
            <HStack spacing={10}>
              <NavItem to="/" icon={Briefcase} label="Ofertas" />
              <NavItem to="/my-applications" icon={FileText} label="Mis candidaturas" />
              <NavItem to="/analyze-cv" icon={FileSearch} label="Analizar CV" />
              <NavItem to="/profile" icon={User} label="Mi perfil" />
              <NavItem to="/about" icon={Info} label="Sobre el proyecto" />

              {isAdmin && (
                <HStack
                  as={Link}
                  to="/admin"
                  spacing={2}
                  color="var(--color-accent)"
                  fontWeight="700"
                >
                  <Shield size={18} />
                  <Text>Admin</Text>
                </HStack>
              )}
            </HStack>
          </Flex>
        )}
      </Container>

      {/* 📱 MOBILE */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="var(--bg-card)">
          <DrawerBody>
            <VStack spacing={4} mt={6}>
              <Button as={Link} to="/" onClick={onClose}>
                Ofertas
              </Button>
              <Button as={Link} to="/my-applications" onClick={onClose}>
                Mis candidaturas
              </Button>
              <Button as={Link} to="/analyze-cv" onClick={onClose}>
                Analizar CV
              </Button>
              <Button as={Link} to="/profile" onClick={onClose}>
                Mi perfil
              </Button>
              <Button as={Link} to="/about" onClick={onClose}>
                Sobre el proyecto
              </Button>

              {isAdmin && (
                <Button as={Link} to="/admin" onClick={onClose}>
                  Admin
                </Button>
              )}

              <Button
                size="sm"
                leftIcon={<LogOut size={14} />}
                onClick={handleLogout}
                bg="#C9ADE3"
                color="#0a0a0f"
                _hover={{
                  bg: '#7FFFD4',
                  color: '#0a0a0f',
                  boxShadow: '0 0 20px rgba(127, 255, 212, 0.5)',
                }}
              >
                Cerrar sesión
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

function NavItem({ to, icon: Icon, label }) {
  return (
    <HStack
      as={Link}
      to={to}
      spacing={2}
      color="var(--text-secondary)"
      fontWeight="600"
      _hover={{
        color: 'var(--color-accent)',
      }}
    >
      {Icon && <Icon size={18} />}
      <Text>{label}</Text>
    </HStack>
  );
}

export default Navbar;