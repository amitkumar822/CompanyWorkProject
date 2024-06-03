// import React, { useState, useEffect } from "react";
// import { City } from "country-state-city";
// import Select from 'react-select';
// import { weightdata } from "../../../data/WeightData";
// import { useNavigate } from "react-router";

// // Define the specific states with their names and ISO codes
// const specificStates = [
//   { name: "Tamil Nadu", isoCode: "TN" },
//   { name: "Kerala", isoCode: "KL" },
//   { name: "Karnataka", isoCode: "KA" },
//   { name: "Andhra Pradesh", isoCode: "AP" },
//   { name: "Telangana", isoCode: "TS" },
//   { name: "Puducherry", isoCode: "PY" }
// ];

// const indiaCountryCode = "IN";

// function PostVehicleAvailability() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!localStorage.getItem("TokeLoginVehiPage")) {
//       navigate("/vehiclelogin");
//       return;
//     }
//   }, []);

//   // State for "Shipping From"
//   const [fromStateCode, setFromStateCode] = useState("");
//   const [fromCity, setFromCity] = useState("");
//   const [fromCities, setFromCities] = useState([]);
//   const [fromStateName, setFromStateName] = useState("");
//   const [fromCityName, setFromCityName] = useState("");

//   // State for "Shipping To"
//   const [toStateCode, setToStateCode] = useState("");
//   const [toCity, setToCity] = useState("");
//   const [toCities, setToCities] = useState([]);
//   const [toStateName, setToStateName] = useState("");
//   const [toCityName, setToCityName] = useState("");

//   // Effect to load cities when "from" state changes
//   useEffect(() => {
//     if (fromStateCode) {
//       const citiesList = City.getCitiesOfState(indiaCountryCode, fromStateCode);
//       setFromCities(citiesList);
//       setFromCity("");  // Reset city selection
//     }
//   }, [fromStateCode]);

//   // Effect to load cities when "to" state changes
//   useEffect(() => {
//     if (toStateCode) {
//       const citiesList = City.getCitiesOfState(indiaCountryCode, toStateCode);
//       setToCities(citiesList);
//       setToCity("");  // Reset city selection
//     }
//   }, [toStateCode]);

//   // Handle state change for "from"
//   const handleFromStateChange = (selectedOption) => {
//     const stateCode = selectedOption ? selectedOption.value : "";
//     setFromStateCode(stateCode);
//     const state = specificStates.find((state) => state.isoCode === stateCode);
//     setFromStateName(state ? state.name : "");
//   };

//   // Handle city change for "from"
//   const handleFromCityChange = (selectedOption) => {
//     const cityName = selectedOption ? selectedOption.label : "";
//     setFromCity(cityName);
//     const city = fromCities.find((city) => city.name === cityName);
//     setFromCityName(city ? city.name : "");
//   };

//   // Handle state change for "to"
//   const handleToStateChange = (selectedOption) => {
//     const stateCode = selectedOption ? selectedOption.value : "";
//     setToStateCode(stateCode);
//     const state = specificStates.find((state) => state.isoCode === stateCode);
//     setToStateName(state ? state.name : "");
//   };

//   // Handle city change for "to"
//   const handleToCityChange = (selectedOption) => {
//     const cityName = selectedOption ? selectedOption.label : "";
//     setToCity(cityName);
//     const city = toCities.find((city) => city.name === cityName);
//     setToCityName(city ? city.name : "");
//   };

//   // Prepare state options for react-select
//   const stateOptions = specificStates.map((state) => ({
//     value: state.isoCode,
//     label: state.name
//   }));

//   // Prepare city options for react-select
//   const fromCityOptions = fromCities.map((city) => ({
//     value: city.name,
//     label: city.name
//   }));

//   const toCityOptions = toCities.map((city) => ({
//     value: city.name,
//     label: city.name
//   }));

//   // Types of vehicles data stored in the state
//   const [vehicleType, setVehicleTyps] = useState("")

//   // Vehicle Capacity data stored in the state
//   const [vehicleCapacity, setVehicleCapacity] = useState("")
//   // Vehicle load data stored in the state
//   const [vehicleLength , setVehicleLength] = useState("")

