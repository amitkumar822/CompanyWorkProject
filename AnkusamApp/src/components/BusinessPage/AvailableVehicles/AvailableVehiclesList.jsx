import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function AvailableVehiclesList() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("TokenLoginBusinpage")) {
      navigate("/businesslogin");
      return;
    }
  }, []);

  const [vehicleAllDetails, setVehicleAllDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/driver/webapi/get_vehicle_availity_for_driver_detail.php"
        );
        // console.log("Response: " + JSON.stringify(response.data, null, 2));
        if(Array.isArray(response.data)){
          setVehicleAllDetails(response.data);
        }
      } catch (error) {
        console.log("Eroor: ", error);
      }
    };
    fetchData();
  }, [vehicleAllDetails]);

  return (
    <>
      <div className="mt-16">
        {/*👉 Available Vehicle List Section */}
        <div className="w-[90%] mx-auto md:mt-36 mt-24 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white px-2 py-8 rounded-lg shadow-lg">
          {/* <h1 className="text-3xl">Here Show vehicle/driver profile data</h1> */}
          <h1 className="md:text-3xl text-xl text-center font-serif underline mb-8">
            AVAILABLE VEHICLE LIST
          </h1>
          <div className="w-full mx-auto max-h-[800px] overflow-y-auto rounded-lg">
            <table className="w-full mx-auto text-center border-collapse whitespace-nowrap">
              <thead className="bg-gray-700 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 border-b">SI NO</th>
                  <th className="px-4 py-2 border-b">Driver Id</th>
                  <th className="px-4 py-2 border-b">Current State</th>
                  <th className="px-4 py-2 border-b">Current City</th>
                  <th className="px-4 py-2 border-b">Destination State</th>
                  <th className="px-4 py-2 border-b">Destination City</th>
                  <th className="px-4 py-2 border-b">Type Of Vehicle</th>
                  <th className="px-4 py-2 border-b">Vehicle Length</th>
                  <th className="px-4 py-2 border-b">
                    Vehicle Capacity (tons)
                  </th>
                  <th className="px-4 py-2 border-b">Phone</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100 text-black">
                {vehicleAllDetails.map((details, index) => (
                  <tr key={index} className="bg-white odd:bg-gray-200">
                    <td className="px-4 py-2 border-b">{index + 1}</td>
                    <td className="px-4 py-2 border-b">{details?.driver_id}</td>
                    <td className="px-4 py-2 border-b">{details?.FromState}</td>
                    <td className="px-4 py-2 border-b">{details?.FromCity}</td>
                    <td className="px-4 py-2 border-b">{details?.ToState}</td>
                    <td className="px-4 py-2 border-b">{details?.ToCity}</td>
                    <td className="px-4 py-2 border-b">
                      {details?.TypeOfVehicle}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {details?.VehicleLength}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {details?.VehicleCapacity}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <a
                        href={`tel:${details?.phone}`}
                        className="text-blue-500 hover:text-blue-800 underline"
                      >
                        {details?.phone}
                      </a>
                    </td>
                  </tr>
                ))}

                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
          <div className="mt-4 w-full flex justify-center">
            <Link
              to="/loadslistbusi"
              className="text-2xl font-bold rounded-xl shadow-md shadow-yellow-400 py-2 px-3 bg-gradient-to-r from-red-400 to-[#192177] hover:from-pink-500 hover:to-yellow-500"
            >
              Check Loads
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AvailableVehiclesList;
