import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosSearch, IoMdCloseCircle } from "react-icons/io";

function CheckYourCreatedPoList() {
  // =========👇 Fetch Shopkeeper Name and id 👇==========
  const [shopkeepersNameId, setShopkeepersNameId] = useState([]);
  const [searchInputShopKeeper, setSearchInputShopKeeper] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/created_po/get_all_created_po_shop_name.php"
        );

        if (Array.isArray(response.data.data)) {
          setShopkeepersNameId(response.data.data);
        }
      } catch (error) {
        console.error("ShopkeeperName Error: " + error);
      }
    };
    fetchData();
  }, [shopkeepersNameId]);

  //=========👇 get shopkeeper Id when clicked on shopkeeper Name 👇======
  const [spName, setSpName] = useState("");
  const [createdPoListID, setCreatedPoListID] = useState([]);

  const handleShopkeeperId = async ({ name, id }) => {
    setSpName(name);

    const formData = new FormData();
    formData.append("shopkeeper_id", id);

    try {
      const response = await axios.post(
        "/api/created_po/get_created_po_th_shop_id.php",
        formData
      );

      if (Array.isArray(response.data)) {
        setCreatedPoListID(response.data);
        setGoodsListID(true);
      }
    } catch (error) {
      console.log("Created Po get List Faild: " + error.message);
    }
  };

  // ===========👇 Click goods id fetch goods details list 👇=============
  const [modelGoodsListID, setGoodsListID] = useState(false);
  const [createdPoList, setCreatedPoList] = useState([]);
  const [finalAmount, setFinalAmount] = useState("");

  const handleGoodsListId = async (id) => {
    const formData = new FormData();
    formData.append("id", id);

    try {
      const response = await axios.post(
        "/api/created_po/get_create_po_th_created_id.php",
        formData
      );

      if (Array.isArray(response.data[0].item_all_detail)) {
        setCreatedPoList(response.data[0].item_all_detail);
        setFinalAmount(response.data[0].final_total_amout);
        setGoodsListID(false);
      }
    } catch (error) {
      console.log("Error fetch goods list: " + error.message);
    }
  };

  return (
    <>
      <div className="w-full h-screen mx-auto bg-[#f2d7d7] pt-16">
        <h1 className="text-center py-2 text-[26px] font-bold italic font-serif underline">
          Check Your Created PO List
        </h1>
        <div className="w-[98%] grid lg:grid-cols-[22%_auto] mx-auto bg-gray-300 rounded-lg shadow-md shadow-red-500 overflow-hidden">
          {/*========👇 Shopkeeper name list section 👇============*/}
          <div className="pt-3 bg-[#eae7e7] rounded-md shadow-md shadow-red-500 mr-1">
            <h1 className="text-2xl font-semibold uppercase text-center italic underline">
              Created Po List
            </h1>
            
            {/* Search functionality */}
            {/* <div className="relative">
              <IoIosSearch className="text-2xl absolute right-6 top-4" />
              <input
                type="text"
                value={searchInputShopKeeper}
                onChange={(e) => setSearchInputShopKeeper(e.target.value)}
                placeholder="Search shopkeeper by name"
                className="px-2 py-2 ml-2 lg:w-[94%] w-[96%] rounded-md mt-2 shadow-md shadow-gray-700 cursor-pointer"
              />
            </div> */}

            {/* Shopkeeper Name listed here */}
            <div className="h-[470px] overflow-y-auto overflow-x-auto mt-2 no-scrollbar">
              <ul className="mx-2 text-xl italic mt-3">
                {shopkeepersNameId.map((data, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleShopkeeperId({ name: data.name, id: data.id })
                    }
                    className="hover:bg-gray-400 hover:text-white duration-200 my-2 cursor-pointer rounded-md px-2 py-2 shadow-md shadow-gray-700"
                  >
                    {data.name}
                  </li>
                ))}
              </ul>
              {shopkeepersNameId.length === 0 ? (
                <span className="text-red-500 ml-4">Data is Loading...</span>
              ) : (
                ""
              )}
            </div>
          </div>

          {/*==================👇 Goods Description list 👇===================*/}
          <div className="bg-[#a8ff3e] rounded-md shadow-md shadow-red-500 ml-1 overflow-hidden">
            {/* Search and Name Section */}
            <div className="bg-[#a8ff3e] pl-3 flex justify-between py-2 px-2">
              <span className="text-xl font-semibold italic">{spName}</span>
            </div>
            <hr className="border border-[#c0d69c]" />

            {/*=====👇 Goods list or Goods table 👇=========*/}
            <div className="w-full max-h-[530px] bg-pink-200 overflow-x-auto overflow-y-auto no-scrollbar">
              <table className="w-full text-center">
                <thead className=" whitespace-nowrap text-[18px] sticky top-0 left-0 right-0 bg-[#82f5c7]">
                  <tr>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      SI No
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black  border-r-2 w-[38%]">
                      Description of Goods
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      Rate
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      Qty
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      CGST
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      SGST
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 w-[18%]">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {createdPoList.map((items, index) => (
                    <tr key={index} className=" odd:bg-gray-200 text-[17px]">
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {index + 1}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black w-[68%]">
                        {items.descriptions}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {items.rate}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {items.quantity}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {items.cgst}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {items.sgst}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black w-[18%]">
                        {items.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-xl font-semibold flex justify-end pr-12 border-b-2 border-black border-r-2 gap-16 bg-yellow-400"> <span className=" border-r-2 border-black pr-6">Final Total Amount</span>{finalAmount}</div>
              {createdPoList.length === 0 ? (
                <span className="text-red-500 ml-4 text-xl font-semibold">
                  👈Click Created PO List after All created PO listed here..
                </span>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* ==============👇 Model Goods List When Click Goods Model Open 👇=========== */}
          {modelGoodsListID && (
            <div
              className={`mx-2 text-xl italic z-50 pt-16 bg-[rgba(0,0,0,0.5)] rounded-md w-full h-screen top-0 -left-2 pl-16 fixed flex justify-center`}
            >
              <h1 className="w-[300px] text-2xl font-semibold py-1 text-center absolute bg-[#30d7ed] rounded-3xl mt-1 flex items-center justify-center gap-8">
                Recently Created PO{" "}
                <span>
                  <IoMdCloseCircle
                    className="text-3xl text-red-600 cursor-pointer"
                    onClick={() => setGoodsListID(false)}
                  />
                </span>
              </h1>
              <div className="w-[100%] mt-12">
                <table className="w-[80%] mx-auto text-center px-6 py-6 bg-[#a8e6cf] rounded-lg shadow-md shadow-black border overflow-hidden">
                  <thead className=" sticky bg-orange-400 text-[blue] border-b-2">
                    <tr>
                      <th>SI NO</th>
                      <th>Created PO</th>
                      <th>Date</th>
                      <th>Total Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {createdPoListID.map((data, index) => (
                      <tr
                        key={index}
                        className=" bg-yellow-300 border-b-2 font-semibold font-serif"
                      >
                        <td>{index + 1}</td>
                        <td>Recent Created Po</td>
                        <td>{formatDate(data.time)}</td>
                        <td>{data.final_total_amout}</td>
                        <td
                          className=" cursor-pointer font-bold text-pink-600 underline"
                          onClick={() => handleGoodsListId(data.id)}
                        >
                          Views
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CheckYourCreatedPoList;

//===========👇 Date Formate Functions 👇===========

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", dateString);
    return dateString; // Return the original string if the date is invalid
  }

  const options = { month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  const [month, day] = formattedDate.split(" ");

  return `${month}, ${day}`; // Format date to 'Month, Day'
}
