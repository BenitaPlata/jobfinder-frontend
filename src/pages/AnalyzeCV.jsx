import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Input,
  Spinner,
  SimpleGrid,
  Tag,
  Wrap,
  Divider,
} from '@chakra-ui/react';

function AnalyzeCV() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Fondo global coherente con la app
  useEffect(() => {
    document.documentElement.className = 'page-home';
    return () => {
      document.documentElement.className = '';
    };
  }, []);

  const handleSubmit = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const formData = new FormData();
      formData.append('cv', file);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/cv/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error analizando el CV');
      }

      const data = await response.json();
      setResult(data.analysis);
    } catch {
      setError('Error analizando el CV. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" py={20}>
      <Container maxW="container.lg">
        <VStack spacing={14}>
          {/* ===== HERO ===== */}
          <VStack spacing={6} textAlign="center">
            <Heading fontSize={{ base: '3xl', md: '5xl' }} fontWeight="900">
              Analiza tu CV con{' '}
              <Box
                as="span"
                bgGradient="linear(to-r, purple.300, teal.300)"
                bgClip="text"
              >
                IA
              </Box>
            </Heading>

            <Text maxW="700px" color="var(--text-secondary)">
              Nuestra IA analiza tu currículum como lo haría un sistema ATS y un
              reclutador técnico: estructura, contenido, palabras clave y puntos de
              mejora.
            </Text>
          </VStack>

          {/* ===== UPLOAD CARD ===== */}
          <Box
            w="100%"
            bg="rgba(15,15,25,0.75)"
            backdropFilter="blur(12px)"
            borderRadius="20px"
            p={{ base: 6, md: 10 }}
            border="1px solid rgba(180,120,255,0.35)"
            boxShadow="0 0 30px rgba(180,120,255,0.25)"
          >
            <VStack spacing={6}>
              <Input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                bg="rgba(255,255,255,0.08)"
                border="1px solid rgba(255,255,255,0.2)"
              />

              <Button
                w="full"
                size="lg"
                fontWeight="700"
                isDisabled={!file || loading}
                onClick={handleSubmit}
                bgGradient="linear(to-r, purple.300, teal.300)"
                color="black"
              >
                {loading ? <Spinner /> : 'Analizar CV'}
              </Button>

              {error && (
                <Text color="red.400" fontSize="sm">
                  {error}
                </Text>
              )}
            </VStack>
          </Box>

          {/* ===== RESULTADOS ===== */}
          {result && (
            <VStack spacing={12} w="100%">
              {/* SCORE */}
              <Box w="100%" p={6} borderRadius="16px" bg="rgba(0,0,0,0.35)">
                <Heading size="md">Puntuación: {result.score}/100</Heading>
                <Text mt={2}>
                  Compatibilidad ATS:{' '}
                  <Tag colorScheme="purple" ml={2}>
                    {result.atsCompatibility}
                  </Tag>
                </Text>
              </Box>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="100%">
                {/* FORTALEZAS */}
                <Box p={6} borderRadius="16px" bg="rgba(0,0,0,0.35)">
                  <Heading size="md" mb={4}>
                    Fortalezas
                  </Heading>
                  <VStack align="start">
                    {result.strengths?.map((item, i) => (
                      <Text key={i}>✅ {item}</Text>
                    ))}
                  </VStack>
                </Box>

                {/* DEBILIDADES */}
                <Box p={6} borderRadius="16px" bg="rgba(0,0,0,0.35)">
                  <Heading size="md" mb={4}>
                    Debilidades
                  </Heading>
                  <VStack align="start">
                    {(result.weaknesses || result.missing)?.map((item, i) => (
                      <Text key={i}>⚠️ {item}</Text>
                    ))}
                  </VStack>
                </Box>

                {/* PALABRAS DETECTADAS */}
                <Box p={6} borderRadius="16px" bg="rgba(0,0,0,0.35)">
                  <Heading size="md" mb={4}>
                    Skills detectadas
                  </Heading>
                  <Wrap>
                    {result.detectedSkills?.map((skill, i) => (
                      <Tag key={i} colorScheme="green">
                        {skill}
                      </Tag>
                    ))}
                  </Wrap>
                </Box>

                {/* PALABRAS QUE FALTAN */}
                <Box p={6} borderRadius="16px" bg="rgba(0,0,0,0.35)">
                  <Heading size="md" mb={4}>
                    Palabras clave que faltan
                  </Heading>
                  <Wrap>
                    {result.keywordsMissing?.map((kw, i) => (
                      <Tag key={i} colorScheme="red">
                        {kw}
                      </Tag>
                    ))}
                  </Wrap>
                </Box>
              </SimpleGrid>

              {/* RECOMENDACIONES */}
              <Box w="100%" p={6} borderRadius="16px" bg="rgba(0,0,0,0.35)">
                <Heading size="md" mb={4}>
                  Recomendaciones
                </Heading>
                <VStack align="start">
                  {result.recommendations?.map((rec, i) => (
                    <Text key={i}>👉 {rec}</Text>
                  ))}
                </VStack>
              </Box>

              {/* FEEDBACK POR SECCIONES */}
              {result.sectionFeedback && (
                <Box w="100%" p={6} borderRadius="16px" bg="rgba(0,0,0,0.35)">
                  <Heading size="md" mb={4}>
                    Feedback por secciones
                  </Heading>
                  <Divider mb={4} />

                  <VStack align="start" spacing={4}>
                    {Object.entries(result.sectionFeedback).map(([key, value]) => (
                      <Box key={key}>
                        <Text fontWeight="bold" textTransform="capitalize">
                          {key}
                        </Text>
                        <Text opacity={0.85}>{value}</Text>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

export default AnalyzeCV;
