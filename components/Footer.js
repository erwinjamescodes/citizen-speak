import { Container, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { useColorMode } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

const Footer = () => {
  const { colorMode } = useColorMode();
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");
  return (
    <Flex
      className={`w-[100vw] h-[auto] py-10 text-white`}
      bg={colorMode === "light" ? "blue.800" : "gray.900"}
    >
      <Container
        maxW={"1440px"}
        className={`w-[100%] flex items-start  h-[100%] ${
          isLessThan600
            ? "justify-center items-center text-center"
            : "justify-between "
        }`}
      >
        <div>
          <Link href="/">
            <h1 className="text-xl font-semibold">
              Empowered Citizen Initiative
            </h1>
          </Link>
          <h3 className="">© 2023 Copyright | All Rights Reserved</h3>
          <h4 className="italic mt-4">
            This is for demonstration purposes only.
          </h4>
        </div>

        <Stack
          direction="column"
          spacing={2}
          alignItems={"end"}
          display={isLessThan600 ? "none" : "flex"}
        >
          <Link href="/transparency-board">Transparency Board</Link>
          <Link href="/about">Analytics</Link>
          <Link href="/create-post">File a Report</Link>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Footer;
