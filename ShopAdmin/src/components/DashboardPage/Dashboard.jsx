import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("LoginToken")) {
      navigate("/");
      return;
    }
  }, []);

  //==============👇Start Fetch Shopkeeper Name Using API 👇=============
  const [shopkeeperName, setShopkeeperName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get_shopkeeper_detail.php");

        if (Array.isArray(response.data)) {
          setShopkeeperName(response.data);
        }
      } catch (error) {
        console.error("Error: " + error);
      }
    };
    fetchData();
  }, [setShopkeeperName]);

  const [searchInputShopKeeper, setSearchInputShopKeeper] = useState("");
  const [filteredShopkeeperName, setFilteredShopkeeperName] = useState([]);

  // console.log("====================================");
  // console.log("ShopkeeperResponse: " + JSON.stringify(shopkeeperName, null, 2));
  // console.log("====================================");

  //👉 shopkeeper search functionality
  useEffect(() => {
    const filterData = shopkeeperName.filter((items) =>
      items.name
        .toLowerCase()
        .trim()
        .includes(searchInputShopKeeper.toLowerCase().trim())
    );
    setFilteredShopkeeperName(filterData);
  }, [searchInputShopKeeper, shopkeeperName]);

  //==============👆 End Fetch Shopkeeper Name Using API 👆=============

  //===========👇 get shopkeeper name and id when clicking on shopkeeper name 👇=============
  const [shopkeeperNameId, setShopkeeperNameId] = useState({
    name: "",
    id: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("ShopkeeperNameAndIdDetails");
    if (savedData) {
      setShopkeeperNameId(JSON.parse(savedData));
    }
  }, []);

  const handleShopkeeperNameId = (data) => {
    setShopkeeperNameId(data);
    localStorage.setItem("ShopkeeperNameAndIdDetails", JSON.stringify(data));
  };


  //==============👆 End get shopkeeper name and id when clicking on shopkeeper name 👆=============

  //==============👇Start Fetch Goods List By Id 👇=============
  const [goodsData, setGoodsData] = useState([]);

  //==============👇Goods Search functionality 👇=============
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData();
      formData.append("shopkeeper_id", shopkeeperNameId.id);

      try {
        const response = await axios.get(
          "/api/get_goods_details.php",
          formData
        );

        // console.log("====================================");
        // console.log("Response: " + JSON.stringify(response, null, 2));
        // console.log("====================================");
      } catch (error) {
        console.error("Error: " + error);
      }
    };
    fetchData();
  }, [setSearchInput]);

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

  return (
    <>
      <div className="w-full h-screen mx-auto bg-[#f2d7d7] pt-16">
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
                    onClick={() =>
                      handleShopkeeperNameId({ name: data.name, id: data.id })
                    }
                    className="hover:bg-gray-400 hover:text-white duration-200 my-2 cursor-pointer rounded-md px-2 py-2 shadow-md shadow-gray-700"
                  >
                    {data.name}
                  </li>
                ))}
              </ul>
              <span
                className={`ml-2 text-red-500 font-semibold ${
                  filteredShopkeeperName.length && "hidden"
                }`}
              >
                No record found..
              </span>
            </div>
          </div>

          {/* Goods Description list */}
          <div className="bg-[#a8ff3e] rounded-md shadow-md shadow-red-500 ml-1 overflow-hidden">
            {/* Search and Name Section */}
            <div className="bg-[#a8ff3e] pl-3 flex justify-between py-2 px-2">
              <span className="text-xl font-semibold italic">
                {/* Sri Kumaran Steels */}
                {shopkeeperNameId.name}
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
                  <Link to="/addgoodslist">
                    <FaCirclePlus className="text-3xl text-green-700 hover:text-green-900 duration-200 cursor-pointer" />
                  </Link>
                </span>
              </div>
            </div>
            <hr className="border border-[#c0d69c]" />
            {/* Goods list or Goods table */}
            <div className="w-full max-h-[530px] bg-pink-200 overflow-x-auto overflow-y-auto no-scrollbar">
              <table className="w-full text-center">
                <thead className=" whitespace-nowrap text-[18px] sticky top-0 left-0 right-0 bg-[#82f5c7]">
                  <tr>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      SI No
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black  border-r-2 w-[68%]">
                      Description of Goods
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      Rate
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((items, index) => (
                    <tr key={index} className=" odd:bg-gray-200 text-[17px]">
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {index + 1}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black w-[68%]">
                        {items.goods}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        ₹ {items.rate}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
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
              <span
                className={`ml-2 text-red-500 font-semibold ${
                  filteredData.length && "hidden"
                }`}
              >
                No record found..
              </span>
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
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube 40x40x1.6 mm",
    rate: 200,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 100,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 300,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 180,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube Akash",
    rate: 500,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
    rate: 147,
  },
  {
    goods: "40x40x1.6 mm Thinkness MS & Sq Tube",
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
