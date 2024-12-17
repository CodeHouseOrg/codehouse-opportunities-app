"use client";

import { useState, useEffect } from "react";
import { Flex, Text, Input, Box } from "@chakra-ui/react";

export default function Events() {
  const [searchValue, setSearchValue] = useState("");
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

  useEffect(() => {
    async function fetchHosts() {
      try {
        console.log("Fetching hosts...");
        
        // Fetch Events Table
        const eventsResponse = await fetch(
          `https://api.airtable.com/v0/${BASE_ID}/Events`,
          {
            headers: {
              Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            },
          }
        );

        if (!eventsResponse.ok) {
          throw new Error(`Error fetching events: ${eventsResponse.status}`);
        }

        const eventsData = await eventsResponse.json();
        console.log("Events Data:", eventsData);

        // Collect unique Host IDs from Events
        const hostIds = new Set();
        eventsData.records.forEach((record) => {
          const hostField = record.fields["Host (Link from Partners)"];
          if (hostField) {
            hostField.forEach((id) => hostIds.add(id));
          }
        });

        console.log("Unique Host IDs:", hostIds);

        // Fetch Partners Table to get Host Names
        const partnersResponse = await fetch(
          `https://api.airtable.com/v0/${BASE_ID}/Partners`,
          {
            headers: {
              Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            },
          }
        );

        if (!partnersResponse.ok) {
          throw new Error(`Error fetching partners: ${partnersResponse.status}`);
        }

        const partnersData = await partnersResponse.json();
        console.log("Partners Data:", partnersData);

        // Map Partner Names by ID
        const partnerMap = {};
        partnersData.records.forEach((record) => {
          partnerMap[record.id] = record.fields["Partner Name"];
        });

        console.log("Partner Map:", partnerMap);

        // Match Event Host IDs to Partner Names
        const uniqueHosts = Array.from(hostIds)
          .map((id) => partnerMap[id])
          .filter(Boolean); // Remove undefined values

        console.log("Final Host Names:", uniqueHosts);

        setHosts(uniqueHosts);
      } catch (error) {
        console.error("Error fetching hosts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHosts();
  }, []);

  return (
    <Flex
      bg="primaryWhite"
      minH="100vh"
      justify="flex-start"
      align="center"
      direction="column"
      pt={24}
      fontFamily="var(--font-mulish)"
    >
  
      <Box mb={8} textAlign="center">
        <Text as="h1" fontSize="34px" fontWeight="900" color="black">
          Events
        </Text>
        <Text
          fontSize="24px"
          color="black"
          textAlign="center"
          maxW="400px"
          mx="auto"
          lineHeight="1.2"
        >
          Search for jobs, funding, and more from CodeHouse sponsors.
        </Text>
      </Box>

      {/* Search and Filter Section */}
      <Box width="100%" maxW="600px">
        {/* Search Input */}
        <Box mb={6} position="relative" textAlign="center">
          <Input
            placeholder="Search by Event Name"
            size="md"
            borderRadius="full"
            bg="white"
            border="1px solid"
            borderColor="gray.300"
            px={4}
            pr={10}
            color="black"
            _placeholder={{ color: "black" }}
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <Box
              as="button"
              position="absolute"
              right="12px"
              top="50%"
              transform="translateY(-50%)"
              bg="transparent"
              fontSize="14px"
              color="black"
              _hover={{ color: "gray.700" }}
              aria-label="Clear search"
              onClick={() => setSearchValue("")}
            >
              X
            </Box>
          )}
        </Box>

        {/* Host Filter */}
        <Flex direction="column" align="center">
          <Box width="200px" textAlign="left">
            <Text fontSize="14px" fontWeight="medium" mb={2} color="gray.700">
              Host
            </Text>
            <Box
              as="select"
              size="md"
              borderRadius="md"
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              p={2}
              width="100%"
              color="black"
              _hover={{ borderColor: "gray.400" }}
              _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
            >
              {loading ? (
                <option>Loading hosts...</option>
              ) : hosts.length > 0 ? (
                <>
                  <option value="all">All</option>
                  {hosts.map((host, index) => (
                    <option key={index} value={host}>
                      {host}
                    </option>
                  ))}
                </>
              ) : (
                <option disabled>No hosts found</option>
              )}
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
