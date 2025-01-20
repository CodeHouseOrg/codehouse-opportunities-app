import { Flex, HStack, Image, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export const Nav = () => {
  return (
    <Flex
      pos="absolute"
      top={0}
      borderBottom="1px solid #D9D9D9"
      px="3.813rem"
      py="2rem"
      w="full"
      h="96px"
      justify="space-between"
      align="center"
    >
      <Link href="/">
        <Image src="/images/codehouse-logo.png" alt="codehouse logo" />
      </Link>
      <HStack gap="1rem" align="center" justify="center">
        <Link
          as={NextLink}
          href="/talent"
          _hover={{ bg: "primaryGray" }}
          color="black"
          p="0.5rem"
          borderRadius="6px"
        >
          For Talent
        </Link>
        <Link
          as={NextLink}
          href="/partners/submit-opportunity"
          _hover={{ bg: "primaryGray" }}
          color="black"
          p="0.5rem"
          borderRadius="6px"
        >
          For Partners
        </Link>
      </HStack>
    </Flex>
  );
};
