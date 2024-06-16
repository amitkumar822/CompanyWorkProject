import React from "react";
import Banner from "../Banner/Banner";
import BannerButtomUp from "../BannerButtomUp/BannerButtomUp";
import AvailableLoad from "../../AvailableLoad/AvailableLoad";
import MobileNumberPopup from "../MobileNumberPopup/MobileNumberPopup";

function Home() {
  return (
    <>
      <Banner />
      <MobileNumberPopup />
      <AvailableLoad />
      <BannerButtomUp />
    </>
  );
}

export default Home;
