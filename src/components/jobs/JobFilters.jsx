import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Select,
  Button,
  FormControl,
  FormLabel,
  Text,
  Checkbox,
  Input,
} from '@chakra-ui/react';
import { MapPin } from 'lucide-react';
import LocationAutocomplete from './LocationAutocomplete';

function JobFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    city: '',
    contractType: '',
    minSalary: '',
    workModality: '',
    technologies: '',
    companyType: '',
    englishLevel: '',
    showSalary: false,
    maxDistance: '',
    userLat: '',
    userLng: '',
    useDistance: false,
  });

  const handleChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handleLocationSelect = (cityName, lat, lng) => {
    handleChange('userLat', lat);
    handleChange('userLng', lng);
  };

  const handleApplyFilters = () => {
    const cleanFilters = {};

    Object.keys(filters).forEach((key) => {
      if (
        key !== 'useDistance' &&
        key !== 'userLat' &&
        key !== 'userLng' &&
        key !== 'maxDistance' &&
        filters[key] !== '' &&
        filters[key] !== false
      ) {
        cleanFilters[key] = filters[key];
      }
    });

    if (filters.useDistance) {
      if (filters.userLat && filters.userLng && filters.maxDistance) {
        cleanFilters.userLat = Number(filters.userLat);
        cleanFilters.userLng = Number(filters.userLng);
        cleanFilters.maxDistance = Number(filters.maxDistance);
      } else {
        alert('Por favor, selecciona tu ubicación y el radio de búsqueda');
        return;
      }
    }

    console.log('🔍 Filtros enviados:', cleanFilters);
    onFilterChange(cleanFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      city: '',
      contractType: '',
      minSalary: '',
      workModality: '',
      technologies: '',
      companyType: '',
      englishLevel: '',
      showSalary: false,
      maxDistance: '',
      userLat: '',
      userLng: '',
      useDistance: false,
    });
    onFilterChange({});
  };

  const inputStyles = {
    bg: 'var(--bg-secondary)',
    border: '1px solid',
    borderColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    borderRadius: '12px',
    _placeholder: { color: 'var(--text-tertiary)' },
    _hover: { borderColor: 'var(--color-primary)' },
    _focus: {
      borderColor: 'var(--color-accent)',
      boxShadow: 'var(--glow-accent)',
      bg: 'var(--bg-tertiary)',
    },
  };

  const selectStyles = {
    ...inputStyles,
    option: {
      bg: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
    },
  };

  return (
    <Box
      bg="var(--bg-card)"
      p={6}
      borderRadius="16px"
      boxShadow="var(--shadow-md)"
      border="1px solid"
      borderColor="var(--bg-tertiary)"
    >
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl" fontWeight="700" color="var(--text-primary)">
          Filtros de Búsqueda
        </Text>

        <FormControl>
          <FormLabel color="var(--text-secondary)" fontWeight="600">
            Ciudad
          </FormLabel>
          <LocationAutocomplete
            value={filters.city}
            onChange={(value) => handleChange('city', value)}
            placeholder="Escribe cualquier ciudad o pueblo de España..."
          />
          <Text fontSize="xs" color="var(--text-tertiary)" mt={1}>
            Escribe al menos 3 letras para ver sugerencias
          </Text>
        </FormControl>

        <HStack spacing={4}>
          <FormControl>
            <FormLabel color="var(--text-secondary)" fontWeight="600">
              Tipo de Contrato
            </FormLabel>
            <Select
              value={filters.contractType}
              onChange={(e) => handleChange('contractType', e.target.value)}
              placeholder="Todos"
              {...selectStyles}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Prácticas</option>
              <option value="Indefinido">Indefinido</option>
              <option value="Temporal">Temporal</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel color="var(--text-secondary)" fontWeight="600">
              Salario Mínimo (€/año)
            </FormLabel>
            <Input
              type="number"
              value={filters.minSalary}
              onChange={(e) => handleChange('minSalary', e.target.value)}
              placeholder="25000"
              {...inputStyles}
            />
          </FormControl>
        </HStack>

        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel color="var(--text-secondary)" fontWeight="600">
              Modalidad de trabajo
            </FormLabel>
            <Select
              value={filters.workModality}
              onChange={(e) => handleChange('workModality', e.target.value)}
              placeholder="Todas"
              {...selectStyles}
            >
              <option value="Remote">Remoto</option>
              <option value="Hybrid">Híbrido</option>
              <option value="On-site">Presencial</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel color="var(--text-secondary)" fontWeight="600">
              Tecnologías (separadas por coma)
            </FormLabel>
            <Input
              value={filters.technologies}
              onChange={(e) => handleChange('technologies', e.target.value)}
              placeholder="React, Node.js, Python..."
              {...inputStyles}
            />
            <Text fontSize="xs" color="var(--text-tertiary)" mt={1}>
              Ejemplo: React, Node.js, MongoDB
            </Text>
          </FormControl>

          <FormControl>
            <FormLabel color="var(--text-secondary)" fontWeight="600">
              Tipo de empresa
            </FormLabel>
            <Select
              value={filters.companyType}
              onChange={(e) => handleChange('companyType', e.target.value)}
              placeholder="Todas"
              {...selectStyles}
            >
              <option value="Startup">Startup</option>
              <option value="Scaleup">Scaleup</option>
              <option value="Grande">Gran empresa</option>
              <option value="Consultora">Consultoría</option>
              <option value="Producto">Producto propio</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel color="var(--text-secondary)" fontWeight="600">
              Nivel de inglés
            </FormLabel>
            <Select
              value={filters.englishLevel}
              onChange={(e) => handleChange('englishLevel', e.target.value)}
              placeholder="Todos"
              {...selectStyles}
            >
              <option value="none">No requerido</option>
              <option value="basic">Básico (A2-B1)</option>
              <option value="intermediate">Intermedio (B2)</option>
              <option value="advanced">Avanzado (C1-C2)</option>
              <option value="native">Nativo</option>
            </Select>
          </FormControl>

          <Checkbox
            isChecked={filters.showSalary}
            onChange={(e) => handleChange('showSalary', e.target.checked)}
            colorScheme="purple"
          >
            <Text color="var(--text-secondary)">Solo ofertas con salario visible</Text>
          </Checkbox>
        </VStack>

        <Box borderTop="1px" borderColor="var(--bg-tertiary)" pt={4}>
          <Checkbox
            isChecked={filters.useDistance}
            onChange={(e) => handleChange('useDistance', e.target.checked)}
            mb={3}
            colorScheme="purple"
          >
            <Text fontWeight="600" color="var(--text-primary)">
              Filtrar por distancia desde mi ubicación
            </Text>
          </Checkbox>

          {filters.useDistance && (
            <VStack spacing={4} align="stretch">
              <Button
                bg="var(--bg-tertiary)"
                color="var(--color-accent)"
                border="1px solid"
                borderColor="var(--color-accent)"
                boxShadow="var(--glow-accent)"
                leftIcon={<MapPin size={18} />}
                _hover={{
                  bg: 'var(--color-accent)',
                  color: 'var(--bg-primary)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 30px rgba(127, 255, 212, 0.6)',
                }}
                transition="all 0.2s ease"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        handleChange('userLat', position.coords.latitude);
                        handleChange('userLng', position.coords.longitude);
                      },
                      () => {
                        alert(
                          'No se pudo obtener tu ubicación. Selecciona tu ciudad manualmente.'
                        );
                      }
                    );
                  } else {
                    alert('Tu navegador no soporta geolocalización.');
                  }
                }}
              >
                Usar mi ubicación actual
              </Button>

              <Text fontSize="sm" color="var(--text-tertiary)" textAlign="center">
                o busca tu ciudad:
              </Text>

              <FormControl>
                <FormLabel color="var(--text-secondary)" fontWeight="600">
                  Mi ciudad
                </FormLabel>
                <LocationAutocomplete
                  value=""
                  onChange={handleLocationSelect}
                  placeholder="Escribe tu ciudad..."
                  returnCoordinates={true}
                />
              </FormControl>

              {filters.userLat && filters.userLng && (
                <Text fontSize="sm" color="var(--color-accent)">
                  ✅ Ubicación establecida: {Number(filters.userLat).toFixed(4)},{' '}
                  {Number(filters.userLng).toFixed(4)}
                </Text>
              )}

              <FormControl>
                <FormLabel color="var(--text-secondary)" fontWeight="600">
                  Radio de búsqueda
                </FormLabel>
                <Select
                  value={filters.maxDistance}
                  onChange={(e) => handleChange('maxDistance', e.target.value)}
                  placeholder="¿A qué distancia buscas?"
                  {...selectStyles}
                >
                  <option value="10">10 km</option>
                  <option value="25">25 km</option>
                  <option value="50">50 km</option>
                  <option value="100">100 km</option>
                  <option value="200">200 km</option>
                  <option value="500">500 km (toda España)</option>
                </Select>
              </FormControl>

              <Text fontSize="sm" color="var(--text-tertiary)">
                📍 Las ofertas remotas siempre aparecerán
              </Text>
            </VStack>
          )}
        </Box>

        <HStack spacing={4}>
          <Button
            bg="var(--color-primary)"
            color="var(--bg-primary)"
            flex={1}
            borderRadius="12px"
            fontWeight="600"
            boxShadow="var(--glow-primary)"
            _hover={{
              bg: 'var(--color-accent)',
              transform: 'translateY(-2px)',
              boxShadow: '0 0 30px rgba(127, 255, 212, 0.6)',
            }}
            transition="all 0.2s ease"
            onClick={handleApplyFilters}
          >
            Aplicar Filtros
          </Button>
          <Button
            bg="var(--bg-tertiary)"
            color="var(--text-secondary)"
            border="1px solid"
            borderColor="var(--bg-tertiary)"
            flex={1}
            borderRadius="12px"
            fontWeight="600"
            _hover={{
              borderColor: 'var(--color-error)',
              color: 'var(--color-error)',
            }}
            transition="all 0.2s ease"
            onClick={handleClearFilters}
          >
            Limpiar
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

export default JobFilters;