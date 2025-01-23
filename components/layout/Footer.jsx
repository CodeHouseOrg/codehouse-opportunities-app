import { Heading, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  return (
    <div className="w-full static h-[250px] flex justify-start items-start border-t gap-24 bottom-0 text-black pl-24 pt-[2rem]">
      <VStack gap="1.5rem" align='start'>
        <Heading className="font-bold">CodeHouse</Heading>
        <VStack gap="1rem" align='start'>
          <Link href="">About</Link>
          <Link href="">Contact</Link>
          <Link href="">Terms & Conditions</Link>
        </VStack>
      </VStack>
      <VStack gap="1.5rem" align='start'>
        <Heading className="font-bold">For Students</Heading>
        <VStack gap="1rem" align='start'>
          <Link href="">Register</Link>
          <Link href="">Events</Link>
          <Link href="">Opportunities</Link>
          <Link href="">Our Partners</Link>
        </VStack>
      </VStack>
      <VStack gap="1.5rem" align='start'>
        <Heading className="font-bold">For Partners</Heading>
        <VStack gap="1rem" align='start'>
          <Link href="">Register</Link>
          <Link href="">Submit Opportunities</Link>
        </VStack>
      </VStack>
    </div>
  );
};
