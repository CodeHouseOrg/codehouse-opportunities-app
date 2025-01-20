import { Box, Button, Flex } from "@chakra-ui/react";

export default function GalleryItem({ icon, line1, line2, line3, buttonText, onClick }) {
  return (
    <Flex
      justify="space-between"
      align="left"
      direction="column"
      className="shadow-md border-solid border border-[#B3B3B3] w-64"
      padding="8"
    >
      <Box>
        <Box pb="5">{icon}</Box>
        <Box>
          <p className="font-extrabold max-w-[15em] text-xl">{line1}</p>
          <p className="text-md">{line2}</p>
        </Box>
        <Box pb="2">
          <p className="text-sm">{line3}</p>
        </Box>
      </Box>
      <Flex align="center" direction="column">
        <Button
          bg="#2C2C2C"
          className="text-white text-sm rounded-lg py-0 px-3 h-9"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </Flex>
    </Flex>
  );
}
