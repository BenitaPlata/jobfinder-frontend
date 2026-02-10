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
  X,
  FileSearch,
  Shield,
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  if (!isAuthenticated) {
    return null;
  }

  const isAdmin = user?.role === 'ADMIN';

  return (
    <Box
      bg="var(--bg-card)"
      borderBottom="1px solid"
      borderColor="var(--bg-tertiary)"
      boxShadow="var(--shadow-sm)"
      py={4}
      mb={8}
      position="sticky"
      top={0}
      zIndex={1000}
      backdropFilter="blur(10px)"
    >
      <Container maxW="1400px" px={4}>
        <Flex justify="space-between" align="center">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Text
              fontSize="2xl"
              fontWeight="900"
              letterSpacing="tight"
              color="var(--color-primary)"
              textShadow="var(--glow-primary)"
              cursor="pointer"
              _hover={{
                color: 'var(--color-accent)',
                textShadow: 'var(--glow-accent)',
                transform: 'scale(1.05)',
              }}
              transition="all 0.2s ease"
              whiteSpace="nowrap"
            >
              JobFinder
            </Text>
          </Link>

          {isMobile ? (
            <IconButton
              icon={<Menu size={24} />}
              onClick={onOpen}
              variant="ghost"
              color="var(--text-primary)"
              _hover={{
                bg: 'var(--bg-tertiary)',
                color: 'var(--color-accent)',
              }}
              aria-label="Open menu"
            />
          ) : (
            <>
              <HStack spacing={10} whiteSpace="nowrap">
                <HStack as={Link} to="/" spacing={2} color="var(--text-secondary)" fontWeight="600">
                  <Briefcase size={18} />
                  <Text>Ofertas</Text>
                </HStack>

                <HStack as={Link} to="/my-applications" spacing={2} color="var(--text-secondary)" fontWeight="600">
                  <FileText size={18} />
                  <Text>Mis Candidaturas</Text>
                </HStack>

                <HStack as={Link} to="/analyze-cv" spacing={2} color="var(--text-secondary)" fontWeight="600">
                  <FileSearch size={18} />
                  <Text>Analizar CV</Text>
                </HStack>

                <HStack as={Link} to="/profile" spacing={2} color="var(--text-secondary)" fontWeight="600">
                  <User size={18} />
                  <Text>Mi Perfil</Text>
                </HStack>

                <HStack as={Link} to="/about" spacing={2} color="var(--text-secondary)" fontWeight="600">
                  <Info size={18} />
                  <Text>Sobre mí</Text>
                </HStack>

                {/* 🔐 ADMIN */}
                {isAdmin && (
                  <HStack
                    as={Link}
                    to="/admin"
                    spacing={2}
                    color="var(--color-accent)"
                    fontWeight="700"
                    _hover={{ textShadow: 'var(--glow-accent)' }}
                  >
                    <Shield size={18} />
                    <Text>Admin</Text>
                  </HStack>
                )}
              </HStack>

              <HStack spacing={4}>
                <Text fontSize="sm" color="var(--text-tertiary)">
                  Hola, {user?.name}
                </Text>
                <Button size="sm" onClick={handleLogout} leftIcon={<LogOut size={16} />}>
                  Cerrar Sesión
                </Button>
              </HStack>
            </>
          )}
        </Flex>
      </Container>

      {/* 📱 MOBILE DRAWER */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="var(--bg-card)">
          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={6}>
              <Button as={Link} to="/" onClick={onClose}>Ofertas</Button>
              <Button as={Link} to="/my-applications" onClick={onClose}>Mis Candidaturas</Button>
              <Button as={Link} to="/analyze-cv" onClick={onClose}>Analizar CV</Button>
              <Button as={Link} to="/profile" onClick={onClose}>Mi Perfil</Button>
              <Button as={Link} to="/about" onClick={onClose}>Sobre mí</Button>

              {isAdmin && (
                <Button
                  as={Link}
                  to="/admin"
                  onClick={onClose}
                  leftIcon={<Shield size={18} />}
                >
                  Admin
                </Button>
              )}

              <Button mt={6} onClick={handleLogout} leftIcon={<LogOut size={16} />}>
                Cerrar Sesión
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Navbar;