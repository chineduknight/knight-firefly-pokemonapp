import { Box, Container, Heading } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Box bg="gray.50" minH="100vh">
      <Box as="header" borderBottom="1px solid" borderColor="gray.200" py={4}>
        <Container maxW="6xl">
          <Heading size="lg">Firefly Pokédex</Heading>
        </Container>
      </Box>

      <Container maxW="6xl" py={4}>
        <HomePage />
      </Container>
    </Box>
  );
}

export default App;
