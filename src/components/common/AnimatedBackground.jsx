import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

function AnimatedBackground() {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex="-1"
      overflow="hidden"
      background="linear-gradient(135deg, var(--bg-primary) 0%, #F0EBF5 50%, #E8DFD6 100%)"
    >
      {/* Círculos flotantes con parallax */}
      <MotionBox
        position="absolute"
        top="10%"
        left="5%"
        width="300px"
        height="300px"
        borderRadius="50%"
        background="radial-gradient(circle, rgba(201, 173, 227, 0.15) 0%, transparent 70%)"
        filter="blur(40px)"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <MotionBox
        position="absolute"
        top="30%"
        right="10%"
        width="400px"
        height="400px"
        borderRadius="50%"
        background="radial-gradient(circle, rgba(244, 194, 212, 0.2) 0%, transparent 70%)"
        filter="blur(60px)"
        animate={{
          y: [0, -40, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <MotionBox
        position="absolute"
        bottom="10%"
        left="20%"
        width="350px"
        height="350px"
        borderRadius="50%"
        background="radial-gradient(circle, rgba(184, 230, 213, 0.18) 0%, transparent 70%)"
        filter="blur(50px)"
        animate={{
          y: [0, 25, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <MotionBox
        position="absolute"
        top="50%"
        left="50%"
        width="500px"
        height="500px"
        borderRadius="50%"
        background="radial-gradient(circle, rgba(201, 173, 227, 0.1) 0%, transparent 70%)"
        filter="blur(80px)"
        transform="translate(-50%, -50%)"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Formas geométricas sutiles */}
      <MotionBox
        position="absolute"
        top="20%"
        right="30%"
        width="80px"
        height="80px"
        borderRadius="12px"
        border="2px solid"
        borderColor="var(--color-primary-light)"
        opacity="0.1"
        animate={{
          rotate: [0, 180, 360],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <MotionBox
        position="absolute"
        bottom="30%"
        right="15%"
        width="60px"
        height="60px"
        borderRadius="50%"
        border="3px solid"
        borderColor="var(--color-secondary-light)"
        opacity="0.15"
        animate={{
          scale: [1, 1.2, 1],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <MotionBox
        position="absolute"
        top="60%"
        left="15%"
        width="100px"
        height="100px"
        clipPath="polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
        background="var(--color-accent-light)"
        opacity="0.08"
        animate={{
          rotate: [0, 90, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </Box>
  );
}

export default AnimatedBackground;