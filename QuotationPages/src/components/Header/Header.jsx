import React, { useEffect, useState } from "react";
import AnkusamLogo from "../../data/Photos/Logo/AnkusamLogo.png";
import { PiUserPlusBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import LogOut from "../LogInLogOutPages/LogOut";

function Header() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <div className="w-full fixed top-0 left-0 right-0 z-50 bg-[#17e7a4]">
        <div className="w-[95%] mx-auto flex justify-between items-center">
          {/* Logo */}
          <div>
            <img src={AnkusamLogo} className="w-[69px] ml-[80%]" />
          </div>
          {/* content box */}
          <div className=" flex items-center justify-center text-[18px] font-semibold gap-4 uppercase italic">
            <span
              className={`cursor-pointer hover:text-gray-700 duration-200 `}
            >
              <NavLink
                to="/createquotation"
                className={({ isActive }) =>
                  isActive ? "text-[blue] underline" : ""
                }
              >
                Quotation
              </NavLink>
            </span>

            <span className=" cursor-pointer hover:text-gray-700 duration-200">
              <NavLink
                to="/addshopkeeper"
                className={({ isActive }) =>
                  isActive ? "text-[blue] underline" : ""
                }
              >
                <PiUserPlusBold
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                />
              </NavLink>
              {showTooltip && (
                <div className="absolute right-0 top-12 mr-44 px-2 py-1 bg-gray-200 text-sm text-gray-700 rounded-md shadow-lg z-10 text-[12px] capitalize">
                  You can add Customer Details.
                </div>
              )}
            </span>
            <span className={`cursor-pointer hover:text-gray-700 duration-200`}>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-[blue] underline" : ""
                }
              >
                Dashboard
              </NavLink>
            </span>
            <span className=" cursor-pointer hover:text-gray-700 duration-200">
              <NavLink
                to=""
                className={({ isActive }) =>
                  isActive ? "text-[blue] underline" : ""
                }
              >
                {localStorage.getItem("LoginQuotationToken") ? (
                  <LogOut />
                ) : (
                  "Login"
                )}
                {/* Login */}
              </NavLink>
            </span>
          </div>
        </div>
      </div>
      <div className="pt-16"></div>
    </>
  );
}

export default Header;
