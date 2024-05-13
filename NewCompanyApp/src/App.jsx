import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ContactUs from "./components/ContactUs/ContactUs";
import MainSection from "./components/MainSection/MainSection";
import IronProduct from "./components/Product/IronProduct";
import ViewCompanyMachine from "./components/Product/ViewCompanyMachine";
import AboutUs from "./components/AboutUs/AboutUs";
import AOS from "aos";
import "aos/dist/aos.css";
import ServiceExplore from "./components/ServiceProvideAllIndia/ServiceExplore";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className=" overflow-hidden">
      <Header />
      <MainSection />
      <IronProduct />
      <ViewCompanyMachine />
      <AboutUs />
      <ServiceExplore />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default App;
