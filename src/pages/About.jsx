import { useEffect } from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Image,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Github,
  MapPin,
  Target,
  TrendingUp,
  Rocket,
  ExternalLink,
} from 'lucide-react';

const MotionBox = motion(Box);

function About() {
  useEffect(() => {
    document.documentElement.className = 'page-about';
    return () => {
      document.documentElement.className = '';
    };
  }, []);

  const features = [
    {
      icon: Target,
      color: 'var(--color-primary)',
      title: 'Ofertas Tech Reales',
      description:
        'Ofertas actualizadas diariamente del sector tecnológico español',
    },
    {
      icon: MapPin,
      color: 'var(--color-accent)',
      title: 'Búsqueda por Ubicación',
      description: 'Filtra ofertas por ciudad o distancia',
    },
    {
      icon: TrendingUp,
      color: 'var(--color-secondary)',
      title: 'Salarios Transparentes',
      description: 'Rangos salariales claros y visibles',
    },
    {
      icon: Rocket,
      color: 'var(--color-accent)',
      title: 'Ecosistema Tech',
      description: 'Startups y grandes empresas tecnológicas',
    },
  ];

  const timeline = [
    { year: '2026 - 2027', event: 'Máster en IA e Innovación (Founderz)' },
    { year: '2024 - 2026', event: 'Máster de Desarrollo Web (UCAM)' },
    { year: '2024 - 2026', event: 'CFGS Desarrollo de Aplicaciones Web' },
    { year: '2024', event: 'Inicio en desarrollo web' },
    { year: '2022', event: 'Marketing digital y community management' },
    { year: '2002 - 2024', event: '+15 años en entorno profesional' },
  ];

  return (
    <Box minH="100vh">
      {/* HERO */}
      <Box
        bg="var(--bg-card)"
        py={20}
        borderBottom="1px solid"
        borderColor="var(--bg-tertiary)"
      >
        <Container maxW="container.xl">
          <VStack spacing={4} textAlign="center">
            <Heading fontSize={{ base: '4xl', md: '6xl' }} fontWeight="900">
              Sobre{' '}
              <Box as="span" color="var(--color-primary)">
                JobFinder
              </Box>
            </Heading>
            <Text fontSize="lg" color="var(--text-secondary)" maxW="2xl">
              Plataforma de empleo tecnológico enfocada en claridad, datos reales
              y experiencia de usuario
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={16}>
        <VStack spacing={20} align="stretch">
          {/* SOBRE LA CREADORA */}
          <MotionBox>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
              <Image
                src="/images/benita.webp"
                alt="Benita Plata"
                borderRadius="24px"
                maxW="400px"
                mx="auto"
              />

              <VStack align="start" spacing={5}>
                <Heading size="2xl">Benita Plata</Heading>
                <Text color="var(--text-secondary)" fontSize="lg">
                  Desarrolladora web enfocada en crear productos digitales
                  funcionales, claros y con una base técnica sólida.
                </Text>
                <Text color="var(--text-secondary)" fontSize="lg">
                  Actualmente en formación continua en desarrollo web e
                  inteligencia artificial aplicada a producto.
                </Text>

                <HStack spacing={6}>
                  <a
                    href="https://portfolio-benitaplata.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink />
                  </a>
                  <a
                    href="https://github.com/BenitaPlata"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/benita-plata/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Briefcase />
                  </a>
                </HStack>
              </VStack>
            </SimpleGrid>
          </MotionBox>

          {/* TIMELINE */}
          <VStack spacing={8}>
            <Heading size="2xl">Trayectoria</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {timeline.map((item, i) => (
                <Box
                  key={i}
                  bg="var(--bg-card)"
                  p={6}
                  borderRadius="16px"
                  border="1px solid"
                  borderColor="var(--bg-tertiary)"
                >
                  <Text fontWeight="700" color="var(--color-primary)">
                    {item.year}
                  </Text>
                  <Text color="var(--text-secondary)">{item.event}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>

          {/* FEATURES */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {features.map((f, i) => (
              <Box
                key={i}
                bg="var(--bg-card)"
                p={8}
                borderRadius="20px"
                textAlign="center"
              >
                <Box as={f.icon} size={32} mx="auto" mb={4} color={f.color} />
                <Heading size="md">{f.title}</Heading>
                <Text color="var(--text-secondary)">{f.description}</Text>
              </Box>
            ))}
          </SimpleGrid>

          {/* CONTACTO */}
          <Box
            bg="var(--bg-card)"
            p={12}
            borderRadius="24px"
            textAlign="center"
          >
            <Heading size="lg">Contacto</Heading>
            <Text color="var(--text-secondary)" mt={2}>
              Puedes contactarme directamente en:
            </Text>
            <Text
              mt={4}
              fontSize="lg"
              fontWeight="600"
              color="var(--color-primary)"
            >
              📧 itaplata.n@gmail.com
            </Text>
            <Text fontSize="sm" color="var(--text-tertiary)" mt={2}>
              O a través de LinkedIn, GitHub o mi portfolio
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default About;
