import React, { useState } from "react";
import loadingGfg from '../../data/GfgLoding/loading.gif'
import { IoIosSearch } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="w-full h-screen mx-auto bg-[#f2d7d7] fixed">
        {/* Loading image section */}
        <div
          className={`w-full md:h-[158%] h-[232%] z-50 bg-[rgba(0,0,0,0.5)] absolute ${
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
        <h1 className="text-center py-2 text-[26px] font-bold italic font-serif underline">
          Welcome to Dashboard
        </h1>
        <div className="w-[98%] grid lg:grid-cols-[22%_auto] mx-auto bg-gray-300 rounded-lg shadow-md shadow-red-500 overflow-hidden">
          {/*========👇 Shopkeeper name list section 👇============*/}
          <div className="pt-3 bg-[#eae7e7] rounded-md shadow-md shadow-red-500 mr-1">
            <h1 className="text-2xl font-semibold uppercase text-center italic underline">
              Shopkeeper Name
            </h1>
            {/* Search functionality */}
            <div className="relative">
              <IoIosSearch className="text-2xl absolute right-6 top-4" />
              <input
                type="text"
                // value={searchInputShopKeeper}
                // onChange={(e) => setSearchInputShopKeeper(e.target.value)}
                placeholder="Search shopkeeper by name"
                className="px-2 py-2 ml-2 lg:w-[94%] w-[96%] rounded-md mt-2 shadow-md shadow-gray-700 cursor-pointer"
              />
            </div>
            <div className="h-[470px] overflow-y-auto overflow-x-auto mt-2 no-scrollbar">
              <ul className="mx-2 text-xl italic mt-3">
                <li>Madan Kumar</li>
                {/* {filteredShopkeeperName.map((data, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleShopkeeperNameId({ name: data.name, id: data.id })
                    }
                    className="hover:bg-gray-400 hover:text-white duration-200 my-2 cursor-pointer rounded-md px-2 py-2 shadow-md shadow-gray-700"
                  >
                    {data.name}
                  </li>
                ))} */}
              </ul>
              {/* <span
                className={`ml-2 text-red-500 font-semibold ${
                  filteredShopkeeperName.length && "hidden"
                }`}
              >
                No record found..
              </span> */}
            </div>
          </div>

          {/*==================👇 Goods Description list 👇===================*/}
          <div className="bg-[#a8ff3e] rounded-md shadow-md shadow-red-500 ml-1 overflow-hidden">
            {/* Search and Name Section */}
            <div className="bg-[#a8ff3e] pl-3 flex justify-between py-2 px-2">
              <span className="text-xl font-semibold italic">
                Sri Kumaran Steels
                {/* {shopkeeperNameId.name} */}
              </span>
              <div className="flex items-center justify-center gap-3 relative">
                <span>
                  <input
                    type="text"
                    // value={searchInput}
                    // onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search your goods"
                    className=" py-1 px-2 mr-11 rounded-md w-[120%]"
                  />
                  <IoIosSearch className="text-2xl absolute right-12 top-1" />
                </span>
                <span className="ml-12">
                  <Link 
                  // to="/addgoodslist"
                  >
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
                  {/* {filteredData.map((items, index) => ( */}
                    <tr className=" odd:bg-gray-200 text-[17px]">
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {/* {index + 1} */}
                        1
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black w-[68%]">
                        {/* {items.descriptions} */}
                        item1
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {/* ₹ {items.rate} */}
                        123
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        <span
                          // onClick={() => handleEdit(items.id)}
                          className="bg-green-500 hover:bg-green-600 duration-200 font-semibold italic py-1 px-2 text-white hover:text-[#d3d1d1] rounded-md shadow-md shadow-gray-800 cursor-pointer mr-2"
                        >
                          Edit
                        </span>
                        <span
                          // onClick={() => handleDelete(items.id)}
                          className="bg-red-500 hover:bg-red-600 duration-200 font-semibold italic py-1 px-2 text-white hover:text-[#d3d1d1] rounded-md shadow-md shadow-gray-800 cursor-pointer"
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  {/* ))} */}
                </tbody>
              </table>
              {/* <span
                className={`ml-2 text-red-500 font-semibold ${
                  filteredData.length && "hidden"
                }`}
              >
                No record found..
              </span> */}
            </div>
          </div>
        </div>

        {/*=====================👇 Shopkeepers Form Details 👇=======================*/}
        {/* {goodsId && (
          <div className="w-full h-screen absolute top-0 left-0 z-51 bg-[rgba(0,0,0,0.5)]">
            <div className="w-[500px] mx-auto relative top-40 bg-gray-300 italic px-4 py-4 rounded-md shadow-md shadow-yellow-600 mt-10 tece">
              <span
                // onClick={() => setGoodsId("")}
                className="w-[95%] flex justify-end items-center right-7"
              >
                <IoCloseSharp className="text-3xl text-red-500 cursor-pointer" />
              </span>
              <form 
              // onSubmit={handleSubmitEdit}
              >
                <label htmlFor="goodsname" className="text-xl font-semibold">
                  Goods Name
                </label>
                <br />
                <input
                  type="text"
                  id="goodsname"
                  // value={goodsName}
                  // onChange={(e) => setGoodsName(e.target.value)}
                  placeholder="Enter your goods name"
                  className="w-[90%] py-1 px-2 rounded-md shadow-md shadow-stone-500"
                />
                <br />
                <label htmlFor="rate" className="text-xl font-semibold">
                  Rate
                </label>
                <br />
                <input
                  type="text"
                  id="rate"
                  // value={goodsRate}
                  // onChange={(e) => setGoodsRate(e.target.value)}
                  placeholder="Enter your goods rate"
                  className="w-[90%] py-1 px-2 rounded-md shadow-md shadow-stone-500"
                />
                <br />
                <span className="w-full mx-auto flex items-center justify-center">
                  <button className="text-xl italic uppercase font-semibold bg-blue-600 hover:bg-blue-700  hover:text-[#e2dcdc] duration-200 text-white px-2 py-1 rounded-lg shadow-md shadow-black mt-6">
                    Update
                  </button>
                </span>
              </form>
            </div>
          </div>
        )}  */}
      </div>

      {/*======================👇 Confirmation Asking when delete 👇=====================*/}
      {/* {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-3 z-50">
          <div className="sm:w-[430px] bg-white p-6 rounded shadow-lg">
            <h2 className="sm:text-xl mb-4">
              Are you sure you want to delete this item?
            </h2>
            <div className="flex justify-end">
              <button
                // onClick={cancelDelete}
                className="bg-green-500 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400"
              >
                No
              </button>
              <button
                // onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

export default Dashboard;
