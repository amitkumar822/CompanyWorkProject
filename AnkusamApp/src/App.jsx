import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import VehiLogUserContextProvider from "./context/vehicleLoginUser/VehiLogUserContextProvider";
import BusiLoginContextProvider from "./context/BusinessLoginUser/BusiLoginContextProvider";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <BusiLoginContextProvider>
        <VehiLogUserContextProvider>
          <Header />
          <Outlet />
          <Footer />
        </VehiLogUserContextProvider>
      </BusiLoginContextProvider>
    </>
  );
}

export default App;
