
import { Flex, Spinner } from "@chakra-ui/react";

export const LoadingSpinner = () => {
  return (
    <Flex justify="center" align="center" h="100vh">
      <Spinner size="xl" />
    </Flex>
  );
};
