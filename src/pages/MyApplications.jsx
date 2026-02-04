import { useState, useEffect } from 'react';
import {
  Container,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Box,
  Text,
  Badge,
  Button,
  HStack,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { Eye, Trash2, Bookmark, Send, Calendar, XCircle } from 'lucide-react';
import {
  getMyApplicationsRequest,
  deleteApplicationRequest,
} from '../api/applications.api';
import { useNavigate } from 'react-router-dom';

function MyApplications() {
  useEffect(() => {
    document.documentElement.className = 'page-applications';
    return () => {
      document.documentElement.className = '';
    };
  }, []);

  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getMyApplicationsRequest();
        const apps =
          response?.applications || response?.data?.applications || response?.data || [];
        console.log('🔍 Applications completas:', apps);
        console.log('🔍 Primera application:', apps[0]);
        setApplications(apps);
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast({
          title: 'Error',
          description: 'No se pudieron cargar las candidaturas',
          status: 'error',
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [toast]);

  const handleDelete = async (applicationId) => {
    try {
      await deleteApplicationRequest(applicationId);
      setApplications(applications.filter((app) => app._id !== applicationId));
      toast({
        title: 'Eliminado',
        description: 'Candidatura eliminada correctamente',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error('Error deleting application:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la candidatura',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const filterByStatus = (status) => {
    return applications.filter((app) => app.status === status);
  };

  const ApplicationCard = ({ application }) => {
    const getStatusConfig = (status) => {
      const configs = {
        Saved: {
          bg: 'var(--bg-tertiary)',
          color: 'var(--color-primary)',
          border: 'var(--color-primary)',
          glow: 'var(--glow-primary)',
          icon: <Bookmark size={14} />,
          label: 'Guardada',
        },
        Applied: {
          bg: 'var(--bg-tertiary)',
          color: 'var(--color-accent)',
          border: 'var(--color-accent)',
          glow: 'var(--glow-accent)',
          icon: <Send size={14} />,
          label: 'Inscrita',
        },
        Interview: {
          bg: 'var(--bg-tertiary)',
          color: 'var(--color-secondary)',
          border: 'var(--color-secondary)',
          glow: 'var(--glow-secondary)',
          icon: <Calendar size={14} />,
          label: 'Entrevista',
        },
        Rejected: {
          bg: 'var(--bg-tertiary)',
          color: 'var(--color-error)',
          border: 'var(--color-error)',
          glow: '0 0 20px rgba(255, 23, 68, 0.5)',
          icon: <XCircle size={14} />,
          label: 'Rechazada',
        },
      };
      return configs[status] || configs.Saved;
    };

    const statusConfig = getStatusConfig(application.status);

    return (
      <Box
        bg="var(--bg-card)"
        p={6}
        borderRadius="16px"
        boxShadow="var(--shadow-sm)"
        border="1px solid"
        borderColor="var(--bg-tertiary)"
        _hover={{
          boxShadow: statusConfig.glow,
          borderColor: statusConfig.border,
          transform: 'translateY(-4px)',
        }}
        transition="all 0.2s ease"
      >
        <VStack align="stretch" spacing={4}>
          <Box>
            <Heading size="md" color="var(--text-primary)" mb={2} fontWeight="700">
              {application.jobId?.title || 'Título no disponible'}
            </Heading>
            <Text color="var(--text-secondary)" fontWeight="600" fontSize="sm">
              {application.jobId?.company || 'Empresa no disponible'}
            </Text>
          </Box>

          <HStack spacing={2} wrap="wrap">
            <Badge
              bg={statusConfig.bg}
              color={statusConfig.color}
              border="1px solid"
              borderColor={statusConfig.border}
              px={3}
              py={1}
              borderRadius="full"
              fontSize="sm"
              fontWeight="600"
              boxShadow={statusConfig.glow}
            >
              <HStack spacing={1}>
                {statusConfig.icon}
                <Text>{statusConfig.label}</Text>
              </HStack>
            </Badge>

            {application.jobId?.location?.city && (
              <Badge
                bg="var(--bg-secondary)"
                color="var(--text-secondary)"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
                fontWeight="500"
                border="1px solid"
                borderColor="var(--bg-tertiary)"
              >
                📍 {application.jobId.location.city}
              </Badge>
            )}
          </HStack>

          {application.notes && (
            <Text color="var(--text-tertiary)" fontSize="sm" noOfLines={2}>
              {application.notes}
            </Text>
          )}

          <HStack spacing={3}>
            <Button
              size="sm"
              bg="var(--bg-tertiary)"
              color="var(--color-accent)"
              border="1px solid"
              borderColor="var(--color-accent)"
              flex={1}
              borderRadius="12px"
              fontWeight="600"
              boxShadow="var(--glow-accent)"
              leftIcon={<Eye size={16} />}
              _hover={{
                bg: 'var(--color-accent)',
                color: 'var(--bg-primary)',
                transform: 'translateY(-2px)',
                boxShadow: '0 0 30px rgba(127, 255, 212, 0.6)',
              }}
              transition="all 0.2s ease"
              onClick={() => navigate(`/jobs/${application.jobId?._id}`)}
            >
              Ver oferta
            </Button>
            <Button
              size="sm"
              bg="var(--bg-tertiary)"
              color="var(--color-error)"
              border="1px solid"
              borderColor="var(--color-error)"
              borderRadius="12px"
              fontWeight="600"
              leftIcon={<Trash2 size={16} />}
              _hover={{
                bg: 'var(--color-error)',
                color: 'white',
                transform: 'translateY(-2px)',
                boxShadow: '0 0 30px rgba(255, 23, 68, 0.6)',
              }}
              transition="all 0.2s ease"
              onClick={() => handleDelete(application._id)}
            >
              Eliminar
            </Button>
          </HStack>
        </VStack>
      </Box>
    );
  };

  const EmptyState = ({ message }) => (
    <Box textAlign="center" py={12}>
      <Text color="var(--text-tertiary)" fontSize="lg">
        {message}
      </Text>
    </Box>
  );

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={20} centerContent>
        <Text color="var(--text-secondary)">Cargando candidaturas...</Text>
      </Container>
    );
  }

  return (
    <Box minH="100vh">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading
            size={{ base: 'xl', md: '2xl' }}
            color="var(--text-primary)"
            fontWeight="900"
          >
            Mis Candidaturas
          </Heading>

          <Tabs
            variant="soft-rounded"
            sx={{
              '.chakra-tabs__tab[aria-selected=true]': {
                bg: 'var(--color-primary)',
                color: 'var(--bg-primary)',
                boxShadow: 'var(--glow-primary)',
                fontWeight: '600',
              },
              '.chakra-tabs__tab': {
                color: 'var(--text-secondary)',
                fontWeight: '600',
                _hover: {
                  bg: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                },
              },
            }}
          >
            <TabList>
              <Tab>
                <HStack spacing={2}>
                  <Bookmark size={16} />
                  <Text>Guardadas ({filterByStatus('Saved').length})</Text>
                </HStack>
              </Tab>
              <Tab>
                <HStack spacing={2}>
                  <Send size={16} />
                  <Text>Inscritas ({filterByStatus('Applied').length})</Text>
                </HStack>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {filterByStatus('Saved').length > 0 ? (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {filterByStatus('Saved').map((app) => (
                      <ApplicationCard key={app._id} application={app} />
                    ))}
                  </SimpleGrid>
                ) : (
                  <EmptyState message="No tienes ofertas guardadas" />
                )}
              </TabPanel>

              <TabPanel>
                {filterByStatus('Applied').length > 0 ? (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {filterByStatus('Applied').map((app) => (
                      <ApplicationCard key={app._id} application={app} />
                    ))}
                  </SimpleGrid>
                ) : (
                  <EmptyState message="No te has inscrito a ninguna oferta todavía" />
                )}
              </TabPanel>

              <TabPanel>
                {filterByStatus('Interview').length > 0 ? (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {filterByStatus('Interview').map((app) => (
                      <ApplicationCard key={app._id} application={app} />
                    ))}
                  </SimpleGrid>
                ) : (
                  <EmptyState message="No tienes entrevistas programadas" />
                )}
              </TabPanel>

              <TabPanel>
                {filterByStatus('Rejected').length > 0 ? (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {filterByStatus('Rejected').map((app) => (
                      <ApplicationCard key={app._id} application={app} />
                    ))}
                  </SimpleGrid>
                ) : (
                  <EmptyState message="No tienes candidaturas rechazadas" />
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
}

export default MyApplications;
