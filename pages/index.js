import React, { useEffect } from "react";
import Head from "next/head";
import HeroSection from "../components/Home/HeroSection";
import Benefits from "../components/Home/Benefits";
import Services from "../components/Home/Services";
import CallToAction from "../components/Home/CallToAction";
import useUsernameStore from "../store/useUsernameStore";

const index = () => {
  
  const { currentUsername, setCurrentUsername, userType, setUserType } =
    useUsernameStore();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUsername(window.localStorage.getItem("citizenSpeakUser"));
      setUserType(window.localStorage.getItem("citizenSpeakUserType"));
    }
  }, [currentUsername]);

  return (
    <>
      <Head>
        <title>Empowered Citizen Initiative</title>
        <meta name="description" content="LGU Complaint Management App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-[100vw] flex justify-center flex-col items-center">
        <HeroSection />
        <Benefits />
        <Services />
        <CallToAction />
      </main>
    </>
  );
};

export default index;
