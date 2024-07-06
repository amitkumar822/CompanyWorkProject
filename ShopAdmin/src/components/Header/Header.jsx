import React, { useEffect, useState } from "react";
import AnkusamLogo from "../../data/Photos/Logo/AnkusamLogo.png";
import { PiUserPlusBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import LogOut from "../LoginPage/LogOut";

function Header() {
  const [userValidation, setUserValidation] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("UserValidation");
    if (user) {
      setUserValidation(user);
    } else {
      setUserValidation(null);
    }
  }, [setUserValidation]);

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
            <span className={`cursor-pointer hover:text-gray-700 duration-200 underline ${userValidation === "admin" ? '' : 'hidden'}`}>
              <NavLink
                to="/watingfroaprovallist"
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                WPoL
              </NavLink>
            </span>
            <span className=" cursor-pointer hover:text-gray-700 duration-200">
              <NavLink
                to="/checkyourcreatedpolist"
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                CYPL
              </NavLink>
            </span>
            <span className=" cursor-pointer hover:text-gray-700 duration-200">
              <NavLink
                to="/rejectedpolist"
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                RPOL
              </NavLink>
            </span>
            <span className=" cursor-pointer hover:text-gray-700 duration-200">
              <NavLink
                to="/createdpoinvoice"
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                CRPO
              </NavLink>
            </span>
            <span className=" cursor-pointer hover:text-gray-700 duration-200">
              <NavLink
                to="/openpo"
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                OpenPo
              </NavLink>
            </span>
            <span className=" cursor-pointer hover:text-gray-700 duration-200">
              <NavLink
                to="/closepo"
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                CloPo
              </NavLink>
            </span>
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
                {localStorage.getItem("LoginToken") ? <LogOut /> : "Login"}
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
