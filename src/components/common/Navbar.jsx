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
  Divider,
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
        <Flex
          direction="column"
          align="center"
          gap={2}
        >
          <Text
            fontSize="3xl"
            fontWeight="900"
            color="var(--color-primary)"
            textShadow="var(--glow-primary)"
            cursor="pointer"
            onClick={() => navigate('/')}
          >
            JobFinder
          </Text>

          <HStack spacing={6}>
            <Text fontSize="sm" color="var(--text-tertiary)">
              Hola, {user?.name}
            </Text>

            <Button
              size="sm"
              variant="outline"
              leftIcon={<LogOut size={16} />}
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </HStack>
        </Flex>

        <Divider my={4} />

        {/* 🔽 FILA INFERIOR */}
        {isMobile ? (
          <Flex justify="flex-end">
            <IconButton
              icon={<Menu size={24} />}
              onClick={onOpen}
              variant="ghost"
              aria-label="Abrir menú"
            />
          </Flex>
        ) : (
          <Flex justify="center">
            <HStack spacing={10} fontWeight="600">
              <HStack as={Link} to="/" spacing={2}>
                <Briefcase size={18} />
                <Text>Ofertas</Text>
              </HStack>

              <HStack as={Link} to="/my-applications" spacing={2}>
                <FileText size={18} />
                <Text>Mis candidaturas</Text>
              </HStack>

              <HStack as={Link} to="/analyze-cv" spacing={2}>
                <FileSearch size={18} />
                <Text>Analizar CV</Text>
              </HStack>

              <HStack as={Link} to="/profile" spacing={2}>
                <User size={18} />
                <Text>Mi perfil</Text>
              </HStack>

              <HStack as={Link} to="/about" spacing={2}>
                <Info size={18} />
                <Text>Sobre mí</Text>
              </HStack>

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

      {/* 📱 DRAWER MOBILE */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="var(--bg-card)">
          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={6}>
              <Button as={Link} to="/" onClick={onClose}>Ofertas</Button>
              <Button as={Link} to="/my-applications" onClick={onClose}>Mis candidaturas</Button>
              <Button as={Link} to="/analyze-cv" onClick={onClose}>Analizar CV</Button>
              <Button as={Link} to="/profile" onClick={onClose}>Mi perfil</Button>
              <Button as={Link} to="/about" onClick={onClose}>Sobre mí</Button>

              {isAdmin && (
                <Button as={Link} to="/admin" onClick={onClose}>
                  Admin
                </Button>
              )}

              <Button
                mt={6}
                onClick={handleLogout}
                leftIcon={<LogOut size={16} />}
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

export default Navbar;
