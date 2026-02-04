import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#FAF8F5',
      100: '#F5F1ED',
      200: '#EBE5E0',
      300: '#D4C5BA',
      400: '#C4AFA5',
      500: '#A78A7F', // Main
      600: '#8B6F65',
      700: '#6F5850',
      800: '#53423B',
      900: '#372C26',
    },
    secondary: {
      50: '#FAF8F6',
      100: '#F5F2EF',
      200: '#EBE6E3',
      300: '#D4C5BA',
      400: '#B4A59A', // Main
      500: '#9A8B80',
      600: '#806F66',
      700: '#66554C',
      800: '#4D3F36',
      900: '#332A22',
    },
    accent: {
      50: '#F0F5EF',
      100: '#E1EBE0',
      200: '#D2E1D1',
      300: '#B5C9B2',
      400: '#A2B89F',
      500: '#8FA38C', // Main
      600: '#6B7F68',
      700: '#556650',
      800: '#3F4D3C',
      900: '#2A3328',
    },
  },
  fonts: {
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'var(--radius-md)',
        transition: 'var(--transition-base)',
      },
      variants: {
        solid: {
          bg: 'var(--color-primary)',
          color: 'white',
          _hover: {
            bg: 'var(--color-primary-dark)',
            transform: 'translateY(-2px)',
            boxShadow: 'var(--shadow-md)',
          },
        },
      },
    },
  },
});

export default theme;