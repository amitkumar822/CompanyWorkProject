import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BusiLoginContext from "../../../context/BusinessLoginUser/BusiLoginContext";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { weightdata } from "../../../data/WeightData";
import { RiCloseCircleLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingGfg from "../../../data/GfgLoding/loading.gif";

function LoadListBusi() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("TokenLoginBusinpage")) {
      navigate("/businesslogin");
      return;
    }
  }, []);

  const { busiLogUser } = useContext(BusiLoginContext);
  const [vendorAllDetails, setVendorAllDetails] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  //============👇 Fetch Data Section 👇=================

  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData();
      formData.append("vendorId", busiLogUser?.clientsId);

      try {
        const response = await axios.post(
          "/api/clients/load/get_load_data_vendorid.php",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.data.success) {
          if (Array.isArray(response.data.load)) {
            setVendorAllDetails(response.data.load);
          }
        }
      } catch (err) {
        console.error("Error: ", err.message);
      }
    };

    if (busiLogUser?.clientsId) {
      fetchData();
    }
  }, []);

  //============👇 Delete Section 👇=================
  const deleteData = async (loadId) => {
    const formData = new FormData();
    formData.append("LoadId", loadId);

    try {
      const response = await axios.post(
        "/api/clients/load/delete_load_th_loadId.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data === "deleted") {
        setVendorAllDetails((prevDetails) =>
          prevDetails.filter((item) => item.LoadId !== loadId)
        );
      } else {
        console.error("Failed to delete data: ", response.data);
      }
    } catch (err) {
      console.error("Error: ", err.message);
    }
  };

  const handleDelete = (loadId) => {
    setDeleteId(loadId);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteData(deleteId);
      setShowConfirmation(false);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setDeleteId(null);
  };

  //=============👇 Edit or Update functionality section 👇========================

  //---------------  State City Section --------------------

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
    if (selected) {
      // Ensure selected is not null or undefined
      setFromState(selected.value);
      setFromStateName(selected.label);
      setFromCityName("");
    }
  };

  const handleToStateChange = (selected) => {
    if (selected) {
      // Ensure selected is not null or undefined
      setToState(selected.value);
      setToStateName(selected.label);
      setToCityName("");
    }
  };

  // Handle city selection change
  const handleFromCityChange = (selected) => {
    if (selected) {
      // Ensure selected is not null or undefined
      setFromCityName(selected.label);
    }
  };

  const handleToCityChange = (selected) => {
    if (selected) {
      // Ensure selected is not null or undefined
      setToCityName(selected.label);
    }
  };

  //----- end State City Selection ------------
  //==========👇 Edit all data and update section 👇 =========

  const [editCloseOpenBox, setEditCloseOpenBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    fromCityName: "",
    toCityName: "",
    PackageWeight: "",
  });

  const [formFiles, setFormFiles] = useState({
    PickUpDate: "",
    VehicleType: "Both",
    PackageWeight: "",
    NumberOfWheels: "",
    GoodsType: "",
    VehicleLength: "",
    ContactNumber: "",
    alternativeNumber: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormFiles((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [time, setTime] = useState({
    hour: "",
    minute: "",
    period: "AM",
  });

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTime((prevTime) => ({
      ...prevTime,
      [name]: value,
    }));
  };

  const [editLoadId, seteditLoadId] = useState(null);
  const handleEdit = (load) => {
    setEditCloseOpenBox(true);
    seteditLoadId(load);
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();

    if (fromStateName) {
      if (!fromCityName) {
        toast.warn("From City is required!");
        setErrors({ ...errors, fromCityName: "From City is required!" });
        setFromCityName("");
        setToCityName("");
        return;
      }
    }

    if (toStateName) {
      if (!toCityName) {
        toast.warn("To City is required!");
        setErrors({ ...errors, toCityName: "To City is required!" });
        setFromCityName("");
        setToCityName("");
        return;
      }
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("LoadId", editLoadId);
      formData.append("PickUpDate", formFiles.PickUpDate);
      formData.append("VehicleType", formFiles.VehicleType);
      formData.append("PackageWeight", formFiles.PackageWeight);
      formData.append("NumberOfWheels", formFiles.NumberOfWheels);
      formData.append("GoodsTypes", formFiles.GoodsType);
      formData.append("VehicleLength", formFiles.VehicleLength);
      formData.append("ContactNumber", formFiles.ContactNumber);
      formData.append("alternativePhone", formFiles.alternativeNumber);
      formData.append("FromState", fromStateName);
      formData.append("FromCity", fromCityName);
      formData.append("ToState", toStateName);
      formData.append("ToCity", toCityName);

      const response = await axios.post(
        "/api/clients/load/update_post_load.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // console.log("SaveEdit Response: ", response);

      if (response.data === "Updated") {
        setVendorAllDetails((prevDetails) =>
          prevDetails.filter((item) => item.LoadId !== editLoadId)
        );
        seteditLoadId(null);
        setEditCloseOpenBox(false);
        toast.success("Successful Update!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsLoading(false);
        window.location.reload();
      } else {
        setIsLoading(false);
        console.error("Failed to update data: ", response.data);
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error: ", err.message);
    }
  };

  // ========👇 Active InActive Status Section 👇==========

  const [statusId, setStatusId] = useState(null);

  const handleActiveInActiveStatus = async (LoadId) => {
    setStatusId(LoadId);
  };

  const [statusField, setStatusField] = useState("Active");

  const handleActiveInActiveStatusChange = (activeInactive) => {
    setStatusField(activeInactive.target.value);
  };

  const handleActiveInActiveSubmit = async (e) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("LoadId", statusId);
      formData.append("status", statusField);

      const response = await axios.post(
        "/api/clients/load/update_post_load.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data === "Updated") {
        setVendorAllDetails((prevDetails) =>
          prevDetails.filter((item) => item.LoadId !== editLoadId)
        );
        setStatusId(null);
        toast.success("Status Successful Update!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setStatusField("Active");
        setIsLoading(false);
        window.location.reload();
      } else {
        setIsLoading(false);
        console.error("Failed to update data: ", response.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error: ", error.message);
    }
  };

  return (
    <>
      <div className="mt-16">
        {/* Loading image section */}
        <div
          className={`w-full -mt-36 md:h-[151%] h-[172%] z-[51] bg-[rgba(0,0,0,0.5)] absolute ${
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
        {/*==================👇 Available Vehicle List Section 👇====================*/}

        <div className="w-[90%] mx-auto md:mt-36 mt-24 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white px-2 py-8 rounded-lg shadow-lg">
          <h1 className="md:text-3xl text-xl text-center font-serif underline mb-8 uppercase">
            Load List
          </h1>
          <div className="w-full max-h-[800px] mx-auto overflow-y-auto rounded-lg">
            <table className="w-full mx-auto text-center border-collapse whitespace-nowrap">
              <thead className="bg-[#893381] sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 border-b">SI NO</th>
                  <th className="px-4 py-2 border-b">From State</th>
                  <th className="px-4 py-2 border-b">From City</th>
                  <th className="px-4 py-2 border-b">To State</th>
                  <th className="px-4 py-2 border-b">To City</th>
                  <th className="px-4 py-2 border-b">Type Of Vehicle</th>
                  <th className="px-4 py-2 border-b">Package Weight</th>
                  <th className="px-4 py-2 border-b">Number Of Wheels</th>
                  <th className="px-4 py-2 border-b">Vehicle Length</th>
                  <th className="px-4 py-2 border-b">Goods Types</th>
                  <th className="px-4 py-2 border-b">PickUpDate</th>
                  <th className="px-4 py-2 border-b">Phone</th>
                  <th className="px-4 py-2 border-b">Alternative Number</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100 text-black">
                {vendorAllDetails.map((detail, index) => (
                  <tr key={detail.LoadId} className="bg-white odd:bg-gray-200">
                    <td className="px-4 py-2 border-b">{index + 1}</td>
                    <td className="px-4 py-2 border-b">{detail?.fromState}</td>
                    <td className="px-4 py-2 border-b">{detail?.fromCity}</td>
                    <td className="px-4 py-2 border-b">{detail?.toState}</td>
                    <td className="px-4 py-2 border-b">{detail?.toCity}</td>
                    <td className="px-4 py-2 border-b">
                      {detail?.vehicleType}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {detail?.packageWeight}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {detail?.numberOfWheels}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {detail?.vehicleLength}
                    </td>
                    <td className="px-4 py-2 border-b">{detail?.goodsType}</td>
                    <td className="px-4 py-2 border-b">
                      {formatDate(detail?.pickUPDate)}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <a
                        href={`tel:${detail?.contactNumber}`}
                        className="text-blue-500 hover:text-blue-800 duration-200 underline"
                      >
                        {detail?.contactNumber}
                      </a>
                    </td>
                    <td className="px-4 py-2 border-b">
                      {detail?.alternativePhone}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <span
                        onClick={() =>
                          handleActiveInActiveStatus(detail?.LoadId)
                        }
                        className={`cursor-pointer font-semibold text-[18px] ${
                          detail?.status === "Active"
                            ? "text-green-500 hover:text-green-700 duration-300"
                            : "text-red-500 hover:text-red-700 duration-300"
                        }`}
                      >
                        {detail?.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-b">
                      <span
                        className="px-2 py-1 mx-1 bg-green-500 hover:bg-green-600 duration-300 cursor-pointer rounded-md text-white text-lg font-semibold"
                        onClick={() => handleEdit(detail?.LoadId)}
                      >
                        Edit
                      </span>
                      <span
                        className="px-2 py-1 mx-1 bg-red-500 hover:bg-red-600 duration-300 cursor-pointer rounded-md text-white text-lg font-semibold"
                        onClick={() => handleDelete(detail?.LoadId)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h1
            className={`text-[17px] ${
              vendorAllDetails.length ? "hidden" : undefined
            }`}
          >
            Data is loading...
          </h1>
          <div className="mt-4 w-full flex justify-center">
            <Link
              className="md:text-2xl font-bold rounded-xl shadow-md shadow-yellow-400 py-2 px-3 bg-gradient-to-r from-red-400 to-[#192177] hover:from-pink-500 hover:to-yellow-500"
              to="/postyourloadbusi"
            >
              POST YOUR LOAD
            </Link>
          </div>
        </div>
      </div>

      {/*=================👇 Active InActive Modal or Update Details 👇===================*/}
      {statusId && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/3 shadow-zinc-700">
            <h2 className="text-2xl font-bold mb-4 text-center text-green-600 underline italic">
              Update your status
            </h2>
            <select
              className="w-[80%] ml-[10%] text-2xl bg-gray-200 rounded-md px-4 cursor-pointer"
              onChange={handleActiveInActiveStatusChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <br />
            <div className="flex justify-around mt-10">
              <button
                onClick={() => setStatusId(null)}
                className="text-xl font-semibold bg-red-600 hover:bg-red-700 duration-300 text-white px-2 py-1 rounded-md shadow-md shadow-gray-500"
              >
                Cancle
              </button>

              <button
                onClick={handleActiveInActiveSubmit}
                className="text-xl font-semibold bg-green-600 hover:bg-green-700 duration-300 text-white px-2 py-1 rounded-md shadow-md shadow-gray-500"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/*=================👇 Edit Load Modal or Update Details 👇===================*/}

      {editCloseOpenBox && (
        <div className="absolute md:mt-40 md:top-0 top-[850px] inset-0 flex items-center justify-center px-3 z-50">
          <div className="mt-16 w-full max-w-6xl mx-auto">
            <div className="w-full h-full overflow-y-auto pt-6 bg-gray-200 pb-10 pl-4 rounded-xl shadow-md shadow-gray-800">
              <span
                className="w-[94%] flex justify-end mr-16 text-3xl cursor-pointer text-red-600"
                onClick={() => setEditCloseOpenBox(false)}
              >
                <RiCloseCircleLine />
              </span>
              <form
                onSubmit={handleEditFormSubmit}
                className="w-full mx-auto border md:pl-4"
              >
                {/* Shipping from and Shipping to form section */}
                <div className="grid lg:grid-cols-2">
                  {/* Shipping from section */}
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
                          isClearable
                          options={indianStates.map((state) => ({
                            value: state || vendorAllDetails?.FromState,
                            label: state.name,
                          }))}
                          // value={vendorAllDetails?.FromState || ''}
                          onChange={handleFromStateChange}
                          placeholder="Select State"
                          className="min-w-[180px] lg:w-[70%] w-[95%]"
                        />
                      </div>
                      <div className="lg:mt-0 mt-4">
                        <h3 className="md:text-lg font-semibold text-black uppercase mb-2">
                          SELECT CITY
                        </h3>
                        <Select
                          isClearable
                          options={fromCities.map((city) => ({
                            value: city,
                            label: city.name,
                          }))}
                          onChange={handleFromCityChange}
                          placeholder="Select City"
                          className="min-w-[180px] lg:w-[70%] w-[95%]"
                          isDisabled={!fromState}
                        />
                        {/* if city is missing input field */}
                        <input
                          type="text"
                          value={fromCityName}
                          onChange={(e) => setFromCityName(e.target.value)}
                          placeholder="Enter Missing city?"
                          className={`min-w-[180px] lg:w-[70%] w-[95%] py-1 px-2 rounded-md ${
                            fromStateName.length > 0 ? "" : "hidden"
                          }`}
                        />
                        {errors.fromCityName && (
                          <p className="text-red-500">{errors.fromCityName}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Shipping to section */}
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
                          isClearable
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
                          isClearable
                          className="min-w-[180px] lg:w-[70%] w-[95%]"
                          isDisabled={!toState}
                        />
                        {/* if city is missing input field */}
                        <input
                          type="text"
                          value={toCityName}
                          onChange={(e) => setToCityName(e.target.value)}
                          placeholder="Enter Missing city?"
                          className={`min-w-[180px] lg:w-[70%] w-[95%] py-1 px-2 rounded-md ${
                            toStateName.length > 0 ? "" : "hidden"
                          }`}
                        />
                        {errors.toCityName && (
                          <p className="text-red-500">{errors.toCityName}</p>
                        )}
                      </div>
                    </div>
                    {/* Pickup date */}
                    <div className="mt-4 grid md:grid-cols-2">
                      <div>
                        <h3 className="md:text-lg font-semibold text-black uppercase mb-2">
                          PICKUP DATE
                        </h3>
                        <input
                          className="py-2 px-4 md:w-[60%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                          type="date"
                          name="PickUpDate"
                          onChange={handleFormChange}
                        />
                      </div>

                      {/* <div className="pr-2">
                        <h3 className="md:text-lg font-semibold text-black uppercase mb-2">
                          PICKUP TIME
                        </h3>
                        <select
                          name="hour"
                          className="w-1/3 p-2 border border-gray-300 rounded"
                          value={time.hour}
                          onChange={handleTimeChange}
                          
                        >
                          <option value="" disabled>
                            Hour
                          </option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (hour) => (
                              <option
                                key={hour}
                                value={hour < 10 ? `0${hour}` : hour}
                              >
                                {hour < 10 ? `0${hour}` : hour}
                              </option>
                            )
                          )}
                        </select>

                        <select
                          name="minute"
                          className="w-1/3 p-2 border border-gray-300 rounded"
                          value={time.minute}
                          onChange={handleTimeChange}
                          
                        >
                          <option value="" disabled>
                            Minute
                          </option>
                          {Array.from({ length: 60 }, (_, i) => i).map(
                            (minute) => (
                              <option
                                key={minute}
                                value={minute < 10 ? `0${minute}` : minute}
                              >
                                {minute < 10 ? `0${minute}` : minute}
                              </option>
                            )
                          )}
                        </select>

                        <select
                          name="period"
                          className="w-1/3 p-2 border border-gray-300 rounded"
                          value={time.period}
                          onChange={handleTimeChange}
                          
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div> */}
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
                        NO OF WHEELS
                      </h1>
                      <input
                        type="number"
                        // defaultValue={1}
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
                        // defaultValue={1}
                        min={1}
                        name="VehicleLength"
                        onChange={handleFormChange}
                        placeholder="Enter your wheel length"
                        className="py-2 px-4 min-w-[180px] lg:w-[70%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                {/* Contact number and upload load section */}
                <div className="grid lg:grid-cols-2 mt-10">
                  {/* Contact and goods type section */}
                  <div>
                    {/* Goods type */}
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
                      <option value="Industrial Equipment">
                        Industrial Equipment
                      </option>
                      <option value="Others">Others</option>
                    </select>
                    {/* Contact number */}
                    <h1 className="md:text-lg mt-4 font-semibold text-black uppercase mb-2">
                      Contact Number
                    </h1>
                    <input
                      type="tel"
                      minLength={10}
                      maxLength={10}
                      name="ContactNumber"
                      onChange={handleFormChange}
                      placeholder="Enter your number"
                      className="py-2 px-4 min-w-[180px] lg:w-[70%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                    />
                    <h1 className="md:text-lg mt-4 font-semibold text-black uppercase mb-2">
                      Alternative Number
                    </h1>
                    <input
                      type="tel"
                      minLength={10}
                      maxLength={10}
                      name="alternativeNumber"
                      onChange={handleFormChange}
                      placeholder="Enter your number"
                      className="py-2 px-4 min-w-[180px] lg:w-[70%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                    />
                  </div>
                  {/* Upload load photos section */}
                  <div className="lg:mt-0 mt-4">
                    <h1 className="md:text-lg font-semibold text-black uppercase mb-2">
                      Upload Load Photos
                    </h1>
                    <input
                      type="file"
                      className="py-2 px-4 min-w-[180px] bg-gray-300 lg:w-[70%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                    />
                    <input
                      type="file"
                      className="py-2 px-4 mt-2 min-w-[180px] bg-gray-300 lg:w-[70%] w-[95%] border outline-none rounded-lg shadow-md cursor-pointer"
                    />
                  </div>
                </div>
                <div className="w-full mx-auto flex justify-center items-center">
                  <button className="py-2 px-4 text-2xl font-semibold italic text-white rounded-xl mt-10 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-700 hover:to-yellow-700">
                    UPDATE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/*======================👇 Confirmation Asking when delete 👇=====================*/}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-3 z-50">
          <div className="sm:w-[430px] bg-white p-6 rounded shadow-lg">
            <h2 className="sm:text-xl mb-4">
              Are you sure you want to delete this item?
            </h2>
            <div className="flex justify-end">
              <button
                onClick={cancelDelete}
                className="bg-green-500 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
}

export default LoadListBusi;

// Date Format function
const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", dateString);
    return dateString; // Return the original string if the date is invalid
  }

  const options = { month: "long", day: "numeric" };
  const formattedData = new Intl.DateTimeFormat("en-US", options).format(date);
  const [month, day] = formattedData.split(" ");

  return `${month}, ${day}`; // Format date to 'Month, Day'
};
