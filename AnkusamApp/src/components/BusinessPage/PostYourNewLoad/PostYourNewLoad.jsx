import React, { useState, useEffect } from "react";
import { packageweightdata } from "./data/PackageWeightData";
import { Country, State, City } from 'country-state-city';

function PostYourNewLoad() {
  const [state, setState] = useState("--state--");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("--city--");

  const [states, setStates] = useState([]);
  const [toState, setToState] = useState("--state--");
  const [toCities, setToCities] = useState([]);
  const [toCity, setToCity] = useState("--city--");

  useEffect(() => {
    // Fetch states of India
    const indianStates = State.getStatesOfCountry('IN');
    setStates(indianStates);
  }, []);

  const changeState = (e) => {
    const selectedStateCode = e.target.value;
    const selectedState = states.find(state => state.isoCode === selectedStateCode);
    setState(selectedState ? selectedState.name : "--state--");

    if (selectedStateCode !== "--state--") {
      const stateCities = City.getCitiesOfState('IN', selectedStateCode);
      setCities(stateCities);
    } else {
      setCities([]);
    }

    setCity("--city--");
  };

  const changeCity = (e) => {
    setCity(e.target.value);
  };

  const toChangeState = (e) => {
    const selectedStateCode = e.target.value;
    const selectedState = states.find(state => state.isoCode === selectedStateCode);
    setToState(selectedState ? selectedState.name : "--state--");

    if (selectedStateCode !== "--state--") {
      const stateCities = City.getCitiesOfState('IN', selectedStateCode);
      setToCities(stateCities);
    } else {
      setToCities([]);
    }

    setToCity("--city--");
  };

  const toChangeCity = (e) => {
    setToCity(e.target.value);
  };

  console.log('====================================');
  console.log("from State: ", state);
  console.log("from City: ", city);
  console.log("To State: ", toState);
  console.log("To City: ", toCity);
  console.log('====================================');

  return (
    <div className="w-full h-screen mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <form className="w-full grid md:grid-cols-2 grid-cols-1 pt-12 pb-4 px-4">
        {/* Left from part */}
        <div>
          <h1 className="md:text-3xl text-center font-bold">
            Where are you shipping from?
          </h1>
          <div className="flex justify-around mt-6 ml-[8%]">
            <div>
              <h2 className="font-semibold text-black">SELECT STATE</h2>
              <select
                value={state}
                onChange={changeState}
                className="text-black rounded-md shadow-md shadow-black cursor-pointer overflow-x-auto w-[200px]"
              >
                <option value="--state--">--state--</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h2 className="font-semibold text-black">CITY</h2>
              <select
                value={city}
                onChange={changeCity}
                className="text-black rounded-md shadow-md shadow-black cursor-pointer overflow-x-auto w-[200px]"
              >
                <option value="--city--">--city--</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Shipping section */}
          <div className="mt-8">
            <h1 className="md:text-3xl text-center font-bold">
              How would you like to ship?
            </h1>
            <div className="grid grid-cols-2 mt-4">
              <div className="ml-auto">
                <h1 className="md:text-[17px] text-center font-semibold text-black">
                  TYPE OF VEHICLE NEEDED
                </h1>
                <select className="text-black mt-2 text-center rounded-md outline-none shadow-md shadow-black cursor-pointer">
                  <option>Select one..</option>
                  <option value="Open Body">Open Body</option>
                  <option value="Closed Body">Closed Body</option>
                  <option value="Both">Both</option>
                </select>
              </div>

              <div className="ml-auto">
                <h1 className="md:text-[17px] text-center font-semibold text-black">
                  PACKAGE WEIGHT (KG)
                </h1>
                <select className="text-black mt-2 text-center rounded-md outline-none shadow-md shadow-black cursor-pointer">
                  <option>Select one..</option>
                  {packageweightdata.map((weight, index) => (
                    <option key={index} value={weight}>
                      {weight}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Contact and Goods section */}
          <div className="mt-8 w-full flex justify-around text-center">
            <div>
              <h1 className="md:text-[17px] font-semibold text-black uppercase">
                Contact Number
              </h1>
              <input
                type="text"
                placeholder="Enter Contact Number"
                maxLength={10}
                className="text-black mt-2 ml-[14%] px-4 py-2 rounded-md outline-none shadow-md shadow-black cursor-pointer"
              />
            </div>

            <div>
              <h1 className="md:text-[17px] font-semibold text-black uppercase">
                GOODS TYPE
              </h1>
              <select className="text-black mt-2 text-center rounded-md outline-none shadow-md shadow-black cursor-pointer">
                <option value="">Select one...</option>
                <option value="Personal Goods">Personal Goods</option>
                <option value="Machine">Machine</option>
                <option value="Industrial Equipment">Industrial Equipment</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right To part */}
        <div>
          <h1 className="md:text-3xl text-center font-bold">
            Where are you shipping to?
          </h1>
          <div className="flex justify-around mt-6 ml-[9%]">
            <div>
              <h2 className="font-semibold text-black">SELECT STATE</h2>
              <select
                value={toState}
                onChange={toChangeState}
                className="text-black rounded-md shadow-md shadow-black cursor-pointer overflow-x-auto w-[200px]"
              >
                <option value="--state--">--state--</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h2 className="font-semibold text-black">CITY</h2>
              <select
                value={toCity}
                onChange={toChangeCity}
                className="text-black rounded-md shadow-md shadow-black cursor-pointer overflow-x-auto w-[200px]"
              >
                <option value="--city--">--city--</option>
                {toCities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Pickup Data */}
          <div className="grid grid-cols-2 mt-8">
            <div className="">
              <h1 className="md:text-[17px] text-center font-semibold text-black">
                PICKUP DATE
              </h1>
              <input
                type="date"
                className="text-black mt-2 ml-[28%] text-center rounded-md outline-none shadow-md shadow-black cursor-pointer"
              />
            </div>
          </div>

          {/* No of wheels required */}
          <div className="grid grid-cols-2 mt-8">
            <div className="ml-[15%]">
              <h1 className="md:text-[17px] font-semibold ml-[15%] text-center text-black uppercase">
                NO OF WHEELS REQUIRED
              </h1>
              <input
                type="number"
                min={1}
                defaultValue={1}
                className="text-black mt-2 ml-[14%] px-4 py-2 rounded-md outline-none shadow-md shadow-black cursor-pointer"
              />
            </div>

            <div>
              <h1 className="md:text-[17px] font-semibold text-center text-black uppercase">
                LENGTH (FT)
              </h1>
              <input
                type="number"
                min={1}
                defaultValue={1}
                className="text-black mt-2 ml-[14%] px-4 py-2 rounded-md outline-none shadow-md shadow-black cursor-pointer"
              />
            </div>
          </div>

          {/* Upload load Photos */}
          <div className="mt-8">
            <h1 className="md:text-[17px] font-semibold text-center text-black uppercase">
              UPLOAD LOAD PHOTOS
            </h1>
            <input
              type="file"
              className="text-black mt-2 ml-[14%] px-4 py-2 rounded-md outline-none shadow-md shadow-[yellow] cursor-pointer"
            />
            <input
              type="file"
              className="text-black mt-2 ml-[14%] px-4 py-2 rounded-md outline-none shadow-md shadow-[yellow] cursor-pointer"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-[120px] py-4 ml-auto rounded-lg text-2xl shadow-md shadow-[yellow] font-bold bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
        >
          POST
        </button>
      </form>
      <hr className="border-dashed" />
      <div className="w-full flex justify-center mt-2">
        <button
          type="submit"
          className="w-[230px] py-4 rounded-lg text-2xl shadow-md shadow-[yellow] font-bold bg-gradient-to-r hover:from-green-400 to-blue-500 from-pink-500 hover:to-yellow-500"
        >
          Check Your Loads
        </button>
      </div>
    </div>
  );
}

export default PostYourNewLoad;
