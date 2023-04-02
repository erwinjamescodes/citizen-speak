import {
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useColorMode } from "@chakra-ui/react";
import Link from "next/link";

const CallToAction = () => {
  const { colorMode } = useColorMode();
  return (
    <div className={` pb-[80px] w-[100vw] h-[auto] relative bg-[black] `}>
      <Flex
        backgroundImage={
          "url(https://images.unsplash.com/photo-1563263357-a04f90b8d4dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80)"
        }
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
        className={`  w-[100vw] h-[100%] absolute opacity-25`}
      ></Flex>
      <Container
        maxW={"1440px"}
        className=" w-[100%] mx-auto flex flex-col items-center"
      >
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          pt={{ base: 20, md: 20 }}
          mb={{ base: 4 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            lineHeight={"110%"}
            // color={`${colorMode === "light" ? "blue.800" : "white"}`}
            color="white"
            className=" z-10"
          >
            Make a difference today!<br></br>
            <Text as={"span"}>Tell us how we can better deliver services.</Text>
          </Heading>
        </Stack>
        <Link href="/create-post">
          <Button
            color={"white"}
            bg={"orange.400"}
            rounded={"full"}
            px={8}
            py={6}
            _hover={{
              bg: "orange.500",
            }}
          >
            File a Report
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default CallToAction;
