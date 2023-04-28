import {
  Box,
  Flex,
  Stack,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useReportsStore from "../store/reportsStore";
import { HiOutlineNewspaper } from "react-icons/hi";
import { BiTimeFive } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { FiCheckSquare } from "react-icons/fi";
import { Icon } from "@chakra-ui/react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Spinner } from "@chakra-ui/react";

const analytics = () => {
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");
  const { reports, setReports } = useReportsStore();
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getReports = async () => {
      setLoading(true);
      try {
        const allReports = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/reports`);
        setReports(allReports.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getReports();
  }, []);

  const headlineStats = [
    {
      title: "Total No. of Reports",
      value: reports.length,
      icon: HiOutlineNewspaper,
      color: colorMode === "light" ? "gray.500" : "gray.700",
    },
    {
      title: "Pending Action",
      value: reports.filter((item) => item.status === "for-action").length,
      icon: BiTimeFive,
      color: colorMode === "light" ? "red.400" : "red.600",
      barColor: "#f56565",
    },
    {
      title: "In Progress",
      value: reports.filter((item) => item.status === "in-progress").length,
      icon: BsGear,
      color: colorMode === "light" ? "orange.400" : "orange.600",
      barColor: "#ed8936",
    },
    {
      title: "Completed",
      value: reports.filter((item) => item.status === "completed").length,
      icon: FiCheckSquare,
      color: colorMode === "light" ? "green.400" : "green.600",
      barColor: "#48bb78",
    },
  ];

  const categoriesData = [
    {
      label: "Health",
      value: reports.filter((item) => item.category === "Health Services")
        .length,
    },
    {
      label: "Education",
      value: reports.filter((item) => item.category === "Education").length,
    },
    {
      label: "Public Safety",
      value: reports.filter((item) => item.category === "Public Safety").length,
    },
    {
      label: "Transportation",
      value: reports.filter((item) => item.category === "Transportation")
        .length,
    },
    {
      label: "Environment",
      value: reports.filter((item) => item.category === "Environmental Mgt")
        .length,
    },
    {
      label: "Housing ",
      value: reports.filter((item) => item.category === "Urban Development")
        .length,
    },
    {
      label: "Business",
      value: reports.filter((item) => item.category === "Business Licensing")
        .length,
    },
    {
      label: "Tax",
      value: reports.filter((item) => item.category === "Tax Collection")
        .length,
    },
    {
      label: "Social Services",
      value: reports.filter((item) => item.category === "Social Services")
        .length,
    },
    {
      label: "Tourism",
      value: reports.filter((item) => item.category === "Culture and Tourism")
        .length,
    },
  ];

  return (
    <div className="main-bg h-[calc(100vh-100px)] pt-[100px]">
      {loading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Spinner />
          <Text className="mt-1 ml-4">Fetching Analytics Data...</Text>
        </div>
      ) : (
        <Flex
          direction={"column"}
          className="max-w-[1440px] w-full px-4 py-4 mx-auto h-full"
          overflow="hidden"
        >
          <Stack
            className=" w-full mb-5 h-[20%] "
            direction={isLessThan600 ? "column" : "row"}
            justify="space-between"
            spacing={4}
          >
            {headlineStats.map((item, index) => {
              return (
                <Flex
                  key={index}
                  direction={"row"}
                  backgroundColor={"gray.200"}
                  className={`h-[full] rounded-md flex justify-between   ${
                    isLessThan600 ? "w-full" : "w-1/4"
                  } `}
                >
                  <Flex
                    className="text-lg font-semibold px-2 py-2 rounded-l-md"
                    backgroundColor={item.color}
                    color="white"
                  ></Flex>
                  <div className="py-6 w-full px-4 flex flex-col justify-between">
                    <Text className="text-2xl font-semibold ">
                      {item.title}
                    </Text>
                    <Stack direction={"row"} className="justify-between px-4">
                      <h2 className="text-6xl font-bold"> {item.value} </h2>

                      <div className="">
                        <Icon
                          as={item.icon}
                          boxSize={"12"}
                          className={"mb-2"}
                        />
                      </div>
                    </Stack>
                  </div>
                </Flex>
              );
            })}
          </Stack>
          <Stack
            className=" w-full h-[80%]"
            direction={isLessThan600 ? "column" : "row"}
            justify="space-between"
            spacing={4}
          >
            <Flex
              direction={"column"}
              bgColor={"gray.200"}
              className={`h-[100%] py-6  rounded-md ${
                isLessThan600 ? "w-full" : "w-1/2"
              } `}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={headlineStats.slice(1)}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 5,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#718096">
                    {/* {headlineStats.slice(1).map((item) => (
                    <Cell fill="#718096"></Cell>
                  ))} */}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <h3 className="text-center font-semibold">
                Number of Reports per Status
              </h3>
            </Flex>
            <Flex
              direction={"column"}
              bgColor={"gray.200"}
              className={`h-[100%] py-6 rounded-md ${
                isLessThan600 ? "w-full" : "w-1/2"
              } `}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={categoriesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 5,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#718096" />
                </BarChart>
              </ResponsiveContainer>{" "}
              <h3 className="text-center font-semibold">
                Number of Reports per Category
              </h3>
            </Flex>
          </Stack>
        </Flex>
      )}
    </div>
  );
};

export default analytics;
