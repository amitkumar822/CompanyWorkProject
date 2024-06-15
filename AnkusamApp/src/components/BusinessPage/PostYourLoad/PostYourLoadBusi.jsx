import React, { useContext, useEffect, useState, useRef } from "react";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { weightdata } from "../../../data/WeightData";
import { useNavigate } from "react-router";
import axios from "axios";
import BusiLoginContext from "../../../context/BusinessLoginUser/BusiLoginContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import loadingGfg from "../../../data/GfgLoding/loading.gif";
import { Link } from "react-router-dom";

function PostYourLoadBusi() {
  const { busiLogUser } = useContext(BusiLoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("TokenLoginBusinpage")) {
      navigate("/businesslogin");
      return;
    }
  }, []);

  // State management for shipping from and to locations
  const [fromState, setFromState] = useState(null);
  const [fromStateName, setFromStateName] = useState("");
  const [fromCityName, setFromCityName] = useState("");
  const [toState, setToState] = useState(null);
  const [toStateName, setToStateName] = useState("");
  const [toCityName, setToCityName] = useState("");

  // Fetch Indian states
  const indianStates = State.getStatesOfCountry("IN");

  // Fetch cities based on selected state
  const fromCities = fromState
    ? City.getCitiesOfState("IN", fromState.isoCode)
    : [];
  const toCities = toState ? City.getCitiesOfState("IN", toState.isoCode) : [];

  // Handle state selection change
  const handleFromStateChange = (selected) => {
    if (selected) {
      // Ensure selected is not null or undefined
      setFromState(selected.value);
      setFromStateName(selected.label);
      setFromCityName("");
    }
  };

  const handleToStateChange = (selected) => {
    if (selected) {
      // Ensure selected is not null or undefined
      setToState(selected.value);
      setToStateName(selected.label);
      setToCityName("");
    }
  };

  // Handle city selection change
  const handleFromCityChange = (selected) => {
    if (selected) {
      // Ensure selected is not null or undefined
      setFromCityName(selected.label);
    }
  };

  const handleToCityChange = (selected) => {
    if (selected) {
      // Ensure selected is not null or undefined
      setToCityName(selected.label);
    }
  };

  // ==============👇 Post load Url 👇=============================
  const formInputRef = useRef();
  const fromStateInputRef = useRef();
  const toStateInputRef = useRef();
  const fromCityInputRef = useRef();
  const toCityInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const [time, setTime] = useState({
    hour: "",
    minute: "",
    period: "AM",
  });

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTime((prevTime) => ({
      ...prevTime,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState({
    fromCityName: "",
    toCityName: "",
    PackageWeight: "",
  });

  const [formFiles, setFormFiles] = useState({
    PickUpDate: null,
    VehicleType: "Both",
    PackageWeight: null,
    NumberOfWheels: 1,
    GoodsType: null,
    VehicleLength: 1,
    ContactNumber: null,
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormFiles((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!fromCityName) {
      toast("From City is required!");
      setErrors((prevErrors) => ({
        ...prevErrors,
        fromCityName: "Please select from city",
      }));
      return;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fromCityName: "",
      }));
    }

    if (!toCityName) {
      toast("To City is required!");
      setErrors((prevErrors) => ({
        ...prevErrors,
        toCityName: "Please select to city",
      }));
      return;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        toCityName: "",
        fromCityName: "",
      }));
    }

    if (!formFiles.PackageWeight) {
      toast("PackageWeight is required!");
      setErrors((prevErrors) => ({
        ...prevErrors,
        PackageWeight: "Please select PackageWeight",
      }));
      return;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        PackageWeight: "",
        toCityName: "",
        fromCityName: "",
      }));
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("vendorId", busiLogUser?.vendorId);
    formData.append("PickUpDate", formFiles.PickUpDate);
    formData.append("VehicleType", formFiles.VehicleType);
    formData.append("PackageWeight", formFiles.PackageWeight);
    formData.append("NumberOfWheels", formFiles.NumberOfWheels);
    formData.append("GoodsType", formFiles.GoodsType);
    formData.append("VehicleLength", formFiles.VehicleLength);
    formData.append("ContactNumber", formFiles.ContactNumber);
    formData.append("FromState", fromStateName);
    formData.append("FromCity", fromCityName);
    formData.append("ToState", toStateName);
    formData.append("ToCity", toCityName);

    try {
      const response = await axios.post(
        "/api/driver/webapi/post_load.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        toast.success("Successfully post!", {
          position: "top-center",
          autoClose: 1700,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setIsLoading(false);

        // Use `current` to reset form elements correctly
        if (formInputRef.current) formInputRef.current.reset();
        if (fromStateInputRef.current) fromStateInputRef.current.clearValue();
        if (toStateInputRef.current) toStateInputRef.current.clearValue();
        if (fromCityInputRef.current) fromCityInputRef.current.clearValue();
        if (toCityInputRef.current) toCityInputRef.current.clearValue();
      } else {
        toast.error("Faild to post!", {
          position: "top-center",
          autoClose: 1700,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Check Your Network Connection!", {
        position: "top-center",
        autoClose: 1700,
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

  console.log("====================================");
  console.log("Time: ", time);
  console.log("====================================");

  return (
    <>
      <div className="mt-16 relative">
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
        <div className="lg:w-[85%] w-[90%] mx-auto mt-24 pt-6 bg-gray-200 pb-10 pl-4 rounded-xl bg-gray-00 shadow-md shadow-gray-800">
          <form
            ref={formInputRef}
            onSubmit={handleFormSubmit}
            className="w-full mx-auto border md:pl-4"
          >
            {/* Shipping from and Shipping to form section */}
            <div className="grid lg:grid-cols-2">
              {/* shipping from section */}
              <div>
                <h2 className="lg:text-4xl md:text-3xl md:font-normal font-semibold text-[20px]">
                  Where are you shipping from?
                </h2>
                <div className="grid lg:grid-cols-2 mt-4">
                  <div>
                    <h3 className="md:text-lg font-semibold text-black uppercase mb-2">
                      SELECT STATE
                    </h3>
                    <Select
                      ref={fromStateInputRef}
                      isClearable
                      options={indianStates.map((state) => ({
                        value: state,
                        label: state.name,
                      }))}
                      onChange={handleFromStateChange}
                      placeholder="Select State"
                      required
                      className="min-w-[180px] lg:w-[70%] w-[95%]"
                    />
                  </div>
                  <div className="lg:mt-0 mt-4">
                    <h3 className="md:text-lg font-semibold text-black uppercase mb-2">
                      SELECT CITY
                    </h3>
                    <Select
                      ref={fromCityInputRef}
                      isClearable
                      options={fromCities.map((city) => ({
                        value: city,
                        label: city.name,
                      }))}
                      onChange={handleFromCityChange}
                      placeholder="Select City"
                      required
                      className="min-w-[180px] lg:w-[70%] w-[95%]"
                      isDisabled={!fromState}
                    />
                    {errors.fromCityName && (
                      <p className="text-red-500">{errors.fromCityName}</p>
                    )}
                  </div>
                </div>
              </div>
              {/* shipping to section */}
              <div className="lg:mt-0 mt-7">
                <h2 className="lg:text-4xl md:text-3xl md:font-normal font-semibold text-[20px]">
                  Where are you shipping to?
                </h2>
                <div className="grid lg:grid-cols-2 mt-4">
                  <div>
                    <h3 className="md:text-lg font-semibold text-black uppercase mb-2">
                      SELECT STATE
                    </h3>
                    <Select
                      ref={toStateInputRef}
                      options={indianStates.map((state) => ({
                        value: state,
                        label: state.name,
                      }))}
                      onChange={handleToStateChange}
                      placeholder="Select State"
                      isClearable
                      required
                      className="min-w-[180px] lg:w-[70%] w-[95%]"
                    />
                  </div>
                  <div className="lg:mt-0 mt-4">
                    <h3 className="md:text-lg font-semibold text-black uppercase mb-2">
                      SELECT CITY
                    </h3>
                    <Select
                      ref={toCityInputRef}
                      options={toCities.map((city) => ({
                        value: city,
                        label: city.name,
                      }))}
                      onChange={handleToCityChange}
                      placeholder="Select City"
                      required
                      isClearable
                      className="min-w-[180px] lg:w-[70%] w-[95%]"
                      isDisabled={!toState}
                    />
                    {errors.toCityName && (
                      <p className="text-red-500">{errors.toCityName}</p>
                    )}
                  </div>
                </div>
                {/* pickup date */}
                <div className="mt-4 grid md:grid-cols-2">
                  <div>
                    <h3 className="md:text-lg font-semibold text-black uppercase mb-2">
                      PICKUP DATE
                    </h3>
                    <input
                      className="py-2 px-4 md:w-[60%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                      type="date"
                      required
                      name="PickUpDate"
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="pr-2">
                    <h3 className="md:text-lg font-semibold text-black uppercase mb-2">
                      PICKUP  TIME
                    </h3>
                    <select
                      name="hour"
                      className="w-1/3 p-2 border border-gray-300 rounded"
                      value={time.hour}
                      onChange={handleTimeChange}
                      required
                    >
                      <option value="" disabled>
                        Hour
                      </option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (hour) => (
                          <option
                            key={hour}
                            value={hour < 10 ? `0${hour}` : hour}
                          >
                            {hour < 10 ? `0${hour}` : hour}
                          </option>
                        )
                      )}
                    </select>

                    <select
                      name="minute"
                      className="w-1/3 p-2 border border-gray-300 rounded"
                      value={time.minute}
                      onChange={handleTimeChange}
                      required
                    >
                      <option value="" disabled>
                        Minute
                      </option>
                      {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                        <option
                          key={minute}
                          value={minute < 10 ? `0${minute}` : minute}
                        >
                          {minute < 10 ? `0${minute}` : minute}
                        </option>
                      ))}
                    </select>

                    <select
                      name="period"
                      className="w-1/3 p-2 border border-gray-300 rounded"
                      value={time.period}
                      onChange={handleTimeChange}
                      required
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* How would you like to ship? */}
            <div className="grid lg:grid-cols-2">
              <div className="lg:mt-0 mt-7">
                <h1 className="lg:text-4xl md:text-3xl md:font-normal font-semibold text-[20px]">
                  How would you like to ship?
                </h1>
                <div className="grid lg:grid-cols-2 mt-4">
                  {/* Select Vehicle Type */}
                  <div>
                    <h1 className="md:text-lg font-semibold text-black uppercase mb-2">
                      TYPE OF VEHICLE NEEDED
                    </h1>
                    <select
                      required
                      name="VehicleType"
                      onChange={handleFormChange}
                      className="py-2 px-4 min-w-[180px] lg:w-[70%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                    >
                      {/* <option>Select one...</option> */}
                      <option value="Both">Both</option>
                      <option value="Open Body">Open Body</option>
                      <option value="Closed Body">Closed Body</option>
                    </select>
                  </div>
                  {/* TYPE OF VEHICLE NEEDED */}
                  <div className="lg:mt-0 mt-4">
                    <h1 className="md:text-lg font-semibold text-black uppercase mb-2">
                      PACKAGE WEIGHT (Ton)
                    </h1>
                    <select
                      name="PackageWeight"
                      onChange={handleFormChange}
                      className="py-2 px-4 min-w-[180px] lg:w-[70%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                    >
                      <option>Select one...</option>
                      {weightdata.map((capacity, index) => {
                        return (
                          <option key={index} value={capacity}>
                            {capacity}
                          </option>
                        );
                      })}
                    </select>
                    {errors.PackageWeight && (
                      <p className="text-red-500">{errors.PackageWeight}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 mt-4">
                <div>
                  <h1 className="md:text-lg font-semibold text-black uppercase mb-2">
                    NO OF WHEELS REQUIRED
                  </h1>
                  <input
                    type="number"
                    defaultValue={1}
                    min={1}
                    name="NumberOfWheels"
                    onChange={handleFormChange}
                    placeholder="Enter your wheel number"
                    className="py-2 px-4 min-w-[180px] lg:w-[70%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                  />
                </div>
                <div className="lg:mt-0 mt-4">
                  <h1 className="md:text-lg font-semibold text-black uppercase mb-2">
                    LENGTH (FT)
                  </h1>
                  <input
                    type="number"
                    defaultValue={1}
                    min={1}
                    name="VehicleLength"
                    onChange={handleFormChange}
                    placeholder="Enter your wheel length"
                    className="py-2 px-4 min-w-[180px] lg:w-[70%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                  />
                </div>
              </div>
            </div>
            {/* contact number and upload load section */}
            <div className="grid lg:grid-cols-2 mt-10">
              {/* contact and goods type section */}
              <div>
                {/* goods type */}
                <h1 className="md:text-lg font-semibold text-black uppercase mb-2">
                  Goods Type
                </h1>
                <select
                  name="GoodsType"
                  onChange={handleFormChange}
                  className="py-2 px-4 min-w-[180px] lg:w-[70%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                >
                  <option>Select one...</option>
                  <option value="Personal Goods">Personal Goods</option>
                  <option value="Machine">Machine</option>
                  <option value="Industrial Equpiment">
                    Industrial Equpiment
                  </option>
                  <option value="Others">Others</option>
                </select>
                {/* contact number */}
                <h1 className="md:text-lg mt-4 font-semibold text-black uppercase mb-2">
                  Contact Number
                </h1>
                <input
                  type="tel"
                  required
                  minLength={10}
                  maxLength={10}
                  name="ContactNumber"
                  onChange={handleFormChange}
                  placeholder="Enter your number"
                  className="py-2 px-4 min-w-[180px] lg:w-[70%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                />
              </div>
              {/* upload load photos section */}
              <div className="lg:mt-0 mt-4">
                <h1 className="md:text-lg font-semibold text-black uppercase mb-2">
                  Upload Load Photos
                </h1>
                <input
                  type="file"
                  // required
                  className="py-2 px-4 min-w-[180px] bg-gray-300 lg:w-[70%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                />
                <input
                  type="file"
                  // required
                  className="py-2 px-4 mt-2 min-w-[180px] bg-gray-300 lg:w-[70%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                />
              </div>
            </div>
            <div className="w-full mx-auto flex justify-center items-center">
              <button className="py-2 px-4 text-2xl font-semibold italic text-white rounded-xl mt-10 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-700 hover:to-yellow-700 ...">
                POST
              </button>
            </div>
          </form>
          <hr className="w-[98%] mx-auto mt-6 bg-black border-dashed " />
          <div className="w-full mx-auto flex justify-center items-center">
            <Link
              to="/loadslistbusi"
              className="py-2 px-4 text-2xl font-semibold italic text-white rounded-xl mt-4 bg-gradient-to-r hover:from-amber-300 hover:to-gray-500 from-pink-500 to-yellow-500 ..."
            >
              Check Your Loads
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default PostYourLoadBusi;
