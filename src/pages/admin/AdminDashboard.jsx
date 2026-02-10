import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Spinner,
  Center,
} from '@chakra-ui/react';

import { getAllUsers } from '../../api/users.api';
import { getJobs } from '../../api/jobs.api';
import { getAllApplications } from '../../api/applications.api';

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    jobs: 0,
    applications: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [users, jobs, applications] = await Promise.all([
          getAllUsers(),
          getJobs(),
          getAllApplications(),
        ]);

        setStats({
          users: users.length,
          jobs: jobs.length,
          applications: applications.length,
        });
      } catch (error) {
        console.error('❌ Error cargando estadísticas admin:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <Center minH="60vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box px={{ base: 4, md: 8 }} py={6}>
      <Heading mb={6}>Admin Panel</Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Stat
          p={6}
          borderRadius="xl"
          bg="var(--bg-card)"
          boxShadow="var(--shadow-sm)"
        >
          <StatLabel>Usuarios</StatLabel>
          <StatNumber>{stats.users}</StatNumber>
        </Stat>

        <Stat
          p={6}
          borderRadius="xl"
          bg="var(--bg-card)"
          boxShadow="var(--shadow-sm)"
        >
          <StatLabel>Ofertas</StatLabel>
          <StatNumber>{stats.jobs}</StatNumber>
        </Stat>

        <Stat
          p={6}
          borderRadius="xl"
          bg="var(--bg-card)"
          boxShadow="var(--shadow-sm)"
        >
          <StatLabel>Candidaturas</StatLabel>
          <StatNumber>{stats.applications}</StatNumber>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}

export default AdminDashboard;
