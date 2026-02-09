import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Input,
  VStack,
  Text,
  Spinner,
  useOutsideClick,
} from '@chakra-ui/react';
import { MapPin } from 'lucide-react';

function LocationAutocomplete({ 
  value, 
  onChange, 
  placeholder = "Escribe una ciudad...",
  returnCoordinates = false 
}) {
  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useOutsideClick({
    ref: wrapperRef,
    handler: () => setShowSuggestions(false),
  });

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
          `q=${encodeURIComponent(query)}&` +
          `countrycodes=es&` +
          `format=json&` +
          `limit=5&` +
          `addressdetails=1`
        );
        const data = await response.json();
        
        setSuggestions(data.map(item => ({
          name: item.display_name.split(',')[0],
          fullName: item.display_name,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
        })));
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error buscando ubicación:', error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (suggestion) => {
    setQuery(suggestion.name);
    
    if (returnCoordinates) {
      onChange(suggestion.name, suggestion.lat, suggestion.lng);
    } else {
      onChange(suggestion.name);
    }
    
    setShowSuggestions(false);
    setSuggestions([]);
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

  return (
    <Box position="relative" ref={wrapperRef}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        {...inputStyles}
      />

      {loading && (
        <Box position="absolute" right={3} top="50%" transform="translateY(-50%)">
          <Spinner size="sm" color="var(--color-accent)" />
        </Box>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <VStack
          position="absolute"
          top="100%"
          left={0}
          right={0}
          mt={2}
          bg="var(--bg-card)"
          border="1px solid"
          borderColor="var(--bg-tertiary)"
          borderRadius="12px"
          boxShadow="var(--shadow-lg)"
          zIndex={10}
          maxH="300px"
          overflowY="auto"
          spacing={0}
        >
          {suggestions.map((suggestion, index) => (
            <Box
              key={index}
              w="100%"
              p={3}
              cursor="pointer"
              transition="all 0.2s"
              _hover={{
                bg: 'var(--bg-tertiary)',
                borderLeft: '3px solid var(--color-accent)',
              }}
              onClick={() => handleSelect(suggestion)}
              borderBottom={index < suggestions.length - 1 ? '1px solid' : 'none'}
              borderBottomColor="var(--bg-tertiary)"
            >
              <Text
                fontSize="sm"
                fontWeight="600"
                color="var(--text-primary)"
                display="flex"
                alignItems="center"
                gap={2}
              >
                <MapPin size={16} color="var(--color-accent)" />
                {suggestion.name}
              </Text>
              <Text fontSize="xs" color="var(--text-tertiary)" mt={1}>
                {suggestion.fullName}
              </Text>
            </Box>
          ))}
        </VStack>
      )}

      {showSuggestions && suggestions.length === 0 && !loading && query.length >= 3 && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          mt={2}
          p={4}
          bg="var(--bg-card)"
          border="1px solid"
          borderColor="var(--bg-tertiary)"
          borderRadius="12px"
          boxShadow="var(--shadow-lg)"
          zIndex={10}
        >
          <Text fontSize="sm" color="var(--text-tertiary)" textAlign="center">
            No se encontraron resultados
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default LocationAutocomplete;