import React from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Filtersection from "./components/Filtersection";
import Loadlist from "./components/Loadlist";
import SaveWorldbyrecycling from "./components/SaveWorldbyrecycling";
import AboutQuickLocation from "./components/AboutQuickLocation";

function App() {
  return (
    <>
      <div className="w-full h-full bg-[#F1F2F4]">
        <Navbar />
        <Banner />
        <Filtersection />
        <Loadlist />
        <SaveWorldbyrecycling />
        <AboutQuickLocation />
      </div>
    </>
  );
}

export default App;
