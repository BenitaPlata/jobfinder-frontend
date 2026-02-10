import { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spinner,
  Center,
  useToast,
  HStack,
  Text,
} from '@chakra-ui/react';
import { Trash2 } from 'lucide-react';
import { getJobsRequest, deleteJobRequest } from '../../api/jobs.api';

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const loadJobs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getJobsRequest({ limit: 1000 });
      setJobs(data.jobs || data || []);
    } catch (error) {
      console.error('❌ Error cargando ofertas:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las ofertas',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleDelete = async (jobId, jobTitle) => {
    const confirmDelete = window.confirm(
      `¿Seguro que quieres eliminar la oferta "${jobTitle}"?\n\nEsta acción NO se puede deshacer.`
    );
    if (!confirmDelete) return;

    try {
      await deleteJobRequest(jobId);

      toast({
        title: 'Oferta eliminada',
        description: `La oferta "${jobTitle}" ha sido eliminada correctamente`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      loadJobs();
    } catch (error) {
      console.error('❌ Error eliminando oferta:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la oferta',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Center minH="60vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box>
      <Heading mb={6}>Ofertas</Heading>

      {jobs.length === 0 ? (
        <Text color="var(--text-tertiary)">No hay ofertas disponibles.</Text>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Título</Th>
              <Th>Empresa</Th>
              <Th>Sector</Th>
              <Th isNumeric>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {jobs.map((job) => (
              <Tr key={job._id}>
                <Td>{job.title}</Td>
                <Td>{job.companyName || '-'}</Td>
                <Td>{job.sector || '-'}</Td>
                <Td isNumeric>
                  <HStack justify="flex-end">
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      leftIcon={<Trash2 size={16} />}
                      onClick={() => handleDelete(job._id, job.title)}
                    >
                      Eliminar
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}

export default AdminJobs;