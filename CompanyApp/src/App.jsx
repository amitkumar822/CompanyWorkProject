import React from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Filtersection from "./components/Filtersection";
import Loadlist from "./components/Loadlist";

function App() {
  return (
    <>
      <div className="w-full h-full bg-[#F1F2F4] mb-20">
        <Navbar />
        <Banner />
        <Filtersection />
        <Loadlist />
      </div>
    </>
  );
}

export default App;
