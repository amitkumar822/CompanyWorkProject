import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BusiLoginContext from "../../../context/BusinessLoginUser/BusiLoginContext";
import axios from "axios";
import PostYourLoadBusi from "../PostYourLoad/PostYourLoadBusi";
import EditLoadList from "./EditLoadList";

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
      formData.append("vendorId", busiLogUser?.vendorId);

      try {
        const response = await axios.post(
          "/api/driver/get_business_data_th_vendorId.php",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (!response.data.success) {
          if (Array.isArray(response.data)) {
            setVendorAllDetails(response.data);
          }
        }
      } catch (err) {
        console.error("Error: ", err.message);
      }
    };

    if (busiLogUser?.vendorId) {
      fetchData();
    }
  }, [busiLogUser]);

  //============👇 Delete Section 👇=================
  const deleteData = async (loadId) => {
    const formData = new FormData();
    formData.append("LoadId", loadId);

    try {
      const response = await axios.post(
        "/api/driver/delete_load_th_vendor_id.php",
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

  return (
    <>
      <div className="mt-16">
        {/*👉 Available Vehicle List Section */}
        <div className="w-[90%] mx-auto md:mt-36 mt-24 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white px-2 py-8 rounded-lg shadow-lg">
          <h1 className="md:text-3xl text-xl text-center font-serif underline mb-8 uppercase">
            Load List
          </h1>
          <div className="w-full max-h-[800px] mx-auto overflow-x-auto rounded-lg">
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
                  {/* <th className="px-4 py-2 border-b">Goods Photo 1</th> */}
                  <th className="px-4 py-2 border-b">PickUpDate</th>
                  <th className="px-4 py-2 border-b">Phone</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100 text-black">
                {vendorAllDetails.map((detail, index) => (
                  <tr key={detail.LoadId} className="bg-white odd:bg-gray-200">
                    <td className="px-4 py-2 border-b">{index + 1}</td>
                    <td className="px-4 py-2 border-b">{detail?.FromState}</td>
                    <td className="px-4 py-2 border-b">{detail?.FromCity}</td>
                    <td className="px-4 py-2 border-b">{detail?.ToState}</td>
                    <td className="px-4 py-2 border-b">{detail?.ToCity}</td>
                    <td className="px-4 py-2 border-b">
                      {detail?.TypeOfVehicle}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {detail?.PackageWeight}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {detail?.NumberOfWheels}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {detail?.VehicleLength}
                    </td>
                    <td className="px-4 py-2 border-b">{detail?.GoodsTypes}</td>
                    {/* <td className="px-4 py-2 border-b">
                      {detail.GoodsPhotoOne}
                      <label className=" cursor-pointer text-blue-500">
                        View Photo
                      </label>
                    </td> */}
                    <td className="px-4 py-2 border-b">
                      {formatDate(detail?.PickUpDate)}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <a
                        href={`tel:${detail?.ContactNumber}`}
                        className="text-blue-500 underline"
                      >
                        {detail?.ContactNumber}
                      </a>
                    </td>
                    <td className="px-4 py-2 border-b">Active</td>
                    <td className="px-4 py-2 border-b">
                      <span className="px-2 py-1 mx-1 bg-green-500 cursor-pointer rounded-md text-white text-lg font-semibold">
                        Edit
                      </span>
                      <span
                        className="px-2 py-1 mx-1 bg-red-500 cursor-pointer rounded-md text-white text-lg font-semibold"
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
            className={`text-xl ${
              vendorAllDetails.length ? "hidden" : undefined
            }`}
          >
            Data is loading...
          </h1>
          <div className="mt-4 w-full flex justify-center">
            <Link
              className="text-2xl font-bold rounded-xl shadow-md shadow-yellow-400 py-2 px-3 bg-gradient-to-r from-red-400 to-[#192177] hover:from-pink-500 hover:to-yellow-500"
              to="/postyourloadbusi"
            >
              POST YOUR LOAD
            </Link>
          </div>
        </div>
      </div>

      {/* Confirmation Asking when delete */}
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
