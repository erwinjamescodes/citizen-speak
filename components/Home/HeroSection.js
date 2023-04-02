import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
} from "@chakra-ui/react";
import Link from "next/link";
import { useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import HeroMockup from "../../assets/mockup-hero.jpg";
export default function HeroSection() {
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");

  return (
    <Flex className="max-w-[1440px] h-[auto] px-4 mt-[100px]">
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
          lineHeight={"110%"}
          className="px-2"
        >
          Speak Up for a Better Tomorrow:<br></br>
          <Text as={"span"} color={"orange.400"}>
            Empower Your Voice in Governance
          </Text>
        </Heading>
        <Text
          maxW={"4xl"}
          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
          className="px-4"
        >
          A platform which empowers you to have a say in shaping your community
          and ensures that your voice is heard.
        </Text>
        <Flex
          className="flex gap-4"
          direction={isLessThan600 ? "column" : "row"}
        >
          <Link href="/write-report">
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
          <Link href="/transparency-board">
            <Button
              color={"orange.400"}
              bg={"transparent"}
              border={"2px solid"}
              rounded={"full"}
              px={8}
              py={6}
              _hover={{
                bg: "orange.500",
                color: "white",
                border: "2px solid #DD6B20",
              }}
            >
              Transparency Board
            </Button>
          </Link>
        </Flex>
        <div className="px-4 rounded-md">
          <Image
            src={HeroMockup}
            alt={"Browser Mockup"}
            // height={400}
            // width={400}
            className="shadow-lg rounded-md"
          ></Image>
        </div>
      </Stack>
    </Flex>
  );
}
