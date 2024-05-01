import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Index = () => {
  return (
    <Box p={4}>
      <Flex direction="column" align="center" justify="center">
        <Heading mb={4}>Welcome to the Note-Taking App</Heading>
        <Link as={RouterLink} to="/notes" color="teal.500" fontSize="xl">
          Go to Notes
        </Link>
      </Flex>
    </Box>
  );
};

export default Index;