//   return (
//     <>
//       <div className="mt-16">
//         {/*👉 Shipping Post form */}
//         <div className="md:mt-36 mt-10 py-6 pt-10 px-6 border md:w-[80%] w-[95%] mx-auto bg-[#f4f4f4] rounded-lg shadow-md shadow-gray-700">
//           <form>
//             {/* Shipping from part */}
//             <div className="w-full mx-auto grid lg:grid-cols-2">
//               <div className="text-[#66451C]">
//                 <div>
//                   <h2 className="lg:text-4xl md:text-3xl text-[22px]">
//                     Where are you shipping from?
//                   </h2>
//                   <div className="grid grid-cols-2 mt-4">
//                     <div>
//                       <h3 className="md:text-lg font-semibold text-black">
//                         SELECT STATE
//                       </h3>
//                       <Select 
//                         name="fromState" 
//                         id="fromState"
//                         className="cursor-pointer w-[130px]"
//                         value={stateOptions.find(option => option.value === fromStateCode)}
//                         onChange={handleFromStateChange}
//                         options={stateOptions}
//                       />
//                     </div>
//                     <div>
//                       <h3 className="md:text-lg font-semibold text-black">
//                         SELECT CITY
//                       </h3>
//                       <Select 
//                         name="fromCity" 
//                         id="fromCity"
//                         className="cursor-pointer w-[150px]"
//                         value={fromCityOptions.find(option => option.value === fromCity)}
//                         onChange={handleFromCityChange}
//                         options={fromCityOptions}
//                         isDisabled={!fromStateCode}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="md:mt-20 mt-10">
//                   <h2 className="lg:text-4xl md:text-3xl text-[22px]">
//                     How would you like to deliver?
//                   </h2>
//                   <div className="mt-4">
//                     <h3 className="md:text-lg font-semibold text-black">
//                       TYPE OF VEHICLE
//                     </h3>
//                     <select 
//                       name="vehicleType" 
//                       id="vehicleType"
//                       className="py-2 px-4 md:w-[60%] border outline-none rounded-lg shadow-md cursor-pointer "
//                       // value={vehicleType}
//                       onChange={(e) => setVehicleTyps(e.target.value)}
//                     >
//                       <option value="">Select one..</option>
//                       <option value="Open Body"
//                       onChange={(e) => setVehicleTyps(e.target.value)}
//                       >Open Body</option>
//                       <option value="Closed Body"
//                       onChange={(e) => setVehicleTyps(e.target.value)}
//                       >Closed Body</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Shipping To part */}
//               <div className="text-[#66451C] mt-4">
//                 <div>
//                   <h2 className="lg:text-4xl md:text-3xl text-[22px]">
//                     Where are you shipping to?
//                   </h2>
//                   <div className="grid grid-cols-2 mt-4">
//                     <div>
//                       <h3 className="md:text-lg font-semibold text-black">
//                         SELECT STATE
//                       </h3>
//                       <Select 
//                         name="toState" 
//                         id="toState"
//                         className="cursor-pointer w-[130px]"
//                         value={stateOptions.find(option => option.value === toStateCode)}
//                         onChange={handleToStateChange}
//                         options={stateOptions}
//                       />
//                     </div>
//                     <div>
//                       <h3 className="md:text-lg font-semibold text-black">
//                         SELECT CITY
//                       </h3>
//                       <Select 
//                         name="toCity" 
//                         id="toCity"
//                         className="cursor-pointer w-[150px]"
//                         value={toCityOptions.find(option => option.value === toCity)}
//                         onChange={handleToCityChange}
//                         options={toCityOptions}
//                         isDisabled={!toStateCode}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="md:mt-20 mt-8">
//                   <h2 className="lg:text-4xl md:text-3xl text-[22px]">
//                     Vehicle Details
//                   </h2>
//                   <div className="mt-4">
//                     <h3 className="md:text-lg font-semibold text-black">
//                       Vehicle Capacity in Tons
//                     </h3>
//                    <select name="" id=""
//                    className="py-2 px-4 md:w-[60%] border outline-none rounded-lg shadow-md cursor-pointer"
//                    >
//                     <option value="">Select capacity</option>
//                     {
//                       weightdata.map((capacity, index) => (
//                         <option key={index} value={capacity.capacity}>
//                           {capacity}
//                         </option>
//                       ))
//                     }
//                    </select>
//                     <br />
//                     <h3 className="md:text-lg font-semibold text-black">
//                       Vehicle Length
//                     </h3>
//                     <input
//                       className="py-2 px-4 md:w-[60%] border outline-none rounded-lg shadow-md"
//                       type="text"
//                       placeholder="Please enter vehicle length.."
//                       required
//                       value={vehicleLength}
//                       onChange={(e) => setVehicleLength(e.target.value)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="w-[80%] mx-auto text-center">
//               <button
//                 type="submit"
//                 className="w-[120px] my-10 text-white py-3 ml-auto rounded-lg text-2xl shadow-md shadow-[yellow] font-bold bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PostVehicleAvailability;


