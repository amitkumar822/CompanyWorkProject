import React, { useEffect, useState } from "react";
import AnkusamLogo from "../../data/Photos/Logo/AnkusamLogo.png";
import { PiUserPlusBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import LogOut from "../LogInLogOutPages/LogOut";

function Header() {
  return (
    <>
      <div className="w-full bg-[#b69deb] fixed top-0 left-0 right-0 z-50">
        <div className="w-[95%] mx-auto flex justify-between items-center">
          {/* Logo */}
          <div>
            <img src={AnkusamLogo} className="w-[69px] ml-[80%]" />
          </div>
          {/* content box */}
          <div className=" flex items-center justify-center text-[18px] font-semibold gap-4 uppercase italic">
            <span className={`cursor-pointer hover:text-gray-700 duration-200`}>
              <NavLink
                to="/createquotation"
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                Quotation
              </NavLink>
            </span>

            <span className=" cursor-pointer hover:text-gray-700 duration-200">
              <NavLink
                to="/addshopkeeper"
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                <PiUserPlusBold />
              </NavLink>
            </span>
            <span className=" cursor-pointer hover:text-gray-700 duration-200">
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                Dashboard
              </NavLink>
            </span>
            <span className=" cursor-pointer hover:text-gray-700 duration-200">
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                {localStorage.getItem("LoginQuotationToken") ? <LogOut /> : "Login"}
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
