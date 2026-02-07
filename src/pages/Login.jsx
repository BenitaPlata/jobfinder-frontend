import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import {
  Container,
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast,
  Link,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Mail, Lock, LogIn, Sparkles } from 'lucide-react';
import useAuth from '../hooks/useAuth';

function Login() {
  useEffect(() => {
    document.documentElement.className = 'page-home';
    return () => {
      document.documentElement.className = '';
    };
  }, []);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post('/auth/login', formData);
      const data = response.data;

      if (!data || !data.user || !data.token) {
        throw new Error(data?.message || 'Error al iniciar sesión');
      }

      login(data.user, data.token);
      toast({
        title: '¡Bienvenido!',
        description: 'Has iniciado sesión correctamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Error al iniciar sesión',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" py={12}>
      <Container maxW="md">
        <Box
          bg="var(--bg-card)"
          p={8}
          borderRadius="24px"
          boxShadow="var(--shadow-lg)"
          border="1px solid"
          borderColor="var(--bg-tertiary)"
        >
          <VStack spacing={6} as="form" onSubmit={handleSubmit}>
            {/* Logo con icono */}
            <VStack spacing={2}>
              <Box
                as={Sparkles}
                size={40}
                color="var(--color-primary)"
                filter="drop-shadow(0 0 8px var(--color-primary))"
              />
              <Heading
                size="xl"
                textAlign="center"
                color="var(--color-primary)"
                textShadow="var(--glow-primary)"
              >
                JobFinder
              </Heading>
              <Text color="var(--text-secondary)" textAlign="center" fontSize="md">
                Inicia sesión en tu cuenta
              </Text>
            </VStack>

            {/* Email */}
            <FormControl isRequired>
              <FormLabel color="var(--text-secondary)" fontWeight="600">
                Email
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Mail size={18} color="var(--text-tertiary)" />
                </InputLeftElement>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  bg="var(--bg-secondary)"
                  border="1px solid"
                  borderColor="var(--bg-tertiary)"
                  color="var(--text-primary)"
                  borderRadius="12px"
                  _placeholder={{ color: 'var(--text-tertiary)' }}
                  _hover={{
                    borderColor: 'var(--color-primary)',
                  }}
                  _focus={{
                    borderColor: 'var(--color-accent)',
                    boxShadow: 'var(--glow-accent)',
                    bg: 'var(--bg-tertiary)',
                  }}
                />
              </InputGroup>
            </FormControl>

            {/* Password */}
            <FormControl isRequired>
              <FormLabel color="var(--text-secondary)" fontWeight="600">
                Contraseña
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Lock size={18} color="var(--text-tertiary)" />
                </InputLeftElement>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  bg="var(--bg-secondary)"
                  border="1px solid"
                  borderColor="var(--bg-tertiary)"
                  color="var(--text-primary)"
                  borderRadius="12px"
                  _placeholder={{ color: 'var(--text-tertiary)' }}
                  _hover={{
                    borderColor: 'var(--color-primary)',
                  }}
                  _focus={{
                    borderColor: 'var(--color-accent)',
                    boxShadow: 'var(--glow-accent)',
                    bg: 'var(--bg-tertiary)',
                  }}
                />
              </InputGroup>
            </FormControl>

            {/* Submit Button */}
            <Button
              type="submit"
              bg="var(--color-primary)"
              color="var(--bg-primary)"
              width="full"
              size="lg"
              borderRadius="12px"
              fontWeight="600"
              boxShadow="var(--glow-primary)"
              leftIcon={<LogIn size={20} />}
              _hover={{
                bg: 'var(--color-accent)',
                transform: 'translateY(-2px)',
                boxShadow: '0 0 30px rgba(127, 255, 212, 0.6)',
              }}
              transition="all 0.2s ease"
            >
              Iniciar Sesión
            </Button>

            {/* Register Link */}
            <Text color="var(--text-secondary)" fontSize="sm" textAlign="center">
              ¿No tienes cuenta?{' '}
              <Link
                as={RouterLink}
                to="/register"
                color="var(--color-accent)"
                fontWeight="600"
                textShadow="var(--glow-accent)"
                _hover={{
                  color: 'var(--neon-cyan)',
                  textShadow: 'var(--glow-cyan)',
                }}
              >
                Regístrate aquí
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
