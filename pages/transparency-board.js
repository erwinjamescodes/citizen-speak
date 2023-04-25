import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Input,
  Text,
  useDisclosure,
  useMediaQuery,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import * as timeago from "timeago.js";
import moment from "moment";
import useUsernameStore from "../store/useUsernameStore";
import useReportsStore from "../store/reportsStore";
import { serviceCategoriesData } from "../data/services";
import useFilterStore from "../store/filterStore";
import SkeletonPost from "../components/Skeleton";

const transparencyBoard = () => {
  const {
    categoryFilter,
    setCategoryFilter,
    removeCategoryFilter,
    resetCategoryFilter,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    resetStartDate,
    resetEndDate,
  } = useFilterStore();
  const { reports, setReports, updateReport } = useReportsStore();
  const { currentUsername, setCurrentUsername, userType, setUserType } =
    useUsernameStore();
  const [loading, setLoading] = useState(true);

  const {
    isOpen: isOpenReportDetails,
    onOpen: onOpenReportDetails,
    onClose: onCloseReportDetails,
  } = useDisclosure();

  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  const [modalData, setModalData] = useState();
  const [updates, setUpdates] = useState({
    newStatus: "",
    resolutionDate: "",
    resolution: "",
  });

  const [isLessThan600] = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    (async () => {
      const getReports = await fetch("/api/reports");
      const getReportsJson = await getReports.json();
      setReports(getReportsJson);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (modalData) {
      setUpdates((prev) => ({
        ...prev,
        newStatus: modalData.status,
        resolutionDate:
          modalData.status !== "completed" ? "" : modalData.resolutionDate,
        resolution: modalData.resolution,
      }));
    }
  }, [modalData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUsername(window.localStorage.getItem("citizenSpeakUser"));
      setUserType(window.localStorage.getItem("citizenSpeakUserType"));
    }
  }, [currentUsername]);

  const sections = [
    {
      heading: "For Action",
      value: "for-action",
      color: "red.400",
    },
    {
      heading: "In Progress",
      value: "in-progress",
      color: "orange.400",
    },
    {
      heading: "Completed",
      value: "completed",
      color: "green.400",
    },
  ];

  const getModalData = (id) => {
    const data = reports.filter((rep) => rep._id === id);
    setModalData(data[0]);
    onOpenReportDetails();
  };

  const handleDeleteClick = async (_id) => {
    try {
      const response = await axios.delete("/api/reports", {
        data: { _id: _id },
        headers: {
          "Content-Type": "application/json",
        },
      });
      setReports(reports.filter((report) => report._id !== _id));
    } catch (err) {
      console.log(err);
    }
  };

  // const handleUpdateStatus = async (id, updates) => {
  //   try {
  //     const res = await axios.put(
  //       `${process.env.NEXT_PUBLIC_BACKEND_API}/api/reports/${id}`,
  //       {
  //         status: updates.newStatus,
  //         resolutionDate: updates.resolutionDate,
  //         resolution: updates.resolution,
  //       }
  //     );
  //     updateReport(id, res.data);
  //     getReports();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleUpdateStatus = async (id, updates) => {
    try {
      const response = await axios.put(
        `/api/reports/${id}`,
        {
          status: updates.newStatus,
          resolutionDate: updates.resolutionDate,
          resolution: updates.resolution,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      updateReport(id, response.data);
      getReports();
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (date) => {
    return moment(date).format("MMMM D, YYYY");
  };

  const handleSelectCategory = (event) => {
    if (event.target.checked) {
      setCategoryFilter(event.target.value);
    } else {
      removeCategoryFilter(event.target.value);
    }
  };

  const handleReset = () => {
    resetCategoryFilter();
    resetStartDate();
    resetEndDate();
  };

  return (
    <div className="main-bg pt-[100px]">
      <Box
        className="max-w-[1440px] w-full p-4 py-4 mx-auto h-[calc(100vh-100px]  "
        overflow="hidden"
      >
        <Stack
          className=" w-full h-full "
          direction={isLessThan600 ? "column" : "row"}
          justify="space-between"
          spacing={4}
        >
          {/* Filters */}
          <Flex
            direction={"column"}
            className={`  ${isLessThan600 ? "w-full" : "w-1/4"} h-[full]`}
          >
            <Box
              className={`  w-full rounded-t-md pb-4 `}
              backgroundColor={"gray.200"}
            >
              <Text
                className="font-semibold text-white py-4 px-5 rounded-t-md"
                backgroundColor={"gray.500"}
              >
                Filters
              </Text>
            </Box>
            <Box
              className={`h-[calc(100vh-200px)] rounded-b-md   p-3 pt-0 overflow-y-auto overflow-x-hidden relative scrollbar-hide w-full `}
              backgroundColor={"gray.200"}
            >
              <Stack spacing={3} className="h-full relative w-full">
                <form className="h-full">
                  <Box
                    className="w-full h-auto min-h-full rounded-md p-6"
                    backgroundColor={"white"}
                  >
                    {/* Select by Category */}
                    <Text
                      fontSize={{ base: "sm" }}
                      className="font-semibold mb-4"
                    >
                      SELECT BY CATEGORY
                    </Text>
                    <Stack className="mb-6">
                      {serviceCategoriesData.map((service, index) => {
                        return (
                          <div className="flex items-center" key={index}>
                            <input
                              type="checkbox"
                              id={service.value}
                              name={service.value}
                              value={service.value}
                              className="w-[15px] h-[15px] mr-4 outline-none border-none cursor-pointer"
                              onClick={(e) => {
                                handleSelectCategory(e);
                              }}
                            />
                            <label
                              htmlFor={service.value}
                              className="text-md cursor-pointer"
                            >
                              {service.service}
                            </label>
                          </div>
                        );
                      })}
                    </Stack>

                    {/* Select by Date */}
                    <Text
                      fontSize={{ base: "sm" }}
                      className="font-semibold mb-4"
                    >
                      FILTER BY DATE
                    </Text>
                    <div className="mb-4">
                      <Text
                        fontSize={{ base: "2xs" }}
                        className="font-semibold mb-2"
                      >
                        FROM
                      </Text>
                      <Input
                        size="md"
                        type="date"
                        backgroundColor={"gray.100"}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <Text
                        fontSize={{ base: "2xs" }}
                        className="font-semibold mb-2"
                      >
                        TO
                      </Text>
                      <Input
                        size="md"
                        type="date"
                        backgroundColor={"gray.100"}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                        }}
                      />
                    </div>

                    {/* Clear Filters */}
                    <button
                      className="bg-[#ca043b]  py-1 rounded-md text-white font-bold text-lg mt-8 w-full"
                      type="reset"
                      onClick={() => {
                        handleReset();
                      }}
                    >
                      Clear Filters
                    </button>
                  </Box>
                </form>
              </Stack>
            </Box>
          </Flex>

          {/* Sections */}
          {sections.map((section, index) => {
            return (
              <Flex
                key={index}
                direction={"column"}
                className={`${isLessThan600 ? "w-full" : "w-1/4"} h-full`}
              >
                {/* Header Title */}
                <Box
                  className={`w-full rounded-t-md  pb-4`}
                  backgroundColor={"gray.200"}
                >
                  <Text
                    className="font-semibold text-white py-4 px-5 rounded-t-md"
                    backgroundColor={section.color}
                  >
                    {section.heading}
                  </Text>
                </Box>

                {/* Complaints */}
                <Box
                  className={`h-[calc(100vh-200px)] rounded-b-md p-3 pt-0 overflow-y-auto overflow-x-hidden relative scrollbar-hide w-full`}
                  backgroundColor={"gray.200"}
                >
                  {loading ? (
                    <SkeletonPost />
                  ) : (
                    <Stack spacing={3} className="relative w-full ">
                      {reports
                        ?.filter((report) => report?.status === section.value)
                        .slice(0)
                        .reverse()
                        .filter((item) => {
                          return (
                            moment(item.createdAt).format("YYYY-MM-DD") >=
                              startDate &&
                            moment(item.createdAt).format("YYYY-MM-DD") <=
                              endDate
                          );
                        })
                        .filter((rep) =>
                          categoryFilter.length === 0
                            ? rep
                            : categoryFilter.includes(rep.category)
                        )
                        .map((item) => {
                          return (
                            <Box
                              key={item._id}
                              className="w-full h-auto rounded-md p-3 "
                              backgroundColor={"white"}
                              onClick={() => {
                                getModalData(item._id);
                              }}
                            >
                              <Text className="text-xs">
                                Reported {timeago.format(item.createdAt)}
                              </Text>
                              <Text className="mt-3">{item.body}</Text>
                              <Stack
                                direction={"row"}
                                className="mt-2"
                                spacing={2}
                                alignItems="start"
                              >
                                <Text
                                  backgroundColor={serviceCategoriesData
                                    .filter(
                                      (service) =>
                                        service.service === item.category
                                    )
                                    .map((cat) => cat.color)}
                                  className="px-2 pt-1 rounded-sm font-semibold text-black"
                                  fontSize={"xs"}
                                >
                                  {item.category}
                                </Text>
                              </Stack>
                            </Box>
                          );
                        })}
                    </Stack>
                  )}
                </Box>
              </Flex>
            );
          })}
        </Stack>
      </Box>

      {modalData && (
        <Modal
          isOpen={isOpenReportDetails}
          onClose={onCloseReportDetails}
          isCentered
        >
          <ModalOverlay />

          <ModalContent minW={"30%"}>
            <ModalHeader>Report Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack direction={"row"}>
                <Stack direction={"column"} className="mb-4 w-1/2">
                  <Text className="text-xs font-semibold">Reported by:</Text>
                  <Text className="font-semibold">{modalData.name}</Text>
                </Stack>
                <Stack direction={"column"} className="mb-4 w-1/2">
                  <Text className="text-xs font-semibold">Reported on:</Text>
                  <Text className="font-semibold">
                    {formatDate(modalData.createdAt)}
                  </Text>
                </Stack>
              </Stack>
              <Stack direction={"row"}>
                <Stack className="mb-4 w-1/2">
                  <Text className="text-xs font-semibold">Category:</Text>
                  <Text className="font-semibold">{modalData.category}</Text>
                </Stack>
                <Stack className="mb-4 w-1/2">
                  <Text className="text-xs font-semibold">Location:</Text>
                  <Text className="font-semibold">
                    Barangay {modalData.address}
                  </Text>
                </Stack>
              </Stack>
              <Stack className="mb-4">
                <Text className="text-xs font-semibold">Description:</Text>
                <Text className="">{modalData.body}</Text>
              </Stack>
              <Stack direction={"row"}>
                <Stack className="mb-4 w-1/2">
                  <Text className="text-xs font-semibold">Status:</Text>
                  {userType === "admin" ? (
                    <select
                      onChange={(e) => {
                        setUpdates((prev) => ({
                          ...prev,
                          newStatus: e.target.value,
                        }));
                      }}
                      className="px-4 py-1 rounded-md text-lg  cursor-pointer w-full  border"
                      required
                      defaultValue={modalData.status}
                    >
                      {sections.map((sec, index) => (
                        <option key={index} value={sec.value}>
                          {sec.heading}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Text className="font-semibold">
                      {sections
                        .filter((sec) => sec.value === modalData.status)
                        .map((item) => item.heading)}
                    </Text>
                  )}
                </Stack>
                <Stack className="mb-4 w-1/2">
                  <Text className="text-xs font-semibold">Resolved on:</Text>
                  {userType === "admin" ? (
                    <Input
                      size="md"
                      type="date"
                      backgroundColor={"gray.100"}
                      defaultValue={
                        modalData.status === "completed"
                          ? modalData.resolutionDate
                          : null
                      }
                      onChange={(e) =>
                        setUpdates((prev) => ({
                          ...prev,
                          resolutionDate: e.target.value,
                        }))
                      }
                    />
                  ) : modalData.status !== "completed" ? (
                    <Text className="font-semibold">Not yet resolved.</Text>
                  ) : (
                    <Text className="font-semibold">
                      {modalData?.resolutionDate
                        ? formatDate(modalData.resolutionDate)
                        : "No resolution date provided."}
                    </Text>
                  )}
                </Stack>
              </Stack>
              <Stack className="mb-4">
                <Text className="text-xs font-semibold">
                  Resolution / Remarks:
                </Text>
                {userType === "admin" ? (
                  <textarea
                    defaultValue={modalData.resolution}
                    className={`border p-4 rounded-md focus:outline-none h-[250px] ${
                      isLessThan600 ? "text-sm" : ""
                    }`}
                    placeholder="Discuss here how the report was resolved."
                    required
                    onChange={(e) => {
                      setUpdates((prev) => ({
                        ...prev,
                        resolution: e.target.value,
                      }));
                    }}
                  ></textarea>
                ) : (
                  <Text>
                    {modalData?.resolution
                      ? modalData.resolution
                      : "Not yet resolved."}
                  </Text>
                )}
              </Stack>
            </ModalBody>

            {userType === "admin" && (
              <ModalFooter>
                <Button
                  colorScheme="green"
                  mr={3}
                  onClick={() => {
                    handleUpdateStatus(modalData._id, updates);
                    onCloseReportDetails();
                  }}
                >
                  Update Report
                </Button>
                <Button colorScheme="red" onClick={() => onOpenConfirm()}>
                  Delete Report
                </Button>
              </ModalFooter>
            )}
          </ModalContent>
        </Modal>
      )}

      <Modal isOpen={isOpenConfirm} onClose={onCloseConfirm} isCentered>
        <ModalOverlay />

        <ModalContent minW={"20%"}>
          <ModalHeader>Delete Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction={"row"}>
              <Stack direction={"column"} className="mb-4 w-full">
                <Text className="text-sm font-semibold">
                  Are you sure you want to delete this report?
                </Text>
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseConfirm}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDeleteClick(modalData._id);
                onCloseReportDetails();
                onCloseConfirm();
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default transparencyBoard;
