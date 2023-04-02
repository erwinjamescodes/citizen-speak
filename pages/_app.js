import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useUrlPaths from "../utils/useCurrentUrl";

export default function App({ Component, pageProps }) {
  const currentUrl = useUrlPaths();
  return (
    <ChakraProvider>
      {currentUrl !== "login" && <Navbar />}
      <Component {...pageProps} />
      {currentUrl !== "login" && <Footer />}
    </ChakraProvider>
  );
}
