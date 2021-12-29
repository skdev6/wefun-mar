import React from 'react';
import theme from '../theme';
import { ChakraProvider, VStack } from '@chakra-ui/react';

import Hero from '../components/Hero';
import About from '../components/about';
import Industry from '../components/Industry';
import RoadMap from '../components/Roadmap';
import Email from '../components/Email';
import Footer from '../components/Footer';
import { Container } from '../components/Container';
import '../styles/transition.css';

export default () => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Container>
        <Hero />
        <About />
        <Industry />
        <RoadMap />
        <Email />
        <Footer />
      </Container>
    </ChakraProvider>
  );
};
