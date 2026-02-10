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

const FLOATING_TAGS = [
  { text: 'React', top: '10%', left: '5%', delay: 0 },
  { text: 'Node.js', top: '15%', right: '8%', delay: 0.2 },
  { text: 'Python', top: '25%', left: '12%', delay: 0.4 },
  { text: 'Remoto', top: '20%', right: '15%', delay: 0.6 },
  { text: 'Full Stack', top: '35%', left: '3%', delay: 0.8 },
  { text: 'TypeScript', top: '40%', right: '5%', delay: 1.0 },
  { text: 'AWS', top: '50%', left: '8%', delay: 1.2 },
  { text: 'Docker', top: '55%', right: '10%', delay: 1.4 },
  { text: 'MongoDB', top: '65%', left: '6%', delay: 1.6 },
  { text: 'Angular', top: '60%', right: '18%', delay: 1.8 },
  { text: 'Vue.js', top: '45%', left: '15%', delay: 2.0 },
  { text: 'Kubernetes', top: '70%', right: '6%', delay: 2.2 },
  { text: 'Scrum', top: '8%', left: '22%', delay: 2.4 },
  { text: 'DevOps', top: '30%', right: '22%', delay: 2.6 },
  { text: 'Next.js', top: '75%', left: '14%', delay: 2.8 },
  { text: 'GraphQL', top: '80%', right: '12%', delay: 3.0 },
  { text: 'Agile', top: '12%', right: '28%', delay: 3.2 },
  { text: 'PostgreSQL', top: '68%', left: '20%', delay: 3.4 },
  { text: 'Tailwind', top: '85%', right: '20%', delay: 3.6 },
  { text: 'Git', top: '88%', left: '10%', delay: 3.8 },
];

const getVisibleTagsCount = () => {
  if (window.innerWidth < 768) return 6;
  if (window.innerWidth < 1024) return 12;
  return 20;
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
    setCurrentPage(1);
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
      {/* Hero Section */}
      <Box
        position="relative"
        minH="50vh"
        maxH="55vh"
        display="flex"
        alignItems="center"
        overflow="hidden"
        mb={8}
      >
        {/* Contenido central del hero */}
        <Container maxW="container.xl" position="relative" zIndex={2} textAlign="center">
          <VStack spacing={6}>
            <Heading
              fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
              fontWeight="900"
              color="var(--text-primary)"
              letterSpacing="-0.02em"
              lineHeight="1.1"
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
              px={6}
              py={3}
              borderRadius="full"
              bg="rgba(15,15,25,0.75)"
              backdropFilter="blur(8px)"
              border="1px solid rgba(180,120,255,0.35)"
              boxShadow="0 0 25px rgba(163,157,181,0.25)"
              maxW={{ base: '90%', md: '600px' }}
            >
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                color="rgba(255,255,255,0.9)"
                fontWeight="500"
              >
                {totalJobs || '273'}+ ofertas tecnológicas en España. Startups, remoto y
                grandes empresas.
              </Text>
            </Box>
          </VStack>
        </Container>

        {/* Floating tags */}
        {FLOATING_TAGS.slice(0, visibleTags).map((tag, index) => (
          <MotionBadge
            key={index}
            position="absolute"
            top={tag.top}
            left={tag.left}
            right={tag.right}
            px={4}
            py={2}
            fontSize="xs"
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
              opacity: 0.65,
              y: [0, -8, 0],
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