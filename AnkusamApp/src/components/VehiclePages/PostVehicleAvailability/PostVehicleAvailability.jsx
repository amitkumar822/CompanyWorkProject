import React, { useState, useEffect } from "react";
import { City } from "country-state-city";

// Define the specific states with their names and ISO codes
const specificStates = [
  { name: "Tamil Nadu", isoCode: "TN" },
  { name: "Kerala", isoCode: "KL" },
  { name: "Karnataka", isoCode: "KA" },
  { name: "Andhra Pradesh", isoCode: "AP" },
  { name: "Telangana", isoCode: "TS" },
  { name: "Puducherry", isoCode: "PY" }
];

const indiaCountryCode = "IN";

function PostVehicleAvailability() {
  // State for "Shipping From"
  const [fromStateCode, setFromStateCode] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [fromCities, setFromCities] = useState([]);
  const [fromStateName, setFromStateName] = useState("");
  const [fromCityName, setFromCityName] = useState("");

  // State for "Shipping To"
  const [toStateCode, setToStateCode] = useState("");
  const [toCity, setToCity] = useState("");
  const [toCities, setToCities] = useState([]);
  const [toStateName, setToStateName] = useState("");
  const [toCityName, setToCityName] = useState("");

  // Effect to load cities when "from" state changes
  useEffect(() => {
    if (fromStateCode) {
      const citiesList = City.getCitiesOfState(indiaCountryCode, fromStateCode);
      setFromCities(citiesList);
      setFromCity("");  // Reset city selection
    }
  }, [fromStateCode]);

  // Effect to load cities when "to" state changes
  useEffect(() => {
    if (toStateCode) {
      const citiesList = City.getCitiesOfState(indiaCountryCode, toStateCode);
      setToCities(citiesList);
      setToCity("");  // Reset city selection
    }
  }, [toStateCode]);

  // Handle state change for "from"
  const handleFromStateChange = (e) => {
    const stateCode = e.target.value;
    setFromStateCode(stateCode);
    const state = specificStates.find((state) => state.isoCode === stateCode);
    setFromStateName(state ? state.name : "");
  };

  // Handle city change for "from"
  const handleFromCityChange = (e) => {
    const cityName = e.target.value;
    setFromCity(cityName);
    const city = fromCities.find((city) => city.name === cityName);
    setFromCityName(city ? city.name : "");
  };

  // Handle state change for "to"
  const handleToStateChange = (e) => {
    const stateCode = e.target.value;
    setToStateCode(stateCode);
    const state = specificStates.find((state) => state.isoCode === stateCode);
    setToStateName(state ? state.name : "");
  };

  // Handle city change for "to"
  const handleToCityChange = (e) => {
    const cityName = e.target.value;
    setToCity(cityName);
    const city = toCities.find((city) => city.name === cityName);
    setToCityName(city ? city.name : "");
  };

  // console.log('====================================');
  // console.log("FromState: ", fromStateName);
  // console.log("FromCity: ", fromCityName);
  // console.log("ToState: ", toStateName);
  // console.log("ToCity: ", toCityName);
  // console.log('====================================');

  // Types of vehicles data stored in the state
  const [vehicleType, setVehicleTyps] = useState("")

  // console.log('====================================');
  // console.log("VehicleType: ",vehicleType);
  // console.log('====================================');

  // Vehicle Capacity data stored in the state
  const [vehicleCapacity, setVehicleCapacity] = useState("")
  // Vehicle load data stored in the state
  const [vehicleLength , setVehicleLength] = useState("")

  console.log('====================================');
  console.log("VehicleCapacity: ", vehicleCapacity);
  console.log("VehicleLength: ", vehicleLength);
  console.log('====================================');

  return (
    <>
      <div className="mt-16">
        {/*👉 Top Upper screen part */}
        <div className="w-full mx-auto mt-24 flex justify-around">
          <div className="w-full md:text-[7vw] text-[21px] text-center font-bold pt-4 md:hidden block text-yellow-500">
            <h1>Your <span className=" text-red-500">Vehicle</span> <span className="text-[#51CFED]"> Availability</span></h1>
            <div className="w-[220px] border mx-auto shadow-md"></div>
          </div>
          {/* Vehicle part1 */}
          <div className=" hidden md:block">
            <div className=" mb-[200px]">
              {/* imgage rotate */}
              <img
                src="https://www.ankusamlogistics.com/assets/img/shape/orange-1.svg"
                alt="Rotating"
                className="w-[59px] animate-spin-slow mt-12"
              />
            </div>
            {/* vehicle part */}
            <div>
              <img
                src="https://www.ankusamlogistics.com/assets/img/slider/truck.svg"
                alt=""
                className="-ml-[20%] w-[15vw] animate-left-right"
              />
            </div>
          </div>
          {/* Text part2 */}
          <div className="mt-20 uppercase hidden md:block">
            <h1 className="text-[7vw] font-bold text-center text-yellow-500">
              Your <br /> <span className=" text-red-500">Vehicle</span> <br /> <span className="text-[#51CFED]"> Availability</span>
            </h1>
          </div>
          {/* Box right part3 */}
          <div>
            {/* 1st img */}
            <div className="mt-12 hidden md:block">
              <img
                src="https://www.ankusamlogistics.com/assets/img/shape/berry-1.svg"
                alt=""
                className=" animate-spin-slow2 ml-20"
              />
            </div>
            {/* 2st img */}
            <div className="mt-[200px] hidden md:block">
              <img
                src="https://www.ankusamlogistics.com/assets/img/slider/nav-box.svg"
                alt=""
                className="animate-up-down mr-14 w-[12vw]"
              />
              <img
                src="https://www.ankusamlogistics.com/assets/img/shape/dot-a.svg"
                alt=""
                className=" ml-[15vw] animate-up-down lg:block hidden"
              />
            </div>
          </div>
        </div>

        {/*👉 Shipping Post form */}
        <div className="md:mt-36 mt-10 py-6 pt-10 px-6 border md:w-[80%] w-[95%] mx-auto bg-[#f4f4f4] rounded-lg shadow-md shadow-gray-700">
          <form>
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
                      <select 
                        name="fromState" 
                        id="fromState"
                        className="cursor-pointer w-[130px]"
                        value={fromStateCode}
                        onChange={handleFromStateChange}
                      >
                        <option value="">Select State</option>
                        {specificStates.map((state) => (
                          <option key={state.isoCode} value={state.isoCode}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <h3 className="md:text-lg font-semibold text-black">
                        SELECT CITY
                      </h3>
                      <select 
                        name="fromCity" 
                        id="fromCity"
                        className="cursor-pointer w-[150px]"
                        value={fromCity}
                        onChange={handleFromCityChange}
                        disabled={!fromStateCode}
                      >
                        <option value="">Select City</option>
                        {fromCities.map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
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
                      name="vehicleType" 
                      id="vehicleType"
                      className="cursor-pointer w-[150px]"
                      // value={vehicleType}
                      onChange={(e) => setVehicleTyps(e.target.value)}
                    >
                      <option value="">Select one..</option>
                      <option value="Open Body"
                      onChange={(e) => setVehicleTyps(e.target.value)}
                      >Open Body</option>
                      <option value="Closed Body"
                      onChange={(e) => setVehicleTyps(e.target.value)}
                      >Closed Body</option>
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
                      <select 
                        name="toState" 
                        id="toState"
                        className="cursor-pointer w-[130px]"
                        value={toStateCode}
                        onChange={handleToStateChange}
                      >
                        <option value="">Select State</option>
                        {specificStates.map((state) => (
                          <option key={state.isoCode} value={state.isoCode}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <h3 className="md:text-lg font-semibold text-black">
                        SELECT CITY
                      </h3>
                      <select 
                        name="toCity" 
                        id="toCity"
                        className="cursor-pointer w-[150px]"
                        value={toCity}
                        onChange={handleToCityChange}
                        disabled={!toStateCode}
                      >
                        <option value="">Select City</option>
                        {toCities.map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
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
                    <input
                      className="py-2 px-4 md:w-[60%] border outline-none rounded-lg shadow-md"
                      type="text"
                      placeholder="Please enter capacity in tons..."
                      required
                      value={vehicleCapacity}
                      onChange={(e) => setVehicleCapacity(e.target.value)}
                    />
                    <br />
                    <h3 className="md:text-lg font-semibold text-black">
                      Vehicle Length
                    </h3>
                    <input
                      className="py-2 px-4 md:w-[60%] border outline-none rounded-lg shadow-md"
                      type="text"
                      placeholder="Please enter vehicle length.."
                      required
                      value={vehicleLength}
                      onChange={(e) => setVehicleLength(e.target.value)}
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
      </div>
    </>
  );
}

export default PostVehicleAvailability;
