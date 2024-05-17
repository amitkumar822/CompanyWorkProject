import React from "react";
import MainSection from "../MainSection/MainSection";
import IronProduct from "../Product/IronProduct";
import ViewCompanyMachine from "../Product/ViewCompanyMachine";
import AboutUs from "../AboutUs/AboutUs";
import ServiceExplore from "../ServiceProvideAllIndia/ServiceExplore";
import ContactUs from "../ContactUs/ContactUs";

function Home() {
  return (
    <>
      <MainSection />
      <IronProduct />
      <ViewCompanyMachine />
      <AboutUs />
      <ServiceExplore />
      <ContactUs />
    </>
  );
}

export default Home;
