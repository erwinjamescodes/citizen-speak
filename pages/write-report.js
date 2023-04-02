import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { MdOutlineRefresh } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { serviceCategoriesData } from "../data/services";
import { barangays } from "../data/barangays";
import axios from "axios";
import { useRouter } from "next/router";

const writeReport = () => {
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");
  const [userPost, setUserPost] = useState({
    name: "",
    address: null,
    mobileNumber: "",
    emailAddress: "",
    category: null,
    body: "",
  });
  const router = useRouter();

  const categories = [
    { service: "Select Service Category", value: "", icon: null },
    ...serviceCategoriesData,
  ];

  const handleSubmit = async (e) => {
    // e.preventDefault;
    const userInput = {
      ...userPost,
      status: "for-action",
      resolution: null,
      resolutionDate: null,
    };

    // setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/reports`,
        userInput
      );
    } catch (err) {
      console.log(err);
    }

    // setIsLoading(false);
    router.push("/transparency-board");
  };

  return (
    <div className=" pb-12 pt-[140px]">
      <Container maxW={"100%"} className="flex justify-center h-auto ">
        <Flex
          alignItems="start"
          flexDirection={"column"}
          className="max-w-[1440px] w-[100%] "
          px={isLessThan600 ? null : 8}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl" }}
            width={"100%"}
            pb={"12px"}
            className="border-b-2 mb-4"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>File a Report</Text>
              <Stack direction="row" spacing={2}>
                <Tooltip label="Reset Form" fontSize="xs">
                  <span
                    onClick={() => {
                      // resetForm();
                    }}
                  >
                    <Icon as={MdOutlineRefresh} boxSize="6" cursor="pointer" />
                  </span>
                </Tooltip>
                <Tooltip label="Delete Draft" fontSize="xs">
                  <span
                    onClick={() => {
                      // deleteLocalStorage();
                      // resetForm();
                    }}
                  >
                    <Icon as={MdDeleteOutline} boxSize="6" cursor="pointer" />
                  </span>
                </Tooltip>
              </Stack>
            </Stack>
          </Heading>
          <form className="w-[100%] flex flex-col">
            {/* FORM */}
            <Box className="w-[100%] pb-4 border-b-2">
              <Stack textAlign={"center"} spacing={{ base: 4 }}>
                <Stack
                  direction={"row"}
                  className="w-full"
                  spacing={{ base: 4 }}
                >
                  <input
                    //   value={
                    //     userPost.name === "" || userPost.name === "null"
                    //       ? ""
                    //       : userPost.name
                    //   }
                    className={`border p-4 rounded-md focus:outline-none w-1/2 ${
                      isLessThan600 ? "text-sm" : ""
                    }`}
                    placeholder="Name (Optional)"
                    onChange={(e) => {
                      setUserPost((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                    }}
                  ></input>
                  <select
                    onChange={(e) => {
                      setUserPost((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }));
                    }}
                    className={`px-3 w-1/2 py-1 rounded-md text-lg  cursor-pointer border bg-white `}
                    defaultValue={"Address (Optional)"}
                  >
                    {barangays.map((brgy, index) => {
                      return (
                        <option
                          key={index}
                          value={brgy.value}
                          disabled={index === 0}
                        >
                          {brgy.label}
                        </option>
                      );
                    })}
                  </select>
                </Stack>
                <Stack
                  direction={"row"}
                  className="w-full"
                  spacing={{ base: 4 }}
                >
                  <input
                    //   value={
                    //     userPost.name === "" || userPost.name === "null"
                    //       ? ""
                    //       : userPost.name
                    //   }
                    className={`border p-4 rounded-md focus:outline-none w-1/2 ${
                      isLessThan600 ? "text-sm" : ""
                    }`}
                    placeholder="Mobile Number (Optional)"
                    onChange={(e) => {
                      setUserPost((prev) => ({
                        ...prev,
                        mobileNumber: e.target.value,
                      }));
                    }}
                  ></input>
                  <input
                    //   value={
                    //     userPost.name === "" || userPost.name === "null"
                    //       ? ""
                    //       : userPost.name
                    //   }
                    className={`border p-4 rounded-md focus:outline-none w-1/2 ${
                      isLessThan600 ? "text-sm" : ""
                    }`}
                    placeholder="Email Address (Optional)"
                    onChange={(e) => {
                      setUserPost((prev) => ({
                        ...prev,
                        emailAddress: e.target.value,
                      }));
                    }}
                  ></input>
                </Stack>
                <select
                  onChange={(e) => {
                    setUserPost((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }));
                  }}
                  className="px-4 py-3 rounded-md text-lg  cursor-pointer w-full bg-white border"
                  required
                  defaultValue={"Select Service Category"}
                >
                  {categories.map((category, index) => {
                    return (
                      <option
                        key={index}
                        value={category.service}
                        disabled={index === 0}
                      >
                        {category.service}
                      </option>
                    );
                  })}
                </select>
                <textarea
                  //   value={userPost.postBody === "" ? "" : userPost.postBody}
                  className={`border p-4 rounded-md focus:outline-none h-[250px] ${
                    isLessThan600 ? "text-sm" : ""
                  }`}
                  placeholder="Tell us about your experience..."
                  required
                  onChange={(e) => {
                    setUserPost((prev) => ({
                      ...prev,
                      body: e.target.value,
                    }));
                  }}
                ></textarea>
              </Stack>

              <p
                className={`text-right text-sm pt-2 
     
          `}
              >
                1500
              </p>
            </Box>
            {/* BUTTONS */}
            <Stack
              direction="row"
              mt={4}
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack>
                <Text className="text-red-600 italic">
                  Note: Contact information provided will be kept confidential
                  and will only be used to follow-up for additional information
                  about the report.
                </Text>
              </Stack>
              <Stack direction={"row"}>
                <Button
                  bg={"red.600"}
                  _hover={{
                    bg: "red.500",
                  }}
                  rounded={"full"}
                  px={6}
                  color={"white"}
                  fontSize={{ base: "xs", sm: "md" }}
                  // type="submit"
                  // disabled={
                  //   userPost.title === "" ||
                  //   userPost.title === null ||
                  //   userPost.title === "null" ||
                  //   userPost.postBody === "" ||
                  //   userPost?.selectedCategories?.length === 0 ||
                  //   postBodyLength > 1500
                  // }
                  onClick={() => {
                    handleSubmit();
                    // alert(form.data);
                  }}
                >
                  {/* {!isLoading ? "Post" : "Posting..."} */}
                  Submit Report
                </Button>
              </Stack>
              {/* {isLoading ? <Spinner color="red.500" /> : null} */}
            </Stack>
          </form>
        </Flex>
      </Container>
    </div>
  );
};

export default writeReport;
