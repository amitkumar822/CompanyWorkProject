import React from "react";
import AnkusamLogo from "../../data/Photos/AnkusamLogo.png";

function Header() {
  return (
    <>
      <div className="w-full bg-[#b69deb] fixed top-0 left-0 right-0">
        <div className="w-[90%] mx-auto flex justify-between items-center">
          {/* Logo */}
          <div>
            <img src={AnkusamLogo} className="w-[69px]" />
          </div>
          {/* content box */}
          <div className=" flex items-center justify-center text-xl font-semibold gap-4 uppercase italic">
            <span className=" cursor-pointer hover:text-gray-700 duration-200">Dashboard</span>
            <span className=" cursor-pointer hover:text-gray-700 duration-200">Add Items</span>
            <span className=" cursor-pointer hover:text-gray-700 duration-200">Login</span>
          </div>
        </div>
      </div>
      <div className="w-full mt-16"></div>
    </>
  );
}

export default Header;
