import React, { useContext, useState } from "react"; // Import React and useState hook
import { IoIosArrowDown, IoMdCloseCircle } from "react-icons/io"; // Import arrow down and close circle icons
import { IoBusiness, IoMenuSharp } from "react-icons/io5"; // Import menu icon
import { FcGlobe } from "react-icons/fc"; // Import globe icon
import { Link, NavLink } from "react-router-dom"; // Import Link component for navigation
import { MdAppRegistration, MdOutlineEventAvailable } from "react-icons/md";
import { TbTruckLoading } from "react-icons/tb";
import { AiFillSound, AiOutlineCluster } from "react-icons/ai";
import { GiMineTruck } from "react-icons/gi";
import { FaTruckMoving, FaUserCog } from "react-icons/fa";
import { RiContactsBook3Line } from "react-icons/ri";
import { FaMobileRetro, FaTruckFast } from "react-icons/fa6";
import { LuUserCircle2 } from "react-icons/lu";
import logo from "../../data/Photo/Logo/AnkusamLogo.png";
import LogOut from "../MainViews/RegLoginSignupPage/LogOut";
//👇 vehicles or business user context global variables access using context
import VehiLogUserContext from "../../context/vehicleLoginUser/VehiLogUserContext";
import BusiLoginContext from "../../context/BusinessLoginUser/BusiLoginContext";

