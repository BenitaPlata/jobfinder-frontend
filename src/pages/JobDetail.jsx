import { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Divider,
  SimpleGrid,
  useToast,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Progress,
  Wrap,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Send,
  Bookmark,
  ExternalLink,
  MapPin,
  Briefcase,
  Code,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { getJobByIdRequest } from '../api/jobs.api';
import { createApplicationRequest } from '../api/applications.api';
import { compareCVWithJobRequest } from '../api/cv.api';

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comparison, setComparison] = useState(null);
  const [loadingComparison, setLoadingComparison] = useState(false);

  useEffect(() => {
    document.documentElement.className = 'page-home';
    return () => {
      document.documentElement.className = '';
    };
  }, []);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobByIdRequest(id);
        const jobData = response?.job || response?.data?.job || response?.data || response;

        if (!jobData) {
          throw new Error('No se recibieron datos del trabajo');
        }

        setJob(jobData);
      } catch (error) {
        console.error('Error fetching job:', error);
        toast({
          title: 'Error',
          description: 'No se pudo cargar la oferta',
          status: 'error',
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id, toast]);

  const handleSave = async () => {
    try {
      await createApplicationRequest(id, 'Saved', '');
      toast({
        title: '💾 Oferta guardada',
        description: 'La oferta se ha guardado en tus candidaturas',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'No se pudo guardar la oferta',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleApply = async () => {
    try {
      await createApplicationRequest(id, 'Applied', '');
      toast({
        title: '✅ Oferta marcada',
        description: 'La oferta se guardó como "Inscrita". Inscríbete desde el enlace original',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'No pudiste inscribirte a la oferta',
        status: 'error',
        duration: 3000,
      });
    }
  };

  // COMPARAR CV
  const handleCompareCV = async () => {
    try {
      setLoadingComparison(true);
      const response = await compareCVWithJobRequest(id);
      setComparison(response.data.comparison);
      onOpen();
    } catch (error) {
      if (error.response?.status === 400) {
        toast({
          title: 'CV no encontrado',
          description: 'Debes subir tu CV en tu perfil primero',
          status: 'warning',
          duration: 4000,
        });
      } else {
        toast({
          title: 'Error',
          description: 'No se pudo comparar el CV',
          status: 'error',
          duration: 3000,
        });
      }
    } finally {
      setLoadingComparison(false);
    }
  };

  // Helper para color según score
  const getScoreColor = (score) => {
    if (score >= 75) return 'var(--color-accent)';
    if (score >= 50) return 'var(--color-secondary)';
    return 'var(--color-error)';
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={20} centerContent>
        <Spinner size="xl" color="var(--color-primary)" thickness="4px" />
      </Container>
    );
  }

  if (!job) {
    return (
      <Container maxW="container.xl" py={20} centerContent>
        <Text color="var(--text-secondary)">Oferta no encontrada</Text>
        <Button
          variant="ghost"
          color="var(--text-tertiary)"
          mt={6}
          leftIcon={<ArrowLeft size={18} />}
          onClick={() => navigate('/')}
          _hover={{
            color: 'var(--color-accent)',
            textShadow: 'var(--glow-accent)',
            transform: 'translateX(-4px)',
          }}
          transition="all 0.2s ease"
        >
          Volver a ofertas
        </Button>
      </Container>
    );
  }

  return (
    <Box minH="100vh">
      <Container maxW="container.lg" py={12}>
        <Button
          variant="ghost"
          color="var(--text-secondary)"
          mb={6}
          leftIcon={<ArrowLeft size={18} />}
          onClick={() => navigate('/')}
          _hover={{
            color: 'var(--color-accent)',
            textShadow: 'var(--glow-accent)',
            transform: 'translateX(-4px)',
          }}
          transition="all 0.2s ease"
        >
          Volver a ofertas
        </Button>

        <VStack spacing={8} align="stretch">
          <Box
            bg="var(--bg-card)"
            p={{ base: 6, md: 10 }}
            borderRadius="24px"
            boxShadow="var(--shadow-lg)"
            border="1px solid"
            borderColor="var(--bg-tertiary)"
          >
            <VStack align="stretch" spacing={8}>
              {/* Header */}
              <VStack align="start" spacing={3}>
                <HStack spacing={2}>
                  <Briefcase size={20} color="var(--color-accent)" />
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="var(--color-accent)"
                    letterSpacing="0.5px"
                    textTransform="uppercase"
                    textShadow="var(--glow-accent)"
                  >
                    {job.company}
                  </Text>
                </HStack>
                <Heading
                  fontSize={{ base: '3xl', md: '4xl' }}
                  fontWeight="800"
                  color="var(--text-primary)"
                  lineHeight="1.2"
                >
                  {job.title}
                </Heading>
              </VStack>

              {/* Badges */}
              <HStack spacing={3} wrap="wrap">
                <Badge
                  bg="var(--bg-tertiary)"
                  color="var(--color-primary)"
                  border="1px solid"
                  borderColor="var(--color-primary)"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="600"
                  boxShadow="var(--glow-primary)"
                >
                  {job.contractType}
                </Badge>

                {job.salaryRange && (
                  <Badge
                    bg="var(--bg-tertiary)"
                    color="var(--color-secondary)"
                    border="1px solid"
                    borderColor="var(--color-secondary)"
                    px={4}
                    py={2}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="600"
                    boxShadow="var(--glow-secondary)"
                  >
                    <HStack spacing={1}>
                      <TrendingUp size={14} />
                      <Text>
                        {job.salaryRange.min}€ - {job.salaryRange.max}€
                      </Text>
                    </HStack>
                  </Badge>
                )}

                <Badge
                  bg="var(--bg-tertiary)"
                  color="var(--color-accent)"
                  border="1px solid"
                  borderColor="var(--color-accent)"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="600"
                  boxShadow="var(--glow-accent)"
                >
                  <HStack spacing={1}>
                    <MapPin size={14} />
                    <Text>{job.location?.city}</Text>
                  </HStack>
                </Badge>

                {job.location?.isRemote && (
                  <Badge
                    bg="var(--bg-secondary)"
                    color="var(--text-secondary)"
                    px={4}
                    py={2}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="600"
                    border="1px solid"
                    borderColor="var(--bg-tertiary)"
                  >
                    Remoto
                  </Badge>
                )}
              </HStack>

              <Divider borderColor="var(--bg-tertiary)" />

              {/* Descripción */}
              <VStack align="start" spacing={4}>
                <Heading size="lg" color="var(--text-primary)" fontWeight="700">
                  Sobre el puesto
                </Heading>
                <Text
                  color="var(--text-secondary)"
                  fontSize="md"
                  lineHeight="1.8"
                  whiteSpace="pre-line"
                >
                  {job.description}
                </Text>
              </VStack>

              {/* Tecnologías */}
              {job.techDetails?.technologies && job.techDetails.technologies.length > 0 && (
                <>
                  <Divider borderColor="var(--bg-tertiary)" />
                  <VStack align="start" spacing={4}>
                    <HStack spacing={2}>
                      <Code size={22} color="var(--color-primary)" />
                      <Heading size="lg" color="var(--text-primary)" fontWeight="700">
                        Stack técnico
                      </Heading>
                    </HStack>
                    <HStack spacing={3} wrap="wrap">
                      {job.techDetails.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          bg="var(--bg-secondary)"
                          color="var(--text-secondary)"
                          px={4}
                          py={2}
                          borderRadius="12px"
                          fontSize="sm"
                          fontWeight="500"
                          border="1px solid"
                          borderColor="var(--bg-tertiary)"
                          _hover={{
                            borderColor: 'var(--color-accent)',
                            color: 'var(--color-accent)',
                            textShadow: 'var(--glow-accent)',
                          }}
                          transition="all 0.2s ease"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </HStack>
                  </VStack>
                </>
              )}

              {/* Detalles */}
              {job.techDetails && (
                <>
                  <Divider borderColor="var(--bg-tertiary)" />
                  <VStack align="start" spacing={4}>
                    <Heading size="lg" color="var(--text-primary)" fontWeight="700">
                      Detalles
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="full">
                      {job.techDetails.experienceRequired && (
                        <HStack spacing={2}>
                          <Text fontWeight="600" color="var(--text-tertiary)">
                            Experiencia:
                          </Text>
                          <Text color="var(--text-secondary)">
                            {job.techDetails.experienceRequired}
                          </Text>
                        </HStack>
                      )}

                      {job.techDetails.workModality && (
                        <HStack spacing={2}>
                          <Text fontWeight="600" color="var(--text-tertiary)">
                            Modalidad:
                          </Text>
                          <Text color="var(--text-secondary)">
                            {job.techDetails.workModality}
                          </Text>
                        </HStack>
                      )}

                      {job.techDetails.companyType && (
                        <HStack spacing={2}>
                          <Text fontWeight="600" color="var(--text-tertiary)">
                            Tipo de empresa:
                          </Text>
                          <Text color="var(--text-secondary)">
                            {job.techDetails.companyType}
                          </Text>
                        </HStack>
                      )}

                      {job.techDetails.englishLevel && job.techDetails.englishLevel !== 'none' && (
                        <HStack spacing={2}>
                          <Text fontWeight="600" color="var(--text-tertiary)">
                            Nivel de inglés:
                          </Text>
                          <Text color="var(--text-secondary)">
                            {job.techDetails.englishLevel === 'basic' && 'Básico (A2-B1)'}
                            {job.techDetails.englishLevel === 'intermediate' && 'Intermedio (B2)'}
                            {job.techDetails.englishLevel === 'advanced' && 'Avanzado (C1-C2)'}
                            {job.techDetails.englishLevel === 'native' && 'Nativo'}
                          </Text>
                        </HStack>
                      )}
                    </SimpleGrid>
                  </VStack>
                </>
              )}

              <Divider borderColor="var(--bg-tertiary)" />

              {/*BOTÓN COMPARAR CV */}
              <Button
                bg="var(--bg-tertiary)"
                color="var(--color-primary)"
                border="1px solid"
                borderColor="var(--color-primary)"
                size="lg"
                width="full"
                borderRadius="12px"
                fontWeight="600"
                boxShadow="var(--glow-primary)"
                leftIcon={loadingComparison ? <Spinner size="sm" /> : <Target size={18} />}
                isDisabled={loadingComparison}
                _hover={{
                  bg: 'var(--color-primary)',
                  color: 'var(--bg-primary)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 30px rgba(201, 173, 227, 0.6)',
                }}
                transition="all 0.2s ease"
                onClick={handleCompareCV}
              >
                {loadingComparison ? 'Analizando...' : '🎯 Ver compatibilidad con mi CV'}
              </Button>

              {/* Botones de acción */}
              <VStack spacing={3}>
                <HStack spacing={4} width="full">
                  <Button
                    bg="var(--bg-tertiary)"
                    color="var(--color-accent)"
                    border="1px solid"
                    borderColor="var(--color-accent)"
                    size="lg"
                    flex={1}
                    borderRadius="12px"
                    fontWeight="600"
                    boxShadow="var(--glow-accent)"
                    leftIcon={<Send size={18} />}
                    _hover={{
                      bg: 'var(--color-accent)',
                      color: 'var(--bg-primary)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 0 30px rgba(127, 255, 212, 0.6)',
                    }}
                    transition="all 0.2s ease"
                    onClick={handleApply}
                  >
                    Marcar como inscrita
                  </Button>

                  <Button
                    bg="var(--bg-tertiary)"
                    color="var(--color-secondary)"
                    border="1px solid"
                    borderColor="var(--color-secondary)"
                    size="lg"
                    flex={1}
                    borderRadius="12px"
                    fontWeight="600"
                    boxShadow="var(--glow-secondary)"
                    leftIcon={<Bookmark size={18} />}
                    _hover={{
                      bg: 'var(--color-secondary)',
                      color: 'var(--bg-primary)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 0 30px rgba(255, 179, 217, 0.6)',
                    }}
                    transition="all 0.2s ease"
                    onClick={handleSave}
                  >
                    Guardar oferta
                  </Button>
                </HStack>

                {job.externalUrl && (
                  <Button
                    as="a"
                    href={job.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    size="lg"
                    width="full"
                    borderColor="var(--color-accent)"
                    color="var(--color-accent)"
                    borderRadius="12px"
                    fontWeight="600"
                    leftIcon={<ExternalLink size={18} />}
                    _hover={{
                      bg: 'var(--color-accent)',
                      color: 'var(--bg-primary)',
                      transform: 'translateY(-2px)',
                      boxShadow: 'var(--glow-accent)',
                    }}
                    transition="all 0.2s ease"
                  >
                    Ver oferta original
                  </Button>
                )}
              </VStack>
            </VStack>
          </Box>
        </VStack>
      </Container>

      {/*MODAL COMPARACIÓN */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay bg="rgba(0,0,0,0.8)" backdropFilter="blur(10px)" />
        <ModalContent bg="var(--bg-card)" borderRadius="24px" border="1px solid" borderColor="var(--bg-tertiary)">
          <ModalHeader color="var(--text-primary)">
            <HStack spacing={2}>
              <Target size={24} color="var(--color-primary)" />
              <Text>Compatibilidad con la oferta</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton color="var(--text-secondary)" />
          <ModalBody pb={6}>
            {comparison && (
              <VStack spacing={6} align="stretch">
                {/* Score */}
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="600" color="var(--text-secondary)">
                      Puntuación de encaje
                    </Text>
                    <Text fontSize="2xl" fontWeight="700" color={getScoreColor(comparison.matchScore)}>
                      {comparison.matchScore}%
                    </Text>
                  </HStack>
                  <Progress
                    value={comparison.matchScore}
                    size="lg"
                    borderRadius="full"
                    bg="var(--bg-tertiary)"
                    sx={{
                      '& > div': {
                        background: `linear-gradient(90deg, ${getScoreColor(comparison.matchScore)}, var(--color-primary))`,
                      },
                    }}
                  />
                  <HStack spacing={4} mt={3}>
                    <Badge
                      bg="var(--bg-tertiary)"
                      color="var(--color-accent)"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontWeight="600"
                    >
                      {comparison.overallFit}
                    </Badge>
                    <Badge
                      bg="var(--bg-tertiary)"
                      color={
                        comparison.atsRisk === 'Bajo'
                          ? 'var(--color-accent)'
                          : comparison.atsRisk === 'Medio'
                            ? 'var(--color-secondary)'
                            : 'var(--color-error)'
                      }
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontWeight="600"
                    >
                      Riesgo ATS: {comparison.atsRisk}
                    </Badge>
                  </HStack>
                </Box>

                <Divider borderColor="var(--bg-tertiary)" />

                {/* Resumen */}
                <Box>
                  <Text fontWeight="600" color="var(--text-secondary)" mb={2}>
                    📋 Resumen
                  </Text>
                  <Text color="var(--text-secondary)" lineHeight="1.7">
                    {comparison.summary}
                  </Text>
                </Box>

                {/* Skills coincidentes */}
                {comparison.matchedSkills && comparison.matchedSkills.length > 0 && (
                  <Box>
                    <HStack spacing={2} mb={3}>
                      <CheckCircle size={18} color="var(--color-accent)" />
                      <Text fontWeight="600" color="var(--text-secondary)">
                        Skills que coinciden
                      </Text>
                    </HStack>
                    <Wrap>
                      {comparison.matchedSkills.map((skill, i) => (
                        <Badge
                          key={i}
                          bg="var(--bg-tertiary)"
                          color="var(--color-accent)"
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </Wrap>
                  </Box>
                )}

                {/* Skills que faltan */}
                {comparison.missingSkills && comparison.missingSkills.length > 0 && (
                  <Box>
                    <HStack spacing={2} mb={3}>
                      <AlertTriangle size={18} color="var(--color-secondary)" />
                      <Text fontWeight="600" color="var(--text-secondary)">
                        Skills que te faltan
                      </Text>
                    </HStack>
                    <Wrap>
                      {comparison.missingSkills.map((skill, i) => (
                        <Badge
                          key={i}
                          bg="var(--bg-tertiary)"
                          color="var(--color-secondary)"
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </Wrap>
                  </Box>
                )}

                {/* Recomendaciones */}
                {comparison.recommendations && comparison.recommendations.length > 0 && (
                  <Box>
                    <Text fontWeight="600" color="var(--text-secondary)" mb={3}>
                      💡 Recomendaciones
                    </Text>
                    <VStack align="start" spacing={2}>
                      {comparison.recommendations.map((rec, i) => (
                        <HStack key={i} align="start" spacing={2}>
                          <Text color="var(--color-primary)">•</Text>
                          <Text color="var(--text-secondary)" fontSize="sm">
                            {rec}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Box>
                )}
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default JobDetail;