import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { weightdata } from "../../../data/WeightData";
import { useNavigate } from "react-router";

function PostYourLoadBusi() {
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('TokenLoginBusinpage')) {
            navigate('/businesslogin')
            return;
        }
    }, [])

  // State management for shipping from and to locations
  const [fromState, setFromState] = useState(null);
  const [fromCity, setFromCity] = useState(null);
  const [fromStateName, setFromStateName] = useState("");
  const [fromCityName, setFromCityName] = useState("");
  const [toState, setToState] = useState(null);
  const [toCity, setToCity] = useState(null);
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
    setFromCity(null); // Reset city selection
    setFromCityName("");
  };

  const handleToStateChange = (selected) => {
    setToState(selected.value);
    setToStateName(selected.label);
    setToCity(null); // Reset city selection
    setToCityName("");
  };

  // Handle city selection change
  const handleFromCityChange = (selected) => {
    setFromCity(selected.value);
    setFromCityName(selected.label);
  };

  const handleToCityChange = (selected) => {
    setToCity(selected.value);
    setToCityName(selected.label);
  };

  console.log("====================================");
  console.log("From state: " + fromStateName);
  console.log("From city: " + fromCityName);
  console.log("To state: " + toStateName);
  console.log("To city: " + toCityName);
  console.log("====================================");

  return (
    <>
      <div className="mt-16">
        <div className="lg:w-[80%] w-[90%] mx-auto pt-14">
          <form className="w-full mx-auto border pt-6 pb-10 pl-4 rounded-xl bg-gray-00 shadow-md shadow-gray-800">
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
                      className="py-2 px-4 min-w-[180px] lg:w-[70%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                    >
                      <option>Select one...</option>
                      <option value="Open Body">Open Body</option>
                      <option value="Closed Body">Closed Body</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                  {/* TYPE OF VEHICLE NEEDED */}
                  <div className="lg:mt-0 mt-4">
                    <h1 className="md:text-lg font-semibold text-black uppercase mb-2">
                      PACKAGE WEIGHT (Ton)
                    </h1>
                    <select
                      required
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
                    required
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
                    required
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
                  required
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
                  required
                  className="py-2 px-4 min-w-[180px] bg-gray-300 lg:w-[70%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                />
                <input
                  type="file"
                  required
                  className="py-2 px-4 mt-2 min-w-[180px] bg-gray-300 lg:w-[70%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                />
              </div>
            </div>
            <div className="w-full mx-auto flex justify-center items-center">
              <button class="py-2 px-4 text-2xl font-semibold italic text-white rounded-xl mt-10 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...">
                POST
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostYourLoadBusi;
