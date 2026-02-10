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
  ExternalLink,
  TrendingUp,
} from 'lucide-react';

const MotionBox = motion(Box);

function About() {
  useEffect(() => {
    document.documentElement.className = 'page-about';
    return () => {
      document.documentElement.className = '';
    };
  }, []);

  const journey = [
    {
      period: '2002 – 2024',
      title: 'Gestión, administración y marketing',
      description:
        'Más de 15 años de experiencia profesional desarrollando habilidades clave como comunicación, organización, trabajo en equipo y orientación a resultados.',
    },
    {
      period: '2024',
      title: 'Transición al desarrollo web',
      description:
        'Inicio del camino en el desarrollo web, descubriendo una vocación clara por la tecnología, la creación de productos digitales y el interés temprano por la automatización y la inteligencia artificial.',
    },
    {
      period: '2024 – Actualidad',
      title: 'Formación técnica especializada',
      description:
        'Grado Superior en Desarrollo de Aplicaciones Web y formación continua en desarrollo web moderno e inteligencia artificial aplicada a producto.',
    },
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
            <Heading
              fontSize={{ base: '4xl', md: '5xl' }}
              fontWeight="900"
              color="var(--text-primary)"
            >
              Sobre{' '}
              <Box as="span" color="var(--color-primary)">
                JobFinder
              </Box>
            </Heading>
            <Text
              fontSize="lg"
              maxW="2xl"
              color="var(--text-secondary)"
            >
              Proyecto de búsqueda de empleo tecnológico enfocado en claridad,
              datos reales y experiencia de usuario.
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={16}>
        <VStack spacing={20} align="stretch">

          {/* PERFIL */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} alignItems="center">
              <Box>
                <Image
                  src="/images/benita.webp"
                  alt="Benita Plata"
                  borderRadius="24px"
                  boxShadow="var(--shadow-lg)"
                  maxW="420px"
                  mx="auto"
                />
              </Box>

              <VStack align="start" spacing={6}>
                <Heading size="2xl">Benita Plata</Heading>

                <Text fontSize="lg" color="var(--text-secondary)" lineHeight="1.8">
                  Desarrolladora web enfocada en crear productos digitales claros,
                  funcionales y con una base técnica sólida.
                </Text>

                <Text fontSize="lg" color="var(--text-secondary)" lineHeight="1.8">
                  Actualmente en formación continua en desarrollo web e inteligencia
                  artificial aplicada a producto, con especial interés en frontend,
                  experiencia de usuario y aplicaciones reales.
                </Text>

                <HStack spacing={6} pt={4}>
                  <HStack
                    as="a"
                    href="https://portfolio-benitaplata.vercel.app/"
                    target="_blank"
                  >
                    <ExternalLink />
                    <Text>Portfolio</Text>
                  </HStack>

                  <HStack
                    as="a"
                    href="https://github.com/BenitaPlata"
                    target="_blank"
                  >
                    <Github />
                    <Text>GitHub</Text>
                  </HStack>

                  <HStack
                    as="a"
                    href="https://www.linkedin.com/in/benita-plata/"
                    target="_blank"
                  >
                    <Briefcase />
                    <Text>LinkedIn</Text>
                  </HStack>
                </HStack>
              </VStack>
            </SimpleGrid>
          </MotionBox>

          {/* EVOLUCIÓN PROFESIONAL */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <VStack spacing={10}>
              <VStack spacing={2} textAlign="center">
                <TrendingUp size={32} />
                <Heading size="xl">Evolución profesional</Heading>
                <Text color="var(--text-secondary)" maxW="2xl">
                  Un recorrido progresivo hacia el desarrollo web y la creación
                  de productos digitales.
                </Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                {journey.map((item, index) => (
                  <Box
                    key={index}
                    bg="var(--bg-card)"
                    p={6}
                    borderRadius="16px"
                    border="1px solid"
                    borderColor="var(--bg-tertiary)"
                    boxShadow="var(--shadow-sm)"
                  >
                    <Text
                      fontSize="sm"
                      fontWeight="700"
                      color="var(--color-primary)"
                      mb={2}
                    >
                      {item.period}
                    </Text>
                    <Heading size="md" mb={2}>
                      {item.title}
                    </Heading>
                    <Text color="var(--text-secondary)">
                      {item.description}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>
          </MotionBox>

          {/* CONTACTO */}
          <Box
            bg="var(--bg-card)"
            p={12}
            borderRadius="24px"
            border="1px solid"
            borderColor="var(--bg-tertiary)"
            textAlign="center"
          >
            <VStack spacing={4}>
              <Heading size="lg">Contacto</Heading>
              <Text color="var(--text-secondary)">
                Puedes contactar conmigo directamente en:
              </Text>

              <Text
                fontSize="lg"
                fontWeight="600"
                color="var(--color-primary)"
              >
                📧 itaplata.n@gmail.com
              </Text>

              <Text fontSize="sm" color="var(--text-tertiary)">
                O a través de LinkedIn, GitHub o mi portfolio.
              </Text>
            </VStack>
          </Box>

        </VStack>
      </Container>
    </Box>
  );
}

export default About;
