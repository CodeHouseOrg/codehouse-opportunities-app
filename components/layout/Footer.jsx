import { Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="w-full static h-[250px] flex justify-start items-start border-t gap-24 bottom-0 text-black pl-24 pt-[2rem]">
      <VStack gap="1.5rem" align="start">
        <Heading className="font-bold">CodeHouse</Heading>
        <VStack gap="1rem" align="start">
          <Link href="https://www.thecodehouse.org/" target="_blank">
            About
          </Link>
        </VStack>
      </VStack>
      <VStack gap="1.5rem" align="start">
        <Heading className="font-bold">For Students</Heading>
        <VStack gap="1rem" align="start">
          <Link href="/talent/events">Events</Link>
          <Link href="/talent/opportunities">Opportunities</Link>
          <Link href="/talent/partners">Our Partners</Link>
        </VStack>
      </VStack>
      <VStack gap="1.5rem" align="start">
        <Heading className="font-bold">For Partners</Heading>
        <VStack gap="1rem" align="start">
          <Link href="/partners/register">Register</Link>
          <Link href="/partners/submit-opportunity">Submit Opportunities</Link>
          <Link href="/partners/students">Our Students</Link>
        </VStack>
      </VStack>
    </div>
  );
};
