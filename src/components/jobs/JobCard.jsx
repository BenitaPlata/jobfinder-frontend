import { Box, Heading, Text, Badge, HStack, VStack, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';

const MotionBox = motion(Box);

function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <MotionBox
      bg="var(--bg-card)"
      p={6}
      borderRadius="16px"
      boxShadow="var(--shadow-sm)"
      border="1px solid"
      borderColor="var(--bg-tertiary)"
      cursor="pointer"
      onClick={() => navigate(`/jobs/${job._id}`)}
      whileHover={{
        y: -4,
        borderColor: 'var(--color-accent)',
        boxShadow: 'var(--glow-accent)',
        transition: { duration: 0.2 },
      }}
      transition="all 0.2s ease"
      _hover={{
        bg: 'var(--bg-tertiary)',
      }}
    >
      <VStack align="stretch" spacing={4}>
        {/* Header: Company + Type */}
        <Flex justify="space-between" align="start">
          <VStack align="start" spacing={1} flex={1}>
            <Text 
              fontSize="sm" 
              fontWeight="600" 
              color="var(--color-accent)"
              textShadow="var(--glow-accent)"
              letterSpacing="0.3px"
            >
              {job.company}
            </Text>
            <Heading 
              size="md" 
              color="var(--text-primary)"
              fontWeight="700"
              lineHeight="1.3"
            >
              {job.title}
            </Heading>
          </VStack>
          
          <Badge
            bg="var(--bg-tertiary)"
            color="var(--color-primary)"
            border="1px solid"
            borderColor="var(--color-primary)"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="xs"
            fontWeight="600"
            textTransform="capitalize"
            boxShadow="var(--glow-primary)"
          >
            {job.contractType}
          </Badge>
        </Flex>

        {/* Location + Modality */}
        <HStack spacing={3} fontSize="sm" color="var(--text-secondary)">
          <HStack spacing={1}>
            <MapPin size={14} />
            <Text fontWeight="500">{job.location?.city || job.location?.province || 'Remoto'}</Text>
          </HStack>
          <Text color="var(--text-tertiary)">•</Text>
          <HStack spacing={1}>
            <Briefcase size={14} />
            <Text fontWeight="500">{job.workModality}</Text>
          </HStack>
        </HStack>

        {/* Salary */}
        {job.salaryMin && (
          <HStack spacing={2}>
            <Text fontSize="lg" fontWeight="700" color="var(--color-secondary)" textShadow="var(--glow-secondary)">
              {job.salaryMin.toLocaleString()}€
            </Text>
            {job.salaryMax && (
              <>
                <Text color="var(--text-tertiary)">-</Text>
                <Text fontSize="lg" fontWeight="700" color="var(--color-secondary)" textShadow="var(--glow-secondary)">
                  {job.salaryMax.toLocaleString()}€
                </Text>
              </>
            )}
          </HStack>
        )}

        {/* Technologies */}
        {job.technologies && job.technologies.length > 0 && (
          <HStack spacing={2} flexWrap="wrap">
            {job.technologies.slice(0, 4).map((tech, index) => (
              <Badge
                key={index}
                bg="var(--bg-secondary)"
                color="var(--text-secondary)"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="500"
                border="1px solid"
                borderColor="var(--bg-tertiary)"
                _hover={{
                  borderColor: 'var(--color-accent)',
                  color: 'var(--color-accent)',
                  textShadow: 'var(--glow-accent)',
                }}
                transition="all 0.2s ease"
              >
                {tech}
              </Badge>
            ))}
            {job.technologies.length > 4 && (
              <Text fontSize="xs" color="var(--text-tertiary)" fontWeight="500">
                +{job.technologies.length - 4} más
              </Text>
            )}
          </HStack>
        )}

        {/* CTA Button */}
        <HStack spacing={2} color="var(--color-accent)" fontWeight="600" fontSize="sm">
          <Text textShadow="var(--glow-accent)">Ver detalles</Text>
          <Box
            as={ArrowRight}
            size={16}
            transition="all 0.2s ease"
            _groupHover={{
              transform: 'translateX(4px)',
            }}
          />
        </HStack>
      </VStack>
    </MotionBox>
  );
}

export default JobCard;