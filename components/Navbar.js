import { Flex, Container, Button, Stack, Text, color } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useMediaQuery } from "@chakra-ui/react";
import Logo from "../assets/citizen-speak-logo.png";
import Image from "next/image";
import { useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";
import useUrlPaths from "../utils/useCurrentUrl";
import { useScrollPosition } from "../utils/useScrollPosition";
import useUsernameStore from "../store/useUsernameStore";
import { BsPersonCircle } from "react-icons/bs";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [nav, setNav] = useState(false);
  const handleToggle = () => setNav((prev) => !prev);
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const { currentUsername, setCurrentUsername, userType, setUserType } =
    useUsernameStore();

  const currentUrl = useUrlPaths();
  const scrollPosition = useScrollPosition();

  return (
    <Container
      maxW={"100vw"}
      className={`h-[100px] flex justify-center transition-all fixed z-50 ${
        scrollPosition > 100 ? "shadow-lg" : ""
      }`}
      bg={"blue.800"}
      color={"white"}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        className={`max-w-[1440px] h-[100%] w-[100%] ${
          isLessThan768 ? "px-0 " : "px-0"
        } `}
      >
        <Link href="/">
          <div className={`flex items-center gap-[12px]  `}>
            <div>
              <Image src={Logo} alt="Scream Your Heart Out" height={40}></Image>
            </div>
            <h1 className="text-xl hidden lg:block font-semibold">
              Citizen Speak!
            </h1>
          </div>
        </Link>
        <div className="hidden md:block font-semibold">
          <Stack direction="row" spacing={8} alignItems={"center"}>
            <Link
              href="/transparency-board"
              className={`${
                currentUrl === "transparency-board" ? "text-orange-300" : ""
              }`}
            >
              Transparency Board
            </Link>
            {/* <Link
              href="/analytics"
              className={`${
                currentUrl === "analytics" ? "text-orange-300" : ""
              }`}
            >
              Analytics
            </Link> */}
            <Link href="/write-report">
              <Button
                color={"white"}
                bg={"orange.400"}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "orange.500",
                }}
              >
                File a Report
              </Button>
            </Link>
            {userType === "admin" && (
              <Menu placement="bottom-end">
                <MenuButton>
                  <IconButton
                    as={BsPersonCircle}
                    size={"sm"}
                    bgColor="transparent"
                    _hover={{ bgColor: "transparent" }}
                  ></IconButton>
                </MenuButton>
                <MenuList>
                  <Text
                    className={`p-3 font-normal ${
                      colorMode === "light" ? "text-black" : "text-white"
                    }`}
                  >
                    Welcome, {currentUsername}!
                  </Text>
                  <MenuItem
                    color={colorMode === "light" ? "black" : "white"}
                    className={`font-normal `}
                    onClick={() => {
                      window.localStorage.removeItem("citizenSpeakUser");
                      window.localStorage.removeItem("citizenSpeakUserType");
                      setCurrentUsername(null);
                      setUserType(null);
                      window.location.reload();
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Stack>
        </div>

        <div className="md:hidden flex gap-3 fixed z-50 right-5">
          <div
            onClick={handleToggle}
            className={`md:hidden z-50 cursor-pointer ${
              nav ? "text-black" : "text-white"
            }`}
          >
            {!nav ? (
              <Icon as={AiOutlineMenu} boxSize="6" />
            ) : (
              <Icon as={AiOutlineClose} boxSize="6" />
            )}
          </div>
        </div>

        <div
          className={`${
            !nav
              ? "hidden"
              : "fixed top-0 left-0 w-full h-screen flex flex-col justify-start items-center text-center md:hidden z-40 bg-white text-black "
          }`}
        >
          <Stack
            spacing={8}
            alignItems={"center"}
            justifyContent={"center"}
            mt="200px"
            fontSize={"2xl"}
          >
            <Link
              href="/transparency-board"
              onClick={() => {
                setTimeout(setNav(!nav), 500);
              }}
            >
              Transparency Board
            </Link>
            {/* <Link
              href="/analytics"
              onClick={() => {
                setTimeout(setNav(!nav), 500);
              }}
            >
              Analytics
            </Link> */}

            <Link
              href="/write-report"
              onClick={() => {
                setTimeout(setNav(!nav), 500);
              }}
            >
              <Button
                color={"white"}
                bg={"orange.600"}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "orange.500",
                }}
              >
                File a Report
              </Button>
            </Link>
          </Stack>
        </div>
      </Flex>
    </Container>
  );
}

export default Navbar;