function Header() {
  //👇 global variables access vehicle login user details
  const { vehiLogUser } = useContext(VehiLogUserContext);
  const { busiLogUser } = useContext(BusiLoginContext);

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
          <div className="w-[80%] mx-auto flex justify-between items-center whitespace-nowrap">
            {/* 👉 Logo Section */}
            <div className="w-[72px] overflow-hidden">
              <Link to="">
                <img
                  className="min-scale-125 cursor-pointer text-[13px] text-white font-semibold"
                  src={logo} // Logo image source
                  alt="ankusam logistics"
                />
              </Link>
            </div>

            {/*👉Vehicle or MenuListVehicle login after show */}
            <div
              className={`${
                !localStorage.getItem("TokeLoginVehiPage") && "hidden"
              }`}
            >
              <MenuListVehicleLogin />
            </div>

            {/*👉Business or MenuListBusiness login after show */}
            <div
              className={`${
                !localStorage.getItem("TokenLoginBusinpage") && "hidden"
              }`}
            >
              <MenuListBusinessLogin />
            </div>

            {/* 👉 Main Menu List Section  */}
            <div
              className={`${busiLogUser || vehiLogUser ? "hidden" : undefined}`}
            >
              <ul className="md:flex gap-3 text-white text-lg hidden text-[16px] items-center">
                {/* buginess login user id */}
                {/* <li>{busiLogUser?.name}</li> */}
                {/* Vehicale Login vehical number */}
                {/* <li>{vehiLogUser?.vehical_number}</li> */}
                <li className=" cursor-pointer hover:text-[#d8d4d4] duration-300">
                  <NavLink
                    to=""
                    className={({ isActive }) =>
                      isActive ? "text-[yellow]" : ""
                    }
                  >
                    AVAILABLE LOAD
                  </NavLink>
                </li>
                <li className=" cursor-pointer hover:text-[#d8d4d4] duration-300">
                  <NavLink
                    to="/contactus"
                    className={({ isActive }) =>
                      isActive ? "text-[yellow]" : ""
                    }
                  >
                    CONTACT US
                  </NavLink>
                </li>

                <li
                  className=" cursor-pointer hover:text-[#d8d4d4] duration-300 relative flex items-center gap-1"
                  onClick={(event) => handleRegisterClick(event)} // Show registration box
                >
                  REGISTRATION{" "}
                  <IoIosArrowDown
                    className={`${
                      registerClickBox ? " rotate-180" : ""
                    } duration-300`} // Rotate arrow if box is visible
                  />
                </li>
                <div className={`absolute ${registerClickBox ? "" : "hidden"}`}>
                  <RegistrationClickBox />
                </div>
                <li
                  className=" cursor-pointer hover:text-[#d8d4d4] duration-300 relative flex items-center gap-1"
                  onClick={(event) => handleLoginClick(event)} // Show login box
                >
                  LOGIN
                  <IoIosArrowDown
                    className={`${loginClickBox ? " rotate-180" : ""}
                    ${localStorage.getItem("token") ? "hidden" : ""}
                     duration-300`} // Rotate arrow if box is visible
                  />
                </li>

                <div className={`absolute ${loginClickBox ? "" : "hidden"}`}>
                  <LoginClickBox />
                </div>
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

      {/* 👉Main Slide or Sidebar menu section Before login*/}
      <div
        className={`back-overlay w-full h-screen flex justify-end top-0 fixed z-10 cursor-pointer ${
          toggleSlide ? "" : "hidden"
        }`} // Slide menu visibility
        onClick={handleSlideMenu} // Hide slide menu on outside click
      >
        <div
          className="w-[320px] h-screen bg-white pt-20 pl-6 md:hidden"
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
            <h1>EXPLORE MENU</h1>
          </div>
          <ul className="pl-6">
            <li
              className="flex items-center gap-1 text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick} // Hide slide menu on item click
            >
              <MdOutlineEventAvailable />
              <Link to="">Available Load</Link>
            </li>
            <li
              className="flex items-center gap-1 text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick} // Hide slide menu on item click
            >
              <IoBusiness />
              <Link to="/businesssignup">Business People</Link>
            </li>
            <li
              className="flex items-center gap-1 text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick} // Hide slide menu on item click
            >
              <MdAppRegistration />
              <Link to="/vehiclesignup">Driver Registration</Link>
            </li>
            <li
              className="flex items-center gap-1 text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick} // Hide slide menu on item click
            >
              <AiOutlineCluster />
              <Link to="/businesslogin">Business Login</Link>
            </li>
            <li
              className="flex items-center gap-1 text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick} // Hide slide menu on item click
            >
              <FaTruckMoving />
              <Link to="/vehiclelogin">vehicle Login</Link>
            </li>
            <li
              className="flex items-center gap-1 text-[18px] border-b py-2 cursor-pointer hover:text-[#725377] duration-300 font-serif"
              onClick={handleSlideButtonClick} // Hide slide menu on item click
            >
              <RiContactsBook3Line />
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
        className={`flex w-[210px] h-[97px] bg-white px-2 text-black absolute top-9 left-[270px] rounded-lg items-center shadow-md shadow-gray-800 justify-center`}
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

const LoginClickBox = () => {
  return (
    <>
      <div
        className={`flex w-[183px] h-[97px] bg-white text-black absolute top-9 left-[380px] rounded-lg items-center  shadow-md shadow-gray-800 justify-center`}
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

const MenuListVehicleLogin = () => {
  //👇Context global variables access vehicle login user details
  const { vehiLogUser } = useContext(VehiLogUserContext);

  const [toggleSlide, setToggleSlide] = useState(false);

  return (
    <>
      <div>
        {/* 👉 Menu button */}
        <ul className=" text-white items-center md:hidden">
          <li className=" cursor-pointer text-4xl mr-6">
            <IoMenuSharp onClick={() => setToggleSlide(!toggleSlide)} />
          </li>
        </ul>
      </div>

      <div className=" leading-[21px] items-center gap-4 md:flex hidden">
        <div className="lg:text-[16px] text-[15px]">
          <ul className="flex gap-4 border-b-[1px] text-white uppercase font-semibold">
            {/* <li className="tracking-tight cursor-pointer hover:text-[#c3c2c2] duration-300">
              <NavLink
                to="/contactus"
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                CONTACT US
              </NavLink>
            </li> */}
            <li className="tracking-tight cursor-pointer hover:text-[#c3c2c2] duration-300">
              <NavLink
                to="/loaddatalist"
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                Load List
              </NavLink>
            </li>
            <li className="tracking-tight cursor-pointer hover:text-[#c3c2c2] duration-300">
              <NavLink
                to="/postvehiavai"
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                Post Vehicle Availability
              </NavLink>
            </li>
            <li className="tracking-tight cursor-pointer hover:text-[#c3c2c2] duration-300">
              <NavLink
                to="/vehiprofile"
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                Profile
              </NavLink>
            </li>
          </ul>
          <ul className="text-center">
            <li className=" font-semibold">
              <span className=" text-[#86e852]">
                Welcome:{" "}
                <span className="text-white">{vehiLogUser?.driver_name}</span>
              </span>{" "}
              {/* <span className="text-[#86e852]"> Name: </span>{" "} */}
              <span className="text-white">{vehiLogUser?.name}</span>
              <span className="text-[#86e852]"> Number: </span>{" "}
              <span className="text-white underline">
                <a
                  href={`tel: ${
                    vehiLogUser?.driver_mobile_number || vehiLogUser?.phone
                  }`}
                >
                  {vehiLogUser?.driver_mobile_number || vehiLogUser?.phone}
                </a>
              </span>
            </li>
          </ul>
        </div>
        <LogOut />
      </div>

      {/* Slide bar or MenuList Vehicle Login Slide bar */}
      <div
        className={` fixed w-[300px] overflow-y-auto h-full py-20 px-3 bg-white top-0 z-20 right-0 md:hidden ${
          toggleSlide ? "" : "hidden"
        }`}
      >
        <div
          onClick={() => setToggleSlide(!toggleSlide)}
          className="text-4xl h-full absolute right-6 top-8 cursor-pointer text-orange-600 hover:text-rose-700 duration-300"
        >
          <IoMdCloseCircle />
        </div>
        <div className="flex items-center text-xl font-bold mt-5">
          <FcGlobe className="text-[35px] mr-2" />
          <h1>EXPLORE MENU</h1>
        </div>
        <div className="mt-2 px-4 text-lg ">
          {/* <span className="w-full flex justify-center font-semibold text-2xl text-purple-500 -mt-2 mb-1">Welcome</span> */}
          <div className="flex items-center gap-1 text-orange-600 font-semibold flex-wrap">
            <AiFillSound className="text-[green] mr-1" />
            <span className="text-[#7b7b74] uppercase ml-1">
              {vehiLogUser?.name}
            </span>
          </div>
          <div className="flex items-center gap-1 text-orange-600 font-semibold flex-wrap">
            <FaUserCog className="text-[green] mr-1" />

            <span className="text-[#7b7b74] uppercase ml-1">
              D202400{vehiLogUser?.driver_id}
            </span>
          </div>
          <div className="flex items-center gap-1 text-orange-600 font-semibold flex-wrap">
            <GiMineTruck className="text-[green] mr-1" />

            <span className="text-[#7b7b74] uppercase ml-1">
              {vehiLogUser?.vehicle_number}
            </span>
          </div>
          <hr className=" border-dashed border-[2.3px] my-1" />
          <div className="flex items-center gap-2 font-semibold hover:text-[#6b6a6a] duration-200">
            <LuUserCircle2 className="text-[green]" />
            <Link to="/vehiprofile" onClick={() => setToggleSlide(false)}>
              Profile
            </Link>
          </div>
          <hr className=" border-dashed border-[1.3px] my-1" />
          <div className="flex items-center gap-2 font-semibold hover:text-[#6b6a6a] duration-200">
            <FaTruckFast className="text-[green]" />
            <Link to="/postvehiavai" onClick={() => setToggleSlide(false)}>
              Post Load
            </Link>
          </div>
          <hr className=" border-dashed border-[1.3px] my-1" />
          <div className="flex items-center gap-2 font-semibold hover:text-[#6b6a6a] duration-200">
            <TbTruckLoading className="text-[green]" />
            <Link to="" onClick={() => setToggleSlide(false)}>
              Load List
            </Link>
          </div>
          <hr className=" border-dashed border-[1.3px] my-1" />
          <div className="flex items-center gap-2 font-semibold hover:text-[#6b6a6a] duration-200">
            <RiContactsBook3Line className="text-[green]" />
            <Link to="/contactus" onClick={() => setToggleSlide(false)}>
              Contact Us
            </Link>
          </div>
          <hr className=" border-dashed border-[1.3px] my-1" />
          <div className="w-[88px] mt-2">
            <LogOut />
          </div>
        </div>
      </div>
    </>
  );
};

const MenuListBusinessLogin = () => {
  //👇 global variables access vehicle login user details
  const { busiLogUser } = useContext(BusiLoginContext);

  const [toggleSlide, setToggleSlide] = useState(false);

  return (
    <>
      <div>
        {/* 👉 Menu button */}
        <ul className=" text-white items-center md:hidden">
          <li className=" cursor-pointer text-4xl mr-6">
            <IoMenuSharp onClick={() => setToggleSlide(!toggleSlide)} />
          </li>
        </ul>
      </div>

      <div className=" leading-[21px] items-center gap-4 md:flex hidden">
        <div className="lg:text-[16px] text-[15px]">
          <ul className="flex gap-4 border-b-[1px] text-white uppercase font-semibold">
            <li className="tracking-tight cursor-pointer hover:text-[#c3c2c2] duration-300">
              <NavLink
                to="/postyourloadbusi"
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                Post Load
              </NavLink>
            </li>
            <li className="tracking-tight cursor-pointer hover:text-[#c3c2c2] duration-300">
              <NavLink
                to="/loadslistbusi"
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                Check Loads
              </NavLink>
            </li>
            <li className="tracking-tight cursor-pointer hover:text-[#c3c2c2] duration-300">
              <NavLink
                to="/availablevehiclelist"
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                Check Available Vehicles
              </NavLink>
            </li>
            <li className="tracking-tight cursor-pointer hover:text-[#c3c2c2] duration-300">
              <NavLink
                to="/businessprofile"
                className={({ isActive }) => (isActive ? "text-[yellow]" : "")}
              >
                Profile
              </NavLink>
            </li>
          </ul>
          <ul className="text-center">
            <li className=" font-semibold">
              <span className=" text-[#86e852]">Welcome:</span>{" "}
              {/* <span className="text-[#86e852]"> Name: </span>{" "} */}
              <span className="text-white">{busiLogUser?.clientsName}</span>
              <span className="text-[#86e852]"> Number: </span>{" "}
              <span className="text-white underline">
                <a href={`tel: ${busiLogUser?.clientsPhone}`}>
                  {busiLogUser?.clientsPhone}
                </a>
              </span>
            </li>
          </ul>
        </div>
        <LogOut />
      </div>

      {/* Slide bar or MenuList Vehicle Login Slide bar */}
      <div
        className={` fixed w-[300px] overflow-y-auto h-full py-20 px-3 bg-white top-0 z-20 right-0 md:hidden ${
          toggleSlide ? "" : "hidden"
        }`}
      >
        <div
          onClick={() => setToggleSlide(!toggleSlide)}
          className="text-4xl h-full absolute right-6 top-8 cursor-pointer text-orange-600 hover:text-rose-700 duration-300"
        >
          <IoMdCloseCircle />
        </div>
        <div className="flex items-center text-xl font-bold mt-5">
          <FcGlobe className="text-[35px] mr-2" />
          <h1>EXPLORE MENU</h1>
        </div>
        <div className="mt-2 px-4 text-lg ">
          <div className="flex items-center gap-1 text-orange-600 font-semibold flex-wrap">
            <AiFillSound className="text-[green] mr-1" />
            <span className="text-[#7b7b74] uppercase ml-1">
              {busiLogUser?.clientsName}
            </span>
          </div>
          <div className="flex items-center gap-1 text-orange-600 font-semibold flex-wrap">
            <FaMobileRetro className="text-[green] mr-1" />
              <span className="text-[#7b7b74] uppercase ml-1">
                {busiLogUser?.clientsPhone}
              </span>
          </div>
          <hr className=" border-dashed border-[2.3px] my-1" />
          <div className="flex items-center gap-2 font-semibold hover:text-[#6b6a6a] duration-200">
            <LuUserCircle2 className="text-[green]" />
            <Link to="/businessprofile" onClick={() => setToggleSlide(false)}>
              Profile
            </Link>
          </div>
          <hr className=" border-dashed border-[1.3px] my-1" />
          <div className="flex items-center gap-2 font-semibold hover:text-[#6b6a6a] duration-200">
            <TbTruckLoading className="text-[green]" />
            <Link to="/loadslistbusi" onClick={() => setToggleSlide(false)}>
              Check Loads
            </Link>
          </div>
          <hr className=" border-dashed border-[1.3px] my-1" />
          <div className="flex items-center gap-2 font-semibold hover:text-[#6b6a6a] duration-200">
            <FaTruckFast className="text-[green]" />
            <Link
              to="/availablevehiclelist"
              onClick={() => setToggleSlide(false)}
            >
              Check Available Vehicles
            </Link>
          </div>
          <hr className=" border-dashed border-[1.3px] my-1" />
          <div className="flex items-center gap-2 font-semibold hover:text-[#6b6a6a] duration-200">
            <RiContactsBook3Line className="text-[green]" />
            <Link to="/contactus" onClick={() => setToggleSlide(false)}>
              Contact Us
            </Link>
          </div>
          <hr className=" border-dashed border-[1.3px] my-1" />
          <div className="w-[88px] mt-2">
            <LogOut />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header; // Export Header component