import React, { useState, useEffect } from "react";
import { City, State } from "country-state-city";
import Select from 'react-select';
import { weightdata } from "../../../data/WeightData";
import { useNavigate } from "react-router";

// Define the country code for India
const indiaCountryCode = "IN";

function PostVehicleAvailability() {
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
  const [fromCity, setFromCity] = useState("");
  const [fromCities, setFromCities] = useState([]);

  // State for "Shipping To"
  const [toStateCode, setToStateCode] = useState("");
  const [toCity, setToCity] = useState("");
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
  };

  // Handle city change for "from"
  const handleFromCityChange = (selectedOption) => {
    setFromCity(selectedOption ? selectedOption.label : "");
  };

  // Handle state change for "to"
  const handleToStateChange = (selectedOption) => {
    setToStateCode(selectedOption ? selectedOption.value : "");
  };

  // Handle city change for "to"
  const handleToCityChange = (selectedOption) => {
    setToCity(selectedOption ? selectedOption.label : "");
  };

  // Prepare state options for react-select
  const stateOptions = State.getStatesOfCountry(indiaCountryCode).map((state) => ({
    value: state.isoCode,
    label: state.name
  }));

  // Prepare city options for react-select
  const fromCityOptions = fromCities.map((city) => ({
    value: city.name,
    label: city.name
  }));

  const toCityOptions = toCities.map((city) => ({
    value: city.name,
    label: city.name
  }));

  // Types of vehicles data stored in the state
  const [vehicleType, setVehicleTyps] = useState("");

  // Vehicle Capacity data stored in the state
  const [vehicleCapacity, setVehicleCapacity] = useState("");

  // Vehicle load data stored in the state
  const [vehicleLength, setVehicleLength] = useState("");

  return (
    <div className="mt-16">
      {/* Shipping Post form */}
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
                    <Select 
                      name="fromState" 
                      id="fromState"
                      className="cursor-pointer w-[130px]"
                      value={stateOptions.find(option => option.value === fromStateCode)}
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
                      className="cursor-pointer w-[150px]"
                      value={fromCityOptions.find(option => option.value === fromCity)}
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
                    name="vehicleType" 
                    id="vehicleType"
                    className="py-2 px-4 md:w-[60%] border outline-none rounded-lg shadow-md cursor-pointer"
                    onChange={(e) => setVehicleTyps(e.target.value)}
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
                      className="cursor-pointer w-[130px]"
                      value={stateOptions.find(option => option.value === toStateCode)}
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
                      className="cursor-pointer w-[150px]"
                      value={toCityOptions.find(option => option.value === toCity)}
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
                    name="vehicleCapacity" 
                    id="vehicleCapacity"
                    className="py-2 px-4 md:w-[60%] border outline-none rounded-lg shadow-md cursor-pointer"
                    onChange={(e) => setVehicleCapacity(e.target.value)}
                  >
                    <option value="">Select capacity</option>
                    {weightdata.map((capacity, index) => (
                      <option key={index} value={capacity.capacity}>
                        {capacity.capacity}
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
  );
}

export default PostVehicleAvailability;
