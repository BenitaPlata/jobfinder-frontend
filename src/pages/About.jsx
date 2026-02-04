import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Image,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  MessageSquare,
  Send,
  Briefcase,
  Github,
  MapPin,
  Target,
  TrendingUp,
  Users,
  Rocket,
  ExternalLink
} from 'lucide-react';

const MotionBox = motion(Box);

function About() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    document.documentElement.className = 'page-about';
    return () => {
      document.documentElement.className = '';
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: '✅ Mensaje enviado',
      description: 'Gracias por contactarnos. Te responderemos pronto.',
      status: 'success',
      duration: 5000,
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const features = [
    {
      icon: Target,
      color: 'var(--color-primary)',
      title: 'Ofertas Tech Reales',
      description:
        'Más de 273 ofertas actualizadas diariamente del sector tecnológico español',
    },
    {
      icon: MapPin,
      color: 'var(--color-accent)',
      title: 'Búsqueda por Ubicación',
      description: 'Filtra ofertas por ciudad o distancia desde tu ubicación',
    },
    {
      icon: TrendingUp,
      color: 'var(--color-secondary)',
      title: 'Salarios Transparentes',
      description: 'Información clara sobre rangos salariales en cada oferta',
    },
    {
      icon: Rocket,
      color: 'var(--color-accent)',
      title: 'Startups y Grandes Empresas',
      description: 'Conecta con empresas de todos los tamaños del ecosistema tech',
    },
  ];

  const timeline = [
    { year: '2026 - 2027', event: 'Máster en IA e Innovación (Founderz)' },
    { year: '2024 - 2026', event: 'Máster de Desarrollo Web (UCAM)' },
    { year: '2024 - 2026', event: 'Ciclo Formativo Grado Superior - DAW' },
    { year: '2024', event: 'Inicio en desarrollo web y descubrimiento de mi pasión' },
    { year: '2022', event: 'Community Manager - Marketing digital' },
    { year: '2005 - 2008', event: 'Responsable Vodafone - Gestión de equipos' },
    { year: '2002 - 2024', event: '+15 años en administración y comercial' },
  ];

  return (
    <Box minH="100vh">
      {/* Hero Section */}
      <Box
        bg="var(--bg-card)"
        py={20}
        position="relative"
        overflow="hidden"
        borderBottom="1px solid"
        borderColor="var(--bg-tertiary)"
      >
        <MotionBox
          position="absolute"
          top="-100px"
          right="-100px"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="var(--color-primary)"
          opacity={0.05}
          filter="blur(80px)"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack spacing={4} textAlign="center">
            <Heading
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="900"
              letterSpacing="-0.02em"
              color="var(--text-primary)"
            >
              Sobre{' '}
              <Box
                as="span"
                color="var(--color-primary)"
                textShadow="var(--glow-primary)"
              >
                JobFinder
              </Box>
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              maxW="2xl"
              color="var(--text-secondary)"
            >
              Tu plataforma de búsqueda de empleo tecnológico en España
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={16}>
        <VStack spacing={20} align="stretch">
          {/* Sobre la Creadora */}
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
                  alt="Benita - Desarrolladora Web"
                  borderRadius="24px"
                  boxShadow="var(--shadow-lg), var(--glow-primary)"
                  border="2px solid"
                  borderColor="var(--color-primary)"
                  width="100%"
                  maxW="400px"
                  mx="auto"
                />
              </Box>

              <VStack align="start" spacing={6}>
                <Box>
                  <Text
                    fontSize="sm"
                    fontWeight="700"
                    color="var(--color-accent)"
                    letterSpacing="2px"
                    textTransform="uppercase"
                    textShadow="var(--glow-accent)"
                    mb={2}
                  >
                    Sobre la Creadora
                  </Text>
                  <Heading size="2xl" mb={4} color="var(--text-primary)">
                    Hola, soy Benita 👋
                  </Heading>
                </Box>

                <Text color="var(--text-secondary)" fontSize="lg" lineHeight="1.8">
                  Desarrolladora web junior con energía, creatividad y muchas ganas de
                  crecer en el mundo digital. Diseño atractivo, ideas claras y pasión por
                  dar vida a cada píxel.
                </Text>

                <Text color="var(--text-secondary)" fontSize="lg" lineHeight="1.8">
                  Curiosa por naturaleza, me apasiona enfrentar retos y aprender algo
                  nuevo en cada línea de código. Actualmente estoy formándome en{' '}
                  <Text as="span" color="var(--color-primary)" fontWeight="600">
                    Inteligencia Artificial e Innovación
                  </Text>
                  , para integrar la IA en el desarrollo web y crear soluciones digitales
                  más eficientes y creativas.
                </Text>

                <Text color="var(--text-secondary)" fontSize="lg" lineHeight="1.8">
                  Me considero una persona social y perseverante, disfruto trabajando en
                  equipo para combinar ideas y lograr resultados de calidad. Mi objetivo
                  es seguir creciendo, aprender cada día y crear productos digitales que
                  realmente mejoren la vida de las personas.
                </Text>

                <HStack spacing={6} pt={4}>
                  <VStack spacing={1}>
                    <MotionBox
                      as="a"
                      href="https://portfolio-benitaplata.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Portfolio"
                      whileHover={{
                        scale: 1.3,
                        rotate: 10,
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Box
                        as={ExternalLink}
                        size={24}
                        color="var(--text-secondary)"
                        cursor="pointer"
                        _hover={{
                          color: 'var(--color-accent)',
                          filter: 'drop-shadow(0 0 10px var(--color-accent))',
                        }}
                        transition="all 0.2s ease"
                      />
                    </MotionBox>
                    <Text fontSize="xs" color="var(--text-tertiary)">
                      Portfolio
                    </Text>
                  </VStack>

                  <VStack spacing={1}>
                    <MotionBox
                      as="a"
                      href="https://github.com/BenitaPlata"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      whileHover={{
                        scale: 1.3,
                        rotate: -10,
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Box
                        as={Github}
                        size={24}
                        color="var(--text-secondary)"
                        cursor="pointer"
                        _hover={{
                          color: 'var(--color-accent)',
                          filter: 'drop-shadow(0 0 10px var(--color-accent))',
                        }}
                        transition="all 0.2s ease"
                      />
                    </MotionBox>
                    <Text fontSize="xs" color="var(--text-tertiary)">
                      GitHub
                    </Text>
                  </VStack>

                  <VStack spacing={1}>
                    <MotionBox
                      as="a"
                      href="https://www.linkedin.com/in/benita-plata/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      whileHover={{
                        scale: 1.3,
                        rotate: 10,
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Box
                        as={Briefcase}
                        size={24}
                        color="var(--text-secondary)"
                        cursor="pointer"
                        _hover={{
                          color: 'var(--color-accent)',
                          filter: 'drop-shadow(0 0 10px var(--color-accent))',
                        }}
                        transition="all 0.2s ease"
                      />
                    </MotionBox>
                    <Text fontSize="xs" color="var(--text-tertiary)">
                      LinkedIn
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </SimpleGrid>
          </MotionBox>

          {/* Mi Camino */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <VStack spacing={8} align="stretch">
              <VStack align="center" spacing={3}>
                <Text
                  fontSize="sm"
                  fontWeight="700"
                  color="var(--color-accent)"
                  letterSpacing="2px"
                  textTransform="uppercase"
                  textShadow="var(--glow-accent)"
                >
                  Mi Trayectoria
                </Text>
                <Heading size="2xl" color="var(--text-primary)">
                  Mi Camino 🚀
                </Heading>
              </VStack>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {timeline.map((item, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Box
                      bg="var(--bg-card)"
                      p={6}
                      borderRadius="16px"
                      border="1px solid"
                      borderColor="var(--bg-tertiary)"
                      boxShadow="var(--shadow-sm)"
                      _hover={{
                        borderColor: 'var(--color-accent)',
                        transform: 'translateY(-4px)',
                        boxShadow: 'var(--glow-accent)',
                      }}
                      transition="all 0.3s ease"
                    >
                      <Text
                        fontSize="sm"
                        fontWeight="700"
                        color="var(--color-primary)"
                        textShadow="var(--glow-primary)"
                        mb={2}
                      >
                        {item.year}
                      </Text>
                      <Text color="var(--text-secondary)" lineHeight="1.6">
                        {item.event}
                      </Text>
                    </Box>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </VStack>
          </MotionBox>

          {/* Características de JobFinder */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <VStack spacing={12} align="stretch">
              <VStack align="center" spacing={3}>
                <Text
                  fontSize="sm"
                  fontWeight="700"
                  color="var(--color-primary)"
                  letterSpacing="2px"
                  textTransform="uppercase"
                  textShadow="var(--glow-primary)"
                >
                  El Proyecto
                </Text>
                <Heading size="2xl" color="var(--text-primary)">
                  ¿Qué hace especial a JobFinder?
                </Heading>
                <Text
                  fontSize="lg"
                  color="var(--text-secondary)"
                  maxW="2xl"
                  textAlign="center"
                >
                  Una plataforma creada con tecnologías modernas para conectar talento
                  tech con oportunidades reales en España
                </Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
                {features.map((feature, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Box
                      bg="var(--bg-card)"
                      p={8}
                      borderRadius="20px"
                      textAlign="center"
                      border="1px solid"
                      borderColor="var(--bg-tertiary)"
                      boxShadow="var(--shadow-sm)"
                      _hover={{
                        transform: 'translateY(-8px)',
                        borderColor: feature.color,
                        boxShadow: `0 0 30px ${feature.color}40`,
                      }}
                      transition="all 0.3s ease"
                      height="100%"
                    >
                      <Box
                        as={feature.icon}
                        size={32}
                        mx="auto"
                        mb={4}
                        color={feature.color}
                        style={{ filter: `drop-shadow(0 0 8px ${feature.color})` }}
                      />
                      <Heading size="md" mb={3} color="var(--text-primary)">
                        {feature.title}
                      </Heading>
                      <Text color="var(--text-secondary)" lineHeight="1.6">
                        {feature.description}
                      </Text>
                    </Box>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </VStack>
          </MotionBox>

          {/* Formulario de Contacto */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box
              bg="var(--bg-card)"
              p={{ base: 8, md: 12 }}
              borderRadius="24px"
              boxShadow="var(--shadow-lg)"
              border="1px solid"
              borderColor="var(--bg-tertiary)"
              maxW="container.md"
              mx="auto"
            >
              <VStack spacing={8} align="stretch">
                <VStack align="center" spacing={3}>
                  <Text
                    fontSize="sm"
                    fontWeight="700"
                    color="var(--color-secondary)"
                    letterSpacing="2px"
                    textTransform="uppercase"
                    textShadow="var(--glow-secondary)"
                  >
                    Hablemos
                  </Text>
                  <Heading size="2xl" color="var(--text-primary)">
                    Contacto 📬
                  </Heading>
                  <Text fontSize="lg" color="var(--text-secondary)" textAlign="center">
                    ¿Tienes alguna pregunta o sugerencia? Escríbeme
                  </Text>
                </VStack>

                <form onSubmit={handleSubmit}>
                  <VStack spacing={6}>
                    <FormControl isRequired>
                      <FormLabel color="var(--text-secondary)" fontWeight="600">
                        Nombre
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <User size={18} color="var(--text-tertiary)" />
                        </InputLeftElement>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Tu nombre"
                          size="lg"
                          bg="var(--bg-secondary)"
                          border="1px solid"
                          borderColor="var(--bg-tertiary)"
                          color="var(--text-primary)"
                          borderRadius="12px"
                          _placeholder={{ color: 'var(--text-tertiary)' }}
                          _hover={{ borderColor: 'var(--color-primary)' }}
                          _focus={{
                            borderColor: 'var(--color-accent)',
                            boxShadow: 'var(--glow-accent)',
                          }}
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel color="var(--text-secondary)" fontWeight="600">
                        Email
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Mail size={18} color="var(--text-tertiary)" />
                        </InputLeftElement>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="tu@email.com"
                          size="lg"
                          bg="var(--bg-secondary)"
                          border="1px solid"
                          borderColor="var(--bg-tertiary)"
                          color="var(--text-primary)"
                          borderRadius="12px"
                          _placeholder={{ color: 'var(--text-tertiary)' }}
                          _hover={{ borderColor: 'var(--color-primary)' }}
                          _focus={{
                            borderColor: 'var(--color-accent)',
                            boxShadow: 'var(--glow-accent)',
                          }}
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel color="var(--text-secondary)" fontWeight="600">
                        Mensaje
                      </FormLabel>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Escribe tu mensaje aquí..."
                        rows={6}
                        bg="var(--bg-secondary)"
                        border="1px solid"
                        borderColor="var(--bg-tertiary)"
                        color="var(--text-primary)"
                        borderRadius="12px"
                        _placeholder={{ color: 'var(--text-tertiary)' }}
                        _hover={{ borderColor: 'var(--color-primary)' }}
                        _focus={{
                          borderColor: 'var(--color-accent)',
                          boxShadow: 'var(--glow-accent)',
                        }}
                      />
                    </FormControl>

                    <Button
                      type="submit"
                      bg="var(--color-primary)"
                      color="var(--bg-primary)"
                      size="lg"
                      width="full"
                      borderRadius="12px"
                      fontWeight="600"
                      boxShadow="var(--glow-primary)"
                      leftIcon={<Send size={20} />}
                      _hover={{
                        bg: 'var(--color-accent)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 0 30px rgba(127, 255, 212, 0.6)',
                      }}
                      transition="all 0.2s ease"
                    >
                      Enviar mensaje
                    </Button>
                  </VStack>
                </form>
              </VStack>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}

export default About;
