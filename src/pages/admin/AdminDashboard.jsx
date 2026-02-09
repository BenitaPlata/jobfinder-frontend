import { Box, SimpleGrid, Text, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { Users, Briefcase, FileText } from 'lucide-react';

function AdminDashboard() {
  return (
    <Box>
      <Text
        fontSize="2xl"
        fontWeight="800"
        mb={6}
        color="var(--text-primary)"
      >
        Dashboard
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {/* USUARIOS */}
        <Stat
          p={6}
          bg="var(--bg-card)"
          borderRadius="xl"
          boxShadow="var(--shadow-sm)"
        >
          <StatLabel display="flex" alignItems="center" gap={2}>
            <Users size={18} />
            Usuarios
          </StatLabel>
          <StatNumber fontSize="3xl">—</StatNumber>
        </Stat>

        {/* OFERTAS */}
        <Stat
          p={6}
          bg="var(--bg-card)"
          borderRadius="xl"
          boxShadow="var(--shadow-sm)"
        >
          <StatLabel display="flex" alignItems="center" gap={2}>
            <Briefcase size={18} />
            Ofertas
          </StatLabel>
          <StatNumber fontSize="3xl">—</StatNumber>
        </Stat>

        {/* CANDIDATURAS */}
        <Stat
          p={6}
          bg="var(--bg-card)"
          borderRadius="xl"
          boxShadow="var(--shadow-sm)"
        >
          <StatLabel display="flex" alignItems="center" gap={2}>
            <FileText size={18} />
            Candidaturas
          </StatLabel>
          <StatNumber fontSize="3xl">—</StatNumber>
        </Stat>
      </SimpleGrid>

      <Box
        mt={10}
        p={6}
        bg="var(--bg-card)"
        borderRadius="xl"
        boxShadow="var(--shadow-sm)"
      >
        <Text fontWeight="700" mb={2}>
          Estado del sistema
        </Text>
        <Text color="var(--text-secondary)">
          Panel de administración operativo.  
          Aquí podrás gestionar usuarios, ofertas y candidaturas.
        </Text>
      </Box>
    </Box>
  );
}

export default AdminDashboard;
