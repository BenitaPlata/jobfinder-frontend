import { useState, useEffect } from 'react';
import {
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Box,
  Badge,
  HStack,
  Button,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import useJobs from '../hooks/useJobs';
import JobCard from '../components/jobs/JobCard';
import JobFilters from '../components/jobs/JobFilters';
import SkeletonCard from '../components/common/SkeletonCard';

const MotionBox = motion(Box);
const MotionBadge = motion(Badge);

// Tecnologías/sectores para las tarjetitas flotantes
const FLOATING_TAGS = [
  { text: 'React', top: '8%', left: '3%', delay: 0 },
  { text: 'Node.js', top: '12%', right: '8%', delay: 0.1 },
  { text: 'Python', top: '18%', left: '15%', delay: 0.2 },
  { text: 'Remoto', top: '15%', right: '20%', delay: 0.3 },
  { text: 'Full Stack', top: '25%', left: '5%', delay: 0.4 },
  { text: 'Barcelona', top: '22%', right: '12%', delay: 0.5 },
  { text: 'TypeScript', top: '32%', left: '18%', delay: 0.6 },
  { text: 'Madrid', top: '28%', right: '25%', delay: 0.7 },
  { text: 'AWS', top: '38%', left: '8%', delay: 0.8 },
  { text: 'Startup', top: '35%', right: '5%', delay: 0.9 },
  { text: 'Vue.js', top: '45%', left: '12%', delay: 1.0 },
  { text: 'Angular', top: '42%', right: '18%', delay: 1.1 },
  { text: 'Docker', top: '52%', left: '20%', delay: 1.2 },
  { text: 'Kubernetes', top: '48%', right: '10%', delay: 1.3 },
  { text: 'MongoDB', top: '58%', left: '6%', delay: 1.4 },
  { text: 'PostgreSQL', top: '55%', right: '22%', delay: 1.5 },
  { text: 'GraphQL', top: '65%', left: '15%', delay: 1.6 },
  { text: 'Next.js', top: '62%', right: '15%', delay: 1.7 },
  { text: 'Tailwind', top: '72%', left: '10%', delay: 1.8 },
  { text: 'Redis', top: '68%', right: '8%', delay: 1.9 },
  { text: 'Firebase', top: '78%', left: '18%', delay: 2.0 },
  { text: 'Vercel', top: '75%', right: '20%', delay: 2.1 },
  { text: 'Git', top: '85%', left: '8%', delay: 2.2 },
  { text: 'CI/CD', top: '82%', right: '12%', delay: 2.3 },
  { text: 'Scrum', top: '5%', left: '25%', delay: 2.4 },
  { text: 'Agile', top: '10%', right: '30%', delay: 2.5 },
  { text: 'DevOps', top: '20%', left: '28%', delay: 2.6 },
  { text: 'Microservicios', top: '30%', right: '28%', delay: 2.7 },
  { text: 'REST API', top: '40%', left: '25%', delay: 2.8 },

  // Arquitectura / calidad
  { text: 'Clean Code', top: '88%', left: '30%', delay: 2.9 },
  { text: 'Testing', top: '90%', right: '5%', delay: 3.0 },
  { text: 'TDD', top: '92%', left: '20%', delay: 3.1 },
  { text: 'Security', top: '94%', right: '18%', delay: 3.2 },
  { text: 'OWASP', top: '96%', left: '38%', delay: 3.3 },

  // Frontend / UX
  { text: 'UI/UX', top: '6%', right: '42%', delay: 3.4 },
  { text: 'Design Systems', top: '14%', left: '42%', delay: 3.5 },
  { text: 'Accessibility', top: '22%', right: '40%', delay: 3.6 },

  // Cloud / Infra
  { text: 'Cloud', top: '60%', right: '35%', delay: 3.7 },
  { text: 'Serverless', top: '66%', left: '35%', delay: 3.8 },
  { text: 'AWS Lambda', top: '72%', right: '32%', delay: 3.9 },

  // Data / IA
  { text: 'Data', top: '8%', right: '55%', delay: 4.0 },
  { text: 'Machine Learning', top: '16%', left: '55%', delay: 4.1 },
  { text: 'AI', top: '24%', right: '52%', delay: 4.2 },

  // Backend moderno
  { text: 'APIs', top: '50%', left: '45%', delay: 4.3 },
  { text: 'Auth', top: '56%', right: '48%', delay: 4.4 },
  { text: 'JWT', top: '62%', left: '48%', delay: 4.5 },

  // Ecosistema JS
  { text: 'JavaScript', top: '70%', right: '45%', delay: 4.6 },
  { text: 'ES6+', top: '76%', left: '42%', delay: 4.7 },

  // Mercado / roles
  { text: 'Frontend Dev', top: '18%', right: '45%', delay: 4.8 },
  { text: 'Backend Dev', top: '26%', left: '45%', delay: 4.9 },
  { text: 'Tech Lead', top: '42%', left: '40%', delay: 5.0 },

  // Modalidad trabajo
  { text: 'Hybrid', top: '12%', right: '60%', delay: 5.1 },
  { text: 'Onsite', top: '20%', left: '60%', delay: 5.2 },
  { text: 'Full Remote', top: '34%', right: '42%', delay: 5.3 },
];

const getVisibleTagsCount = () => {
  if (window.innerWidth < 768) return 10; // móvil
  if (window.innerWidth < 1024) return 18; // tablet
  return 28; // desktop
};

function Jobs() {
  useEffect(() => {
    document.documentElement.className = 'page-home';
    return () => {
      document.documentElement.className = '';
    };
  }, []);
  const [visibleTags, setVisibleTags] = useState(getVisibleTagsCount());

  useEffect(() => {
    const handleResize = () => {
      setVisibleTags(getVisibleTagsCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 10;

  const { jobs, isLoading, error, totalPages, totalJobs } = useJobs(
    filters,
    currentPage,
    JOBS_PER_PAGE
  );

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset a página 1 cuando cambien filtros
  };

  if (error) {
    return (
      <Container maxW="container.xl" centerContent py={20}>
        <Text color="var(--color-error)">Error: {error}</Text>
      </Container>
    );
  }

  return (
    <Box minH="100vh">
      {/* Hero Section con tarjetitas flotantes */}
      <Box
        position="relative"
        minH="50vh"
        maxH="55vh"
        display="flex"
        alignItems="center"
        overflow="hidden"
        mb={8}
      >
        <Container maxW="container.xl" position="relative" zIndex={2} textAlign="center">
          <VStack spacing={6} textAlign="center">
            <Heading
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
              fontWeight="900"
              color="var(--text-primary)"
              letterSpacing="-0.02em"
              lineHeight="1.05"
            >
              Encuentra tu próximo
              <br />
              <Box
                as="span"
                background="linear-gradient(135deg, #B892FF 0%, #64bdb9 100%)"
                backgroundClip="text"
                sx={{
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 18px rgba(180, 120, 255, 0.6))',
                }}
              >
                trabajo
              </Box>
            </Heading>

            <Box
              position="relative"
              minH="70vh"
              maxH="75vh"
              overflow="hidden"
              display="flex"
              alignItems="center"
              mb={8}
            >
              <Container
                maxW="container.xl"
                position="relative"
                zIndex={2}
                textAlign="center"
              >
                <VStack spacing={6}>
                  <Heading
                    fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
                    fontWeight="900"
                    letterSpacing="-0.02em"
                    lineHeight="1.05"
                    color="var(--text-primary)"
                  >
                    Encuentra tu próximo
                    <br />
                    <Box
                      as="span"
                      bg="linear-gradient(135deg, #B892FF 0%, #64BDB9 100%)"
                      backgroundClip="text"
                      sx={{
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 18px rgba(180,120,255,0.6))',
                      }}
                    >
                      trabajo
                    </Box>
                  </Heading>

                  <Box
                    px={6}
                    py={3}
                    borderRadius="full"
                    bg="rgba(15,15,25,0.65)"
                    backdropFilter="blur(8px)"
                    border="1px solid rgba(180,120,255,0.35)"
                    boxShadow="0 0 25px rgba(163,157,181,0.25)"
                  >
                    <Text
                      fontSize={{ base: 'md', md: 'lg' }}
                      color="rgba(255,255,255,0.9)"
                      fontWeight="500"
                    >
                      273+ ofertas tecnológicas en España. Startups, remoto y grandes
                      empresas.
                    </Text>
                  </Box>
                </VStack>
              </Container>

              {FLOATING_TAGS.slice(0, visibleTags).map((tag, index) => (
                <MotionBadge
                  key={index}
                  position="absolute"
                  top={tag.top}
                  left={tag.left}
                  right={tag.right}
                  px={4}
                  py={2}
                  fontSize="sm"
                  fontWeight="600"
                  borderRadius="full"
                  bg="rgba(15,15,25,0.55)"
                  color="rgba(255,255,255,0.85)"
                  border="1px solid rgba(180,120,255,0.35)"
                  boxShadow="0 0 8px rgba(180,120,255,0.25)"
                  backdropFilter="blur(6px)"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.75, y: [0, -10, 0] }}
                  transition={{
                    opacity: { delay: tag.delay, duration: 0.5 },
                    y: {
                      delay: tag.delay + 0.5,
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  {tag.text}
                </MotionBadge>
              ))}
            </Box>
          </VStack>
        </Container>

        {/* Tarjetitas flotantes animadas */}
        {FLOATING_TAGS.slice(0, visibleTags).map((tag, index) => (
          <MotionBadge
            key={index}
            position="absolute"
            top={tag.top}
            left={tag.left}
            right={tag.right}
            px={4}
            py={2}
            fontSize="sm"
            fontWeight="600"
            borderRadius="full"
            bg="rgba(15, 15, 25, 0.55)"
            color="rgba(255,255,255,0.85)"
            border="1px solid"
            borderColor="rgba(180,120,255,0.35)"
            boxShadow="0 0 8px rgba(180, 120, 255, 0.25)"
            backdropFilter="blur(6px)"
            cursor="pointer"
            whileHover={{
              scale: 1.12,
              opacity: 1,
              boxShadow: '0 0 16px rgba(180, 120, 255, 0.55)',
              borderColor: 'rgba(180, 120, 255, 0.9)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 0.75,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { delay: tag.delay, duration: 0.5 },
              y: {
                delay: tag.delay + 0.5,
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            onClick={() => {
              console.log('Clicked:', tag.text);
            }}
          >
            {tag.text}
          </MotionBadge>
        ))}
      </Box>

      {/* Contenido principal */}
      <Container maxW="container.xl" pb={12}>
        <VStack spacing={8} align="stretch">
          <JobFilters onFilterChange={handleFilterChange} />

          {isLoading ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {[...Array(6)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </SimpleGrid>
          ) : (
            <>
              <HStack justify="space-between" width="full">
                <Text color="var(--text-secondary)" fontSize="md" fontWeight="500">
                  {totalJobs} ofertas encontradas • Página {currentPage} de {totalPages}
                </Text>
              </HStack>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {jobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: 'easeOut',
                    }}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}
              </SimpleGrid>

              {/* Paginación */}
              {totalPages > 1 && (
                <HStack justify="center" spacing={4} pt={10}>
                  {/* Anterior */}
                  <Button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    isDisabled={currentPage === 1}
                    px={6}
                    py={3}
                    borderRadius="full"
                    bg="rgba(15, 15, 25, 0.65)"
                    color="white"
                    border="1px solid"
                    borderColor="rgba(180,120,255,0.4)"
                    backdropFilter="blur(6px)"
                    boxShadow="0 0 10px rgba(180,120,255,0.25)"
                    fontWeight="600"
                    _hover={{
                      boxShadow: '0 0 18px rgba(180,120,255,0.6)',
                      transform: 'translateY(-1px)',
                    }}
                    _disabled={{
                      opacity: 0.4,
                      cursor: 'not-allowed',
                      boxShadow: 'none',
                    }}
                  >
                    ← Anterior
                  </Button>

                  {/* Números */}
                  <HStack spacing={2}>
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      const isActive = currentPage === pageNum;

                      return (
                        <Button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          minW="44px"
                          h="44px"
                          borderRadius="full"
                          bg={isActive ? 'rgba(180,120,255,0.9)' : 'rgba(15,15,25,0.6)'}
                          color={isActive ? 'white' : 'rgba(255,255,255,0.85)'}
                          border="1px solid"
                          borderColor="rgba(180,120,255,0.5)"
                          backdropFilter="blur(6px)"
                          boxShadow={
                            isActive
                              ? '0 0 18px rgba(180,120,255,0.8)'
                              : '0 0 6px rgba(180,120,255,0.25)'
                          }
                          fontWeight="600"
                          _hover={{
                            boxShadow: '0 0 20px rgba(180,120,255,0.7)',
                            transform: 'translateY(-1px)',
                          }}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </HStack>

                  {/* Siguiente */}
                  <Button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    isDisabled={currentPage === totalPages}
                    px={6}
                    py={3}
                    borderRadius="full"
                    bg="rgba(15, 15, 25, 0.65)"
                    color="white"
                    border="1px solid"
                    borderColor="rgba(180,120,255,0.4)"
                    backdropFilter="blur(6px)"
                    boxShadow="0 0 10px rgba(180,120,255,0.25)"
                    fontWeight="600"
                    _hover={{
                      boxShadow: '0 0 18px rgba(180,120,255,0.6)',
                      transform: 'translateY(-1px)',
                    }}
                    _disabled={{
                      opacity: 0.4,
                      cursor: 'not-allowed',
                      boxShadow: 'none',
                    }}
                  >
                    Siguiente →
                  </Button>
                </HStack>
              )}
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

export default Jobs;
