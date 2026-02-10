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
  X,
  FileSearch,
  Shield,
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';

function NavItem({ to, icon, label, highlight = false }) {
  return (
    <HStack
      as={Link}
      to={to}
      spacing={2}
      fontWeight="600"
      color={highlight ? 'var(--color-accent)' : 'var(--text-secondary)'}
      _hover={{
        color: 'var(--color-accent)',
        transform: 'translateY(-1px)',
      }}
      transition="all 0.2s ease"
      whiteSpace="nowrap"
    >
      {icon}
      <Text>{label}</Text>
    </HStack>
  );
}

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
      boxShadow="var(--shadow-sm)"
      position="sticky"
      top={0}
      zIndex={1000}
      backdropFilter="blur(10px)"
    >
      <Container maxW="1400px" px={6} py={4}>

        {/* 🔹 FILA SUPERIOR */}
        <Flex justify="space-between" align="center" mb={4}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Text
              fontSize="3xl"
              fontWeight="900"
              letterSpacing="tight"
              color="var(--color-primary)"
              textShadow="var(--glow-primary)"
            >
              JobFinder
            </Text>
          </Link>

          {!isMobile && (
            <HStack spacing={4}>
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
          )}

          {isMobile && (
            <IconButton
              icon={<Menu size={24} />}
              onClick={onOpen}
              variant="ghost"
              aria-label="Abrir menú"
            />
          )}
        </Flex>

        {!isMobile && <Divider mb={4} />}

        {/* 🔹 FILA INFERIOR */}
        {!isMobile && (
          <Flex justify="space-between" align="center">
            <HStack spacing={10}>
              <NavItem to="/" icon={<Briefcase size={18} />} label="Ofertas" />
              <NavItem to="/my-applications" icon={<FileText size={18} />} label="Mis candidaturas" />
              <NavItem to="/analyze-cv" icon={<FileSearch size={18} />} label="Analizar CV" />
              <NavItem to="/profile" icon={<User size={18} />} label="Mi perfil" />
              <NavItem to="/about" icon={<Info size={18} />} label="Sobre mí" />
            </HStack>

            {isAdmin && (
              <NavItem
                to="/admin"
                icon={<Shield size={18} />}
                label="Admin"
                highlight
              />
            )}
          </Flex>
        )}
      </Container>

      {/* 📱 MOBILE DRAWER */}
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
                <Button
                  as={Link}
                  to="/admin"
                  onClick={onClose}
                  leftIcon={<Shield size={18} />}
                >
                  Admin
                </Button>
              )}

              <Button
                mt={6}
                leftIcon={<LogOut size={16} />}
                onClick={handleLogout}
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
