import { useState, useEffect } from 'react';
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
import { User, Mail, Lock, UserPlus, Sparkles } from 'lucide-react';
import { registerRequest } from '../api/auth.api';
import useAuth from '../hooks/useAuth';

function Register() {
  useEffect(() => {
    document.documentElement.className = 'page-home';
    return () => {
      document.documentElement.className = '';
    };
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Las contraseñas no coinciden',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: 'Error',
        description: 'La contraseña debe tener al menos 6 caracteres',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const { name, email, password } = formData;
      const response = await registerRequest({ name, email, password });

      localStorage.setItem('token', response.token);

      await login({ email, password });

      toast({
        title: '¡Cuenta creada!',
        description: 'Tu cuenta ha sido creada correctamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Error al crear la cuenta',
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
                Crea tu cuenta
              </Text>
            </VStack>

            {/* Name */}
            <FormControl isRequired>
              <FormLabel color="var(--text-secondary)" fontWeight="600">
                Nombre completo
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <User size={18} color="var(--text-tertiary)" />
                </InputLeftElement>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
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
                  placeholder="Mínimo 6 caracteres"
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

            {/* Confirm Password */}
            <FormControl isRequired>
              <FormLabel color="var(--text-secondary)" fontWeight="600">
                Confirmar contraseña
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Lock size={18} color="var(--text-tertiary)" />
                </InputLeftElement>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repite tu contraseña"
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
              leftIcon={<UserPlus size={20} />}
              _hover={{
                bg: 'var(--color-accent)',
                transform: 'translateY(-2px)',
                boxShadow: '0 0 30px rgba(127, 255, 212, 0.6)',
              }}
              transition="all 0.2s ease"
            >
              Crear Cuenta
            </Button>

            {/* Login Link */}
            <Text color="var(--text-secondary)" fontSize="sm" textAlign="center">
              ¿Ya tienes cuenta?{' '}
              <Link
                as={RouterLink}
                to="/login"
                color="var(--color-accent)"
                fontWeight="600"
                textShadow="var(--glow-accent)"
                _hover={{
                  color: 'var(--neon-cyan)',
                  textShadow: 'var(--glow-cyan)',
                }}
              >
                Inicia sesión
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default Register;
