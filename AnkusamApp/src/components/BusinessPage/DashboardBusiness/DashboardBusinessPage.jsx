import React from "react";
import { CgProfile } from "react-icons/cg";
import { RiShieldUserFill } from "react-icons/ri";
import { FaMobileRetro, FaTruckFast } from "react-icons/fa6";
import { GiMineTruck } from "react-icons/gi";
import { FaTruckLoading } from "react-icons/fa";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

function DashboardBusinessPage() {
  return (
    <>
      <div className="w-full mx-auto mt-16 h-screen">
        <div className="w-full mx-auto grid grid-cols-[20%_auto]">
          {/* Left dashboard section */}
          <div className=" h-screen pt-6 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ">
            <div className="w-full h-11 mx-auto mt-2 relative">
              {/* Profile section */}
              <div className="w-[70px] mx-auto h-[70px] rounded-full flex items-center justify-center">
                <CgProfile className="text-[70px] text-white absolute cursor-pointer" />
                <h1 className="text-xl font-bold relative pt-24 cursor-pointer text-white hover:text-[yellow] hover:underline duration-200">
                  Profile
                </h1>
                <hr />
              </div>

              {/*After login User details show */}
              <div className="w-full mx-auto mt-12 text-center">
                {/* user id */}
                <div>
                  <h1 className="text-lg flex items-center justify-center gap-1">
                    <RiShieldUserFill className="inline text-[#8dfc42] text-[20px]" />
                    <span className=" font-bold text-white uppercase">
                      UserId:
                    </span>{" "}
                    <span className=" font-semibold text-[18px] text-[yellow]">
                      C1245DK64
                    </span>
                  </h1>
                </div>
                {/* user number */}
                <div>
                  <h1 className="text-lg flex items-center justify-center gap-1">
                    <FaMobileRetro className="inline ml-3 text-[#8dfc42] text-[20px]" />
                    <span className=" font-bold text-white uppercase">
                      Number:
                    </span>{" "}
                    <a
                      href="tel:6123456789"
                      className=" font-semibold text-[17px] text-[yellow] cursor-pointer"
                    >
                      6123456789
                    </a>
                  </h1>
                  <hr className="mt-4" />
                </div>
                {/* Post Load Availabity */}
                <div className="ml-[18%]">
                  <div className="mt-4 flex items-center">
                    <GiMineTruck className="inline mr-2 text-[#8dfc42] text-[25px]" />
                    <h1 className="text-lg font-semibold capitalize cursor-pointer text-white hover:text-[yellow] hover:underline duration-300 hover:scale-105">
                     <Link to='postnewload'> Post your new load</Link>
                    </h1>
                  </div>
                  <hr className="w-full ml-auto border-dashed" />
                  {/* Check your load */}
                  <div className="mt-4 flex items-center">
                    <FaTruckLoading className="inline mr-2 text-[#8dfc42] text-[25px]" />
                    <h1 className="text-lg font-semibold capitalize cursor-pointer text-white hover:text-[yellow] hover:underline duration-300 hover:scale-105">
                      Check load
                    </h1>
                  </div>
                  <hr className="w-full ml-auto border-dashed" />
                  {/* CHECK AVAILABLE VEHICLES */}
                  <div className="mt-4 flex items-center">
                    <FaTruckFast className="inline mr-2 text-[#8dfc42] text-[25px]" />
                    <h1 className="text-lg font-semibold capitalize cursor-pointer text-white hover:text-[yellow] hover:underline duration-300 hover:scale-105">
                    Check Available Vehicles
                    </h1>
                  </div>
                  <hr className="w-full ml-auto border-dashed" />
                </div>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="h-screen bg-green-400">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardBusinessPage;
