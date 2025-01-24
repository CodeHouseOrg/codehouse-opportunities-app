// components/PartnersGrid.jsx
import React from "react";
import { Box, Grid, Button, Text, Flex, Center } from "@chakra-ui/react";

const PartnersGrid = ({ partners, currentPage, setCurrentPage, itemsPerPage, onOpenModal }) => {
  const indexOfLastPartner = currentPage * itemsPerPage;
  const indexOfFirstPartner = indexOfLastPartner - itemsPerPage;
  const currentPartners = partners.slice(indexOfFirstPartner, indexOfLastPartner);

  const nextPage = () => {
    if (currentPage < Math.ceil(partners.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Flex direction="column" align="center" w="full" mb={4}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} w="full">
        {currentPartners.map((partner, i) => (
          <Box
            key={i}
            border="1px solid #ddd"
            p={3}
            boxShadow="md"
            transition="all 0.2s"
            _hover={{
              boxShadow: "lg",
              transform: "scale(1.05)",
            }}
            bg="white"
            textAlign="center"
            mb={6}
          >
            <Center>
              <Box
                as="span"
                display="inline-block"
                bg="#000"
                color="white"
                borderRadius="50%"
                width="40px"
                height="40px"
                lineHeight="40px"
                fontSize="lg"
                fontWeight="bold"
              >
                {partner.fields["Partner Name"][0]}
              </Box>
            </Center>
            <Text fontWeight="bold" fontSize="md" mt={4}>
              {partner.fields["Partner Name"]}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {partner.fields["Partner Type"]}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {partner.fields["Partner Location"]}
            </Text>
            <Button mt={4} colorScheme="black" size="sm" onClick={onOpenModal}>
              View Profile
            </Button>
          </Box>
        ))}
      </Grid>

      {/* Pagination Controls */}
      <Flex mt={4} justify="center" w="full">
        <Button
          onClick={prevPage}
          isDisabled={currentPage === 1}
          colorScheme="black"
          size="sm"
          mr={2}
        >
          Previous
        </Button>
        <Text alignSelf="center">
          Page {currentPage} of {Math.ceil(partners.length / itemsPerPage)}
        </Text>
        <Button
          onClick={nextPage}
          isDisabled={currentPage === Math.ceil(partners.length / itemsPerPage)}
          colorScheme="black"
          size="sm"
          ml={2}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
};

export default PartnersGrid;
