import React from "react";
import { CgProfile } from "react-icons/cg";
import { RiShieldUserFill } from "react-icons/ri";
import { FaMobileRetro, FaTruckFast } from "react-icons/fa6";
import { GiMineTruck } from "react-icons/gi";
import { FaTruckLoading } from "react-icons/fa";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import SlidebarProfileLeftSection from "./SlidebarProfileLeftSection";

function DashboardBusinessPage() {
  return (
    <>
      <div className="w-full mx-auto mt-16 h-screen">
        <div className="w-full mx-auto flex">
          {/* Left dashboard section */}
            <SlidebarProfileLeftSection />  

          {/*👉 Right section */}
          <div className="w-full h-screen bg-green-400">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardBusinessPage;
