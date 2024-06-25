import React from "react";
import AnkusamLogo from "../../data/Photos/Logo/AnkusamLogo.png";
import { PiUserPlusBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import LogOut from "../LoginPage/LogOut";

function Header() {
  return (
    <>
      <div className="w-full bg-[#b69deb] fixed top-0 left-0 right-0 z-50">
        <div className="w-[90%] mx-auto flex justify-between items-center">
          {/* Logo */}
          <div>
            <img src={AnkusamLogo} className="w-[69px]" />
          </div>
          {/* content box */}
          <div className=" flex items-center justify-center text-xl font-semibold gap-4 uppercase italic">
            <span className=" cursor-pointer hover:text-gray-700 duration-200">
              <NavLink
                to="/addnewshaopkeepersdetails"
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
                {localStorage.getItem('LoginToken') ? <LogOut /> : 'Login'}
                {/* Login */}
              </NavLink>
            </span>
          </div>
        </div>
      </div>
      {/* <div className="w-full mt-16  "></div> */}
    </>
  );
}

export default Header;
