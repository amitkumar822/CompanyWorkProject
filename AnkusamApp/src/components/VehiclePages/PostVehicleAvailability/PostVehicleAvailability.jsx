import React, { useState, useEffect, useContext } from "react";
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

  // State for form data and loading status
  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState({
    typeOfVehicle: null,
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
    setIsLoading(true);

    const formData = new FormData();
    formData.append("driver_id", vehiLogUser?.driver_id);
    formData.append("typeOfVehicle", files.typeOfVehicle);
    formData.append("vehicle_capacity_in_tons", files.vehicle_capacity_in_tons);
    formData.append("vehicleLength", files.vehicleLength);
    formData.append("fromstate", fromStateName);
    formData.append("fromcity", fromCityName);
    formData.append("tostate", toStateName);
    formData.append("tocity", toCityName);

    try {
      const response = await axios.post(
        "/api/driver/webapi/post_vehicle_availity_for_driver.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
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

        setTimeout(() => {
          // Refresh the page
          window.location.reload();
        }, 1500);

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
        className={`w-full h-full z-10 bg-[rgba(0,0,0,0.5)] absolute ${
          isLoading ? "" : "hidden"
        }`}
      >
        <div className=" absolute w-full h-screen flex justify-center items-center">
          <img className="w-[100px] h-[100px] fixed" src={loadingGfg} alt="" />
        </div>
      </div>

      {/* Shipping Post form */}
      <div className="md:mt-36 mt-10 py-6 pt-10 px-6 border md:w-[80%] w-[95%] mx-auto bg-[#f4f4f4] rounded-lg shadow-md shadow-gray-700">
        <form onSubmit={handleSubmit}>
          {/* Shipping from part */}
          <div className="w-full mx-auto grid lg:grid-cols-2">
            <div className="text-[#66451C]">
              <div>
                <h2 className="lg:text-4xl md:text-3xl text-[22px]">
                  Where are you shipping from?
                </h2>
                <div className="grid grid-cols-2 mt-4">
                  <div>
                    <h3 className="md:text-lg font-semibold text-black">
                      SELECT STATE
                    </h3>
                    <Select
                      name="fromState"
                      id="fromState"
                      className="cursor-pointer w-[130px]"
                      required
                      value={stateOptions.find(
                        (option) => option.value === fromStateCode
                      )}
                      onChange={handleFromStateChange}
                      options={stateOptions}
                    />
                  </div>
                  <div>
                    <h3 className="md:text-lg font-semibold text-black">
                      SELECT CITY
                    </h3>
                    <Select
                      name="fromCity"
                      id="fromCity"
                      required
                      className="cursor-pointer w-[150px]"
                      value={fromCityOptions.find(
                        (option) => option.value === fromCity
                      )}
                      onChange={handleFromCityChange}
                      options={fromCityOptions}
                      isDisabled={!fromStateCode}
                    />
                  </div>
                </div>
              </div>

              <div className="md:mt-20 mt-10">
                <h2 className="lg:text-4xl md:text-3xl text-[22px]">
                  How would you like to deliver?
                </h2>
                <div className="mt-4">
                  <h3 className="md:text-lg font-semibold text-black">
                    TYPE OF VEHICLE
                  </h3>
                  <select
                    name="typeOfVehicle"
                    id="vehicleType"
                    className="py-2 px-4 md:w-[60%] border outline-none rounded-lg shadow-md cursor-pointer"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select one..</option>
                    <option value="Open Body">Open Body</option>
                    <option value="Closed Body">Closed Body</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Shipping To part */}
            <div className="text-[#66451C] mt-4">
              <div>
                <h2 className="lg:text-4xl md:text-3xl text-[22px]">
                  Where are you shipping to?
                </h2>
                <div className="grid grid-cols-2 mt-4">
                  <div>
                    <h3 className="md:text-lg font-semibold text-black">
                      SELECT STATE
                    </h3>
                    <Select
                      name="toState"
                      id="toState"
                      required
                      className="cursor-pointer w-[130px]"
                      value={stateOptions.find(
                        (option) => option.value === toStateCode
                      )}
                      onChange={handleToStateChange}
                      options={stateOptions}
                    />
                  </div>
                  <div>
                    <h3 className="md:text-lg font-semibold text-black">
                      SELECT CITY
                    </h3>
                    <Select
                      name="toCity"
                      id="toCity"
                      required
                      className="cursor-pointer w-[150px]"
                      value={toCityOptions.find(
                        (option) => option.value === toCity
                      )}
                      onChange={handleToCityChange}
                      options={toCityOptions}
                      isDisabled={!toStateCode}
                    />
                  </div>
                </div>
              </div>
              <div className="md:mt-20 mt-8">
                <h2 className="lg:text-4xl md:text-3xl text-[22px]">
                  Vehicle Details
                </h2>
                <div className="mt-4">
                  <h3 className="md:text-lg font-semibold text-black">
                    Vehicle Capacity in Tons
                  </h3>
                  <select
                    name="vehicle_capacity_in_tons"
                    id="vehicleCapacity"
                    className="py-2 px-4 md:w-[60%] border outline-none rounded-lg shadow-md cursor-pointer"
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
                  <h3 className="md:text-lg font-semibold text-black">
                    Vehicle Length
                  </h3>
                  <input
                    className="py-2 px-4 md:w-[60%] border outline-none rounded-lg shadow-md"
                    type="text"
                    name="vehicleLength"
                    placeholder="Please enter vehicle length.."
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[80%] mx-auto text-center">
            <button
              type="submit"
              className="w-[120px] my-10 text-white py-3 ml-auto rounded-lg text-2xl shadow-md shadow-[yellow] font-bold bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
            >
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
