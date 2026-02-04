import { Box } from '@chakra-ui/react';

const BACKGROUNDS = {
  home: '/backgrounds/home.webp',
  profile: '/backgrounds/perfil.webp',
  applications: '/backgrounds/candidaturas.webp',
  about: '/backgrounds/sobremi.webp',
};

function PageBackground({ page = 'home' }) {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex="-1"
      backgroundImage={`url(${BACKGROUNDS[page]})`}
      opacity="0.3"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundAttachment="fixed"
   
    />
  );
}

export default PageBackground;
