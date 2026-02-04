import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Input,
  Select,
  Button,
  FormControl,
  FormLabel,
  Text,
  Checkbox,
} from '@chakra-ui/react';
import { MapPin } from 'lucide-react';

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

  const cityCoordinates = {
    'A Coruña': { lat: 43.3623, lng: -8.4115 },
    'Álava': { lat: 42.8467, lng: -2.6716 },
    'Albacete': { lat: 38.9943, lng: -1.8585 },
    'Alicante': { lat: 38.3452, lng: -0.481 },
    'Almería': { lat: 36.8381, lng: -2.4597 },
    'Asturias': { lat: 43.3614, lng: -5.8593 },
    'Ávila': { lat: 40.6566, lng: -4.6812 },
    'Badajoz': { lat: 38.8794, lng: -6.9707 },
    'Barcelona': { lat: 41.3851, lng: 2.1734 },
    'Burgos': { lat: 42.3439, lng: -3.6969 },
    'Cáceres': { lat: 39.4753, lng: -6.3724 },
    'Cádiz': { lat: 36.5271, lng: -6.2886 },
    'Cantabria': { lat: 43.4623, lng: -3.8099 },
    'Castellón': { lat: 39.9864, lng: -0.0513 },
    'Ceuta': { lat: 35.8894, lng: -5.3213 },
    'Ciudad Real': { lat: 38.9848, lng: -3.9273 },
    'Córdoba': { lat: 37.8882, lng: -4.7794 },
    'Cuenca': { lat: 40.0704, lng: -2.1374 },
    'Girona': { lat: 41.9794, lng: 2.8214 },
    'Granada': { lat: 37.1773, lng: -3.5986 },
    'Guadalajara': { lat: 40.6318, lng: -3.1662 },
    'Guipúzcoa': { lat: 43.3183, lng: -1.9812 },
    'Huelva': { lat: 37.2614, lng: -6.9447 },
    'Huesca': { lat: 42.1401, lng: -0.4079 },
    'Islas Baleares': { lat: 39.5696, lng: 2.6502 },
    'Jaén': { lat: 37.7796, lng: -3.7849 },
    'La Rioja': { lat: 42.4627, lng: -2.4449 },
    'Las Palmas': { lat: 28.1248, lng: -15.43 },
    'León': { lat: 42.5987, lng: -5.567 },
    'Lleida': { lat: 41.6175, lng: 0.6201 },
    'Lugo': { lat: 43.0097, lng: -7.5567 },
    'Madrid': { lat: 40.4168, lng: -3.7038 },
    'Málaga': { lat: 36.7213, lng: -4.4214 },
    'Melilla': { lat: 35.2923, lng: -2.9381 },
    'Murcia': { lat: 37.9922, lng: -1.1307 },
    'Navarra': { lat: 42.8125, lng: -1.6458 },
    'Ourense': { lat: 42.3406, lng: -7.8632 },
    'Palencia': { lat: 42.0095, lng: -4.5288 },
    'Pontevedra': { lat: 42.43, lng: -8.6446 },
    'Salamanca': { lat: 40.9701, lng: -5.6635 },
    'Segovia': { lat: 40.9429, lng: -4.1088 },
    'Sevilla': { lat: 37.3891, lng: -5.9845 },
    'Soria': { lat: 41.7665, lng: -2.479 },
    'Tarragona': { lat: 41.1189, lng: 1.2445 },
    'Santa Cruz de Tenerife': { lat: 28.4636, lng: -16.2518 },
    'Teruel': { lat: 40.3456, lng: -1.1065 },
    'Toledo': { lat: 39.8628, lng: -4.0273 },
    'Valencia': { lat: 39.4699, lng: -0.3763 },
    'Valladolid': { lat: 41.6523, lng: -4.7245 },
    'Vizcaya': { lat: 43.263, lng: -2.935 },
    'Zamora': { lat: 41.5034, lng: -5.7467 },
    'Zaragoza': { lat: 41.6488, lng: -0.8891 },
  };

  const handleChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
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
          <Input
            value={filters.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="Madrid, Barcelona..."
            {...inputStyles}
          />
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
                o selecciona tu ciudad:
              </Text>

              <FormControl>
                <FormLabel color="var(--text-secondary)" fontWeight="600">
                  Mi ciudad
                </FormLabel>
                <Select
                  placeholder="Selecciona tu ciudad"
                  {...selectStyles}
                  onChange={(e) => {
                    const city = e.target.value;
                    if (city && cityCoordinates[city]) {
                      handleChange('userLat', cityCoordinates[city].lat);
                      handleChange('userLng', cityCoordinates[city].lng);
                    }
                  }}
                >
                  {Object.keys(cityCoordinates).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </Select>
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