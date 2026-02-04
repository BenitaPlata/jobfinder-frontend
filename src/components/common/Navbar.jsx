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
                <HStack
                  as={Link}
                  to="/"
                  spacing={2}
                  color="var(--text-secondary)"
                  fontWeight="600"
                  fontSize="md"
                  cursor="pointer"
                  _hover={{
                    color: 'var(--color-accent)',
                    textShadow: 'var(--glow-accent)',
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s ease"
                >
                  <Briefcase size={18} />
                  <Text whiteSpace="nowrap">Ofertas</Text>
                </HStack>

                <HStack
                  as={Link}
                  to="/my-applications"
                  spacing={2}
                  color="var(--text-secondary)"
                  fontWeight="600"
                  fontSize="md"
                  cursor="pointer"
                  _hover={{
                    color: 'var(--color-accent)',
                    textShadow: 'var(--glow-accent)',
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s ease"
                >
                  <FileText size={18} />
                  <Text whiteSpace="nowrap">Mis Candidaturas</Text>
                </HStack>

                {/*  ANALIZAR CV */}
                <HStack
                  as={Link}
                  to="/analyze-cv"
                  spacing={2}
                  color="var(--text-secondary)"
                  fontWeight="600"
                  fontSize="md"
                  cursor="pointer"
                  _hover={{
                    color: 'var(--color-accent)',
                    textShadow: 'var(--glow-accent)',
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s ease"
                >
                  <FileSearch size={18} />
                  <Text whiteSpace="nowrap">Analizar CV</Text>
                </HStack>

                <HStack
                  as={Link}
                  to="/profile"
                  spacing={2}
                  color="var(--text-secondary)"
                  fontWeight="600"
                  fontSize="md"
                  cursor="pointer"
                  _hover={{
                    color: 'var(--color-accent)',
                    textShadow: 'var(--glow-accent)',
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s ease"
                >
                  <User size={18} />
                  <Text whiteSpace="nowrap">Mi Perfil</Text>
                </HStack>

                <HStack
                  as={Link}
                  to="/about"
                  spacing={2}
                  color="var(--text-secondary)"
                  fontWeight="600"
                  fontSize="md"
                  cursor="pointer"
                  _hover={{
                    color: 'var(--color-accent)',
                    textShadow: 'var(--glow-accent)',
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s ease"
                >
                  <Info size={18} />
                  <Text whiteSpace="nowrap">Sobre mí</Text>
                </HStack>
              </HStack>

              <HStack spacing={4} whiteSpace="nowrap">
                <Text fontSize="sm" color="var(--text-tertiary)">
                  Hola, {user?.name}
                </Text>
                <Button
                  size="sm"
                  bg="var(--bg-tertiary)"
                  color="var(--color-secondary)"
                  border="1px solid"
                  borderColor="var(--color-secondary)"
                  borderRadius="12px"
                  fontWeight="600"
                  boxShadow="var(--glow-secondary)"
                  leftIcon={<LogOut size={16} />}
                  _hover={{
                    bg: 'var(--color-secondary)',
                    color: 'var(--bg-primary)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 0 30px rgba(255, 179, 217, 0.6)',
                  }}
                  transition="all 0.2s ease"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </Button>
              </HStack>
            </>
          )}
        </Flex>
      </Container>

      {/*  MOBILE DRAWER  */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="var(--bg-card)" borderLeft="1px solid" borderColor="var(--bg-tertiary)">
          <Box p={4} display="flex" justifyContent="space-between" alignItems="center">
            <Text fontWeight="700" color="var(--text-primary)">Menú</Text>
            <IconButton
              icon={<X size={20} />}
              onClick={onClose}
              variant="ghost"
              size="sm"
              color="var(--text-primary)"
              _hover={{
                bg: 'var(--bg-tertiary)',
                color: 'var(--color-accent)',
              }}
            />
          </Box>

          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={4}>
              <Text fontSize="sm" color="var(--text-tertiary)">
                Hola, {user?.name}
              </Text>

              <Button as={Link} to="/" onClick={onClose} variant="ghost" justifyContent="flex-start" leftIcon={<Briefcase size={18} />}>
                Ofertas
              </Button>

              <Button as={Link} to="/my-applications" onClick={onClose} variant="ghost" justifyContent="flex-start" leftIcon={<FileText size={18} />}>
                Mis Candidaturas
              </Button>

              <Button as={Link} to="/analyze-cv" onClick={onClose} variant="ghost" justifyContent="flex-start" leftIcon={<FileSearch size={18} />}>
                Analizar CV
              </Button>

              <Button as={Link} to="/profile" onClick={onClose} variant="ghost" justifyContent="flex-start" leftIcon={<User size={18} />}>
                Mi Perfil
              </Button>

              <Button as={Link} to="/about" onClick={onClose} variant="ghost" justifyContent="flex-start" leftIcon={<Info size={18} />}>
                Sobre mí
              </Button>

              <Button
                mt={6}
                bg="var(--bg-tertiary)"
                color="var(--color-secondary)"
                border="1px solid"
                borderColor="var(--color-secondary)"
                leftIcon={<LogOut size={16} />}
                onClick={handleLogout}
              >
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
