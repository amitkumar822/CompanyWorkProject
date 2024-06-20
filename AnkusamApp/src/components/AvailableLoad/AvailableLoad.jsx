import React, { useEffect, useRef, useState } from "react";
import { State, City } from "country-state-city"; // Importing from country-state-city package
import Select from "react-select";
import { weightdata } from "../../data/WeightData"; // Importing weight data
import Typed from "typed.js"; // Importing Typed.js for typing animation
import { IoSearch } from "react-icons/io5"; // Importing search icon
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Table how many items to show per page
const ITEMS_PER_PAGE = 40; // Constant to define items per page

function AvailableLoad() {
  const typedRef = useRef(null); // Reference for the typing animation

  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    if (!localStorage.getItem("TokeLoginVehiPage")) {
      navigate("/");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const options = {
      strings: ["Welcome to Ankusam logistic!"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };
    const typed = new Typed(typedRef.current, options); // Initializing typing animation

    return () => {
      typed.destroy(); // Cleanup animation on component unmount
    };
  }, []);

  //=======👇 States and Cities filter sections 👇======

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
    setStateName(selectedState ? selectedState.name : "");
    // Reset cities
    setCity("");
    setCityName("");
  };

  const handleCityChange = (selectedOption) => {
    const selectedCityName = selectedOption?.value || "";
    setCity(selectedCityName);
    setCityName(selectedCityName);
  };

  // State and cities input search functionality
  const states = State.getStatesOfCountry("IN").map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  const cities = City.getCitiesOfState("IN", state).map((city) => ({
    value: city.name,
    label: city.name,
  }));

  //=========== 👇 Filter Section Start 👇================

  const stateInputRef = useRef();
  const cityInputRef = useRef();

  const [weight, setWeight] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "/api/driver/webapi/filtter_by_city.php"
          "/api/load/get_load.php"
        );

        // console.log("Response All1: ", JSON.stringify(response, null, 2));

        if (Array.isArray(response.data.load)) {
          // console.log("Response All2: ", response.data.load);
          setCurrentData(response.data.load);
          setFilteredData(response.data.load);
          // console.error("filteredData is not an array:", filteredData);
          return null; // Or handle the error appropriately
        }
        // setFilteredData(response.data); // Initialize filtered data with the full dataset
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchData();
  }, []);

  // Filter state and city and weight wise
  const filterData = () => {
    if (!Array.isArray(currentData)) {
      // console.error("currentData is not an array:", currentData);
      return null; // Or handle the error appropriately
    }

    const filteredData = currentData.filter((item) => {
      const matchState = state === "" || item.fromState === stateName;
      const matchCity = city === "" || item.fromCity === cityName;
      const matchWeight = weight === "" || item.packageWeight === weight;

      const matchSearch =
        searchInput === "" ||
        item.fromState
          .toString()
          .toLowerCase()
          .includes(searchInput.toString().trim().toLowerCase()) ||
        item.fromCity
          .toString()
          .toLowerCase()
          .includes(searchInput.toString().trim().toLowerCase()) ||
        item.packageWeight
          .toString()
          .toLowerCase()
          .includes(searchInput.toString().trim().toLowerCase()) ||
        item.contactNumber
          .toString()
          .toLowerCase()
          .includes(searchInput.toString().trim().toLowerCase()) ||
        item.toCity
          .toString()
          .toLowerCase()
          .includes(searchInput.toString().trim().toLowerCase()) ||
        item.toState
          .toString()
          .toLowerCase()
          .includes(searchInput.toString().trim().toLowerCase());

      return matchState && matchCity && matchWeight && matchSearch;
    });
    setFilteredData(filteredData);
  };

  useEffect(() => {
    filterData();
  }, [state, city, weight, searchInput, currentData]);

  return (
    <>
      <div className="w-full mt-20">
        {/* Filter Section */}
        <div className="w-[80%] mx-auto mb-10">
          <h1 className="text-3xl font-semibold text-center">Data Filter</h1>

          <div className="w-[100%] mx-auto gap-14 order-1 justify-content-center d-flex vh-100 bg-dark grid lg:grid-cols-2 grid-cols-1">
            <div className="min-w-[310px] mt-5">
              <h1 className="text-green-500">Filter by state</h1>
              <Select
                ref={stateInputRef}
                className="form-control w-full text-sm bg-[#F1F2F4] cursor-pointer"
                options={states}
                required
                value={states.find((option) => option.value === state)}
                onChange={handleStateChange}
              />
              <br />
              <h1 className="text-[#49796a]">Filter by city</h1>
              <Select
                ref={cityInputRef}
                className="form-control w-full text-sm bg-[#F1F2F4] cursor-pointer"
                options={cities}
                required
                value={cities.find((option) => option.value === city)}
                onChange={handleCityChange}
                isDisabled={!state}
              />
              <br />
              <h1>Weight:</h1>
              <select
                className="form-control w-full text-sm bg-[#F1F2F4] cursor-pointer"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              >
                <option value="">Select one..</option>
                {weightdata.map((weight, index) => (
                  <option key={index} value={weight}>
                    {weight}
                  </option>
                ))}
              </select>

              {/* Reset Button */}
              <div className="relative flex items-center gap-4 mt-4">
                <button
                  className="hover:bg-blue-600 bg-blue-500 duration-300 py-1 px-2 text-xl font-semibold text-white rounded-lg shadow-md shadow-gray-800 uppercase italic"
                  onClick={() => {
                    setState("");
                    setCity("");
                    setWeight("");
                    setStateName("");
                    setCityName("");
                    setSearchInput("");
                    setFilteredData(currentData); // Reset filtered data
                    //cleare all state and city input fields help of useRef
                    stateInputRef.current.clearValue();
                    cityInputRef.current.clearValue();
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Animation Text */}
            <div className="mt-5 w-[350px] mx-auto text-3xl font-bold text-white border md:block hidden rounded-lg p-5 bg-gradient-to-r from-purple-500 to-yellow-500 shadow-md shadow-yellow-400">
              <span ref={typedRef}></span> {/* Typed.js animation text */}
            </div>
          </div>
        </div>

        {/* Load List */}
        <div
          className={`md:w-[90%] w-[95%] mx-auto md:px-4 px-2 py-6 border bg-[#f2f2f2] rounded-lg shadow-md`}
        >
          <h1 className="text-3xl text-center text-red-600 font-bold underline mb-4">
            Load List
          </h1>

          {/* Search functionality bar */}
          <div className="flex md:w-[50%] w-[90%] items-center justify-end gap-1 relative mb-4">
            <span>Search</span>{" "}
            <input
              className="py-1 w-full px-2 border border-[black] rounded-lg outline-none"
              type="text"
              placeholder="Search by from city..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <IoSearch className="absolute right-4" />
          </div>

          {/* Load list Table */}
          <div className="overflow-x-auto">
            <div className="overflow-y-auto max-h-[600px]">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-white border-b border-gray-300 sticky top-0 z-[1]">
                  <tr className="whitespace-nowrap text-[14px] md:text-[16px]">
                    <th className="px-4 py-2 border-b">SI Nb</th>
                    <th
                      className={`px-4 py-2 border-b ${
                        !stateName && !searchInput.trim() && "hidden"
                      }`}
                    >
                      From State
                    </th>
                    <th className="px-4 py-2 border-b">From City</th>
                    <th
                      className={`px-4 py-2 border-b ${
                        !stateName && !searchInput.trim() && "hidden"
                      }`}
                    >
                      To State
                    </th>
                    <th className="px-4 py-2 border-b">To City</th>
                    <th className="px-4 py-2 border-b">Pickup Time</th>
                    <th className="px-4 py-2 border-b">Vehicle Type</th>
                    <th className="px-4 py-2 border-b">Weight</th>
                    <th
                      className={`px-4 py-2 border-b`}
                    >
                      Contact Number
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-200" : ""
                      } whitespace-nowrap`}
                    >
                      <td className="px-4 py-2 border-b">{index + 1}</td>
                      <td
                        className={`px-4 py-2 border-b ${
                          !stateName && !searchInput.trim() && "hidden"
                        }`}
                      >
                        {item.fromState}
                      </td>
                      <td className="px-4 py-2 border-b">{item.fromCity}</td>
                      <td
                        className={`px-4 py-2 border-b ${
                          !stateName && !searchInput.trim() && "hidden"
                        }`}
                      >
                        {item.toState}
                      </td>
                      <td className="px-4 py-2 border-b">{item.toCity}</td>
                      <td className="px-4 py-2 border-b">
                        {formatDate(item.pickUPDate)}{" "}
                        {/* Format date for display */}
                      </td>
                      <td className="px-4 py-2 border-b">{item.vehicleType}</td>
                      <td className="px-4 py-2 border-b">
                        {item.packageWeight}
                      </td>
                      <td className={`px-4 py-2 border-b `}>
                        <a
                          href={`tel:${item.contactNumber}`}
                          className="text-blue-500 hover:text-blue-800 duration-200 underline"
                        >
                          {item.contactNumber}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h1
                className={`${
                  currentData.length !== 0 && "hidden"
                } text-red-500`}
              >
                Data is loading ...
              </h1>
              <h1
                className={`${filteredData.length !== 0 && "hidden"} ${
                  currentData.length === 0 && "hidden"
                } text-red-500`}
              >
                No data found ...
              </h1>
            </div>
          </div>

          {/* Pagination Section */}
          {/* <div className="flex justify-between mt-4">
            <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200">
              Previous
            </button>
            <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200">
              Next
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default AvailableLoad;

// Date Format function
function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", dateString);
    return dateString; // Return the original string if the date is invalid
  }

  const options = { month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  const [month, day] = formattedDate.split(" ");

  return `${month}, ${day}`; // Format date to 'Month, Day'
}
