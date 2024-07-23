import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosSearch, IoMdCloseCircle } from "react-icons/io";
import { FaWindowClose } from "react-icons/fa";
import loadingGfg from "../../../data/GfgLoding/loading.gif";
import { useNavigate } from "react-router";

function WatingForAprovalList() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("LoginToken")) {
      navigate("/");
      return;
    }
  }, []);


  const [isLoading, setIsloading] = useState(false);

  // =========👇 Fetch Shopkeeper Name and id 👇==========
  const [shopkeepersNameId, setShopkeepersNameId] = useState(
    () => JSON.parse(localStorage.getItem("WFASpNameID")) || []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/created_po/get_all_created_po_shop_name.php"
        );

        if (Array.isArray(response.data.data)) {
          setShopkeepersNameId(response.data.data);
          localStorage.setItem(
            "WFASpNameID",
            JSON.stringify(response.data.data)
          );
        }

        if (response.data.status === "error") {
          localStorage.removeItem("WFASpNameID");
          localStorage.removeItem("WFAspName");
          localStorage.removeItem("WFACreatedPoList");
          localStorage.removeItem("WFAGoodsAndShopkeeperDetails");
        }
      } catch (error) {
        console.error("ShopkeeperName Error: " + error);
      }
    };
    fetchData();
  }, [shopkeepersNameId]);

  //=========👇 get shopkeeper Id when clicked on shopkeeper Name 👇======
  const [spName, setSpName] = useState(
    () => localStorage.getItem("WFAspName") || ""
  );

  const [createdPoListID, setCreatedPoListID] = useState([]);

  const handleShopkeeperId = async ({ name, id }) => {
    localStorage.setItem("WFAspName", name);
    setSpName(name);
    setIsloading(true);

    localStorage.removeItem("WFACreatedPoList");
    setCreatedPoList([]);

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
        setIsloading(false);
      }
    } catch (error) {
      console.log("Created Po get List Faild: " + error.message);
      setIsloading(false);
    }
  };

  // ===========👇 Click goods id fetch goods details list 👇=============
  const [modelGoodsListID, setGoodsListID] = useState(false);

  const [createdPoList, setCreatedPoList] = useState(
    () => JSON?.parse(localStorage.getItem("WFACreatedPoList")) || []
  );

  //=====👇 goods and shopkeeper all details 👇======
  const [goodsAndShopkeeperDetails, setGoodsAndShopkeeperDetails] = useState(
    () => JSON.parse(localStorage.getItem("WFAGoodsAndShopkeeperDetails")) || ""
  );

  const handleGoodsListId = async (id) => {
    const formData = new FormData();
    formData.append("id", id);

    try {
      const response = await axios.post(
        "/api/created_po/get_create_po_th_created_id.php",
        formData
      );

      setGoodsAndShopkeeperDetails(response.data[0]); // Goods and shopkeeper all details
      localStorage.setItem(
        "WFAGoodsAndShopkeeperDetails",
        JSON.stringify(response.data[0])
      );

      if (Array.isArray(goodsAndShopkeeperDetails.item_all_detail)) {
        setCreatedPoList(goodsAndShopkeeperDetails.item_all_detail);
      }

      if (Array.isArray(response.data[0].item_all_detail)) {
        setCreatedPoList(response.data[0].item_all_detail);

        localStorage.setItem(
          "WFACreatedPoList",
          JSON.stringify(response.data[0].item_all_detail)
        );
        setGoodsListID(false);
      }
    } catch (error) {
      console.log("Error fetch goods list: " + error.message);
    }
  };

  // ==========👇 Accepted Po Response handle 👇=================

  const handleAcceptedPoResponse = async (e) => {
    e.preventDefault();
    setIsloading(true);

    const formData = new FormData();
    formData.append("shopkeeper_id", goodsAndShopkeeperDetails?.shopkeeper_id);
    formData.append("created_po_id", goodsAndShopkeeperDetails?.id);
    formData.append(
      "descriptions",
      JSON.stringify(goodsAndShopkeeperDetails?.item_all_detail)
    );
    formData.append("time_of_created_new_po", goodsAndShopkeeperDetails?.time);
    formData.append(
      "total_amount",
      goodsAndShopkeeperDetails?.final_total_amout
    );

    const formDataDeleteWhenAprovalCreatedPO = new FormData();
    formDataDeleteWhenAprovalCreatedPO.append(
      "id",
      goodsAndShopkeeperDetails?.id
    );

    try {
      const response = await axios.post("/api/open_po/open_po.php", formData);

      if (response.data.success) {
        toast.success("Purchase Order Accepted Successfully!");

        localStorage.removeItem("WFACreatedPoList");
        localStorage.removeItem("WFAGoodsAndShopkeeperDetails");
        localStorage.removeItem("WFAspName");

        await axios.post(
          "/api/created_po/delete_created_po.php",
          formDataDeleteWhenAprovalCreatedPO
        );

        setTimeout(() => {
          window.location.reload();
          setIsloading(false);
        }, 1500);
      } else {
        setIsloading(false);
        toast.error("Purchase Order Acceptance Failed: " + response.data.error);
      }
    } catch (error) {
      setIsloading(false);
      console.log("Error Aproval Upload or Open Po(WFA): " + error.message);
    }
  };

  //========👇 Rejected Po Response handle 👇=============
  const [modelRejectedPoResponse, setModelRejectedPoResponse] = useState(false);
  const [rejectedPoMessage, setRejectedPoMessage] = useState("");

  const handleSubmitRejectPo = async () => {
    setModelRejectedPoResponse(false);
    setIsloading(true);

    const formData = new FormData();
    formData.append("shopkeeper_id", goodsAndShopkeeperDetails?.shopkeeper_id);
    formData.append("created_po_id", goodsAndShopkeeperDetails?.id);
    formData.append(
      "rejected_item_description",
      JSON.stringify(goodsAndShopkeeperDetails?.item_all_detail)
    );
    formData.append("total", goodsAndShopkeeperDetails?.final_total_amout);
    formData.append("remarks", rejectedPoMessage);
    formData.append("time_of_created_new_po", goodsAndShopkeeperDetails?.time);

    const formDataDeleteWhenAprovalCreatedPO = new FormData();
    formDataDeleteWhenAprovalCreatedPO.append(
      "id",
      goodsAndShopkeeperDetails?.id
    );

    try {
      const response = await axios.post(
        "/api/rejected_po/rejected_po.php",
        formData
      );

      if (response.data.success) {
        toast.success("Purchase Order Rejected Successfully!");
        setRejectedPoMessage("");

        localStorage.removeItem("WFACreatedPoList");
        localStorage.removeItem("WFAGoodsAndShopkeeperDetails");
        localStorage.removeItem("WFAspName");

        await axios.post(
          "/api/created_po/delete_created_po.php",
          formDataDeleteWhenAprovalCreatedPO
        );

        setTimeout(() => {
          window.location.reload();
          setIsloading(false);
        }, 1500);
      }
    } catch (error) {
      console.log("Error Rejected Po Upload: " + error.message);
      setIsloading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen mx-auto bg-[#d7f8f7] pt-16 relative">
        {/* Loading image section */}
        <div
          className={`w-full md:h-screen -mt-16 z-50 bg-[rgba(0,0,0,0.5)] absolute ${
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
        <h1 className="text-center py-2 text-[26px] font-bold italic font-serif underline capitalize">
          Wating for Aproval Purchase Order (PO)
        </h1>
        <div className="w-[98%] grid lg:grid-cols-[22%_auto] mx-auto rounded-lg shadow-md shadow-red-500 overflow-hidden">
          {/*========👇 Shopkeeper name list section 👇============*/}
          <div className="pt-3 bg-[#82f273] rounded-md shadow-md shadow-red-500 mr-1">
            <h1 className="text-2xl font-semibold uppercase text-center italic underline">
              Created Po List
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
          <div className="bg-[#3696d1] rounded-md shadow-md shadow-red-500 ml-1 overflow-hidden">
            {/* Search and Name Section Aproval button */}
            <div className="bg-[] pl-3 flex justify-between py-2 px-2">
              <span className="text-xl font-semibold italic text-white">
                {spName}
              </span>
              {/* Aproval Button */}
              <div className="flex gap-4 mr-4 text-xl font-semibold italic">
                <button
                  disabled={createdPoList.length === 0 ? true : false}
                  onClick={handleAcceptedPoResponse}
                  className={` text-white px-2 py-1 rounded-md shadow-md shadow-gray-600
                    ${
                      createdPoList.length === 0
                        ? "bg-gray-400"
                        : "bg-green-500 cursor-pointer"
                    }`}
                >
                  Aproval
                </button>
                <button
                  disabled={createdPoList.length === 0 ? true : false}
                  onClick={() => setModelRejectedPoResponse(true)}
                  className={` text-white px-2 py-1 rounded-md shadow-md shadow-gray-600
                    ${
                      createdPoList.length === 0
                        ? "bg-gray-400"
                        : "bg-red-500 cursor-pointer"
                    }`}
                >
                  Rmark
                </button>
              </div>
            </div>
            <hr className="border border-[#c0d69c]" />

            {/*=====👇 Goods list or Goods table 👇=========*/}
            <div className="w-full max-h-[530px] bg-pink-200 overflow-x-auto overflow-y-auto no-scrollbar">
              <table className="w-full text-center border border-black">
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
                {goodsAndShopkeeperDetails?.final_total_amout}
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
                Wating For Aproval PO List{" "}
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
                        <td>Recent Created Po {index + 1}</td>
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

          {/* =============👇 Rejected Po Model Message or Re-mark 👇=============*/}
          {modelRejectedPoResponse && (
            <div className="absolute w-full h-screen mx-auto z-50 bg-[rgba(0,0,0,0.5)] left-0 top-0">
              <div className="mt-16 flex justify-center items-center">
                <div className="w-[30rem] mx-auto bg-green-500 mt-20 rounded-md overflow-hidden shadow-md shadow-pink-600">
                  <h1 className="text-center text-xl bg-[#3696d1] flex justify-around font-serif font-semibold text-white py-2 underline">
                    Reason for Reject PO{" "}
                    <FaWindowClose
                      onClick={() => setModelRejectedPoResponse(false)}
                      className="text-3xl text-red-600 hover:text-red-700 duration-200 cursor-pointer shadow-md shadow-[yellow]"
                    />
                  </h1>
                  <div className="py-4 px-4">
                    <textarea
                      value={rejectedPoMessage}
                      onChange={(e) => setRejectedPoMessage(e.target.value)}
                      placeholder="Can you write resons.."
                      className="py-2 px-2 rounded-md text-xl italic w-full min-h-[200px] max-h-[300px]"
                    />
                    <div className="flex justify-center">
                      <button
                        onClick={handleSubmitRejectPo}
                        className="text-xl bg-red-600 hover:bg-red-700 px-2 py-1 font-semibold duration-200 rounded-md mt-3 text-white hover:text-[#e2e0e0] cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default WatingForAprovalList;

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
