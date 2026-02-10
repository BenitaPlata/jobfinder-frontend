import { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { Trash2 } from 'lucide-react';
import { getJobsRequest } from '../../api/jobs.api';
import apiClient from '../../api/apiClient';

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const loadJobs = async () => {
    try {
      setLoading(true);

      // ⚠️ pedimos MUCHAS para admin (no paginado visible)
      const data = await getJobsRequest({ limit: 1000 });

      setJobs(data.jobs || []);
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
  };

  const handleDelete = async (jobId) => {
    const confirm = window.confirm('¿Seguro que quieres eliminar esta oferta?');
    if (!confirm) return;

    try {
      await apiClient.delete(`/jobs/${jobId}`);

      toast({
        title: 'Oferta eliminada',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      // recargar listado
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

  useEffect(() => {
    loadJobs();
  }, []);

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
              <Td>{job.sector}</Td>
              <Td isNumeric>
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  leftIcon={<Trash2 size={16} />}
                  onClick={() => handleDelete(job._id)}
                >
                  Eliminar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default AdminJobs;
