import { Box, VStack, Skeleton, SkeletonText } from '@chakra-ui/react';

function SkeletonCard() {
  return (
    <Box
      bg="var(--bg-card)"
      p={6}
      borderRadius="var(--radius-lg)"
      boxShadow="var(--shadow-sm)"
      border="1px solid"
      borderColor="var(--color-secondary-light)"
    >
      <VStack align="stretch" spacing={4}>
        <Skeleton height="24px" borderRadius="var(--radius-sm)" />
        <Skeleton height="16px" width="60%" borderRadius="var(--radius-sm)" />
        
        <Skeleton height="20px" width="40%" borderRadius="var(--radius-md)" />
        
        <SkeletonText mt="4" noOfLines={3} spacing="3" skeletonHeight="2" />
        
        <Skeleton height="36px" borderRadius="var(--radius-md)" />
      </VStack>
    </Box>
  );
}

export default SkeletonCard;