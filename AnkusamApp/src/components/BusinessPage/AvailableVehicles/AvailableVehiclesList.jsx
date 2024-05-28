import React from "react";

function AvailableVehiclesList() {
  return (
    <>
      <div className="mt-16">
        {/*👉 Top Upper screen part */}
        <div className="w-full mx-auto mt-24 flex justify-around">
          <div className="w-full md:text-[7vw] text-[21px] text-center font-bold pt-4 md:hidden block text-yellow-500">
            <h1>
              Your <span className=" text-red-500">Vehicle</span>{" "}
              <span className="text-[#51CFED]"> Posted</span>
            </h1>
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
              Your <br /> <span className=" text-red-500">Vehicle</span> <br />{" "}
              <span className="text-[#51CFED]"> Posted</span>
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

        {/*👉 Available Vehicle List Section */}
        <div className="w-[80%] mx-auto mt-12 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white px-2 py-8 rounded-lg shadow-lg">
          <h1 className="text-3xl text-center font-serif underline mb-8">
            AVAILABLE VEHICLE LIST
          </h1>
          <div className="w-full mx-auto overflow-x-auto">
            <table className="w-full mx-auto text-center border-collapse">
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
        </div>
      </div>
    </>
  );
}

export default AvailableVehiclesList;
