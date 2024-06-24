import React from "react";
import { FaCirclePlus } from "react-icons/fa6";

function Dashboard() {
  return (
    <>
      <div className="w-full h-screen mx-auto bg-[#f2d7d7]">
        <h1 className="text-center py-2 text-[26px] font-bold italic font-serif underline">
          Welcome to Dashboard
        </h1>
        <div className="w-[98%] h-[600px] mx-auto bg-gray-300 grid lg:grid-cols-[22%_auto] rounded-lg shadow-md shadow-red-500 overflow-hidden">
          {/* Shopkeeper name list section */}
          <div className="pt-4 bg-[#eae7e7] rounded-md shadow-md shadow-red-500 mr-1">
            <h1 className="text-2xl font-semibold uppercase text-center italic underline">
              Shopkeeper Name
            </h1>
            <ul className="mx-2 text-xl italic mt-6">
              {ShopkeeperName.map((data, index) => (
                <li
                  key={index}
                  className="hover:bg-gray-400 hover:text-white duration-200 my-2 cursor-pointer rounded-md px-2 py-2 shadow-md shadow-gray-700"
                >
                  {data.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Goods Description list */}
          <div className="bg-[#a8ff3e] rounded-md shadow-md shadow-red-500 ml-1 overflow-hidden">
            {/* Top Header Section */}
            <div className="bg-[#a8ff3e] pl-3 flex justify-between py-2 px-2">
              <span className="text-xl font-semibold italic">
                Sri Kumaran Steels
              </span>
              <div className="flex items-center justify-center gap-3">
                <span>
                  <input
                    type="text"
                    placeholder="Search your goods"
                    className=" py-1 px-2 mr-11 rounded-md w-[120%]"
                  />
                </span>
                <span className="ml-12">
                  <FaCirclePlus className="text-3xl text-green-700 hover:text-green-900 duration-200 cursor-pointer" />
                </span>
              </div>
            </div>
            <hr className="border border-[#c0d69c]"/>
            {/* Goods list or Goods table */}
            <div className="w-full max-h-[530px] bg-pink-200 overflow-x-auto overflow-y-auto">
              <table className="w-full text-center">
                <thead className=" whitespace-nowrap text-[18px] sticky top-0 left-0 right-0 bg-[#82f5c7]">
                  <tr>
                    <th className=" py-1">SI No</th>
                    <th className=" py-1">Description of Goods</th>
                    <th className=" py-1">Rate</th>
                    <th className=" py-1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {goodsList.map((items, index) => (
                    <tr key={index} className=" odd:bg-gray-200 text-[17px]">
                      <td className="py-2 px-2 border-b-2">{index + 1}</td>
                      <td className="py-2 px-2 border-b-2">{items.goods}</td>
                      <td className="py-2 px-2 border-b-2">{items.rate}</td>
                      <td className="py-2 px-2 border-b-2">
                        <span className="bg-green-500 hover:bg-green-600 duration-200 font-semibold italic py-1 px-2 text-white hover:text-[#d3d1d1] rounded-md shadow-md shadow-gray-800 cursor-pointer mr-2">
                          Edit
                        </span>
                        <span className="bg-red-500 hover:bg-red-600 duration-200 font-semibold italic py-1 px-2 text-white hover:text-[#d3d1d1] rounded-md shadow-md shadow-gray-800 cursor-pointer">
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

const goodsList = [
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
];

const ShopkeeperName = [
  {
    name: "Sri Kumaran Steels",
  },
  {
    name: "Sri Kumaran Steels Private Ltd",
  },
  {
    name: "Sri Kumaran Steels Private Limited",
  },
  {
    name: "KAP Machine Shop & Welding",
  },
  {
    name: "Red Star Welding & Fabrication",
  },
  {
    name: "KAP Machine Shop & Welding Private Limited",
  },
  {
    name: "Red Star Welding & Fabrication Private Limited",
  },
  {
    name: "Custom Welding & Fab",
  },
];
