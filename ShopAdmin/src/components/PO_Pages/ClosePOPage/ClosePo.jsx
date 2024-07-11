import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ClosePo() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("LoginToken")) {
      navigate("/");
      return;
    }
  }, []);

  // =========👇 Fetch Shopkeeper Name and id 👇==========
  const [shopkeepersNameId, setShopkeepersNameId] = useState(
    () => JSON.parse(localStorage.getItem("closedPoNameID")) || []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/closed_po/get_shop_id_name.php");

        if (Array.isArray(response.data.data)) {
          setShopkeepersNameId(response.data.data);
          localStorage.setItem(
            "closedPoNameID",
            JSON.stringify(response.data.data)
          );
        }
      } catch (error) {
        console.error("ShopkeeperName Error: " + error);
      }
    };
    fetchData();
  }, [setShopkeepersNameId]);

  //=========👇 get shopkeeper Id when clicked on shopkeeper Name 👇======
  const [spName, setSpName] = useState(
    localStorage.getItem("ClosedPoName") || ""
  );

  const [createdPoListID, setCreatedPoListID] = useState(
    () => JSON.parse(localStorage.getItem("closedPoListID")) || []
  );

  const handleShopkeeperId = async ({ name, id }) => {
    setSpName(name);
    localStorage.setItem("ClosedPoName", name);

    const formData = new FormData();
    formData.append("shopkeeper_id", id);

    try {
      const response = await axios.post(
        "/api/closed_po/get_closed_po_th_shop_id.php",
        formData
      );

      if (Array.isArray(response.data)) {
        setCreatedPoListID(response.data);
        localStorage.setItem("closedPoListID", JSON.stringify(response.data));
        setGoodsListID(true);
      }
    } catch (error) {
      console.log("Created Po get List Faild: " + error.message);
    }
  };

  // ===========👇 Click goods id fetch goods details list 👇=============
  const [modelGoodsListID, setGoodsListID] = useState(false);

  const [createdPoList, setCreatedPoList] = useState(
    () => JSON.parse(localStorage.getItem("closedPoList")) || []
  );
  //=====👇 goods and shopkeeper all details 👇======

  const [goodsAndShopkeeperDetails, setGoodsAndShopkeeperDetails] = useState(
    () => JSON.parse(localStorage.getItem("closedPoGoodsAndShopkeeperDetails")) || ""
  );

  const handleGoodsListId = async (id) => {
    const formData = new FormData();
    formData.append("id", id);

    try {
      const response = await axios.post(
        "/api/closed_po/get_closed_po_th_id.php",
        formData
      );

      setGoodsAndShopkeeperDetails(response.data.data); // Goods and shopkeeper all details
      localStorage.setItem(
        "closedPoGoodsAndShopkeeperDetails",
        JSON.stringify(response.data.data)
      );

      if (Array.isArray(goodsAndShopkeeperDetails[0].descriptions)) {
        setCreatedPoList(goodsAndShopkeeperDetails[0].descriptions);
        localStorage.setItem(
          "closedPoList",
          JSON.stringify(goodsAndShopkeeperDetails[0].descriptions)
        );
        setGoodsListID(false);
      }

      // if (Array.isArray(response.data.data)) {
      //   setCreatedPoList(response.data.data);
      //   setGoodsListID(false);
      // }
    } catch (error) {
      console.log("Error fetch goods list: " + error);
    }
  };

  console.log("goodsAndShopkeeperDetails: " + JSON.stringify(goodsAndShopkeeperDetails))

  return (
    <>
      <div className="w-full h-screen mx-auto bg-[#f688bb] pt-16 relative">
        <h1 className="text-center py-2 text-[26px] font-bold italic font-serif underline capitalize">
          Welcome to Close PO (Purchase Order)
        </h1>
        <div className="w-[98%] grid lg:grid-cols-[22%_auto] mx-auto rounded-lg shadow-md shadow-red-500 overflow-hidden">
          {/*========👇 Shopkeeper name list section 👇============*/}
          <div className="pt-3 bg-[#ffaaa6] rounded-md shadow-md shadow-red-500 mr-1">
            <h1 className="text-2xl font-semibold uppercase text-center italic underline">
              Closed Po List
            </h1>

            {/* Shopkeeper Name listed here */}
            <div className="h-[470px] overflow-y-auto overflow-x-auto mt-2 no-scrollbar">
              <ul className="mx-2 text-xl italic mt-3">
                {shopkeepersNameId.map((data, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleShopkeeperId({ name: data.name, id: data.id })
                    }
                    className="hover:bg-pink-400 hover:text-white duration-200 my-2 cursor-pointer rounded-md px-2 py-2 shadow-md shadow-yellow-700"
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
          <div className="bg-[#ffb677] rounded-md shadow-md shadow-red-500 ml-1 overflow-hidden">
            {/* Search and Name Section Aproval button */}
            <div className="bg-[] pl-3 flex justify-between py-2 px-2">
              <span className="text-xl font-semibold italic">{spName}</span>
            </div>
            <hr className="border border-[#c0d69c]" />

            {/*=====👇 Goods list or Goods table 👇=========*/}
            <div className="w-full max-h-[530px] bg-pink-200 overflow-x-auto overflow-y-auto no-scrollbar">
              <table className="w-full text-center border border-black">
                <thead className=" whitespace-nowrap text-[18px] sticky top-0 left-0 right-0 bg-[#cefc86]">
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
                      CGST(9%)
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      SGST(9%)
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      ISGST(18%)
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 w-[18%]">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {createdPoList.map((items, index) => (
                    <tr className=" odd:bg-gray-200 text-[17px]">
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
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {items.igst}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black w-[18%]">
                        {items.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-xl font-semibold flex justify-end pr-12 border-b-2 border-black border-r-2 gap-16 bg-yellow-400">
                {" "}
                <span className=" border-r-2 border-black pr-6">
                  Final Total Amount
                </span>
                {goodsAndShopkeeperDetails[0]?.total_amount}
              </div>
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
              <h1 className="w-[400px] text-2xl font-semibold py-1 text-center absolute bg-[#30d7ed] rounded-3xl mt-1 flex items-center justify-center gap-6">
                All Close PO List{" "}
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
                      <th>Closed PO</th>
                      <th>Created Date</th>
                      <th>Close Date</th>
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
                        <td>Recent Close Po {index + 1}</td>
                        <td>{formatDate(data.time_of_created_new_po)}</td>
                        <td>{formatDate(data.time)}</td>
                        <td>{data.total_amount}</td>
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
        <ToastContainer />
      </div>
    </>
  );
}

export default ClosePo;

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
