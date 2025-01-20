"use client";

import { Box, Text, Button, Flex } from "@chakra-ui/react";

export default function EventItem({ event }) {
  const startDate = event.EventDate ? new Date(event.EventDate) : null;
  
  if (startDate instanceof Date) {
    startDate.setMinutes(startDate.getMinutes()+startDate.getTimezoneOffset());
  }

  const formattedDate = startDate
    ? `${startDate.toLocaleString("default", { month: "short" })} ${startDate.getDate()}`
    : "N/A";

  return (
    <Box
      key={event.id}
      bg="white"
      borderRadius="sm"
      boxShadow="sm"
      p={4}
      mb={4}
      width="90%"
      maxW="700px"
      mx="auto"
      display="flex"
      alignItems="center"
      minH="100px"
    >
      {/* Date Circle */}
      <Box
        bg="gray.800"
        color="white"
        textAlign="center"
        borderRadius="full"
        w="60px"
        h="60px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mr={5}
      >
        {startDate ? (
          <>
            <Text fontSize="xl" fontWeight="bold" lineHeight="1">
              {startDate.getDate()}
            </Text>
            <Text fontSize="sm" fontWeight="bold" textTransform="uppercase" mt={0.5}>
              {startDate.toLocaleString("default", { month: "short" })}
            </Text>
          </>
        ) : (
          <>
            <Text fontSize="xl" fontWeight="bold">TBD</Text>
          </>
        )}
      </Box>

      {/* Event Details */}
      <Flex flex="1" align="flex-start" direction="column">
        <Text fontWeight="bold" fontSize="lg" mb={0.5} color="black" lineHeight="1.2">
          {event.EventName}
        </Text>
        <Text fontSize="sm" color="black" mb={0.5} lineHeight="1.2">
          {formattedDate}
        </Text>
        <Text fontSize="sm" color="black" mb={0.5} lineHeight="1.2">
          {event.EventHost}
        </Text>
      </Flex>

      {/* Event Description */}
      <Box maxW="45%" pl={4} pr={4}>
        <Text fontSize="sm" color="gray.500" lineHeight="1.4">
          {event.EventDescription}
        </Text>
      </Box>

      {/* Attend Button */}
      <Button
        bg="gray.800"
        color="white"
        px={4}
        py={2}
        fontSize="sm"
        ml={4}
        borderRadius="sm"
        _hover={{ bg: "gray.700" }}
      >
        Attend
      </Button>
    </Box>
  );
}
