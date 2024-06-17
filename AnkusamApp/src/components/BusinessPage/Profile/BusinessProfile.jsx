import React, { useContext, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { State, City } from "country-state-city";
import { RiMapPinUserFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import Typed from "typed.js"; // Importing Typed.js for typing animation
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; // status percentage complete animation show
import "react-circular-progressbar/dist/styles.css"; // styles status percentage complete animation show
import { Link, useNavigate } from "react-router-dom";
import BusiLoginContext from "../../../context/BusinessLoginUser/BusiLoginContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingGfg from "../../../data/GfgLoding/loading.gif";

function BusinessProfile() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("TokenLoginBusinpage")) {
      navigate("/businesslogin");
      return;
    }
  }, []);

  const { busiLogUser } = useContext(BusiLoginContext);
  const typedRef = useRef(null);
  const typedRefPhone = useRef(null);

  const percentage = 60; // Assuming user has completed 60% of their profile

  const getColor = (percentage) => {
    const red = Math.floor((100 - percentage) * 2.55);
    const green = Math.floor(percentage * 2.55);
    return `rgb(${red}, ${green}, 0)`;
  };

  useEffect(() => {
    const options = {
      strings: ["Welcome to The Ankusam Logistics!"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };
    const typed = new Typed(typedRef.current, options); // Initializing typing animation
    const typedPhone = new Typed(typedRefPhone.current, options); // Initializing typing animation

    return () => {
      typed.destroy(); // Cleanup animation on component unmount
      typedPhone.destroy(); // Cleanup animation on component unmount
    };
  }, []);

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");

  const handleStateChange = (selectedOption) => {
    const selectedStateCode = selectedOption?.value || "";
    const selectedState = State.getStateByCodeAndCountry(
      selectedStateCode,
      "IN"
    );
    setState(selectedStateCode);
    setStateName(selectedState?.name || "");
    setCity("");
    setCityName("");
  };

  const handleCityChange = (selectedOption) => {
    const selectedCityName = selectedOption?.value || "";
    setCity(selectedCityName);
    setCityName(selectedCityName);
  };

  const states = State.getStatesOfCountry("IN").map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  const cities = City.getCitiesOfState("IN", state).map((city) => ({
    value: city.name,
    label: city.name,
  }));

  // =============👇 Form Submit Section 👇===================

  // Reset form or form fields input clearing
  const formRef = useRef();
  const stateInputRef = useRef();
  const cityInputRef = useRef();

  // loading animation state handle
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorsMessage, setIsErrorsMessage] = useState({
    stateName: "",
    cityName: "",
  });

  const [files, setFiles] = useState({
    name: null,
    phone: null,
    alternativenumber: null,
    email: null,
    address: null,
  });

  const handleFileChange = (e) => {
    const { name, value } = e.target;
    setFiles((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName) {
      toast("City is required!");
      setIsErrorsMessage((prevState) => ({
        ...prevState,
        cityName: "City is required!",
      }));
      return;
    } else {
      setIsErrorsMessage((prevState) => ({
        ...prevState,
        cityName: "",
      }));
    }

    if(isNaN(files.phone)){
      toast.warn("Invalid Phone Number!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      )
      return;
    }

    if(isNaN(files.alternativenumber)){
      toast.warn("Invalid Alternative Number!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      )
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("id", busiLogUser?.vendorId);
    formData.append("name", files.name);
    formData.append("phone", files.phone);
    formData.append("alternativenumber", files.alternativenumber);
    formData.append("email", files.email);
    formData.append("address", files.address);
    formData.append("state", stateName);
    formData.append("city", cityName);

    try {
      const response = await axios.post(
        "/api/driver/webapi/business_profile_update1.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        setIsLoading(false);
        toast.success("Successfully updated!", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // Reset form input fields
        formRef.current.reset();
        stateInputRef.current.clearValue();
        cityInputRef.current.clearValue();
      } else {
        setIsLoading(false);
        toast.error("Something went wrong!", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Server or Network Error!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("Error: ", error);
    }
  };

  console.log('====================================');
  console.log("All Details: ", busiLogUser);
  console.log('====================================');

  return (
    <>
      <div className="mt-16 w-full h-full relative">
        {/* Loading image section */}
        <div
          className={`w-full h-full z-10 bg-[rgba(0,0,0,0.5)] absolute ${
            isLoading ? "" : "hidden"
          }`}
        >
          <div className=" absolute w-full h-screen flex justify-center items-center">
            <img
              className="w-[100px] h-[100px] fixed"
              src={loadingGfg}
              alt=""
            />
          </div>
        </div>
        {/* First Banner Part */}
        <div className="bg-vehicleTruckImgProfile w-full bg-no-repeat bg-cover ">
          <div className="w-full md:h-[560px] h-[400px] mx-auto bg-[rgba(0,0,0,0.5)] text-white">
            <div className="w-[90%] mx-auto md:pt-28 pt-10 flex justify-around">
              <div className="md:w-[30%]">
                <h1 className="text-3xl uppercase font-bold underline text-[#3ef94d] md:block hidden">
                  <span className="text-[#f460f9]">User</span>{" "}
                  <span className="text-[#f95151]">Profile</span>
                </h1>
                <div className="md:mt-20 mt-4">
                  <h1 className="text-3xl font-bold text-[#3ef94d]">Hello </h1>
                  <h1 className="md:text-3xl font-bold my-3">
                    {busiLogUser?.userid}
                  </h1>
                  <p className="md:text-xl italic font-semibold text-[yellow]">
                    This is your <span className="text-[white]">profile</span>{" "}
                    page. You can see the{" "}
                    <span className="text-[#3ef94d]">progress</span> you've made
                    with your Profile.
                  </p>
                </div>
              </div>
              <div className="md:w-[50%] md:text-4xl text-center font-serif mt-28 bg-clip-text text-transparent bg-gradient-to-r from-[#3ef94d] via-[yellow] to-[red] -ml-[10%] md:block hidden">
                <span ref={typedRef} className=" font-bold"></span>
              </div>
              <div className="md:flex md:flex-col items-center">
                <RiMapPinUserFill className="md:text-7xl text-4xl w-full text-[#86f860]" />
                <span className="uppercase text-[yellow] md:text-2xl text-[14px] whitespace-nowrap font-bold">
                  {busiLogUser?.userName}
                </span>
                <h1 className="md:text-xl font-bold">{busiLogUser?.userid}</h1>
              </div>
            </div>
            <div className="md:hidden mt-8 w-[80%] mx-auto text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3ef94d] via-[yellow] to-[red] text-xl font-semibold italic">
              <span ref={typedRefPhone}></span>
            </div>
          </div>
        </div>

        {/* Account Form Section */}
        <div className="w-[90%] mx-auto lg:mt-6 h-full flex justify-evenly lg:flex-row flex-col gap-4">
          <div className="lg:w-[70%] w-[100%] mx-auto md:mt-0 mt-4 bg-gray-300 border shadow-md shadow-gray-800 lg:order-1 order-2 rounded-lg">
            <div className="flex justify-between px-2 py-4 bg-white">
              <h1 className="md:text-2xl text-xl font-semibold">My Account</h1>
              <h1 className="md:text-2xl text-xl font-semibold bg-blue-500 hover:bg-blue-600 duration-300 px-2 py-1 rounded-lg text-white cursor-pointer">
                <Link to="/loaddatalist">Home</Link>
              </h1>
            </div>
            <form onSubmit={handleSubmit} ref={formRef} className="px-4 py-2">
              {/* <h1 className="text-3xl">
                This data show on Available load section
              </h1> */}
              <div className="grid sm:grid-cols-2 md:mt-6">
                <div>
                  <h1 className="text-[17px] pt-2 font-semibold">Name</h1>
                  <input
                    type="text"
                    name="name"
                    onChange={handleFileChange}
                    placeholder="Enter your name"
                    required
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                  <h1 className="text-[17px] pt-2 font-semibold">
                    Phone Number
                  </h1>
                  <input
                    type="text"
                    name="phone"
                    onChange={handleFileChange}
                    placeholder="Phone number"
                    minLength={10}
                    maxLength={10}
                    required
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                </div>

                <div>
                  <h1 className="text-[17px] pt-2 font-semibold">
                    Email address
                  </h1>
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={handleFileChange}
                    placeholder="Enter email address"
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                  <h1 className="text-[17px] pt-2 font-semibold">
                    Alternative Number
                  </h1>
                  <input
                    type="text"
                    name="alternativenumber"
                    onChange={handleFileChange}
                    minLength={10}
                    maxLength={10}
                    placeholder="Enter Your Alternative Number"
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                </div>
              </div>

              <hr className=" mt-16" />
              {/* Address section */}
              <div className="mt-6">
                <h1 className="text-[17px] pt-2 font-semibold">Address</h1>
                <input
                  type="text"
                  name="address"
                  onChange={handleFileChange}
                  required
                  placeholder="Enter your address.."
                  className="py-2 px-4 rounded-lg w-[90%]"
                />
              </div>

              {/* State City Section */}
              <div className="grid md:grid-cols-2 mt-4">
                <div className="md:w-[60%] w-[90%] min-w-[200px]">
                  <h3 className="text-[17px] pt-2 font-semibold">
                    SELECT STATE
                  </h3>
                  <Select
                    ref={stateInputRef}
                    options={states}
                    required
                    className="mt-2"
                    value={states.find((option) => option.value === state)}
                    onChange={handleStateChange}
                    isClearable
                  />
                </div>
                <div className="md:w-[60%] w-[90%] min-w-[200px]">
                  <h3 className="text-[17px] pt-2 font-semibold">
                    SELECT CITY
                  </h3>
                  <Select
                    ref={cityInputRef}
                    options={cities}
                    required
                    className="mt-2"
                    value={cities.find((option) => option.value === city)}
                    onChange={handleCityChange}
                    isDisabled={!state}
                    isClearable
                  />
                  {isErrorsMessage && (
                    <p className="text-red-500">{isErrorsMessage.cityName}</p>
                  )}
                </div>
              </div>

              {/* Button Section */}
              <div className="w-full mx-auto text-center mt-10">
                <button
                  type="submit"
                  className="w-[120px] my-10 text-white py-3 ml-auto rounded-lg text-2xl shadow-md shadow-[yellow] font-bold bg-gradient-to-r from-fuchsia-400 to-red-500 hover:from-pink-500 hover:to-yellow-500"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>

          {/* Profile status */}
          <div className="border lg:w-[30%] w-full min-h-[295px] md:mt-0 mt-4 bg-gray-300 mx-auto shadow-md shadow-gray-800 rounded-lg px-3 pt-4 lg:order-2 order-1">
            <h1 className="text-xl font-semibold flex items-center gap-1">
              <CgProfile className="text-[green] text-2xl" />
              Profiles status
            </h1>
            <div className="md:w-48 md:h-48 w-40 h-40 mx-auto mt-4">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  textColor: "black",
                  pathColor: getColor(percentage),
                  trailColor: "white",
                })}
              />
              <h1 className="text-lg text-center font-semibold mt-2 text-[#4961e9]">
                Profile completion
              </h1>
            </div>

            <div className="w-full md:mt-20 mt-14 lg:block hidden">
              <h1 className="text-[20px] font-semibold">
                🍁Welcome to Ankusam Logistics🍁
              </h1>
              <div className="text-lg mt-2">
                <h1 className=" font-semibold pt-3">
                  Your Trusted Partner in Indian Logistics Solutions
                </h1>
                <h1 className="mt-2 text-[19px]">
                  At Ankusam Logistics, we specialize in providing efficient,
                  reliable, and innovative logistics services tailored to meet
                  your unique needs within India. Our comprehensive solutions
                  ensure your goods are transported safely and on time, every
                  time.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default BusinessProfile;
