import React, { useState } from "react";
import "./Header.css";
import { Logo } from "../../../public/Photo/PhotosExport";
import { IoIosArrowDown, IoMdCloseCircle } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import { FcGlobe } from "react-icons/fc";

function Header() {
  const [registerClickBox, setRegisterClickBox] = useState(false);
  const [loginClickBox, setLoginClickBox] = useState(false);

  const handleRegisterClick = (event) => {
    setRegisterClickBox(!registerClickBox);
    setLoginClickBox(false);
    event.stopPropagation();
  };

  const handleLoginClick = (event) => {
    setLoginClickBox(!loginClickBox);
    setRegisterClickBox(false);
    event.stopPropagation();
  };

  const disableFullPageClick = () => {
    setRegisterClickBox(false);
    setLoginClickBox(false);
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
      <div>
        <div
          onClick={disableFullPageClick}
          className={`w-full h-[68px] bg-blue-600 mx-auto flex justify-center items-center fixed z-[11] top-0 left-0`}
        >
          <div className="w-[80%] mx-auto flex justify-between items-center">
            {/*👉 Logo Section */}
            <div className="w-[72px] overflow-hidden">
              <img
                className="scale-125 cursor-pointer text-[13px] text-white font-semibold"
                src={Logo}
                alt="ankusam logistics"
              />
            </div>

            {/*👉 Menu Section  */}
            <div>
              <ul className="md:flex gap-3 text-white text-lg hidden">
                <li
                  className=" cursor-pointer hover:text-[#d8d4d4] duration-300 relative flex items-center gap-1"
                  onClick={(event) => handleRegisterClick(event)}
                >
                  REGISTRATION{" "}
                  <IoIosArrowDown
                    className={`${
                      registerClickBox ? " rotate-180" : ""
                    } duration-300`}
                  />
                </li>
                <div className={`absolute ${registerClickBox ? "" : "hidden"}`}>
                  <RegistrationClickBox />
                </div>
                <li
                  className=" cursor-pointer hover:text-[#d8d4d4] duration-300 relative flex items-center gap-1"
                  onClick={(event) => handleLoginClick(event)}
                >
                  LOGIN{" "}
                  <IoIosArrowDown
                    className={`${
                      loginClickBox ? " rotate-180" : ""
                    } duration-300`}
                  />
                </li>
                <div className={`absolute ${loginClickBox ? "" : "hidden"}`}>
                  <LoginClickBox />
                </div>
                <li className=" cursor-pointer hover:text-[#d8d4d4] duration-300">
                  AVAILABLE LOAD
                </li>
                <li className=" cursor-pointer hover:text-[#d8d4d4] duration-300">
                  CONTACT US
                </li>
              </ul>
              {/*👉 Menu button */}
              <ul className=" text-white items-center md:hidden">
                <li className=" cursor-pointer text-4xl mr-6">
                  <IoMenuSharp onClick={handleSlideMenu} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      {/*👉 Slide menu section */}
      <div
        className={`back-overlay w-full h-screen top-0 fixed z-10 cursor-pointer ${
          toggleSlide ? "" : "hidden"
        }`}
        onClick={handleSlideMenu}
      >
        <div
          className="w-[320px] h-screen bg-white pt-12 pl-6 md:hidden"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex justify-end mr-10">
            <IoMdCloseCircle
              onClick={handleSlideButtonClick}
              className="text-4xl mb-8 text-gray-400 hover:text-red-400"
            />
          </div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <FcGlobe     />
            <h1>EXPLORE Menu</h1>
          </div>
          <ul className="pl-6">
            <li
              className="text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick}
            >
                <h1>Item1</h1>
              {/* <Link to="">Available Load</Link> */}
            </li>
            <li
              className="text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick}
            >
                <h1>Item1</h1>
              {/* <Link to="/businesssignup">Business People</Link> */}
            </li>
            <li
              className="text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick}
            >
                <h1>Item3</h1>
              {/* <Link to="/vehiclesignup">Driver Registration</Link> */}
            </li>
            <li
              className="text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick}
            >
                <h1>Business Login</h1>
              {/* <Link to="/businesslogin">Business Login</Link> */}
            </li>
            <li
              className="text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick}
            >
                <h1>Vehical Login</h1>
              {/* <Link to="/vehiclelogin">vehicle Login</Link> */}
            </li>
            <li
              className="text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick}
            >
                <h1>Contact</h1>
              {/* <Link to="/contactus">Contact Us</Link> */}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

const RegistrationClickBox = ({ data1, data2, left }) => {
  return (
    <>
      <div
        className={`flex w-[210px] h-[97px] bg-white px-2 text-black absolute top-9 left-[-40px] rounded-lg items-center shadow-md shadow-gray-800 justify-center`}
      >
        <div>
          <ul className="leading-8">
            <li className=" cursor-pointer hover:text-[#686969]">
              <h1>BUSINESS PEOPLE</h1>
              {/* <Link to="/businesssignup">{data1}</Link> */}
            </li>
            <li className=" cursor-pointer hover:text-[#686969]">
              <h1>DRIVER REGISTRATION</h1>
              {/* <Link to="/vehiclesignup">{data2}</Link> */}
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
        className={`flex w-[183px] h-[97px] bg-white text-black absolute top-9 left-[100px] rounded-lg items-center  shadow-md shadow-gray-800 justify-center`}
      >
        <div>
          <ul className="leading-8">
            <li className=" cursor-pointer hover:text-[#686969]">
              <h1>BUSINESS LOGIN</h1>
              {/* <Link to="/businesslogin">{data1}</Link> */}
            </li>
            <li className=" cursor-pointer hover:text-[#686969]">
              <h1>VEHICLE LOGIN</h1>
              {/* <Link to="/vehiclelogin">{data2}</Link> */}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
