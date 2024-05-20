import React, { useState } from "react"; // Import React and useState hook
import { Logo } from "../../../public/Photo/PhotosExport"; // Import Logo image
import { IoIosArrowDown, IoMdCloseCircle } from "react-icons/io"; // Import arrow down and close circle icons
import { IoMenuSharp } from "react-icons/io5"; // Import menu icon
import { FcGlobe } from "react-icons/fc"; // Import globe icon
import { Link } from "react-router-dom"; // Import Link component for navigation

function Header() {
  const [registerClickBox, setRegisterClickBox] = useState(false); // State to toggle registration box visibility
  const [loginClickBox, setLoginClickBox] = useState(false); // State to toggle login box visibility

  const handleRegisterClick = (event) => {
    setRegisterClickBox(!registerClickBox); // Toggle registration box visibility
    setLoginClickBox(false); // Hide login box
    event.stopPropagation(); // Prevent event bubbling
  };

  const handleLoginClick = (event) => {
    setLoginClickBox(!loginClickBox); // Toggle login box visibility
    setRegisterClickBox(false); // Hide registration box
    event.stopPropagation(); // Prevent event bubbling
  };

  const disableFullPageClick = () => {
    setRegisterClickBox(false); // Hide registration box
    setLoginClickBox(false); // Hide login box
  };

  const [toggleSlide, setToggleSlide] = useState(false); // State to toggle slide menu visibility
  const handleSlideMenu = () => {
    setToggleSlide(!toggleSlide); // Toggle slide menu visibility
  };

  const handleSlideButtonClick = () => {
    setToggleSlide(false); // Hide slide menu
  };

  return (
    <>
      <div>
        <div
          onClick={disableFullPageClick} // Hide both boxes when clicking outside
          className={`w-full h-[68px] bg-blue-600 mx-auto flex justify-center items-center fixed z-[11] top-0 left-0`}
        >
          <div className="w-[80%] mx-auto flex justify-between items-center">
            {/* 👉 Logo Section */}
            <div className="w-[72px] overflow-hidden">
              <Link to=''>
                <img
                  className="scale-125 cursor-pointer text-[13px] text-white font-semibold"
                  src={Logo} // Logo image source
                  alt="ankusam logistics"
                />
              </Link>
            </div>

            {/* 👉 Menu Section  */}
            <div>
              <ul className="md:flex gap-3 text-white text-lg hidden">
                <li
                  className=" cursor-pointer uppercase hover:text-[#d8d4d4] duration-300 relative flex items-center gap-1"
                >
                  <Link to='/dashboard'>
                    Dashboard
                  </Link>
                </li>

                <li
                  className=" cursor-pointer hover:text-[#d8d4d4] duration-300 relative flex items-center gap-1"
                  onClick={(event) => handleRegisterClick(event)} // Show registration box
                >
                  REGISTRATION{" "}
                  <IoIosArrowDown
                    className={`${registerClickBox ? " rotate-180" : ""} duration-300`} // Rotate arrow if box is visible
                  />
                </li>
                <div className={`absolute ${registerClickBox ? "" : "hidden"}`}> 
                  <RegistrationClickBox />
                </div>
                <li
                  className=" cursor-pointer hover:text-[#d8d4d4] duration-300 relative flex items-center gap-1"
                  onClick={(event) => handleLoginClick(event)} // Show login box
                >
                  LOGIN{" "}
                  <IoIosArrowDown
                    className={`${loginClickBox ? " rotate-180" : ""} duration-300`} // Rotate arrow if box is visible
                  />
                </li>
                
                <div className={`absolute ${loginClickBox ? "" : "hidden"}`}> 
                  <LoginClickBox />
                </div>
                <li className=" cursor-pointer hover:text-[#d8d4d4] duration-300">
                  AVAILABLE LOAD
                </li>
                <li className=" cursor-pointer hover:text-[#d8d4d4] duration-300">
                  <Link to='/contactus'>
                    CONTACT US
                  </Link>
                </li>
              </ul>
              {/* 👉 Menu button */}
              <ul className=" text-white items-center md:hidden">
                <li className=" cursor-pointer text-4xl mr-6">
                  <IoMenuSharp onClick={handleSlideMenu} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 👉 Slide or Sidebar menu section */}
      <div
        className={`back-overlay w-full h-screen top-0 fixed z-10 cursor-pointer ${toggleSlide ? "" : "hidden"}`} // Slide menu visibility
        onClick={handleSlideMenu} // Hide slide menu on outside click
      >
        <div
          className="w-[320px] h-screen bg-white pt-12 pl-6 md:hidden"
          onClick={(event) => event.stopPropagation()} // Prevent event bubbling
        >
          <div className="flex justify-end mr-10">
            <IoMdCloseCircle
              onClick={handleSlideButtonClick} // Hide slide menu on close button click
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
              onClick={handleSlideButtonClick} // Hide slide menu on item click
            >
              <Link to="">Available Load</Link>
            </li>
            <li
              className="text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick} // Hide slide menu on item click
            >
              <Link to="/businesssignup">Business People</Link>
            </li>
            <li
              className="text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick} // Hide slide menu on item click
            >
              <Link to="/vehiclesignup">Driver Registration</Link>
            </li>
            <li
              className="text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick} // Hide slide menu on item click
            >
              <Link to="/businesslogin">Business Login</Link>
            </li>
            <li
              className="text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick} // Hide slide menu on item click
            >
              <Link to="/vehiclelogin">vehicle Login</Link>
            </li>
            <li
              className="text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick} // Hide slide menu on item click
            >
              <h1>Contact</h1>
              <Link to="/contactus">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

const RegistrationClickBox = () => {
  return (
    <>
      <div
        className={`flex w-[210px] h-[97px] bg-white px-2 text-black absolute top-9 left-[-40px] rounded-lg items-center shadow-md shadow-gray-800 justify-center`}
      >
        <div>
          <ul className="leading-8">
            <li className=" cursor-pointer hover:text-[#686969]">
              <Link to="/businesssignup">BUSINESS PEOPLE</Link>
            </li>
            <li className=" cursor-pointer hover:text-[#686969]">
              <Link to="/vehiclesignup">DRIVER REGISTRATION</Link>
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
              <Link to="/businesslogin">BUSINESS LOGIN</Link>
            </li>
            <li className=" cursor-pointer hover:text-[#686969]">
              <Link to="/vehiclelogin">VEHICLE LOGIN</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header; // Export Header component
