import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BusiLoginContext from "../../../context/BusinessLoginUser/BusiLoginContext";
import axios from "axios";

function LoadListBusi() {
  const { busiLogUser } = useContext(BusiLoginContext);
  const [vendorAllDetails, setVendorAllDetails] = useState([]);
  const [error, setError] = useState(null);
  const id = 31;
  // const id = busiLogUser?.vendorId;

  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      const formData = new FormData();
      formData.append("vendorId", busiLogUser?.vendorId);

      try {
        const response = await axios.post(
          "/api/driver/get_business_data_th_vendorId.php",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        // console.log("Response1: ", response.data.success);
        // console.log("Response2: ", JSON.stringify(response, null, 2));

        if (!response.data.success) {
          setVendorAllDetails(response.data);
        } else {
          setError(response.data.message || "No Rows Found");
        }
      } catch (err) {
        setError("Error fetching data");
        console.error(err.message);
      }
    };

    if (busiLogUser?.vendorId) {
      fetchData();
    }
  }, []);


  return (
    <>
      <div className="mt-16">
        {/*👉 Available Vehicle List Section */}
        <div className="w-[90%] mx-auto md:mt-36 mt-24 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white px-2 py-8 rounded-lg shadow-lg">
          <h1 className="md:text-3xl text-xl text-center font-serif underline mb-8 uppercase">
            Load List
          </h1>
          <div className="w-full mx-auto overflow-x-auto">
            <table className="w-full mx-auto text-center border-collapse whitespace-nowrap">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 border-b">SI NO</th>
                  {/* <th className="px-4 py-2 border-b">Vendor Id</th> */}
                  <th className="px-4 py-2 border-b">From State</th>
                  <th className="px-4 py-2 border-b">From City</th>
                  <th className="px-4 py-2 border-b">To State</th>
                  <th className="px-4 py-2 border-b">To City</th>
                  <th className="px-4 py-2 border-b">Type Of Vehicle</th>
                  <th className="px-4 py-2 border-b">Package Weight</th>
                  <th className="px-4 py-2 border-b">Number Of Wheels</th>
                  <th className="px-4 py-2 border-b">Vehicle Length</th>
                  <th className="px-4 py-2 border-b">Goods Types</th>
                  <th className="px-4 py-2 border-b">Goods Photo 1</th>
                  <th className="px-4 py-2 border-b">PickUpDate</th>
                  <th className="px-4 py-2 border-b">Phone</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100 text-black">
                {vendorAllDetails.map((detail, index) => (
                  <tr key={detail.LoadId} className="bg-white odd:bg-gray-200">
                    <td className="px-4 py-2 border-b">{index + 1}</td>
                    {/* <td className="px-4 py-2 border-b">{detail.vendorId}</td> */}
                    <td className="px-4 py-2 border-b">{detail.FromState}</td>
                    <td className="px-4 py-2 border-b">{detail.FromCity}</td>
                    <td className="px-4 py-2 border-b">{detail.ToState}</td>
                    <td className="px-4 py-2 border-b">{detail.ToCity}</td>
                    <td className="px-4 py-2 border-b">
                      {detail.TypeOfVehicle}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {detail.PackageWeight}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {detail.NumberOfWheels}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {detail.VehicleLength}
                    </td>
                    <td className="px-4 py-2 border-b">{detail.GoodsTypes}</td>
                    <td className="px-4 py-2 border-b">
                      {/* {detail.GoodsPhotoOne} */}
                      <label className=" cursor-pointer text-blue-500">View Photo</label>
                    </td>
                    <td className="px-4 py-2 border-b">{formatDate(detail.PickUpDate)}</td>
                    <td className="px-4 py-2 border-b">
                      <a href={`tel:${detail.ContactNumber}`}
                      className="text-blue-500 underline"
                      >
                      {detail.ContactNumber}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            <h1 className={`text-xl ${vendorAllDetails.length && 'hidden'}`}>Data is loading...</h1>
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
    </>
  );
}

export default LoadListBusi;

// Date Formate functions
const formatDate = (dateString) => {
  if(!dateString) return "";

  const date = new Date(dateString);
  if(isNaN(date.getTime())) {
    console.error("Invalid date:", dateString);
    return dateString; // Return the original string if the date is invalid
  }

  const options = { month: "long", day: 'numeric'};
  const formattedData = new Intl.DateTimeFormat("en-US", options).format(date);
  const [month, day] = formattedData.split(" ");

  return `${month}, ${day}`; // Format date to 'Month, Day'
}