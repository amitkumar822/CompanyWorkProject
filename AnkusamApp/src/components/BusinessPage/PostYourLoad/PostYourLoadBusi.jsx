import React, { useContext, useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { weightdata } from "../../../data/WeightData";
import { useNavigate } from "react-router";
import axios from "axios";
import BusiLoginContext from "../../../context/BusinessLoginUser/BusiLoginContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import loadingGfg from "../../../data/GfgLoding/loading.gif";

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
    setFromState(selected.value);
    setFromStateName(selected.label);
    setFromCityName("");
  };

  const handleToStateChange = (selected) => {
    setToState(selected.value);
    setToStateName(selected.label);
    setToCityName("");
  };

  // Handle city selection change
  const handleFromCityChange = (selected) => {
    setFromCityName(selected.label);
  };

  const handleToCityChange = (selected) => {
    setToCityName(selected.label);
  };

  // ==============👇 Post load Url 👇=============================

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    fromCityName: "",
    toCityName: "",
    PackageWeight: "",
  });

  const [formFiles, setFormFiles] = useState({
    PickUpDate: null,
    VehicleType: "Both",
    PackageWeight: null,
    NumberOfWheels: null,
    GoodsType: null,
    VehicleLength: null,
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
    formData.append("BusinessUsersId", busiLogUser?.driver_id);
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
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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

    // console.log("====================================");
    // console.log("FromState: " + fromStateName);
    // console.log("FromCity: " + fromCityName);
    // console.log("ToState: " + toStateName);
    // console.log("ToCity: " + toCityName);
    // console.log("FromPickupDate: " + formFiles.PickUpDate);
    // console.log("VehicleType: " + formFiles.VehicleType);
    // console.log("PackageWeight: " + formFiles.PackageWeight);
    // console.log("NumberOfWheels: " + formFiles.NumberOfWheels);
    // console.log("GoodsType: " + formFiles.GoodsType);
    // console.log("VehicleLength: " + formFiles.VehicleLength);
    // console.log("ContactNumber: " + formFiles.ContactNumber);
    // console.log("====================================");
  };

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
        <div className="lg:w-[80%] w-[90%] mx-auto pt-14">
          <form
            onSubmit={handleFormSubmit}
            className="w-full mx-auto border bg-gray-200 pt-6 pb-10 pl-4 rounded-xl bg-gray-00 shadow-md shadow-gray-800"
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
                      options={indianStates.map((state) => ({
                        value: state,
                        label: state.name,
                      }))}
                      onChange={handleToStateChange}
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
                      options={toCities.map((city) => ({
                        value: city,
                        label: city.name,
                      }))}
                      onChange={handleToCityChange}
                      placeholder="Select City"
                      required
                      className="min-w-[180px] lg:w-[70%] w-[95%]"
                      isDisabled={!toState}
                    />
                    {errors.toCityName && (
                      <p className="text-red-500">{errors.toCityName}</p>
                    )}
                  </div>
                </div>
                {/* pickup date */}
                <div className="mt-4">
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
              <button className="py-2 px-4 text-2xl font-semibold italic text-white rounded-xl mt-10 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...">
                POST
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default PostYourLoadBusi;
