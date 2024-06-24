import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";

function Dashboard() {
  //==============👇Goods Search functionality 👇=============
  const [searchInput, setSearchInput] = useState("");

  const [goodsData, setGoodsData] = useState(goodsList);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filterData = goodsData.filter(
      (items) =>
        items.rate
          .toString()
          .trim()
          .includes(searchInput.toLowerCase().trim()) ||
        items.goods
          .toLowerCase()
          .trim()
          .includes(searchInput.toLowerCase().trim())
    );
    setFilteredData(filterData);
  }, [searchInput, goodsData]);

  // ==============👇 Shopkeeper Name Search functionality 👇============
  const [searchInputShopKeeper, setSearchInputShopKeeper] = useState("");

  const [shopkeeperName, setShopkeeperName] = useState(ShopkeeperName);
  const [filteredShopkeeperName, setFilteredShopkeeperName] = useState([]);

  // console.log("Shopkeeper: "+ JSON.stringify(shopkeeperName[0].allDetails, null, 2));

  useEffect(() => {
    const filterData = shopkeeperName.filter((items) =>
      items.name
        .toLowerCase()
        .trim()
        .includes(searchInputShopKeeper.toLowerCase().trim())
    );
    setFilteredShopkeeperName(filterData);
  }, [searchInputShopKeeper, shopkeeperName]);

  // const handleShopkeeperNameClick = (e) => {
  //   console.log("Shopkeeper: "+ JSON.stringify(e.target.value, null, 2));
  // }

  return (
    <>
      <div className="w-full h-screen mx-auto bg-[#f2d7d7]">
        <h1 className="text-center py-2 text-[26px] font-bold italic font-serif underline">
          Welcome to Dashboard
        </h1>
        <div className="w-[98%] grid lg:grid-cols-[22%_auto] mx-auto bg-gray-300 rounded-lg shadow-md shadow-red-500 overflow-hidden">
          {/* Shopkeeper name list section */}
          <div className="pt-3 bg-[#eae7e7] rounded-md shadow-md shadow-red-500 mr-1">
            <h1 className="text-2xl font-semibold uppercase text-center italic underline">
              Shopkeeper Name
            </h1>
            {/* Search functionality */}
            <div className="relative">
              <IoIosSearch className="text-2xl absolute right-6 top-4" />
              <input
                type="text"
                value={searchInputShopKeeper}
                onChange={(e) => setSearchInputShopKeeper(e.target.value)}
                placeholder="Search shopkeeper by name"
                className="px-2 py-2 ml-2 lg:w-[94%] w-[96%] rounded-md mt-2 shadow-md shadow-gray-700 cursor-pointer"
              />
            </div>
            <div className="h-[470px] overflow-y-auto overflow-x-auto mt-2 no-scrollbar">
              <ul className="mx-2 text-xl italic mt-3">
                {filteredShopkeeperName.map((data, index) => (
                  <li
                    key={index}
                    // onClick={() => {
                    //   return(
                    //     console.log("Shopkeeper: "+ JSON.stringify(data.allDetails[0], null, 2))
                    //     // setShopkeeperName(data.allDetails)
                    //   )
                    // }}
                    className="hover:bg-gray-400 hover:text-white duration-200 my-2 cursor-pointer rounded-md px-2 py-2 shadow-md shadow-gray-700"
                  >
                    {data.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Goods Description list */}
          <div className="bg-[#a8ff3e] rounded-md shadow-md shadow-red-500 ml-1 overflow-hidden">
            {/* Search and Name Section */}
            <div className="bg-[#a8ff3e] pl-3 flex justify-between py-2 px-2">
              <span className="text-xl font-semibold italic">
                Sri Kumaran Steels
              </span>
              <div className="flex items-center justify-center gap-3 relative">
                <span>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search your goods"
                    className=" py-1 px-2 mr-11 rounded-md w-[120%]"
                  />
                  <IoIosSearch className="text-2xl absolute right-12 top-1" />
                </span>
                <span className="ml-12">
                  <FaCirclePlus className="text-3xl text-green-700 hover:text-green-900 duration-200 cursor-pointer" />
                </span>
              </div>
            </div>
            <hr className="border border-[#c0d69c]" />
            {/* Goods list or Goods table */}
            <div className="w-full max-h-[530px] bg-pink-200 overflow-x-auto overflow-y-auto no-scrollbar">
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
                  {filteredData.map((items, index) => (
                    <tr key={index} className=" odd:bg-gray-200 text-[17px]">
                      <td className="py-2 px-2 border-b-2">{index + 1}</td>
                      <td className="py-2 px-2 border-b-2">{items.goods}</td>
                      <td className="py-2 px-2 border-b-2">₹ {items.rate}</td>
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
    goods: "1 40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 200,
  },
  {
    goods: "2 40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 100,
  },
  {
    goods: "3 40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 300,
  },
  {
    goods: "4 40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 180,
  },
  {
    goods: "5 40x40x1.6 mm Thinkness MS & Sq Tube Akash",
    rate: 500,
  },
  {
    goods: "6 40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 147,
  },
  {
    goods: "7 40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 135,
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
    allDetails: goodsList,
  },
  {
    name: "Krishana Steels Private Ltd",
    allDetails: goodsList,
  },
  {
    name: "Sri Kumaran Steels Private Ltd",
    allDetails: goodsList,
  },
  {
    name: "Raman Machine Services Private Ltd",
    allDetails: goodsList,
  },
  {
    name: "Sri Kumaran Steels Private Limited",
    allDetails: goodsList,
  },
  {
    name: "KAP Machine Shop & Welding",
    allDetails: goodsList,
  },
  {
    name: "Red Star Welding & Fabrication",
    allDetails: goodsList,
  },
  {
    name: "KAP Machine Shop & Welding Private Limited",
    allDetails: goodsList,
  },
  {
    name: "Red Star Welding & Fabrication Private Limited",
    allDetails: goodsList,
  },
  {
    name: "Custom Welding & Fab",
    allDetails: goodsList,
  },
  {
    name: "KAP Machine Shop & Welding Private Limited",
    allDetails: goodsList,
  },
  {
    name: "Red Star Welding & Fabrication Private Limited",
    allDetails: goodsList,
  },
  {
    name: "Custom Welding & Fab",
    allDetails: goodsList,
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
  {
    name: "KAP Machine Shop & Welding Private Limited",
  },
  {
    name: "Red Star Welding & Fabrication Private Limited",
  },
  {
    name: "Custom Welding & Fab",
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
