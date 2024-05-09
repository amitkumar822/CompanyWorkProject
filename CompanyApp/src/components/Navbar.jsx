import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { FcGlobe } from "react-icons/fc";
import { IoMdCloseCircle } from "react-icons/io";




function Navbar() {
  const [regClicks, setRegClicks] = useState(false);
  const [logClicks, setLogClicks] = useState(false);

  const handleRegClicks = (ev) => {
    setRegClicks(!regClicks);
    setLogClicks(false);
    ev.stopPropagation();
  };

  const handleLogClicks = (ev) => {
    setLogClicks(!logClicks);
    setRegClicks(false);
    ev.stopPropagation();
  };

  const disableFullPageClick = () => {
    setRegClicks(false);
    setLogClicks(false);
  };

  const [toggleSlide, setToggleSlide] = useState(false);
  const handleSlideMenu = () => {
    setToggleSlide(!toggleSlide);
  };

  const handleSlideButtonClick = () => {
    setToggleSlide(false);
  };

  return (
    <>
      <div
        className=" w-full bg-[#002E5F] fixed top-0 z-[2]"
        onClick={disableFullPageClick}
      >
        <div className=" md:w-[85%] w-full h-[66px] mx-auto bg-[#002E5F] flex items-center justify-around">
          {/* Logo Section */}
          <div className="md:w-[70px] w-full ml-6">
            <img
              className="md:w-[60px] w-[55px] py-2"
              src="https://www.ankusamlogistics.com/include/assest/images/header_logo_one.svg"
              alt=""
            />
          </div>

          {/* Navbar Section */}
          <div className="flex">
            <ul className="md:flex text-white gap-5 hidden ">
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
                <Link to="">AVAILABLE LOAD</Link>
              </li>
              <li className=" cursor-pointer hover:text-[red]  duration-500">
                <Link to="/contactus">CONTACT US</Link>
              </li>
            </ul>
            {/* Menu button */}
            <ul className=" text-white items-center md:hidden">
              <li className=" cursor-pointer text-4xl mr-6">
                <IoMenuSharp onClick={handleSlideMenu} />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/*👉 Slide menu section */}
      <div
        className={`back-overlay w-full h-screen fixed z-10 cursor-pointer ${
          toggleSlide ? "" : "hidden"
        }`}
        onClick={handleSlideMenu}
      >
        <div
          className="w-[320px] h-screen bg-white pt-12 pl-6"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex justify-end mr-10">
            <IoMdCloseCircle
              onClick={handleSlideButtonClick}
              className="text-4xl mb-8 text-gray-400 hover:text-red-400"
            />
          </div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <FcGlobe />
            <h1>EXPLORE Menu</h1>
          </div>
          <ul className="pl-6">
            <li
              className="text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick}
            >
              <Link to="">Available Load</Link>
            </li>
            <li
              className="text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick}
            >
              <Link to="/businesssignup">Business People</Link>
            </li>
            <li
              className="text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick}
            >
              <Link to="/vehiclesignup">Driver Registration</Link>
            </li>
            <li
              className="text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick}
            >
              <Link to="/businesslogin">Business Login</Link>
            </li>
            <li
              className="text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick}
            >
              <Link to="/vehiclelogin">vehicle Login</Link>
            </li>
            <li
              className="text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick}
            >
              <Link to="/contactus">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
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
              <Link to="/businesssignup">{data1}</Link>
            </li>
            <li className=" cursor-pointer hover:text-[#686969]">
              <Link to="/vehiclesignup">{data2}</Link>
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
              <Link to="/businesslogin">{data1}</Link>
            </li>
            <li className=" cursor-pointer hover:text-[#686969]">
              <Link to="/vehiclelogin">{data2}</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
