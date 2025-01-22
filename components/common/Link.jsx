import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

export const CHLink = ({ children, href, ...rest }) => (
  <ChakraLink {...rest} asChild>
    hello world
    <NextLink href={href}>{children}</NextLink>
  </ChakraLink>
);
