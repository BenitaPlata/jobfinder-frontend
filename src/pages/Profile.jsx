import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Heading,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Avatar,
  Divider,
  useToast,
  Badge,
  Wrap,
  Spinner,
} from '@chakra-ui/react';
import { Upload, FileText, Trash2, CheckCircle } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { uploadCVRequest, getMyCVRequest, deleteCVRequest } from '../api/cv.api';

function Profile() {
  useEffect(() => {
    document.documentElement.className = 'page-profile';
    return () => {
      document.documentElement.className = '';
    };
  }, []);

  const { user } = useAuth();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  // Estados para CV
  const [cvFile, setCvFile] = useState(null);
  const [cvData, setCvData] = useState(null);
  const [loadingCV, setLoadingCV] = useState(false);
  const [uploadingCV, setUploadingCV] = useState(false);

  // Cargar CV guardado al montar
  useEffect(() => {
    loadCV();
  }, []);

  const loadCV = async () => {
    try {
      setLoadingCV(true);
      const response = await getMyCVRequest();
      setCvData(response.data);
    } catch (error) {
      // No mostrar error si no tiene CV, es normal
      if (error.response?.status !== 404) {
        console.error('Error cargando CV:', error);
      }
    } finally {
      setLoadingCV(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    toast({
      title: '✅ Perfil actualizado',
      description: 'Tus cambios se han guardado correctamente',
      status: 'success',
      duration: 3000,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  // NUEVO: Subir CV
  const handleUploadCV = async () => {
    if (!cvFile) return;

    try {
      setUploadingCV(true);
      const formData = new FormData();
      formData.append('cv', cvFile);

      const response = await uploadCVRequest(formData);

      setCvData({
        skills: response.data.skills,
        uploadDate: response.data.uploadDate,
      });

      toast({
        title: '✅ CV guardado',
        description: 'Tu currículum se ha guardado correctamente en tu perfil',
        status: 'success',
        duration: 3000,
      });

      setCvFile(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Error al subir el CV',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setUploadingCV(false);
    }
  };

  // NUEVO: Eliminar CV
  const handleDeleteCV = async () => {
    if (!window.confirm('¿Estás seguro de eliminar tu CV?')) return;

    try {
      await deleteCVRequest();
      setCvData(null);
      toast({
        title: '✅ CV eliminado',
        description: 'Tu CV ha sido eliminado de tu perfil',
        status: 'success',
        duration: 3000,
      });
    } catch  {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el CV',
        status: 'error',
        duration: 3000,
      });
    }
  };

  if (!user) {
    return (
      <Container maxW="container.md" py={20} centerContent>
        <Text color="var(--text-secondary)">Cargando perfil...</Text>
      </Container>
    );
  }

  return (
    <Box minH="100vh">
      <Container maxW="container.md" py={8}>
        <VStack spacing={8} align="stretch">
          {/* CARD AVATAR */}
          <Box
            bg="var(--bg-card)"
            p={8}
            borderRadius="24px"
            boxShadow="var(--shadow-lg)"
            border="1px solid"
            borderColor="var(--bg-tertiary)"
            textAlign="center"
          >
            <VStack spacing={4}>
              <Avatar
                size="2xl"
                name={user.name}
                bg="var(--color-primary)"
                color="var(--bg-primary)"
                border="4px solid"
                borderColor="var(--color-primary)"
                boxShadow="var(--glow-primary)"
              />

              <VStack spacing={1}>
                <Heading size="xl" color="var(--text-primary)" fontWeight="700">
                  {user.name}
                </Heading>
                <Text color="var(--text-secondary)" fontSize="md">
                  {user.email}
                </Text>
                <Badge
                  bg="var(--bg-tertiary)"
                  color={user.role === 'admin' ? 'var(--color-secondary)' : 'var(--color-accent)'}
                  border="1px solid"
                  borderColor={user.role === 'admin' ? 'var(--color-secondary)' : 'var(--color-accent)'}
                  fontSize="sm"
                  mt={2}
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontWeight="600"
                  boxShadow={user.role === 'admin' ? 'var(--glow-secondary)' : 'var(--glow-accent)'}
                >
                  {user.role === 'admin' ? '👑 Administrador' : '👤 Usuario'}
                </Badge>
              </VStack>
            </VStack>
          </Box>

          {/* CARD INFORMACIÓN PERSONAL */}
          <Box
            bg="var(--bg-card)"
            p={8}
            borderRadius="24px"
            boxShadow="var(--shadow-lg)"
            border="1px solid"
            borderColor="var(--bg-tertiary)"
          >
            <VStack spacing={6} align="stretch">
              <HStack justify="space-between">
                <Heading size="lg" color="var(--text-primary)" fontWeight="700">
                  Información Personal
                </Heading>
                {!isEditing && (
                  <Button
                    bg="var(--bg-tertiary)"
                    color="var(--color-primary)"
                    border="1px solid"
                    borderColor="var(--color-primary)"
                    size="sm"
                    borderRadius="12px"
                    fontWeight="600"
                    boxShadow="var(--glow-primary)"
                    _hover={{
                      bg: 'var(--color-primary)',
                      color: 'var(--bg-primary)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 0 30px rgba(201, 173, 227, 0.6)',
                    }}
                    transition="all 0.2s ease"
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️ Editar
                  </Button>
                )}
              </HStack>

              <Divider borderColor="var(--bg-tertiary)" />

              <FormControl>
                <FormLabel color="var(--text-secondary)" fontWeight="600" fontSize="sm">
                  Nombre completo
                </FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isDisabled={!isEditing}
                  bg={isEditing ? 'var(--bg-tertiary)' : 'var(--bg-secondary)'}
                  border="1px solid"
                  borderColor="var(--bg-tertiary)"
                  color="var(--text-primary)"
                  borderRadius="12px"
                  _hover={{ borderColor: 'var(--color-primary)' }}
                  _focus={{
                    borderColor: 'var(--color-accent)',
                    boxShadow: 'var(--glow-accent)',
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel color="var(--text-secondary)" fontWeight="600" fontSize="sm">
                  Email
                </FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  isDisabled={!isEditing}
                  bg={isEditing ? 'var(--bg-tertiary)' : 'var(--bg-secondary)'}
                  border="1px solid"
                  borderColor="var(--bg-tertiary)"
                  color="var(--text-primary)"
                  borderRadius="12px"
                  _hover={{ borderColor: 'var(--color-primary)' }}
                  _focus={{
                    borderColor: 'var(--color-accent)',
                    boxShadow: 'var(--glow-accent)',
                  }}
                />
              </FormControl>

              {isEditing && (
                <HStack spacing={3} pt={2}>
                  <Button
                    bg="var(--color-primary)"
                    color="var(--bg-primary)"
                    flex={1}
                    borderRadius="12px"
                    fontWeight="600"
                    boxShadow="var(--glow-primary)"
                    _hover={{
                      bg: 'var(--color-accent)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 0 30px rgba(127, 255, 212, 0.6)',
                    }}
                    transition="all 0.2s ease"
                    onClick={handleSave}
                  >
                    💾 Guardar cambios
                  </Button>
                  <Button
                    bg="var(--bg-tertiary)"
                    color="var(--text-secondary)"
                    border="1px solid"
                    borderColor="var(--bg-tertiary)"
                    flex={1}
                    borderRadius="12px"
                    fontWeight="600"
                    _hover={{
                      borderColor: 'var(--color-error)',
                      color: 'var(--color-error)',
                    }}
                    transition="all 0.2s ease"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                </HStack>
              )}
            </VStack>
          </Box>

          {/*  CARD MI CV */}
          <Box
            bg="var(--bg-card)"
            p={8}
            borderRadius="24px"
            boxShadow="var(--shadow-lg)"
            border="1px solid"
            borderColor="var(--bg-tertiary)"
          >
            <VStack spacing={6} align="stretch">
              <HStack spacing={2}>
                <FileText size={24} color="var(--color-accent)" />
                <Heading size="lg" color="var(--text-primary)" fontWeight="700">
                  Mi Currículum
                </Heading>
              </HStack>

              <Divider borderColor="var(--bg-tertiary)" />

              {loadingCV ? (
                <HStack justify="center" py={4}>
                  <Spinner color="var(--color-primary)" />
                </HStack>
              ) : cvData ? (
                // CV YA GUARDADO
                <VStack spacing={4} align="stretch">
                  <HStack spacing={2}>
                    <CheckCircle size={20} color="var(--color-accent)" />
                    <Text color="var(--color-accent)" fontWeight="600">
                      CV guardado
                    </Text>
                  </HStack>

                  <Text color="var(--text-tertiary)" fontSize="sm">
                    Subido el: {new Date(cvData.uploadDate).toLocaleDateString('es-ES')}
                  </Text>

                  {cvData.skills && cvData.skills.length > 0 && (
                    <Box>
                      <Text color="var(--text-secondary)" fontWeight="600" mb={2}>
                        Skills detectadas:
                      </Text>
                      <Wrap>
                        {cvData.skills.map((skill, i) => (
                          <Badge
                            key={i}
                            bg="var(--bg-tertiary)"
                            color="var(--color-accent)"
                            border="1px solid"
                            borderColor="var(--color-accent)"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="xs"
                            fontWeight="600"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </Wrap>
                    </Box>
                  )}

                  <Button
                    bg="var(--bg-tertiary)"
                    color="var(--color-error)"
                    border="1px solid"
                    borderColor="var(--color-error)"
                    leftIcon={<Trash2 size={18} />}
                    borderRadius="12px"
                    fontWeight="600"
                    _hover={{
                      bg: 'var(--color-error)',
                      color: 'white',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 0 30px rgba(255, 23, 68, 0.6)',
                    }}
                    transition="all 0.2s ease"
                    onClick={handleDeleteCV}
                  >
                    Eliminar CV
                  </Button>
                </VStack>
              ) : (
                // NO TIENE CV
                <VStack spacing={4} align="stretch">
                  <Text color="var(--text-secondary)">
                    Sube tu CV para poder compararlo automáticamente con ofertas de trabajo
                  </Text>

                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setCvFile(e.target.files[0])}
                    bg="var(--bg-secondary)"
                    border="1px solid"
                    borderColor="var(--bg-tertiary)"
                    color="var(--text-primary)"
                    borderRadius="12px"
                    _hover={{ borderColor: 'var(--color-primary)' }}
                    _focus={{
                      borderColor: 'var(--color-accent)',
                      boxShadow: 'var(--glow-accent)',
                    }}
                  />

                  <Button
                    bg="var(--color-primary)"
                    color="var(--bg-primary)"
                    leftIcon={uploadingCV ? <Spinner size="sm" /> : <Upload size={18} />}
                    isDisabled={!cvFile || uploadingCV}
                    borderRadius="12px"
                    fontWeight="600"
                    boxShadow="var(--glow-primary)"
                    _hover={{
                      bg: 'var(--color-accent)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 0 30px rgba(127, 255, 212, 0.6)',
                    }}
                    transition="all 0.2s ease"
                    onClick={handleUploadCV}
                  >
                    {uploadingCV ? 'Subiendo...' : 'Subir CV'}
                  </Button>
                </VStack>
              )}
            </VStack>
          </Box>

          {/* CARD ESTADÍSTICAS */}
          <Box
            bg="var(--bg-card)"
            p={8}
            borderRadius="24px"
            boxShadow="var(--shadow-lg)"
            border="1px solid"
            borderColor="var(--bg-tertiary)"
          >
            <VStack spacing={5} align="stretch">
              <Heading size="lg" color="var(--text-primary)" fontWeight="700">
                📊 Estadísticas
              </Heading>
              <Divider borderColor="var(--bg-tertiary)" />

              <HStack justify="space-between" p={4} bg="var(--bg-secondary)" borderRadius="12px" border="1px solid" borderColor="var(--bg-tertiary)">
                <Text color="var(--text-secondary)" fontWeight="500">
                  💾 Ofertas guardadas
                </Text>
                <Badge
                  bg="var(--bg-tertiary)"
                  color="var(--color-primary)"
                  border="1px solid"
                  borderColor="var(--color-primary)"
                  fontSize="md"
                  px={4}
                  py={1}
                  borderRadius="full"
                  fontWeight="600"
                  boxShadow="var(--glow-primary)"
                >
                  0
                </Badge>
              </HStack>

              <HStack justify="space-between" p={4} bg="var(--bg-secondary)" borderRadius="12px" border="1px solid" borderColor="var(--bg-tertiary)">
                <Text color="var(--text-secondary)" fontWeight="500">
                  📤 Candidaturas enviadas
                </Text>
                <Badge
                  bg="var(--bg-tertiary)"
                  color="var(--color-accent)"
                  border="1px solid"
                  borderColor="var(--color-accent)"
                  fontSize="md"
                  px={4}
                  py={1}
                  borderRadius="full"
                  fontWeight="600"
                  boxShadow="var(--glow-accent)"
                >
                  0
                </Badge>
              </HStack>
            </VStack>
          </Box>

          {/* CARD ZONA DE PELIGRO */}
          <Box
            bg="var(--bg-card)"
            p={8}
            borderRadius="24px"
            boxShadow="var(--shadow-lg)"
            border="2px solid"
            borderColor="var(--color-error)"
          >
            <VStack spacing={4} align="stretch">
              <Heading size="lg" color="var(--color-error)" fontWeight="700">
                ⚠️ Zona de Peligro
              </Heading>
              <Divider borderColor="var(--color-error)" opacity={0.3} />

              <Text color="var(--text-secondary)" lineHeight="1.6">
                Si eliminas tu cuenta, perderás todas tus candidaturas y datos guardados.
                Esta acción no se puede deshacer.
              </Text>

              <Button
                bg="var(--bg-tertiary)"
                color="var(--color-error)"
                border="1px solid"
                borderColor="var(--color-error)"
                borderRadius="12px"
                fontWeight="600"
                leftIcon={<Trash2 size={18} />}
                _hover={{
                  bg: 'var(--color-error)',
                  color: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 30px rgba(255, 23, 68, 0.6)',
                }}
                transition="all 0.2s ease"
                onClick={() => {
                  if (window.confirm('¿Estás seguro? Esta acción no se puede deshacer.')) {
                    toast({
                      title: 'Funcionalidad pendiente',
                      description: 'La eliminación de cuenta estará disponible próximamente',
                      status: 'info',
                      duration: 3000,
                    });
                  }
                }}
              >
                Eliminar cuenta
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default Profile;