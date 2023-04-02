import { Container, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import Benefit1 from "../../assets/benefit1.jpg";
import Benefit2 from "../../assets/benefit2.jpg";
import Benefit3 from "../../assets/benefit3.jpg";
import { useColorMode } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

const Benefits = () => {
  const { colorMode } = useColorMode();
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  const benefitsContent = [
    {
      imgSrc: Benefit1,
      title: "Increased Citizen Participation:",
      body: "The application gives citizens a platform to express their opinions and provide feedback on government services, which empowers them to participate in the governance process and have a say in shaping their communities.",
    },
    {
      imgSrc: Benefit2,
      title: "Improved Good Governance:",
      body: "By allowing citizens to provide feedback on government services, the application helps government officials to identify areas where they can improve and make changes that better serve the needs of the community. This results in better governance and a more responsive government.",
    },
    {
      imgSrc: Benefit3,
      title: "Enhanced Collaboration:",
      body: "The application facilitates communication between citizens and government officials, enabling them to work together towards common goals. By fostering collaboration, the application benefits both citizens and the government, leading to a better future for all.",
    },
  ];

  return (
    <div
      className={`w-[100vw] h-[auto] main-bg ${
        colorMode === "light" ? "bg-[#ffffff]" : "bg-[#161c27]"
      }`}
    >
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
            Governance is a two-way road:<br></br>
            <Text as={"span"} color={"orange.400"}>
              How can this platform promote better governance?
            </Text>
          </Heading>
        </Stack>

        {benefitsContent.map((benefit, index) => {
          return (
            <Stack
              key={index}
              direction={
                isLessThan768 ? "column" : index === 1 ? "row-reverse" : "row"
              }
              spacing={8}
              marginBottom={isLessThan768 ? "40px" : "80px"}
            >
              <div
                className={`${
                  isLessThan768 ? "w-full" : "w-1/2"
                } flex justify-center rounded-lg `}
              >
                <div className="w-[90%]">
                  <Image
                    src={benefit.imgSrc}
                    alt={benefit.title}
                    // height={400}
                    // width={400}
                    className="benefit-border rounded-lg shadow-lg"
                  ></Image>
                </div>
              </div>
              <div
                className={` ${
                  isLessThan768 ? "w-full text-center" : "w-1/2"
                } flex flex-col justify-center  px-2`}
              >
                <div className="w-[90%] flex flex-col justify-center mx-auto text-center">
                  <Text
                    fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                    className="font-semibold "
                  >
                    {benefit.title}
                  </Text>
                  <Text
                    fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                    className="mt-2"
                  >
                    {benefit.body}
                  </Text>
                </div>
              </div>
            </Stack>
          );
        })}
      </Container>
    </div>
  );
};

export default Benefits;
