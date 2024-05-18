import React, { useEffect, useRef, useState } from "react";
import { countries } from "../../../data/StateCityData";
import { weightdata } from "../../../data/WeightData";
import Typed from "typed.js";
import { data } from "../../../data/LoadListData";

//table how many page show items
const ITEMS_PER_PAGE = 20;

function LoadDataList() {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "Welcome to The Ankusam Engineering pvt ltd",
        "Ower services are the world's best services",
        "Over 5,000+ Clients all over the world",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };
    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  // 👉 This section filter state and city
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  // 👉Pload State store all data in state
  const [ploadData, setPloadData] = useState([]);

  const changeCountry = (event) => {
    setCountry(event.target.value);
    setStates(countries.find((ctr) => ctr.name === event.target.value).states);
  };

  const changeState = (event) => {
    setState(event.target.value);
    setCities(states.find((state) => state.name === event.target.value).cities);
  };

  const changeCity = (event) => {
    setCity(event.target.value);
  };
  // 👉End This section filter state and city

  //👉 Table Pagenation or Style Section starting at this point
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(data.length / ITEMS_PER_PAGE))
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const currentData = ploadData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  //👉End Table Pagenation or Style this section

  // 👉Pload Section starting
  // useState upper diffine
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/driver/pload.php");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setPloadData(result);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  // 👉End Pload Section starting

  
  // Toggle Button Section
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };
  //End Toggle Button Section

  return (
    <>
      <div className=" w-full mt-20">
        {/*👉 Filter Section */}
        <div className="w-[80%] mx-auto mb-10">
          <h1 className=" text-3xl font-semibold text-center">Data Filter</h1>

          <div className="w-[100%] mx-auto gap-14 order-1 justify-content-center d-flex vh-100 bg-dark grid lg:grid-cols-2 grid-cols-1">
            <div className="min-w-[310px] mt-5 ">
              <h1 className=" text-blue-600">Filter by country</h1>
              <select
                className=" form-control w-full text-sm bg-[#F1F2F4] cursor-pointer"
                value={country}
                onChange={changeCountry}
              >
                <option>--Country--</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              <br />
              <h1 className=" text-green-500">Filter by state</h1>
              <select
                className="form-control w-full text-sm bg-[#F1F2F4] cursor-pointer"
                value={state.name}
                onChange={changeState}
              >
                <option value="">--State--</option>
                {states.map((state, index) => (
                  <option key={index} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
              <br />
              <h1 className=" text-[#49796a]">Filter by city</h1>
              <select
                className="form-control w-full text-sm bg-[#F1F2F4] cursor-pointer"
                value={city}
                onChange={changeCity}
              >
                <option value="city">--City--</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <br />
              <h1>Weight:</h1>
              <select className="form-control w-full text-sm bg-[#F1F2F4] cursor-pointer">
                <option value="">Select one..</option>
                {weightdata.map((weight, index) => (
                  <option key={index} value={weight}>
                    {weight}
                  </option>
                ))}
              </select>

              {/*👉 Toggle Button Section */}
              <div className="relative flex items-center gap-4 mt-4">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isOn}
                  onChange={handleToggle}
                />
                <div
                  className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                    isOn ? "bg-green-500" : "bg-gray-300"
                  }`}
                  onClick={handleToggle}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      isOn ? "translate-x-6" : ""
                    }`}
                  ></div>
                </div>
                <h1>Hide Load List.</h1>
              </div>
               {/*👉End Toggle Button Section */}
            </div>

            {/* Animation Text */}
            <div className="mt-5 w-[350px] mx-auto text-3xl font-bold text-white border md:block hidden rounded-lg p-5 bg-gradient-to-r from-purple-500 to-yellow-500 shadow-md shadow-yellow-400">
              <span ref={typedRef}></span>
            </div>
          </div>
        </div>

        {/*👉 Load List */}
        <div className={`text-4xl text-center font-bold text-orange-600 border-b-2 ${isOn ? '' : 'hidden'}`}>Load List is hidden.</div>
        <div
          className={`container mx-auto px-4 py-6 border bg-[#f2f2f2] rounded-lg shadow-md ${isOn ? 'hidden' : ''}`}
        >
          <h1 className=" text-3xl text-center text-red-600 font-bold underline mb-4">
            Load List
          </h1>
          <div className="overflow-x-auto">
            <div className="overflow-y-auto max-h-[600px]">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-white border-b border-gray-300 sticky top-0 z-[1]">
                  <tr className="whitespace-nowrap text-[14px] md:text-[16px]">
                    <th className="px-4 py-2 border-b">SI Nb</th>
                    <th className="px-4 py-2 border-b">From State</th>
                    <th className="px-4 py-2 border-b">From City</th>
                    <th className="px-4 py-2 border-b">To State</th>
                    <th className="px-4 py-2 border-b">To City</th>
                    <th className="px-4 py-2 border-b">Pickup Time</th>
                    <th className="px-4 py-2 border-b">Vehicle Type</th>
                    <th className="px-4 py-2 border-b">Weight</th>
                    <th className="px-4 py-2 border-b">Contact Number</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {ploadData.length == 0 ? "Loding data...." : ""}
                  {currentData.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-200" : ""
                      } whitespace-nowrap`}
                    >
                      <td className="px-4 py-2 border-b">{item.id}</td>
                      <td className="px-4 py-2 border-b">{item.fromstate}</td>
                      <td className="px-4 py-2 border-b">{item.fromcity}</td>
                      <td className="px-4 py-2 border-b">{item.tostate}</td>
                      <td className="px-4 py-2 border-b">{item.tocity}</td>
                      <td className="px-4 py-2 border-b">
                        {formatDate(item.pickupTime)}
                      </td>
                      <td className="px-4 py-2 border-b">{item.vship}</td>
                      <td className="px-4 py-2 border-b">{item.pkgweight}</td>
                      <td className="px-4 py-2 border-b">
                        <a
                          href={`tel:${item.phone}`}
                          className="text-blue-500 underline"
                        >
                          {item.phone}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/*👉 Pagination Section Next Prev button */}
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(data.length / ITEMS_PER_PAGE)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoadDataList;

// 👉 Date Formate functions
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

  return `${month}, ${day}`;
}
