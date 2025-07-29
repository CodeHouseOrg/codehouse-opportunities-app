"use client";

// components/Hero.jsx
import { Box, Button, Flex, Heading, HStack, Image, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export const Hero = () => {
  return (
    <Flex
      as="section"
      position="relative"
      h="100vh"
      pt="auto" // Offset for the navigation bar
      align="center"
      justify="center"
      color="white"
      textAlign="center"
    >
      {/* Background Image */}
      <Box
        position="absolute"
        width="100%"
        height="100%"
        bgImage="url('/images/hero-background.JPEG')" // Placeholder for the background image
        bgSize="cover"
        bgPosition="center"
        filter="brightness(0.4)" // Darken the background image for text readability
      />

      {/* Hero Content */}
      <Box zIndex="1" px="1rem">
        <Heading as="h1" size="7xl" mb="1rem" fontWeight="bold">
          All it Takes is One Opportunity
        </Heading>
        <Text fontSize="xl" mb="2rem">
          Discover your potential. We connect talented students with leading companies for life-changing experiences.
        </Text>
        
        {/* Navigation Links */}
        <HStack spacing="1.5rem" justify="center" mb="2rem">
          <Link as={NextLink} href="/talent/events" _hover={{ textDecoration: "underline" }}>
            Events
          </Link>
          <Link as={NextLink} href="/talent/opportunities" _hover={{ textDecoration: "underline" }}>
            Opportunities
          </Link>
          <Link as={NextLink} href="/talent/partners" _hover={{ textDecoration: "underline" }}>
            Our Partners
          </Link>
        </HStack>

        {/* Partner Login Button */}
        <Button
          as={NextLink}
          href="/partners/access-code" // Inferred URL for partner access
          bg="primaryGray"
          color="primaryBlack"
          _hover={{ bg: "gray.300" }}
          size="lg"
          px="2rem"
        >
          Partner Login
        </Button>
      </Box>
    </Flex>
  );
};
