import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

function Navbar() {
  const [regClicks, setRegClicks] = useState(false);
  const [logClicks, setLogClicks] = useState(false);

  const handleRegClicks = (ev) => {
    setRegClicks(!regClicks);
    setLogClicks(false)
    ev.stopPropagation();
  };
  
  const handleLogClicks = (ev) => {
    setLogClicks(!logClicks);
    setRegClicks(false)
    ev.stopPropagation();
  };

  const disableFullPageClick = () => {
    setRegClicks(false);
    setLogClicks(false)
  };

  return (
    <>
      {/* <div className=" w-full h-screen z-1"
       onClick={disableFullPageClick}
      > */}
        <div className=" w-full bg-[#002E5F]"
        onClick={disableFullPageClick}
         >
          <div
            className=" w-[85%] h-[66px] mx-auto bg-[#002E5F] flex items-center justify-around"
           
          >
            {/* Logo Section */}
            <div className=" w-[80px]">
              <img
                className="w-[75px] py-2"
                src="https://www.ankusamlogistics.com/include/assest/images/header_logo_one.svg"
                alt=""
              />
            </div>

            {/* Navbar Section */}
            <div className="">
              <ul className=" flex text-white gap-5 ">
                <li
                  onClick={(ev) => handleRegClicks(ev)}
                  className="flex items-center gap-1 cursor-pointer hover:text-[red] duration-500 relative"
                >
                  REGISTRATION <IoIosArrowDown className="text-[18px]" />
                </li>
                <div className={`absolute ${regClicks ? "" : "hidden"}`}>
                  <Registration
                    data1={"BUSINESS PEOPLE"}
                    data2={"DRIVER REGISTRATION"}
                    left={-40}
                  />
                </div>
                <li
                  className="flex items-center gap-1 cursor-pointer hover:text-[red]  duration-500 relative"
                  onClick={(ev) => handleLogClicks(ev)}
                >
                  LOGIN <IoIosArrowDown className="text-[18px]" />{" "}
                </li>
                <div className={`absolute ${logClicks ? "" : "hidden"}`}>
                  <LoginClickBox
                    data1={"BUSINESS LOGIN"}
                    data2={"VEHICLE LOGIN"}
                  />
                </div>
                <li className=" cursor-pointer hover:text-[red]  duration-500">
                  AVAILABLE LOAD
                </li>
                <li className=" cursor-pointer hover:text-[red]  duration-500">
                  CONTACT US
                </li>
              </ul>
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}

const Registration = ({ data1, data2, left }) => {
  return (
    <>
      <div
        className={`flex w-[183px] h-[97px] bg-white text-black absolute top-10 left-[${left}px] rounded-lg items-center shadow-2xl justify-center`}
      >
        <div>
          <ul className="leading-8">
            <li className=" cursor-pointer hover:text-[#686969]">
              {data1}
            </li>
            <li className=" cursor-pointer hover:text-[#686969]">
              {data2}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};


const LoginClickBox = ({ data1, data2 }) => {
  return (
    <>
      <div
        className={`flex w-[183px] h-[97px] bg-white text-black absolute top-10 left-[100px] rounded-lg items-center shadow-2xl justify-center`}
      >
        <div>
          <ul className="leading-8">
            <li className=" cursor-pointer hover:text-[#686969]">
              {data1}
            </li>
            <li className=" cursor-pointer hover:text-[#686969]">
              {data2}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};


export default Navbar;
