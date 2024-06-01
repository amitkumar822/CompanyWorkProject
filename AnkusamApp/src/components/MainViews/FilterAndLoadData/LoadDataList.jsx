import React, { useEffect, useRef, useState } from "react";
import { State, City } from "country-state-city";
import { weightdata } from "../../../data/WeightData";
import Typed from "typed.js";
import { IoSearch } from "react-icons/io5";

const ITEMS_PER_PAGE = 40;

function LoadDataList() {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ["Welcome to Ankusam logistic"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };
    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [weight, setWeight] = useState("");
  const [cities, setCities] = useState([]);
  const [ploadData, setPloadData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const normalizeString = (str) => {
    return str.toLowerCase().replace(/[^a-z0-9]/gi, "");
  };

  const changeState = (event) => {
    const selectedState = event.target.value;
    setState(selectedState);
    if (selectedState) {
      const stateCities = City.getCitiesOfState("IN", selectedState);
      setCities(stateCities);
      setCity(""); // Reset city when state changes
    } else {
      setCities([]);
      setCity("");
    }
  };

  const changeCity = (event) => {
    setCity(event.target.value);
  };

  const changeWeight = (event) => {
    setWeight(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/driver/filtter_by_current_date.php");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setPloadData(result);
        setFilteredData(result);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const filterData = () => {
    let filtered = ploadData;

    if (state) {
      filtered = filtered.filter(
        (item) =>
          normalizeString(item.fromstate) ===
          normalizeString(State.getStateByCodeAndCountry(state, "IN").name)
      );
    }
    if (city) {
      filtered = filtered.filter(
        (item) => normalizeString(item.fromcity) === normalizeString(city)
      );
    }
    if (weight) {
      filtered = filtered.filter((item) => item.pkgweight === weight);
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    filterData();
  }, [state, city, weight]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(filteredData.length / ITEMS_PER_PAGE))
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  // Reset filter state and city
  const handleResetFilterStateAndCity = () => {
    setState("");
    setCity("");
    setWeight("");
    setFilteredData(ploadData);
    setCurrentPage(1);
  };

  const handleFilter = (event) => {
    const query = normalizeString(event.target.value);
    setSearchInput(query);

    const filtered = ploadData.filter((item) =>
      normalizeString(item.fromcity).includes(query)
    );

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="w-full mt-20">
        <div className="w-[80%] mx-auto mb-10">
          <h1 className="text-3xl font-semibold text-center">Data Filter</h1>

          <div className="w-[100%] mx-auto gap-14 order-1 justify-content-center d-flex vh-100 bg-dark grid lg:grid-cols-2 grid-cols-1">
            <div className="min-w-[310px] mt-5">
              <h1 className="text-green-500">Filter by state</h1>
              <select
                className="form-control w-full text-sm bg-[#F1F2F4] cursor-pointer"
                value={state}
                onChange={changeState}
              >
                <option value="">--State--</option>
                {State.getStatesOfCountry("IN").map((state, index) => (
                  <option key={index} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
              <br />
              <h1 className="text-[#49796a]">Filter by city</h1>
              <select
                className="form-control w-full text-sm bg-[#F1F2F4] cursor-pointer"
                value={city}
                onChange={changeCity}
                disabled={!state} // Disable city dropdown if no state is selected
              >
                <option value="">--City--</option>
                {cities.map((city, index) => (
                  <option key={index} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              <br />
              <h1>Weight:</h1>
              <select
                className="form-control w-full text-sm bg-[#F1F2F4] cursor-pointer"
                value={weight}
                onChange={changeWeight}
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
                  onClick={handleResetFilterStateAndCity}
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="mt-5 w-[350px] mx-auto text-3xl font-bold text-white border md:block hidden rounded-lg p-5 bg-gradient-to-r from-purple-500 to-yellow-500 shadow-md shadow-yellow-400">
              <span ref={typedRef}></span>
            </div>
          </div>
        </div>
        <div
          className={`container mx-auto px-4 py-6 border bg-[#f2f2f2] rounded-lg shadow-md`}
        >
          <h1 className="text-3xl text-center text-red-600 font-bold underline mb-4">
            Load List
          </h1>

          <div className="flex w-[50%] items-center justify-end gap-1 relative mb-4">
            <span>Search</span>
            <input
              className="py-1 w-full px-2 border border-[black] rounded-lg outline-none"
              type="text"
              placeholder="Search by from city..."
              value={searchInput}
              onChange={handleFilter}
            />
            <IoSearch className="absolute right-4" />
          </div>

          <div className="overflow-x-auto">
            <div className="overflow-y-auto max-h-[600px]">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-white border-b border-gray-300 sticky top-0 z-[1]">
                  <tr className="whitespace-nowrap text-[14px] md:text-[16px]">
                    <th className="px-4 py-2 border-b">SI Nb</th>
                    <th
                      className={`px-4 py-2 border-b ${
                        state.length == 0 ? "hidden" : ""
                      }`}
                    >
                      From State
                    </th>
                    <th className="px-4 py-2 border-b">From City</th>
                    <th
                      className={`px-4 py-2 border-b ${
                        state.length == 0 ? "hidden" : ""
                      }`}
                    >
                      To State
                    </th>
                    <th className="px-4 py-2 border-b">To City</th>
                    <th className="px-4 py-2 border-b">Pickup Time</th>
                    <th className="px-4 py-2 border-b">Vehicle Type</th>
                    <th className="px-4 py-2 border-b">Weight</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {currentData.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-200" : ""
                      } whitespace-nowrap`}
                    >
                      <td className="px-4 py-2 border-b">{index + 1}</td>
                      <td
                        className={`px-4 py-2 border-b ${
                          state.length == 0 ? "hidden" : ""
                        }`}
                      >
                        {item.fromstate}
                      </td>
                      <td className="px-4 py-2 border-b">{item.fromcity}</td>
                      <td
                        className={`px-4 py-2 border-b ${
                          state.length == 0 ? "hidden" : ""
                        }`}
                      >
                        {item.tostate}
                      </td>
                      <td className="px-4 py-2 border-b">{item.tocity}</td>
                      <td className="px-4 py-2 border-b">
                        {formatDate(item.pickupTime)}
                      </td>
                      <td className="px-4 py-2 border-b">{item.vship}</td>
                      <td className="px-4 py-2 border-b">{item.pkgweight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {ploadData.length === 0 ? "Loading data..." : ""}
              {currentData.length === 0 ? "No data was found..." : ""}
            </div>
          </div>

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
              disabled={
                currentPage === Math.ceil(filteredData.length / ITEMS_PER_PAGE)
              }
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

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", dateString);
    return dateString;
  }

  const options = { month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  const [month, day] = formattedDate.split(" ");

  return `${month}, ${day}`;
}
