import { Box, Container, HStack, VStack, Text, Link, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { Briefcase, Github, Linkedin, Globe, Sparkles } from 'lucide-react';

const MotionBox = motion(Box);
const MotionIcon = motion(Icon);

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Globe,
      label: 'Portfolio',
      href: 'https://portfolio-benitaplata.vercel.app', 
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/BenitaPlata',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/benita-plata/',
    },
  ];

  return (
    <MotionBox
      as="footer"
      bg="var(--bg-card)"
      borderTop="1px solid"
      borderColor="var(--bg-tertiary)"
      color="var(--text-secondary)"
      py={12}
      mt={20}
      position="relative"
      overflow="hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Círculos animados de fondo neón */}
      <MotionBox
        position="absolute"
        top="-50px"
        right="-50px"
        width="200px"
        height="200px"
        borderRadius="full"
        bg="var(--color-primary)"
        opacity={0.03}
        filter="blur(60px)"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <MotionBox
        position="absolute"
        bottom="-30px"
        left="-30px"
        width="150px"
        height="150px"
        borderRadius="full"
        bg="var(--color-accent)"
        opacity={0.03}
        filter="blur(50px)"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={8}>
          {/* Logo y descripción */}
          <VStack spacing={3}>
            <HStack spacing={2}>
              <Icon
                as={Sparkles}
                boxSize={8}
                color="var(--color-primary)"
                filter="drop-shadow(0 0 8px var(--color-primary))"
              />
              <Text
                fontSize="3xl"
                fontWeight="900"
                letterSpacing="tight"
                color="var(--color-primary)"
                textShadow="var(--glow-primary)"
              >
                JobFinder
              </Text>
            </HStack>
            <Text fontSize="md" color="var(--text-tertiary)" maxW="md" textAlign="center">
              Tu plataforma de búsqueda de empleo tech en España
            </Text>
          </VStack>

          {/* Enlaces */}
          <HStack spacing={8} flexWrap="wrap" justify="center">
            <Link
              as={RouterLink}
              to="/"
              fontSize="sm"
              fontWeight="600"
              color="var(--text-secondary)"
              _hover={{
                color: 'var(--color-accent)',
                textShadow: 'var(--glow-accent)',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s ease"
            >
              Ofertas
            </Link>
            <Link
              as={RouterLink}
              to="/my-applications"
              fontSize="sm"
              fontWeight="600"
              color="var(--text-secondary)"
              _hover={{
                color: 'var(--color-accent)',
                textShadow: 'var(--glow-accent)',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s ease"
            >
              Mis Candidaturas
            </Link>
            <Link
              as={RouterLink}
              to="/profile"
              fontSize="sm"
              fontWeight="600"
              color="var(--text-secondary)"
              _hover={{
                color: 'var(--color-accent)',
                textShadow: 'var(--glow-accent)',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s ease"
            >
              Mi Perfil
            </Link>
            <Link
              as={RouterLink}
              to="/about"
              fontSize="sm"
              fontWeight="600"
              color="var(--text-secondary)"
              _hover={{
                color: 'var(--color-accent)',
                textShadow: 'var(--glow-accent)',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s ease"
            >
              Sobre mí
            </Link>
          </HStack>

          {/* Redes sociales con iconos modernos */}
          <HStack spacing={6}>
            {socialLinks.map((social, i) => (
              <VStack key={i} spacing={1}>
                <MotionBox
                  as="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{
                    scale: 1.3,
                    rotate: 10,
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <MotionIcon
                    as={social.icon}
                    boxSize={6}
                    color="var(--text-secondary)"
                    _hover={{
                      color: 'var(--color-accent)',
                      filter: 'drop-shadow(0 0 10px var(--color-accent))',
                    }}
                    transition="all 0.2s ease"
                  />
                </MotionBox>

                {/* 👇 TEXTO debajo del icono */}
                <Text fontSize="xs" color="var(--text-tertiary)">
                  {social.label}
                </Text>
              </VStack>
            ))}
          </HStack>

          {/* Separador neón */}
          <Box
            width="60%"
            height="1px"
            bg="var(--bg-tertiary)"
            boxShadow="0 0 10px var(--color-primary)"
          />

          {/* Copyright */}
          <VStack spacing={2}>
            <Text fontSize="sm" color="var(--text-tertiary)" textAlign="center">
              © {currentYear} JobFinder. Hecho con 💜 en España
            </Text>
            <Text fontSize="xs" color="var(--text-tertiary)" textAlign="center">
              Creado por{' '}
              <Text as="span" color="var(--color-accent)" fontWeight="600">
                Ita Plata
              </Text>{' '}
              • Desarrolladora Web
            </Text>
          </VStack>
        </VStack>
      </Container>
    </MotionBox>
  );
}

export default Footer;
