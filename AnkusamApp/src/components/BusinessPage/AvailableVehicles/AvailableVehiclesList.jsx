import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function AvailableVehiclesList() {
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("TokenLoginBusinpage")) {
      navigate('/businesslogin');
      return;
    }
  }, [])
  return (
    <>
      <div className="mt-16">
        {/*👉 Available Vehicle List Section */}
        <div className="w-[90%] mx-auto md:mt-36 mt-24 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white px-2 py-8 rounded-lg shadow-lg">
          <h1 className="text-3xl">Here Show vehicle/driver profile data</h1>
          <h1 className="md:text-3xl text-xl text-center font-serif underline mb-8">
            AVAILABLE VEHICLE LIST
          </h1>
          <div className="w-full mx-auto overflow-x-auto">
            <table className="w-full mx-auto text-center border-collapse whitespace-nowrap">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 border-b">SI NO</th>
                  <th className="px-4 py-2 border-b">User Id</th>
                  <th className="px-4 py-2 border-b">Phone</th>
                  <th className="px-4 py-2 border-b">From State</th>
                  <th className="px-4 py-2 border-b">From City</th>
                  <th className="px-4 py-2 border-b">To State</th>
                  <th className="px-4 py-2 border-b">To City</th>
                  <th className="px-4 py-2 border-b">
                    Vehicle Capacity (tons)
                  </th>
                  <th className="px-4 py-2 border-b">Vehicle Length</th>
                  <th className="px-4 py-2 border-b">Vship</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100 text-black">
                <tr className="bg-white odd:bg-gray-200">
                  <td className="px-4 py-2 border-b">1</td>
                  <td className="px-4 py-2 border-b">V240045</td>
                  <td className="px-4 py-2 border-b">254658</td>
                  <td className="px-4 py-2 border-b">Telangana</td>
                  <td className="px-4 py-2 border-b">Adilabad</td>
                  <td className="px-4 py-2 border-b">Andhra Pradesh</td>
                  <td className="px-4 py-2 border-b">Srikakulam</td>
                  <td className="px-4 py-2 border-b">43.443</td>
                  <td className="px-4 py-2 border-b">34</td>
                  <td className="px-4 py-2 border-b">Open Body</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
          <div className="mt-4 w-full flex justify-center">
            <Link className="text-2xl font-bold rounded-xl shadow-md shadow-yellow-400 py-2 px-3 bg-gradient-to-r from-red-400 to-[#192177] hover:from-pink-500 hover:to-yellow-500" to='/postyourloadbusi'>POST</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AvailableVehiclesList;
