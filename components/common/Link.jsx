import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

export const CHLink = ({ children, href, ...rest }) => (
  <ChakraLink {...rest} asChild>
    <NextLink href={href}>{children}</NextLink>
  </ChakraLink>
);
