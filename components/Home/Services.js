import React from "react";
import {
  Container,
  Heading,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";

import { useMediaQuery } from "@chakra-ui/react";
import { serviceCategoriesData } from "../../data/services";

const Services = () => {
  const { colorMode } = useColorMode();
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");

  const ServiceCategories = ({ icon, service }) => {
    return (
      <div
        className={` flex flex-col items-center mb-[32px]  ${
          isLessThan600
            ? "w-[100px] h-[100px] mb-[54px]"
            : "w-[150px] h-[150px] mb-[32px]"
        }`}
      >
        <Icon
          as={icon}
          boxSize={isLessThan600 ? "32" : "36"}
          backgroundColor={"gray.100"}
          borderRadius={"30%"}
          padding={"36px"}
          color={"blue.800"}
        />
        <Text
          className="mt-4  font-normal text-center"
          fontSize={{ base: "md", md: "lg" }}
        >
          {service}
        </Text>
      </div>
    );
  };

  return (
    <div className={`w-[100vw] h-[auto] pb-[80px]`}>
      <Container maxW={"1440px"} className=" w-[100%] mx-auto pb-4">
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 20 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            lineHeight={"110%"}
          >
            Tell us about your story!<br></br>
            <Text as={"span"} color={"orange.400"}>
              How do you find your experience about the following categories:
            </Text>
          </Heading>
        </Stack>
        <div className="flex gap-12 flex-wrap justify-center max-w-[1100px] mx-auto">
          {serviceCategoriesData.map((item) => (
            <ServiceCategories
              icon={item.icon}
              service={item.service}
              key={item.service}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Services;
