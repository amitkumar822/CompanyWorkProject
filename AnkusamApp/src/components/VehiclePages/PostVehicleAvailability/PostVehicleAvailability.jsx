import React, { useState, useEffect, useContext, useRef } from "react";
import { City, State } from "country-state-city";
import Select from "react-select";
import { weightdata } from "../../../data/WeightData";
import { useNavigate } from "react-router";
import VehiLogUserContext from "../../../context/vehicleLoginUser/VehiLogUserContext";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingGfg from "../../../data/GfgLoding/loading.gif";

// Define the country code for India
const indiaCountryCode = "IN";

function PostVehicleAvailability() {
  //👇 global variables access vehicle login user details
  const { vehiLogUser } = useContext(VehiLogUserContext);

  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!localStorage.getItem("TokeLoginVehiPage")) {
      navigate("/vehiclelogin");
      return;
    }
  }, []);

  // State for "Shipping From"
  const [fromStateCode, setFromStateCode] = useState("");
  const [fromStateName, setFromStateName] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [fromCityName, setFromCityName] = useState("");
  const [fromCities, setFromCities] = useState([]);

  // State for "Shipping To"
  const [toStateCode, setToStateCode] = useState("");
  const [toStateName, setToStateName] = useState("");
  const [toCity, setToCity] = useState("");
  const [toCityName, setToCityName] = useState("");
  const [toCities, setToCities] = useState([]);

  // Effect to load cities when "from" state changes
  useEffect(() => {
    if (fromStateCode) {
      const citiesList = City.getCitiesOfState(indiaCountryCode, fromStateCode);
      setFromCities(citiesList);
      setFromCity(""); // Reset city selection
    }
  }, [fromStateCode]);

  // Effect to load cities when "to" state changes
  useEffect(() => {
    if (toStateCode) {
      const citiesList = City.getCitiesOfState(indiaCountryCode, toStateCode);
      setToCities(citiesList);
      setToCity(""); // Reset city selection
    }
  }, [toStateCode]);

  // Handle state change for "from"
  const handleFromStateChange = (selectedOption) => {
    setFromStateCode(selectedOption ? selectedOption.value : "");
    setFromStateName(selectedOption ? selectedOption.label : "");
    // Reset state selection when "from" state changes
    setFromCityName("");
  };

  // Handle city change for "from"
  const handleFromCityChange = (selectedOption) => {
    setFromCity(selectedOption ? selectedOption.value : "");
    setFromCityName(selectedOption ? selectedOption.label : "");
  };

  // Handle state change for "to"
  const handleToStateChange = (selectedOption) => {
    setToStateCode(selectedOption ? selectedOption.value : "");
    setToStateName(selectedOption ? selectedOption.label : "");
    // Reset state selection when "To" state changes
    setToCityName("");
  };

  // Handle city change for "to"
  const handleToCityChange = (selectedOption) => {
    setToCity(selectedOption ? selectedOption.value : "");
    setToCityName(selectedOption ? selectedOption.label : "");
  };

  // Prepare state options for react-select
  const stateOptions = State.getStatesOfCountry(indiaCountryCode).map(
    (state) => ({
      value: state.isoCode,
      label: state.name,
    })
  );

  // Prepare city options for react-select
  const fromCityOptions = fromCities.map((city) => ({
    value: city.name,
    label: city.name,
  }));

  const toCityOptions = toCities.map((city) => ({
    value: city.name,
    label: city.name,
  }));

  // ==============👇 Form submit control Section 👇=================

  //👉Reset form Or form fields submit after clear all fields
  const formResetUseingRef = useRef();
  const fromStateInputRef = useRef();
  const fromCityInputRef = useRef();
  const toStateInputRef = useRef();
  const toCityInputRef = useRef();

  // State for form data and loading status
  const [isLoading, setIsLoading] = useState(false);

  // Error handling state
  const [isErrors, setIsErrors] = useState({
    fromCityName: "",
    toCityName: "",
  });

  const [files, setFiles] = useState({
    typeOfVehicle: "Open Body",
    vehicle_capacity_in_tons: null,
    vehicleLength: null,
  });

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiles((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fromCityName) {
      toast("Current City is required!");
      setIsErrors((prevErrors) => ({
        ...prevErrors,
        fromCityName: "Current City is required!",
      }));
      return;
    } else {
      setIsErrors((prevErrors) => ({
        ...prevErrors,
        fromCityName: "",
      }));
    }

    if (!toCityName) {
      toast("Destination City is required!");
      setIsErrors((prevErrors) => ({
        ...prevErrors,
        toCityName: "Destination City is required!",
      }));
      return;
    } else {
      setIsErrors((prevErrors) => ({
        ...prevErrors,
        fromCityName: "",
        toCityName: "",
      }));
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("driver_id", vehiLogUser?.driver_id);
    formData.append("phone", vehiLogUser?.phone);
    formData.append("typeOfVehicle", files.typeOfVehicle);
    formData.append("vehicle_capacity_in_tons", files.vehicle_capacity_in_tons);
    formData.append("vehicleLength", files.vehicleLength + " Feets");
    formData.append("fromstate", fromStateName);
    formData.append("fromcity", fromCityName);
    formData.append("tostate", toStateName);
    formData.append("tocity", toCityName);

    try {
      const response = await axios.post(
        "/api/load/upload_vehicle_available_by_driver.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setIsLoading(false);
        toast.success("Successfully post!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        //👉Reset form Or form fields submit after clear all fields
        formResetUseingRef.current.reset();
        fromStateInputRef.current.clearValue();
        fromCityInputRef.current.clearValue();
        toStateInputRef.current.clearValue();
        toCityInputRef.current.clearValue();
      } else {
        setIsLoading(false);
        toast.error("Failed to post vehicle!", {
          position: "top-center",
          autoClose: 3000,
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
      toast.error("Network or Server Error!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="mt-16 relative">
      {/* Loading image section */}
      <div
        className={`w-full -mt-24 md:h-[194%] h-[217%] z-50 bg-[rgba(0,0,0,0.5)] absolute ${
          isLoading ? "" : "hidden"
        }`}
      >
        <div className=" absolute w-full h-screen flex justify-center items-center">
          <img className="w-[100px] h-[100px] fixed" src={loadingGfg} alt="" />
        </div>
      </div>

      {/* Shipping Post form */}
      <div className="md:mt-24 mt-24 py-6 pt-10 px-6 border md:w-[80%] w-[95%] mx-auto bg-[#f4f4f4] rounded-lg shadow-md shadow-gray-700">
        <form onSubmit={handleSubmit} ref={formResetUseingRef}>
          {/* Current Location or from state part */}
          <div className="w-full mx-auto grid lg:grid-cols-2">
            <div className="text-[#66451C]">
              <h2 className="lg:text-4xl text-2xl">Current Location</h2>
              <div className="grid md:grid-cols-2 mt-4">
                <div>
                  <h3 className="md:text-lg font-semibold text-black">
                    SELECT STATE
                  </h3>
                  <Select
                    ref={fromStateInputRef}
                    name="fromState"
                    id="fromState"
                    className="cursor-pointer lg:w-[180px] w-[90%]"
                    required
                    value={stateOptions.find(
                      (option) => option.value === fromStateCode
                    )}
                    onChange={handleFromStateChange}
                    options={stateOptions}
                  />
                </div>
                <div className="md:mt-0 mt-3">
                  <h3 className="md:text-lg font-semibold text-black">
                    SELECT CITY
                  </h3>
                  <Select
                    ref={fromCityInputRef}
                    name="fromCity"
                    id="fromCity"
                    required
                    className="cursor-pointer lg:w-[180px] w-[90%]"
                    value={fromCityOptions.find(
                      (option) => option.value === fromCity
                    )}
                    onChange={handleFromCityChange}
                    options={fromCityOptions}
                    isDisabled={!fromStateCode}
                  />
                  {isErrors && (
                    <p className="text-red-500">{isErrors.fromCityName}</p>
                  )}
                </div>
              </div>

              {/* <h1 className="text-3xl">Here add current location and this data show on business available load section</h1> */}
            </div>

            {/* Destination Location part */}
            <div className="text-[#66451C]">
              {/* <div> */}
              <h2 className="lg:text-4xl text-2xl">Destination Location</h2>
              <div className="grid md:grid-cols-2 mt-4">
                <div>
                  <h3 className="md:text-lg font-semibold text-black">
                    SELECT STATE
                  </h3>
                  <Select
                    ref={toStateInputRef}
                    name="toState"
                    id="toState"
                    required
                    className="cursor-pointer lg:w-[180px] w-[90%]"
                    value={stateOptions.find(
                      (option) => option.value === toStateCode
                    )}
                    onChange={handleToStateChange}
                    options={stateOptions}
                  />
                </div>
                <div className="md:mt-0 mt-3">
                  <h3 className="md:text-lg font-semibold text-black">
                    SELECT CITY
                  </h3>
                  <Select
                    ref={toCityInputRef}
                    name="toCity"
                    id="toCity"
                    required
                    className="cursor-pointer lg:w-[180px] w-[90%]"
                    value={toCityOptions.find(
                      (option) => option.value === toCity
                    )}
                    onChange={handleToCityChange}
                    options={toCityOptions}
                    isDisabled={!toStateCode}
                  />
                  {isErrors && (
                    <p className="text-red-500">{isErrors.toCityName}</p>
                  )}
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>

          {/* Vehicle Details part */}
          <div className="md:mt-20 mt-5 text-[#66451C] grid md:grid-cols-2">
            <div>
              <h2 className="md:text-4xl text-2xl">Vehicle Details</h2>
              <div className="mt-4">
                <h3 className="md:text-lg font-semibold text-black">
                  Available Capacity in Tons
                </h3>
                <select
                  name="vehicle_capacity_in_tons"
                  id="vehicleCapacity"
                  className="py-2 px-4 md:w-[60%] w-[90%] min-w-[210px] border outline-none rounded-lg shadow-md cursor-pointer"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select capacity</option>
                  {weightdata.map((capacity, index) => (
                    <option key={index} value={capacity}>
                      {capacity}
                    </option>
                  ))}
                </select>
                <br />
                <h3 className="md:text-lg font-semibold text-black md:mt-0 mt-3">
                  Vehicle Length
                </h3>
                <input
                  className="py-2 px-4 md:w-[60%] w-[90%] min-w-[210px] border outline-none rounded-lg shadow-md"
                  type="text"
                  name="vehicleLength"
                  placeholder="Please enter vehicle length.."
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div>
                <h1 className="md:text-lg font-semibold text-black md:mt-0 mt-3">Date of Availability</h1>
                <input type="date"  className="py-2 px-4 md:w-[60%] w-[90%] text-black min-w-[210px] border outline-none rounded-lg shadow-md cursor-pointer" />
              </div>
              <div>
                <h3 className="md:text-lg font-semibold text-black md:mt-0 mt-3">
                  Type of Vehicle
                </h3>
                <select
                  name="typeOfVehicle"
                  id="typeOfVehicle"
                  className="py-2 px-4 md:w-[60%] w-[90%] text-black min-w-[210px] border outline-none rounded-lg shadow-md cursor-pointer"
                  onChange={handleChange}
                  required
                >
                  {/* <option value="Both">Both</option> */}
                  <option value="Open Body">Open Body</option>
                  <option value="Close Body">Closed Body</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-[80%] mx-auto text-center">
            <button className="w-[120px] my-10 text-white py-3 ml-auto rounded-lg text-2xl shadow-md shadow-[yellow] font-bold bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PostVehicleAvailability;
